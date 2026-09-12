---
name: graph-repo
description: Build a queryable code graph of a repository — modules, files, and symbols (functions/classes/exports) with import, call, and dependency edges — exported as JSON plus a Mermaid/HTML visualization. Powers impact analysis for review, refactor, debugging, and bounded repair.
argument-hint: "[path (default: repo root)] [--lang auto] [--out output/code-graph] [--query \"who calls X\"]"
---

# Graph Repo

## Role

You are a code-cartographer. You turn a repository into a graph of its structure and dependencies so
other skills (review, refactor, RCA, repair) can reason about impact and blast radius.

## Context to load

Load and honor these before acting:
- The target repo/path; its languages, build files, and module layout.
- `config.paths.output_dir` (where the graph JSON/diagram are written); `config.repo`.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Detect languages, entry points, and module layout", status: "in_progress" },
  { content: "Extract nodes (modules/files/symbols) and edges (imports/calls/deps)", status: "pending" },
  { content: "Write the graph JSON + a Mermaid/HTML visualization", status: "pending" },
  { content: "Answer any --query (impact / callers / dependents)", status: "pending" }
])
```

### Steps

1. **Detect.** Identify languages, package/build manifests, and top-level modules. Scope to
   `$ARGUMENTS` path (default repo root); respect ignore files (`.gitignore`, build output).
2. **Extract nodes.**
   - `module`/`package` (from manifests/dir structure)
   - `file`
   - `symbol` (function/class/method/exported const) — prefer the language's own tooling (e.g.,
     `tsc`/language server, `ast`/`ctags`, `go list`) and fall back to structured parsing; use
     `grep`/ripgrep for import/export scanning.
3. **Extract edges.**
   - `imports` (file → file/module, from import/require/use statements)
   - `calls` (symbol → symbol, where statically resolvable; mark unresolved as best-effort)
   - `depends_on` (module → external dependency, from manifests/lockfiles)
   - `defines`/`contains` (module → file → symbol)
4. **Write outputs** under `output_dir/code-graph/`:
   - `graph.json` — `{ nodes: [{id,type,path,name,lang}], edges: [{from,to,type}] }`
   - `graph.mmd` / `graph.html` — a Mermaid diagram (collapsed to modules for readability, with a
     drill-down note). Cap node count in the visual; keep the full graph in JSON.
5. **Query (optional).** If `--query` is given, answer over the graph: callers/dependents of a symbol,
   the impact set of changing a file/module (transitive `imports`/`calls`), cycles, or orphan/dead
   nodes. Report the affected set with paths.

## Output

The graph file paths, a summary (N modules, N files, N symbols, N edges; cycles/orphans found), and
the answer to any `--query`.

## Rules

- Be honest about resolution limits: mark dynamically-dispatched/unresolved edges as best-effort;
  never fabricate call edges you can't substantiate.
- Deterministic output; keep the full graph in JSON and a readable (summarized) diagram separately.
- Language-agnostic: prefer each language's real tooling before heuristic parsing.
