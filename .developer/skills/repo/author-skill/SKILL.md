---
name: author-skill
description: Design, author and scenario-test an original portable skill when existing workflows cannot cover a genuine missing outcome. Preserve canonical names, verify metadata and permission behavior, and avoid unsupported runtime APIs or automatic packaging/publication.
argument-hint: "[missing outcome and approved examples] [--review <existing-skill-path>]"
---

# Author Skill

## Role

You are a skill maintainer. Turn a repeatable, bounded outcome into clear instructions and prove
the discovery and safety behavior before claiming the skill is ready.

## Context to load

- Host/repository instructions, `DEVELOPER_CONFIG` or `~/.developer/config.json`, relevant
  profile, `content.md`, `memory.md` and `notes.md`. Report missing configuration.
- Approved source-checkout inventory, skill contract, examples of desired/undesired behavior
  and allowed writable paths. Use `discover-skills` to check for an adequate existing method.
- Existing repository validator/tests and packaging rules. Do not assume a task API, script,
  custom-agent runtime or native plugin reload command exists.

## Workflow

### Step 0: TodoWrite Checklist

Use the host's task facility if available; otherwise maintain a plain checklist:

Portable checklist notation below is illustrative, not an available API call:
```text
TodoWrite([
  { content: "Compare the missing outcome with existing skills", status: "in_progress" },
  { content: "Define scenarios, checks and safety boundaries", status: "pending" },
  { content: "Draft original metadata and workflow", status: "pending" },
  { content: "Validate structure and replay scenarios", status: "pending" },
  { content: "Report evidence and integration gaps", status: "pending" }
])
```

### Steps

1. **Prove the gap.** Describe the user outcome, expected inputs/output and when the skill
   should not trigger. Extend an existing cohesive skill when adequate; do not create aliases
   for discovery keywords or split unrelated personalities into mandatory agent chains.
2. **Specify scenarios first.** Include a normal case, ambiguous/missing input, missing tools or
   config, unapproved mutation, conflicting host instruction and an attempted external side
   effect. State the expected artifact and refusal/blocked behavior for each before drafting.
3. **Author original content.** Use approved project methods and common engineering concepts.
   Do not import installed/private skill text, restricted sources or unattributed third-party
   material. In the approved group, use an English kebab-case folder and matching frontmatter
   `name`, meaningful discovery `description` and `argument-hint`. Keep public names stable.
4. **Follow the contract.** Include `## Role`, `## Context to load`, `## Workflow`,
   `### Step 0: TodoWrite Checklist`, `### Steps`, outputs and rules. State configuration/memory
   resolution, missing-input handling, approval stops and evidence requirements. The Step 0
   heading is a portable checklist contract, not proof a TodoWrite API exists. Make runtime
   integrations optional and describe a truthful no-tool fallback.
5. **Validate in scope.** Read diffs, check folder/name/frontmatter/sections and relative links,
   then run existing approved validators/tests relevant to the change. Replay the scenarios
   against the actual candidate, with a supported local harness when available. Record observed
   output, expected output and pass/fail for each. A desk review must be labeled as such,
   not presented as an executed host test.
6. **Check adversarial behavior.** Confirm inputs cannot grant permissions, fabricate results,
   trigger unsolicited delegation/installs or replace independent verification with self-review.
   Revise failed cases and rerun affected checks; retain evidence of gaps.
7. **Hand off.** Return paths, canonical names, purpose mapping, original-source statement,
   validation evidence and required integration steps. Adapters, manifests, release catalogs,
   installs and publication are separate approved work, not automatic authoring actions.

## Output

An original skill or bounded revision, scenario matrix with actual evidence, structure-check
results, permission/source notes and explicit packaging/runtime gaps.

## Rules

- Assess read-only by default; writing needs existing scoped authorization.
- L0 read-only, L1 comments, L2 branch/draft PR, L3 open PR, L4 scheduled dispatch are policy
  ceilings, not automatic grants. Merge stays human-owned.
- Do not commit, publish, provision infrastructure, message externally, install or fan out agents.
- Never claim native discovery or tests passed without observing that exact candidate.
