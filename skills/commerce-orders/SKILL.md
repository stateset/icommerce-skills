---
name: commerce-orders
description: Manage order lifecycles, fulfillment, shipping, and cancellations. Use when running `stateset-orders`, `stateset-direct orders`, or updating order status.
---

# Commerce Orders

Handle order creation, status transitions, and fulfillment updates.

## How It Works

1. Fetch the order and validate current status.
2. Apply allowed status transitions.
3. Ship, cancel, or update fulfillment details.
4. Report final status and tracking info.
5. Emit order events to the outbox for downstream sync and webhook delivery.

## Status Flows

- **Order:** pending -> confirmed -> processing -> shipped -> delivered | cancelled
- **Fulfillment:** unfulfilled -> partially_fulfilled -> fulfilled
- **Payment:** authorized -> captured -> refunded | voided

## Usage

- CLI: `stateset-orders ...` or `stateset-direct orders <action>`
- Writes require `--apply`.
- MCP tools: `list_orders`, `get_order`, `create_order`, `update_order_status`, `ship_order`, `cancel_order`.

## Permissions

- **Read:** `list_orders`, `get_order` — no `--apply` needed.
- **Write:** `create_order`, `update_order_status`, `ship_order`, `cancel_order` — requires `--apply`.

## Examples

```bash
stateset orders list --status processing --limit 20
stateset orders get ord_123
stateset orders update-status ord_123 --status shipped --tracking 1Z999AA10123456784 --apply
stateset orders cancel ord_456 --reason customer_request --apply
```

## Output

```json
{"status":"updated","order_id":"ord_123","order_status":"shipped","tracking_number":"1Z999AA10123456784","carrier":"ups"}
```

## Present Results to User

- Status transition applied and any tracking numbers.
- Items or totals affected.
- Follow-up actions required (refunds, returns).
- Events emitted and sync state of the order.

## Troubleshooting

- Invalid transition: confirm the current `order_status` before calling `update_order_status`.
- Already shipped: create a return flow via `commerce-customer-service` instead of cancelling.
- `tracking_number` missing: verify the carrier API response in `ship_order` output.
- Order not found: check `order_id` format (prefix `ord_`) and run `list_orders` to confirm.

## Error Codes

- `INVALID_TRANSITION`: Status change not allowed from current order state.
- `ORDER_NOT_FOUND`: No order exists for the given `order_id`.
- `FULFILLMENT_CONFLICT`: Order already shipped; use a return flow instead.

## Related Skills

- **commerce-customers** -- look up the customer tied to an order.
- **commerce-customer-service** -- handle returns or refunds after order issues.
- **commerce-sync** -- push order events to the sequencer for multi-node consistency.
- **commerce-autonomous-engine** -- schedule recurring fulfillment or reminder jobs.

## References
- references/order-status.md
- /home/dom/stateset-icommerce/cli/.claude/skills/commerce-orders/SKILL.md
- /home/dom/stateset-icommerce/examples/workflows.md
