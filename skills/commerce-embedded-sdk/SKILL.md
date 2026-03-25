---
name: commerce-embedded-sdk
description: Integrate the StateSet iCommerce embedded SDK in apps. Use when creating a Commerce client, configuring `@stateset/embedded`, or wiring embedded SDK calls.
---

# Commerce Embedded SDK

Use the embedded engine from application code via language bindings.

## How It Works

1. Install the binding for the target language.
2. Initialize `Commerce` with a SQLite database path.
3. Call module APIs (customers, products, inventory, orders, etc).
4. Run the matching example to validate behavior.
5. Enable sync to push local events to the sequencer for multi-node consistency.

## Status Flows

- **SDK Init:** not_installed -> installed -> initialized -> ready
- **Sync Session:** idle -> pushing -> pulling -> synced | conflict

## Usage

- CLI: `stateset --db ./store.db "list products"` (uses embedded SDK internally)
- Node.js: `npm install @stateset/embedded`
- Python: `pip install stateset-embedded`
- Rust: `cargo add stateset-embedded`
- MCP tools: all commerce tools use the embedded SDK as the data layer.
- See language examples under `/home/dom/stateset-icommerce/examples/`

## Examples

```bash
npm install @stateset/embedded && node -e "const {Commerce}=require('@stateset/embedded'); const c=new Commerce('/tmp/commerce.db'); console.log(c.version())"
pip install stateset-embedded && python -c "from stateset_embedded import Commerce; c=Commerce('/tmp/commerce.db'); print(c.version())"
cargo run --example basic_usage -- --db /tmp/commerce.db
stateset embedded sync --db /tmp/commerce.db --sequencer https://seq.stateset.io
```

## Output

```json
{"status":"ok","order_number":"ORD-12345","customer_id":"cust_123","db_path":"/tmp/commerce.db","sdk_version":"0.9.4"}
```

## Present Results to User

- Binding used and database path.
- Which example or module calls were validated.
- Any build or runtime constraints.
- SDK version and sync readiness state.

## Troubleshooting

- Binding build errors: confirm Rust toolchain and target platform.
- Shared library issues: check `LD_LIBRARY_PATH` or platform linking.
- Missing symbols: rebuild the native bindings for your runtime.
- `db_path` not writable: verify directory permissions and disk space with `df -h`.

## Error Codes

- `SDK_BINDING_BUILD_FAILED`: Native binding compilation failed; check Rust toolchain and target platform.
- `SDK_DB_NOT_WRITABLE`: The database path is not writable; verify directory permissions.
- `SDK_SYMBOL_MISSING`: Required native symbol not found; rebuild bindings for the current runtime.

## Related Skills

- **commerce-sync** -- push embedded events to the sequencer after local writes.
- **commerce-orders** -- validate order workflows created through the SDK.
- **commerce-customers** -- manage customer records the SDK interacts with.
- **commerce-autonomous-engine** -- run scheduled jobs against the embedded database.

## References
- references/bindings.md
- /home/dom/stateset-icommerce/examples/README.md
- /home/dom/stateset-icommerce/examples/basic_usage.rs
- /home/dom/stateset-icommerce/examples/node/basic_usage.js
- /home/dom/stateset-icommerce/examples/python/basic_usage.py
