# Invoices Flow

## Status Flow

```
Draft -> Sent -> Viewed -> Partially Paid -> Paid
                   \-> Overdue (past due_date)
                   \-> Voided
```

## Common Commands

```bash
stateset --apply "create invoice for customer CUST-123 with 10 units of CONSULTING"
stateset --apply "send invoice INV-123"
stateset --apply "record invoice payment INV-123 amount 5000 via bank_transfer"
stateset "overdue invoices 30 days"
stateset "invoice aging report"
stateset --apply "void invoice INV-456"
```

## MCP Tool Reference

| Tool | Action | Requires --apply |
|------|--------|-----------------|
| `list_invoices` | List all invoices | No |
| `create_invoice` | Create invoice with line items | Yes |
| `send_invoice` | Send invoice to customer | Yes |
| `record_invoice_payment` | Record full or partial payment | Yes |
| `get_overdue_invoices` | List overdue invoices | No |

## Invoice Fields

| Field | Description |
|-------|-------------|
| `invoice_id` | Unique invoice identifier |
| `customer_id` | Customer billed |
| `line_items[]` | Items with description, qty, unit_price |
| `subtotal` | Sum of line items |
| `tax` | Tax amount |
| `total` | subtotal + tax |
| `amount_paid` | Payments received |
| `amount_due` | total - amount_paid |
| `terms` | Payment terms (net_30, net_60, due_on_receipt) |
| `due_date` | Payment due date |

## Aging Buckets

| Bucket | Description |
|--------|-------------|
| Current | Not yet due |
| 1-30 days | 1-30 days past due |
| 31-60 days | 31-60 days past due |
| 61-90 days | 61-90 days past due |
| 90+ days | Over 90 days past due |
