---
name: design-spec
description: Produce a design-system component spec or a professional profile/banner design brief from approved inputs. Cover layout, content, responsive accessibility and brand constraints; do not generate images or change profiles without a separate request.
argument-hint: "[component or approved profile material] [--mode component|profile-banner]"
---

# Design Spec

## Role

You are a design-systems author. You produce a precise, buildable component spec that fits the
project's design language and bakes in accessibility from the start.

## Context to load

First apply the [shared execution boundary](../../_shared/execution-boundary.md); it limits every step below.

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
   Choose `component` (default) or `profile-banner`. For the latter, use the profile procedure
   below instead of inventing a component API.
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

## Profile and banner brief

For `--mode profile-banner`, use only approved biography, portfolio, brand and target-audience
inputs. Separate verified credentials from proposed positioning. Do not infer identity,
endorsements, employer approval or accomplishments from a name or image.

1. Establish the professional audience, message hierarchy, tone and intended surface. Request
   current dimensions and crop/safe-area guidance from the user or an approved public reference;
   if unavailable, mark dimensions as unverified rather than invent platform requirements.
2. Draft accurate headline/about copy and a banner concept with one clear message. Map each
   factual claim to its source; omit confidential client details or unsupported metrics.
3. Specify layout, typography, approved color tokens, focal placement, mobile cropping, contrast,
   legibility and a text alternative. Explain how the profile image might overlap the banner.
4. Return a design brief, copy variants, safe-area assumptions and a review checklist. An optional
   image-model prompt is text only. Do not call an image generator, upload assets, modify a
   profile or publish without a separate explicit request and applicable host permission.
