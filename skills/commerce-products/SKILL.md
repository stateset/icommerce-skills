---
name: commerce-products
description: Manage products, variants, and pricing in StateSet iCommerce. Use when listing, creating, or updating products, managing variants, or running `stateset-direct products`.
---

# Commerce Products

Manage product catalog entries and variants for storefront and order flows.

## How It Works

1. List and search products by `name`, `slug`, or `sku`.
2. Create product records with title, description, and base price.
3. Add variants with unique SKUs, pricing, and attributes (size, color).
4. Activate or deactivate products and variants as needed.
5. Report catalog changes and sync to storefront indexes.

## Usage

- CLI: `stateset "list products"` or `stateset-direct products <action>`
- Writes require `--apply`.
- MCP tools: `list_products`, `get_product`, `get_product_variant`, `create_product`, `update_product`, `create_product_variant`.

## Examples

```bash
stateset products list --status active --limit 25
stateset products get prod_123
stateset products create --name "Widget Pro" --sku WIDGET-PRO-001 --price 59.99 --apply
stateset products create-variant prod_123 --sku WIDGET-PRO-LG --size large --price 64.99 --apply
```

## Status Flows

**Product:** Draft -> Active -> Archived

## Output

```json
{"status":"ok","product_id":"prod_123","sku":"WIDGET-001","name":"Widget","price":49.99,"active":true}
```

## Present Results to User

- Product or variant identifiers affected.
- Pricing, status, or attribute changes applied.
- Variant count and active/archived state.
- Any validation checks or slug conflicts resolved.

## Troubleshooting

- SKU not found: confirm variant SKU exists or create with `create_product_variant`.
- Product inactive: activate before using in checkout or storefront.
- Slug conflict: use a unique slug or append a suffix.
- Missing price: every variant requires a `price` before activation.

## Error Codes

- `SKU_NOT_FOUND`: No product or variant exists for the given SKU.
- `SLUG_CONFLICT`: Another product already uses this slug.
- `MISSING_PRICE`: Variant requires a price before activation.

## Related Skills

- commerce-inventory — inventory items linked to product SKUs
- commerce-checkout — products added to carts during checkout
- commerce-vector-search — semantic search across the product catalog
- commerce-manufacturing — BOMs linked to finished products

## References
- references/product-commands.md
- /home/dom/stateset-icommerce/examples/cli-reference.md
- /home/dom/stateset-icommerce/cli/src/commands/products.js
