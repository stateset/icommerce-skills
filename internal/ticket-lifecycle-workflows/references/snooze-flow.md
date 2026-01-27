# Snooze Follow-Up Pattern

## Use Case

Product quality issues that need timed follow-ups (example brand).

## Timeline

- Day 0: Send initial response, set snooze_datetime +3 days, add "product-quality-snooze-active".
- Day 3: Follow-up #1, set snooze_datetime +3 days.
- Day 6: Follow-up #2, set snooze_datetime +1 hour.
- Day 6 + 1h: Auto-close, clear snooze_datetime, add "auto-closed-quality-follow-up".

## Stop Conditions

- Customer replies
- Agent responds
- Ticket manually closed

## Implementation Notes

- Use a child workflow for the snooze sequence.
- Re-fetch ticket state before each follow-up.
- Use distinct return statuses for monitoring (customer_responded, agent_takeover, completed_and_closed).

## Source References

- Workflow: `/home/dom/next-temporal/temporal/src/<brand>/workflows.mjs` (productQualitySnoozeWorkflow)
- Activities: `/home/dom/next-temporal/temporal/src/<brand>/activities.mjs`
- Quick start: `/home/dom/next-temporal/PRODUCT-QUALITY-SNOOZE-QUICK-START.md`
- Integration guide: `/home/dom/next-temporal/SNOOZE-WORKFLOW-INTEGRATION.md`
- Detailed flow: `/home/dom/next-temporal/product-quality-snooze-flow.md`
