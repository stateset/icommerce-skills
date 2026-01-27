---
name: warranty-replacement-workflows
description: Build or update warranty and replacement workflows. Use when implementing warranty claims, creating replacement orders, or handling duplicate orders safely.
---

# Warranty and Replacement Workflows

Handle warranty claims and replacement orders without failing workflows.

## How It Works

1. Parse ticket payload and determine brand, eligibility, and test mode.
2. Validate address and SKU, and choose replacement rules.
3. Create the replacement order (ShipStation or Shopify).
4. Update the support ticket with status and notes.
5. Handle duplicates gracefully and return a safe status.

## Usage

Use when you need to:
- Add or modify warranty workflows.
- Create replacement orders from tickets.
- Prevent duplicate order failures.

Typical touchpoints:
- `temporal/src/<brand>/workflows.mjs`
- `temporal/src/<brand>/activities.mjs`

## Output

Example status object:

```json
{
  "status": "created",
  "rma": "W-12345",
  "order_id": "SS-98765"
}
```

## Present Results to User

- Warranty or replacement logic changes.
- Duplicate handling behavior.
- Ticket note or custom field updates.

## Troubleshooting

- Duplicate orders: use the duplicate handling pattern.
- Invalid SKU or address: add validation and early exits.
- External order API failures: verify credentials and request shape.

## References

- `references/warranty-workflow-notes.md`
- `references/replacement-orders.md`
- `references/duplicate-handling.md`
