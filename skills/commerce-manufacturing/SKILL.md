---
name: commerce-manufacturing
description: Manage manufacturing BOMs and work orders. Use when running `stateset-manufacturing`, creating bills of materials, or tracking production work orders.
---

# Commerce Manufacturing

Create bills of materials (BOMs) and run work orders for production.

## How It Works

1. Create a BOM for a finished product with `product_id` and version.
2. Add components with `sku`, quantity per unit, and unit of measure.
3. Activate the BOM to make it available for work orders.
4. Create and start work orders with target `quantity` and due date.
5. Complete work orders, record output quantity and scrap, update inventory.

## Usage

- CLI: `stateset-manufacturing ...` or `stateset "create work order for product PROD-001 quantity 100"`
- Writes require `--apply`.
- MCP tools: `create_bom`, `add_bom_component`, `activate_bom`, `create_work_order`, `start_work_order`, `complete_work_order`.

## Permissions

- **Read:** (no read-only tools; all operations modify state)
- **Write:** `create_bom`, `add_bom_component`, `activate_bom`, `create_work_order`, `start_work_order`, `complete_work_order` — requires `--apply`.

## Examples

```bash
stateset manufacturing bom create --product PROD-001 --version 1 --apply
stateset manufacturing bom add-component --bom bom_101 --sku COMP-A --qty 4 --apply
stateset manufacturing wo create --product PROD-001 --qty 100 --due 2026-04-15 --apply
stateset manufacturing wo complete --wo wo_123 --output 98 --scrap 2 --apply
```

## Status Flows

**BOM:** Draft -> Active -> Archived

**Work Order:** Created -> Started -> Completed (or Cancelled)

## Output

```json
{"status":"completed","work_order_id":"wo_123","product_id":"prod_001","completed_quantity":98,"scrap_quantity":2}
```

## Present Results to User

- BOM or work order identifiers and current status.
- Production quantities (target, completed, scrap).
- Inventory updates for finished goods and consumed components.
- Any material shortages or yield issues.

## Troubleshooting

- Component missing: confirm component SKU exists and has sufficient inventory.
- BOM inactive: activate the BOM with `activate_bom` before creating work orders.
- Scrap too high: review component quality and adjust BOM quantities.
- Work order stuck: verify all components were consumed and mark complete.

## Error Codes

- `BOM_INACTIVE`: BOM must be activated before creating work orders.
- `COMPONENT_MISSING`: Required component SKU not found or has zero stock.
- `YIELD_BELOW_THRESHOLD`: Output quantity is below the acceptable yield rate.

## Related Skills

- commerce-inventory — component consumption and finished goods receipt
- commerce-products — products linked to BOMs
- commerce-cost-accounting — BOM rollup for standard costing
- commerce-quality — quality inspections on production output

## References
- references/manufacturing-flow.md
- /home/dom/stateset-icommerce/cli/.claude/agents/manufacturing.md
