# Screen Reader / Assistive Technology Notes (optional overlay)

This repo's accessibility skills verify against **WCAG 2.1/2.2 AA**, which is platform- and
AT-agnostic by design. In practice, individual screen readers/browsers sometimes diverge from the
generic accessibility-tree model WCAG assumes. If your team has found and fixed platform-specific
quirks (with NVDA, JAWS, VoiceOver, a Windows/Linux/mobile screen reader, etc.) that are worth
codifying so they don't regress, copy this file to a private path (e.g.
`~/.developer/screen-reader-notes.md`), fill in your own findings, and point
`config.quality_gates.screen_reader_notes_file` at it.

This file ships **empty of any vendor-specific content** — the patterns below are generic examples
to show the shape; replace them with what your team has actually observed and tested.

## Precedence

This file supplements WCAG's Name/Role/Value criterion (4.1.2) with concrete, tested AT behavior. It
never overrides WCAG — it documents *how* to satisfy 4.1.2 correctly for the assistive technologies
your product is tested against.

## Control-type → required accessible-name pattern (example shape)

| UI element | HTML | What actually gets announced correctly |
|---|---|---|
| Text field | `<input type="text">` | An associated `<label>` or `aria-label` — `placeholder` alone is **not** announced as the accessible name by most screen readers |
| Required field | `<input required>` | Add `aria-required="true"` explicitly; some AT/browser combos don't expose the native `required` attribute as "required" |
| Error state | Styling only | `aria-invalid="true"` + `aria-describedby` pointing at the error text — a red border alone announces nothing |
| Validation error | Inline text | `role="alert"` or `aria-live="assertive"` so it's announced without requiring focus to move |
| Toggle button | `<button>` | `aria-pressed="true|false"` — a CSS class alone isn't exposed as state |
| Disclosure | `<button>` expand/collapse | `aria-expanded="true|false"` |

## Known pitfalls (replace with your team's actual findings)

**1. Placeholder is not a label.**
```html
<!-- WRONG — no accessible name is announced -->
<input type="email" placeholder="Enter your email" />

<!-- CORRECT -->
<label for="email">Email</label>
<input type="email" id="email" placeholder="Enter your email" />
```

**2. Validation errors must be programmatically associated, not just visually adjacent.**
```html
<!-- WRONG — AT sees the red border but announces nothing -->
<input type="text" class="error" />
<span class="error-text">This field is required</span>

<!-- CORRECT -->
<input type="text" id="name" aria-required="true" aria-invalid="true" aria-describedby="name-error" />
<span id="name-error" role="alert">This field is required</span>
```

**3. Button/toggle state must be exposed via ARIA state, not a CSS class.**
```html
<!-- WRONG — announced as "Save, button" regardless of state -->
<button class="saving">Save</button>

<!-- CORRECT -->
<button aria-pressed="true">Save</button>
```

## High contrast / forced-colors specifics (example shape)

If your target AT/OS combination has known forced-colors quirks beyond the generic `currentColor` /
`@media (forced-colors: active)` guidance already in `a11y-review`, document the specific pattern and
a tested fix here.

## PR documentation requirement (optional)

<!-- e.g.: When a change fixes a screen-reader announcement bug, require the PR description to
include:

## Screen Reader Impact
**Before:** <what was announced, or that nothing was announced>
**After:** <exact announcement text>
Tested with: <screen reader> on <OS/browser>
-->
