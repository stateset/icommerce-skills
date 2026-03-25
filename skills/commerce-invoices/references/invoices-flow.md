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

## Line Item Fields

| Field | Type | Description |
|-------|------|-------------|
| `line_item_id` | string | Unique line identifier |
| `description` | string | Item or service description |
| `quantity` | number | Number of units |
| `unit_price` | number | Price per unit |
| `amount` | number | quantity * unit_price |
| `tax_rate` | number | Tax rate applied to this line |
| `gl_account_id` | string | General ledger posting account |

## Payment Recording

```bash
# Record full payment
stateset --apply "record invoice payment INV-123 amount 10000 via credit_card"

# Record partial payment
stateset --apply "record invoice payment INV-123 amount 3000 via bank_transfer"

# Record payment with reference number
stateset --apply "record invoice payment INV-123 amount 5000 via check ref CHK-4567"
```

## Payment Methods

| Method | `payment_via` Value | Notes |
|--------|-------------------|-------|
| Bank Transfer | `bank_transfer` | ACH or wire transfer |
| Credit Card | `credit_card` | Card-on-file charge |
| Check | `check` | Include ref number |
| Cash | `cash` | Manual reconciliation |
| Store Credit | `store_credit` | Deducted from balance |

## Dunning Schedule

| Days Overdue | Action | Template |
|-------------|--------|----------|
| 1 | Friendly reminder email | `reminder_1` |
| 15 | Follow-up email | `reminder_2` |
| 30 | Urgent notice | `reminder_3` |
| 60 | Final warning | `final_warning` |
| 90 | Escalate to collections | `collections_notice` |

## Error Codes

| Error | Cause | Fix |
|-------|-------|-----|
| `INVOICE_NOT_FOUND` | Invalid invoice_id | Verify ID with `list_invoices` |
| `ALREADY_PAID` | Invoice balance is zero | No further payment needed |
| `OVERPAYMENT` | Amount exceeds balance due | Issue credit memo for difference |
| `INVOICE_VOIDED` | Cannot modify voided invoice | Create a new invoice instead |
| `INVALID_PAYMENT_METHOD` | Unsupported payment_via value | Use a supported payment method |
