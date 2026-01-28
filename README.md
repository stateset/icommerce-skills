# iCommerce Skills

A collection of skills for operating the StateSet iCommerce engine.

**38 public skills** covering the full commerce lifecycle, plus **9 internal skills** for customer support and operations automation.

## Getting Started

### Install with npm (Claude Code)

Global install (recommended):

```bash
npm install -g @stateset/icommerce-skills
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

## Skills at a Glance

| # | Skill | Description |
|---|-------|-------------|
| 1 | commerce-engine-setup | Set up the iCommerce engine, CLI, demo data, and optional sync |
| 2 | commerce-embedded-sdk | Integrate the embedded engine in application code across language bindings |
| 3 | commerce-customers | Manage customer records and profiles |
| 4 | commerce-products | Manage product catalog entries and variants |
| 5 | commerce-inventory | Manage stock levels, adjustments, and reservations |
| 6 | commerce-orders | Create orders and manage status transitions |
| 7 | commerce-checkout | Run cart and checkout flows (ACP) |
| 8 | commerce-payments | Process payments and refunds, including stablecoin flows |
| 9 | commerce-shipments | Create shipments, tracking, and delivery updates |
| 10 | commerce-returns | Handle return requests and refunds |
| 11 | commerce-promotions | Create and apply promotions and coupons |
| 12 | commerce-subscriptions | Manage subscription plans and billing cycles |
| 13 | commerce-analytics | Report sales, customer metrics, and forecasts |
| 14 | commerce-tax | Calculate tax and manage exemptions |
| 15 | commerce-currency | Manage exchange rates and currency conversion |
| 16 | commerce-invoices | Manage invoices and receivables |
| 17 | commerce-suppliers | Manage suppliers and purchase orders |
| 18 | commerce-sync | Manage VES sync, outbox, and conflicts |
| 19 | commerce-storefront | Scaffold and build storefront projects |
| 20 | commerce-customer-service | Handle cross-domain customer support flows |

## All iCommerce Engine Skills

### Core Commerce

| Skill | Description |
|-------|-------------|
| commerce-engine-setup | Set up the iCommerce engine, CLI, demo data, and optional sync |
| commerce-embedded-sdk | Integrate the embedded engine in application code across language bindings |
| commerce-customers | Manage customer records and profiles |
| commerce-products | Manage product catalog entries and variants |
| commerce-orders | Create orders and manage status transitions |
| commerce-checkout | Run cart and checkout flows (ACP) |
| commerce-payments | Process payments and refunds, including stablecoin flows |
| commerce-storefront | Scaffold and build storefront projects |
| commerce-customer-service | Handle cross-domain customer support flows |

### Inventory and Fulfillment

| Skill | Description |
|-------|-------------|
| commerce-inventory | Manage stock levels, adjustments, and reservations |
| commerce-shipments | Create shipments, tracking, and delivery updates |
| commerce-returns | Handle return requests and refunds |
| commerce-backorders | Manage backorders for out-of-stock items |
| commerce-fulfillment | Manage fulfillment waves, pick tasks, pack tasks, and ship tasks |
| commerce-receiving | Manage inbound goods receiving, inspection, and put-away |
| commerce-warehouse | Manage warehouses, locations, and inventory movements |
| commerce-lots-and-serials | Manage lot/batch tracking and serial number management |

### Financial

| Skill | Description |
|-------|-------------|
| commerce-invoices | Manage invoices and receivables |
| commerce-tax | Calculate tax and manage exemptions |
| commerce-currency | Manage exchange rates and currency conversion |
| commerce-accounts-payable | Manage supplier bills, payments, and AP aging |
| commerce-accounts-receivable | Manage customer receivables, collections, and AR aging |
| commerce-cost-accounting | Manage item costs, cost layers, variances, and inventory valuation |
| commerce-credit | Manage customer credit accounts, holds, and applications |
| commerce-general-ledger | Manage the general ledger, chart of accounts, and journal entries |

### Marketing and Subscriptions

| Skill | Description |
|-------|-------------|
| commerce-promotions | Create and apply promotions and coupons |
| commerce-subscriptions | Manage subscription plans and billing cycles |

### Supply Chain and Manufacturing

| Skill | Description |
|-------|-------------|
| commerce-suppliers | Manage suppliers and purchase orders |
| commerce-manufacturing | Manage BOMs and work orders |
| commerce-warranties | Manage warranties and claims |
| commerce-quality | Manage quality inspections, non-conformance reports, and holds |

### Analytics and Search

| Skill | Description |
|-------|-------------|
| commerce-analytics | Report sales, customer metrics, and forecasts |
| commerce-vector-search | Perform semantic and keyword search across products, customers, orders, and inventory |
| commerce-events | Inspect commerce events, manage the event audit trail, and idempotency keys |

### Platform and Automation

| Skill | Description |
|-------|-------------|
| commerce-sync | Manage VES sync, outbox, and conflicts |
| commerce-autonomous-engine | Run the autonomous engine (scheduler, workflows, approvals) |
| commerce-autonomous-runbook | Operational runbook for autonomous engine operations and incident response |
| commerce-mcp-tools | Reference map for MCP tool names, parameters, and payload examples |

## Notes

- Many skills include `references/` for deep docs and `scripts/` for repeatable commands. Use the script paths listed in each `SKILL.md`.
- Each skill follows the structure defined in [AGENTS.md](AGENTS.md).

## Packaging

```bash
cd skills
zip -r {skill-name}.zip {skill-name}/
```
