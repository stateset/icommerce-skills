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
