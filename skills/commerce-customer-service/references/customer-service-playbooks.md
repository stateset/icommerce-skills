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

## Escalation Matrix

| Tier | Condition | Action |
|------|-----------|--------|
| Tier 1 | Standard inquiry | Agent resolves using playbooks |
| Tier 2 | Policy exception needed | Supervisor override required |
| Tier 3 | Legal, fraud, or safety | Escalate to specialized team |

## Return Policy Reference

| Condition | Window | Eligible |
|-----------|--------|----------|
| Unopened, original packaging | 30 days | Full refund |
| Opened, like-new condition | 30 days | Full refund |
| Opened, used | 14 days | Exchange or store credit |
| Defective or damaged | 90 days | Full refund or replacement |
| Final sale items | N/A | Not eligible |

## Common MCP Tool Parameters

| Tool | Key Parameters |
|------|---------------|
| `get_customer` | `email` or `customer_id` |
| `list_orders` | `customer_id`, `status`, `limit` |
| `list_shipments` | `order_id` |
| `create_return` | `order_id`, `items[]`, `reason` |
| `approve_return` | `return_id` |
| `cancel_order` | `order_id`, `reason` |
| `create_refund` | `payment_id`, `amount`, `reason` |
| `get_stock` | `sku` |
| `create_warranty_claim` | `order_id`, `issue_description` |

## Response Templates

```
# Order status response
"Your order {{order_id}} is currently {{status}}.
{{#if tracking}}Tracking: {{carrier}} {{tracking_number}}{{/if}}"

# Return confirmation
"Return {{return_id}} has been created for order {{order_id}}.
Please ship items back within 14 days using the prepaid label."

# Cancellation confirmation
"Order {{order_id}} has been cancelled. A refund of {{amount}}
will be processed within 5-7 business days."
```
