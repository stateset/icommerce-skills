---
name: order-reason-workflows
description: Build or update Temporal reason workflows that automate order actions (returns, cancellations, subscriptions) across Shopify/Gorgias/Recharge/Loop/Skio/Ordergroove. Use when adding or fixing reason workflows or order automation.
---

# Order Reason Workflows

Automate order actions triggered by support tickets or order events.

## How It Works

1. Receive a reason request from `/api/reason/<brand>` or a Shopify trigger.
2. Load org settings and fetch order/customer context.
3. Decide the action using rules or LLM tool calls.
4. Execute the action in external systems (Shopify, subscription provider, returns).
5. Update the support ticket and return a status payload.

## Usage

Use when you need to:
- Add or modify a reason workflow for a brand.
- Integrate new order actions (cancel, refund, replace, return).
- Add safe tool-calling or validation gates.

Typical touchpoints:
- `pages/api/reason/<brand>.js`
- `temporal/src/<brand>/workflows.mjs`
- `temporal/src/<brand>/activities.mjs`
- `temporal/src/workflows-index.mjs`
- `temporal/src/activities-index.mjs`

## Output

Example status object:

```json
{
  "status": "completed",
  "action": "cancel_order",
  "order_id": "98765",
  "workflow_id": "brand-reason-98765"
}
```

## Present Results to User

- Action executed and target system.
- Ticket updates or notes added.
- Any gating or validation added.
- Suggested verification steps.

## Troubleshooting

- Action blocked: check permitted function list and validation.
- API errors: confirm credentials and request parameters.
- Duplicate actions: make workflowId idempotent and add checks.

## References

- `references/reason-patterns.md`
- `references/reason-workflows-map.md`
