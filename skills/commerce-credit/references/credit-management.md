# Credit Management Reference

## Credit Account Fields

- `customer_id`: Linked customer
- `credit_limit`: Maximum credit allowed
- `credit_used`: Current outstanding balance
- `credit_available`: limit minus used
- `risk_rating`: Low, Medium, High, Critical
- `payment_terms`: Net 30, Net 60, etc.
- `last_review_date` / `next_review_date`: Review schedule

## Credit Check Flow

```
Order Placed
  └─ Check Credit
       ├─ Approved → Order proceeds
       ├─ Denied → Order rejected, notify customer
       └─ RequiresApproval → Hold placed, manager reviews
```

## Credit Hold Types

| Hold Type | Trigger | Resolution |
|-----------|---------|------------|
| OverLimit | Order exceeds available credit | Payment received or limit increased |
| PastDue | Customer has overdue invoices | Outstanding invoices paid |
| Manual | Credit manager decision | Manager releases hold |
| NewCustomer | First order from new customer | Credit application approved |
| HighRisk | Risk rating elevated | Risk review completed |

## Credit Application

Application includes:
- Business information (name, tax ID, years in business)
- Requested credit limit
- Trade references
- Bank references
- Financial statements

Review workflow:
1. Pending (submitted)
2. UnderReview (assigned to analyst)
3. MoreInfoNeeded (additional docs requested)
4. Approved (with approved limit, terms) or Denied (with reason)

## Credit Transactions

| Type | Effect on Credit Used |
|------|----------------------|
| Charge | Increases (order placed) |
| Payment | Decreases (payment received) |
| CreditMemo | Decreases (credit issued) |
| Adjustment | Increases or decreases |
| WriteOff | Decreases (bad debt) |
| LimitChange | No effect on used; changes limit |

## Risk Rating Guidelines

| Rating | Criteria |
|--------|----------|
| Low | Strong payment history, low utilization |
| Medium | Occasional late payments, moderate utilization |
| High | Frequent late payments, high utilization |
| Critical | Past-due > 90 days, over limit |

## Common Operations

```bash
stateset --apply "create credit account for customer CUST-1001 limit 50000 terms net30"
stateset --apply "run credit check for order ORD-2025-0500"
stateset --apply "increase credit limit CUST-1001 to 75000 reason good_payment_history"
stateset --apply "place credit hold on customer CUST-1001 type manual reason review_needed"
stateset --apply "release credit hold CUST-1001"
stateset "list customers with credit holds"
stateset "credit utilization report"
```

## Credit Review Schedule

| Risk Rating | Review Frequency | Auto-Review Triggers |
|-------------|-----------------|---------------------|
| Low | Annually | Credit limit increase request |
| Medium | Semi-annually | Payment 15+ days late |
| High | Quarterly | Order exceeding 80% of limit |
| Critical | Monthly | Any new order placed |

## Credit Memo Fields

| Field | Description |
|-------|-------------|
| `credit_memo_id` | Unique memo identifier (CM-YYYY-NNNN) |
| `customer_id` | Customer receiving the credit |
| `amount` | Credit amount issued |
| `reason` | ReturnCredit, PriceAdjustment, Goodwill, BillingError, Warranty |
| `source_invoice_id` | Original invoice, if applicable |
| `applied_to_invoice` | Invoice the memo is applied against |
| `status` | Draft, Approved, Applied, Voided |

## Practical Notes

- Credit checks are performed automatically at order submission; orders exceeding available credit enter a hold queue.
- A **RequiresApproval** result allows a credit manager to override and approve the order within 48 hours before it is auto-rejected.
- Credit memos reduce `credit_used` immediately upon approval, freeing available credit for new orders.
- Write-offs require manager-level approval and generate a corresponding GL journal entry to Bad Debt Expense.
- The `credit_available` field is computed in real time: `credit_limit - credit_used`.
