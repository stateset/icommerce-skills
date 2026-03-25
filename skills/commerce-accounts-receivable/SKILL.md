---
name: commerce-accounts-receivable
description: Manage customer receivables, collections, credit memos, and AR aging. Use when tracking overdue invoices, sending dunning letters, creating write-offs, or generating customer statements.
---

# Commerce Accounts Receivable

Track customer receivables, manage collections, issue credit memos, and monitor AR aging.

## How It Works

1. Monitor AR aging to identify overdue accounts.
2. Log collection activities (dunning letters, calls, emails).
3. Issue credit memos for returns, pricing errors, or goodwill.
4. Apply payments and credit memos to outstanding invoices.
5. Write off uncollectible balances with approval.
6. Generate customer statements.

## Usage

- CLI: `stateset ar ...` or `stateset "AR aging report"`
- Writes require `--apply`.
- MCP tools: `get_ar_aging`, `get_customer_ar_aging`, `log_collection_activity`, `create_credit_memo`, `apply_credit_memo`, `apply_payment_to_invoice`, `create_write_off`, `get_customer_statement`, `get_customer_ar_summary`.

## Examples

```bash
stateset --db ./store.db "get ar aging"
stateset --db ./store.db "get customer statement customer_id=cust_123"
stateset --db ./store.db "create credit memo customer_id=cust_123 amount=150 reason=PricingError" --apply
stateset --db ./store.db "log collection activity customer_id=cust_123 type=Reminder2" --apply
```

## Status Flows

**Invoice Collection:** None -> Reminder1Sent -> Reminder2Sent -> Reminder3Sent -> InCollections -> SentToAgency (or WrittenOff/PaymentPlan)
**Credit Memo:** Draft -> Pending -> Approved -> Applied (or Voided)
**Write-Off:** Pending -> Approved -> Posted (or Rejected)

## Aging Buckets

- Current, 1-30 days, 31-60 days, 61-90 days, 90+ days

## Credit Memo Reasons

- ReturnedGoods, PricingError, Overpayment, Damaged, ServiceCredit, GoodwillAdjustment, Other

## Output

```json
{"status":"dunning_sent","customer_id":"cust_123","dunning_type":"Reminder2","total_overdue":3250.00,"invoices_overdue":3}
```

## Present Results to User

- Customer name and total outstanding balance.
- Aging breakdown by bucket.
- Collection activity history and next recommended action.
- Credit memo and write-off totals.

## Troubleshooting

- Credit memo won't apply: verify memo status is Open and invoice has remaining balance.
- Write-off rejected: ensure approver and GL account are provided.
- Aging mismatch: confirm invoice dates and payment applications are current.
- Dunning not sent: verify customer has a valid email and collection status is advancing.

## Error Codes

- `AR_CREDIT_MEMO_INVALID`: Credit memo status must be Open and invoice must have a remaining balance.
- `AR_WRITEOFF_REJECTED`: Write-off requires an approver and a valid GL account.
- `AR_DUNNING_NO_EMAIL`: Customer has no valid email address for dunning delivery.

## Related Skills

- **commerce-credit**: Credit holds triggered by overdue AR balances.
- **commerce-general-ledger**: AR transactions auto-post journal entries to GL.
- **commerce-accounts-payable**: Offset vendor credits against customer receivables.

## References
- references/ar-collections.md
- /home/dom/stateset-icommerce/crates/stateset-core/src/models/accounts_receivable.rs
- /home/dom/stateset-icommerce/crates/stateset-embedded/src/accounts_receivable.rs
