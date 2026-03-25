# Autonomous Engine Runbook

## Startup Checklist

```bash
# 1. Confirm database path exists
ls -la ./.stateset/commerce.db

# 2. Start engine
stateset-autonomous start --db ./.stateset/commerce.db --port 3000

# 3. Check status
stateset-autonomous status
```

## Incident Triage

| Symptom | Cause | Resolution |
|---------|-------|------------|
| Jobs not running | Scheduler disabled | Restart without `--no-scheduler` |
| Workflows stuck | Activity timeout | List instances, cancel stuck runs |
| Approvals stuck | No approver | Review pending approvals, approve or deny |
| Webhooks failing | Port conflict | Change port or stop conflicting process |
| DB locked | Concurrent access | Stop other processes, retry |

## Safe Mode

Disable subsystems when needed:

```bash
stateset-autonomous start --no-scheduler    # disable cron jobs
stateset-autonomous start --no-workflows    # disable workflow engine
stateset-autonomous start --no-approvals    # disable approval gates
stateset-autonomous start --no-webhooks     # disable inbound events
```

## Recovery

```bash
# Pause all scheduled jobs
stateset-autonomous jobs pause-all

# Re-run a specific failed job
stateset-autonomous jobs run JOB-001

# List workflow instances and cancel stuck ones
stateset-autonomous workflows list-instances --status running
stateset-autonomous workflows cancel WFI-001
```

## Logging and Audit

- Start with `--verbose` for detailed logging.
- Capture `job_run_id` and `workflow_instance_id` for traceability.
- Review event log with `stateset-events list --entity-type job_run`.

## Scheduled Job Fields

| Field | Type | Description |
|-------|------|-------------|
| `job_id` | string | Unique job identifier |
| `name` | string | Human-readable job name |
| `cron_expression` | string | Cron schedule (e.g., `0 */6 * * *`) |
| `command` | string | StateSet command to execute |
| `enabled` | boolean | Whether job is active |
| `last_run_at` | datetime | Timestamp of last execution |
| `last_status` | string | success, failed, skipped |
| `next_run_at` | datetime | Next scheduled execution time |

## Workflow Instance States

```
Pending -> Running -> Completed
              \-> Failed (retryable)
              \-> TimedOut
              \-> Cancelled (manual)
```

## Approval Request Fields

| Field | Type | Description |
|-------|------|-------------|
| `request_id` | string | Unique approval request ID |
| `workflow_id` | string | Originating workflow |
| `entity_type` | string | Type of entity requiring approval |
| `entity_id` | string | ID of entity under review |
| `requested_by` | string | User or system that triggered |
| `approver` | string | Designated approver |
| `status` | string | pending, approved, denied, expired |
| `expires_at` | datetime | Auto-deny deadline |

## Common Cron Expressions

| Schedule | Expression | Use Case |
|----------|-----------|----------|
| Every hour | `0 * * * *` | Sync checks, health pings |
| Every 6 hours | `0 */6 * * *` | Inventory recount |
| Daily at midnight | `0 0 * * *` | Aging reports, dunning |
| Weekly Monday 9am | `0 9 * * 1` | AP payment runs |
| First of month | `0 0 1 * *` | Monthly invoicing |

## Monitoring Endpoints

```bash
# Engine health summary
stateset-autonomous health

# Metrics for Prometheus/Grafana
stateset-autonomous metrics --format prometheus

# Export audit trail for a date range
stateset-autonomous audit-log --from 2025-03-01 --to 2025-03-31 --format json
```
