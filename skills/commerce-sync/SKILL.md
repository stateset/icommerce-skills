---
name: commerce-sync
description: Manage sequencer sync, outbox, and conflict resolution. Use when running `stateset-sync` or checking sync status, push, or pull.
---

# Commerce Sync

Synchronize local events with the sequencer using VES.

## How It Works

1. Initialize sync config and keys.
2. Push local outbox events to the sequencer.
3. Pull remote events and apply changes.
4. Resolve conflicts and acknowledge synced events.
5. Verify end-to-end consistency with `sync_status` after each cycle.

## Status Flows

- **Sync Cycle:** idle -> pushing -> pulling -> resolving -> synced | error
- **Event:** queued -> sent -> acknowledged | failed
- **Conflict:** detected -> manual_review -> resolved | discarded

## Usage

- CLI: `stateset-sync status`, `stateset-sync push`, `stateset-sync pull`, `stateset-sync resolve`.
- Skill scripts: `bash /mnt/skills/user/commerce-sync/scripts/sync-status.sh`, `bash /mnt/skills/user/commerce-sync/scripts/sync-push.sh`, `bash /mnt/skills/user/commerce-sync/scripts/sync-pull.sh`.
- MCP tools: `sync_status`, `sync_push`, `sync_pull`, `sync_outbox`, `sync_conflicts`, `sync_resolve`.

## Examples

```bash
stateset-sync status
stateset-sync push --apply
stateset-sync pull --apply
stateset-sync resolve --strategy ours --conflict conflict_12 --apply
```

## Output

```json
{"status":"synced","pending":0,"conflicts":0,"last_push":"2026-03-25T09:45:00Z","events_pushed":12}
```

## Present Results to User

- Sync status, pending counts, and conflicts.
- Events pushed/pulled and any failures.
- Next steps for unresolved conflicts.
- Timestamp of last successful push and pull.

## Troubleshooting

- Sync config missing: run `stateset-sync init` to generate `.sync.json`.
- Signature errors: re-register keys with the sequencer via `stateset-sync register`.
- Conflicts: choose a resolution strategy (`ours`, `theirs`, `manual`) before retrying.
- `pending` count not decreasing: check network connectivity and sequencer health with `sync_status`.

## Error Codes

- `SYNC_CONFIG_MISSING`: No `.sync.json` found; run `stateset-sync init` to generate the config.
- `SYNC_SIGNATURE_INVALID`: Event signature verification failed; re-register keys with the sequencer.
- `SYNC_CONFLICT_UNRESOLVED`: One or more conflicts must be resolved before the sync cycle can complete.

## Related Skills

- **commerce-orders** -- order events are the most common sync payload.
- **commerce-customers** -- customer profile updates propagated via sync.
- **commerce-embedded-sdk** -- embedded writes produce outbox events for sync.
- **commerce-autonomous-engine** -- scheduled sync jobs and retry policies.

## References
- references/sync-commands.md
- /home/dom/stateset-icommerce/cli/.claude/agents/sync.md
- /home/dom/stateset-icommerce/examples/getting-started-sync.md
- /home/dom/stateset-icommerce/cli/SYNC_CLI_SPEC.md
