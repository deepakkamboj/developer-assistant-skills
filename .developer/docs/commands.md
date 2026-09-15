# Commands

Skills are invocable as slash commands in each runtime. The command/prompt files are **generated
adapters** — they contain no logic, they just point at the canonical `SKILL.md`.

## Generate / refresh

```bash
node .developer/scripts/gen-commands.js
```

This writes:

- **Claude Code:** `.claude/commands/dev/<skill>.md` → invoke as `/dev:<skill>`
- **GitHub Copilot:** `.github/prompts/<skill>.prompt.md` → invoke as `/<skill>`
  (enable the `chat.promptFiles` setting)

Re-run the generator whenever you add, rename, or remove a skill. Do not hand-edit the generated
files — change the `SKILL.md` (name/description/argument-hint) and regenerate.

## Codex / other runners

Point the agent at [`../AGENTS.md`](../AGENTS.md) and reference a skill by path, e.g.
`.developer/skills/review/code-review/SKILL.md`.