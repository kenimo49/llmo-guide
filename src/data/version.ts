/**
 * Single source of truth for the framework version.
 * The site footer and the changelog page both read from here.
 *
 * Versioning policy (see CHANGELOG.md):
 * - MAJOR: breaking change to framework structure (component renamed/removed, scoring change)
 * - MINOR: new component, new guide article, new case study, new research entry
 * - PATCH: substantive section added to an existing article
 *
 * Design tweaks, typo fixes, translation backfills do NOT bump the version.
 */
export const VERSION = '1.5.2';

export const RELEASES = [
  {
    version: '1.5.2',
    date: '2026-05-24',
    summary:
      'Experiment Log #1 follow-up. The four fixes promised in "What we are still changing on our own sites" all shipped the same day; an "Update (2026-05-24, same day): re-measured after shipping the four fixes" section was appended to the post across all 8 locales with before/after table and rule-predicted delta analysis.',
    highlights: [
      'kenimoto.dev `/llms.txt`: link entries rewritten as spec-compliant `- [title](url)` (llms-txt 90 → 100, overall 96 → 99)',
      'mypcrig.com + kaoriq.com: `Person` schema lifted from `Organization.founder` nesting to an independent `@type` block (jsonld 82 → 94, mypcrig 90 → 93, kaoriq 93 → 96)',
      'Experiment Log #1 closed honestly with re-measured scores in all 8 locales; deltas match the published score weights as predicted',
    ],
  },
  {
    version: '1.5.1',
    date: '2026-05-24',
    summary:
      'Errata. Experiment Log #1 ("Dogfooding our own sites") was retracted and rewritten across all 8 locales: the post had claimed propel-lab.com scored 29/100 as our corporate site, but propel-lab.com is a third-party parked domain we do not own. The actual corporate site is propel-lab.co.jp (94/100). Rewritten as an honest narrative-discipline pivot.',
    highlights: [
      'Experiment Log #1 retracted and rewritten in 8 locales: propel-lab.com is not ours (parking domain with wsimg.com/parking-lander + Google AdSense for Domains fingerprint), corporate site is propel-lab.co.jp (94/100, well-grounded)',
      'New narrative: 6 owned sites all scored 90+, with the near-miss publication path preserved as a transparency record on falsifiability and narrative discipline',
      'CHANGELOG and version surface updated; all 8 locales rebuilt in one pass',
    ],
  },
  {
    version: '1.5.0',
    date: '2026-05-24',
    summary:
      'Phase 1 (Reproducibility) content kickoff. Score v0.1 Draft Specification and the first Public Experiment Log ("Dogfooding our own sites") shipped across 8 locales. Reference implementation released as open-llmo/llmo-checker on GitHub.',
    highlights: [
      'New Specifications section: Score v0.1 Draft Spec (5 substrate checks, weighted scoring, JSON output schema, versioning policy) translated to all 8 locales',
      'New Experiments section: first Public Experiment Log measured 6 sites we own with llmo-checker, propel-lab.com flagged at 29/100, honest reporting with concrete fix backlog',
      'Sidebar restructured: 2 new top-level sections (Specifications, Experiments) added in all 8 locales',
      'Reference implementation: open-llmo/llmo-checker scaffold + minimal CLI (Node 20+, TypeScript, 5 checks, CI green, MIT) — npm publish pending account verification',
      'Translation QA: avoid-ai-writing-{ja,en,pt,es,ko}-detect all PASS; zh/de/fr deferred to codex two-pass review',
    ],
  },
  {
    version: '1.4.0',
    date: '2026-05-24',
    summary:
      'llmoframework.com is now positioned as the Open LLMO Research Initiative, with the LLMO Framework as its first published reference artifact. Three new Initiative pages (About / Research Areas / Experimental Projects) translated to all 8 locales, sidebar restructured Initiative-first, Footer Founder attribution added site-wide.',
    highlights: [
      'New Initiative section: about/ research-areas/ experimental-projects/ added across 8 locales (24 new pages)',
      'Reframed hero + JSON-LD: "open standard" → "Open LLMO Research Initiative" with Founder attribution in Footer site-wide',
      'Sidebar: new top-level "Open LLMO Research Initiative" section placed before the Framework',
      'SoftwareApplication isPartOf WebSite: makes Framework ↔ Initiative relationship structural in schema, not only descriptive',
      'avoid-ai-writing-pt-detect v7 added §7.2.5 build-on-top calque family from codex review during the 6-locale translation sweep',
    ],
  },
  {
    version: '1.3.3',
    date: '2026-05-18',
    summary:
      'Closed the coherence drift documented in v1.3.2 in the same hour it was documented. 25 AI-only surfaces (llms.txt × 8 + about.md × 8 + framework.md × 8) now agree with the human-facing pages on 6 components and v1.3.2 as current version.',
    highlights: [
      'public/llms.txt (8 langs): version label v1.1.0 → v1.3.2',
      'public/ai/about.md (8 langs): added 6th component (Coherence Signals) per-language, max score 15 → 18 where stale',
      'public/ai/framework.md (8 langs): full ## 6. Coherence Signals section added, titles "5 Core" → "6 Core" where stale',
      'Discovery: framework.md drift was worse than about.md — all 8 langs had 5-item bodies, some with mismatched titles claiming 6',
    ],
  },
  {
    version: '1.3.2',
    date: '2026-05-18',
    summary:
      'Three measurement rounds showed citation rate = 0 while LLMO concepts were 75% mentioned. Rewrote the three highest-leverage pages to lead with question-form H2s and attached DefinedTermSet / FAQPage schema so the entity boundaries are unambiguous.',
    highlights: [
      'guide/what-is-llmo: H2s rewritten to match the FAQPage schema questions verbatim; each section opens with a one-sentence definition',
      'guide/llmo-vs-seo-aeo-geo: three new question-form H2s + FAQPage schema (was missing this layer)',
      'framework/overview: DefinedTermSet with 6 @id-pinned DefinedTerm entries so external sites can cite individual components by URL fragment',
      'Hypothesis test: does H2 phrasing alone move citation rate over 2-3 weeks of observation across Claude / Perplexity / OpenAI?',
    ],
  },
  {
    version: '1.3.1',
    date: '2026-05-08',
    summary:
      'The case study about closing five coherence surfaces failed at six. Removed hardcoded v1.0 CSS badge in the page header — surviving four releases unnoticed. Footer is now the single canonical version display.',
    highlights: [
      'Fixed: hardcoded "v1.0" CSS badge in src/styles/custom.css (caught by reader within an hour of v1.3.0)',
      'Self-audit case study: new "Postscript: The Sixth Surface" section in EN + JA',
      'Lesson: enumerate the visual layer, not just the data layer, when listing coherence surfaces',
    ],
  },
  {
    version: '1.3.0',
    date: '2026-05-08',
    summary:
      'The framework records its own coherence failure. New case study captures the v1.1.0→v1.2.0 release where the site shipped five out-of-sync version surfaces. Coherence Signals adds a Release Process sub-section generalizing the lesson.',
    highlights: [
      'New: case-studies/llmo-framework-self-audit — when the framework author violates the framework',
      'Coherence Signals: new sub-section "Release Process is a Coherence Surface"',
      'Framework principle: "implementing a framework and following it are different cognitive acts"',
    ],
  },
  {
    version: '1.2.0',
    date: '2026-05-08',
    summary:
      'Added two field-tested patterns — Identity-as-Code (one Person/Organization, one @id, cited everywhere) and Citation Preferred (named canonical entry points in llms.txt). Plus codex-second-pass cleanup: llms.txt now reflects the v1.1.0 framework, multi-language fallback signals are coherent, CI gates JSON-LD output verification.',
    highlights: [
      'Authority Signals: Identity-as-Code pattern + 3 checklist items',
      'Retrieval Signals: Citation Preferred + build-time llms.txt + 3 checklist items',
      'CI: scripts/verify-json-ld.mjs gate on JSON-LD parse and entity scope',
      'Coherence cleanup: llms.txt (8 langs) updated to 6 components / 18 points',
    ],
  },
  {
    version: '1.1.0',
    date: '2026-05-08',
    summary:
      'Added 6th framework component (Coherence Signals), audit methodology guide, and self-audit case study. Maximum framework score is now 18 (was 15).',
    highlights: [
      'New: Coherence Signals framework component',
      'New: LLMO Audit — Two-Pass Review guide',
      'New: Self-Audit case study on the Propel-Lab reference site',
      'Updated: Structural Formatting now covers JSON-LD scope and output verification',
    ],
  },
  {
    version: '1.0.0',
    date: '2026-04-30',
    summary:
      'Initial public release of the LLMO Framework with 5 components, 8 languages, and Getting Started + Framework + Case Studies + Research sections.',
    highlights: [
      'Framework: 5 components (Knowledge Clarity / Structural Formatting / Retrieval / Authority / Citation)',
      'Multilingual: 8 languages',
      'LLMO surfaces: llms.txt, /ai/, JSON-LD, robots.txt with AI-bot allowlist',
    ],
  },
] as const;
