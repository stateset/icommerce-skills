# Currency Commands

## Common Commands

```bash
stateset "convert 100 USD to EUR"
stateset "list exchange rates"
stateset "list enabled currencies"
stateset --apply "set exchange rate USD EUR 0.92"
stateset --apply "set base currency USD"
stateset --apply "enable currencies EUR GBP JPY"
```

## MCP Tool Reference

| Tool | Action | Requires --apply |
|------|--------|-----------------|
| `get_exchange_rate` | Get rate for a currency pair | No |
| `list_exchange_rates` | List all configured rates | No |
| `convert_currency` | Convert an amount between currencies | No |
| `set_exchange_rate` | Set or update an exchange rate | Yes |
| `set_base_currency` | Change the store's base currency | Yes |
| `enable_currencies` | Enable currencies for the store | Yes |
| `format_currency` | Format amount with locale symbols | No |

## Currency Fields

- `from` / `to`: ISO 4217 currency codes (e.g., USD, EUR, GBP)
- `rate`: Exchange rate (from -> to)
- `rate_date`: Timestamp when the rate was set
- `decimal_places`: Currency-specific precision

## Decimal Precision by Currency

| Currency | Code | Decimals | Example |
|----------|------|----------|---------|
| US Dollar | USD | 2 | $100.00 |
| Euro | EUR | 2 | €92.00 |
| Japanese Yen | JPY | 0 | ¥11000 |
| British Pound | GBP | 2 | £78.50 |
| Kuwaiti Dinar | KWD | 3 | KD30.250 |

## Notes

- Always use correct decimal precision per currency when displaying or storing amounts.
- Changing the base currency does not automatically recalculate existing prices.
- Rates are stored as directional pairs (USD->EUR is separate from EUR->USD).
