# Checkout Flow (ACP)

## Steps

1. Create cart
2. Add items
3. Set shipping address
4. Select shipping rate
5. Apply discounts
6. Set payment method
7. Complete checkout

## Cart Status Flow

```
Open -> ShippingSet -> PaymentSet -> Completed
  \                                   /
   -----> Abandoned (timeout) <------
```

## Common Commands

```bash
stateset --apply "create cart for customer@example.com"
stateset --apply "add 2x WIDGET-001 to cart cart_123"
stateset --apply "set shipping address on cart cart_123 to '123 Main St'"
stateset --apply "apply coupon WELCOME10 to cart cart_123"
stateset --apply "checkout cart cart_123"
```

## MCP Tool Reference

| Tool | Action | Requires --apply |
|------|--------|-----------------|
| `create_cart` | Create a new cart for a customer | Yes |
| `add_cart_item` | Add item with SKU and quantity | Yes |
| `update_cart_item` | Change quantity or remove item | Yes |
| `remove_cart_item` | Remove item from cart | Yes |
| `set_cart_shipping_address` | Set delivery address | Yes |
| `get_shipping_rates` | Fetch available shipping options | No |
| `set_cart_payment` | Set payment method | Yes |
| `apply_cart_discount` | Apply coupon or promotion | Yes |
| `complete_checkout` | Finalize cart into an order | Yes |

## Cart Fields

- `cart_id`: Unique cart identifier
- `customer_id` / `email`: Customer reference
- `items[]`: Array of cart line items with `sku`, `quantity`, `price`
- `shipping_address`: Delivery address object
- `shipping_rate`: Selected shipping method and cost
- `discount_code`: Applied coupon code
- `subtotal` / `tax` / `shipping` / `discount` / `total`: Computed totals

## Error Codes

| Error | Cause | Fix |
|-------|-------|-----|
| `CART_EMPTY` | No items in cart | Add items before checkout |
| `SHIPPING_REQUIRED` | Address not set | Call `set_cart_shipping_address` |
| `PAYMENT_REQUIRED` | Payment not set | Call `set_cart_payment` |
| `ITEM_OUT_OF_STOCK` | SKU unavailable | Check inventory, remove or substitute |
| `COUPON_INVALID` | Code expired or ineligible | Validate with `validate_coupon` first |
