# iCommerce Skills

A collection of skills for operating the StateSet iCommerce engine (/home/dom/stateset-icommerce) and ecommerce automation workflows (/home/dom/next-temporal).

Skills at a glance: 25 iCommerce engine.

## Getting Started

### Install with npm (Claude Code)

Global install (recommended):

```bash
npm install -g /home/dom/icommerce-skills
icommerce-skills list
icommerce-skills install
```

Local install (repo checkout):

```bash
npm install
npx icommerce-skills list
npx icommerce-skills install
```

Defaults:
- Installs to `~/.claude/skills`.
- Override with `CLAUDE_HOME=/path/to/.claude` or `icommerce-skills install --dest /path/to/skills`.
- Use `--force` to overwrite existing skills.

### Manual install (Claude Code)

```bash
cp -r skills/{skill-name} ~/.claude/skills/
```

### claude.ai

Add the skill to project knowledge or paste the `SKILL.md` contents into the conversation.
If a skill requires network access, add required domains at `claude.ai/settings/capabilities`.

## Available Skills

## Top 20 iCommerce Skills

1. commerce-engine-setup - Set up the iCommerce engine, CLI, demo data, and optional sync.
2. commerce-embedded-sdk - Integrate the embedded engine in application code across language bindings.
3. commerce-customers - Manage customer records and profiles.
4. commerce-products - Manage product catalog entries and variants.
5. commerce-inventory - Manage stock levels, adjustments, and reservations.
6. commerce-orders - Create orders and manage status transitions.
7. commerce-checkout - Run cart and checkout flows (ACP).
8. commerce-payments - Process payments and refunds, including stablecoin flows.
9. commerce-shipments - Create shipments, tracking, and delivery updates.
10. commerce-returns - Handle return requests and refunds.
11. commerce-promotions - Create and apply promotions and coupons.
12. commerce-subscriptions - Manage subscription plans and billing cycles.
13. commerce-analytics - Report sales, customer metrics, and forecasts.
14. commerce-tax - Calculate tax and manage exemptions.
15. commerce-currency - Manage exchange rates and currency conversion.
16. commerce-invoices - Manage invoices and receivables.
17. commerce-suppliers - Manage suppliers and purchase orders.
18. commerce-sync - Manage VES sync, outbox, and conflicts.
19. commerce-storefront - Scaffold and build storefront projects.
20. commerce-customer-service - Handle cross-domain customer support flows.

## iCommerce Engine Skills

### commerce-engine-setup
Set up the iCommerce engine, CLI, demo data, and optional sync.

### commerce-embedded-sdk
Integrate the embedded engine in application code across language bindings.

### commerce-customers
Manage customer records and profiles.

### commerce-products
Manage product catalog entries and variants.

### commerce-inventory
Manage stock levels, adjustments, and reservations.

### commerce-orders
Create orders and manage status transitions.

### commerce-checkout
Run cart and checkout flows (ACP).

### commerce-returns
Handle return requests and refunds.

### commerce-payments
Process payments and refunds, including stablecoin flows.

### commerce-shipments
Create shipments, tracking, and delivery updates.

### commerce-promotions
Create and apply promotions and coupons.

### commerce-subscriptions
Manage subscription plans and billing cycles.

### commerce-analytics
Report sales, customer metrics, and forecasts.

### commerce-tax
Calculate tax and manage exemptions.

### commerce-currency
Manage exchange rates and currency conversion.

### commerce-invoices
Manage invoices and receivables.

### commerce-suppliers
Manage suppliers and purchase orders.

### commerce-manufacturing
Manage BOMs and work orders.

### commerce-warranties
Manage warranties and claims.

### commerce-sync
Manage VES sync, outbox, and conflicts.

### commerce-storefront
Scaffold and build storefront projects.

### commerce-customer-service
Handle cross-domain customer support flows.

### commerce-autonomous-engine
Run the autonomous engine (scheduler, workflows, approvals).

### commerce-autonomous-runbook
Operational runbook for autonomous engine operations and incident response.

### commerce-mcp-tools
Reference map for MCP tool names, parameters, and payload examples.

## Notes

- Many skills include `references/` for deep docs and `scripts/` for repeatable commands. Use the script paths listed in each `SKILL.md`.

## Packaging

```bash
cd skills
zip -r {skill-name}.zip {skill-name}/
```
