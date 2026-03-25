---
name: commerce-customer-service
description: Handle customer service operations for iCommerce. Use when managing tickets, order issues, returns, refunds, or support playbooks.
---

# Commerce Customer Service

Coordinate cross-domain customer support workflows.

## How It Works

1. Identify the customer and related orders or carts.
2. Resolve the request using orders, returns, inventory, or checkout tools.
3. Confirm outcomes and provide next steps.
4. Document any exceptions or manual follow-up.
5. Tag the interaction with resolution codes for reporting and playbook refinement.

## Status Flows

- **Ticket:** open -> in_progress -> awaiting_customer -> resolved -> closed
- **Return:** requested -> approved -> items_received -> refunded
- **Refund:** pending -> processing -> completed | failed

## Usage

- CLI: use `stateset` in natural language with `--apply` for writes.
- MCP tools span customers, orders, products, inventory, returns, and carts.

## Permissions

- Read: lookups across customers, orders, returns, carts — no `--apply` needed.
- Write: `returns create`, `refund issue`, ticket updates — requires `--apply`.

## Examples

```bash
stateset "look up order ORD-123 for customer cust_456"
stateset returns create --order ORD-123 --reason "wrong size" --apply
stateset refund issue --order ORD-123 --amount 49.99 --apply
stateset tickets list --status open --customer cust_456
```

## Output

```json
{"status":"resolved","customer_id":"cust_123","order_id":"ord_123","resolution_code":"refund_issued","agent":"auto","elapsed_ms":1240}
```

## Present Results to User

- Actions taken across domains.
- Key identifiers (customer, order, return, cart).
- Any remaining follow-up required.
- Resolution code and total handling time.

## Troubleshooting

- Missing identifiers: ask for email, order number, or cart ID.
- Conflicting statuses: verify latest order or return state before acting.
- `resolution_code` empty: ensure the playbook maps the issue type to a code in `customer-service-playbooks.md`.
- MCP tool timeout: retry with `--timeout 30000`; check `stateset` daemon health via `stateset status`.

## Error Codes

- `CS_MISSING_IDENTIFIER`: Customer email, order number, or cart ID is required to proceed.
- `CS_RESOLUTION_UNMAPPED`: The issue type has no mapped resolution code in the playbook.
- `CS_TICKET_CONFLICT`: Ticket status conflicts with the requested action; verify current state.

## Related Skills

- **commerce-orders** -- look up or transition order status during support.
- **commerce-customers** -- resolve customer identity and profile data.
- **commerce-sync** -- verify event delivery when a customer reports missing updates.
- **commerce-autonomous-engine** -- check scheduled jobs that auto-resolve common tickets.

## References
- references/customer-service-playbooks.md
- /home/dom/stateset-icommerce/cli/.claude/agents/customer-service.md
