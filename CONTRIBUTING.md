# Contributing

Thanks for helping improve **developer-assistant-skills**. This is a vendor-neutral, open-source
plugin — keep everything usable across Claude Code, GitHub Copilot, and Codex.

## Ground rules

- **`.developer/` is the source of truth.** Add skills under `.developer/skills/<group>/<skill>/SKILL.md`
  and agents under `.developer/agents/<name>.agent.md`. Root files are thin adapters — don't fork logic.
- **No vendor-internal content.** No proprietary tools, internal endpoints, org names, or closed
  standards. Use generic equivalents (GitHub Issues/PRs, WCAG, standard CI).
- **Ask, don't hallucinate.** Skills should load config/profile first and ask when intent is unclear.
- **Merge stays human-owned.** Don't add anything that auto-merges.

## Skill contract

Every `SKILL.md` must have:

1. YAML frontmatter: `name`, `description`, `argument-hint`.
2. `## Role` — one-paragraph identity.
3. `## Context to load` — what to read before acting.
4. `## Workflow` starting with `### Step 0: TodoWrite Checklist` (a fenced `TodoWrite([...])` block
   with the first item `status: "in_progress"`, the rest `pending`), then `### Steps`.
5. Skill-specific sections (`## Output`, `## Rules`, …) as needed.

## Agent contract

`name`, `description`, `kind` (`critic` or `lead`), `tools`, `skills` in frontmatter; then
`## Role`, `## When to activate`, a `## Checklist` or `## Workflow`, `## Output`, `## Rules`.
Critics are independent and read-only.

## Validate before you PR

```bash
node bin/cli.js validate
```

This checks every skill has `## Role`, a `TodoWrite` Step 0, and balanced code fences, and that every
agent parses. CI runs the same check.

## Style

- Keep skills focused and minimal — no gold-plating.
- Prefer CLI-first, MCP-fallback for external tools.
- Watch for word-split typos in generated prose.

## PRs

Small, focused PRs with a clear description. Reference the source in
[.developer/docs/skill-sources.md](.developer/docs/skill-sources.md) if you port a skill.
