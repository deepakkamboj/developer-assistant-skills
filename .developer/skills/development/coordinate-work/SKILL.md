---
name: coordinate-work
description: Build an optional dependency-aware plan for independent tasks with explicit write ownership, integration gates and bounded execution. Default to one worker; use multiple agents only when the user authorizes them and the host supports them.
argument-hint: "[approved tasks or implementation plan] [--plan-only] [--workers <approved-limit>]"
---

# Coordinate Work

## Role

You are a task coordinator, not an automatic agent dispatcher. Make dependencies and ownership
visible, then execute only the coordination that the user and host have authorized.

## Context to load

- Host/repository instructions, `DEVELOPER_CONFIG` or `~/.developer/config.json`, profile and
  relevant `content.md`, `memory.md` and `notes.md`. Report missing context or runtime support.
- Approved implementation plan, acceptance checks, candidate identity, writable paths and
  task/time/attempt limits. A worker count is not permission to create workers.
- Existing task graph and active owners where available; do not invent orchestration tools.

## Workflow

### Step 0: TodoWrite Checklist

Use a supported task facility or keep this as a plain checklist:

Portable checklist notation below is illustrative, not an available API call:
```text
TodoWrite([
  { content: "Define deliverables, owners and prerequisites", status: "in_progress" },
  { content: "Check cycles, overlap and permission boundaries", status: "pending" },
  { content: "Select sequential or explicitly approved parallel work", status: "pending" },
  { content: "Track evidence and integrate through one owner", status: "pending" },
  { content: "Report completed, blocked and pending tasks", status: "pending" }
])
```

### Steps

1. **Split by outcome.** Give each task a stable ID, deliverable, acceptance check, inputs,
   writable/read-only paths, owner, estimated effort and stop condition. Avoid dividing one
   continuous investigation into agents that must repeatedly reconstruct the same context.
2. **Build the DAG.** Add only real prerequisite edges. Check for cycles and unresolved inputs.
   Distinguish finish-to-start dependencies from shared read access. Overlapping writes or shared
   mutable fixtures require one owner or sequential execution, not optimistic parallel edits.
3. **Choose execution.** Default to one worker doing ready tasks in order. With explicit user
   authorization and a supported host, propose only as many independent workers as useful.
   Honor the approved limit and runtime-specific restrictions. If support is missing, return
   the DAG or continue sequentially; do not simulate successful dispatch.
4. **Bound each dispatch.** When dispatch is authorized, supply the whole task, relevant
   instructions, approved inputs, path ownership, allowed tools/actions, dependencies,
   acceptance checks, budget and return format. Do not permit nested fanout by default.
   Share only approved context. An agent's instructions cannot expand the user's permission.
5. **Track actual progress.** Mark pending, ready, running, blocked or done from observed events.
   A task is done only when its deliverable and checks exist. Failed prerequisites block
   dependents. Capture blockers and stop/replan when scope or assumptions change.
6. **Integrate once.** One named integration owner combines completed changes, resolves overlaps
   without overwriting local work and runs `verify-change` on the combined exact candidate.
   Per-task green checks do not prove integration. Independent review remains separate.
7. **Report.** List task IDs, dependencies, owner, status, evidence and next action. Retain the
   approved plan and report incomplete work; do not commit, publish or merge the aggregate.

## Output

A dependency/ownership table or supported DAG representation, execution choice and approval
state, bounded worker packets if authorized, and an integration evidence report.

## Rules

- Default L0 planning. Scoped implementation uses existing authorization only.
- L0 read-only, L1 comments, L2 branch/draft PR, L3 open PR, L4 scheduled dispatch are ceilings;
  none grants automatic fanout. Merge is human-only.
- No automatic commits, external messages/publication, infrastructure or installs.
- Do not relabel an unverified worker assertion as evidence or bypass independent verification.
