---
name: commerce-shipments
description: Manage shipments, tracking, and delivery updates. Use when running `stateset-shipments`, creating shipments, updating tracking, or recording delivery events.
---

# Commerce Shipments

Track shipment creation, carrier assignments, and delivery events.

## How It Works

1. Validate the order is ready to ship (status `processing`, items fulfilled).
2. Create a shipment with carrier, service level, and tracking number.
3. Update order status to `shipped` and notify the customer.
4. Track delivery milestones (in transit, out for delivery, delivered).
5. Record delivery confirmation or exceptions (damaged, refused, lost).

## Usage

- CLI: `stateset-shipments ...` and `stateset-orders ...` for status updates.
- Writes require `--apply`.
- MCP tools: `list_shipments`, `create_shipment`, `deliver_shipment`, `ship_order`, `update_tracking`.

## Permissions

- **Read:** `list_shipments` — no `--apply` needed.
- **Write:** `create_shipment`, `deliver_shipment`, `ship_order`, `update_tracking` — requires `--apply`.

## Examples

```bash
stateset shipments list --order-id ord_456
stateset shipments create --order-id ord_456 --carrier UPS --tracking 1Z999AA10123456784 --apply
stateset shipments deliver ship_123 --apply
stateset shipments update-tracking ship_123 --tracking 1Z999AA10123456799 --apply
```

## Status Flows

**Shipment:** Created -> Shipped -> In Transit -> Delivered (or Exception/Returned)

## Output

```json
{"status":"shipped","shipment_id":"ship_123","order_id":"ord_456","carrier":"UPS","tracking":"1Z999AA10123456784","ship_date":"2025-01-15"}
```

## Present Results to User

- Shipment IDs, carrier, service level, and tracking numbers.
- Order status transition and estimated delivery date.
- Delivery timestamps or exception details.
- Customer notification status.

## Troubleshooting

- Invalid tracking format: verify carrier-specific tracking number format.
- Order already shipped: check existing shipment records before creating duplicates.
- Delivery exception: contact carrier with tracking number for resolution.
- Missing carrier: ensure carrier name matches supported list (UPS, FedEx, USPS, DHL).

## Error Codes

- `INVALID_TRACKING`: Tracking number format does not match the carrier.
- `DUPLICATE_SHIPMENT`: A shipment already exists for this order.
- `DELIVERY_EXCEPTION`: Carrier reported a delivery failure (damaged, refused, lost).

## Related Skills

- commerce-orders — order status transitions triggered by shipment
- commerce-fulfillment — pack/ship tasks that feed into shipment creation
- commerce-returns — return shipments for approved returns

## References
- references/shipments-flow.md
- /home/dom/stateset-icommerce/cli/.claude/agents/shipments.md
