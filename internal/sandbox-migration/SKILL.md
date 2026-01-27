---
name: sandbox-migration
description: Migrate Temporal workflows to Claude Code sandbox architecture. Use when building new /api/v2 endpoints or porting automation to sandboxed agents with MCP integrations.
---

# Sandbox Migration

Move automation from Temporal workflows to Claude Code sandbox execution.

## How It Works

1. Accept the webhook in a /api/v2 endpoint.
2. Create a sandbox instance with resource limits.
3. Inject secrets and write context files.
4. Run the Claude Code agent with a prompt template.
5. Receive completion callbacks and update external systems.

## Usage

Use when you need to:
- Create new sandbox-based response or reason handlers.
- Port existing Temporal workflows to agent-driven logic.
- Add MCP server integrations.

Typical touchpoints:
- `architecture-v2.md`
- `pages/api/v2/...` (if present)
- sandbox SDK client wrapper and prompt templates

## Output

Example status object:

```json
{
  "status": "completed",
  "sandbox_id": "sbx_123",
  "duration_ms": 4200
}
```

## Present Results to User

- Which workflows moved to sandbox.
- New secrets or MCP dependencies.
- Validation steps for the new endpoint.

## Troubleshooting

- Sandbox creation failures: verify API key and base URL.
- Missing data in agent: confirm files written to workspace.
- MCP errors: validate server configs and permissions.

## References

- `references/architecture-v2.md`
