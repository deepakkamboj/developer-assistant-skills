---
name: a11y-review-links
description: Review WCAG 2.4.4 link purpose in programmatic context across navigation, cards, tables, image links and SPA routes without treating repeated generic text as an automatic failure.
argument-hint: "[file, folder or URL]"
---

# Link-purpose review

## Role

Read-only WCAG 2.4.4 specialist. Establish actual link purpose and destination from the computed
name and valid programmatically determined context, not a list of forbidden phrases.

## Context to load

Load [shared instructions](../../../config/accessibility/shared-instructions.md), requested
navigation/content and rendered names, relationships and destinations. Source-only findings
remain candidates where runtime context is necessary.

## Workflow

### Step 0: TodoWrite Checklist

```text
TodoWrite([
  { content: "Confirm link scope", status: "in_progress" },
  { content: "Resolve names and context", status: "pending" },
  { content: "Verify actual destinations", status: "pending" },
  { content: "Report findings and gaps", status: "pending" }
])
```

### Steps

1. Inventory navigation, repeated cards/articles/products, table links, linked images, downloads,
   skip links and SPA destinations. Resolve actual names, including referenced labels and
   hidden text, plus valid sentence/paragraph/list/table context.
2. Treat "click here", "learn more", bare URLs and identical text with different destinations
   as discovery hints, not violations. Context can satisfy 2.4.4; an isolated links list does not
   erase it. Do not assume nearby visual text is programmatically related.
3. Distinguish an accessible description from the name; `aria-describedby` does not automatically
   add words to the name. For image links assess destination/function and redundant alternatives.
4. Verify approved real navigation and skip-link destination/focus, including dynamic route titles
   and repeated identification. Do not follow destructive/logout links merely for a test.
5. Where purpose is actually missing, prefer clearer visible localized text or an existing valid
   relationship. Preserve visible-label-in-name and IDs in repeated components; do not replace
   a correct visible name with a guessed ARIA override.
6. Keep 2.4.9 link purpose alone (AAA), useful new-window/download notices and security `rel`
   policy separate from AA findings unless an applicable configured policy requires them.

## Output

Report link/source/selector, route/state/build, name versus description, programmatic context,
destination, actual ambiguity/user impact, applicable criterion, evidence/status, minimal
recommendation and verification. Route changes to `a11y-fix`; keep missing navigation evidence
blocked/not-run rather than a passing link test.
