---
name: commerce-autonomous-runbook
description: Runbook for operating the StateSet autonomous engine. Use when troubleshooting incident response, stuck jobs, approval backlogs, or autonomous operations with `stateset-autonomous`.
---

# Commerce Autonomous Runbook

Operational runbook for running and troubleshooting the autonomous engine.

## How It Works

1. Start the autonomous engine with the correct database and store path.
2. Verify scheduler, workflows, policies, approvals, and webhooks are enabled.
3. Monitor job runs and workflow instances via `stateset-autonomous status`.
4. Handle approvals or disable subsystems if needed.
5. Escalate unresolved incidents and capture logs for review.

## Usage

- CLI: `stateset-autonomous start --db ./commerce.db --port 8787`
- Status check: `stateset-autonomous status`
- MCP tools: `get_autonomous_status`, `list_job_runs`, `approve_job`, `disable_scheduler`.

Use this runbook when:
- The autonomous engine fails to start.
- Jobs or workflows are stuck.
- Approval queues are growing.
- You need to disable scheduling or webhooks.

## Permissions

- Read: `get_autonomous_status`, `list_job_runs` — no `--apply` needed.
- Write: `approve_job`, `disable_scheduler`, `pause`, `retry-webhook` — requires `--apply`.

## Examples

```bash
stateset-autonomous start --db ./commerce.db --port 8787
stateset-autonomous status
stateset-autonomous approve --job job_456 --apply
stateset-autonomous pause --subsystem scheduler --apply
```

## Status Flows

**Engine:** Stopped -> Starting -> Running -> Degraded -> Stopped

**Job:** Scheduled -> Running -> Completed (or Failed/Cancelled)

**Approval:** Pending -> Approved -> Executed (or Denied/Expired)

## Output

```json
{"status":"running","scheduler":"enabled","active_jobs":3,"pending_approvals":0,"uptime_seconds":14400}
```

## Present Results to User

- Current engine status and enabled subsystems.
- Jobs or workflows affected and their current state.
- Remediation steps executed and verification results.
- Approval counts and any escalation actions taken.

## Troubleshooting

- DB path invalid: confirm `--db` points to a writable file with correct permissions.
- Port conflict: change `--port` or stop the conflicting service with `lsof -i :8787`.
- Approval backlog: pause jobs with `stateset-autonomous pause` and clear pending approvals.
- Stuck job: check `job_id` status and force-cancel if beyond timeout threshold.
- Webhook delivery failure: verify endpoint URL and retry with `stateset-autonomous retry-webhook`.

## Error Codes

- `RUNBOOK_PORT_CONFLICT`: The specified port is already in use by another service.
- `RUNBOOK_APPROVAL_BACKLOG`: Pending approvals exceeded the configured threshold.
- `RUNBOOK_WEBHOOK_DELIVERY_FAILED`: Webhook endpoint did not respond or returned an error.

## Related Skills

- commerce-autonomous-engine — engine setup and configuration
- commerce-events — event log inspection and replay
- commerce-orders — order lifecycle affected by autonomous workflows

## References

- references/runbook.md
- /home/dom/stateset-icommerce/cli/bin/stateset-autonomous.js
