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
```
