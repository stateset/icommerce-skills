---
name: commerce-autonomous-engine
description: Operate the StateSet autonomous engine (jobs, workflows, policies, approvals). Use when starting/stopping `stateset-autonomous`, inspecting scheduler state, or running autonomous MCP tools.
---

# Commerce Autonomous Engine

Operate the autonomous engine that runs scheduled jobs, workflows, policies, and approvals.

## How It Works

1. Start the autonomous engine with a database and store path.
2. Configure scheduler, workflows, policies, approvals, and webhooks.
3. Monitor job runs and workflow instances.
4. Approve or deny gated operations.
5. Review execution logs and reschedule failed jobs with back-off.

## Status Flows

- **Engine:** stopped -> starting -> running -> stopping -> stopped
- **Job:** scheduled -> running -> completed | failed -> retrying
- **Approval:** pending -> approved | denied -> executed | cancelled

## Usage

- CLI: `stateset-autonomous start`, `stateset-autonomous status`, `stateset-autonomous init`.
- Skill script: `bash /mnt/skills/user/commerce-autonomous-engine/scripts/autonomous-status.sh`.
- MCP tools: `list_scheduled_jobs`, `create_scheduled_job`, `run_job_now`, `list_workflows`, `list_policies`, `list_pending_approvals`.

## Permissions

- Read: `list_scheduled_jobs`, `list_workflows`, `list_policies`, `list_pending_approvals` — no `--apply` needed.
- Write: `create_scheduled_job`, `run_job_now` — requires `--apply`.

## Examples

```bash
stateset-autonomous start --db ./commerce.db --store ./data
stateset-autonomous status --format json
stateset autonomous job create --name "nightly-sync" --cron "0 2 * * *" --apply
stateset autonomous job run --job job_101 --apply
```

## Output

```json
{"status":"running","scheduler_jobs":4,"pending_approvals":0,"last_run":"2026-03-25T09:30:00Z","failed_jobs":0}
```

## Present Results to User

- Engine status and enabled subsystems.
- Jobs or workflows created/updated.
- Approval decisions and impact.
- Failed job count and next retry time.

## Troubleshooting

- Engine fails to start: verify DB path and store directory permissions with `ls -la`.
- Webhook errors: confirm port availability and event payloads via `curl` test.
- Job stuck in `running`: check `list_workflows` for the hung instance and cancel it.
- Approval not appearing: ensure the policy `requires_approval` flag is `true` in `list_policies`.

## Error Codes

- `ENGINE_START_FAILED`: Engine could not start due to invalid DB path or insufficient permissions.
- `ENGINE_JOB_HUNG`: A scheduled job exceeded its timeout and is stuck in the running state.
- `ENGINE_APPROVAL_MISSING`: Operation requires approval but no pending approval record was found.

## Related Skills

- **commerce-sync** -- sync engine state and job results across nodes.
- **commerce-orders** -- jobs that automate order fulfillment or status updates.
- **commerce-customer-service** -- auto-resolve tickets via scheduled policies.
- **commerce-embedded-sdk** -- run the engine against an embedded database in app code.

## References
- references/autonomous-ops.md
- /home/dom/stateset-icommerce/cli/bin/stateset-autonomous.js
- /home/dom/stateset-icommerce/cli/src/autonomous/mcp-tools.js
