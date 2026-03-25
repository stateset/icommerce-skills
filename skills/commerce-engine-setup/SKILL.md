---
name: commerce-engine-setup
description: Set up and run the StateSet iCommerce engine locally (CLI install, DB init, demo data, sync). Use when bootstrapping an environment, running `stateset-doctor`, or starting `stateset-autonomous`.
---

# Commerce Engine Setup

Set up local iCommerce runtime, CLI tooling, and optional sync.

## How It Works

1. Install or link the CLI and choose a SQLite database path.
2. Initialize sync and keys if you need sequencer replication.
3. Seed demo data and verify the environment.
4. Start CLI commands or the autonomous engine.
5. Run `stateset-doctor` to validate connectivity, schema, and credentials.

## Status Flows

- **Environment:** uninitialized -> cli_linked -> db_created -> seeded -> verified
- **Autonomous Engine:** stopped -> starting -> running -> healthy

## Usage

- CLI: `stateset --db ./store.db "list customers"` or `stateset-doctor`
- Install: `cd /home/dom/stateset-icommerce/cli && npm install && npm link`
- Add `--apply` for writes and `stateset-doctor` for checks.
- MCP tools: `list_customers`, `list_products`, `list_orders` (all commerce tools available after setup).
- Seed demo data: `bash /mnt/skills/user/commerce-engine-setup/scripts/seed-demo.sh`
- Verify setup: `bash /mnt/skills/user/commerce-engine-setup/scripts/verify-setup.sh`
- Start autonomous mode: `stateset-autonomous start --db ./.stateset/commerce.db`

## Permissions

- Read: `stateset-doctor`, `list_customers`, `list_products`, `list_orders` — no `--apply` needed.
- Write: `seed-demo.sh`, `stateset-autonomous start`, DB init — requires `--apply`.

## Examples

```bash
cd /home/dom/stateset-icommerce/cli && npm install && npm link
bash /mnt/skills/user/commerce-engine-setup/scripts/seed-demo.sh
stateset-doctor --db ./store.db
stateset-autonomous start --db ./.stateset/commerce.db
```

## Output

```json
{"status":"ok","db":"./store.db","sync":"disabled","autonomous":"stopped","cli_version":"1.4.0","tables":12,"customer_id":"cust_001","email":"admin@example.com"}
```

## Present Results to User

- Steps completed and any scripts run.
- Database path and whether sync is initialized.
- Autonomous engine status if started.
- Output of `stateset-doctor` checks (connectivity, schema version, API key validity).

## Troubleshooting

- CLI not found: re-run `npm link` or install `@stateset/cli` globally.
- Database locked: close other processes using the DB file; check `lsof` on the `.db` path.
- Sequencer unreachable: verify Docker services and `SEQUENCER_URL` in `.env`.
- Seed script fails: ensure `--db` path exists and the `customers` table with id and email columns is initialized.

## Error Codes

- `SETUP_CLI_NOT_FOUND`: The `stateset` CLI is not linked; re-run `npm link` or install globally.
- `SETUP_DB_LOCKED`: Database file is locked by another process; close competing connections.
- `SETUP_SEQUENCER_UNREACHABLE`: Cannot connect to the sequencer; verify Docker services and `SEQUENCER_URL`.

## Related Skills

- **commerce-mcp-tools** — Reference MCP tool names and payloads used by the CLI.
- **sandbox-migration** — Run the engine inside a sandboxed agent environment.
- **commerce-inventory-sync** — Sync inventory data after engine setup.
- **order-reason-workflows** — Automate order actions that rely on the commerce engine.

## References
- references/setup-runbook.md
- /home/dom/stateset-icommerce/examples/README.md
- /home/dom/stateset-icommerce/examples/getting-started-sync.md
- /home/dom/stateset-icommerce/cli/README.md
- /home/dom/stateset-icommerce/cli/bin/stateset-autonomous.js
