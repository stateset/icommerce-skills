# Embedded SDK Bindings

## Packages by Language

| Language | Package | Install |
|----------|---------|---------|
| Rust | `stateset-embedded` | `cargo add stateset-embedded` |
| Node.js | `@stateset/embedded` | `npm install @stateset/embedded` |
| Python | `stateset-embedded` | `pip install stateset-embedded` |
| Ruby | `stateset_embedded` | `gem install stateset_embedded` |
| Java | JNI binding | Maven dependency |
| Kotlin | JVM binding | Gradle dependency |
| Swift | FFI binding | SPM package |
| C# | P/Invoke binding | NuGet package |
| Go | cgo binding | `go get` |
| WASM | `@stateset/embedded-wasm` | `npm install @stateset/embedded-wasm` |

## Example Files

- Rust: `/home/dom/stateset-icommerce/examples/basic_usage.rs`
- Node: `/home/dom/stateset-icommerce/examples/node/basic_usage.js`
- Python: `/home/dom/stateset-icommerce/examples/python/basic_usage.py`
- Ruby: `/home/dom/stateset-icommerce/examples/ruby/basic_usage.rb`
- Java: `/home/dom/stateset-icommerce/examples/java/BasicUsage.java`
- Kotlin: `/home/dom/stateset-icommerce/examples/kotlin/BasicUsage.kt`
- Swift: `/home/dom/stateset-icommerce/examples/swift/BasicUsage.swift`
- C#: `/home/dom/stateset-icommerce/examples/dotnet/BasicUsage.cs`
- Go: `/home/dom/stateset-icommerce/examples/go/basic_usage.go`
- WASM: see `/home/dom/stateset-icommerce/bindings/wasm`

## Standard Usage Pattern

1. Initialize `Commerce` with a SQLite file path.
2. Create customers, products, inventory, and orders.
3. Use module APIs (customers, orders, inventory, returns, etc).

## Node.js Quick Start

```javascript
const { Commerce } = require('@stateset/embedded');

const db = new Commerce('./commerce.db');
const customer = db.customers.create({ name: 'Jane', email: 'jane@example.com' });
const product = db.products.create({ name: 'Widget', sku: 'W-001', price: 49.99 });
const order = db.orders.create({ customer_id: customer.id, items: [{ sku: 'W-001', qty: 2 }] });
```

## Python Quick Start

```python
from stateset_embedded import Commerce

db = Commerce("./commerce.db")
customer = db.customers.create(name="Jane", email="jane@example.com")
product = db.products.create(name="Widget", sku="W-001", price=49.99)
order = db.orders.create(customer_id=customer.id, items=[{"sku": "W-001", "qty": 2}])
```

## Available Modules

| Module | Operations |
|--------|-----------|
| `customers` | create, get, list, update, search |
| `products` | create, get, list, update, variants |
| `orders` | create, get, list, update_status, ship, cancel |
| `inventory` | get_stock, adjust, reserve, release |
| `returns` | create, approve, reject, refund |
| `carts` | create, add_item, checkout |
| `invoices` | create, send, record_payment, void |
| `subscriptions` | create, pause, resume, cancel |
| `fulfillment` | create_wave, pick, pack, ship |
| `manufacturing` | create_bom, create_work_order, complete |

## Rust Quick Start

```rust
use stateset_embedded::Commerce;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let db = Commerce::new("./commerce.db")?;
    let customer = db.customers().create("Jane", "jane@example.com")?;
    let product = db.products().create("Widget", "W-001", 49.99)?;
    let order = db.orders().create(customer.id, vec![("W-001", 2)])?;
    println!("Order created: {}", order.id);
    Ok(())
}
```

## Error Handling

All SDK methods return typed errors:

| Error Type | Description | Recovery |
|-----------|-------------|----------|
| `DbError` | Database connection or query failure | Check file path and permissions |
| `NotFoundError` | Entity does not exist | Verify ID before operating |
| `ValidationError` | Invalid input data | Check required fields and types |
| `ConflictError` | Duplicate or state conflict | Resolve conflict, retry |
| `InventoryError` | Insufficient stock | Check availability first |

## Configuration Options

```javascript
const db = new Commerce('./commerce.db', {
  walMode: true,          // Enable WAL journal mode (default: true)
  busyTimeout: 5000,      // SQLite busy timeout in ms (default: 5000)
  syncEnabled: false,     // Enable event sync (default: false)
  sequencerUrl: null,     // Sync sequencer endpoint
});
```

## Event Hooks

Register callbacks for entity lifecycle events:

```python
def on_order_created(order):
    print(f"New order: {order.id}")

db.orders.on("created", on_order_created)
db.orders.on("status_changed", lambda o: print(f"Order {o.id} -> {o.status}"))
```
