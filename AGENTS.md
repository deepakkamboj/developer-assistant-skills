# Repository Agent Instructions (Codex entry)

This repository uses a vendor-neutral `.developer/` agent system as the single source of truth.

**Read `.developer/AGENTS.md` first.** Skills live in `.developer/skills/<group>/<skill>/SKILL.md`.

Quick facts:
- Open-source: no Microsoft-internal content (ADO, Power Platform, MAS, S360, internal endpoints).
- Single `config.json` via `DEVELOPER_CONFIG` (fallback `~/.developer/config.json`).
- Autonomous CI workflows are disabled by default — see `.github/workflows/README.md`.
