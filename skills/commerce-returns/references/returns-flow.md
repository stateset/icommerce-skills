# Returns Flow

## Status Flow

```
Requested -> Approved -> Received -> Refunded/Exchanged
    \-> Rejected
```

## Common Commands

```bash
stateset --apply "create return for order ORD-123 reason 'defective'"
stateset --apply "approve return RET-123"
stateset --apply "reject return RET-123 reason 'Outside window'"
stateset --apply "receive return RET-123"
stateset --apply "refund return RET-123 amount 79.99"
```

## MCP Tool Reference

| Tool | Action | Requires --apply |
|------|--------|-----------------|
| `list_returns` | List all return requests | No |
| `get_return` | Get return details by ID | No |
| `create_return` | Create a return request | Yes |
| `approve_return` | Approve a return request | Yes |
| `reject_return` | Reject a return with reason | Yes |
| `receive_return` | Mark items as received | Yes |

## Return Fields

| Field | Description |
|-------|-------------|
| `return_id` | Unique return/RMA identifier |
| `order_id` | Original order reference |
| `reason` | Return reason code (defective, wrong_item, not_as_described, changed_mind) |
| `items[]` | Items being returned with SKU and quantity |
| `refund_amount` | Amount to refund |
| `condition` | Item condition on receipt (new, used, damaged) |

## Reason Codes

| Code | Description | Eligible for Exchange |
|------|-------------|----------------------|
| `defective` | Product defect or malfunction | Yes |
| `wrong_item` | Incorrect item shipped | Yes |
| `not_as_described` | Item doesn't match listing | Yes |
| `changed_mind` | Customer changed mind | Policy-dependent |
| `damaged_in_shipping` | Damage during transit | Yes |
