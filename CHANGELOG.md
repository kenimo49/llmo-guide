# Changelog

All notable framework and content changes to LLMO Framework are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to a content-versioning policy:

- **MAJOR** — breaking change to the framework structure (renamed component, removed component, scoring change)
- **MINOR** — new framework component, new guide article, new case study, new research entry
- **PATCH** — substantive section added to an existing article (new sub-heading, new example, new checklist item)

Design tweaks, typo fixes, broken-link repairs, and translation backfills do **not** trigger a version bump. Only changes to framework concepts and content claims are tracked here.

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

[1.2.0]: https://github.com/kenimo49/llmo-guide/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/kenimo49/llmo-guide/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/kenimo49/llmo-guide/releases/tag/v1.0.0
