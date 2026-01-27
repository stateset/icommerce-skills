# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Cursor, Copilot, etc.) when working with code in this repository.

## Repository Overview

A collection of skills for ecommerce customer support and operations automation, distilled from the workflows and activities in /home/dom/next-temporal.

## Creating a New Skill

### Directory Structure

```
skills/
  {skill-name}/
    SKILL.md
    references/  # optional
    scripts/     # optional
  {skill-name}.zip
```

### Naming Conventions

- Skill directory: kebab-case (e.g., customer-response-workflows)
- SKILL.md: uppercase, exact filename
- Scripts: kebab-case.sh
- Zip file: matches directory name exactly

### SKILL.md Format

```markdown
---
name: {skill-name}
description: {One sentence describing when to use this skill. Include trigger phrases like "Add a response workflow", "Sync Shopify orders", etc.}
---

# {Skill Title}

{Brief description of what the skill does.}

## How It Works
{Numbered list explaining the workflow.}

## Usage
{Explain when to use the skill and what files to touch. If a script exists, provide the bash command.}

## Output
{Example output or status shape.}

## Present Results to User
{Template for how the agent should summarize results.}

## Troubleshooting
{Common issues and fixes.}
```

### Best Practices for Context Efficiency

- Keep SKILL.md under 500 lines; put detailed reference material in references/.
- Write specific descriptions so the skill triggers reliably.
- Use progressive disclosure; link directly to supporting files.
- Prefer scripts for repeated logic or deterministic steps.
- Avoid duplicating large reference content in multiple skills.

### Script Requirements (If Scripts Exist)

- Use `#!/bin/bash` shebang
- Use `set -e` for fail-fast behavior
- Write status messages to stderr: `echo "Message" >&2`
- Write machine-readable output (JSON) to stdout
- Include a cleanup trap for temp files
- Reference the script path as `/mnt/skills/user/{skill-name}/scripts/{script}.sh`

### Creating the Zip Package

After creating or updating a skill:

```bash
cd skills
zip -r {skill-name}.zip {skill-name}/
```

### End-User Installation

Claude Code:
```bash
cp -r skills/{skill-name} ~/.claude/skills/
```

claude.ai:
Add the skill to project knowledge or paste SKILL.md contents into the conversation.

If the skill requires network access, instruct users to add required domains at `claude.ai/settings/capabilities`.
