# Suppliers and Purchase Orders

## PO Status Flow

```
Draft -> Pending Approval -> Approved -> Sent -> Acknowledged -> Received
                              \-> Cancelled
```

## Common Commands

```bash
stateset --apply "create supplier Example Supplier"
stateset --apply "create purchase order for supplier SUP-123"
stateset --apply "add 100 units of WIDGET-001 to PO PO-123"
stateset --apply "approve purchase order PO-123"
stateset --apply "send purchase order PO-123"
stateset --apply "acknowledge purchase order PO-123"
```

## MCP Tool Reference

| Tool | Action | Requires --apply |
|------|--------|-----------------|
| `list_suppliers` | List all supplier records | No |
| `create_supplier` | Create a new supplier | Yes |
| `create_purchase_order` | Create a PO for a supplier | Yes |
| `add_po_line_item` | Add item to a purchase order | Yes |
| `approve_purchase_order` | Approve a draft PO | Yes |
| `send_purchase_order` | Send PO to supplier | Yes |
| `acknowledge_purchase_order` | Record supplier acknowledgement | Yes |

## Supplier Fields

| Field | Description |
|-------|-------------|
| `supplier_id` | Unique supplier identifier |
| `name` | Supplier company name |
| `contact_email` | Primary contact email |
| `lead_time_days` | Default lead time for orders |
| `payment_terms` | Payment terms (net_30, net_60) |
| `currency` | Preferred currency code |

## PO Line Item Fields

| Field | Description |
|-------|-------------|
| `sku` | Product SKU to order |
| `quantity` | Units requested |
| `unit_cost` | Cost per unit |
| `total_cost` | quantity * unit_cost |
| `expected_date` | Expected delivery date |

## PO Status Transition Rules

| Current Status | Allowed Next Status |
|---------------|-------------------|
| `draft` | `pending_approval`, `cancelled` |
| `pending_approval` | `approved`, `cancelled` |
| `approved` | `sent`, `cancelled` |
| `sent` | `acknowledged` |
| `acknowledged` | `received`, `partially_received` |
| `partially_received` | `received` |
| `received` | (terminal) |
| `cancelled` | (terminal) |

## Receiving Commands

```bash
stateset --apply "receive purchase order PO-123 items SKU-001:50,SKU-002:25"
stateset --apply "partially receive PO-123 items SKU-001:30"
stateset --apply "reject received items PO-123 SKU-002 qty 5 reason 'damaged'"
stateset "list purchase orders status sent"
```

## Error Handling

| Error Code | Meaning | Resolution |
|------------|---------|------------|
| `SUPPLIER_NOT_FOUND` | Supplier ID does not exist | Verify supplier ID |
| `PO_NOT_FOUND` | Purchase order ID invalid | Check the PO number |
| `INVALID_TRANSITION` | Status change not allowed | Follow the transition rules above |
| `QUANTITY_EXCEEDS_ORDERED` | Received qty > ordered qty | Adjust received quantity or amend PO |
| `DUPLICATE_PO` | PO already exists for this reference | Use the existing PO |

## Supplier Performance Metrics

| Metric | Description | Command |
|--------|-------------|---------|
| `on_time_rate` | % of POs delivered by expected date | `stateset "supplier performance SUP-123 on_time_rate"` |
| `fill_rate` | % of ordered units actually received | `stateset "supplier performance SUP-123 fill_rate"` |
| `defect_rate` | % of received units rejected | `stateset "supplier performance SUP-123 defect_rate"` |
| `avg_lead_time` | Average days from sent to received | `stateset "supplier performance SUP-123 avg_lead_time"` |

## Events Emitted

| Event | Trigger |
|-------|---------|
| `purchase_order.created` | New PO created |
| `purchase_order.approved` | PO approved |
| `purchase_order.sent` | PO sent to supplier |
| `purchase_order.received` | All items received |
| `purchase_order.partially_received` | Some items received |

## Integration Notes

- Receiving a PO automatically triggers `adjust_inventory` with reason `received`.
- Supplier `lead_time_days` is used to calculate reorder points in inventory planning.
- POs support file attachments (invoices, packing slips) via `attach_document`.
- Multi-currency POs convert to base currency at the rate on the `sent` date.
