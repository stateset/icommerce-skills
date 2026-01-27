# Attachment Formatting for Vision

## Structured Content Format

When a message includes images, build a content array with text and image_url parts:

```json
{
  "role": "user",
  "content": [
    { "type": "text", "text": "Here is the issue" },
    { "type": "image_url", "image_url": { "url": "https://example.com/image.jpg", "detail": "auto" } }
  ]
}
```

## Attachment Fields

Use these fields when available:
- content_type (image/jpeg, image/png)
- url, public_url, or href

## Model Selection

If any message includes image_url content, use a vision-capable model (for example: gpt-4-turbo).

## Minimal Helper (Pseudo)

```javascript
function processMessagesWithAttachments(messages) {
  return messages.map((message) => {
    const images = (message.attachments || []).filter((att) =>
      att.content_type && att.content_type.startsWith('image/')
    );

    if (images.length === 0) return message;

    const content = [
      { type: 'text', text: message.content || message.body_text || message.body_html || '' }
    ];

    images.forEach((attachment) => {
      content.push({
        type: 'image_url',
        image_url: { url: attachment.url || attachment.public_url || attachment.href, detail: 'auto' }
      });
    });

    return { role: message.role, content };
  });
}
```

Source: `/home/dom/next-temporal/image-attachment-handling.md`
