---
name: commerce-general-ledger
description: Manage the general ledger, chart of accounts, journal entries, and financial statements. Use when posting transactions, closing periods, or generating trial balance and financial reports.
---

# Commerce General Ledger

Double-entry accounting with chart of accounts, journal entries, period management, and financial statement generation.

## How It Works

1. Set up the chart of accounts with account hierarchy.
2. Open accounting periods (monthly, quarterly, yearly).
3. Post journal entries with balanced debits and credits.
4. Configure auto-posting rules for commerce transactions.
5. Generate trial balance, balance sheet, and income statement.
6. Close periods to lock posted entries.

## Usage

- CLI: `stateset gl ...` or `stateset "trial balance for Q1 2025"`
- Writes require `--apply`.
- MCP tools: `list_gl_accounts`, `create_gl_account`, `update_gl_account`, `list_gl_periods`, `create_gl_period`, `close_gl_period`, `create_journal_entry`, `post_journal_entry`, `void_journal_entry`, `get_trial_balance`, `get_balance_sheet`, `get_income_statement`, `configure_auto_posting`.

## Examples

```bash
stateset --db ./store.db "list gl accounts type=Expense"
stateset --db ./store.db "create journal entry period=2026-03 debit=5100:1500 credit=1000:1500" --apply
stateset --db ./store.db "get trial balance period=2026-03"
stateset --db ./store.db "close gl period period=2026-02" --apply
```

## Account Types

- Asset (normal debit), Liability (normal credit), Equity (normal credit), Revenue (normal credit), Expense (normal debit)
- 25+ subtypes: Cash, AccountsReceivable, Inventory, FixedAssets, AccountsPayable, SalesRevenue, COGS, etc.

## Status Flows

**Period:** Future -> Open -> Closed -> Locked
**Journal Entry:** Draft -> Pending -> Posted (or Voided/Reversed)

## Journal Entry Sources

- Manual, AutoInvoice, AutoPayment, AutoBill, AutoBillPayment, AutoInventory, AutoWriteOff, SystemClosing, Import

## Output

```json
{"status":"posted","journal_entry_id":"JE-2025-0100","period":"2025-01","total_debits":1500.00,"total_credits":1500.00}
```

## Present Results to User

- Journal entry number and posting status.
- Debit/credit totals (must balance).
- Affected accounts and running balances.
- Period status and closing readiness.

## Troubleshooting

- Entry won't post: verify debits equal credits.
- Period locked: cannot post to a locked period; use adjusting entries in the next open period.
- Account inactive: reactivate account or use a different posting account.
- Trial balance out of balance: check for unposted draft entries or partial reversals.

## Error Codes

- `GL_UNBALANCED_ENTRY`: Journal entry debits and credits do not balance.
- `GL_PERIOD_LOCKED`: Cannot post to a locked accounting period; use the next open period.
- `GL_ACCOUNT_INACTIVE`: Target GL account is inactive; reactivate or choose a different account.

## Related Skills

- **commerce-accounts-receivable**: AR transactions auto-post to revenue and receivable accounts.
- **commerce-accounts-payable**: AP transactions auto-post to expense and payable accounts.
- **commerce-credit**: Write-offs post to bad debt expense accounts in GL.

## References
- references/gl-accounts.md
- /home/dom/stateset-icommerce/crates/stateset-core/src/models/general_ledger.rs
- /home/dom/stateset-icommerce/crates/stateset-embedded/src/general_ledger.rs
