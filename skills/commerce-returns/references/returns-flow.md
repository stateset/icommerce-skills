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

## Allowed Status Transitions

| Current Status | Allowed Next Status |
|---------------|-------------------|
| `requested` | `approved`, `rejected` |
| `approved` | `received` |
| `received` | `refunded`, `exchanged` |
| `rejected` | (terminal) |
| `refunded` | (terminal) |
| `exchanged` | (terminal) |

## Return Policy Rules

| Rule | Default Value | Description |
|------|--------------|-------------|
| `return_window_days` | 30 | Days after delivery to initiate return |
| `require_receipt` | true | Original order reference required |
| `restocking_fee_pct` | 0 | Percentage deducted from refund for `changed_mind` |
| `free_return_shipping` | true | Prepaid return label provided |
| `exchange_price_match` | true | Price-match replacement item |

## Error Handling

| Error Code | Meaning | Resolution |
|------------|---------|------------|
| `RETURN_WINDOW_EXPIRED` | Return requested after policy window | Escalate for manager override |
| `ORDER_NOT_FOUND` | Original order ID invalid | Verify order ID with customer |
| `ITEM_NOT_RETURNABLE` | Item flagged as final sale | Inform customer; no return allowed |
| `DUPLICATE_RETURN` | RMA already exists for this item | Use the existing return ID |
| `REFUND_EXCEEDS_TOTAL` | Refund amount exceeds order line total | Adjust refund amount |

## Return Shipping Commands

```bash
stateset --apply "generate return label RET-123 carrier usps"
stateset "get return label RET-123"
stateset --apply "mark return RET-123 shipped tracking TRACK456"
```

## Events Emitted

| Event | Trigger |
|-------|---------|
| `return.requested` | New return created |
| `return.approved` | Return approved |
| `return.rejected` | Return rejected |
| `return.received` | Items received at warehouse |
| `return.refunded` | Refund issued |
| `return.exchanged` | Exchange order created |

## Integration Notes

- Returns with `damaged_in_shipping` reason auto-file a carrier claim.
- Exchange returns create a new order linked via `exchange_order_id`.
- Refunds are processed through the original payment method by default.
- Webhook payloads include original order details and return line items.
- The `condition` field is set during warehouse inspection at the `received` step.
