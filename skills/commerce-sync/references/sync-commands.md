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
