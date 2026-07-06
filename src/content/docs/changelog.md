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

## v1.6.2 — 2026-07-06

**Headline**: The [What is LLMO?](/guide/what-is-llmo/) page now formally owns the term — a `DefinedTerm` schema entry, a term-origin section, and a "How do you do LLMO?" section (EN/JA).

### Added

- **"What does LLMO stand for?"** — states the expansion (Large Language Model Optimization) and why the term names the mechanism (LLM retrieval/citation behavior) rather than a surface
- **"How do you do LLMO?"** — the three starter files (`llms.txt`, AI-crawler `robots.txt`, JSON-LD) in implementation order, routing to the [Quickstart](/guide/quickstart/)
- `DefinedTerm` JSON-LD marking the page as the glossary entry for the term "LLMO"; FAQPage entries expanded from 3 to 5

### Why this is a PATCH bump

New sections and schema on an existing guide page. No new component, guide, or case study; scoring unchanged.

## v1.6.1 — 2026-05-25

**Headline**: The home page now lists reference implementations applying the Framework to specific verticals. First entry: **AI Native MEO** (`ainativemeo.com`), the local business and map-search vertical adaptation.

### Added

- A new `Reference implementations` section at the bottom of the [home page](/) (EN canonical), introducing how vertical adaptations of the Framework are tracked
- First listed implementation: [AI Native MEO](https://ainativemeo.com/) — practitioner-facing articles on Google Business Profile as JSON-LD, NAP entity resolution, and how each AI engine cites local data

### Why this is a PATCH bump

The change is a new section on an existing page, not a new component, guide, or case study. The Framework's structure and scoring are unchanged.

## v1.4.0 — 2026-05-24

**Headline**: llmoframework.com is now positioned as the **Open LLMO Research Initiative**, with the LLMO Framework as its first published reference artifact. Three top-level Initiative pages ship across all 8 locales, the sidebar puts the Initiative before the Framework, and the Footer carries the Founder attribution site-wide.

### New (24 pages across 8 locales)

- **[About the Initiative](/about/)** — Mission, research principles (Reproducibility-first / Draft-over-Standard / OSS-first / Solo-honest), Founder credentials, and the Phase 0–3 roadmap.
- **[Research Areas](/research-areas/)** — the 5 focus domains: AI Citation Analysis, Grounding Visibility, LLM Retrieval Optimization, AI-native Documentation, Agent-oriented Information Architecture. Each domain ships with scope, key questions, and a Phase 1 deliverable.
- **[Experimental Projects](/experimental-projects/)** — the three Core Projects: **LLMOFramework Score** (Draft v0.1 indicators), **Benchmark** (planning), **Compatible** (Phase 3 roadmap only, deliberately deferred so certification follows ecosystem adoption rather than precede it).

### Repositioned

- Hero tagline reframed from "open standard" to "open research initiative on AI retrieval, grounding visibility, and LLM-native web architecture" (EN + JA `index.mdx`).
- Site description and WebSite JSON-LD description: same reframing applied across all locales via `astro.config.mjs`.
- `Footer.astro` now carries "Open LLMO Research Initiative — Founded and maintained by Ken Imoto" above the version line, applied site-wide.

### Schema coherence

- `SoftwareApplication` (the Framework) gained `isPartOf` → `WebSite#website`, so the Initiative ↔ Framework relationship is structural in the JSON-LD graph, not only descriptive in prose.
- "Why LLMO" sections (EN + JA): "implementation-focused standard" → "implementation-focused reference" so the page-level language matches the new framing.

### Sidebar

- New top-level section "Open LLMO Research Initiative" with About / Research Areas / Experimental Projects, translated to all 8 locales. The section label is kept as the English brand name across locales; the items inside have localized labels.
- Placed before "Getting Started" so the Initiative reads as the parent of the Framework, not a subsection of it.

## v1.3.3 — 2026-05-18

**Headline**: The v1.3.2 changelog acknowledged "known coherence drift" in two AI-only surfaces. Auditing the rest of `/ai/` and `/llms.txt` revealed a third, even worse one: `framework.md` in **all 8 languages** had only 5 component sections, with titles split across languages. This release closes all three surfaces in the same hour the drift was documented.

### Fixed (25 surfaces)

- **`public/llms.txt` (8 languages)** — version label updated from `v1.1.0` to `v1.3.2`. Root `llms.txt` Changelog line also updated.
- **`public/ai/about.md` (8 languages)** — added 6th list item for **Coherence Signals** (per-language naming pulled from each language's `framework/coherence-signals.md` translation). Heading "5 components" → "6" where stale (EN, KO). Max score 15 → 18 where stale (EN, PT, ZH, ES, DE, KO).
- **`public/ai/framework.md` (8 languages)** — added full `## 6. Coherence Signals` section (Goal + 5 bullet points) before each Implementation Checklist. Titles "5 Core Components" → "6 Core Components" where stale (EN, JA, ZH, DE, KO).

### Why this matters as a release, not a typo fix

The drift was load-bearing: AI systems crawling `/ai/about.md` or `/llms.txt` were reading a 5-component framework, while human readers on the same site saw a 6-component framework. Coherence Signals is exactly the component that defines this failure mode. Adding it to a release and then leaving it out of the AI-only surfaces — for **four subsequent releases** — is the most embarrassing class of violation the framework can produce. Counting this as PATCH (not "typo / no-bump") is the only way to keep the framework's own audit trail honest.

### Coherence narrative continuity

The framework now has a six-release lineage of one drift surface revealing the next: v1.1.0 added Coherence Signals → v1.2.0 fixed /llms.txt components but left version label → v1.3.0 case-studied the v1.1.0→v1.2.0 drift → v1.3.1 fixed CSS visual layer → v1.3.2 documented the /ai/ drift → v1.3.3 closed it. Every release surfaces what the previous one didn't see. The discipline is publishing the enumeration so the next reader (or AI) finds what we missed.

## v1.3.2 — 2026-05-18

**Headline**: The framework site that teaches AI discoverability was not being cited. Three measurement rounds in a row showed citation rate = 0 while LLMO concepts were 75% mentioned. The H2s named topics, not questions, so the AI extract layer had no anchor sentence to lift.

### Changed

- **[What is LLMO?](/guide/what-is-llmo/)** — replaced topic-style H2s with the exact question phrasing used in the existing FAQPage schema. Each section now opens with a one-sentence definition before tables or lists. Lead paragraph promoted to bold for quote extraction.
- **[LLMO vs SEO vs AEO vs GEO](/guide/llmo-vs-seo-aeo-geo/)** — restructured into three question-form H2s (`What is the difference between LLMO, SEO, AEO, and GEO?`, `How are LLMO, AEO, and GEO related?`, `Which one should I optimize for?`), each opening with a direct definition.
- **[The LLMO Framework: Overview](/framework/overview/)** — opening paragraph rewritten as a single bold definition listing all six components inline so an AI can extract the full component list from one sentence.

### New structured data (not new pages)

- **`framework/overview`** — attached a `DefinedTermSet` with six `DefinedTerm` entries (one per component). Each is `@id`-pinned to the page anchor so external sites can cite individual components by URL fragment.
- **`guide/llmo-vs-seo-aeo-geo`** — added `FAQPage` with three Q&A pairs mirroring the new H2s. Previously only `what-is-llmo` carried this layer.

### Why

This is an applied test of the framework on itself. The hypothesis: H2 phrasing matters more than content quality for AI extraction. If citation rate moves from 0% over the next 2-3 weeks of observation across Claude / Perplexity / OpenAI without any content change beyond H2 restructuring + schema, the LLMO Framework gets to point at its own site as evidence. If it doesn't, the framework needs to admit the H2 axis was overweighted in our checklist. The result will be recorded in a future release regardless of which way it goes.

### Known coherence drift (not addressed)

`public/llms.txt` still says `v1.1.0` in its heading; `public/ai/about.md` still lists 5 components (current is 6). These are pre-existing drift, separate from this release, flagged for the next maintenance pass.

## v1.3.1 — 2026-05-08

**Headline**: The case study that bragged about closing five coherence surfaces failed at six. ken found the sixth in the time it took to read the v1.3.0 page.

### Fixed

- **`src/styles/custom.css`** — removed `.site-title::after { content: 'v1.0' }`. A version badge was hardcoded into the header CSS at the project's first commit and never updated. v1.0 → v1.1 → v1.2 → v1.3 — four releases survived without anyone noticing the visual layer was lying. The Footer (added in v1.2.0) reads from `src/data/version.ts` and is now the single canonical display surface.
- **[Self-Audit case study](/case-studies/llmo-framework-self-audit/)** — added a *Postscript: The Sixth Surface* section in EN + JA. The case study originally enumerated five surfaces of drift; the postscript records the sixth (CSS visual layer), found within an hour of publication, and generalizes the lesson: when you enumerate "every place this fact lives," include the visual layer, not just the data layer.

### Why

Every release of this framework reveals what the previous release didn't see. v1.1.0 introduced Coherence Signals; v1.2.0 violated them on `llms.txt`; v1.3.0 documented the violation as a case study; v1.3.1 documents the case study's own incompleteness. The pattern is the framework working — the only way to be sure you've found every coherence surface is to publish your enumeration and let other readers find what you missed.

## v1.3.0 — 2026-05-08

**Headline**: The framework records its own coherence failure as a first-class case study.

### New

- **Case study: [When the Framework Author Violates the Framework](/case-studies/llmo-framework-self-audit/)** — this site's own self-audit. v1.1.0 introduced Coherence Signals; v1.2.0 shipped with five out-of-sync version surfaces (`package.json`, `version.ts`, `CHANGELOG.md`, EN/JA changelog pages, git tags). The codex second-pass review caught the irony in 4 minutes. The case study documents the drift, the detection, the 10-step fix, and three patterns that generalize: release process is itself a coherence surface; tooling earns its keep when bypassed; frameworks don't exempt their authors.
- **[Coherence Signals: Release Process is a Coherence Surface](/framework/coherence-signals/#6-release-process-is-a-coherence-surface)** — new sub-section that generalizes the v1.2.0 episode. Frames a version number as a fact in the LLMO sense, then defines the four-step prevention pattern: generate from one source / make version visible at runtime / gate on cross-checks / second-pass review before tagging.

### Why this is its own release

We chose to record the episode as a first-class case study rather than bury it in a changelog footnote. Two reasons. First, it generalizes beyond release coherence — any framework author shipping coherence violations in their own coherence framework is the same failure mode at different scales. Second, hiding the failure would itself be a coherence violation between what we say (transparency, single source of truth) and what we do.

## v1.2.0 — 2026-05-08

**Headline**: Two field-tested patterns added — `Identity-as-Code` and `Citation Preferred` — plus codex-second-pass cleanup that brings the site itself into Coherence Signals compliance.

### Expanded

- **[Authority Signals](/framework/authority-signals/)** — added *Identity-as-Code: One Person, One `@id`, Cited Everywhere*. Defines the per-page-duplication anti-pattern and the URL-based `@id` pattern, with rules for multi-language sites (shared `Person`/`Organization`, per-language `WebSite`). Three new checklist items.
- **[Retrieval Signals](/framework/retrieval-signals/)** — added two sub-sections under llms.txt:
  - *Add a "Citation Preferred" Section*: name canonical entry points per topic so AI cites the right URL when several cover the same subject.
  - *Generate llms.txt at Build Time*: drop manual maintenance; build script reads the content collection and emits `llms.txt`, `llms-full.txt`, and `/ai/publications.md` from one source of truth.
- **Checklist additions** for both: `@id` strategy and llms.txt drift prevention.

### Fixed (Coherence cleanup)

- **`public/llms.txt` (8 languages)** — was stuck at "5 components / 15 points" while the rest of the site advertised the new 6th component. The site that defines Coherence Signals violated Coherence Signals on its own AI-readable surface. Updated to 6 components / 18 points; added Coherence Signals, Two-Pass Review, Self-Audit case study, Changelog entries.
- **`/ai/*.md` (8 languages)** — same 5→6 component update. Canonical host normalized (`www.propel-lab.co.jp` → `propel-lab.co.jp`); Kindle 4→14 books / Qiita 39,000+→80,000+ aligned with profile data.
- **CI gate**: new `scripts/verify-json-ld.mjs` runs in GitHub Actions before deploy. Verifies every `<script type="application/ld+json">` block parses, every page emits the site-wide `Organization`/`WebSite`/`Person`, and the 404 page does not carry article-shaped schema.
- **`framework/coherence-signals`** — added boundary clarification with Structural Formatting at the top of the article ("Structural asks 'is each surface well-formed?'; Coherence asks 'do surfaces agree?'").
- **`framework/overview`** — Citation Signals checklist scope corrected to "content pages" (site root and error pages exempt).
- **`case-studies/propel-lab-self-audit`** — each finding now labeled with its source site (kaoriq / propel-lab / both); description and title clarify two-site scope.
- **`scripts/bump-version.sh`** — SUMMARY now passed via env vars (immune to `'` and `"` in the input); idempotency guard refuses to overwrite an existing version section or git tag; python heredocs are quoted.
- **`src/components/Head.astro`** — multi-language fallback detection: when a non-EN locale URL serves the English fallback content, JSON-LD `inLanguage` and OG `og:locale` are set to `en` to match the actual body language. The 404 page no longer carries `TechArticle`.

### Why

Three sites (mypcrig.com, legacydram.com, kenimoto.dev) implementing the framework hit the same two failure modes within a single review session: identity fragmentation across languages and pages, and llms.txt entries that quietly drifted out of sync with the actual content. Both patterns now have explicit framework guidance instead of being folded into checklists.

A codex second-pass review on the v1.1.0 release surfaced the most ironic miss possible: the site that defines Coherence Signals had `llms.txt` stuck at "5 components / 15 points" while the rest of the site advertised the new 6th component. That's fixed.

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
