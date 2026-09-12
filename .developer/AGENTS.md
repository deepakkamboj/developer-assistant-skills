# Repository Agent Instructions — developer-assistant-skills

A **vendor-neutral, open-source** developer plugin for Claude Code, GitHub Copilot, and Codex.
`.developer/` is the canonical source of truth; thin runtime adapters point back to it.

## Source of truth

- Skills: `.developer/skills/<group>/<skill>/SKILL.md`
- Agents: `.developer/agents/`
- Workflows (portable): `.developer/workflows/`
- Commands: `.developer/commands/`
- MCP: `.developer/mcp/`
- Config: `.developer/config/`
- Docs: `.developer/docs/` (see `skill-sources.md` for provenance + rename map)

## Configuration

One `config.json` resolved from `DEVELOPER_CONFIG` (fallback `~/.developer/config.json`), plus a
`content.md` companion and persistent `memory.md` / `notes.md`. There is **no `data/` folder**.
Templates live in `.developer/config/`.

## Skill contract (every skill)

`## Role` → `## Context to load` → `## Workflow` (starting with a `### Step 0: TodoWrite Checklist`,
then `### Steps`) → skill-specific sections. Load config/profile and shared memory first; **ask
instead of hallucinating**; complete the TODO list in order.

## Open-source rule

This is a public plugin. **Remove everything Microsoft-internal**: Azure DevOps (ADO), Power
Platform / Dynamics 365, Power Pages, MAS, Narrator-specific guidance, S360, internal endpoints,
org names, and cert/identity services. Use generic equivalents (GitHub Issues/PRs, WCAG, standard CI).

## Orchestration & bounded autonomy (EASE-MAS)

Generation agents are paired with independent critic/validator agents under a hybrid
supervisor + DAG orchestrator. A traceability graph links requirement → PRD → architecture →
code → test → execution → failure → bug → RCA → repair. Autonomous repair is **bounded**: explicit
max attempts, regression gate, and **human-only merge**. See `.github/workflows/README.md`.

## Permission ladder

L0 read-only · L1 comment · L2 branch+draft-PR · L3 open PR · L4 scheduled dispatch. **Merge stays
human-owned.** Autonomous CI workflows are disabled by default (opt-in via repo variables).

## Change workflow

Understand → Plan → Implement → Validate → Review → Summarize.
