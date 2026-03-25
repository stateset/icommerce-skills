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
