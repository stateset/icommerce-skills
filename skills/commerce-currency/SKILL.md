---
name: commerce-currency
description: Manage currency settings and exchange rates. Use when running `stateset-currency`, converting amounts, or configuring multi-currency support for global commerce.
---

# Commerce Currency

Handle exchange rates and currency settings for global commerce operations.

## How It Works

1. Configure the base currency for the store (e.g., `USD`).
2. Enable supported currencies and set exchange rates.
3. Convert amounts between currencies using current rates.
4. Format values with locale-appropriate symbols and decimal places.
5. Report rate history and conversion audit trail.

## Usage

- CLI: `stateset-currency ...` or `stateset "convert 100 USD to EUR"`
- Writes require `--apply`.
- MCP tools: `get_exchange_rate`, `list_exchange_rates`, `convert_currency`, `set_exchange_rate`, `set_base_currency`, `enable_currencies`, `format_currency`.

## Permissions

- Read: `get_exchange_rate`, `list_exchange_rates`, `convert_currency`, `format_currency` — no `--apply` needed.
- Write: `set_exchange_rate`, `set_base_currency`, `enable_currencies` — requires `--apply`.

## Examples

```bash
stateset "convert 100 USD to EUR"
stateset --apply "set exchange rate USD/EUR 0.92"
stateset "list enabled currencies"
```

## Status Flows

**Exchange Rate:** Draft -> Active -> Expired (or Superseded)
**Currency:** Disabled -> Enabled -> Active (or Disabled)

## Output

```json
{"amount":100.00,"from":"USD","to":"EUR","converted":92.00,"rate":0.9200,"rate_date":"2025-01-15T12:00:00Z"}
```

## Present Results to User

- Exchange rate used, source, and timestamp.
- Converted totals with proper formatting and decimal precision.
- Any base currency changes and their downstream effects.
- Enabled currency list if modified.

## Troubleshooting

- Rate missing: set a rate with `set_exchange_rate` or enable the currency pair.
- Precision issues: use correct decimal places per currency (e.g., 0 for JPY, 2 for USD).
- Stale rates: verify `rate_date` and update if older than acceptable threshold.
- Base currency change: existing prices are not auto-converted; recalculate manually.

## Error Codes

- `CURRENCY_RATE_MISSING`: No exchange rate found for the requested currency pair.
- `CURRENCY_PRECISION_INVALID`: Decimal precision does not match the target currency standard.
- `CURRENCY_RATE_STALE`: Exchange rate is older than the acceptable freshness threshold.

## Related Skills

- commerce-tax — cross-border tax calculation requires currency conversion
- commerce-payments — multi-currency payment processing
- commerce-invoices — invoice amounts in customer currency

## References
- references/currency-commands.md
- /home/dom/stateset-icommerce/cli/.claude/agents/currency.md
