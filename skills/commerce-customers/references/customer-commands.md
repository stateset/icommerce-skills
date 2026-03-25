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

## Address Fields

| Field | Type | Description |
|-------|------|-------------|
| `address_id` | string | Unique address identifier |
| `type` | enum | shipping, billing |
| `line1` | string | Street address |
| `line2` | string | Apartment, suite, etc. |
| `city` | string | City |
| `state` | string | State or province |
| `postal_code` | string | ZIP or postal code |
| `country` | string | ISO 3166-1 alpha-2 country code |
| `is_default` | boolean | Default address for type |

## Address Commands

```bash
stateset --apply "add address to customer CUST-123 type shipping line1 '123 Main St' city 'Portland' state 'OR' postal_code '97201' country 'US'"
stateset --apply "set default shipping address ADDR-456 for customer CUST-123"
stateset "list addresses for customer CUST-123"
```

## Customer Segmentation

| Segment | Criteria | Use Case |
|---------|----------|----------|
| `vip` | total_spent > $1000 or order_count > 10 | Priority support, exclusive offers |
| `at_risk` | No order in 90+ days, previously active | Win-back campaigns |
| `new` | Created within last 30 days | Welcome sequences |
| `wholesale` | Tagged `wholesale` | Bulk pricing, net terms |

## Error Handling

| Error Code | Meaning | Resolution |
|------------|---------|------------|
| `DUPLICATE_EMAIL` | Email already registered | Search existing customers or merge |
| `CUSTOMER_NOT_FOUND` | Customer ID does not exist | Verify the customer ID |
| `MERGE_CONFLICT` | Both records have conflicting data | Manually resolve before merge |
| `INVALID_EMAIL` | Email format invalid | Correct the email address |

## Events Emitted

| Event | Trigger |
|-------|---------|
| `customer.created` | New customer record |
| `customer.updated` | Customer fields modified |
| `customer.merged` | Two records combined |
| `customer.marketing_opted_in` | Opted in to marketing |
| `customer.marketing_opted_out` | Opted out of marketing |

## Integration Notes

- Customer `email` is the unique key; always search by email before creating.
- The `tags` field supports bulk operations: `stateset --apply "tag customers where order_count > 10 as 'vip'"`.
- GDPR data export: `stateset "export customer data CUST-123 format json"`.
- GDPR data deletion: `stateset --apply "anonymize customer CUST-123"` removes PII but preserves order records.
