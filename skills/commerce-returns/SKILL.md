---
name: commerce-returns
description: Handle returns, refunds, and exchanges. Use when running `stateset-returns`, `stateset-direct returns`, creating return flows, or processing RMA requests.
---

# Commerce Returns

Process returns from request through approval and refund or exchange.

## How It Works

1. Locate the order by `order_id` and validate return eligibility.
2. Create a return request with reason code and items to return.
3. Approve or reject the return based on policy window and condition.
4. Receive returned items and inspect condition.
5. Trigger refund or exchange and update inventory accordingly.

## Usage

- CLI: `stateset-returns ...` or `stateset-direct returns <action>`
- Writes require `--apply`.
- MCP tools: `list_returns`, `get_return`, `create_return`, `approve_return`, `reject_return`, `receive_return`.

## Permissions

- **Read:** `list_returns`, `get_return` — no `--apply` needed.
- **Write:** `create_return`, `approve_return`, `reject_return`, `receive_return` — requires `--apply`.

## Examples

```bash
stateset returns list --status requested --limit 10
stateset returns create --order-id ord_456 --reason defective --items sku_001 --apply
stateset returns approve rma_123 --apply
stateset returns receive rma_123 --condition good --restock --apply
```

## Status Flows

**Return:** Requested -> Approved -> Received -> Refunded/Exchanged (or Rejected)

## Output

```json
{"status":"approved","return_id":"rma_123","order_id":"ord_456","refund_amount":79.99,"reason":"defective"}
```

## Present Results to User

- Return status, reason code, and refund or exchange details.
- Items returned and their condition assessment.
- Inventory adjustments made (restocked or written off).
- Customer-facing next steps (shipping label, refund timeline).

## Troubleshooting

- Return not eligible: verify policy window, order status, and item condition.
- Refund mismatch: confirm line item totals, shipping fees, and restocking fees.
- Duplicate return: check for existing open return on the same `order_id`.
- Exchange unavailable: verify replacement SKU is in stock via commerce-inventory.

## Error Codes

- `RETURN_NOT_ELIGIBLE`: Order is outside the return policy window or ineligible.
- `DUPLICATE_RETURN`: An open return already exists for this order.
- `EXCHANGE_UNAVAILABLE`: Replacement SKU is out of stock.

## Related Skills

- commerce-orders — order data referenced by return requests
- commerce-payments — refund processing for approved returns
- commerce-inventory — restocking returned items
- commerce-warranties — warranty claims that may trigger returns

## References
- references/returns-flow.md
- /home/dom/stateset-icommerce/cli/.claude/skills/commerce-returns/SKILL.md
- /home/dom/stateset-icommerce/examples/workflows.md
