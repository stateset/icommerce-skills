# Promotions and Coupons

## Discount Types

| Type | Description | Example |
|------|-------------|---------|
| `percentage_off` | Percentage discount | 20% off |
| `fixed_amount_off` | Fixed dollar amount | $10 off |
| `free_shipping` | Waive shipping cost | Free shipping |
| `buy_x_get_y` | Bundle deal | Buy 2 Get 1 Free |

## Common Commands

```bash
stateset --apply "create promotion SUMMER20 'Summer Sale' 20% off"
stateset --apply "activate promotion PROMO-123"
stateset --apply "create coupon SUMMER20 for promotion PROMO-123"
stateset "validate coupon SUMMER20"
stateset --apply "apply coupon SUMMER20 to cart cart_123"
stateset --apply "deactivate promotion PROMO-123"
```

## MCP Tool Reference

| Tool | Action | Requires --apply |
|------|--------|-----------------|
| `create_promotion` | Create a new promotion | Yes |
| `activate_promotion` | Activate a draft promotion | Yes |
| `deactivate_promotion` | Pause or end a promotion | Yes |
| `create_coupon` | Create coupon code for promotion | Yes |
| `validate_coupon` | Check coupon eligibility | No |
| `apply_cart_promotions` | Apply promotion to cart | Yes |

## Promotion Fields

| Field | Description |
|-------|-------------|
| `promotion_id` | Unique promotion identifier |
| `name` | Display name |
| `discount_type` | percentage_off, fixed_amount_off, etc. |
| `discount_value` | Amount or percentage |
| `start_date` / `end_date` | Active period |
| `min_cart_total` | Minimum cart value to qualify |
| `max_redemptions` | Total usage limit |
| `status` | draft, active, expired, cancelled |

## Coupon Fields

| Field | Description |
|-------|-------------|
| `code` | Coupon code string |
| `promotion_id` | Linked promotion |
| `max_uses` | Per-coupon usage limit |
| `redemption_count` | Times redeemed |
