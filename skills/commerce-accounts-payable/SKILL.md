---
name: commerce-accounts-payable
description: Manage supplier bills, payments, and AP aging. Use when recording supplier invoices, processing payments, running payment batches, or reviewing AP aging reports.
---

# Commerce Accounts Payable

Track supplier bills, process payments, run payment batches, and monitor AP aging.

## How It Works

1. Create bills from supplier invoices with line items.
2. Approve bills for payment.
3. Record individual payments or create payment runs for batch processing.
4. Allocate payments to specific bills.
5. Generate AP aging reports by supplier.

## Usage

- CLI: `stateset ap ...` or `stateset "AP aging report"`
- Writes require `--apply`.
- MCP tools: `list_bills`, `create_bill`, `approve_bill`, `record_bill_payment`, `create_payment_run`, `approve_payment_run`, `get_ap_aging`, `get_ap_summary`.

## Examples

```bash
stateset --db ./store.db "list bills where supplier = 'Acme Corp'"
stateset --db ./store.db "create bill supplier='Acme Corp' amount=2500 due_date=2026-04-15" --apply
stateset --db ./store.db "approve bill BILL-2025-0050" --apply
stateset --db ./store.db "get ap aging"
```

## Status Flows

**Bill:** Draft -> Pending -> Approved -> PartiallyPaid -> Paid (or Cancelled/Disputed/Overdue)
**Payment Run:** Draft -> Pending -> Approved -> Processing -> Completed (or Cancelled)

## Payment Methods

- Check, ACH, Wire, CreditCard, Cash, Other

## Aging Buckets

- Current, 1-30 days, 31-60 days, 61-90 days, 90+ days

## Output

```json
{"status":"payment_recorded","bill_id":"BILL-2025-0050","amount_paid":2500.00,"balance_remaining":0.00,"payment_method":"ACH"}
```

## Present Results to User

- Bill number, supplier, and payment status.
- Amount paid and remaining balance.
- Aging summary with overdue amounts by bucket.
- Payment run totals and included bills.

## Troubleshooting

- Bill not approved: bills must be approved before payment.
- Payment exceeds balance: verify bill amount and prior payments.
- Duplicate bill: check existing bills for the same supplier invoice number.
- Payment run stuck processing: verify bank integration status and retry or cancel the run.

## Error Codes

- `AP_BILL_NOT_APPROVED`: Bill must be approved before payment can be recorded.
- `AP_PAYMENT_EXCEEDS_BALANCE`: Payment amount exceeds the outstanding bill balance.
- `AP_DUPLICATE_INVOICE`: A bill with the same supplier invoice number already exists.

## Related Skills

- **commerce-general-ledger**: Bill payments auto-post journal entries to GL.
- **commerce-receiving**: Match supplier bills against received PO quantities.
- **commerce-accounts-receivable**: Offset vendor debit memos against payables.

## References
- references/ap-aging.md
- /home/dom/stateset-icommerce/crates/stateset-core/src/models/accounts_payable.rs
- /home/dom/stateset-icommerce/crates/stateset-embedded/src/accounts_payable.rs
