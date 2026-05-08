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
export const VERSION = '1.1.0';

export const RELEASES = [
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
