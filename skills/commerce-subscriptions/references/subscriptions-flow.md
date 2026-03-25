# Subscriptions Flow

## Status Flow

```
Trialing -> Active -> Paused -> Active (resumed)
                  \-> Cancelled
                  \-> Expired
```

## Billing Cycle Flow

```
Scheduled -> Charged -> Paid (or Failed -> Retrying -> Paid/Cancelled)
                          \-> Skipped
```

## Common Commands

```bash
stateset --apply "create subscription plan 'Pro Monthly' 29.99 per month"
stateset --apply "create subscription for customer@example.com on plan PLAN-123"
stateset --apply "pause subscription SUB-123"
stateset --apply "resume subscription SUB-123"
stateset --apply "cancel subscription SUB-123"
stateset --apply "skip billing cycle for SUB-123"
stateset "list billing cycles for SUB-123"
```

## MCP Tool Reference

| Tool | Action | Requires --apply |
|------|--------|-----------------|
| `create_subscription_plan` | Create a plan with pricing and interval | Yes |
| `create_subscription` | Enroll customer in a plan | Yes |
| `pause_subscription` | Pause billing | Yes |
| `resume_subscription` | Resume paused subscription | Yes |
| `cancel_subscription` | Cancel subscription | Yes |
| `skip_billing_cycle` | Skip next billing cycle | Yes |
| `list_billing_cycles` | View billing history | No |

## Intervals

| Interval | Billing Frequency |
|----------|------------------|
| `daily` | Every day |
| `weekly` | Every week |
| `monthly` | Every month |
| `quarterly` | Every 3 months |
| `annual` | Every year |

## Subscription Fields

| Field | Description |
|-------|-------------|
| `subscription_id` | Unique identifier |
| `customer_id` | Subscriber |
| `plan_id` | Linked plan |
| `status` | trialing, active, paused, cancelled |
| `current_period_start` | Start of current billing period |
| `current_period_end` | End of current billing period |
| `next_charge_date` | Next billing date |
| `cancel_at_period_end` | Cancel at end of period (boolean) |

## Plan Fields

| Field | Type | Description |
|-------|------|-------------|
| `plan_id` | string | Unique plan identifier |
| `name` | string | Display name (e.g., "Pro Monthly") |
| `amount` | number | Charge amount per interval |
| `currency` | string | ISO 4217 currency code |
| `interval` | string | Billing frequency |
| `trial_days` | number | Free trial duration (0 = no trial) |
| `features` | array | List of included feature keys |

## Billing Cycle Fields

| Field | Type | Description |
|-------|------|-------------|
| `cycle_id` | string | Unique cycle identifier |
| `subscription_id` | string | Parent subscription |
| `period_start` | datetime | Cycle start date |
| `period_end` | datetime | Cycle end date |
| `amount` | number | Amount charged |
| `status` | string | scheduled, charged, paid, failed, skipped |
| `payment_method` | string | Method used for charge |
| `failure_reason` | string | Reason if charge failed |

## Retry Logic for Failed Charges

| Attempt | Delay | Action |
|---------|-------|--------|
| 1st retry | 3 days | Re-attempt charge |
| 2nd retry | 5 days | Re-attempt, notify customer |
| 3rd retry | 7 days | Final attempt, warn of cancellation |
| Exhausted | -- | Cancel subscription, send notice |

## Error Codes

| Error | Cause | Fix |
|-------|-------|-----|
| `PLAN_NOT_FOUND` | Invalid plan_id | Verify plan exists with `list_plans` |
| `ALREADY_ACTIVE` | Subscription already active | Use upgrade/downgrade instead |
| `ALREADY_CANCELLED` | Cannot modify cancelled subscription | Create a new subscription |
| `PAYMENT_FAILED` | Charge declined | Update payment method, retry |
| `TRIAL_EXPIRED` | Trial ended without payment | Add payment method to activate |
