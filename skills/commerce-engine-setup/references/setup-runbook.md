# Setup Runbook

## Prerequisites

- Node.js 18+ for the CLI
- Optional: Docker + Docker Compose for sequencer
- Repo paths:
  - CLI: /home/dom/stateset-icommerce/cli
  - Examples: /home/dom/stateset-icommerce/examples

## Local Setup (No Sync)

```bash
# 1. Install the CLI
cd /home/dom/stateset-icommerce/cli
npm install && npm link

# 2. Choose a database path
export STATESET_DB=./store.db

# 3. Run health check
stateset-doctor --db ./store.db

# 4. Seed demo data
examples/seed-demo-data.sh --db ./store.db

# 5. Verify setup
examples/verify-setup.sh --db ./store.db
```

## Optional Sync Setup (Sequencer)

1. Start the sequencer:
   - `docker-compose -f examples/docker-compose.full.yml up -d`
2. Initialize sync:
   - `stateset-sync init --sequencer-url http://localhost:8080 --tenant-id <uuid> --store-id <uuid> --db ./store.db`
3. Register keys:
   - `stateset-sync keys:generate`
   - `stateset-sync keys:register`
4. Push and pull:
   - `stateset-sync push --db ./store.db`
   - `stateset-sync pull --db ./store.db`

## Autonomous Engine (Optional)

- Start: `stateset-autonomous start --db ./.stateset/commerce.db`
- Status: `stateset-autonomous status`

## Quick Health Checks

```bash
stateset --db ./store.db "list products"
stateset --db ./store.db "list customers"
stateset --db ./store.db --apply "create customer customer@example.com Example Customer"
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `STATESET_DB` | Path to SQLite database | `./store.db` |
| `SEQUENCER_URL` | Sync sequencer endpoint | `http://localhost:8080` |
| `STATESET_TENANT_ID` | Tenant UUID for sync | (none) |
| `STATESET_STORE_ID` | Store UUID for sync | (none) |

## Cleanup

- Remove the database file if you want a clean state.
- Remove `.stateset/` if you want to re-init sync.

## Database Schema Verification

```bash
# List all tables in the database
stateset-doctor tables --db ./store.db

# Check schema version
stateset-doctor schema-version --db ./store.db

# Run migrations if schema is outdated
stateset-doctor migrate --db ./store.db

# Validate referential integrity
stateset-doctor integrity-check --db ./store.db
```

## Troubleshooting

| Symptom | Cause | Resolution |
|---------|-------|------------|
| `stateset` not found | CLI not linked | Run `npm link` in the CLI directory |
| DB file not created | Missing parent directory | Create `.stateset/` directory first |
| Permission denied on DB | File ownership issue | Check file permissions with `ls -la` |
| Seed script fails | Missing dependencies | Run `npm install` in examples directory |
| Sequencer connection refused | Docker not running | Start with `docker-compose up -d` |
| Schema version mismatch | Outdated database | Run `stateset-doctor migrate` |

## MCP Server Configuration

To connect the CLI as an MCP tool server:

```bash
# Start MCP server on default port 3001
stateset-mcp start --db ./store.db --port 3001

# Start with specific allowed tools
stateset-mcp start --db ./store.db --tools "list_orders,get_customer,list_products"

# Verify MCP server is responding
curl http://localhost:3001/health
```

## Configuration File

The CLI reads from `.stateset/config.json` if present:

| Key | Type | Description |
|-----|------|-------------|
| `db_path` | string | Default database file path |
| `sequencer_url` | string | Sync sequencer endpoint |
| `tenant_id` | string | Tenant UUID |
| `store_id` | string | Store UUID |
| `mcp_port` | number | MCP server port (default 3001) |
| `log_level` | string | debug, info, warn, error |
