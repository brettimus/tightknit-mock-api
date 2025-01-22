import { createMiddleware } from "@fiberplane/embedded";
import { instrument } from "@fiberplane/hono-otel";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { apiSpec } from "./tightknit-spec";
import { mockData } from "./mockData";

const app = new Hono();

app.use("*", cors());

// Assign badge to user
app.post("/admin/v0/badges/:badgeId/assign", async (c) => {
  const badgeId = c.req.param("badgeId");
  const body = await c.req.json();

  if (!mockData.badges.has(badgeId)) {
    return c.json({ success: false, error: "Badge not found" }, 404);
  }

  if (!body.users || !Array.isArray(body.users) || body.users.length === 0) {
    return c.json({ success: false, error: "Invalid users array" }, 400);
  }

  return c.json({ success: true });
});

// Get calendar events
app.get("/admin/v0/calendar_events", (c) => {
  const timeFilter = c.req.query("time_filter") || "upcoming";
  const status = c.req.query("status") || "published";
  const publishedToSite = c.req.query("published_to_site");
  const isUnlisted = c.req.query("is_unlisted");

  // Convert Map to array and apply filters
  const events = Array.from(mockData.calendarEvents.values())
    .filter(event => {
      if (status && event.status !== status) return false;
      if (publishedToSite && event.publish_to_site.toString() !== publishedToSite) return false;
      if (isUnlisted && event.is_unlisted.toString() !== isUnlisted) return false;
      return true;
    });

  return c.json({ success: true, data: events });
});

// Create calendar event
app.post("/admin/v0/calendar_events", async (c) => {
  const body = await c.req.json();
  
  // Validate required fields
  const requiredFields = ["end_date", "start_date", "title", "publish_to_slack_channels", "hosts"];
  for (const field of requiredFields) {
    if (!body[field]) {
      return c.json({ success: false, error: `Missing required field: ${field}` }, 400);
    }
  }

  const eventId = Math.random().toString(36).substring(2, 15);
  const newEvent = {
    id: eventId,
    created_at: new Date().toISOString(),
    ...body
  };

  mockData.calendarEvents.set(eventId, newEvent);

  return c.json({
    success: true,
    data: { calendar_event_id: eventId }
  });
});

// Get calendar event by ID
app.get("/admin/v0/calendar_events/:calendarEventId", (c) => {
  const eventId = c.req.param("calendarEventId");
  const event = mockData.calendarEvents.get(eventId);

  if (!event) {
    return c.json({ success: false, error: "Calendar event not found" }, 404);
  }

  return c.json({ success: true, data: event });
});

// Delete calendar event
app.delete("/admin/v0/calendar_events/:calendarEventId", (c) => {
  const eventId = c.req.param("calendarEventId");
  
  if (!mockData.calendarEvents.has(eventId)) {
    return c.json({ success: false, error: "Calendar event not found" }, 404);
  }

  mockData.calendarEvents.delete(eventId);
  return c.json({ success: true, data: { id: eventId } });
});

// Search documents
app.get("/admin/v0/search", (c) => {
  const query = c.req.query("q");
  
  if (!query) {
    return c.json({ success: false, error: "Search query is required" }, 400);
  }

  // Simple mock search implementation
  const documents = {
    posts: mockData.searchDocuments.posts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.slack_message.markdown.toLowerCase().includes(query.toLowerCase())
    ),
    comments: mockData.searchDocuments.comments
  };

  return c.json({ success: true, documents });
});

// Add users to group
app.put("/admin/v0/groups/:groupId/members", async (c) => {
  const groupId = c.req.param("groupId");
  const body = await c.req.json<{ users: string[] }>();

  if (!mockData.groups.has(groupId)) {
    return c.json({ success: false, error: "Group not found" }, 404);
  }

  if (!body.users || !Array.isArray(body.users) || body.users.length === 0) {
    return c.json({ success: false, error: "Invalid users array" }, 400);
  }

  const group = mockData.groups.get(groupId);
  if (!group) {
    return c.json({ success: false, error: "Group not found" }, 404);
  }

  for (const userId of body.users) {
    group.members.add(userId);
  }

  return c.json({ success: true });
});

// Mount the Fiberplane playground to play with the API
app.use("/fp/*", createMiddleware({
  // TODO - Just point the embedded playground to the api spec at `https://api.tightknit.dev/doc`
  //
  // @ts-expect-error - The imported spec does not match our expected OpenAPIv3 type
  spec: apiSpec,
  apiKey: "1234567890",
}));

export default instrument(app);
