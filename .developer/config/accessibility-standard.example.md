# Organization Accessibility Standard (optional overlay)

This repo ships **WCAG 2.1/2.2 Level AA only** — no vendor-specific standard is bundled or assumed.
If your organization has an internal accessibility standard that is stricter than WCAG AA in places
(a common pattern: same baseline as WCAG, plus a few tighter numeric thresholds and a mandated
assistive-technology test matrix), copy this file to a private path (e.g.
`~/.developer/accessibility-standard.md`), fill in the placeholders, and point
`config.quality_gates.accessibility_standard_file` at it.

**Do not commit a filled-in copy of this file into an open-source repo** — keep organization-specific
standards outside the tree (`~/.developer/…` or another private config path), the same way secrets
are kept out of `config.json`.

## Precedence

Skills treat this file as **additive to WCAG, not a replacement**: they always cite the WCAG success
criterion first, and apply your stricter number only where it's actually stricter. If this file is
absent or `accessibility_standard_file` is unset, skills use WCAG AA only — that's the shipped
default.

## How this relates to WCAG

Fill in your organization's actual numbers; delete rows that don't differ from WCAG.

| Area | WCAG 2.1/2.2 AA | Our standard |
|------|-----------------|--------------|
| Contrast — normal text | 4.5:1 | _fill in, or delete if same_ |
| Contrast — large text | 3:1 | _fill in_ |
| Contrast — UI components/focus indicators | 3:1 | _fill in_ |
| Touch target size | 24×24px (2.5.8) | _fill in, e.g. 44×44px_ |
| Required assistive-technology test matrix | Any AT (4.1.2) | _name the specific screen reader/OS/browser combinations your org requires_ |

## Additional requirements beyond WCAG

<!-- List anything your org requires that WCAG doesn't mandate, e.g.:
- Dark-mode support (`prefers-color-scheme: dark`) is required, not just recommended.
- A specific component library must be used for interactive widgets because it's pre-verified.
-->

## Approved component library / design system

<!-- e.g. "Prefer <YourDesignSystem>'s <Button>/<Dialog>/<Combobox> — they're pre-verified against
this standard; a custom-built equivalent needs a manual accessibility review before merge." -->

## PR documentation requirement (optional)

<!-- e.g.: When a change fixes an assistive-technology-specific bug, require the PR description to
include a before/after of what the screen reader announces, and which AT/browser combo was tested. -->
