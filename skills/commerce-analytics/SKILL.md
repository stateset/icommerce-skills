---
name: commerce-analytics
description: Run commerce analytics, metrics, and forecasts. Use when running `stateset-analytics` or requesting sales, customer, inventory, or demand insights and trend analysis.
---

# Commerce Analytics

Generate revenue, customer, and inventory insights with trend analysis and forecasting.

## How It Works

1. Select a time period, segment, or product category.
2. Fetch summary metrics (`revenue`, `orders`, `aov`, `customers`) and top entities.
3. Generate demand or revenue forecasts based on historical data.
4. Identify trends, anomalies, and actionable outliers.
5. Report results with comparative periods and growth rates.

## Usage

- CLI: `stateset-analytics ...` or `stateset "show sales last 30 days"`
- Writes require `--apply` for saving snapshots.
- MCP tools: `get_sales_summary`, `get_top_products`, `get_customer_metrics`, `get_inventory_health`, `get_demand_forecast`, `get_revenue_forecast`.

## Permissions

- Read: `get_sales_summary`, `get_top_products`, `get_customer_metrics`, `get_inventory_health`, `get_demand_forecast`, `get_revenue_forecast` — no `--apply` needed.
- Write: saving report snapshots — requires `--apply`.

## Examples

```bash
stateset "show sales last 30 days"
stateset "top 10 products by revenue this quarter"
stateset "demand forecast for SKU WIDGET-001 next 90 days"
```

## Status Flows

**Report:** Requested -> Fetching -> Complete (or Error)
**Forecast:** Pending -> Computed -> Delivered (or InsufficientData)

## Output

```json
{"revenue":45230,"orders":156,"aov":290.00,"period":"2025-01-01/2025-01-31","top_product":"WIDGET-001","growth_pct":12.3,"order_id":"ord_last","amount":45230.00}
```

## Present Results to User

- Metrics requested, time range, and comparison period.
- Notable trends, growth rates, or anomalies flagged.
- Top products, customers, or categories by the requested metric.
- Follow-up actions (reorder, promo, retention campaign).

## Troubleshooting

- Empty data: confirm date range and that orders exist in the period.
- Forecast errors: verify at least 30 days of historical data exists.
- Slow queries: narrow the date range or reduce segment granularity.
- Mismatched totals: check for cancelled or refunded orders skewing the amount in the period.

## Error Codes

- `ANALYTICS_INSUFFICIENT_DATA`: Not enough historical data to generate the requested forecast.
- `ANALYTICS_INVALID_DATE_RANGE`: The specified date range is empty or contains no orders.
- `ANALYTICS_QUERY_TIMEOUT`: Query exceeded the allowed execution time; narrow the date range or segment.

## Related Skills

- commerce-orders — order data that feeds analytics
- commerce-inventory — inventory health metrics
- commerce-promotions — promotion ROI tracking
- commerce-customers — customer segmentation data

## References
- references/analytics-queries.md
- /home/dom/stateset-icommerce/cli/.claude/skills/commerce-analytics/SKILL.md
