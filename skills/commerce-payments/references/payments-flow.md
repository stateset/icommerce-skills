# Payments Flow

## Status Flow

```
Pending -> Processing -> Completed -> Refunded/Partially Refunded
              \-> Failed
              \-> Voided
```

## Common Commands

```bash
stateset --apply "create payment for order ORD-123 amount 129.99 via credit_card"
stateset --apply "complete payment PAY-123"
stateset --apply "refund payment PAY-123 amount 29.99 reason 'return'"
stateset --apply "void payment PAY-456"
stateset-pay send --to <address> --amount 10 --asset usdc
stateset-pay status --tx <tx_hash>
```

## MCP Tool Reference

| Tool | Action | Requires --apply |
|------|--------|-----------------|
| `list_payments` | List all payments | No |
| `get_payment` | Get payment details | No |
| `create_payment` | Create payment for order | Yes |
| `complete_payment` | Mark payment as completed | Yes |
| `fail_payment` | Mark payment as failed | Yes |
| `create_refund` | Issue full or partial refund | Yes |

## Payment Fields

| Field | Description |
|-------|-------------|
| `payment_id` | Unique payment identifier |
| `order_id` | Associated order |
| `amount` | Payment amount |
| `method` | card, bank_transfer, stablecoin, wallet |
| `status` | pending, completed, failed, refunded |
| `transaction_ref` | Gateway transaction reference |
| `refunded_amount` | Total amount refunded |

## Notes

- Stablecoin operations use `stateset-pay` and on-chain settlement.
- Always verify order totals before capturing payment.
- Use idempotency keys to prevent duplicate charges on retry.
- Refund amounts cannot exceed the original `amount` minus prior refunds.
- Gateway timeout retries use the same idempotency key to prevent double charges.

## Allowed Status Transitions

| Current Status | Allowed Next Status |
|---------------|-------------------|
| `pending` | `processing`, `voided` |
| `processing` | `completed`, `failed`, `voided` |
| `completed` | `refunded`, `partially_refunded` |
| `failed` | `pending` (retry) |
| `voided` | (terminal) |
| `refunded` | (terminal) |
| `partially_refunded` | `refunded` |

## Payment Method Details

| Method | Provider Field | Settlement Time |
|--------|---------------|-----------------|
| `card` | `card_last4`, `card_brand` | 1-2 business days |
| `bank_transfer` | `routing_number`, `account_last4` | 3-5 business days |
| `stablecoin` | `wallet_address`, `chain` | Minutes (on-chain) |
| `wallet` | `wallet_provider` | Instant |

## Error Handling

| Error Code | Meaning | Resolution |
|------------|---------|------------|
| `INSUFFICIENT_FUNDS` | Card or account lacks funds | Ask customer for alternate method |
| `CARD_DECLINED` | Issuer declined transaction | Customer should contact their bank |
| `GATEWAY_TIMEOUT` | Payment processor unresponsive | Retry with same idempotency key |
| `DUPLICATE_PAYMENT` | Payment already exists for order | Return existing payment record |
| `REFUND_EXCEEDS_CAPTURED` | Refund amount exceeds captured total | Adjust refund amount |
| `INVALID_METHOD` | Unsupported payment method | Check supported methods list |

## Events Emitted

| Event | Trigger |
|-------|---------|
| `payment.created` | New payment record created |
| `payment.completed` | Payment successfully captured |
| `payment.failed` | Payment processing failed |
| `payment.refunded` | Full refund issued |
| `payment.partially_refunded` | Partial refund issued |
| `payment.voided` | Payment authorization voided |

## Reconciliation Commands

```bash
stateset "list payments status completed date_range 2026-03-01 2026-03-31"
stateset "payment summary by method"
stateset "list payments with mismatched totals"
stateset "export payments format csv date_range 2026-Q1"
```

## Integration Notes

- PCI-sensitive fields (full card number, CVV) are never stored or returned by the API.
- Webhook signatures use HMAC-SHA256; verify before processing.
- Stablecoin payments emit an additional `payment.on_chain_confirmed` event after block finality.
- Multi-currency payments store both `amount` (customer currency) and `settled_amount` (base currency).
