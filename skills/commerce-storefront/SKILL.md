---
name: commerce-storefront
description: Build and adapt storefront templates and Agentic Commerce Protocol flows. Use when scaffolding storefront pages, designing checkout UI, or building ACP commerce flows.
---

# Commerce Storefront

Scaffold storefronts and add commerce features using StateSet tools.

## How It Works

1. Choose a template (Next.js, Remix, Vite, Astro).
2. Generate the project scaffold with `stateset-create`.
3. Add pages, components, and API routes via MCP or CLI.
4. Configure `.env` with database path and API keys.
5. Seed demo data and run the dev server.

## Usage

- CLI: `stateset-create <name> --template nextjs`
- MCP tools: scaffold MCP server for adding pages/components.
- Keep database path in `.env` and use `@stateset/embedded` on the server.

## Examples

```bash
stateset-create my-storefront --template nextjs
stateset storefront add-page --project my-storefront --page products
stateset storefront seed --project my-storefront --data demo
stateset storefront dev --project my-storefront --port 3000
```

## Configuration

| Template | Framework | SSR | Use Case |
|----------|-----------|-----|----------|
| `nextjs` | Next.js | Yes | Full-featured commerce site |
| `remix` | Remix | Yes | Data-heavy commerce apps |
| `vite` | Vite + React | No | SPAs and dashboards |
| `astro` | Astro | Partial | Content-heavy catalogs |

## Output

```json
{"status":"created","project":"my-storefront","template":"nextjs","path":"/home/user/my-storefront","pages":["index","products","cart","checkout"]}
```

## Present Results to User

- Project path, template used, and framework version.
- Pages and components added with file paths.
- How to run the dev server (`npm run dev`).
- Environment variables that need to be set.

## Troubleshooting

- Missing Node dependencies: run `npm install` in the project directory.
- Database errors: confirm `.env` `DATABASE_PATH` points to a writable file.
- Port conflict: change the dev server port in `package.json` or use `--port`.
- Template not found: verify the template name matches available options.

## Error Codes

- `TEMPLATE_NOT_FOUND`: The specified storefront template name does not match any available option.
- `DATABASE_PATH_INVALID`: The `.env` `DATABASE_PATH` is missing or points to a non-writable location.
- `PORT_CONFLICT`: The requested dev server port is already in use; choose a different port.

## Related Skills

- commerce-checkout — checkout flow logic for storefront pages
- commerce-products — product catalog data for storefront display
- commerce-embedded-sdk — `@stateset/embedded` SDK used server-side

## References
- references/storefront-templates.md
- /home/dom/stateset-icommerce/cli/.claude/skills/commerce-storefront/SKILL.md
- /home/dom/stateset-icommerce/cli/src/scaffold-server.js
