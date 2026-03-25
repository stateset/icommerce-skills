---
name: commerce-payments
description: Manage payments, captures, refunds, and payment methods. Use when running `stateset-payments`, `stateset-pay`, processing payment intents, or issuing refunds.
---

# Commerce Payments

Create, complete, and refund payments for orders.

## How It Works

1. Create a payment record tied to an `order_id` with `amount` and method.
2. Process the payment through the gateway (card, stablecoin, bank transfer).
3. Complete or fail the payment based on gateway response.
4. Issue full or partial refunds when needed.
5. Record transaction references and update order `paymentStatus`.

## Usage

- CLI: `stateset-payments ...` and `stateset-pay ...` for stablecoin operations.
- Writes require `--apply`.
- MCP tools: `list_payments`, `get_payment`, `create_payment`, `complete_payment`, `fail_payment`, `create_refund`.

## Permissions

- **Read:** `list_payments`, `get_payment` — no `--apply` needed.
- **Write:** `create_payment`, `complete_payment`, `fail_payment`, `create_refund` — requires `--apply`.

## Examples

```bash
stateset payments list --order-id ord_456
stateset payments create --order-id ord_456 --amount 129.99 --method card --apply
stateset payments complete pay_123 --apply
stateset payments refund pay_123 --amount 29.99 --reason partial_return --apply
```

## Status Flows

**Payment:** Pending -> Completed (or Failed/Voided)

**Refund:** Requested -> Processed (or Rejected)

## Output

```json
{"status":"completed","payment_id":"pay_123","order_id":"ord_456","amount":129.99,"method":"card","transaction_ref":"txn_abc789"}
```

## Present Results to User

- Payment or refund IDs, amounts, and method used.
- Transaction reference from the gateway.
- Order `paymentStatus` update (paid, refunded, partially_refunded).
- Any gateway error codes or decline reasons.

## Troubleshooting

- Payment already captured: check `payment_id` status before calling `complete_payment`.
- Refund exceeds paid amount: validate remaining balance with `get_payment`.
- Gateway timeout: retry with idempotency key to prevent duplicate charges.
- Stablecoin transfer pending: check on-chain confirmation via `stateset-pay status`.

## Error Codes

- `PAYMENT_DECLINED`: Gateway rejected the payment method.
- `REFUND_EXCEEDS_BALANCE`: Refund amount exceeds the remaining paid balance.
- `DUPLICATE_CHARGE`: Idempotency key conflict; payment already processed.

## Related Skills

- commerce-orders — order status transitions triggered by payment events
- commerce-returns — refunds issued for approved returns
- commerce-currency — multi-currency payment conversion
- commerce-subscriptions — recurring subscription charges

## References
- references/payments-flow.md
- /home/dom/stateset-icommerce/cli/.claude/agents/payments.md
- /home/dom/stateset-icommerce/cli/bin/stateset-pay.js
