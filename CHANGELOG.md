# Changelog

All notable framework and content changes to LLMO Framework are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to a content-versioning policy:

- **MAJOR** — breaking change to the framework structure (renamed component, removed component, scoring change)
- **MINOR** — new framework component, new guide article, new case study, new research entry
- **PATCH** — substantive section added to an existing article (new sub-heading, new example, new checklist item)

Design tweaks, typo fixes, broken-link repairs, and translation backfills do **not** trigger a version bump. Only changes to framework concepts and content claims are tracked here.

## [1.8.0] — 2026-07-07

### Headline

Two new pages — Multilingual LLMO guide and Citation Half-Life research — plus Retrieval Signals and LLMO-vs-SEO field-evidence expansions (EN/JA)

### Added

- New `guide/multilingual-llmo` (EN canonical + JA): the wrong-language citation problem (LLM engines answer in the reader's language but cite the English URL; Google-backed engines inherit hreflang handling, ChatGPT/Perplexity often do not), why the retrieval layer is English-biased (inbound-link asymmetry, partial hreflang parsing, translation quality as a trust signal), signal fixes ranked by measured impact (hreflang + x-default > self-referencing canonical per language > per-language llms.txt > engine configuration: nothing), the language-asymmetry strategy (22-day 4-language measurement: PT 748 pageviews with 17 articles vs EN 195 with 26; community door / thinner AI-search fields / early-mover basics), and this site's own 8-locale fallback + noindex implementation as the reference
- New `research/citation-half-life` (EN + JA): published decay estimates (median ≈4.5 weeks, 40–60% monthly domain turnover, ~50% of cited content under 13 weeks old), the five-rule reproducible protocol (fixed frozen prompts, three retries counted at prompt level, weekly cadence, AI-vs-GSC two-clock control, decay fit from peak not week 1), measured half-lives across 3 page types × 3 engines (3.2–9.1 weeks; evergreen ~2× experience reports; Perplexity slowest, ChatGPT fastest), partial and uneven refresh recovery (60–75% of peak, substantive edits only), and the launch-vs-retention split mapped to Citation vs Authority/Coherence signals
- `framework/retrieval-signals` (EN/JA): new "Give Every Page a .md Twin" pattern (same URL + `.md`, `text/markdown; charset=utf-8`, `Link: rel="alternate"` advertisement, GitHub Pages/Jekyll trap, curl verification, honest vendor-confirmation caveat) and new "Avoid the Five llms.txt Anti-Patterns" section from a 30-file production audit (24/30 affected: dump-everything, robots.txt contradiction, HTML-only links, about-page theatre, frozen at launch) with the five-question pre-ship audit; checklist expanded by 3 items
- `guide/llmo-vs-seo-aeo-geo` (EN/JA): new "Do LLMO and SEO conflict?" section — the coexist / conditional / conflict tactic taxonomy (pruning, structure, statistics coexist; internal links and keywords are execution-dependent; answer-first and over-condensing conflict via dwell time and depth), per-page-role resolution, and the separate-metrics rule; fourth question added to FAQPage JSON-LD

### Notes

- Sidebar: "Multilingual LLMO" added to Getting Started after Measuring LLMO; "Citation Half-Life" added to Research — both with all 7 locale label translations
- Citation Half-Life is a Research entry, not a Public Experiment Log: Experiment Log #3 remains reserved for the Score v0.1 citation-correlation test
- Translation backfill for zh/ko/de/fr/es/pt follows separately (no version bump)


## [1.7.0] — 2026-07-07

### Headline

New guide: Measuring LLMO (Citation Rate / Brand Mention Density / AI Referral Conversion), plus field-evidence expansions to Knowledge Clarity and Citation Signals (EN/JA)

### Added

- New `guide/measuring-llmo` (EN canonical + JA): the measurement gap (no official citation APIs; GA4 referrals as a floor, not a ceiling), the 8.2× tracker-divergence problem and the "write down your definition of citation first" rule, three core metrics with formulas and code, three implementation layers (GA4 channel-group regex / manual five-platform protocol / API automation), the crawler-log leading indicator, a weekly-monthly-quarterly improvement cadence, and the substrate-vs-outcome split against Score v0.1
- `framework/knowledge-clarity` (EN/JA): new "AI Cites Passages, Not Pages" section (chunk-level retrieval, 44.2% of citations from the first 30% of a page, 40–75 word passages cited ~3.1× more); three new implementation items (pronouns → named subjects, vague words → verifiable facts, question-shaped headings); new "Field Evidence" section with two single-variable experiments (answer-first rewrites: 7 of 12 pages gained citations; H3→H2 promotion: 6 of 9); checklist expanded from 5 to 10 items
- `framework/citation-signals` (EN/JA): new "Statistics Are the Strongest Citation Signal" section (GEO nine-tactic table; +115.1% benchmark vs +37% live-test caveat; passage-level scope); new "The Effect Is Domain-Dependent" section (science/tech vs how-to vs niche); new implementation item #1 "Replace Adjectives with Numbers"; new "Field Evidence" section (three-numbers-one-paragraph → Perplexity citation on day 11; sitewide domain-split observation); checklist expanded from 5 to 8 items

### Notes

- Sidebar: "Measuring LLMO" added to Getting Started after Quickstart, with all 7 locale label translations
- Framework pages now cite the underlying field experiments (published on kenimoto.dev) as primary sources, per the framework's own Citation Signals guidance
- Translation backfill for zh/ko/de/fr/es/pt follows separately (no version bump)


## [1.6.2] — 2026-07-06

### Headline

What is LLMO? page: DefinedTerm schema, term-origin section, and How-do-you-do-LLMO section (EN/JA)

### Added

- `guide/what-is-llmo` (EN/JA): "What does LLMO stand for?" section — states the expansion and why the term names the mechanism (LLM retrieval/citation behavior) rather than a surface.
- `guide/what-is-llmo` (EN/JA): "How do you do LLMO?" section — the three starter files (llms.txt, AI-crawler robots.txt, JSON-LD) in implementation order, routing to the Quickstart.
- `guide/what-is-llmo` (EN/JA): `DefinedTerm` JSON-LD for the term "LLMO" (glossary-entry signal for the defining page), plus two FAQPage entries mirroring the new sections.


## [1.6.1] — 2026-05-25

### Headline

Home page now lists reference implementations applying the Framework to specific verticals. First entry: AI Native MEO (`ainativemeo.com`), the local business and map-search vertical adaptation.

### Added

- New `## Reference implementations` section at the bottom of `src/content/docs/index.mdx` (EN canonical)
- First bullet: AI Native MEO (`ainativemeo.com`) — local business / map-search vertical, with practitioner-facing articles on Google Business Profile as JSON-LD, NAP entity resolution, and how each AI engine cites local data

### Notes

- Editorial framing kept light ("reference work that applies the Framework to specific verticals") to preserve the independent-media position of `ainativemeo.com` in the citation graph
- Localised changelog summaries added in EN + JA changelog pages; per-locale `index.mdx` translations of the new section will follow as a separate translation backfill (no version bump)

[1.6.1]: https://github.com/kenimo49/llmo-guide/compare/v1.6.0...v1.6.1


## [1.6.0] — 2026-05-24 — **Public Experiment Log #2: External baseline panel**

### Headline

A panel of 39 high-traffic technical sites scored with `llmo-checker@0.1.0` to calibrate what "normal" looks like. **Median 61, mean 58.8, range 23–94.** Documentation category is the weakest (median 45.5); product marketing is the strongest (median 68.5). Three large documentation portals — `rust-lang.org` (23), `tailwindcss.com` (25), `djangoproject.com` (26) — score below 40.

The panel gives Experiment Log #1 the calibration it could not provide on its own. Our six owned sites at 93–99 land in the top decile of this 39-site panel, with `mypcrig.com` (93) tying with `supabase.com` and `redis.io` at the panel's 90th percentile.

### What changed (per locale, 8 new files + 1 sidebar config)

- New file `experiments/external-baseline-panel.md` (~1,800 words) shipped in EN canonical + JA / PT / ES / KO / ZH / DE / FR translations
- Sidebar config (`astro.config.mjs`) extended: "External baseline panel" sub-item added to Experiments group with all 7 locale translations of the label
- Internal links in each translation use the locale-aware path (`/{locale}/specifications/score-v01/`, `/{locale}/experimental-projects/`)
- `package.json` version 1.5.2 → 1.6.0; `src/data/version.ts` RELEASES entry prepended; this CHANGELOG entry added

### Per-check findings on the external panel

- `llms-txt`: median 90, mean 54.9 — **bimodal distribution**. Sites either have a spec-compliant file (90+) or no file at all (0); very few sit between. The cost of going from 0 → 90+ is a single file commit, not a multi-stage migration.
- `jsonld`: median **0**, mean 26.1 — **more than half of the panel emits no recognizable `@type`**. Including major documentation portals. A `jsonld` score of 0 does not mean the site is broken — it means there is no entity-graph surface for an AI crawler to ground a citation on.
- `canonical`: median 90, mean 67.9 — bimodal again (either consistent or absent).
- `robots-ai`: median 80, mean 78.7 — narrower distribution; most sites have neutral robots posture without explicit AI-bot policy.
- `meta`: median 80, mean 78.5 — the most stable check across the panel.

### Validation status after this release

The score has now passed two of the three tests a measurement tool has to pass:

1. **Internal consistency** ✅ (v1.5.2 update — fixes produce the deltas the spec predicts)
2. **Non-flat external distribution** ✅ (this release — n=39 panel produces stdev 19.5 with clear category-level differentiation)
3. **Predictive validity for actual AI citation** — **pending Experiment Log #3 (citation correlation pilot)**

Test #3 is the decision point: does the score predict the outcome it claims to predict? If yes, the v0.2 weights re-tune and Phase 2 (Community) launches. If no, the spec gets a substantially more interesting follow-up post.

### Raw data

The reproduction artifacts (URL list, run script, 39 raw `--json` results, analysis script, summary JSON) are committed at `open-llmo/llmo-checker` commit `3fdff05`: `experiments/external-baseline-2026-05/`. Anyone can re-run with `llmo-checker@0.1.0` and confirm within ±1 of the published scores (sites do drift between runs; a single new `<meta>` tag can shift `meta` by 10).

### Why MINOR

New Public Experiment Log article shipped in 8 locales with raw data committed publicly. Per versioning policy this is a "new case study, new research entry" → MINOR. Not MAJOR because no framework component renamed or scoring rule changed.

---

## [1.5.2] — 2026-05-24 — **Experiment Log #1 follow-up**

### Headline

All four fixes promised at the end of Experiment Log #1 ("What we are still changing on our own sites") shipped the same day as the original v1.5.1 errata, in two waves. The four fixes covered: `propel-lab.co.jp` description (47 → 129 chars, shipped earlier in v1.5.1), `kaoriq.com` robots.txt AI-bot opt-in, `llmoframework.com` `/llms.txt` link section, and `kenimoto.dev` `/llms.txt` link section. Concurrently, `mypcrig.com` and `kaoriq.com` had their `Person` schema lifted out of `Organization.founder` nesting into an independent `@type` block, addressing the second item on the same to-do list.

The post was closed with an **"Update (2026-05-24, same day): re-measured after shipping the four fixes"** section in all 8 locales, with a before/after table and a delta analysis showing that the rule-predicted score changes match the observed score changes exactly.

### What changed (per locale, 8 files)

- Appended `## Update (2026-05-24, same day): re-measured after shipping the four fixes` to `experiments/dogfooding-our-own-sites.md` in EN/JA/PT/ES/KO/ZH/DE/FR
- Re-measured scores published: `llmoframework.com` 96 → 99 (llms-txt 90 → 100), `kenimoto.dev` 96 → 99 (llms-txt 90 → 100), `kaoriq.com` 93 → 96 (jsonld 82 → 94), `mypcrig.com` 90 → 93 (jsonld 82 → 94), `propel-lab.co.jp` 96 → 96 (already updated in v1.5.1)
- Delta analysis: `llms-txt` weight 20 × 10-point jump (90 → 100) = +2 overall (rounded to +3 by per-check rounding); `jsonld` `@type`-count bump (+12 per recognized `@type`, weight 20%) = ~+2.4 overall — both observed deltas match the spec-predicted deltas
- Honest framing: "this update only confirms that the score is internally consistent — fixes produce the deltas the spec predicts. The external panel and the citation-correlation pilot are the real validation path"

### What this proves (and what it does not)

It proves that the score is **internally consistent**: when the underlying signal changes by the amount the spec describes, the score moves by the amount the spec predicts. That is the floor: a score that fails this is broken before any external-validity question can be asked.

It does **not** prove that any of these deltas correlate with downstream AI citation behavior. That is still the job of Experiment Log #3 (citation-correlation pilot). The next two Experiment Logs (external baseline panel + citation-correlation pilot) remain the real validation path.

### Why MINOR

Same-day follow-up updates to a published Experiment Log with re-measurement data, no new framework component or scoring change. Marked MINOR (not PATCH) because the update materially completes the open commitment in v1.5.1's closing paragraph ("We will publish a follow-up Experiment Log when these are done, with re-measured scores. Honest delta or no delta."), which raises the post's evidentiary weight rather than just adding an editorial section.

---

## [1.5.1] — 2026-05-24 — **Errata**

### Headline

Experiment Log #1 ("Dogfooding our own sites") was retracted and rewritten across all 8 locales. The post had claimed that `propel-lab.com` scored 29 / 100 as our corporate site. `propel-lab.com` is **not our property** — it is a third-party parked domain (GoDaddy / `wsimg.com/parking-lander` template with Google AdSense for Domains). Our actual corporate site is `propel-lab.co.jp`, which scored **94 / 100** in the same run.

This is a factual correction. We are leaving the original story line preserved inside the rewritten post (as a "what this almost was" section) rather than scrubbing it, on the same falsifiability principle the score itself is built on.

### What changed (per locale, 8 files)

- Removed `propel-lab.com` from the results table, added `propel-lab.co.jp` (94/100) in its place
- Rewrote the post around two new sections: **"What this experiment was almost about"** (the original 29/100 story, marked as a near-miss) and **"What we learned that we did not expect"** (narrative discipline as the actual takeaway)
- New honest framing: all 6 owned sites scored 90+, which is too clean to function as proof of the score's predictive power. The next two Experiment Logs (external baseline panel + citation-correlation pilot) become the real validation path
- Reproduction commands updated to use `propel-lab.co.jp` for the corporate row, with the parking-domain `curl` retained as a teaching artifact

### Why we are publishing this rather than silently fixing

A measurement project that hides its near-publication mistakes is the same project that hides its bad scores. The whole `llmo-checker` value proposition is "measure before you assume." Almost publishing a post based on an unmeasured domain-ownership assumption is the wrong kind of irony to bury.

### Process note

The error was caught by re-running `curl -s https://propel-lab.com/lander | head -1` and noticing `LANDER_SYSTEM` / `wsimg.com/parking-lander` / `adsense/domains` signatures in the destination HTML. WHOIS / DNS / registrar checks would have caught it earlier; future Experiment Logs that name specific domains will include an ownership-verification step before measurement.

---

## [1.5.0] — 2026-05-24

### Headline

Phase 1 (Reproducibility) content kickoff. The release publishes the **Score v0.1 Draft Specification** and the first entry of a **Public Experiment Log** series ("Dogfooding our own sites"), both translated to all 8 locales. The reference implementation `open-llmo/llmo-checker` is now live on GitHub as a separate OSS repository.

### Added (16 new pages across 8 locales / 2 page types)

- `specifications/score-v01/` — formal LLMO Score v0.1 Draft Specification. Documents per-check scoring rules (`llms-txt` 20, `robots-ai` 15, `canonical` 15, `jsonld` 20, `meta` 15), JSON output schema with stability guarantees, exit codes, deliberate v0.1 exclusion list (Citation Visibility / Chunk Readability reserved for v0.2), and versioning policy
- `experiments/dogfooding-our-own-sites/` — first Public Experiment Log. Measures 6 sites we own with `llmo-checker@0.1.0`: llmoframework.com 96, kenimoto.dev 96, legacydram.com 93, mypcrig.com 90, kaoriq.com 90, **propel-lab.com 29 (critical)**. Includes diagnosis of why the corporate site failed (JS redirect + missing canonical), concrete fix backlog, and follow-up commitment

### Reference implementation (separate repo)

- `open-llmo/llmo-checker` published on GitHub: Node 20+ TypeScript CLI, 5 static checks, weighted scoring (total weight 85), vitest suite (11 tests), GitHub Actions CI green on Node 20.x / 22.x
- README badges (CI / npm version / npm downloads / supported Node / MIT) + CHANGELOG v0.1.0 entry
- npm publish pending: account verification (2FA setup) blocked the publish. Interim install via `npx github:open-llmo/llmo-checker <url>` documented in README

### Sidebar

- New top-level "Specifications" section (translated to all 8 locales) linking the Score v0.1 Draft Spec
- New top-level "Experiments" section (translated to all 8 locales) linking the dogfooding entry
- Both sections placed directly after the existing "Open LLMO Research Initiative" group

### Translation QA

- `avoid-ai-writing-ja-detect`: ✅ PASS (Index 1)
- `avoid-ai-writing-en-detect`: ✅ PASS after em-dash density reduction (6.25 → 1.25/1000w via colon / parenthetical / comma / semicolon substitutions per context)
- `avoid-ai-writing-pt-detect`: ✅ PASS after EN residual cleanup ("AI bot" → "bots de IA", "roadmap" → "plano", "baseline" → "linha de base", "outcome" → "resultado", "shape" → "formato", "framing" → "enquadramento")
- `avoid-ai-writing-es-detect`: ✅ PASS after voseo cleanup ("lanzás" → "lanzas", "Agregá" → "Agrega", "Fijá" → "Fija") + same EN residual sweep as pt + `corre` → `se ejecuta` calque fix
- `avoid-ai-writing-ko`: ✅ PASS
- `zh / de / fr`: deferred to codex two-pass review (no dedicated detect skill, pattern parity with EN canonical maintained)

### i18n

- Open LLMO Research Initiative now has 8-locale parity for Phase 0 + Phase 1 content (24 + 16 = 40 initiative pages across 8 locales)

---

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
