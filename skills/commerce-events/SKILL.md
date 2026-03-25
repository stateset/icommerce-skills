---
name: commerce-events
description: Inspect commerce events, manage the event audit trail, and handle idempotency keys. Use when debugging event history, reviewing the outbox, or ensuring operation idempotency.
---

# Commerce Events

Inspect the commerce event log, manage the outbox for sync, and handle idempotency keys for safe retries.

## How It Works

1. Browse and filter the event log for any commerce entity.
2. Inspect event payloads and metadata.
3. Review the outbox for events pending sync.
4. Manage idempotency keys to prevent duplicate operations.
5. Replay or acknowledge events for debugging and recovery.

## Usage

- CLI: `stateset-events list`, `stateset-events inspect <event_id>`, `stateset-events outbox`.
- MCP tools: `list_events`, `get_event`, `list_outbox`, `acknowledge_event`, `get_idempotency_key`, `create_idempotency_key`.
- Read-only operations do not require `--apply`.

## Permissions

- Read: `list_events`, `get_event`, `list_outbox`, `get_idempotency_key` — no `--apply` needed.
- Write: `acknowledge_event`, `create_idempotency_key` — requires `--apply`.

## Examples

```bash
stateset-events list --entity-type order --since 2025-01-01
stateset-events inspect evt_001 --include-payload
stateset-events outbox --status pending --limit 20
```

## Status Flows

**Outbox Event:** Pending -> Synced -> Acknowledged (or Failed)
**Idempotency Key:** Active -> Expired (or Consumed)
**Event:** Created -> Delivered -> Processed (or Failed)

## Output

```json
{"events":[{"event_id":"evt_001","event_type":"order.created","entity_type":"order","entity_id":"ord_123","created_at":"2025-01-15T10:30:00Z","status":"delivered"}],"total":1}
```

## Present Results to User

- Event timeline for the requested entity.
- Event type, timestamp, and sequence number.
- Outbox status and pending event count.
- Idempotency key status and expiration.

## Troubleshooting

- Event not synced: check outbox for failed events; verify sequencer connectivity.
- Duplicate operation: look up existing idempotency key for the operation.
- Missing events: verify event type filter and time range.
- Signature invalid: check Ed25519 key configuration.

## Error Codes

- `EVENT_SYNC_FAILED`: Outbox event failed to sync to the sequencer after retries.
- `EVENT_DUPLICATE_KEY`: An idempotency key already exists for this operation.
- `EVENT_SIGNATURE_INVALID`: Ed25519 agent signature verification failed for the event.

## Related Skills

- commerce-sync — push outbox events to the sequencer
- commerce-orders — order events in the audit trail
- commerce-autonomous-engine — event-driven workflow triggers

## References
- references/event-types.md
- /home/dom/stateset-icommerce/crates/stateset-core/src/models/events.rs
- /home/dom/stateset-icommerce/crates/stateset-db/src/migrations/026_idempotency_keys.sql
