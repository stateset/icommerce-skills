# Sync Commands

## Initialize

```bash
stateset-sync init --sequencer-url http://localhost:8080 --tenant-id <uuid> --store-id <uuid> --db ./store.db
stateset-sync keys:generate
stateset-sync keys:register
```

## Push / Pull

```bash
stateset-sync status --db ./store.db
stateset-sync push --db ./store.db --batch-size 100
stateset-sync pull --db ./store.db --limit 1000
stateset-sync rebase
```

## MCP Tool Reference

| Tool | Action | Requires --apply |
|------|--------|-----------------|
| `sync_status` | Check sync state and pending events | No |
| `sync_push` | Push local events to sequencer | Yes |
| `sync_pull` | Pull remote events to local | Yes |
| `resolve_conflict` | Resolve VES conflicts | Yes |

## Sync Lifecycle

| Phase | Description |
|-------|-------------|
| Init | Register store with sequencer |
| Key Generation | Create Ed25519 signing keys |
| Push | Upload local events to remote |
| Pull | Download remote events to local |
| Rebase | Resolve ordering conflicts |

## Conflict Resolution (VES)

| Strategy | Description |
|----------|-------------|
| Last-Write-Wins | Timestamp-based, newest wins |
| Manual | Agent or user resolves via `resolve_conflict` |
| Custom | Org-specific merge rules |

## Sync Status Fields

| Field | Description |
|-------|-------------|
| `last_push` | Timestamp of last successful push |
| `last_pull` | Timestamp of last successful pull |
| `pending_events` | Events awaiting push to sequencer |
| `conflicts` | Unresolved conflict count |
| `sequence_number` | Current local sequence position |

## Event Fields

| Field | Type | Description |
|-------|------|-------------|
| `event_id` | string | Unique event identifier (ULID) |
| `entity_type` | string | Type of entity (order, customer, etc.) |
| `entity_id` | string | ID of the affected entity |
| `action` | string | create, update, delete |
| `payload` | object | Event data (JSON) |
| `timestamp` | datetime | When the event occurred |
| `sequence` | number | Global ordering sequence |
| `store_id` | string | Originating store |
| `signature` | string | Ed25519 signature for verification |

## Key Management

```bash
# Generate a new Ed25519 signing key pair
stateset-sync keys:generate

# Register public key with the sequencer
stateset-sync keys:register

# Rotate keys (generates new, registers, deprecates old)
stateset-sync keys:rotate

# List registered keys
stateset-sync keys:list
```

## Advanced Sync Operations

```bash
# Push with batch size control
stateset-sync push --db ./store.db --batch-size 500

# Pull with sequence range filter
stateset-sync pull --db ./store.db --from-sequence 1000 --limit 500

# Force full re-sync from sequencer
stateset-sync pull --db ./store.db --full

# Export pending events as JSON
stateset-sync export-pending --db ./store.db --format json

# View conflict details
stateset-sync conflicts list --db ./store.db
stateset-sync conflicts show CONFLICT-001
```

## Error Codes

| Error | Cause | Fix |
|-------|-------|-----|
| `SEQUENCER_UNREACHABLE` | Cannot connect to sequencer | Check URL and network |
| `AUTH_FAILED` | Key not registered or revoked | Re-register key |
| `SIGNATURE_INVALID` | Event signature verification failed | Check key pair integrity |
| `SEQUENCE_GAP` | Missing events in local store | Run `pull --full` to re-sync |
| `CONFLICT_UNRESOLVED` | Push blocked by pending conflict | Resolve conflict first |
| `BATCH_TOO_LARGE` | Batch exceeds size limit | Reduce `--batch-size` value |
