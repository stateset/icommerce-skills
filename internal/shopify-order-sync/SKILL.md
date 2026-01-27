---
name: shopify-order-sync
description: Sync Shopify orders into internal feeds or vector indexes. Use when updating the Shopify order sync workflow or troubleshooting order ingestion.
---

# Shopify Order Sync

Sync Shopify orders for search, analytics, or downstream workflows.

## How It Works

1. Create an order feed with org-specific settings.
2. Paginate Shopify orders and enrich as needed.
3. Store order data and embeddings (if required).
4. Return a summary of the sync.

## Usage

Use when you need to:
- Modify the Shopify sync workflow.
- Adjust pagination, limits, or embedding behavior.
- Add new org-level feed settings.

Typical touchpoints:
- `temporal/src/shopify/workflows.mjs`
- `temporal/src/shopify/activities.mjs`
- `pages/api/reason/sync-shopify-orders.js`

## Output

Example status object:

```json
{
  "status": "synced",
  "orders_processed": 250
}
```

## Present Results to User

- Feed or pagination changes.
- Any new data stored (embeddings, indexes).
- Suggested verification steps.

## Troubleshooting

- Missing orders: verify pagination tokens and limits.
- Auth errors: check Shopify access token.
- Embedding errors: confirm Pinecone keys and namespace.

## References

- `references/shopify-sync.md`
