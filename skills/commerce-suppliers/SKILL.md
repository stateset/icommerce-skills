---
name: commerce-suppliers
description: Manage suppliers and purchase orders. Use when running `stateset-suppliers`, creating purchase orders, or handling procurement and replenishment flows.
---

# Commerce Suppliers

Handle supplier records and purchase order workflows for procurement.

## How It Works

1. Create or update supplier records with contact, lead time, and terms.
2. Create purchase orders with line items, quantities, and expected cost.
3. Submit POs for approval based on spending thresholds.
4. Send approved POs to suppliers and track acknowledgement.
5. Receive goods against the PO and update inventory.

## Usage

- CLI: `stateset-suppliers ...` or `stateset "create purchase order for supplier SUP-001"`
- Writes require `--apply`.
- MCP tools: `list_suppliers`, `create_supplier`, `create_purchase_order`, `approve_purchase_order`, `send_purchase_order`, `acknowledge_purchase_order`.

## Examples

```bash
stateset suppliers create --name "Acme Parts Co" --lead-time 14 --apply
stateset suppliers po create --supplier SUP-001 --sku WIDGET-001 --qty 500 --apply
stateset suppliers po approve --po po_123 --apply
stateset suppliers po list --status sent --supplier SUP-001
```

## Status Flows

**Purchase Order:** Draft -> Approved -> Sent -> Acknowledged -> Received (or Cancelled)

## Output

```json
{"status":"approved","purchase_order_id":"po_123","supplier_id":"sup_123","total":12500.00,"expected_date":"2025-02-01"}
```

## Present Results to User

- Supplier and PO identifiers with current status.
- Approval status and approver details.
- Line item totals and expected receipt date.
- Inventory impact on receipt.

## Troubleshooting

- Supplier not found: create supplier record with `create_supplier` before placing POs.
- PO already approved: approved POs cannot have line items modified; create an amendment.
- Acknowledgement missing: follow up with supplier and check `send_purchase_order` delivery.
- Receipt mismatch: compare received quantities against PO lines in commerce-receiving.

## Error Codes

- `SUPPLIER_NOT_FOUND`: No supplier record exists for the given ID.
- `PO_ALREADY_APPROVED`: Approved POs cannot have line items modified.
- `RECEIPT_MISMATCH`: Received quantities do not match PO line items.

## Related Skills

- commerce-receiving — inbound goods processing against purchase orders
- commerce-inventory — stock updates on PO receipt
- commerce-accounts-payable — supplier bill matching to POs
- commerce-quality — quality inspection of received goods

## References
- references/suppliers-flow.md
- /home/dom/stateset-icommerce/cli/.claude/agents/suppliers.md
