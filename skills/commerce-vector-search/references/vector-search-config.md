# Vector Search Configuration Reference

## Embedding Model

- **Model**: OpenAI `text-embedding-3-small`
- **Dimensions**: 1536
- **Distance metric**: Cosine distance
- **Score formula**: `score = 1.0 - (distance / 2.0)` (range: 0.0 to 1.0)

## Entity Embedding Tables

| Entity | Table | ID Column | Source Table |
|--------|-------|-----------|-------------|
| Product | `product_embeddings` | `product_id` | `products` |
| Customer | `customer_embeddings` | `customer_id` | `customers` |
| Order | `order_embeddings` | `order_id` | `orders` |
| InventoryItem | `inventory_embeddings` | `item_id` | `inventory_items` |

## Embedding Metadata

Each embedding stores:
- `entity_type`: Product, Customer, Order, InventoryItem
- `entity_id`: UUID of the source entity
- `embedding_model`: Model used to generate
- `text_hash`: Hash of the source text (detect changes)
- `created_at`: Timestamp

## Search Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | String | Natural language search text |
| `entity_type` | Optional | Filter to specific entity type |
| `limit` | Integer | Max results to return (default: 10) |
| `min_score` | Float | Minimum relevance threshold (0.0-1.0) |

## Hybrid Search

Combines two search methods:

### Semantic Search (Vector)
- Converts query to embedding via OpenAI API
- Finds nearest neighbors by cosine distance
- Good for conceptual/meaning-based queries
- Example: "comfortable headphones for travel" matches "noise-cancelling over-ear headphones"

### Keyword Search (BM25)
- SQLite FTS5 full-text search
- Term frequency and inverse document frequency
- Good for exact terms, SKUs, names
- Example: "WIDGET-001" matches product with that SKU

### Score Combination
Results from both methods are merged and re-ranked by combined score.

## Embedding Generation

Embeddings should be generated or refreshed when:
- New entities are created
- Entity text fields are updated (name, description, etc.)
- Periodic full re-index for consistency

## Configuration

```rust
EmbeddingConfig {
    api_key: "sk-...",                    // OpenAI API key
    model: "text-embedding-3-small",      // Embedding model
    dimensions: 1536,                     // Vector dimensions
}
```

## Performance Notes

- Embedding generation requires OpenAI API call (network latency)
- Vector search is in-memory for SQLite (fast for <100K entities)
- BM25 search uses SQLite FTS5 indexes (fast)
- Consider batch embedding generation for large catalogs

## Common Operations

```bash
stateset "search products matching 'durable outdoor camping gear'"
stateset "find customers similar to CUST-1001"
stateset "search orders related to 'delayed shipment widget'"
stateset "search inventory for 'red medium t-shirt'"
stateset --apply "reindex embeddings for products"
stateset --apply "reindex embeddings for entity product_id PROD-0500"
```

## Text Templates for Embedding

Each entity type constructs its embedding text from specific fields:

| Entity | Fields Used |
|--------|------------|
| Product | `name`, `description`, `category`, `tags`, `sku`, `brand` |
| Customer | `name`, `email`, `company`, `notes`, `tags`, `order_history_summary` |
| Order | `order_number`, `customer_name`, `item_names`, `status`, `notes` |
| InventoryItem | `sku`, `product_name`, `location`, `condition`, `lot_number` |

## Relevance Score Guidelines

| Score Range | Interpretation | Typical Action |
|-------------|---------------|----------------|
| 0.90 - 1.00 | Exact or near-exact match | Show as top result |
| 0.75 - 0.89 | Strong semantic match | Include in results |
| 0.60 - 0.74 | Moderate relevance | Include if result set is small |
| 0.40 - 0.59 | Weak relevance | Exclude from default results |
| 0.00 - 0.39 | Not relevant | Always exclude |

## Practical Notes

- The default `min_score` of 0.6 works well for most product searches; lower to 0.4 for exploratory queries.
- Hybrid search outperforms pure vector search when queries contain specific identifiers like SKUs or order numbers.
- Embedding re-indexing is idempotent; the `text_hash` field prevents unnecessary API calls when content has not changed.
- For catalogs exceeding 100K entities, consider partitioning embeddings by entity type for faster search.
- OpenAI rate limits apply during batch re-indexing; use exponential backoff and batch requests of up to 2048 texts.
