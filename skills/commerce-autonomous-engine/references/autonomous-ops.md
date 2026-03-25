# Autonomous Engine Ops

## Startup

```bash
stateset-autonomous start --db ./.stateset/commerce.db --port 3000
stateset-autonomous status
stateset-autonomous start --no-scheduler  # safe mode
```

## MCP Tool Reference

| Tool | Category | Action |
|------|----------|--------|
| `list_scheduled_jobs` | Jobs | List all scheduled jobs |
| `create_scheduled_job` | Jobs | Create a new scheduled job |
| `run_job_now` | Jobs | Execute a job immediately |
| `list_workflows` | Workflows | List workflow definitions |
| `list_workflow_instances` | Workflows | List running instances |
| `list_policies` | Policies | List evaluation policies |
| `evaluate_policy` | Policies | Run a policy evaluation |
| `list_pending_approvals` | Approvals | List pending approvals |
| `create_approval_request` | Approvals | Create approval request |
| `approve_request` | Approvals | Approve a pending request |
| `deny_request` | Approvals | Deny a pending request |

## Engine Subsystems

| Subsystem | Flag to Disable | Purpose |
|-----------|----------------|---------|
| Scheduler | `--no-scheduler` | Cron-based job execution |
| Workflows | `--no-workflows` | Event-driven workflow engine |
| Approvals | `--no-approvals` | Human-in-the-loop gating |
| Webhooks | `--no-webhooks` | Inbound event handlers |

## Common Operations

```bash
# Check engine health
stateset-autonomous status

# List and run jobs
stateset-autonomous jobs list
stateset-autonomous jobs run JOB-001

# List pending approvals
stateset-autonomous approvals list

# Approve a pending request
stateset-autonomous approvals approve REQ-001
```

## Health Check Output

| Field | Description |
|-------|-------------|
| `status` | Engine status (running, degraded, stopped) |
| `scheduler` | Scheduler state (enabled, disabled) |
| `active_jobs` | Number of currently running jobs |
| `pending_approvals` | Approvals awaiting action |
| `uptime_seconds` | Time since engine start |

## Scheduled Job Fields

| Field | Type | Description |
|-------|------|-------------|
| `job_id` | string | Unique identifier |
| `name` | string | Job display name |
| `cron_expression` | string | Cron schedule |
| `command` | string | StateSet command to execute |
| `enabled` | boolean | Active or paused |
| `last_run_at` | datetime | Last execution time |
| `last_status` | string | success, failed, skipped |

## Policy Evaluation

Policies define rules the engine evaluates against current state:

```bash
# Create a reorder policy
stateset-autonomous policies create \
  --name "low-stock-reorder" \
  --condition "inventory.available < inventory.reorder_point" \
  --action "create_purchase_order"

# Evaluate all policies
stateset-autonomous policies evaluate-all

# Evaluate a single policy
stateset-autonomous policies evaluate POL-001
```

## Workflow Definition Fields

| Field | Type | Description |
|-------|------|-------------|
| `workflow_id` | string | Unique workflow identifier |
| `name` | string | Workflow display name |
| `trigger` | string | Event that starts the workflow |
| `steps` | array | Ordered list of activities |
| `timeout_seconds` | number | Max execution time |
| `retry_policy` | object | Retry count and backoff config |

## Error Codes

| Error | Cause | Resolution |
|-------|-------|------------|
| `ENGINE_NOT_RUNNING` | Engine process not started | Run `stateset-autonomous start` |
| `DB_LOCKED` | Database held by another process | Stop conflicting process |
| `JOB_NOT_FOUND` | Invalid job_id | Verify with `list_scheduled_jobs` |
| `POLICY_EVAL_FAILED` | Policy condition syntax error | Check policy condition expression |
| `APPROVAL_EXPIRED` | Approval request past deadline | Create a new approval request |
| `WORKFLOW_TIMED_OUT` | Instance exceeded timeout | Increase timeout or optimize steps |
