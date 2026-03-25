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
