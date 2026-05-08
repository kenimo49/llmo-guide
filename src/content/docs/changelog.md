---
title: "Changelog"
description: "Version history of the LLMO Framework. New components, new guides, and new case studies are tracked here. Design tweaks and typo fixes are not."
pubDate: 2026-05-08
---

The LLMO Framework follows a content-versioning policy designed for a documentation site that evolves: only changes to *concepts and content claims* trigger a version bump. Design refinements, copy edits, and translation backfills happen continuously without version churn.

## Versioning Policy

| Bump | Triggers |
|------|----------|
| **MAJOR** | Breaking change to the framework — a component is renamed or removed, scoring scale changes, fundamental terminology shifts |
| **MINOR** | New framework component, new guide article, new case study, new research entry |
| **PATCH** | Substantive section added to an existing article (a new sub-heading, example block, or checklist item) |

The current version, the `package.json` `version` field, and the git tag `vX.Y.Z` always agree.

The full machine-readable history lives in [CHANGELOG.md on GitHub](https://github.com/kenimo49/llmo-guide/blob/main/CHANGELOG.md). Below is the human-readable summary.

## v1.1.0 — 2026-05-08

**Headline**: The framework grew from 5 to 6 components. Maximum score is now 18 (was 15).

### New

- **6th framework component: [Coherence Signals](/framework/coherence-signals/)** — the discipline of making sure the same fact tells the same story across every surface AI reads (HTML, JSON-LD, Markdown, llms.txt, /ai/*.md). Added because too many real-world implementations ship with cross-file drift that slips past every other LLMO check.
- **[LLMO Audit: Two-Pass Review](/guide/llmo-audit-two-pass-review/)** — a methodology for auditing your own LLMO implementation. Self-review first, then an independent AI agent in a read-only sandbox. Includes the Codex CLI invocation pattern with the `</dev/null` stdin gotcha and a structured prompt template.
- **Case study: [Self-Audit on the Propel-Lab Reference Site](/case-studies/propel-lab-self-audit/)** — 20 findings (11 caught by self-review, 9 caught only by the second pass), including silent JSON-LD drops the team had been running with for months. Demonstrates that implementing LLMO and auditing LLMO are different attention modes.

### Expanded

- **[Structural Formatting](/framework/structural-formatting/)** — two new sections:
  - *Scope JSON-LD Entities to Page Subject*: site-wide layout emits only `Organization` / `WebSite` / `Person`; page-relevant entities (`Service[]`, `Book[]`, `MusicGroup`, `FAQPage`) belong on the pages they describe.
  - *Verify the JSON-LD Actually Emits*: output verification as a discrete framework concern. Build-time checks for silent drops; integration with Schema.org Validator and Rich Results Test.

### Re-scored

- **[Framework Overview](/framework/overview/)** — restructured for 6 components, scoring band recalibrated to an 18-point maximum, self-assessment checklist extended with three new Coherence-related checks.

## v1.0.0 — 2026-04-30

Initial public release of the LLMO Framework documentation site with 5 framework components, 8 languages, and full sections on Getting Started, the Framework, Case Studies, and Research.

## How to Track Updates

- **Watch the GitHub repository**: [kenimo49/llmo-guide](https://github.com/kenimo49/llmo-guide)
- **Subscribe to releases**: GitHub releases are tagged `vX.Y.Z` matching the version above
- **RSS / Atom**: Starlight's built-in feed (when enabled) follows pubDate, which is bumped on framework changes only
