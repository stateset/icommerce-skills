# Order Status and Transitions

## Status Flow

```
Pending -> Confirmed -> Processing -> Shipped -> Delivered
   \          \
    \-> Cancelled  \-> Cancelled
```

## Allowed Transitions

| Current Status | Allowed Next Status |
|---------------|-------------------|
| `pending` | `confirmed`, `cancelled` |
| `confirmed` | `processing`, `cancelled` |
| `processing` | `shipped` |
| `shipped` | `delivered` |
| `cancelled` | (terminal) |
| `delivered` | (terminal) |

## Common Commands

```bash
stateset --apply "create order for customer CUST-123"
stateset --apply "confirm order ORD-123"
stateset --apply "process order ORD-123"
stateset --apply "ship order ORD-123 with tracking TRACK123"
stateset --apply "cancel order ORD-123"
stateset "list orders status pending"
stateset "get order ORD-123"
```

## MCP Tool Reference

| Tool | Action | Requires --apply |
|------|--------|-----------------|
| `list_orders` | List orders with optional filters | No |
| `get_order` | Get order details by ID | No |
| `create_order` | Create a new order | Yes |
| `update_order_status` | Transition order status | Yes |
| `ship_order` | Ship with carrier and tracking | Yes |
| `cancel_order` | Cancel an order | Yes |

## Order Fields

| Field | Description |
|-------|-------------|
| `order_id` | Unique order identifier |
| `customer_id` | Customer who placed the order |
| `order_status` | Current order status |
| `paymentStatus` | pending, paid, failed, refunded |
| `fulfillmentStatus` | unfulfilled, partially_fulfilled, fulfilled, returned |
| `items[]` | Line items with SKU, quantity, price |
| `subtotal` / `tax` / `shipping` / `total` | Order totals |
| `tracking_number` | Carrier tracking number |
| `created_at` | Order creation timestamp |
| `updated_at` | Last modification timestamp |
| `shipping_address` | Delivery address object |
| `billing_address` | Billing address object |
| `notes` | Internal order notes |
| `source` | Channel: web, mobile, api, pos |
| `discount_total` | Sum of applied discounts |
| `currency` | ISO 4217 currency code |

## Error Handling

| Error Code | Meaning | Resolution |
|------------|---------|------------|
| `ORDER_NOT_FOUND` | Order ID does not exist | Verify the order ID and retry |
| `INVALID_TRANSITION` | Status change not allowed | Check the allowed transitions table above |
| `DUPLICATE_ORDER` | Idempotency key collision | Use the existing order from the response |
| `PAYMENT_REQUIRED` | Cannot confirm without payment | Create and complete payment first |
| `INVENTORY_UNAVAILABLE` | Insufficient stock for line item | Check inventory or reduce quantity |

## Order Lifecycle Hooks

Events emitted at each transition, useful for integrations:

| Transition | Event Emitted |
|------------|---------------|
| `pending -> confirmed` | `order.confirmed` |
| `confirmed -> processing` | `order.processing` |
| `processing -> shipped` | `order.shipped` |
| `shipped -> delivered` | `order.delivered` |
| `* -> cancelled` | `order.cancelled` |

## Filtering and Sorting

```bash
stateset "list orders status pending created_after 2026-01-01"
stateset "list orders customer CUST-123 sort total desc"
stateset "list orders fulfillmentStatus unfulfilled limit 50"
stateset "list orders paymentStatus failed"
```

## Bulk Operations

```bash
stateset --apply "cancel orders where status pending older_than 30d"
stateset --apply "archive orders where status delivered older_than 90d"
```

## Integration Notes

- Orders created via POS include `source: pos` and a `register_id` field.
- Webhook payloads for order events include the full order object.
- The `items[]` array supports `discount` per line item for item-level promotions.
- Use `X-Idempotency-Key` header on `create_order` to safely retry on network failures.
- Orders with `paymentStatus: failed` are automatically cancelled after 48 hours unless retried.
