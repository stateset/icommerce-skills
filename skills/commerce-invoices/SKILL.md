---
name: commerce-invoices
description: Manage invoices and overdue billing. Use when running `stateset-invoices`, creating invoices, recording payments, or reconciling invoice status and aging.
---

# Commerce Invoices

Create invoices, send to customers, and record payments.

## How It Works

1. Create an invoice with line items, terms (`net_30`, `net_60`), and due date.
2. Send the invoice to the customer and track delivery status.
3. Record full or partial payments against the invoice.
4. Monitor overdue invoices and aging buckets (30/60/90+ days).
5. Report outstanding balances and payment history.

## Usage

- CLI: `stateset-invoices ...` or `stateset "create invoice for order ORD-123"`
- Writes require `--apply`.
- MCP tools: `list_invoices`, `create_invoice`, `send_invoice`, `record_invoice_payment`, `get_overdue_invoices`.

## Examples

```bash
stateset invoices create --order ORD-123 --terms net_30 --apply
stateset invoices send --invoice inv_123 --apply
stateset invoices payment record --invoice inv_123 --amount 2500.00 --apply
stateset invoices list --status overdue --aging 60
```

## Status Flows

**Invoice:** Draft -> Sent -> Partially Paid -> Paid (or Overdue/Voided)

## Output

```json
{"status":"sent","invoice_id":"inv_123","total":5000.00,"amount_paid":0,"amount_due":5000.00,"due_date":"2025-02-15"}
```

## Present Results to User

- Invoice status, terms, totals, and due date.
- Payment records, partial payment amounts, or overdue flags.
- Aging bucket if overdue (30/60/90+ days).
- Next actions (send reminder, escalate to collections).

## Troubleshooting

- Invoice already paid: show payment history with `record_invoice_payment`.
- Missing customer: create or link a customer record before invoicing.
- Overdue not flagged: verify due date and current date calculation.
- Partial payment rounding: confirm line item amounts sum to invoice total.

## Error Codes

- `INVOICE_ALREADY_PAID`: Invoice has been fully settled; no further payments accepted.
- `MISSING_CUSTOMER`: No customer record linked to the invoice.
- `AMOUNT_MISMATCH`: Payment amount does not align with the outstanding balance.

## Related Skills

- commerce-accounts-receivable — AR aging and collections workflows
- commerce-orders — orders that generate invoices
- commerce-tax — tax breakdown on invoice line items
- commerce-payments — payment processing for invoice settlement

## References
- references/invoices-flow.md
- /home/dom/stateset-icommerce/cli/.claude/agents/invoices.md
