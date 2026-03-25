# Tax Commands

## Common Commands

```bash
stateset "calculate tax for cart cart_123"
stateset "tax rate for CA"
stateset "tax rate for US-CA-90210"
stateset --apply "create tax rate US-CA 0.0725"
stateset --apply "create tax exemption for customer CUST-123"
stateset --apply "validate tax exemption EXM-001"
```

## MCP Tool Reference

| Tool | Action | Requires --apply |
|------|--------|-----------------|
| `calculate_tax` | Calculate tax for a single item | No |
| `calculate_cart_tax` | Calculate tax for an entire cart | No |
| `get_tax_rate` | Look up rate for a jurisdiction | No |
| `list_tax_rates` | List all configured rates | No |
| `create_tax_rate` | Create a new jurisdiction rate | Yes |
| `create_tax_exemption` | Create an exemption certificate | Yes |
| `validate_tax_exemption` | Validate exemption status | No |

## Required Inputs

| Field | Description | Example |
|-------|-------------|---------|
| `country` | ISO country code | US |
| `region` | State or province | CA |
| `postal_code` | ZIP or postal code | 90210 |
| `line_items[]` | Items with price and quantity | `[{"sku": "W-001", "price": 50, "qty": 2}]` |

## Tax Calculation Result

```json
{
  "tax_total": 7.25,
  "jurisdiction": "US-CA",
  "rate": 0.0725,
  "lines": [
    {"sku": "W-001", "taxable_amount": 100.00, "tax": 7.25}
  ],
  "exemptions_applied": 0
}
```

## Exemption Fields

| Field | Description |
|-------|-------------|
| `exemption_id` | Unique exemption identifier |
| `customer_id` | Customer who holds the exemption |
| `certificate_number` | Tax-exempt certificate number |
| `jurisdiction` | Jurisdiction where exemption applies |
| `valid_from` / `valid_to` | Validity period |
| `status` | active, expired, revoked |

## Tax Rate Fields

| Field | Type | Description |
|-------|------|-------------|
| `rate_id` | string | Unique rate identifier |
| `jurisdiction` | string | Jurisdiction code (e.g., US-CA, US-NY) |
| `rate` | number | Tax rate as decimal (0.0725 = 7.25%) |
| `type` | enum | sales, vat, gst |
| `compound` | boolean | Applied on top of other taxes |
| `shipping_taxable` | boolean | Whether shipping is taxed |

## Common US State Rates

| State | Code | Base Rate | Notes |
|-------|------|-----------|-------|
| California | US-CA | 7.25% | Local rates up to 10.75% |
| New York | US-NY | 4.00% | City/county surcharges apply |
| Texas | US-TX | 6.25% | Local rates up to 8.25% |
| Florida | US-FL | 6.00% | Local surcharges up to 8.50% |
| Washington | US-WA | 6.50% | Destination-based |
| Oregon | US-OR | 0.00% | No sales tax |

## VAT / International Tax

```bash
stateset --apply "create tax rate DE 0.19 type vat"
stateset --apply "create tax rate GB 0.20 type vat"
stateset --apply "create tax rate AU 0.10 type gst"
stateset "calculate tax country DE line_items '[{\"sku\":\"W-001\",\"price\":50,\"qty\":1}]'"
```

| Country | Code | Standard Rate | Type |
|---------|------|--------------|------|
| Germany | DE | 19% | VAT |
| United Kingdom | GB | 20% | VAT |
| France | FR | 20% | VAT |
| Australia | AU | 10% | GST |
| Canada | CA | 5% | GST (federal) |

## Error Handling

| Error Code | Meaning | Resolution |
|------------|---------|------------|
| `JURISDICTION_NOT_FOUND` | No rate configured for location | Create the tax rate first |
| `INVALID_RATE` | Rate must be between 0 and 1 | Use decimal format (0.07 not 7) |
| `EXEMPTION_EXPIRED` | Certificate past valid_to date | Renew the exemption certificate |
| `DUPLICATE_RATE` | Rate already exists for jurisdiction | Update the existing rate instead |
| `MISSING_ADDRESS` | Cannot calculate without address | Provide country, region, postal_code |

## Events Emitted

| Event | Trigger |
|-------|---------|
| `tax.calculated` | Tax computed for cart or item |
| `tax.rate_created` | New jurisdiction rate added |
| `tax.rate_updated` | Existing rate modified |
| `tax.exemption_created` | New exemption certificate |
| `tax.exemption_expired` | Certificate reached valid_to date |

## Nexus and Compliance

- Economic nexus thresholds vary by state (typically $100K revenue or 200 transactions).
- Use `stateset "nexus status"` to check which jurisdictions require tax collection.
- Tax-exempt resale certificates must include the buyer's state resale ID.
- Marketplace facilitator laws may shift tax collection responsibility to the platform.

## Integration Notes

- Tax calculations are idempotent; the same cart input always returns the same result.
- Line items with `tax_exempt: true` are excluded from tax calculation.
- Compound tax rates (tax-on-tax) are applied after all non-compound rates.
- Tax reports can be exported: `stateset "export tax report date_range 2026-Q1 format csv"`.
