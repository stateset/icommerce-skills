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
