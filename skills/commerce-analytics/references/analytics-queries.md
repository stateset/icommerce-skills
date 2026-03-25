# Analytics Queries

## Common Queries

```bash
stateset "sales summary last 30 days"
stateset "sales summary last 30 days vs previous 30 days"
stateset "top 10 products last 7 days"
stateset "customer metrics this month"
stateset "inventory health"
stateset "demand forecast for WIDGET-001 next 90 days"
stateset "revenue forecast next quarter"
```

## MCP Tool Reference

| Tool | Action |
|------|--------|
| `get_sales_summary` | Revenue, orders, AOV for a date range |
| `get_top_products` | Top products ranked by revenue or units |
| `get_customer_metrics` | New, returning, churn, LTV metrics |
| `get_inventory_health` | Stock levels, low-stock, overstock |
| `get_demand_forecast` | Predicted demand for SKU or category |
| `get_revenue_forecast` | Revenue projection based on trends |

## Available Metrics

| Category | Metrics |
|----------|---------|
| Sales | `revenue`, `orders`, `aov`, `units_sold`, `growth_pct` |
| Products | `top_products`, `top_categories`, `product_velocity` |
| Customers | `new_customers`, `returning_customers`, `churn_rate`, `ltv` |
| Inventory | `stock_health`, `low_stock_count`, `days_of_supply` |
| Returns | `return_rate`, `refund_rate`, `top_return_reasons` |

## Example Response

```json
{
  "revenue": 45230.00,
  "orders": 156,
  "aov": 290.00,
  "period": "2025-01-01/2025-01-31",
  "comparison": {
    "revenue_prev": 40100.00,
    "growth_pct": 12.8
  },
  "top_products": [
    {"sku": "WIDGET-001", "revenue": 8500.00, "units": 170}
  ]
}
```

## Forecasting Notes

- Requires at least 30 days of historical data for meaningful forecasts.
- Forecasts use exponential smoothing with trend and seasonality components.
- Narrow the segment (SKU or category) for more accurate predictions.

## Date Range Shortcuts

| Shortcut | Period |
|----------|--------|
| `today` | Current day |
| `yesterday` | Previous day |
| `last 7 days` | Rolling 7-day window |
| `last 30 days` | Rolling 30-day window |
| `this week` | Current calendar week (Mon-Sun) |
| `this month` | Current calendar month |
| `this quarter` | Current fiscal quarter |
| `this year` | Current fiscal year |
| `last month` | Previous calendar month |
| `last quarter` | Previous fiscal quarter |

## Comparison Periods

When using `vs previous` syntax, the system automatically selects a matching prior period:

```bash
stateset "sales summary this month vs last month"
stateset "sales summary this quarter vs last quarter"
stateset "top 10 products last 7 days vs previous 7 days"
```

Growth percentages are calculated as: `((current - previous) / previous) * 100`

## Inventory Health Fields

| Field | Description |
|-------|-------------|
| `total_skus` | Total number of active SKUs |
| `in_stock_count` | SKUs with available inventory |
| `low_stock_count` | SKUs below reorder point |
| `out_of_stock_count` | SKUs with zero available quantity |
| `overstock_count` | SKUs exceeding max stock level |
| `days_of_supply` | Average days of inventory remaining |
| `carrying_cost` | Estimated monthly inventory holding cost |
| `stockout_rate` | Percentage of SKUs currently out of stock |

## Customer Lifetime Value (LTV) Calculation

```
LTV = Average Order Value x Purchase Frequency x Average Customer Lifespan
```

| Metric | Source |
|--------|--------|
| Average Order Value | Total revenue / total orders for the cohort |
| Purchase Frequency | Total orders / unique customers in period |
| Average Lifespan | Months from first to last purchase (active customers) |

## Practical Notes

- All monetary values are returned in the store's base currency.
- Comparison queries require at least two full periods of data to produce meaningful growth metrics.
- The demand forecast model weights recent data more heavily; it performs best with 90+ days of history.
- Revenue forecasts include confidence intervals (`low`, `mid`, `high`) based on historical variance.
- Inventory health queries consider both warehouse stock and in-transit quantities when calculating days of supply.
