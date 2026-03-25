# General Ledger Reference

## Account Type Hierarchy

| Type | Normal Balance | Subtypes |
|------|---------------|----------|
| Asset | Debit | Cash, AccountsReceivable, Inventory, PrepaidExpenses, FixedAssets, AccumulatedDepreciation, OtherAssets |
| Liability | Credit | AccountsPayable, AccruedLiabilities, UnearnedRevenue, NotesPayable, OtherLiabilities |
| Equity | Credit | OwnersEquity, RetainedEarnings, CommonStock, OtherEquity |
| Revenue | Credit | SalesRevenue, ServiceRevenue, InterestIncome, OtherIncome |
| Expense | Debit | CostOfGoodsSold, Salaries, Rent, Utilities, Depreciation, OtherExpenses |

## Account Structure

- `account_number`: Unique identifier (e.g., "1000", "4100")
- `account_type` / `account_subtype`: Classification
- `is_header`: True for summary accounts (cannot post to)
- `parent_id`: Hierarchy for sub-accounts
- `currency`: Account currency (default: store currency)
- `status`: Active, Inactive, Archived

## Journal Entry Rules

1. Every entry must have at least 2 lines
2. Total debits MUST equal total credits
3. Can only post to "posting" accounts (is_header = false)
4. Can only post to Open periods
5. Posted entries are immutable; void or reverse instead

## Auto-Posting Configuration

Automate GL entries from commerce events:

| Source | Debit Account | Credit Account |
|--------|--------------|----------------|
| AutoInvoice | Accounts Receivable | Sales Revenue |
| AutoPayment | Cash | Accounts Receivable |
| AutoBill | Expense/Inventory | Accounts Payable |
| AutoBillPayment | Accounts Payable | Cash |
| AutoInventory | COGS | Inventory |
| AutoWriteOff | Bad Debt Expense | Accounts Receivable |

## Financial Statements

### Trial Balance
- Lists all accounts with debit/credit balances
- Total debits must equal total credits
- Used to verify GL accuracy before closing

### Balance Sheet
- Assets = Liabilities + Equity
- Point-in-time snapshot

### Income Statement
- Revenue - Expenses = Net Income
- Period-based (month, quarter, year)

## Period Management

```
Future → Open → Closed → Locked
```

- **Future**: Period not yet started
- **Open**: Accepts journal entries
- **Closed**: Soft close; can reopen if needed
- **Locked**: Permanent; no changes allowed

## Common Account Ranges

| Range | Account Type | Examples |
|-------|-------------|----------|
| 1000-1999 | Assets | 1000 Cash, 1100 Accounts Receivable, 1200 Inventory |
| 2000-2999 | Liabilities | 2000 Accounts Payable, 2100 Accrued Liabilities |
| 3000-3999 | Equity | 3000 Owners Equity, 3100 Retained Earnings |
| 4000-4999 | Revenue | 4000 Sales Revenue, 4100 Service Revenue |
| 5000-5999 | Cost of Goods | 5000 COGS, 5100 Freight In |
| 6000-6999 | Operating Expenses | 6000 Salaries, 6100 Rent, 6200 Utilities |
| 7000-7999 | Other Income/Expense | 7000 Interest Income, 7100 Interest Expense |

## Common Operations

```bash
stateset --apply "create gl account 1250 name Prepaid Insurance type asset subtype PrepaidExpenses"
stateset --apply "create journal entry debit 5000 credit 1200 amount 1500.00 memo 'COGS for ORD-2025-0300'"
stateset --apply "close period 2025-02"
stateset --apply "void journal entry JE-2025-0042 reason 'duplicate entry'"
stateset "trial balance as of 2025-03-31"
stateset "income statement for 2025-Q1"
stateset "balance sheet as of 2025-03-31"
```

## Journal Entry Fields

| Field | Description |
|-------|-------------|
| `entry_id` | Unique identifier (JE-YYYY-NNNN) |
| `entry_date` | Date the entry is recorded |
| `period` | Fiscal period (e.g., 2025-03) |
| `memo` | Description of the transaction |
| `source` | Manual, AutoInvoice, AutoPayment, etc. |
| `status` | Draft, Posted, Voided, Reversed |
| `lines[]` | Array of debit/credit line items |

## Practical Notes

- Header accounts (`is_header = true`) serve as roll-up summaries and cannot receive direct postings.
- Reversing entries create an equal-and-opposite journal entry linked to the original; the original remains intact.
- Period close generates a closing entry that transfers net income from Revenue/Expense accounts to Retained Earnings.
- Auto-posting rules fire in real time as commerce events occur; they can be paused per-rule if adjustments are needed.
