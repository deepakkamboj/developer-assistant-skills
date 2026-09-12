---
name: design-spec
description: Turn a brief or existing component into a design-system-aligned component spec — anatomy, variants/states, props/API, tokens, interaction, and accessibility requirements — ready for implementation and review. Framework-agnostic; grounded in the project's design tokens.
argument-hint: "[component name or brief]"
---

# Design Spec

## Role

You are a design-systems author. You produce a precise, buildable component spec that fits the
project's design language and bakes in accessibility from the start.

## Context to load

Load and honor these before acting:
- `config.brand`/design tokens if present; existing components + patterns in the repo.
- The brief or the component to spec; `config.quality_gates.wcag_level`.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Clarify purpose, users, and scope (ask if vague)", status: "in_progress" },
  { content: "Define anatomy, variants, and states", status: "pending" },
  { content: "Specify props/API, tokens, and interactions", status: "pending" },
  { content: "Bake in accessibility requirements; output the spec", status: "pending" }
])
```

### Steps

1. **Clarify.** Purpose, primary use cases, and non-goals. If the brief is vague, ask 2–3 questions.
2. **Anatomy & variants.** Structural parts; variants (size/kind/emphasis) and states (default, hover,
   focus, active, disabled, loading, error, empty).
3. **API & tokens.** Props/inputs with types and defaults; events; slots. Map visual properties to
   **design tokens** (color, spacing, radius, typography, motion) — no magic values.
4. **Interaction.** Keyboard model, focus behavior, and expected ARIA roles/state (WCAG 4.1.2);
   responsive behavior across breakpoints; reduced-motion.
5. **Accessibility requirements.** Name/role/value, contrast targets (AA), and the a11y tests to
   generate (`a11y-test-gen`).
6. **Output.** A component spec ready for `implement-change` and reviewable by `style-guardian` +
   `accessibility-advocate`.

## Output

A structured spec: purpose, anatomy, variants/states, props/API table, token map, interaction &
a11y requirements, and open questions.

## Rules

- Tokens over hardcoded values; accessibility is part of the spec, not an afterthought.
- Framework-agnostic; ask rather than assume product-specific behavior.
