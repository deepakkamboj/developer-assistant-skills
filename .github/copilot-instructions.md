# GitHub Copilot — Repository Instructions

This repository uses a vendor-neutral `.developer/` agent system as the single source of truth.

**Read `.developer/AGENTS.md` first.** Skills are discovered from `.developer/skills/**/SKILL.md`.

Key conventions:
- Open-source developer plugin — **no Microsoft-internal content** (ADO, Power Platform, MAS, S360).
- Single `config.json` resolved from `DEVELOPER_CONFIG` (fallback `~/.developer/config.json`), plus
  `content.md`, `memory.md`, and `notes.md`. No `data/` folder.
- Every skill = folder + `SKILL.md` (`## Role` → `## Context to load` → `## Workflow` with a Step 0
  `TodoWrite` checklist). No `skill.json`.
- Autonomous CI workflows in `.github/workflows/` are disabled by default; enable via repo variables.
- The shared plugin manifest is `.developer/plugin.json`. GitHub and Claude marketplace catalogs
  live at `.github/plugin/marketplace.json` and `.claude-plugin/marketplace.json`.
- Marketplace-installed skills use the plugin namespace, for example `/developer:a11y-fix`.
- Generated prompt adapters are retained only for source-checkout compatibility. Regenerate them
  with `node .developer/scripts/gen-commands.js`. See `usage.md`.

## Official references

GitHub Copilot:
- [About Copilot CLI plugins](https://docs.github.com/copilot/concepts/agents/copilot-cli/about-cli-plugins)
- [Create and use plugin marketplaces](https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/plugins-marketplace)
- [Official Copilot plugins marketplace](https://github.com/github/copilot-plugins)
- [Repository custom instructions](https://docs.github.com/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)
- [Custom agents](https://docs.github.com/copilot/concepts/agents/coding-agent/about-custom-agents)

Claude Code:
- [Create plugins](https://code.claude.com/docs/en/plugins)
- [Create and distribute plugin marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)
- [Discover and install plugins](https://code.claude.com/docs/en/discover-plugins)
- [Plugins reference](https://code.claude.com/docs/en/plugins-reference)
