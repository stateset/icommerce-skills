# Warranties Flow

## Warranty Lifecycle

```
Active -> Expiring Soon -> Expired
    \-> Voided
```

## Claim Lifecycle

```
Submitted -> Under Review -> Approved -> Resolved
                          \-> Denied -> Escalated (optional)
```

## Common Commands

```bash
stateset --apply "create warranty for order ORD-123"
stateset --apply "create warranty claim for warranty WAR-123"
stateset --apply "approve warranty claim CLAIM-123 resolution replace"
stateset --apply "deny warranty claim CLAIM-123 reason 'Out of coverage'"
stateset "list warranties expiring in 30 days"
```

## MCP Tool Reference

| Tool | Action | Requires --apply |
|------|--------|-----------------|
| `list_warranties` | List all warranties | No |
| `create_warranty` | Create warranty for order | Yes |
| `create_warranty_claim` | Submit a claim | Yes |
| `approve_warranty_claim` | Approve with resolution | Yes |
| `deny_warranty_claim` | Deny with reason | Yes |

## Warranty Fields

| Field | Description |
|-------|-------------|
| `warranty_id` | Unique warranty identifier |
| `order_id` | Associated order |
| `product_id` | Covered product |
| `coverage_start` | Coverage start date |
| `coverage_end` | Coverage end date |
| `status` | active, expired, voided |

## Claim Fields

| Field | Description |
|-------|-------------|
| `claim_id` | Unique claim identifier |
| `warranty_id` | Parent warranty |
| `issue_description` | Customer's reported issue |
| `resolution` | repair, replace, refund |
| `status` | submitted, approved, denied, resolved |

## Resolution Types

| Type | Action |
|------|--------|
| `repair` | Repair and return the item |
| `replace` | Ship a replacement unit |
| `refund` | Issue monetary refund |

## Warranty Types

| Type | Duration | Coverage |
|------|----------|----------|
| Standard | 12 months | Manufacturing defects only |
| Extended | 24-36 months | Manufacturing defects + wear and tear |
| Limited | 6 months | Specific components only |
| Lifetime | Product lifetime | Full coverage, excludes misuse |
| ProRated | Varies | Refund decreases over time |

## Claim Denial Reasons

| Reason Code | Description |
|-------------|-------------|
| `out_of_coverage` | Warranty has expired |
| `misuse` | Damage caused by customer misuse |
| `unauthorized_repair` | Product modified or repaired by unauthorized party |
| `cosmetic_only` | Issue is cosmetic, not functional |
| `not_covered` | Reported issue not included in warranty terms |
| `missing_proof` | Customer unable to provide proof of purchase |
| `fraud_suspected` | Claim flagged for potential fraud |

## Warranty Notification Events

| Event | Trigger | Recipient |
|-------|---------|-----------|
| WarrantyCreated | Warranty activated for order | Customer |
| ExpiringReminder | 30 days before coverage ends | Customer |
| ClaimReceived | New claim submitted | Support Team |
| ClaimApproved | Claim approved with resolution | Customer |
| ClaimDenied | Claim denied with reason | Customer |
| ReplacementShipped | Replacement unit dispatched | Customer |
| ClaimResolved | All actions completed | Customer, Support Team |

## Practical Notes

- Warranties are automatically created when an order is fulfilled, based on the product's warranty configuration.
- The **ExpiringReminder** notification provides an opportunity to upsell extended warranty coverage.
- Approved claims with a `replace` resolution automatically generate a new fulfillment order at no cost.
- Denied claims can be escalated by the customer, which routes the case to a senior support agent for re-review.
- ProRated warranties calculate the refund amount based on the percentage of the coverage period remaining.
- All claim interactions are logged in an audit trail for dispute resolution and compliance.
