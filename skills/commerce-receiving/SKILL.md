---
name: commerce-receiving
description: Manage inbound goods receiving, inspection, and put-away. Use when processing purchase order arrivals, transfers, or return receipts into warehouse locations.
---

# Commerce Receiving

Process inbound goods from purchase orders, transfers, and returns through receiving, inspection, and put-away.

## How It Works

1. Create a receipt linked to a purchase order, transfer, or return.
2. Record received quantities against expected line items.
3. Route items for quality inspection if required.
4. Create put-away tasks to move received goods into warehouse locations.
5. Complete put-away to finalize inventory placement.

## Usage

- CLI: `stateset receiving ...` or `stateset "receive items for PO PO-123"`
- Writes require `--apply`.
- MCP tools: `create_receipt`, `list_receipts`, `get_receipt`, `receive_items`, `create_put_away`, `complete_put_away`.

## Permissions

- Read: `list_receipts`, `get_receipt` — no `--apply` needed.
- Write: `create_receipt`, `receive_items`, `create_put_away`, `complete_put_away` — requires `--apply`.

## Examples

```bash
stateset receiving create --type PurchaseOrder --po PO-2025-0100 --apply
stateset receiving receive-items RCV-2025-0042 --sku WIDGET-001 --quantity 150 --apply
stateset receiving put-away RCV-2025-0042 --location LOC-A1-05 --apply
stateset receiving list --status InProgress --since 2025-01-01
```

## Receipt Types

- PurchaseOrder (default): goods from supplier PO
- Transfer: inter-warehouse transfer
- Return: customer return receiving
- Adjustment: inventory adjustment receipt
- Production: finished goods from manufacturing
- Other: miscellaneous receipts

## Status Flows

**Receipt:** Expected -> InProgress -> Received -> Inspecting -> PuttingAway -> Completed (or Cancelled)

**Receipt Item:** Pending -> PartiallyReceived -> Received -> Inspecting -> Rejected -> PutAway

**Put-Away:** Pending -> Assigned -> InProgress -> Completed (or Cancelled)

## Output

```json
{"status":"completed","receipt_number":"RCV-2025-0042","items_received":3,"total_quantity":150,"put_away_location":"LOC-A1-05"}
```

## Present Results to User

- Receipt number and linked PO or reference.
- Quantities expected vs received vs rejected.
- Items pending inspection.
- Put-away locations and completion status.

## Troubleshooting

- Quantity mismatch: record actual received; flag discrepancy for supplier follow-up.
- Items pending inspection: quality hold blocks put-away until inspection passes.
- Unknown SKU on receipt: verify PO line items match product catalog.
- Put-away location full: assign an alternate location or expand bin capacity.

## Error Codes

- `RECEIPT_QTY_MISMATCH`: Received quantity does not match the expected PO line quantity.
- `PUTAWAY_LOCATION_FULL`: Target put-away location has no remaining capacity; assign an alternate bin.
- `RECEIPT_SKU_UNKNOWN`: SKU on the receipt does not match any line item on the linked purchase order.

## Related Skills

- **commerce-warehouse**: Put-away tasks place received goods into warehouse locations.
- **commerce-quality**: Route received items through quality inspection before put-away.
- **commerce-backorders**: Received inventory can be allocated to open backorders.
- **commerce-accounts-payable**: Match receipts to supplier bills for three-way matching.

## References
- references/receiving-flow.md
- /home/dom/stateset-icommerce/crates/stateset-core/src/models/receiving.rs
- /home/dom/stateset-icommerce/crates/stateset-embedded/src/receiving.rs
