# Shopify Order Sync Pattern

1. createShopifyOrderFeed(org_id) returns credentials and paging settings.
2. getShopifyOrders(...) fetches pages and optionally builds embeddings.
3. Return a summary (orders processed, next page token).

Notes:
- Keep pagination safe and respect rate limits.
- Capture failures without losing the whole sync.

Source:
- Workflow: `/home/dom/next-temporal/temporal/src/shopify/workflows.mjs` (syncShopifyOrdersWorkflow)
- Activities: `/home/dom/next-temporal/temporal/src/shopify/activities.mjs`
