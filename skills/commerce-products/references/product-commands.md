# Product Commands

## CLI (Natural Language)

```bash
stateset "list products"
stateset "find product by sku WIDGET-001"
stateset "product count"
stateset --apply "create product 'Widget Pro' WIDGET-001 29.99"
stateset --apply "update product PROD-123 price 34.99"
stateset --apply "create variant for PROD-123 sku WIDGET-001-L size Large"
stateset --apply "archive product PROD-456"
```

## Direct CLI

```bash
stateset-direct products list
stateset-direct products get <id>
stateset-direct products variant <sku>
stateset-direct products create <name> <sku> <price>
```

## MCP Tool Reference

| Tool | Action | Requires --apply |
|------|--------|-----------------|
| `list_products` | List all products | No |
| `get_product` | Get product by ID | No |
| `get_product_variant` | Get variant by SKU | No |
| `create_product` | Create a new product | Yes |
| `update_product` | Update product fields | Yes |
| `create_product_variant` | Add variant to product | Yes |

## Product Fields

| Field | Type | Description |
|-------|------|-------------|
| `product_id` | string | Unique product identifier |
| `name` | string | Product title |
| `slug` | string | URL-friendly name (unique) |
| `description` | string | Product description |
| `status` | enum | draft, active, archived |
| `price` | number | Base price |

## Variant Fields

| Field | Type | Description |
|-------|------|-------------|
| `variant_id` | string | Unique variant identifier |
| `sku` | string | Stock keeping unit (unique) |
| `price` | number | Variant-specific price |
| `attributes` | object | Size, color, material, etc. |
