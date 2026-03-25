---
name: commerce-mcp-tools
description: Reference for StateSet MCP tool names, parameters, and example payloads. Use when composing or debugging `mcp__stateset-commerce__` tool calls or reviewing MCP schemas.
---

# Commerce MCP Tools

Reference map for StateSet MCP tools, grouped by domain with example payloads.

## How It Works

1. Find the tool by domain (orders, inventory, returns, etc).
2. Use the parameter list and example payload.
3. Cross-check with the source definitions if needed.
4. Validate the response shape against the expected schema.
5. Handle error codes and retry transient failures.

## Status Flows

- **Tool Call:** composed -> validated -> sent -> response_received -> parsed
- **Debugging:** error_logged -> params_checked -> source_verified -> call_retried

## Usage

- CLI: `stateset --help` to list available MCP tool commands.
- MCP tools: all `list_*`, `get_*`, `create_*`, `update_*` tools documented in references.

Use this skill when you need to:
- Construct MCP tool calls for commerce-orders, commerce-customers, or commerce-inventory.
- Verify parameter names and shapes.
- Debug tool failures.

## Permissions

- Read: `get_*`, `list_*`, `mcp list-tools`, `mcp validate` — no `--apply` needed.
- Write: `create_*`, `update_*`, `delete_*` — requires `--apply`.

## Examples

```bash
stateset mcp call create_order '{"customerId":"cust_123","items":[{"sku":"SKU-001","quantity":1,"unitPrice":29.99}]}'
stateset mcp call get_order '{"orderId":"ord_456"}'
stateset mcp list-tools --domain inventory
stateset mcp validate '{"tool":"adjust_inventory","params":{"sku":"WIDGET-001","quantity":10}}'
```

## Output

```json
{"tool":"create_order","params":{"customerId":"<uuid>","items":[{"sku":"SKU-001","name":"Widget","quantity":1,"unitPrice":29.99}]},"required":["customerId","items"],"method":"POST"}
```

## Present Results to User

- Tool name and parameter payload.
- Any required vs optional fields.
- Source file for the tool definition.
- Example response shape and common error codes.

## Troubleshooting

- Tool not found: verify the MCP server is running and `MCP_SERVER_URL` is set.
- Param mismatch: compare against the reference map and source file in `mcp-tools.js`.
- Auth rejected: check `STATESET_API_KEY` and token expiry in the MCP server config.
- Timeout on tool call: confirm network access and increase `mcp_timeout_ms` if needed.

## Error Codes

- `MCP_TOOL_NOT_FOUND`: The requested tool name does not exist on the MCP server.
- `MCP_PARAM_VALIDATION`: One or more required parameters are missing or have an invalid type.
- `MCP_AUTH_REJECTED`: API key is invalid or expired; re-check `STATESET_API_KEY` and token expiry.

## Related Skills

- **commerce-engine-setup** — Install and start the MCP server locally.
- **order-reason-workflows** — Workflows that invoke MCP tools for order actions.
- **customer-response-workflows** — Response workflows that call `get_order` and `get_customer`.
- **sandbox-migration** — Sandbox agents that use MCP tools via injected configs.

## References

- references/mcp-tools-map.md
- /home/dom/stateset-icommerce/cli/src/mcp-server.js
- /home/dom/stateset-icommerce/cli/src/autonomous/mcp-tools.js
