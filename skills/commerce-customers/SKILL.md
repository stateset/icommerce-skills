---
name: commerce-customers
description: Manage customer records and profiles in StateSet iCommerce. Use when listing, getting, or creating customers, looking up by email, or running `stateset-direct customers`.
---

# Commerce Customers

Manage customer identity and profile data used across orders, carts, and analytics.

## How It Works

1. Find customers by email or ID.
2. Create or update customer records.
3. Use customer IDs for orders and carts.
4. Report counts or segments as needed.
5. Merge duplicate profiles and propagate the canonical ID to linked entities.

## Status Flows

- **Customer:** lead -> active -> inactive -> archived
- **Profile Merge:** duplicate_detected -> merge_pending -> merged

## Usage

- CLI: `stateset "list customers"` or `stateset-direct customers <action>`
- Writes require `--apply`.
- MCP tools: `list_customers`, `get_customer`, `create_customer`.

## Permissions

- **Read:** `list_customers`, `get_customer` — no `--apply` needed.
- **Write:** `create_customer`, `merge_customers` — requires `--apply`.

## Examples

```bash
stateset customers list --limit 10
stateset customers get cust_123
stateset customers create --email jane@example.com --name "Jane Doe" --apply
stateset customers search --email jane@example.com
```

## Output

```json
{"status":"ok","customer_id":"cust_123","email":"customer@example.com","name":"Jane Doe","created_at":"2026-03-20T14:00:00Z"}
```

## Present Results to User

- Customer identifiers and key fields updated.
- Any validation or deduping performed.
- Next steps (orders, carts, or segmentation).
- Merge actions taken and resulting canonical `customer_id`.

## Troubleshooting

- Customer not found: verify email or ID and search again.
- Duplicate email: merge or update the existing record via `merge_customers` tool.
- `create_customer` fails: check required fields `email`, `name` in the payload.
- Stale profile data: run `sync_pull` to fetch the latest from the sequencer.

## Error Codes

- `CUSTOMER_NOT_FOUND`: No customer record matches the given ID or email.
- `DUPLICATE_EMAIL`: A customer with this email already exists.
- `MERGE_CONFLICT`: Cannot merge; one or both profiles have pending orders.

## Related Skills

- **commerce-orders** -- attach orders to the correct customer profile.
- **commerce-customer-service** -- resolve support tickets tied to a customer.
- **commerce-sync** -- ensure customer records are synchronized across nodes.
- **commerce-embedded-sdk** -- manage customers programmatically from app code.

## References
- references/customer-commands.md
- /home/dom/stateset-icommerce/examples/cli-reference.md
- /home/dom/stateset-icommerce/cli/src/tools/customers.js
