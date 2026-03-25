---
name: commerce-cost-accounting
description: Manage item costs, cost layers, variances, and inventory valuation. Use when setting standard costs, tracking FIFO/LIFO cost layers, analyzing variances, or rolling up BOM costs.
---

# Commerce Cost Accounting

Track item costs using multiple costing methods, manage cost layers, analyze variances, and value inventory.

## How It Works

1. Set item costs with material, labor, and overhead components.
2. Choose costing method: Average, FIFO, LIFO, Standard, or Specific.
3. Create cost layers as inventory is received.
4. Issue from cost layers when inventory is consumed (FIFO/LIFO order).
5. Track cost variances (purchase, material, labor, overhead).
6. Roll up BOM costs for manufactured items.
7. Generate inventory valuation reports.

## Usage

- CLI: `stateset cost ...` or `stateset "set cost for WIDGET-001"`
- Writes require `--apply`.
- MCP tools: `set_item_cost`, `get_item_cost`, `list_item_costs`, `create_cost_layer`, `issue_from_cost_layer`, `record_cost_variance`, `create_cost_adjustment`, `approve_cost_adjustment`, `rollup_bom_cost`, `get_inventory_valuation`, `get_sku_cost_summary`.

## Permissions

- Read: `get_item_cost`, `list_item_costs`, `get_inventory_valuation`, `get_sku_cost_summary` — no `--apply` needed.
- Write: `set_item_cost`, `create_cost_layer`, `issue_from_cost_layer`, `record_cost_variance`, `rollup_bom_cost` — requires `--apply`.

## Examples

```bash
stateset cost set WIDGET-001 --method standard --material 8.00 --labor 3.00 --overhead 1.50 --apply
stateset cost layers WIDGET-001 --method fifo
stateset cost rollup BOM-ASSY-100 --apply
stateset cost valuation --warehouse WH-EAST --as-of 2025-06-30
```

## Costing Methods

- **Average**: Weighted average of all receipts
- **FIFO**: First In, First Out (consume oldest first)
- **LIFO**: Last In, First Out (consume newest first)
- **Standard**: Predetermined cost with variance tracking
- **Specific**: Individual unit cost identification

## Status Flows

**Cost Adjustment:** Pending -> Approved -> Applied (or Rejected)
**Cost Layer:** Open -> Partially Issued -> Fully Issued
**Variance:** Detected -> Reviewed -> Posted (or Dismissed)

## Output

```json
{"status":"cost_set","sku":"WIDGET-001","cost_method":"standard","unit_cost":12.50,"material":8.00,"labor":3.00,"overhead":1.50}
```

## Present Results to User

- SKU and current unit cost with breakdown.
- Costing method and active cost layers.
- Variance amounts and types.
- BOM rollup total with component costs.
- Inventory valuation totals.

## Troubleshooting

- Variance too high: review standard cost vs actual receipts.
- Cost adjustment rejected: provide justification and re-submit.
- BOM rollup incomplete: ensure all component costs are set.
- FIFO/LIFO mismatch: verify cost layers are properly ordered by receipt date.

## Error Codes

- `COST_BOM_INCOMPLETE`: One or more BOM components are missing cost data for rollup.
- `COST_VARIANCE_THRESHOLD`: Actual cost variance exceeds the acceptable threshold for the costing method.
- `COST_LAYER_MISMATCH`: Cost layers are not properly ordered by receipt date for FIFO/LIFO issuance.

## Related Skills

- commerce-manufacturing — BOMs and work orders that drive cost rollups
- commerce-inventory — inventory valuation tied to cost layers
- commerce-general-ledger — journal entries for cost variance postings

## References
- references/costing-methods.md
- /home/dom/stateset-icommerce/crates/stateset-core/src/models/cost_accounting.rs
- /home/dom/stateset-icommerce/crates/stateset-embedded/src/cost_accounting.rs
