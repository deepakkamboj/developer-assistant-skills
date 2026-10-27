# Accessibility capability synchronization

The public plugin retains its original seven accessibility skills and adds six focused review
entry points. `a11y-review --mode interactive|contrast|color|links|modes|viewports|all` remains
available; focused skills supply deeper procedures without replacing the combined workflow.
There are now 13 accessibility skills, plus two portable repository-readiness/version workflows.
The complete plugin has 44 skills and 21 agents.

## Shared design

All accessibility skills and agents load
[shared instructions](../config/accessibility/shared-instructions.md). This is the single
entry point to the 55-criterion WCAG 2.2 A/AA map, WCAG 2.1 version boundaries, ten inspection
families, ten bounded repair families and twenty scenario-specific verification checks.
Only shared instructions enumerate those reference paths; workflows select applicable content.

The additions are Markdown procedures, not new scanners or proof of product conformance.
Use existing pinned project tooling, source ownership, exact consumer build and actual
browser/AT evidence. Static matches are candidates; missing required checks remain blocked
or untested. No automatic installs, authentication, baseline acceptance, merge or issue closure.

## Capability map

| Source role | Portable destination |
|---|---|
| Static/live discovery | `a11y-scan`, all applicable families and focused reviews |
| Native/custom interaction | `a11y-review-interactive`, including grids/trees/editors, drag and virtualization |
| Text/non-text contrast | `a11y-review-contrast`, actual compositing and unrounded ratios |
| Color-independent meaning | `a11y-review-color`, visible information rather than ARIA alone |
| Link purpose in context | `a11y-review-links`, real names/context/destinations and valid exceptions |
| Display modes | `a11y-review-modes`, actual browser/OS evidence and AA/AAA boundaries |
| Viewport/resize/reflow | `a11y-review-viewports`, seven checkpoints plus task-specific widths/states |
| Bounded native-first repair | Existing `a11y-fix`, shared repair hypotheses and issue-history eligibility |
| Independent fix verification | Existing `a11y-verify` name and five evidence-based verdicts |
| Scenario-specific regression generation | Existing `a11y-test-gen`, negative/adjacent cases and separate manual AT rows |
| Accessible development | Existing `a11y-dev`, broadened content/forms/media/time/input guidance |
| Shareable reporting | Existing `a11y-report` name, Markdown/HTML and approved GitHub issue filing |
| Read-only evidence review | New `a11y-reviewer` critic; existing tester lead and diff advocate retained |
| Capability/access readiness | `repo/prereq-check`, platform-appropriate read-only target checks |
| Plugin release inventory | `repo/plugin-version-check`, actual configured host/catalog, SemVer and approval-only plans |

Invoke installed skills as `/developer:<name>`, for example:

```text
/developer:a11y-review-interactive
/developer:a11y-review --url <approved-url> --mode all
/developer:prereq-check
/developer:plugin-version-check
```

## Deliberate boundaries

- FastPass and Lighthouse changes are excluded by request.
- Internal tracker/cloud/service integrations, organization endpoints and vendor-specific
  standards are not copied. Use existing GitHub and optional configured policy equivalents.
- The release-inventory and prerequisite capabilities are portable Markdown workflows using
  verified host/project tools, not copies of source-provider-specific helper scripts.
- No held execution-foundation/CI/baseline runtime is imported.
- Existing report formats, configuration/profile/memory conventions, bounded repair limits,
  host adapters, namespace and public plugin release identity are retained.
- Skills do not carry individual versions. No package release, publication, commit or push is
  implied by local synchronization.

This is functional adaptation, not byte-for-byte mirroring. When refreshing from source, preserve
the public boundaries, run `npm test`, regenerate adapters and the website catalog, then review
family/scenario coverage and all relative links. Fixture/text contracts validate packaging and
instructions; they do not prove accessibility of an actual application.
