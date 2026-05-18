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
export const VERSION = '1.3.3';

export const RELEASES = [
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
