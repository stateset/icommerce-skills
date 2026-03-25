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
