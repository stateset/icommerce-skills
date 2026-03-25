---
name: commerce-tax
description: Calculate taxes and manage tax rates. Use when running `stateset-tax`, calculating cart tax, validating exemptions, or configuring tax jurisdiction settings.
---

# Commerce Tax

Calculate taxes and manage tax jurisdiction settings.

## How It Works

1. Identify jurisdiction from the shipping address (`postal_code`, `region`, `country`).
2. Look up applicable tax rates for the jurisdiction.
3. Calculate tax for individual items or entire carts.
4. Apply exemptions when a valid certificate exists.
5. Report tax breakdown by jurisdiction and line item.

## Usage

- CLI: `stateset-tax ...` or `stateset "calculate tax for cart CART-123"`
- Writes require `--apply`.
- MCP tools: `calculate_tax`, `calculate_cart_tax`, `get_tax_rate`, `list_tax_rates`, `create_tax_exemption`, `validate_tax_exemption`.

## Examples

```bash
stateset tax calculate --cart CART-123 --region US-CA
stateset tax rate get --jurisdiction US-CA --category electronics
stateset tax exemption create --customer cust_456 --certificate EX-2026-789 --apply
stateset tax rates list --country US --format json
```

## Status Flows

**Exemption:** Submitted -> Validated -> Active (or Expired/Revoked)

## Output

```json
{"tax_total":7.25,"jurisdiction":"US-CA","rate":0.0725,"exemptions_applied":0,"line_items":[{"sku":"WIDGET-001","tax":3.63}]}
```

## Present Results to User

- Tax rates used, jurisdiction, and effective date.
- Exemptions applied, if any, with certificate IDs.
- Final tax totals, per-line breakdown, and rounding method.
- Any tax-exempt items flagged.

## Troubleshooting

- Missing address fields: collect `postal_code` and `region` before calculating.
- Invalid exemption: verify certificate number, expiry date, and jurisdiction match.
- Rate not found: ensure the jurisdiction has been configured with `create_tax_rate`.
- Zero tax on taxable item: check if an unintended exemption is active.

## Error Codes

- `JURISDICTION_NOT_FOUND`: No tax rates configured for the given region.
- `INVALID_EXEMPTION`: Tax exemption certificate is expired or does not match jurisdiction.
- `MISSING_ADDRESS`: Shipping address fields required for tax calculation are absent.

## Related Skills

- commerce-checkout — applies tax during cart checkout
- commerce-invoices — includes tax breakdown on invoices
- commerce-currency — currency conversion for cross-border tax

## References
- references/tax-commands.md
- /home/dom/stateset-icommerce/cli/.claude/agents/tax.md
