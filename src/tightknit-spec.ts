export const apiSpec = {
  "openapi": "3.1.0",
    "info": {
    "version": "0.0.0",
      "title": "Tightknit OpenAPI"
  },
  "security": [
    {
      "Bearer": []
    }
  ],
    "components": {
    "securitySchemes": {
      "Bearer": {
        "type": "http",
          "scheme": "bearer",
            "bearerFormat": "JWT"
      }
    },
    "schemas": { },
    "parameters": { }
  },
  "paths": {
    "/admin/v0/badges/{badgeId}/assign": {
      "post": {
        "tags": ["Badge"],
          "summary": "Assign a badge to a user",
            "description": "Assign a badge to a user and send a notification to the user in Slack.",
              "parameters": [
                {
                  "schema": {
                    "type": "string",
                    "minLength": 1,
                    "example": "123e4567-e89b-12d3-a456-426614174000"
                  },
                  "required": true,
                  "name": "badgeId",
                  "in": "path"
                }
              ],
                "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                  "properties": {
                  "users": {
                    "type": "array",
                      "items": {
                      "type": "string"
                    },
                    "example": ["U1234567A"]
                  }
                },
                "required": ["users"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Assigns a badge to a user",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    }
                  },
                  "required": ["success"]
                }
              }
            }
          },
          "400": {
            "description": "Returns an error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          },
          "403": {
            "description": "Returns a Forbidden error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          }
        }
      }
    },
    "/admin/v0/calendar_events": {
      "get": {
        "tags": ["Calendar Events"],
          "summary": "Get a list of calendar events in the community",
            "description": "Get a list of calendar events in the community.",
              "parameters": [
                {
                  "schema": {
                    "type": "string",
                    "enum": ["upcoming", "past", "all"],
                    "default": "upcoming",
                    "example": "upcoming"
                  },
                  "required": false,
                  "description": "Filters results to events whose date and time fall entirely or partially within the specified time frame category",
                  "name": "time_filter",
                  "in": "query"
                },
                {
                  "schema": {
                    "type": "string",
                    "enum": ["draft", "needs_approval", "published"],
                    "default": "published",
                    "example": "published"
                  },
                  "required": false,
                  "description": "Filters results to events with the specified status",
                  "name": "status",
                  "in": "query"
                },
                {
                  "schema": {
                    "type": "string",
                    "enum": ["true", "false"]
                  },
                  "required": false,
                  "description": "Filters results based on whether the events are published to the site. If not provided, all events are returned regardless of site publication configuration.",
                  "name": "published_to_site",
                  "in": "query"
                },
                {
                  "schema": {
                    "type": "string",
                    "enum": ["true", "false"]
                  },
                  "required": false,
                  "description": "Filters results based on whether the events are unlisted. If not provided, all events are returned.",
                  "name": "is_unlisted",
                  "in": "query"
                }
              ],
                "responses": {
          "200": {
            "description": "Gets a list of calendar events in the community",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "data": {
                      "type": "array",
                        "items": {
                        "type": "object",
                          "properties": {
                          "id": {
                            "type": "string"
                          },
                          "created_at": {
                            "type": "string"
                          },
                          "allow_public_guest_list": {
                            "type": "boolean"
                          },
                          "description_slack_blocks": {
                            "type": "array",
                              "nullable": true,
                                "items": {
                              "type": "object",
                                "additionalProperties": {
                                "nullable": true
                              }
                            },
                            "description": "The event description in Slack blocks format.",
                              "example": [
                                {
                                  "type": "section",
                                  "text": {
                                    "type": "mrkdwn",
                                    "text": "This is the event description."
                                  }
                                }
                              ]
                          },
                          "enable_registration_button": {
                            "type": "boolean"
                          },
                          "end_date": {
                            "type": "string",
                              "example": "2025-01-07T15:30:00-08:00"
                          },
                          "external_speakers": {
                            "type": "string",
                              "nullable": true,
                                "example": "John Doe, Jane Doe"
                          },
                          "is_unlisted": {
                            "type": "boolean"
                          },
                          "link": {
                            "type": "string",
                              "nullable": true,
                                "example": "https://example.com/my-event"
                          },
                          "location": {
                            "type": "string",
                              "nullable": true,
                                "example": "1 Market Street, San Francisco, CA"
                          },
                          "luma_event_id": {
                            "type": "string",
                              "nullable": true,
                                "example": "https://lu.ma/event/evt-6pGPLeDBObis0G4"
                          },
                          "publish_to_site": {
                            "type": "boolean"
                          },
                          "triggers_webhooks": {
                            "type": "boolean"
                          },
                          "recap_slack_blocks": {
                            "type": "array",
                              "nullable": true,
                                "items": {
                              "type": "object",
                                "additionalProperties": {
                                "nullable": true
                              }
                            },
                            "description": "The event recap in Slack blocks format.",
                              "example": [
                                {
                                  "type": "section",
                                  "text": {
                                    "type": "mrkdwn",
                                    "text": "This is the event recap."
                                  }
                                }
                              ]
                          },
                          "recording_link": {
                            "type": "string",
                              "nullable": true,
                                "example": "https://www.youtube.com/watch?v=abc123"
                          },
                          "webhook_custom_metadata": {
                            "type": "string",
                              "nullable": true,
                                "example": "third-party-event-id"
                          },
                          "show_end_date": {
                            "type": "boolean"
                          },
                          "slug": {
                            "type": "string",
                              "description": "The URL slug for the event.",
                                "example": "my-event"
                          },
                          "start_date": {
                            "type": "string",
                              "example": "2025-01-07T15:00:00-07:00"
                          },
                          "status": {
                            "type": "string",
                              "enum": ["draft", "needs_approval", "published"],
                                "description": "The event status."
                          },
                          "title": {
                            "type": "string",
                              "example": "My Event"
                          },
                          "use_registration_btn_as_link": {
                            "type": "boolean"
                          },
                          "cover_image_url": {
                            "type": "string",
                              "nullable": true
                          },
                          "publish_to_slack_channels": {
                            "type": "array",
                              "items": {
                              "type": "object",
                                "properties": {
                                "slack_channel_id": {
                                  "type": "string"
                                },
                                "feed_id": {
                                  "type": "string",
                                    "nullable": true
                                }
                              },
                              "required": ["slack_channel_id"]
                            },
                            "minItems": 1,
                              "maxItems": 10,
                                "description": "The Slack channel(s) and connected site feed(s), if any, that the event announcements are posted to when published."
                          },
                          "hosts": {
                            "type": "array",
                              "items": {
                              "type": "string"
                            },
                            "minItems": 1,
                              "maxItems": 5,
                                "description": "The user(s) featured as a host for the event.",
                                  "example": ["U1234567A"]
                          },
                          "speakers": {
                            "type": "array",
                              "items": {
                              "type": "string"
                            },
                            "maxItems": 5,
                              "description": "The user(s) featured as a speaker for the event.",
                                "example": ["U1234567A"]
                          },
                          "tags": {
                            "type": "array",
                              "nullable": true,
                                "items": {
                              "type": "object",
                                "properties": {
                                "id": {
                                  "type": "string"
                                },
                                "created_at": {
                                  "type": "string"
                                },
                                "tag_group_id": {
                                  "type": "string"
                                },
                                "label": {
                                  "type": "string"
                                }
                              },
                              "required": [
                                "id",
                                "created_at",
                                "tag_group_id",
                                "label"
                              ]
                            }
                          }
                        },
                        "required": [
                          "id",
                          "created_at",
                          "allow_public_guest_list",
                          "description_slack_blocks",
                          "enable_registration_button",
                          "end_date",
                          "external_speakers",
                          "is_unlisted",
                          "link",
                          "location",
                          "luma_event_id",
                          "publish_to_site",
                          "triggers_webhooks",
                          "recording_link",
                          "webhook_custom_metadata",
                          "show_end_date",
                          "slug",
                          "start_date",
                          "status",
                          "title",
                          "use_registration_btn_as_link",
                          "publish_to_slack_channels",
                          "hosts",
                          "speakers"
                        ]
                      }
                    }
                  },
                  "required": ["success", "data"]
                }
              }
            }
          },
          "400": {
            "description": "Returns an error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          },
          "403": {
            "description": "Returns a Forbidden error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          },
          "500": {
            "description": "Returns an Internal Server Error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": ["Calendar Events"],
          "summary": "Create a calendar event",
            "description": "Create a new Calendar Event.",
              "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                  "properties": {
                  "allow_public_guest_list": {
                    "type": "boolean",
                      "default": false
                  },
                  "description_slack_blocks": {
                    "type": "array",
                      "nullable": true,
                        "items": {
                      "type": "object",
                        "additionalProperties": {
                        "nullable": true
                      }
                    },
                    "description": "The event description in Slack blocks format. Only one of description_blocks or description_text must be present.",
                      "example": [
                        {
                          "type": "section",
                          "text": {
                            "type": "mrkdwn",
                            "text": "This is the event description."
                          }
                        }
                      ]
                  },
                  "description_text": {
                    "type": "string",
                      "nullable": true,
                        "description": "The event description in plaintext format. Only one of description_blocks or description_text must be present.",
                          "example": "This is the event description."
                  },
                  "enable_registration_button": {
                    "type": "boolean",
                      "default": false
                  },
                  "end_date": {
                    "type": "string",
                      "example": "2025-01-07T15:30:00-08:00"
                  },
                  "external_speakers": {
                    "type": "string",
                      "nullable": true,
                        "example": "John Doe, Jane Doe"
                  },
                  "is_unlisted": {
                    "type": "boolean",
                      "default": false
                  },
                  "link": {
                    "type": "string",
                      "nullable": true,
                        "example": "https://example.com/my-event"
                  },
                  "location": {
                    "type": "string",
                      "nullable": true,
                        "example": "1 Market Street, San Francisco, CA"
                  },
                  "luma_event_id": {
                    "type": "string",
                      "nullable": true,
                        "example": "https://lu.ma/event/evt-6pGPLeDBObis0G4"
                  },
                  "publish_to_site": {
                    "type": "boolean",
                      "default": false
                  },
                  "triggers_webhooks": {
                    "type": "boolean",
                      "default": false
                  },
                  "recap_slack_blocks": {
                    "type": "array",
                      "nullable": true,
                        "items": {
                      "type": "object",
                        "additionalProperties": {
                        "nullable": true
                      }
                    },
                    "description": "The event recap in Slack blocks format. Only one of recap_slack_blocks or recap_text must be present.",
                      "example": [
                        {
                          "type": "section",
                          "text": {
                            "type": "mrkdwn",
                            "text": "This is the event recap."
                          }
                        }
                      ]
                  },
                  "recap_text": {
                    "type": "string",
                      "nullable": true,
                        "description": "The event recap in Slack blocks format. Only one of recap_slack_blocks or recap_text must be present.",
                          "example": "This is the event recap."
                  },
                  "recording_link": {
                    "type": "string",
                      "nullable": true,
                        "example": "https://www.youtube.com/watch?v=abc123"
                  },
                  "webhook_custom_metadata": {
                    "type": "string",
                      "nullable": true,
                        "example": "third-party-event-id"
                  },
                  "show_end_date": {
                    "type": "boolean",
                      "default": true
                  },
                  "slug": {
                    "type": "string",
                      "nullable": true,
                        "minLength": 3,
                          "maxLength": 70,
                            "description": "The URL slug for the event. If not provided, one will be generated based off the title.",
                              "example": "my-event"
                  },
                  "start_date": {
                    "type": "string",
                      "example": "2025-01-07T15:00:00-07:00"
                  },
                  "status": {
                    "type": "string",
                      "enum": ["draft", "needs_approval", "published"],
                        "default": "draft",
                          "description": "The event status. Events created with \"published\" status will immediately be published to the specified Slack channel(s) and possibly to the site."
                  },
                  "title": {
                    "type": "string",
                      "minLength": 3,
                        "maxLength": 70,
                          "example": "My Event"
                  },
                  "use_registration_btn_as_link": {
                    "type": "boolean",
                      "default": false
                  },
                  "publish_to_slack_channels": {
                    "type": "array",
                      "items": {
                      "type": "string"
                    },
                    "minItems": 1,
                      "maxItems": 10,
                        "description": "The Slack channel(s) that the event announcements are posted to when published.",
                          "example": ["C1234567A", "C1234567B"]
                  },
                  "hosts": {
                    "type": "array",
                      "items": {
                      "type": "string"
                    },
                    "minItems": 1,
                      "maxItems": 5,
                        "description": "The Slack user(s) featured as a host for the event.",
                          "example": ["U1234567A"]
                  },
                  "speakers": {
                    "type": "array",
                      "items": {
                      "type": "string"
                    },
                    "maxItems": 5,
                      "default": [],
                        "description": "The Slack user(s) featured as a speaker for the event.",
                          "example": ["U1234567A"]
                  },
                  "tags": {
                    "type": "array",
                      "items": {
                      "type": "string"
                    },
                    "maxItems": 5,
                      "default": [],
                        "description": "The ids of the tags for the event.",
                          "example": ["c95e654d-e2fc-44bd-a05a-148355113dfa"]
                  }
                },
                "required": [
                  "end_date",
                  "start_date",
                  "title",
                  "publish_to_slack_channels",
                  "hosts"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Creates the calendar event",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "data": {
                      "type": "object",
                        "properties": {
                        "calendar_event_id": {
                          "type": "string"
                        }
                      },
                      "required": ["calendar_event_id"]
                    }
                  },
                  "required": ["success", "data"]
                }
              }
            }
          },
          "400": {
            "description": "Returns an error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          },
          "403": {
            "description": "Returns a Forbidden error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          },
          "500": {
            "description": "Returns an Internal Server Error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          }
        }
      }
    },
    "/admin/v0/calendar_events/{calendarEventId}": {
      "get": {
        "tags": ["Calendar Events"],
          "summary": "Get a calendar event",
            "description": "Get a calendar event",
              "parameters": [
                {
                  "schema": {
                    "type": "string",
                    "minLength": 1,
                    "example": "8x38el2x6di9"
                  },
                  "required": true,
                  "name": "calendarEventId",
                  "in": "path"
                }
              ],
                "responses": {
          "200": {
            "description": "Gets a calendar event",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "data": {
                      "type": "object",
                        "properties": {
                        "id": {
                          "type": "string"
                        },
                        "created_at": {
                          "type": "string"
                        },
                        "allow_public_guest_list": {
                          "type": "boolean"
                        },
                        "description_slack_blocks": {
                          "type": "array",
                            "nullable": true,
                              "items": {
                            "type": "object",
                              "additionalProperties": {
                              "nullable": true
                            }
                          },
                          "description": "The event description in Slack blocks format.",
                            "example": [
                              {
                                "type": "section",
                                "text": {
                                  "type": "mrkdwn",
                                  "text": "This is the event description."
                                }
                              }
                            ]
                        },
                        "enable_registration_button": {
                          "type": "boolean"
                        },
                        "end_date": {
                          "type": "string",
                            "example": "2025-01-07T15:30:00-08:00"
                        },
                        "external_speakers": {
                          "type": "string",
                            "nullable": true,
                              "example": "John Doe, Jane Doe"
                        },
                        "is_unlisted": {
                          "type": "boolean"
                        },
                        "link": {
                          "type": "string",
                            "nullable": true,
                              "example": "https://example.com/my-event"
                        },
                        "location": {
                          "type": "string",
                            "nullable": true,
                              "example": "1 Market Street, San Francisco, CA"
                        },
                        "luma_event_id": {
                          "type": "string",
                            "nullable": true,
                              "example": "https://lu.ma/event/evt-6pGPLeDBObis0G4"
                        },
                        "publish_to_site": {
                          "type": "boolean"
                        },
                        "triggers_webhooks": {
                          "type": "boolean"
                        },
                        "recap_slack_blocks": {
                          "type": "array",
                            "nullable": true,
                              "items": {
                            "type": "object",
                              "additionalProperties": {
                              "nullable": true
                            }
                          },
                          "description": "The event recap in Slack blocks format.",
                            "example": [
                              {
                                "type": "section",
                                "text": {
                                  "type": "mrkdwn",
                                  "text": "This is the event recap."
                                }
                              }
                            ]
                        },
                        "recording_link": {
                          "type": "string",
                            "nullable": true,
                              "example": "https://www.youtube.com/watch?v=abc123"
                        },
                        "webhook_custom_metadata": {
                          "type": "string",
                            "nullable": true,
                              "example": "third-party-event-id"
                        },
                        "show_end_date": {
                          "type": "boolean"
                        },
                        "slug": {
                          "type": "string",
                            "description": "The URL slug for the event.",
                              "example": "my-event"
                        },
                        "start_date": {
                          "type": "string",
                            "example": "2025-01-07T15:00:00-07:00"
                        },
                        "status": {
                          "type": "string",
                            "enum": ["draft", "needs_approval", "published"],
                              "description": "The event status."
                        },
                        "title": {
                          "type": "string",
                            "example": "My Event"
                        },
                        "use_registration_btn_as_link": {
                          "type": "boolean"
                        },
                        "cover_image_url": {
                          "type": "string",
                            "nullable": true
                        },
                        "publish_to_slack_channels": {
                          "type": "array",
                            "items": {
                            "type": "object",
                              "properties": {
                              "slack_channel_id": {
                                "type": "string"
                              },
                              "feed_id": {
                                "type": "string",
                                  "nullable": true
                              }
                            },
                            "required": ["slack_channel_id"]
                          },
                          "minItems": 1,
                            "maxItems": 10,
                              "description": "The Slack channel(s) and connected site feed(s), if any, that the event announcements are posted to when published."
                        },
                        "hosts": {
                          "type": "array",
                            "items": {
                            "type": "string"
                          },
                          "minItems": 1,
                            "maxItems": 5,
                              "description": "The user(s) featured as a host for the event.",
                                "example": ["U1234567A"]
                        },
                        "speakers": {
                          "type": "array",
                            "items": {
                            "type": "string"
                          },
                          "maxItems": 5,
                            "description": "The user(s) featured as a speaker for the event.",
                              "example": ["U1234567A"]
                        },
                        "tags": {
                          "type": "array",
                            "nullable": true,
                              "items": {
                            "type": "object",
                              "properties": {
                              "id": {
                                "type": "string"
                              },
                              "created_at": {
                                "type": "string"
                              },
                              "tag_group_id": {
                                "type": "string"
                              },
                              "label": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "id",
                              "created_at",
                              "tag_group_id",
                              "label"
                            ]
                          }
                        }
                      },
                      "required": [
                        "id",
                        "created_at",
                        "allow_public_guest_list",
                        "description_slack_blocks",
                        "enable_registration_button",
                        "end_date",
                        "external_speakers",
                        "is_unlisted",
                        "link",
                        "location",
                        "luma_event_id",
                        "publish_to_site",
                        "triggers_webhooks",
                        "recording_link",
                        "webhook_custom_metadata",
                        "show_end_date",
                        "slug",
                        "start_date",
                        "status",
                        "title",
                        "use_registration_btn_as_link",
                        "publish_to_slack_channels",
                        "hosts",
                        "speakers"
                      ]
                    }
                  },
                  "required": ["success", "data"]
                }
              }
            }
          },
          "400": {
            "description": "Returns an error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          },
          "403": {
            "description": "Returns a Forbidden error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          },
          "404": {
            "description": "Returns a Not Found error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          },
          "500": {
            "description": "Returns an Internal Server Error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": ["Calendar Events"],
          "summary": "Delete a calendar event",
            "description": "Delete a calendar event",
              "parameters": [
                {
                  "schema": {
                    "type": "string",
                    "minLength": 1,
                    "example": "8x38el2x6di9"
                  },
                  "required": true,
                  "name": "calendarEventId",
                  "in": "path"
                }
              ],
                "responses": {
          "200": {
            "description": "Deletes a calendar event",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "data": {
                      "type": "object",
                        "properties": {
                        "id": {
                          "type": "string"
                        }
                      },
                      "required": ["id"]
                    }
                  },
                  "required": ["success", "data"]
                }
              }
            }
          },
          "400": {
            "description": "Returns an error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          },
          "403": {
            "description": "Returns a Forbidden error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          },
          "404": {
            "description": "Returns a Not Found error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          },
          "500": {
            "description": "Returns an Internal Server Error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          }
        }
      }
    },
    "/admin/v0/search": {
      "get": {
        "tags": ["Search"],
          "summary": "[Closed Alpha] Search documents",
            "description": "[Closed Alpha] Search documents using a query string and return relevant results.",
              "parameters": [
                {
                  "schema": {
                    "type": "string",
                    "minLength": 1,
                    "example": "search term"
                  },
                  "required": true,
                  "description": "Search query string",
                  "name": "q",
                  "in": "query"
                }
              ],
                "responses": {
          "200": {
            "description": "Returns search results",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "documents": {
                      "type": "object",
                        "properties": {
                        "posts": {
                          "type": "array",
                            "items": {
                            "type": "object",
                              "properties": {
                              "id": {
                                "type": "string"
                              },
                              "created_at": {
                                "type": "string"
                              },
                              "title": {
                                "type": "string"
                              },
                              "slug": {
                                "type": "string"
                              },
                              "feed_id": {
                                "type": "string"
                              },
                              "author_profile_id": {
                                "type": "string"
                              },
                              "read_time_minutes": {
                                "type": "number"
                              },
                              "file_attachments_count": {
                                "type": "number"
                              },
                              "reactions_count": {
                                "type": "number"
                              },
                              "comments_count": {
                                "type": "number"
                              },
                              "slack_message": {
                                "type": "object",
                                  "properties": {
                                  "id": {
                                    "type": "string"
                                  },
                                  "message_ts": {
                                    "type": "number"
                                  },
                                  "blocks": {
                                    "type": "object",
                                      "additionalProperties": {
                                      "type": "string"
                                    }
                                  },
                                  "markdown": {
                                    "type": "string"
                                  },
                                  "permalink": {
                                    "type": "string",
                                      "nullable": true
                                  },
                                  "parent_slack_message_id": {
                                    "type": "string",
                                      "nullable": true
                                  }
                                },
                                "required": [
                                  "id",
                                  "message_ts",
                                  "blocks",
                                  "markdown",
                                  "permalink"
                                ]
                              },
                              "cover_image": {
                                "type": "object",
                                  "nullable": true,
                                    "properties": {
                                  "id": {
                                    "type": "string"
                                  },
                                  "created_at": {
                                    "type": "string"
                                  },
                                  "title": {
                                    "type": "string",
                                      "nullable": true
                                  },
                                  "name": {
                                    "type": "string"
                                  },
                                  "thumbnail_url": {
                                    "type": "string",
                                      "nullable": true
                                  },
                                  "mimetype": {
                                    "type": "string"
                                  },
                                  "url": {
                                    "type": "string"
                                  }
                                },
                                "required": [
                                  "id",
                                  "created_at",
                                  "title",
                                  "name",
                                  "thumbnail_url",
                                  "mimetype",
                                  "url"
                                ]
                              },
                              "author": {
                                "type": "object",
                                  "properties": {
                                  "id": {
                                    "type": "string"
                                  },
                                  "created_at": {
                                    "type": "string"
                                  },
                                  "preferred_name": {
                                    "type": "string"
                                  },
                                  "slack_profile": {
                                    "type": "object",
                                      "properties": {
                                      "id": {
                                        "type": "string"
                                      },
                                      "is_admin": {
                                        "type": "boolean"
                                      },
                                      "is_bot": {
                                        "type": "boolean"
                                      },
                                      "image_72": {
                                        "type": "string",
                                          "nullable": true
                                      },
                                      "image_original": {
                                        "type": "string",
                                          "nullable": true
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "is_admin",
                                      "is_bot",
                                      "image_72",
                                      "image_original"
                                    ]
                                  }
                                },
                                "required": [
                                  "id",
                                  "created_at",
                                  "preferred_name",
                                  "slack_profile"
                                ]
                              },
                              "feed": {
                                "type": "object",
                                  "properties": {
                                  "id": {
                                    "type": "string"
                                  },
                                  "label": {
                                    "type": "string"
                                  },
                                  "slug": {
                                    "type": "string"
                                  }
                                },
                                "required": ["id", "label", "slug"]
                              },
                              "references": {
                                "type": "object",
                                  "properties": {
                                  "mentioned_slack_users": {
                                    "type": "array",
                                      "items": {
                                      "type": "object",
                                        "properties": {
                                        "id": {
                                          "type": "string"
                                        },
                                        "created_at": {
                                          "type": "string"
                                        },
                                        "preferred_name": {
                                          "type": "string"
                                        },
                                        "slack_profile": {
                                          "type": "object",
                                            "properties": {
                                            "id": {
                                              "type": "string"
                                            },
                                            "is_admin": {
                                              "type": "boolean"
                                            },
                                            "is_bot": {
                                              "type": "boolean"
                                            },
                                            "image_72": {
                                              "type": "string",
                                                "nullable": true
                                            },
                                            "image_original": {
                                              "type": "string",
                                                "nullable": true
                                            }
                                          },
                                          "required": [
                                            "id",
                                            "is_admin",
                                            "is_bot",
                                            "image_72",
                                            "image_original"
                                          ]
                                        }
                                      },
                                      "required": [
                                        "id",
                                        "created_at",
                                        "preferred_name",
                                        "slack_profile"
                                      ]
                                    }
                                  },
                                  "mentioned_slack_channels": {
                                    "type": "array",
                                      "items": {
                                      "type": "object",
                                        "properties": {
                                        "slack_channel": {
                                          "type": "object",
                                            "properties": {
                                            "id": {
                                              "type": "string"
                                            },
                                            "name": {
                                              "type": "string",
                                                "nullable": true
                                            }
                                          },
                                          "required": ["id", "name"]
                                        },
                                        "feed": {
                                          "type": "object",
                                            "nullable": true,
                                              "properties": {
                                            "id": {
                                              "type": "string"
                                            },
                                            "label": {
                                              "type": "string"
                                            },
                                            "slug": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["id", "label", "slug"]
                                        }
                                      },
                                      "required": ["slack_channel"]
                                    }
                                  },
                                  "custom_emojis": {
                                    "type": "array",
                                      "items": {
                                      "type": "object",
                                        "properties": {
                                        "alias": {
                                          "type": "string",
                                            "nullable": true
                                        },
                                        "name": {
                                          "type": "string"
                                        },
                                        "url": {
                                          "type": "string",
                                            "nullable": true
                                        }
                                      },
                                      "required": ["alias", "name", "url"]
                                    }
                                  },
                                  "urls": {
                                    "type": "array",
                                      "items": {
                                      "type": "object",
                                        "properties": {
                                        "order_seen": {
                                          "type": "number"
                                        },
                                        "is_embedded_media": {
                                          "type": "boolean"
                                        },
                                        "is_image": {
                                          "type": "boolean"
                                        },
                                        "is_video": {
                                          "type": "boolean"
                                        },
                                        "url": {
                                          "type": "string"
                                        }
                                      },
                                      "required": [
                                        "order_seen",
                                        "is_embedded_media",
                                        "is_image",
                                        "is_video",
                                        "url"
                                      ]
                                    }
                                  }
                                }
                              }
                            },
                            "required": [
                              "id",
                              "created_at",
                              "title",
                              "slug",
                              "feed_id",
                              "author_profile_id",
                              "read_time_minutes",
                              "file_attachments_count",
                              "reactions_count",
                              "comments_count",
                              "slack_message",
                              "author",
                              "feed",
                              "references"
                            ]
                          }
                        },
                        "comments": {
                          "type": "array",
                            "items": {
                            "type": "object",
                              "properties": {
                              "id": {
                                "type": "string"
                              },
                              "created_at": {
                                "type": "string"
                              },
                              "feed_id": {
                                "type": "string"
                              },
                              "parent_post_id": {
                                "type": "string"
                              },
                              "author_profile_id": {
                                "type": "string"
                              },
                              "file_attachments_count": {
                                "type": "number"
                              },
                              "reactions_count": {
                                "type": "number"
                              },
                              "slack_message": {
                                "type": "object",
                                  "properties": {
                                  "id": {
                                    "type": "string"
                                  },
                                  "message_ts": {
                                    "type": "number"
                                  },
                                  "blocks": {
                                    "type": "object",
                                      "additionalProperties": {
                                      "type": "string"
                                    }
                                  },
                                  "markdown": {
                                    "type": "string"
                                  },
                                  "permalink": {
                                    "type": "string",
                                      "nullable": true
                                  },
                                  "parent_slack_message_id": {
                                    "type": "string",
                                      "nullable": true
                                  }
                                },
                                "required": [
                                  "id",
                                  "message_ts",
                                  "blocks",
                                  "markdown",
                                  "permalink"
                                ]
                              },
                              "parent_post": {
                                "type": "object",
                                  "properties": {
                                  "id": {
                                    "type": "string"
                                  },
                                  "created_at": {
                                    "type": "string"
                                  },
                                  "title": {
                                    "type": "string"
                                  },
                                  "slug": {
                                    "type": "string"
                                  }
                                },
                                "required": [
                                  "id",
                                  "created_at",
                                  "title",
                                  "slug"
                                ]
                              },
                              "author": {
                                "type": "object",
                                  "properties": {
                                  "id": {
                                    "type": "string"
                                  },
                                  "created_at": {
                                    "type": "string"
                                  },
                                  "preferred_name": {
                                    "type": "string"
                                  },
                                  "slack_profile": {
                                    "type": "object",
                                      "properties": {
                                      "id": {
                                        "type": "string"
                                      },
                                      "is_admin": {
                                        "type": "boolean"
                                      },
                                      "is_bot": {
                                        "type": "boolean"
                                      },
                                      "image_72": {
                                        "type": "string",
                                          "nullable": true
                                      },
                                      "image_original": {
                                        "type": "string",
                                          "nullable": true
                                      }
                                    },
                                    "required": [
                                      "id",
                                      "is_admin",
                                      "is_bot",
                                      "image_72",
                                      "image_original"
                                    ]
                                  }
                                },
                                "required": [
                                  "id",
                                  "created_at",
                                  "preferred_name",
                                  "slack_profile"
                                ]
                              },
                              "feed": {
                                "type": "object",
                                  "properties": {
                                  "id": {
                                    "type": "string"
                                  },
                                  "label": {
                                    "type": "string"
                                  },
                                  "slug": {
                                    "type": "string"
                                  }
                                },
                                "required": ["id", "label", "slug"]
                              },
                              "references": {
                                "type": "object",
                                  "properties": {
                                  "mentioned_slack_users": {
                                    "type": "array",
                                      "items": {
                                      "type": "object",
                                        "properties": {
                                        "id": {
                                          "type": "string"
                                        },
                                        "created_at": {
                                          "type": "string"
                                        },
                                        "preferred_name": {
                                          "type": "string"
                                        },
                                        "slack_profile": {
                                          "type": "object",
                                            "properties": {
                                            "id": {
                                              "type": "string"
                                            },
                                            "is_admin": {
                                              "type": "boolean"
                                            },
                                            "is_bot": {
                                              "type": "boolean"
                                            },
                                            "image_72": {
                                              "type": "string",
                                                "nullable": true
                                            },
                                            "image_original": {
                                              "type": "string",
                                                "nullable": true
                                            }
                                          },
                                          "required": [
                                            "id",
                                            "is_admin",
                                            "is_bot",
                                            "image_72",
                                            "image_original"
                                          ]
                                        }
                                      },
                                      "required": [
                                        "id",
                                        "created_at",
                                        "preferred_name",
                                        "slack_profile"
                                      ]
                                    }
                                  },
                                  "mentioned_slack_channels": {
                                    "type": "array",
                                      "items": {
                                      "type": "object",
                                        "properties": {
                                        "slack_channel": {
                                          "type": "object",
                                            "properties": {
                                            "id": {
                                              "type": "string"
                                            },
                                            "name": {
                                              "type": "string",
                                                "nullable": true
                                            }
                                          },
                                          "required": ["id", "name"]
                                        },
                                        "feed": {
                                          "type": "object",
                                            "nullable": true,
                                              "properties": {
                                            "id": {
                                              "type": "string"
                                            },
                                            "label": {
                                              "type": "string"
                                            },
                                            "slug": {
                                              "type": "string"
                                            }
                                          },
                                          "required": ["id", "label", "slug"]
                                        }
                                      },
                                      "required": ["slack_channel"]
                                    }
                                  },
                                  "custom_emojis": {
                                    "type": "array",
                                      "items": {
                                      "type": "object",
                                        "properties": {
                                        "alias": {
                                          "type": "string",
                                            "nullable": true
                                        },
                                        "name": {
                                          "type": "string"
                                        },
                                        "url": {
                                          "type": "string",
                                            "nullable": true
                                        }
                                      },
                                      "required": ["alias", "name", "url"]
                                    }
                                  },
                                  "urls": {
                                    "type": "array",
                                      "items": {
                                      "type": "object",
                                        "properties": {
                                        "order_seen": {
                                          "type": "number"
                                        },
                                        "is_embedded_media": {
                                          "type": "boolean"
                                        },
                                        "is_image": {
                                          "type": "boolean"
                                        },
                                        "is_video": {
                                          "type": "boolean"
                                        },
                                        "url": {
                                          "type": "string"
                                        }
                                      },
                                      "required": [
                                        "order_seen",
                                        "is_embedded_media",
                                        "is_image",
                                        "is_video",
                                        "url"
                                      ]
                                    }
                                  }
                                }
                              }
                            },
                            "required": [
                              "id",
                              "created_at",
                              "feed_id",
                              "parent_post_id",
                              "author_profile_id",
                              "file_attachments_count",
                              "reactions_count",
                              "slack_message",
                              "parent_post",
                              "author",
                              "feed",
                              "references"
                            ]
                          }
                        }
                      },
                      "required": ["posts", "comments"]
                    }
                  },
                  "required": ["success", "documents"]
                }
              }
            }
          },
          "400": {
            "description": "Returns an error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          },
          "403": {
            "description": "Returns a Forbidden error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          }
        }
      }
    },
    "/admin/v0/groups/{groupId}/members": {
      "put": {
        "tags": ["Groups"],
          "summary": "Add a user as a member of a group",
            "description": "Adds a user as a member of a group.",
              "parameters": [
                {
                  "schema": {
                    "type": "string",
                    "minLength": 1,
                    "example": "123e4567-e89b-12d3-a456-426614174000"
                  },
                  "required": true,
                  "name": "groupId",
                  "in": "path"
                }
              ],
                "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                  "properties": {
                  "users": {
                    "type": "array",
                      "items": {
                      "type": "string"
                    },
                    "example": ["U1234567A"]
                  }
                },
                "required": ["users"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Gets a list of calendar events in the community",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    }
                  },
                  "required": ["success"]
                }
              }
            }
          },
          "400": {
            "description": "Returns an error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          },
          "403": {
            "description": "Returns a Forbidden error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          },
          "404": {
            "description": "Returns a Not Found error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          },
          "500": {
            "description": "Returns an Internal Server Error",
              "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                    "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": ["success", "error"]
                }
              }
            }
          }
        }
      }
    }
  }
}
