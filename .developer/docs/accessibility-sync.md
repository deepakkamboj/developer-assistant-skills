# Accessibility capability synchronization

The public plugin retains its original seven accessibility skills. All six detailed review
procedures are combined into `a11y-review`, selected through
`--mode interactive|contrast|color|links|modes|viewports|all`. Tester and reviewer responsibilities
are combined into `a11y-tester` with separate audit, read-only review and verification modes.
Two portable repository-readiness/version workflows are also available.
The complete plugin has 38 skills and 20 agents.

## Shared design

All accessibility skills and agents load
[accessibility guidance](../config/accessibility.md). This single maintained document has
scoped headings for shared instructions, the 55-criterion WCAG 2.2 A/AA map, WCAG 2.1 boundaries,
ten inspection families, ten bounded repair families, twenty verification scenarios and optional
private organization/AT templates. Workflows select applicable sections rather than duplicating
policy or maintaining separate config documents.

`a11y-tester` preserves the former reviewer's source tracing, dependency/version investigation,
sampling limits and evidence-based output. Review mode stays read-only. Independent verification
still uses `a11y-verify` in a fresh verifier context or an attributable independent tester;
an author cannot certify their own repair as independently verified.

The additions are Markdown procedures, not new scanners or proof of product conformance.
Use existing pinned project tooling, source ownership, exact consumer build and actual
browser/AT evidence. Static matches are candidates; missing required checks remain blocked
or untested. No automatic installs, authentication, baseline acceptance, merge or issue closure.

## Capability map

| Source role | Portable destination |
|---|---|
| Static/live discovery | `a11y-scan`, all applicable families and review modes |
| Native/custom interaction | `a11y-review --mode interactive`, including grids/trees/editors, drag and virtualization |
| Text/non-text contrast | `a11y-review --mode contrast`, actual compositing and unrounded ratios |
| Color-independent meaning | `a11y-review --mode color`, visible information rather than ARIA alone |
| Link purpose in context | `a11y-review --mode links`, real names/context/destinations and valid exceptions |
| Display modes | `a11y-review --mode modes`, actual browser/OS evidence and AA/AAA boundaries |
| Viewport/resize/reflow | `a11y-review --mode viewports`, seven checkpoints plus task-specific widths/states |
| Bounded native-first repair | Existing `a11y-fix`, shared repair hypotheses and issue-history eligibility |
| Independent fix verification | Existing `a11y-verify` name and five evidence-based verdicts |
| Scenario-specific regression generation | Existing `a11y-test-gen`, negative/adjacent cases and separate manual AT rows |
| Accessible development | Existing `a11y-dev`, broadened content/forms/media/time/input guidance |
| Shareable reporting | Existing `a11y-report` name, Markdown/HTML and approved GitHub issue filing |
| Audit and read-only evidence review | Combined `a11y-tester` agent; existing diff advocate retained |
| Capability/access readiness | `repo/prereq-check`, platform-appropriate read-only target checks |
| Plugin release inventory | `repo/plugin-version-check`, actual configured host/catalog, SemVer and approval-only plans |

Invoke installed skills as `/developer:<name>`, for example:

```text
/developer:a11y-review --mode interactive
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
- Skills do not carry individual versions. This synchronization does not change or publish the
  plugin release.
- Separate focused accessibility skill names are replaced by the corresponding review modes;
  their detailed procedures are retained within the one skill. Obsolete prompt adapters and
  the separate reviewer agent are removed rather than left as duplicate entry points.
- Unrelated `code-review`, `deliberate`, `pr-learn` and specialist critic agents are unchanged.

This is functional adaptation, not byte-for-byte mirroring. When refreshing from source, preserve
the public boundaries, run `npm test`, regenerate adapters and the website catalog, then review
family/scenario coverage and all relative links. Fixture/text contracts validate packaging and
instructions; they do not prove accessibility of an actual application.
