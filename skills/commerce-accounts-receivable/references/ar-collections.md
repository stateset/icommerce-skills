# Accounts Receivable & Collections Reference

## AR Aging Buckets

| Bucket | Days Outstanding | Recommended Action |
|--------|-----------------|-------------------|
| Current | Not yet due | No action |
| 1-30 days | 1-30 past due | Reminder1 (friendly reminder) |
| 31-60 days | 31-60 past due | Reminder2 (follow-up) |
| 61-90 days | 61-90 past due | Reminder3 (urgent notice) |
| 90+ days | Over 90 past due | DemandLetter or CollectionNotice |

## Collection Activity Types

| Activity | Description |
|----------|-------------|
| DunningLetterSent | Automated or manual dunning letter |
| PhoneCall | Phone outreach to customer |
| Email | Email follow-up |
| InPersonVisit | On-site collection visit |
| PromiseToPay | Customer commitment to pay by date |
| PaymentPlanCreated | Installment arrangement |
| SentToCollections | Escalated to collections agency |
| WriteOffApproved | Balance written off |
| DisputeLogged | Customer disputes the charge |
| DisputeResolved | Dispute resolved |
| Note | General collection note |

## Credit Memos

Issue credits to reduce customer balance:

| Reason | Use Case |
|--------|----------|
| ReturnedGoods | Customer returned items |
| PricingError | Invoice was incorrect |
| Overpayment | Customer paid too much |
| Damaged | Goods arrived damaged |
| ServiceCredit | Service-level agreement credit |
| GoodwillAdjustment | Retention/satisfaction credit |

**Credit Memo Statuses:** Open -> PartiallyApplied -> FullyApplied (or Voided)

## Write-Offs

Remove uncollectible balances from AR:
- Requires approver authorization
- Posts to Bad Debt Expense GL account
- Tracks reason and approval date

## Customer Statement

Complete account summary including:
- Opening balance
- All transactions (invoices, payments, credits)
- Running balance
- Closing balance
- Aging summary

## Common Commands

```bash
stateset ar aging --as-of 2025-03-31
stateset ar customer-aging --customer cust_123
stateset ar statement --customer cust_123 --period 2025-Q1
stateset --apply "ar credit-memo create --customer cust_123 --amount 250 --reason ReturnedGoods"
stateset --apply "ar write-off --invoice inv_456 --amount 100 --approver admin_01"
```

## MCP Tool Reference

| Tool | Action | Requires --apply |
|------|--------|-----------------|
| `get_ar_aging` | Generate AR aging report | No |
| `get_customer_aging` | Aging for a single customer | No |
| `get_customer_statement` | Full transaction statement | No |
| `create_credit_memo` | Issue a credit memo | Yes |
| `apply_credit_memo` | Apply credit to an invoice | Yes |
| `create_write_off` | Write off uncollectible balance | Yes |
| `log_collection_activity` | Record collection touchpoint | Yes |
| `create_payment_plan` | Set up installment plan | Yes |
| `send_dunning_letter` | Send automated dunning notice | Yes |

## Payment Plan Fields

| Field | Type | Description |
|-------|------|-------------|
| `plan_id` | string | Unique payment plan identifier |
| `customer_id` | string | Customer on the plan |
| `total_amount` | number | Total balance covered |
| `installment_count` | number | Number of installments |
| `installment_amount` | number | Amount per installment |
| `frequency` | string | weekly, biweekly, monthly |
| `start_date` | date | First installment date |
| `status` | string | active, completed, defaulted |

## Error Codes

| Error | Cause | Fix |
|-------|-------|-----|
| `CUSTOMER_NOT_FOUND` | Invalid customer_id | Verify customer exists |
| `INVOICE_NOT_OVERDUE` | Invoice is current | No collection action needed |
| `CREDIT_EXCEEDS_BALANCE` | Credit memo > invoice balance | Reduce credit amount |
| `WRITE_OFF_UNAUTHORIZED` | Missing approver authorization | Provide valid approver ID |
| `PLAN_ALREADY_EXISTS` | Active plan for this customer | Modify existing plan instead |
