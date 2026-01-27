# Replacement Order Patterns

## Brand A Replacement Order

- Fetch org settings and tokens.
- Require Shopify integration data on the ticket.
- Build chat history and confirm replacement intent.
- Create replacement order in Shopify.
- Update ticket and log response.

## Brand B Replacement Order

- Use Loop or ShipHero data to verify fulfillment status.
- Create replacement order with createReplacementOrder.
- Update ShipHero order or hold when needed.
- Track automated resolution metrics.

## Guardrails

- If Shopify data is missing, return a safe status and avoid creating orders.
- Record order id and ticket id in the response payload.

## Source References

- Brand A workflow: `/home/dom/next-temporal/temporal/src/<brand-a>/workflows.mjs` (replacementOrderWorkflow)
- Brand B workflows/activities: `/home/dom/next-temporal/temporal/src/<brand-b>/workflows.mjs`, `/home/dom/next-temporal/temporal/src/<brand-b>/activities.mjs`
