---
name: commerce-promotions
description: Manage promotions, discounts, and coupons. Use when running `stateset-promotions`, creating campaigns, validating coupons, or applying cart discounts.
---

# Commerce Promotions

Manage promotions, coupons, and cart discounts.

## How It Works

1. Create a promotion with rules, discount type, and start/end dates.
2. Activate or deactivate campaigns based on schedule.
3. Create coupon codes tied to promotions with usage limits.
4. Validate coupon eligibility against cart contents and customer.
5. Apply promotions to carts and report total savings.

## Usage

- CLI: `stateset-promotions ...` or `stateset "apply coupon SAVE10 to cart CART-123"`
- Writes require `--apply`.
- MCP tools: `create_promotion`, `activate_promotion`, `deactivate_promotion`, `create_coupon`, `validate_coupon`, `apply_cart_promotions`.

## Examples

```bash
stateset promotions create --name "Spring Sale" --discount-pct 15 --start 2026-04-01 --end 2026-04-30 --apply
stateset promotions create-coupon promo_123 --code SPRING15 --max-uses 500 --apply
stateset promotions validate --coupon SPRING15 --cart-id cart_456
stateset promotions deactivate promo_123 --apply
```

## Status Flows

**Promotion:** Draft -> Active -> Expired (or Paused/Cancelled)

**Coupon:** Active -> Redeemed/Exhausted (or Expired/Revoked)

## Output

```json
{"status":"applied","promotion_id":"promo_123","coupon":"SAVE10","discount_amount":25.00,"cart_total_after":225.00}
```

## Present Results to User

- Promotion status, dates, discount type, and trigger rules.
- Coupon validation results and discount totals applied.
- Cart total before and after discount.
- Any conflicts or stacking issues with existing promotions.

## Troubleshooting

- Coupon invalid: verify start/end dates, usage limits, and cart minimum.
- Overlapping promotions: clarify stacking rules or deactivate one.
- Discount not applied: confirm the cart meets eligibility criteria (min amount, SKUs).
- Usage limit reached: check `redemption_count` vs `max_redemptions` on the coupon.

## Error Codes

- `COUPON_EXPIRED`: Coupon is past its end date or has been revoked.
- `USAGE_LIMIT_REACHED`: Coupon has hit its maximum redemption count.
- `CART_BELOW_MINIMUM`: Cart total does not meet the promotion's minimum amount.

## Related Skills

- commerce-checkout — promotions applied during checkout flow
- commerce-analytics — promotion ROI and redemption tracking
- commerce-orders — orders with applied discounts

## References
- references/promotions-flow.md
- /home/dom/stateset-icommerce/cli/.claude/agents/promotions.md
