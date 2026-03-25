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

## Promotion Status Transitions

| Current Status | Allowed Next Status |
|---------------|-------------------|
| `draft` | `active`, `cancelled` |
| `active` | `expired`, `cancelled` |
| `expired` | (terminal) |
| `cancelled` | (terminal) |

## Stacking Rules

| Rule | Behavior |
|------|----------|
| `no_stack` | Only one promotion per cart (default) |
| `stack_with_shipping` | Combines with free shipping promotions |
| `stack_all` | Combines with any other active promotion |

## Eligibility Conditions

| Condition | Field | Example |
|-----------|-------|---------|
| Minimum cart total | `min_cart_total` | Cart >= $50 |
| Specific products | `eligible_product_ids` | Only SKU-001, SKU-002 |
| Customer segment | `eligible_segments` | VIP customers only |
| First order only | `first_order_only` | New customer acquisition |
| Specific channels | `eligible_channels` | Web only, excludes POS |

## Error Handling

| Error Code | Meaning | Resolution |
|------------|---------|------------|
| `COUPON_EXPIRED` | Coupon past end_date | Inform customer; suggest active codes |
| `COUPON_MAX_USES` | Redemption limit reached | No further uses; create new coupon |
| `MIN_CART_NOT_MET` | Cart total below minimum | Customer must add more items |
| `NOT_ELIGIBLE` | Customer or product not in eligible list | Check eligibility conditions |
| `ALREADY_APPLIED` | Promotion already on this cart | No action needed |
| `STACK_CONFLICT` | Cannot combine with existing promotion | Remove conflicting promotion first |

## Promotion Analytics Commands

```bash
stateset "promotion performance PROMO-123"
stateset "list promotions sort redemption_count desc"
stateset "coupon usage summary for promotion PROMO-123"
stateset "revenue impact for promotion PROMO-123"
```

## Events Emitted

| Event | Trigger |
|-------|---------|
| `promotion.created` | New promotion created |
| `promotion.activated` | Promotion goes live |
| `promotion.deactivated` | Promotion paused or ended |
| `coupon.redeemed` | Coupon applied to an order |
| `coupon.rejected` | Coupon validation failed |

## Integration Notes

- Promotions with `end_date` in the past are automatically transitioned to `expired` by a nightly job.
- The `buy_x_get_y` type requires specifying `buy_quantity`, `get_quantity`, and `get_product_ids`.
- Coupon codes are case-insensitive; `SUMMER20` and `summer20` match the same coupon.
- Cart-level discounts are distributed proportionally across line items for accurate tax calculation.
