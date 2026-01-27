---
name: ticket-lifecycle-workflows
description: Implement timed ticket lifecycle automation (snooze follow-ups, auto-close) in Temporal/Gorgias. Use when adding follow-up sequences, snooze_datetime handling, or auto-close logic.
---

# Ticket Lifecycle Workflows

Implement follow-up sequences, snooze behavior, and auto-close logic.

## How It Works

1. Detect qualifying tickets (tags, issue types, or AI classifications).
2. Set `snooze_datetime` and add tracking tags.
3. Start a child workflow for delayed follow-ups.
4. Before each follow-up, re-check ticket state and responses.
5. Send follow-ups, update snooze, and eventually auto-close.
6. Stop the workflow if the customer or an agent responds.

## Usage

Use when you need to:
- Add or adjust snooze-based follow-ups.
- Implement auto-close for inactive tickets.
- Add tracking tags or lifecycle reporting.

Typical touchpoints:
- `temporal/src/<brand>/workflows.mjs`
- `temporal/src/autoclose/workflows.mjs`
- `temporal/src/<brand>/activities.mjs` (for message templates)

## Output

Example statuses:

```json
{ "status": "completed_and_closed" }
```

```json
{ "status": "customer_responded" }
```

## Present Results to User

- Timeline changes (sleep intervals, follow-up count).
- Tags added or removed.
- Auto-close behavior and stop conditions.

## Troubleshooting

- Follow-ups not firing: check sleep intervals and workflow start.
- Snooze not updating: verify ticket update payload.
- Workflow should stop: ensure checks for new agent/customer messages.

## References

- `references/snooze-flow.md`
- `references/autoclose-patterns.md`
