<div align="center">

```
     ____                 _                              _              _     _ _ _
    |  _ \  _____   __   / \   ___ ___(_)___| |_ __ _ _ __ | |_    / \  ___ ___(_)__| | ___
    | | | |/ _ \ \ / /  / _ \ / __/ __| / __| __/ _` | '_ \| __|  / _ \/ __/ __| / _` |/ _ \
    | |_| |  __/\ V /  / ___ \\__ \__ \ \__ \ || (_| | | | | |_  / ___ \\__ \__ \ (_| |  __/
    |____/ \___| \_/  /_/   \_\___/___/_|___/\__\__,_|_| |_|\__|/_/   \_\___/___/_\__,_|\___|
                           S  K  I  L  L  S   ·   full software lifecycle, closed-loop
```

# developer-assistant-skills

**A vendor-neutral, open-source developer plugin for Claude Code, GitHub Copilot, and Codex.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%E2%89%A518-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Claude Code](https://img.shields.io/badge/Claude_Code-ready-D97757?logo=anthropic&logoColor=white)](https://docs.anthropic.com/claude/docs/claude-code)
[![GitHub Copilot](https://img.shields.io/badge/GitHub_Copilot-ready-000000?logo=githubcopilot&logoColor=white)](https://github.com/features/copilot)
[![Codex](https://img.shields.io/badge/Codex-ready-412991?logo=openai&logoColor=white)](https://openai.com)
[![Playwright](https://img.shields.io/badge/Playwright-tested-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev)
[![axe-core](https://img.shields.io/badge/axe--core-WCAG_AA-663399)](https://github.com/dequelabs/axe-core)
[![MCP](https://img.shields.io/badge/MCP-CLI--first-blue)](https://modelcontextprotocol.io)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

Best-of-breed **skills** and **agents** for the full software lifecycle — requirements,
architecture, design, implementation, review, testing, accessibility, debugging, and **bounded
autonomous repair** — usable from Claude Code, GitHub Copilot, or Codex.

The canonical source of truth is [`.developer/`](.developer/); thin runtime adapters point back to it.

📖 **Documentation site:** https://deepakkamboj.github.io/developer-assistant-skills/ (Nextra site in [`website/`](website/)).

- **34 skills** across 10 lifecycle groups · **20 agents** (15 review critics + 5 leads/validators)
- **Closed-loop (EASE-MAS):** orchestrator + traceability graph + independent critics; repair is
  bounded with a regression gate and **human-only merge**
- **CLI-first, MCP-fallback** tooling (`gh`, `az`, `npx playwright`, `npx axe`)

## Quick start

```bash
# 1. Point the plugin at your config (or use ~/.developer/config.json)
cp .developer/config/config.example.json ~/.developer/config.json
export DEVELOPER_CONFIG=~/.developer/config.json     # PowerShell: $env:DEVELOPER_CONFIG="$HOME/.developer/config.json"

# 2. Explore what's available
node bin/cli.js list skills
node bin/cli.js list agents
node bin/cli.js validate            # structural check on every skill/agent
```

Then invoke a skill from your assistant (see **[usage.md](usage.md)**):

- **Claude Code:** `/dev:code-review`, `/dev:fix-bug`, `/dev:a11y-scan`, …
- **GitHub Copilot:** enable prompt files, then `/code-review`, `/fix-bug`, …
- **Codex / any agent:** read `.developer/AGENTS.md` and reference the skill by path.

## What's inside

| Group | Skills |
|-------|--------|
| **requirements** | `from-requirements`, `grade-spec` |
| **architecture** | `graph-repo`, `architecture-doc`, `threat-model` |
| **design** | `design-spec`, `from-figma` |
| **development** | `start-feature`, `implement-change`, `refactor` |
| **repo** | `sweep-codebase` |
| **review** | `code-review`, `deliberate`, `pr-learn` |
| **testing** | `test-plan`, `validate-scenario`, `coverage-gap`, `flaky-test` |
| **testing/playwright** | `playwright-auth`, `run-tests`, `author-test`, `verify-test`, `update-test` |
| **accessibility** | `a11y-scan`, `a11y-review`, `a11y-test-gen`, `a11y-fix`, `a11y-verify` |
| **debugging** | `analyze-bug`, `root-cause`, `fix-bug`, `fix-test` |
| **devops** | `fix-ci`, `release-readiness` |

**Agents** — 15 review critics (`code-reviewer`, `security-advocate`, `architecture-advocate`,
`performance-advocate`, `accessibility-advocate`, `unit-testing-advocate`, `e2e-test-author`,
`manual-tester`, `observability-advocate`, `dependency-manager`, `style-guardian`,
`internationalization-expert`, `documentation-steward`, `refactorer`, `debugger`) plus 5 leads/gates
(`supervisor`, `traceability-keeper`, `bug-exterminator`, `repair-validator`, `a11y-tester`).

Full details in **[usage.md](usage.md)**.

## Design

- **`.developer/` canonical tree:** `skills/` (grouped by lifecycle), `agents/`, `workflows/`,
  `commands/`, `mcp/`, `config/`, `docs/`, `scripts/`.
- **Single config:** `config.json` via `DEVELOPER_CONFIG` (fallback `~/.developer/config.json`) +
  `content.md` / `memory.md` / `notes.md`. No `data/` folder.
- **Skill contract:** `## Role` → `## Context to load` → `## Workflow` (Step 0 `TodoWrite` → Steps).
  Ask, don't hallucinate.
- **Open-source:** no vendor-internal content.
- **Provenance + rename map:** [.developer/docs/skill-sources.md](.developer/docs/skill-sources.md);
  authoritative architecture in [.developer/docs/design.md](.developer/docs/design.md).

## Autonomous CI/CD (disabled by default)

[`.github/workflows/`](.github/workflows/) includes autonomous bug fix, test fix, product-bug repair,
agent code review, and evals — all **disabled by default** and safe (draft PRs only, no auto-merge).
Enable via repo variables. See [.github/workflows/README.md](.github/workflows/README.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Every skill must satisfy the contract and pass
`node bin/cli.js validate`.

## License

[MIT](LICENSE).
