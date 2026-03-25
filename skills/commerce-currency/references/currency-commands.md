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
- Rate staleness threshold is configurable per store; default is 24 hours.
- Use `format_currency` to apply locale-specific symbols and grouping separators.
- All conversion results include `rate_date` for audit trail.
- Multi-currency carts display line item prices in the customer's preferred currency.

## Supported Currencies

| Currency | Code | Symbol | Region |
|----------|------|--------|--------|
| US Dollar | USD | $ | United States |
| Euro | EUR | € | Eurozone |
| British Pound | GBP | £ | United Kingdom |
| Japanese Yen | JPY | ¥ | Japan |
| Canadian Dollar | CAD | C$ | Canada |
| Australian Dollar | AUD | A$ | Australia |
| Swiss Franc | CHF | CHF | Switzerland |
| Chinese Yuan | CNY | ¥ | China |
| Indian Rupee | INR | ₹ | India |
| Mexican Peso | MXN | $ | Mexico |

## Error Handling

| Error Code | Meaning | Resolution |
|------------|---------|------------|
| `CURRENCY_NOT_ENABLED` | Currency not enabled for store | Enable via `enable_currencies` command |
| `RATE_NOT_FOUND` | No exchange rate configured for pair | Set rate via `set_exchange_rate` |
| `STALE_RATE` | Rate older than staleness threshold | Update the rate or adjust threshold |
| `INVALID_CURRENCY_CODE` | Code does not match ISO 4217 | Use a valid 3-letter currency code |
| `SAME_CURRENCY` | From and to currencies are identical | No conversion needed |

## Rate Source Configuration

```bash
stateset --apply "set rate source auto provider ecb"
stateset --apply "set rate source auto provider openexchangerates api_key KEY123"
stateset --apply "set rate staleness threshold 12h"
stateset "list rate sources"
```

## Multi-Currency Pricing

```bash
stateset --apply "set product PROD-123 price USD 29.99"
stateset --apply "set product PROD-123 price EUR 27.49"
stateset --apply "set product PROD-123 price GBP 23.99"
stateset "list product prices PROD-123"
```

Fixed prices per currency override automatic conversion. If no fixed price exists, the base price is converted using the current exchange rate.

## Rounding Rules

| Strategy | Behavior | Example |
|----------|----------|---------|
| `standard` | Round to currency decimal places | $10.005 -> $10.01 |
| `floor` | Always round down | $10.009 -> $10.00 |
| `ceil` | Always round up | $10.001 -> $10.01 |
| `psychological` | Round to .99 ending | $10.42 -> $9.99 |

## Events Emitted

| Event | Trigger |
|-------|---------|
| `currency.rate_updated` | Exchange rate changed |
| `currency.enabled` | New currency enabled |
| `currency.base_changed` | Base currency changed |

## Integration Notes

- Stablecoin payments (USDC, USDT) use 6 decimal places and are treated as USD-pegged.
- Automatic rate fetching runs on a configurable schedule (default: every 6 hours).
- Historical rates are retained for 365 days for reporting and audit purposes.
- Currency display in emails uses the customer's preferred currency at the time of order.
