---
name: customer-response-workflows
description: Build or update Temporal customer response workflows for ecommerce support (Gorgias/Zendesk/Shopify). Use when adding a brand response workflow, tuning AI response logic, tagging, context building, or response dispatch.
---

# Customer Response Workflows

Create or modify Temporal workflows that generate AI-driven replies for support tickets.

## How It Works

1. Receive a webhook in a Next.js API route and start the workflow with an idempotent workflowId.
2. Load org settings, tokens, and prompts for the brand.
3. Build context from ticket data, order data, subscription data, and memory stores.
4. Build chat history and call the LLM (with tool calls when needed).
5. Apply tags or custom fields and detect escalation patterns.
6. Send the response and update the ticket.
7. Record the response for analytics and search.
8. Trigger follow-up workflows if needed.

## Usage

Use this skill when you need to:
- Add a new brand response workflow.
- Update prompts, tags, or context sources for a brand.
- Adjust escalation behavior or response dispatch.

Typical touchpoints:
- `pages/api/response/<brand>.js`
- `temporal/src/<brand>/workflows.mjs`
- `temporal/src/<brand>/activities.mjs`
- `temporal/src/workflows-index.mjs`
- `temporal/src/activities-index.mjs`

If images are part of the ticket context, also use the `ticket-attachment-vision` skill.

## Output

Example status object:

```json
{
  "status": "updated",
  "ticket_id": "12345",
  "workflow_id": "brand-response-12345"
}
```

## Present Results to User

- What changed and why.
- Which files were updated.
- Any new tags, custom fields, or integrations added.
- Suggested verification steps (Temporal UI, ticket update).

## Troubleshooting

- Missing tokens or prompts: confirm StateSet settings and env vars.
- LLM errors: verify model name and API key.
- Response not sent: check support platform auth and ticket id.
- Duplicate workflows: ensure workflowId uses ticket id.

## References

- `references/response-patterns.md`
- `references/response-workflows-map.md`
