# Sandbox Architecture (V2)

## Overview

Temporal workflow logic is replaced by Claude Code agents running in isolated Kubernetes pods via the StateSet sandbox. This enables AI-driven reasoning with MCP tool integrations.

## Request Flow

Webhook -> API route -> Sandbox SDK -> Kubernetes pod -> Claude Code CLI -> callback

## Typical Steps

1. Validate webhook in /api/v2/response/<brand> or /api/v2/reason/<brand>.
2. Create sandbox instance (cpu, memory, timeout).
3. Inject secrets as env vars.
4. Write ticket or order context to /workspace.
5. Execute Claude Code with a prompt template.
6. Read results and update tickets or orders.

## Integrations

Use MCP servers for Shopify, Gorgias, Recharge, Zendesk, Loop, and fulfillment tools. Keep secrets scoped per request.

## Migration Notes

- Port prompts from workflow logic into agent templates.
- Prefer MCP tools for side effects.
- Keep audit logs of agent actions.

## Source References

- `/home/dom/next-temporal/architecture-v2.md`
- `/home/dom/next-temporal/architecture.md`
- `/home/dom/next-temporal/IMPLEMENTATION-SUMMARY.md`
