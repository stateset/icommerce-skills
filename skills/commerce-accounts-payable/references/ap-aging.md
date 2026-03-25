# Accounts Payable Reference

## Bill Lifecycle

```
Draft → Pending → Approved → PartiallyPaid → Paid
                                    ↓
                              Overdue (auto)
                                    ↓
                              Disputed (manual)
```

## Bill Fields

- `bill_number`: Auto-generated (BILL-YYYY-NNNN)
- `supplier_id`: Linked supplier
- `invoice_number`, `invoice_date`: Supplier's reference
- `due_date`: Payment deadline
- `payment_terms`: Net 30, Net 60, etc.
- `total_amount`, `amount_paid`, `balance_due`: Financial tracking
- `currency`: Bill currency

## Bill Items

- `description`: Line item description
- `quantity`, `unit_price`: Pricing
- `amount`: Line total
- `gl_account_id`: Posting account
- `tax_amount`: Applicable tax

## Payment Allocation

Payments can be allocated across multiple bills:
- `bill_id`: Target bill
- `amount`: Amount applied to this bill
- Partial payments leave a remaining balance

## Payment Runs (Batch Processing)

Group multiple bill payments into a single run:
1. Create payment run (Draft)
2. Add bills to the run
3. Approve the run
4. Process all payments
5. Mark completed

## AP Aging Report

| Bucket | Days Past Due |
|--------|--------------|
| Current | Not yet due |
| 1-30 | 1 to 30 days overdue |
| 31-60 | 31 to 60 days overdue |
| 61-90 | 61 to 90 days overdue |
| 90+ | Over 90 days overdue |

## AP Summary by Supplier

- Total outstanding balance
- Number of open bills
- Overdue amount
- Last payment date
- Aging breakdown by bucket

## Common Commands

```bash
# View AP aging report
stateset ap aging --as-of 2025-03-31

# View aging by supplier
stateset ap supplier-aging --supplier SUP-001

# Create a new bill
stateset --apply "ap bill create --supplier SUP-001 --invoice-number INV-EXT-789 --amount 5000 --terms net_30"

# Approve a bill for payment
stateset --apply "ap bill approve BILL-2025-0042"

# Record payment against a bill
stateset --apply "ap bill pay BILL-2025-0042 amount 5000 via bank_transfer ref TXN-123"

# Create a payment run
stateset --apply "ap payment-run create --name 'Weekly Run' --bills BILL-001 BILL-002 BILL-003"

# Process payment run
stateset --apply "ap payment-run process RUN-001"
```

## MCP Tool Reference

| Tool | Action | Requires --apply |
|------|--------|-----------------|
| `list_bills` | List all bills with optional filters | No |
| `get_bill` | Get bill details by ID | No |
| `create_bill` | Create a new AP bill | Yes |
| `approve_bill` | Approve bill for payment | Yes |
| `pay_bill` | Record payment against a bill | Yes |
| `create_payment_run` | Create batch payment run | Yes |
| `process_payment_run` | Execute all payments in a run | Yes |
| `get_ap_aging` | Generate AP aging report | No |
| `dispute_bill` | Mark bill as disputed | Yes |

## Error Codes

| Error | Cause | Fix |
|-------|-------|-----|
| `BILL_NOT_FOUND` | Invalid bill number | Verify with `list_bills` |
| `ALREADY_PAID` | Bill balance is zero | No payment needed |
| `NOT_APPROVED` | Bill not yet approved | Approve before paying |
| `OVERPAYMENT` | Amount exceeds balance | Reduce payment amount |
| `DUPLICATE_INVOICE` | Supplier invoice already exists | Check for existing bill |
