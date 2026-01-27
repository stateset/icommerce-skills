# Auto-Close Pattern

1. Load Gorgias/Zendesk access token.
2. Call autoCloseTicket activity with ticket_id.
3. Verify ticket status is "closed".
4. Return updated or failed.

Notes:
- Use in response workflows when auto-close decision is allowed.
- Avoid auto-close if escalation is detected.

Source:
- Workflow: `/home/dom/next-temporal/temporal/src/autoclose/workflows.mjs`
- Activities: `/home/dom/next-temporal/temporal/src/autoclose/activities.mjs`
