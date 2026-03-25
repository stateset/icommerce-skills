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
