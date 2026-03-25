---
name: commerce-backorders
description: Manage backorders for out-of-stock items. Use when tracking unfulfilled demand, allocating incoming inventory to backorders, or prioritizing backorder fulfillment.
---

# Commerce Backorders

Track unfulfilled demand, allocate incoming inventory, and prioritize backorder fulfillment.

## How It Works

1. Create backorders when ordered items are out of stock.
2. Set priority and expected/promised dates.
3. Allocate incoming inventory (from POs, production, or transfers) to backorders.
4. Fulfill backorders partially or completely as stock becomes available.
5. Monitor backorder summaries by SKU and priority.

## Usage

- CLI: `stateset backorders ...` or `stateset "list backorders for SKU WIDGET-001"`
- Writes require `--apply`.
- MCP tools: `list_backorders`, `create_backorder`, `update_backorder`, `allocate_backorder`, `fulfill_backorder`, `cancel_backorder`, `get_backorder_summary`, `get_sku_backorder_summary`.

## Examples

```bash
stateset backorders create --sku WIDGET-001 --quantity 100 --priority high --apply
stateset backorders allocate BO-2025-0015 --source PurchaseOrder --po PO-2025-050 --apply
stateset backorders fulfill BO-2025-0015 --quantity 60 --apply
stateset backorders summary --sku WIDGET-001
```

## Status Flows

**Backorder:** Pending -> Allocated -> PartiallyFulfilled -> ReadyToShip -> Fulfilled (or Cancelled)
**Allocation:** Pending -> Confirmed -> Expired (or Released)

## Priority Levels

- Low, Normal (default), High, Critical

## Fulfillment Sources

- Inventory (default): existing warehouse stock
- PurchaseOrder: incoming supplier shipment
- Transfer: inter-warehouse transfer
- Production: manufacturing output

## Output

```json
{"status":"partially_fulfilled","backorder_id":"BO-2025-0015","sku":"WIDGET-001","quantity_ordered":100,"quantity_fulfilled":60,"quantity_remaining":40}
```

## Present Results to User

- Backorder number, SKU, and priority.
- Quantities ordered, fulfilled, and remaining.
- Expected and promised dates.
- Fulfillment source (PO, production, etc.).
- SKU-level backorder summary across all orders.

## Troubleshooting

- Allocation expired: re-allocate or extend expiration date.
- Cannot fulfill: verify available inventory matches allocation.
- Priority conflict: Critical backorders should be fulfilled before Low/Normal.
- Promised date passed: update the promised date and notify the customer.

## Error Codes

- `BO_ALLOCATION_EXPIRED`: The inventory allocation has expired and must be re-allocated.
- `BO_INSUFFICIENT_STOCK`: Available inventory is insufficient to fulfill the backorder quantity.
- `BO_PROMISED_DATE_PASSED`: The promised delivery date has elapsed without fulfillment.

## Related Skills

- **commerce-receiving**: Incoming PO receipts provide stock for backorder allocation.
- **commerce-warehouse**: Warehouse inventory levels drive backorder fulfillment.
- **commerce-quality**: Failed inspections can reduce allocatable inventory.

## References
- references/backorder-management.md
- /home/dom/stateset-icommerce/crates/stateset-core/src/models/backorder.rs
- /home/dom/stateset-icommerce/crates/stateset-embedded/src/backorder.rs
