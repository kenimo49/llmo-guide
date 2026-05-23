# Changelog

All notable framework and content changes to LLMO Framework are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to a content-versioning policy:

- **MAJOR** — breaking change to the framework structure (renamed component, removed component, scoring change)
- **MINOR** — new framework component, new guide article, new case study, new research entry
- **PATCH** — substantive section added to an existing article (new sub-heading, new example, new checklist item)

Design tweaks, typo fixes, broken-link repairs, and translation backfills do **not** trigger a version bump. Only changes to framework concepts and content claims are tracked here.

## [1.4.0] — 2026-05-24

### Headline

llmoframework.com is now positioned as the **Open LLMO Research Initiative**, with the LLMO Framework as its first published reference artifact. The release adds three top-level Initiative pages (About, Research Areas, Experimental Projects) translated to all 8 locales, restructures the sidebar so the Initiative comes before the Framework, and makes the Founder attribution explicit in the Footer and site metadata.

### Added (24 new pages across 8 locales)

- `about/` — Initiative Mission, research principles (Reproducibility-first / Draft-over-Standard / OSS-first / Solo-honest), Founder credentials, Phase 0–3 roadmap
- `research-areas/` — the 5 research areas (AI Citation Analysis / Grounding Visibility / LLM Retrieval Optimization / AI-native Documentation / Agent-oriented Information Architecture), each with scope, key questions, and Phase 1 deliverable
- `experimental-projects/` — the three Core Projects: LLMOFramework Score (Draft v0.1 indicators), Benchmark (planning), Compatible (Phase 3 roadmap only)

### Changed (framing reposition)

- Hero tagline (EN + JA): "open standard" → "open research initiative on AI retrieval, grounding visibility, and LLM-native web architecture"
- Site description and WebSite JSON-LD description: same reframing applied across all locales via `astro.config.mjs`
- "Why LLMO" sections (EN + JA `index.mdx`): "implementation-focused standard" → "implementation-focused reference"
- `Footer.astro`: added "Open LLMO Research Initiative — Founded and maintained by Ken Imoto" attribution block above the version line, applied site-wide

### Coherence

- `SoftwareApplication` JSON-LD (EN + JA `index.mdx`): added `isPartOf` → `WebSite#website` so the Framework ↔ Initiative relationship is structural rather than description-only
- `/ja/index.mdx`: "実装重視のスタンダードを提供する" → "実装重視のリファレンスを提示する" (Phase 0 framing consistency)
- Locale `about/index.md` book links annotated as English fallback where no localized `kenimoto.dev/books` page exists (DE / FR / KO / ZH)

### Sidebar

- New top-level section "Open LLMO Research Initiative" with About / Research Areas / Experimental Projects, translated to all 8 locales (section label kept as English brand name)
- Placed before "Getting Started" so the Initiative reads as the parent of the Framework

### Translation QA

- `avoid-ai-writing-en-detect`: ✅ PASS on all 3 EN pages (Index ≈ 0)
- `avoid-ai-writing-es-detect`: ✅ PASS on all 3 ES pages
- `avoid-ai-writing-pt-detect`: 4× "roadmap" → "plano" per §8.5 + "construir em cima" → "construir a partir disso" per new §7.2.5 build-on-top calque family (skill bumped to v7 in sns-operations)
- `avoid-ai-writing-ko / de / fr / zh`: grep PASS (no Tier 1/2 hits, em-dash all in list/table contexts excluded by §5.1.1)

### i18n

- All 8 locales now serve real pages for the 3 new slugs, resolving the hreflang-to-404 risk that would have appeared if JA-only pages had been launched

[1.4.0]: https://github.com/kenimo49/llmo-guide/compare/v1.3.3...v1.4.0


## [1.3.3] — 2026-05-18

### Headline

The v1.3.2 changelog acknowledged "known coherence drift" in two surfaces — `public/llms.txt` (8 languages) still showed `v1.1.0`, and `public/ai/about.md` still listed 5 components instead of 6. The cleanup also surfaced a deeper drift: `public/ai/framework.md` in **all 8 languages** had only 5 component sections in the body, with titles split across languages (some saying "5", some saying "6" but with a 5-item body). This release closes all three surfaces in the same hour the drift was documented.

### Fixed (coherence repair across 25 surfaces)

- **`public/llms.txt` (8 languages)** — version label updated from `v1.1.0` to `v1.3.2` in the framework heading; root `llms.txt` Changelog line also updated. The "(6 Components, vX.Y.Z)" pattern is now coherent with the runtime VERSION constant.
- **`public/ai/about.md` (8 languages)** — added a 6th list item for **Coherence Signals** with per-language naming pulled from each language's existing `framework/coherence-signals.md` translation. EN, KO previously said "5 components" in the heading too — both updated to 6. Max-score values updated from 15 to 18 where stale (EN, PT, ZH, ES, DE, KO).
- **`public/ai/framework.md` (8 languages)** — added a full `## 6. Coherence Signals` section (Goal + 5 bullet points) before each language's "Implementation Checklist", mirroring the structure of components 1-5. Titles updated from "5 Core Components" → "6 Core Components" in EN, JA, ZH, DE, KO. PT/ES/FR had correct titles but missing bodies, now also closed.

### Why

The drift pattern is now textbook. v1.1.0 added Coherence Signals to the framework but only updated the human-facing pages, leaving the AI-only surfaces (`/ai/*.md`, `/llms.txt`) stuck at the pre-v1.1.0 5-component world. This is exactly the failure mode Coherence Signals warns against: when one surface drifts from another, the AI sees the older version and cites the older claim. The v1.3.2 release noticed two stale surfaces and called them out in its own changelog; expanding the audit revealed the third (`framework.md`) was even worse. The lesson, added to next maintenance cycle: when a release adds a framework component, the `/ai/` and `/llms.txt` surfaces are part of "every place this fact lives" and must be regenerated, not hand-updated.

### Coherence narrative continuity

| Release | What it fixed | What it missed |
|---|---|---|
| v1.1.0 | Added Coherence Signals | Didn't update /ai/ surfaces |
| v1.2.0 | Fixed /llms.txt 5→6 components | Left version label stuck |
| v1.3.0 | Documented the v1.1.0→v1.2.0 drift as a case study | — |
| v1.3.1 | Fixed CSS visual layer | Left /ai/ + /llms.txt drift |
| v1.3.2 | Question-form H2 restructure + schema | **Documented** the drift, didn't fix it |
| v1.3.3 | **Fixed** the 25-surface drift documented in v1.3.2 | (next surface, TBD) |

[1.3.3]: https://github.com/kenimo49/llmo-guide/compare/v1.3.2...v1.3.3


## [1.3.2] — 2026-05-18

### Headline

The framework site teaches AI discoverability but its own pages were not being cited. Three measurement rounds in a row showed citation rate = 0 across Claude queries even when LLMO concepts were 75% mentioned. The H2s named topics, not questions, so AI extract layers had no anchor sentence to lift. This release rewrites the three highest-leverage pages to lead with question-form headings and attaches schema.org structured data so the entity boundaries are unambiguous.

### Changed

- **`guide/what-is-llmo`** — replaced topic-style H2s (`The Problem`, `LLMO vs Traditional SEO`, `How LLMO Relates to AEO and GEO`) with the exact question phrasing used in the existing FAQPage schema (`Why does LLMO matter?`, `How is LLMO different from SEO?`, `How is LLMO related to AEO and GEO?`). Each section now opens with a one-sentence definition before tables or lists. Lead paragraph promoted to bold for quote extraction.
- **`guide/llmo-vs-seo-aeo-geo`** — restructured into three question-form H2s (`What is the difference between LLMO, SEO, AEO, and GEO?`, `How are LLMO, AEO, and GEO related?`, `Which one should I optimize for?`), each opening with a direct definition. Added the chronological lineage as a bulleted ladder rather than only a code-block ASCII timeline.
- **`framework/overview`** — opening paragraph rewritten as a single bold definition listing all six components inline (so an AI can extract the full component list from one sentence). H2 `The Six Components` rephrased to `What are the six components of the LLMO Framework?`.

### Added (structured data, not new pages)

- **`framework/overview`** — attached a `DefinedTermSet` with six `DefinedTerm` entries (one per component), each with `@id`, name, description, and `inDefinedTermSet` back-reference. The set is `@id`-pinned to the page anchor so external sites can cite individual components by URL fragment.
- **`guide/llmo-vs-seo-aeo-geo`** — added a `FAQPage` with three Q&A pairs mirroring the new H2s. Previously only `what-is-llmo` had FAQPage; the comparison page is structurally a definition question and was missing this layer.

### Why

This is an applied test of the framework on itself. The hypothesis: H2 phrasing matters more than content quality for AI extraction. If citation rate moves from 0% over the next 2-3 weeks of observation (Claude / Perplexity / OpenAI) without any content change beyond H2 restructuring + schema, the LLMO Framework gets to point at its own site as evidence. If it doesn't move, the framework needs to admit the H2 axis was overweighted in our checklist. Issue tracker: kenimo49/iris-hub#113.

### Known coherence drift (not addressed in this release)

- `public/llms.txt` still says `v1.1.0` in the "(6 Components, v1.1.0)" heading (current is v1.3.2).
- `public/ai/about.md` still lists 5 components (current framework is 6). These are pre-existing drift, separate from this release, flagged for the next maintenance pass.

[1.3.2]: https://github.com/kenimo49/llmo-guide/compare/v1.3.1...v1.3.2


## [1.3.1] — 2026-05-08

### Headline

The case study about closing five coherence surfaces failed at six. ken read the v1.3.0 page bragging about the fix and pointed out the site header still said "v1.0". One CSS pseudo-element, hardcoded since the first commit, surviving four releases unnoticed.

### Fixed

- **Removed `.site-title::after { content: 'v1.0' }` from `src/styles/custom.css`** — the badge in the page header was hardcoded and never updated through v1.0 → v1.1 → v1.2 → v1.3. The Footer (added in v1.2.0) is now the single canonical display surface for the version.
- **`case-studies/llmo-framework-self-audit`** (EN+JA) — added a *Postscript: The Sixth Surface* section. The case study originally claimed five surfaces of drift; the postscript records the sixth one (CSS visual layer) found within an hour of publication, and generalizes the lesson: when enumerating coherence surfaces, include the visual layer, not just the data layer. Anything that renders text to the user is a surface.

### Why

The pattern is becoming a literary device. v1.1.0 introduced Coherence Signals; v1.2.0 violated them on `llms.txt`; v1.3.0 documented the violation as a case study; v1.3.1 documents the case study's own incompleteness. Every fix surfaces the next surface. The lesson is not that these failures are exceptional — it's that they are normal, and that the discipline is to record them publicly so the next maintainer (or AI agent, or curious reader) can find what we missed.


## [1.3.0] — 2026-05-08

### Headline

The framework records its own coherence failure. New case study captures the v1.1.0→v1.2.0 release where the site that defines Coherence Signals shipped five out-of-sync version surfaces. Coherence Signals now has a `#release-process-is-a-coherence-surface` sub-section generalizing the lesson.

### Added

- **New case study: When the Framework Author Violates the Framework** (`case-studies/llmo-framework-self-audit`) — this site's own self-audit, capturing the meta-irony of defining Coherence Signals in v1.1.0 and then shipping a Coherence Signals violation in v1.2.0. Documents the drift across five version surfaces (`package.json`, `src/data/version.ts`, `CHANGELOG.md`, EN/JA changelog pages, git tags), the codex second-pass detection, and the 10-step fix that closed the gap (including the new Footer VERSION display and the CI verify-json-ld gate). EN + JA.
- **Coherence Signals: Release Process is a Coherence Surface** (`framework/coherence-signals#release-process-is-a-coherence-surface`) — new sub-section that generalizes the v1.2.0 episode. Defines the version-as-fact framing, the four-step prevention pattern (generate from one source / make version visible at runtime / gate on cross-checks / second-pass review before tagging), and links to the new case study. EN + JA.

### Sidebar

- "Case Studies" extended with the new framework self-audit entry, with translations across all 8 supported languages.

### Why

The most uncomfortable lesson of v1.2.0 is the simplest: writing a framework principle and following it are different cognitive acts. The framework's own site demonstrated this in real time. We chose to record the episode as a first-class case study rather than bury it in a changelog footnote — partly because it generalizes beyond release coherence to any "the author isn't exempt" failure mode, and partly because hiding the failure would itself be a coherence violation between what we say (transparency, single source of truth) and what we do.


## [1.2.0] — 2026-05-08

### Headline

Two field-tested patterns added under existing components, plus codex-second-pass cleanup that brings the site itself into Coherence Signals compliance.

### Added

- **Authority Signals: Identity-as-Code pattern** (`framework/authority-signals`) — one Person/Organization JSON-LD, one URL-based `@id`, cited everywhere via `@id` references. Defines the per-page-duplication anti-pattern and rules for multi-language sites (shared `Person`/`Organization`, per-language `WebSite`). +3 checklist items.
- **Retrieval Signals: Citation Preferred + build-time llms.txt** (`framework/retrieval-signals`) — name canonical entry points per topic so AI cites the right URL when several cover the same subject; generate `llms.txt`/`llms-full.txt`/`/ai/publications.md` from a single content collection. +3 checklist items.
- **CI gate: `scripts/verify-json-ld.mjs`** — runs in GitHub Actions before deploy. Verifies every `<script type="application/ld+json">` block parses, every page emits the site-wide `Organization`/`WebSite`/`Person`, and the 404 page does not carry article-shaped schema.

### Changed

- **`public/llms.txt` (8 languages)** — updated from 5 components/15 points to 6 components/18 points. Added Coherence Signals, Two-Pass Review, Self-Audit case study, Changelog entries. New ja_JP llms.txt template; non-EN/JA llms.txt link to the English-only new pages with explicit `(en)` annotation.
- **`/ai/*.md` (8 languages)** — same 5→6 component update; canonical host normalized (`www.propel-lab.co.jp` → `propel-lab.co.jp`); Kindle 4→14 books / Qiita 39,000+→80,000+ aligned with profile data.
- **`framework/coherence-signals`** — added boundary clarification with Structural Formatting at the top of the article.
- **`framework/structural-formatting`** — checklist updated.
- **`framework/overview`** — Citation Signals checklist scope corrected to "content pages" (site root and error pages exempt).
- **`case-studies/propel-lab-self-audit`** — each finding now labeled with the source site (kaoriq / propel-lab / both); description and title clarify two-site scope.
- **`scripts/bump-version.sh`** — SUMMARY now passed via env vars (immune to `'` and `"`); idempotency guard refuses to overwrite an existing version section or git tag; python heredocs are quoted.
- **`src/components/Head.astro`** — multi-language fallback detection: when a non-EN locale URL serves the English fallback content, JSON-LD `inLanguage` and OG `og:locale` are set to `en` to match the actual body language. The 404 page no longer carries `TechArticle`.

### Why

Three sites in one review session (mypcrig, legacydram, kenimoto.dev) hit the same two failure modes — identity fragmentation across languages and pages, and llms.txt entries quietly drifting from the actual content. Both patterns now have explicit framework guidance instead of being folded into checklists.

A codex second-pass review on the v1.1.0 release surfaced the most ironic miss possible: the site that defines Coherence Signals had `llms.txt` stuck at "5 components / 15 points" while the rest of the site advertised the new 6th component. That's fixed.

## [1.1.0] — 2026-05-08

### Added

- **6th framework component: Coherence Signals** (`framework/coherence-signals`) — single source of truth across HTML, JSON-LD, Markdown, llms.txt and other AI-readable surfaces. Maximum framework score becomes 18 (was 15).
- **New guide: LLMO Audit — Two-Pass Review** (`guide/llmo-audit-two-pass-review`) — methodology for auditing your own LLMO implementation by combining a self-review with an independent AI second-opinion pass in a read-only sandbox. Includes Codex CLI invocation pattern.
- **New case study: Self-Audit — 20 Findings on the Propel-Lab Reference Site** (`case-studies/propel-lab-self-audit`) — concrete record of a two-pass audit on this framework's own reference implementation, including silent JSON-LD drops, cross-file numeric drift, and JSON-LD over-injection. Demonstrates that implementation and audit are different attention modes.

### Changed

- **`framework/structural-formatting`** — added two new sections:
  - "Scope JSON-LD Entities to Page Subject" — site-wide layout emits only `Organization` / `WebSite` / `Person`; page-relevant entities (`Service[]`, `Book[]`, `MusicGroup`, `FAQPage`) belong on the pages they describe.
  - "Verify the JSON-LD Actually Emits" — output verification as a discrete framework concern; build-time checks for silent drops; Schema.org Validator and Rich Results Test integration.
- **`framework/overview`** — restructured for 6 components, scoring band recalibrated to 18-point maximum, self-assessment checklist extended.
- **`/` and `/ja/` landing pages** — sixth Coherence Signals card added to the component grid.

### Sidebar

- New "Auditing" group introduced for `guide/llmo-audit-two-pass-review`.
- New "About" group introduced for the changelog page.
- "Case Studies" extended with the self-audit entry.

## [1.0.0] — 2026-04-30

Initial public release of the LLMO Framework documentation site.

### Added

- Framework: 5 components — Knowledge Clarity, Structural Formatting, Retrieval Signals, Authority Signals, Citation Signals (15-point scoring).
- Getting Started: What is LLMO, LLMO vs SEO/AEO/GEO, How AI Finds Content, Quickstart, FAQ.
- Case Studies: TRM Labs (+8,337% AI traffic), Go Fish Digital (25× conversion lift).
- Research: GEO Paper summary, Microsoft Guidelines, Papers & References.
- Multilingual: 8 languages (en, ja, zh-CN, ko, de, fr, es, pt-BR).
- LLMO surfaces: `/llms.txt`, `/llms-full.txt`, `/llms-ja.txt`, `/ai/*.md`, JSON-LD on every page, `robots.txt` with explicit AI-bot allowlist.

[1.3.1]: https://github.com/kenimo49/llmo-guide/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/kenimo49/llmo-guide/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/kenimo49/llmo-guide/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/kenimo49/llmo-guide/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/kenimo49/llmo-guide/releases/tag/v1.0.0
