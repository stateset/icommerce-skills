---
name: erp-fulfillment-sync
description: Build or update NetSuite and DCL synchronization workflows (orders, fulfillment, inventory). Use when modifying ERP or fulfillment sync logic.
---

# ERP and Fulfillment Sync

Maintain order, fulfillment, and inventory sync between NetSuite and DCL.

## How It Works

1. Fetch orders or inventory from NetSuite.
2. Transform data into DCL-compatible payloads.
3. Create or update orders in DCL.
4. Sync tracking, receipts, invoices, and payments.
5. Record results and handle batch failures.

## Usage

Use when you need to:
- Modify org-specific NetSuite or DCL workflows.
- Adjust batch sizes, concurrency, or retries.
- Add new inventory sync logic.

Typical touchpoints:
- `temporal/src/<org>/workflows.mjs`
- `temporal/src/<org>/activities.mjs`

## Output

Example status object:

```json
{
  "status": "completed",
  "processed": 120,
  "failed": 3
}
```

## Present Results to User

- Which workflow paths were updated.
- Changes to batching, concurrency, or error handling.
- Any new API dependencies.

## Troubleshooting

- API timeouts: adjust activity timeouts.
- Partial failures: check batch error details and retry policy.
- Data mismatches: verify transform rules.

## References

- `references/erp-patterns.md`
