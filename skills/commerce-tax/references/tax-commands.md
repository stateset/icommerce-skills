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
