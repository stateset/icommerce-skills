---
name: ticket-attachment-vision
description: Include ticket image attachments in LLM prompts using vision-capable models. Use when adding image support to response workflows or troubleshooting attachment handling.
---

# Ticket Attachment Vision

Add image attachments from tickets into LLM prompts.

## How It Works

1. Detect image attachments on ticket messages.
2. Convert messages into structured content with text + image_url parts.
3. Choose a vision-capable model when images are present.
4. Send the combined prompt to the LLM.

## Usage

Use when you need to:
- Add image understanding to a response workflow.
- Normalize attachment payloads from support platforms.
- Switch models based on message content.

Typical touchpoints:
- `temporal/src/<brand>/workflows.mjs`
- `temporal/src/<brand>/activities.mjs`

## Output

Example message payload:

```json
{
  "role": "user",
  "content": [
    { "type": "text", "text": "See the issue in the photo." },
    { "type": "image_url", "image_url": { "url": "https://..." } }
  ]
}
```

## Present Results to User

- How attachments are detected and formatted.
- Which model is used when images are present.
- Any limitations (public URLs, cost).

## Troubleshooting

- Images not visible: ensure URLs are public or use a proxy.
- Model errors: confirm the chosen model supports vision.
- Payload shape issues: validate message schema.

## References

- `references/attachment-format.md`
