# Customer Service Playbooks

## Playbook Overview

| Playbook | Primary MCP Tools | Outcome |
|----------|------------------|---------|
| Where is my order? | `get_customer`, `list_orders`, `list_shipments` | Status and tracking |
| I want a return | `get_order`, `create_return`, `approve_return` | Return/refund |
| Item out of stock | `get_stock`, `create_backorder` | Backorder or substitute |
| Cancel order | `get_order`, `cancel_order` | Cancellation or return |
| Price match | `get_order`, `create_refund` | Partial refund |
| Warranty claim | `get_order`, `create_warranty_claim` | Claim submission |

## Where is my order?

```
1. get_customer(email) -> customer_id
2. list_orders(customer_id, limit=1) -> order_id, order_status
3. list_shipments(order_id) -> tracking, carrier, status
4. Present status and tracking to customer
```

## I want a return

```
1. get_order(order_id) -> order details, items
2. Validate return policy (date window, item condition)
3. create_return(order_id, items, reason) -> return_id
4. approve_return(return_id) or reject_return(return_id)
5. create_refund(payment_id, amount) if approved
```

## Item out of stock

```
1. get_stock(sku) -> available, reserved, on_hand
2. If available == 0: suggest alternatives or create backorder
3. create_backorder(sku, customer_id, quantity)
4. Notify customer of expected restock date
```

## Cancel order

```
1. get_order(order_id) -> order_status
2. If status in [pending, confirmed]: cancel_order(order_id)
3. If status == processing or shipped: suggest return flow
4. Confirm cancellation and refund timeline
```

## Price match

```
1. get_order(order_id) -> line items and totals
2. Calculate price difference
3. create_refund(payment_id, difference_amount)
4. Notify customer of adjustment
```

## Warranty claim

```
1. get_order(order_id) -> product, purchase date
2. Check warranty coverage dates
3. create_warranty_claim(warranty_id, issue_description)
4. Track claim status and resolution
```
