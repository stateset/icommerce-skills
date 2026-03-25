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
