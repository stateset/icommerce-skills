# Customer Commands

## CLI (Natural Language)

```bash
stateset "list customers"
stateset "find customer customer@example.com"
stateset "customer count"
stateset --apply "create customer customer@example.com Example Customer"
stateset --apply "update customer CUST-123 phone +1-555-0101"
stateset --apply "merge customers CUST-123 into CUST-456"
```

## Direct CLI

```bash
stateset-direct customers list
stateset-direct customers get <id-or-email>
stateset-direct customers create <email> <name>
```

## MCP Tool Reference

| Tool | Action | Requires --apply |
|------|--------|-----------------|
| `list_customers` | List all customer records | No |
| `get_customer` | Get customer by ID or email | No |
| `create_customer` | Create a new customer | Yes |
| `update_customer` | Update customer fields | Yes |
| `search_customers` | Search by name, email, or company | No |

## Customer Fields

| Field | Type | Description |
|-------|------|-------------|
| `customer_id` | string | Unique identifier |
| `email` | string | Primary email (unique) |
| `first_name` | string | First name |
| `last_name` | string | Last name |
| `phone` | string | Phone number |
| `company` | string | Company name |
| `accepts_marketing` | boolean | Marketing opt-in |
| `created_at` | datetime | Record creation time |
| `order_count` | number | Total orders placed |
| `total_spent` | number | Lifetime spending |
| `tags` | string[] | Customer tags |
| `notes` | string | Internal notes |

## Deduplication

When creating customers, check for existing records by `email` first.
Use `merge_customers` to combine duplicates — the target record keeps all orders and history.
