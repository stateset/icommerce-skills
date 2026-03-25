---
name: commerce-subscriptions
description: Manage subscription plans, billing cycles, and subscriptions. Use when running `stateset-subscriptions`, enrolling customers, or handling pause/resume/cancel operations.
---

# Commerce Subscriptions

Handle recurring billing plans and customer subscriptions.

## How It Works

1. Create subscription plans with pricing, interval (`monthly`, `quarterly`, `annual`), and trial period.
2. Enroll customers by creating a subscription linked to a plan.
3. Track billing cycles and charge dates automatically.
4. Pause, resume, cancel, or skip individual billing cycles.
5. Review billing history, payment status, and subscription events.

## Usage

- CLI: `stateset-subscriptions ...` or `stateset "pause subscription sub_123"`
- Writes require `--apply`.
- MCP tools: `create_subscription_plan`, `create_subscription`, `pause_subscription`, `resume_subscription`, `cancel_subscription`, `skip_billing_cycle`, `list_billing_cycles`.

## Permissions

- **Read:** `list_billing_cycles` — no `--apply` needed.
- **Write:** `create_subscription_plan`, `create_subscription`, `pause_subscription`, `resume_subscription`, `cancel_subscription`, `skip_billing_cycle` — requires `--apply`.

## Examples

```bash
stateset subscriptions create-plan --name "Pro Monthly" --interval monthly --price 29.99 --apply
stateset subscriptions create --customer cust_123 --plan plan_456 --apply
stateset subscriptions pause sub_123 --apply
stateset subscriptions cancel sub_123 --at-period-end --apply
```

## Status Flows

**Subscription:** Active -> Paused -> Active (or Cancelled/Expired)

**Billing Cycle:** Scheduled -> Charged -> Paid (or Failed/Skipped)

## Output

```json
{"status":"active","subscription_id":"sub_123","plan":"monthly","next_charge_date":"2025-02-01","amount":29.99}
```

## Present Results to User

- Plan and subscription identifiers with current status.
- Billing interval, next charge date, and recurring amount.
- Any proration, trial period, or cancellation effective date.
- Payment history for recent billing cycles.

## Troubleshooting

- Plan archived: select an active plan; archived plans cannot accept new enrollments.
- Past due: review billing cycles, retry failed payment, or update payment method.
- Cancel timing: confirm whether cancellation is immediate or at end of billing period.
- Duplicate subscription: check if customer already has an active subscription to the same plan.

## Error Codes

- `PLAN_ARCHIVED`: Archived plans cannot accept new enrollments.
- `BILLING_PAST_DUE`: Payment failed for the current billing cycle.
- `DUPLICATE_SUBSCRIPTION`: Customer already has an active subscription to this plan.

## Related Skills

- commerce-payments — payment processing for subscription charges
- commerce-customers — customer records linked to subscriptions
- commerce-invoices — invoices generated per billing cycle

## References
- references/subscriptions-flow.md
- /home/dom/stateset-icommerce/cli/.claude/agents/subscriptions.md
