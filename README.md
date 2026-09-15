<div align="center">


<p align="center">

<img alt="developer-assistant-skills" src="./website/public/dev-assist.png">
</p>


# developer-assistant-skills

**A vendor-neutral, open-source developer plugin for Claude Code, GitHub Copilot, and Codex.**
<br>full software lifecycle, closed-loop

[![npm version](https://img.shields.io/npm/v/developer-assistant-skills?logo=npm&color=cb3837)](https://www.npmjs.com/package/developer-assistant-skills)
[![CI](https://github.com/deepakkamboj/developer-assistant-skills/actions/workflows/ci.yml/badge.svg)](https://github.com/deepakkamboj/developer-assistant-skills/actions/workflows/ci.yml)
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

### Install the namespaced plugin

Register the marketplace and install the `developer` plugin for your user account. The plugin is
then available in every project.

**GitHub Copilot CLI:**

```bash
copilot plugin marketplace add deepakkamboj/developer-assistant-skills
copilot plugin install developer@developer-assistant-skills
```

**Claude Code:**

```bash
claude plugin marketplace add deepakkamboj/developer-assistant-skills
claude plugin install developer@developer-assistant-skills --scope user
```

Invoke any installed skill through the plugin namespace:

```text
/developer:a11y-fix
/developer:code-review
/developer:fix-bug
```

The marketplace catalogs live in `.github/plugin/marketplace.json` and
`.claude-plugin/marketplace.json`. Both point to `.developer/`, the shared plugin root containing
`plugin.json`, `skills/`, and `agents/`.

### Install the catalog CLI

The npm package also provides the standalone `dev-skills` command for listing, validating, and
diagnosing the catalog. Installing this CLI does not copy skills into an assistant folder; use the
commands above for assistant integration.

```bash
npm install --global developer-assistant-skills

dev-skills list skills
dev-skills list agents
dev-skills validate
dev-skills doctor
```

### Use a source checkout

Contributors and users who want the full canonical tree and generated slash-command adapters can
clone the repository:

```bash
git clone https://github.com/deepakkamboj/developer-assistant-skills.git
cd developer-assistant-skills

# Point the plugin at your config (or use ~/.developer/config.json)
cp .developer/config/config.example.json ~/.developer/config.json
export DEVELOPER_CONFIG=~/.developer/config.json     # PowerShell: $env:DEVELOPER_CONFIG="$HOME/.developer/config.json"

node bin/cli.js validate
```

Then invoke a namespaced skill from your assistant (see **[usage.md](usage.md)**):

- **Claude Code / GitHub Copilot CLI:** `/developer:code-review`, `/developer:fix-bug`, `/developer:a11y-scan`, …
- **Codex / any agent:** read `.developer/AGENTS.md` and reference the skill by path.

For scheduled and event-driven recipes, see the **[automation prompt library](automations/README.md)**
for Microsoft 365 Copilot, GitHub Copilot, and Microsoft Scout.

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
