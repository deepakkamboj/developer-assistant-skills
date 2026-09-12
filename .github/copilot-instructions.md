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
- Skills are invocable as `/<skill>` via `.github/prompts/*.prompt.md` (enable the `chat.promptFiles`
  setting; regenerate with `node .developer/scripts/gen-commands.js`). See `usage.md`.
