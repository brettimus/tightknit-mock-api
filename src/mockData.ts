// Mock data store for the API
export const mockData = {
  badges: new Map([
    ["123e4567-e89b-12d3-a456-426614174000", { id: "123e4567-e89b-12d3-a456-426614174000", name: "Super Contributor" }],
  ]),
  
  calendarEvents: new Map([
    ["8x38el2x6di9", {
      id: "8x38el2x6di9",
      created_at: "2024-03-20T15:00:00Z",
      allow_public_guest_list: true,
      description_slack_blocks: [{
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Join us for an exciting tech talk!"
        }
      }],
      enable_registration_button: true,
      end_date: "2025-01-07T15:30:00-08:00",
      external_speakers: "John Doe, Jane Doe",
      is_unlisted: false,
      link: "https://example.com/my-event",
      location: "1 Market Street, San Francisco, CA",
      luma_event_id: "https://lu.ma/event/evt-6pGPLeDBObis0G4",
      publish_to_site: true,
      triggers_webhooks: false,
      recording_link: null,
      webhook_custom_metadata: null,
      show_end_date: true,
      slug: "tech-talk-2024",
      start_date: "2025-01-07T15:00:00-07:00",
      status: "published",
      title: "Tech Talk 2024",
      use_registration_btn_as_link: false,
      cover_image_url: null,
      publish_to_slack_channels: [{
        slack_channel_id: "C1234567A",
        feed_id: null
      }],
      hosts: ["U1234567A"],
      speakers: ["U1234567B"],
      tags: [{
        id: "tag1",
        created_at: "2024-03-20T15:00:00Z",
        tag_group_id: "group1",
        label: "Tech Talk"
      }]
    }]
  ]),

  groups: new Map([
    ["123e4567-e89b-12d3-a456-426614174000", { id: "123e4567-e89b-12d3-a456-426614174000", members: new Set(["U1234567A"]) }]
  ]),

  searchDocuments: {
    posts: [{
      id: "post1",
      created_at: "2024-03-20T15:00:00Z",
      title: "Sample Post",
      slug: "sample-post",
      feed_id: "feed1",
      author_profile_id: "U1234567A",
      read_time_minutes: 5,
      file_attachments_count: 0,
      reactions_count: 2,
      comments_count: 1,
      slack_message: {
        id: "msg1",
        message_ts: 1710950400,
        blocks: { text: "Sample post content" },
        markdown: "Sample post content",
        permalink: "https://slack.com/msg1"
      },
      author: {
        id: "U1234567A",
        created_at: "2024-01-01T00:00:00Z",
        preferred_name: "John Doe",
        slack_profile: {
          id: "U1234567A",
          is_admin: false,
          is_bot: false,
          image_72: "https://example.com/avatar.jpg",
          image_original: "https://example.com/avatar_original.jpg"
        }
      },
      feed: {
        id: "feed1",
        label: "General",
        slug: "general"
      },
      references: {
        mentioned_slack_users: [],
        mentioned_slack_channels: [],
        custom_emojis: [],
        urls: []
      }
    }],
    comments: []
  }
} as const; 