---
name: commerce-credit
description: Manage customer credit accounts, credit holds, and credit applications. Use when checking credit availability, placing holds on orders, or reviewing credit applications.
---

# Commerce Credit

Manage customer credit limits, perform credit checks, process credit applications, and place or release credit holds.

## How It Works

1. Create credit accounts for customers with limits and risk ratings.
2. Run credit checks before order approval.
3. Place credit holds on orders that exceed limits or have past-due balances.
4. Process credit applications with approval workflow.
5. Track credit transactions (charges, payments, adjustments).
6. Release holds after payment or approval override.

## Usage

- CLI: `stateset credit ...` or `stateset "check credit for customer CUST-123"`
- Writes require `--apply`.
- MCP tools: `create_credit_account`, `get_credit_account`, `update_credit_account`, `check_credit`, `place_credit_hold`, `release_credit_hold`, `submit_credit_application`, `review_credit_application`, `record_credit_transaction`, `get_customer_credit_summary`.

## Permissions

- Read: `get_credit_account`, `check_credit`, `get_customer_credit_summary` — no `--apply` needed.
- Write: `create_credit_account`, `update_credit_account`, `place_credit_hold`, `release_credit_hold`, `submit_credit_application` — requires `--apply`.

## Examples

```bash
stateset --db ./store.db "check credit customer_id=cust_123 order_amount=2000"
stateset --db ./store.db "create credit account customer_id=cust_456 limit=10000 risk=Low" --apply
stateset --db ./store.db "release credit hold hold_id=HOLD-001 reason='Payment received'" --apply
stateset --db ./store.db "get customer credit summary customer_id=cust_123"
```

## Status Flows

**Credit Account:** PendingReview -> Active -> OnHold -> Suspended -> Closed
**Credit Application:** Pending -> UnderReview -> Approved/Denied/MoreInfoNeeded (or Withdrawn)
**Credit Hold:** Placed -> UnderReview -> Released (or Escalated)

## Risk Ratings

- Low, Medium, High, Critical

## Hold Types

- OverLimit, PastDue, Manual, NewCustomer, HighRisk

## Output

```json
{"status":"credit_check","customer_id":"cust_123","approved":true,"credit_limit":10000.00,"available_credit":7500.00,"order_amount":2000.00}
```

## Present Results to User

- Credit check result (approved/denied/requires_approval).
- Current limit, used, and available credit.
- Active holds with reasons.
- Credit application decision and terms.

## Troubleshooting

- Order on hold: check hold type; release after payment or manager override.
- Credit check denied: customer over limit or has past-due balance.
- Application stuck: verify all required business information is provided.
- Limit change not reflected: confirm the credit transaction of type LimitChange was recorded.

## Error Codes

- `CREDIT_OVER_LIMIT`: Order amount exceeds the customer's available credit limit.
- `CREDIT_HOLD_ACTIVE`: An active credit hold is blocking order processing for this customer.
- `CREDIT_APP_INCOMPLETE`: Credit application is missing required business information.

## Related Skills

- **commerce-accounts-receivable**: Track overdue invoices that trigger credit holds.
- **commerce-general-ledger**: Post write-offs and credit memo adjustments to GL.
- **commerce-backorders**: Credit holds can block backorder fulfillment.

## References
- references/credit-management.md
- /home/dom/stateset-icommerce/crates/stateset-core/src/models/credit.rs
- /home/dom/stateset-icommerce/crates/stateset-embedded/src/credit.rs
