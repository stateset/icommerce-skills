---
name: commerce-warranties
description: Manage warranties and claims. Use when running `stateset-warranties`, creating warranty coverage, submitting claims, or handling warranty/RMA resolution flows.
---

# Commerce Warranties

Track warranty coverage and process claims through resolution.

## How It Works

1. Create warranties for orders or products with coverage period and terms.
2. Submit claims with `order_id`, issue description, and evidence.
3. Validate eligibility against coverage dates and claim history.
4. Approve or deny claims and record resolution (repair, replace, refund).
5. Track warranty costs and claim frequency for reporting.

## Usage

- CLI: `stateset-warranties ...` or `stateset "create warranty claim for order ORD-123"`
- Writes require `--apply`.
- MCP tools: `list_warranties`, `create_warranty`, `create_warranty_claim`, `approve_warranty_claim`, `deny_warranty_claim`.

## Examples

```bash
stateset warranties create --order ORD-123 --coverage 24m --apply
stateset warranties claim create --order ORD-123 --issue "defective motor" --apply
stateset warranties claim approve --claim claim_123 --resolution replace --apply
stateset warranties list --status active --customer cust_456
```

## Status Flows

**Warranty:** Active -> Expired (or Voided)

**Claim:** Submitted -> Under Review -> Approved/Denied -> Resolved (or Escalated)

## Output

```json
{"status":"approved","claim_id":"claim_123","warranty_id":"warr_456","resolution":"replace","order_id":"ord_789"}
```

## Present Results to User

- Warranty or claim identifiers and current status.
- Coverage dates and remaining warranty period.
- Resolution details (repair, replace, refund) and any replacement order ID.
- Follow-up actions (ship replacement, issue refund, close ticket).

## Troubleshooting

- Warranty expired: confirm `coverage_end_date` against current date.
- Claim already exists: show the open claim and its current status.
- Duplicate claim: check for existing claims on the same `order_id` and SKU.
- Resolution delayed: verify approval workflow and escalation contacts.

## Error Codes

- `WARRANTY_EXPIRED`: Coverage period has ended for this warranty.
- `DUPLICATE_CLAIM`: An open claim already exists for this order and SKU.
- `CLAIM_DENIED`: Claim does not meet coverage terms or conditions.

## Related Skills

- commerce-returns — return flow that may trigger warranty claims
- commerce-orders — order data referenced by warranty coverage
- commerce-shipments — shipping replacements for approved claims

## References
- references/warranties-flow.md
- /home/dom/stateset-icommerce/cli/.claude/agents/warranties.md
