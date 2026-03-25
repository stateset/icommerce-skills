---
name: commerce-checkout
description: Handle carts and checkout flows (rates, totals, and cart creation). Use when running `stateset-checkout`, building carts, applying discounts, or completing checkout via MCP tools.
---

# Commerce Checkout

Run cart creation and checkout flows from start to finish.

## How It Works

1. Create or locate a cart for a customer by `email` or `customer_id`.
2. Add or update cart items with `sku`, quantity, and price.
3. Set shipping address and fetch available shipping rates.
4. Set payment method and apply any discount codes.
5. Complete checkout to create an order.

## Usage

- CLI: `stateset-checkout ...` or `stateset "create cart for customer@example.com"`
- Writes require `--apply`.
- MCP tools: `create_cart`, `add_cart_item`, `update_cart_item`, `remove_cart_item`, `set_cart_shipping_address`, `set_cart_payment`, `apply_cart_discount`, `get_shipping_rates`, `complete_checkout`.

## Permissions

- **Read:** `get_shipping_rates` — no `--apply` needed.
- **Write:** `create_cart`, `add_cart_item`, `update_cart_item`, `remove_cart_item`, `set_cart_shipping_address`, `set_cart_payment`, `apply_cart_discount`, `complete_checkout` — requires `--apply`.

## Examples

```bash
stateset checkout create-cart --customer cust_123 --apply
stateset checkout add-item cart_123 --sku WIDGET-001 --qty 2 --apply
stateset checkout apply-discount cart_123 --coupon SAVE10 --apply
stateset checkout complete cart_123 --apply
```

## Status Flows

**Cart:** Open -> Shipping Set -> Payment Set -> Completed (or Abandoned)

## Output

```json
{"status":"completed","cart_id":"cart_123","order_number":"ORD-12345","subtotal":199.98,"tax":14.50,"shipping":9.99,"discount":20.00,"total":204.47}
```

## Present Results to User

- Cart and order identifiers created.
- Totals breakdown (subtotal, tax, shipping, discounts, total).
- Any missing fields needed to finalize checkout.
- Shipping method selected and estimated delivery.

## Troubleshooting

- Missing shipping/payment: collect required fields before calling `complete_checkout`.
- Coupon rejected: validate promotion rules, dates, and cart minimum via commerce-promotions.
- Item out of stock: check `available` quantity via commerce-inventory before adding.
- Cart expired: carts may be abandoned after inactivity; create a new one.

## Error Codes

- `CART_INCOMPLETE`: Required fields (shipping or payment) missing at checkout.
- `COUPON_INVALID`: Discount code is expired, exhausted, or does not meet cart minimum.
- `ITEM_OUT_OF_STOCK`: SKU quantity unavailable when completing checkout.

## Related Skills

- commerce-products — product catalog for cart items
- commerce-tax — tax calculation applied at checkout
- commerce-promotions — discount codes and cart promotions
- commerce-payments — payment processing on checkout completion

## References
- references/checkout-flow.md
- /home/dom/stateset-icommerce/cli/.claude/skills/commerce-checkout/SKILL.md
- /home/dom/stateset-icommerce/examples/workflows.md
