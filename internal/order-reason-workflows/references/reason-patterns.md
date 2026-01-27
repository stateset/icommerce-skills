# Reason Workflow Patterns

See `reason-workflows-map.md` for the current workflow list and file locations.

## Trigger Paths

- /pages/api/reason/<brand>.js for ticket-driven reason workflows.
- /pages/api/reason/sync-shopify-orders.js for order ingestion.

## Workflow Types

- <brand>GorgiasReasonWorkflow(ticket, message)
- <brand>ShopifyReasonWorkflow(order)
- <brand>ReasonWorkflow(ticket, message)

## Common Actions

- Cancel or refund Shopify orders.
- Create replacement or exchange orders.
- Update subscriptions (Recharge, Skio, Ordergroove, Retextion).
- Start returns (Loop).
- Update fulfillment (ShipHero, ShipMonk).
- Add ticket notes and custom fields.

## Tool-Calling Safety

- Provide a function list to the LLM.
- Validate parameters before executing actions.
- Gate actions with permitted function checks.
- Provide a safe fallback response when action is blocked.

## Idempotency and Logging

- Use workflowId based on ticket or order id.
- Return a status payload with action and identifiers.
- Add a private note summarizing the action in the ticket.

## Existing Reason Workflows (from next-temporal)

- <brand>GorgiasReasonWorkflow and <brand>ShopifyReasonWorkflow
- <brand>ReasonWorkflow for shared or fallback handling

## Source References

- Workflow registry: `/home/dom/next-temporal/temporal/src/workflows-index.mjs`
- Brand workflows/activities: `/home/dom/next-temporal/temporal/src/<brand>/workflows.mjs` and `/home/dom/next-temporal/temporal/src/<brand>/activities.mjs`
