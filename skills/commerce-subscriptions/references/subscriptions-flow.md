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
