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
| `weight` | number | Weight in grams |
| `inventory_tracked` | boolean | Whether inventory is managed |
| `barcode` | string | UPC, EAN, or ISBN |

## Product Status Transitions

| Current Status | Allowed Next Status |
|---------------|-------------------|
| `draft` | `active` |
| `active` | `archived`, `draft` |
| `archived` | `active` |

## Common Attribute Keys

| Key | Values (Examples) | Used For |
|-----|-------------------|----------|
| `size` | XS, S, M, L, XL, XXL | Apparel |
| `color` | Red, Blue, Black, White | Apparel, accessories |
| `material` | Cotton, Polyester, Leather | Apparel, furniture |
| `capacity` | 64GB, 128GB, 256GB | Electronics |
| `flavor` | Vanilla, Chocolate, Strawberry | Food & beverage |

## Error Handling

| Error Code | Meaning | Resolution |
|------------|---------|------------|
| `DUPLICATE_SKU` | SKU already exists | Use a unique SKU or update the existing product |
| `DUPLICATE_SLUG` | URL slug already taken | Provide a different slug |
| `PRODUCT_NOT_FOUND` | Product ID does not exist | Verify the product ID |
| `VARIANT_LIMIT_EXCEEDED` | Max 100 variants per product | Consolidate or split into separate products |
| `INVALID_PRICE` | Price must be >= 0 | Correct the price value |

## Bulk Operations

```bash
stateset --apply "import products from csv /path/to/products.csv"
stateset --apply "bulk update prices from csv /path/to/prices.csv"
stateset --apply "archive products where status active last_sold_before 2025-01-01"
stateset "export products format csv status active"
```

## Search and Filtering

```bash
stateset "list products status active sort price asc"
stateset "list products where price > 50 and price < 100"
stateset "search products 'wireless headphones'"
stateset "list products tag 'seasonal' limit 25"
```

## Events Emitted

| Event | Trigger |
|-------|---------|
| `product.created` | New product created |
| `product.updated` | Product fields modified |
| `product.archived` | Product archived |
| `product.variant_added` | New variant added |
| `product.price_changed` | Price updated on product or variant |

## Integration Notes

- Product images are managed separately via `upload_product_image` and stored in CDN.
- The `slug` field is auto-generated from `name` if not provided, but must be unique.
- Archiving a product hides it from storefront but preserves order history references.
- Variant `price` overrides the parent product `price` when set.
