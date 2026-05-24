---
title: "LLMOFramework Score v0.1 — Draft Specification"
description: "Formal definition of the LLMOFramework Score v0.1 Draft: 5 substrate checks, weights, scoring rules, and JSON output schema. Reference implementation: llmo-checker."
pubDate: 2026-05-24
---

> **Status: Draft.** This is v0.1, the first published version. Weights, check list, and JSON output shape may change in v0.2 without backward compatibility. Pin a checker version if you depend on the JSON shape.

The LLMOFramework Score is a single number (0–100) summarizing how AI-retrievable a URL is. The v0.1 score measures **substrate signals only** — the static signals an AI crawler can extract from one HTTP fetch without running JavaScript, executing an LLM, or simulating retrieval.

The reference implementation is the OSS CLI [`llmo-checker`](https://github.com/open-llmo/llmo-checker), maintained by the Open LLMO Research Initiative.

## Design principles

1. **Substrate before behavior.** v0.1 measures signals an AI crawler can extract from a single HTTP fetch. Behavioral signals (citation, retrieval stability, LLM reading) are deferred to v0.2+.
2. **Reproducible.** Every check is a pure function of the fetched HTML, robots.txt, and llms.txt. No network beyond those, no AI calls, no clock-dependent behavior.
3. **Falsifiable scoring.** Each check publishes its scoring rule. If you disagree with a rule, you can run the checker and the spec side-by-side and show where they diverge.
4. **Honest weights.** v0.1 weights are author-set defaults, not derived from outcome data. v0.2 will recalibrate using the [citation correlation pilot](/experiments/dogfooding-our-own-sites/).

## Score composition

The score is a weighted average of 5 checks:

| ID | Weight | Measures |
|---|---|---|
| `llms-txt` | 20 | Presence and structure of `/llms.txt` |
| `robots-ai` | 15 | Explicit posture toward known AI crawlers in `/robots.txt` |
| `canonical` | 15 | `<link rel="canonical">` correctness and `hreflang` alternates |
| `jsonld` | 20 | JSON-LD structured data presence, parseability, and recognized `@type`s |
| `meta` | 15 | `<title>`, `<meta name="description">`, OpenGraph, `<h1>`, `<html lang>` |

Total weight in v0.1: **85**. Scores normalize to 0–100 via weighted average.

### Score bands

| Band | Score | Interpretation |
|---|---|---|
| Green | 85–100 | Well-grounded for AI retrieval |
| Yellow | 65–84 | Needs work — several signals missing or weak |
| Yellow | 40–64 | Poor — significant grounding gaps |
| Red | 0–39 | Critical — page is largely invisible to AI crawlers |

## Per-check specifications

### `llms-txt` (weight 20)

**Fetches:** `GET {origin}/llms.txt`

**Scoring:**

| Condition | Score impact |
|---|---|
| HTTP 404 or 5xx | 0 |
| Body empty | 10 |
| Body non-empty (base) | 60 |
| Top-level `# Title` line present | +15 |
| At least one `## Section` heading | +10 |
| ≥ 3 link entries matching `^- \[` | +15 |
| 1–2 link entries | +8 |
| 0 link entries | +5 |

**Status:** `pass` ≥ 85, `warn` ≥ 60, `fail` otherwise.

Reference spec: [llmstxt.org](https://llmstxt.org/).

### `robots-ai` (weight 15)

**Fetches:** `GET {origin}/robots.txt`

**Recognized AI user-agents (v0.1):** `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`, `ClaudeBot`, `Claude-Web`, `anthropic-ai`, `CCBot`, `Google-Extended`, `PerplexityBot`, `Applebot-Extended`, `cohere-ai`.

**Scoring:**

| Condition | Score impact |
|---|---|
| HTTP 404 | 60 (warn — explicit posture recommended) |
| HTTP 5xx | 0 |
| Body parseable (base) | 70 |
| ≥ 3 recognized AI bots explicitly mentioned | +20 |
| 1–2 recognized AI bots mentioned | +10 |
| Wildcard `User-agent: *` group present | +10 |

**Status:** `pass` ≥ 85, `warn` ≥ 60, `fail` otherwise. Score clamps to 100.

Mention itself counts whether the rule is `Allow` or `Disallow`. v0.1 records `disallowedBots` in the JSON output but does not penalize Disallow — opting out of AI crawlers is a valid posture.

### `canonical` (weight 15)

**Source:** the fetched HTML.

**Scoring:**

| Condition | Score impact |
|---|---|
| No `<link rel="canonical">` | 0 (fail) |
| `href` not a valid URL | 20 (fail) |
| Canonical points to a different origin | 60 (warn) |
| Canonical points to same origin (base) | 90 (pass) |
| `<link rel="alternate" hreflang>` present | +10 |

**Status:** `pass` if canonical present and same-origin, `warn` for cross-origin, `fail` otherwise. Score clamps to 100.

Cross-origin canonical is intentional for republished mirrors but downscored by default because it is more commonly a misconfiguration.

### `jsonld` (weight 20)

**Source:** all `<script type="application/ld+json">` blocks in the fetched HTML.

**Recognized schema.org entity types (v0.1):** `Organization`, `Person`, `Article`, `BlogPosting`, `TechArticle`, `Book`, `WebSite`, `WebPage`, `BreadcrumbList`, `FAQPage`, `HowTo`, `Product`, `SoftwareApplication`.

**Scoring:**

| Condition | Score impact |
|---|---|
| No JSON-LD blocks | 0 (fail) |
| At least one parseable block (base) | 50 |
| Per recognized `@type` (capped at 3) | +12 each |
| `Organization` or `Person` present | +8 |
| Any block fails to parse | −20 |

The checker walks `@graph` arrays recursively to collect types.

**Status:** `pass` ≥ 85, `warn` ≥ 50, `fail` otherwise. Score clamps to 0–100.

### `meta` (weight 15)

**Source:** the fetched HTML's `<head>` and first `<body>`.

**Scoring:**

| Signal | Score impact |
|---|---|
| `<title>` length 20–70 | +20 |
| `<title>` present but outside 20–70 | +10 |
| `<meta name="description">` length 80–200 | +20 |
| Description present but outside 80–200 | +10 |
| OpenGraph `title` + `description` present | +20 |
| OpenGraph `type` present | +10 |
| Exactly one `<h1>` | +20 |
| `<html lang>` attribute present | +10 |

**Status:** `pass` ≥ 85, `warn` ≥ 60, `fail` otherwise. Score clamps to 100.

## JSON output schema

The CLI's `--json` output and the programmatic API both return:

```typescript
interface CheckerReport {
  url: string;              // resolved input URL
  origin: string;           // URL.origin of the page
  timestamp: string;        // ISO 8601
  checkerVersion: string;   // semver of the CLI
  scoreVersion: "0.1";      // version of this specification
  score: number;            // weighted average, 0-100
  checks: CheckResult[];
}

interface CheckResult {
  id: string;               // stable check identifier (e.g. "llms-txt")
  name: string;             // human-readable display name
  status: "pass" | "warn" | "fail" | "skip";
  score: number;            // 0-100
  weight: number;           // contribution to overall score
  details: Record<string, unknown>;  // check-specific data
  notes: string[];          // human-readable actionable notes
}
```

**Stability guarantees for v0.1:**

- The top-level field names (`url`, `origin`, `timestamp`, `checkerVersion`, `scoreVersion`, `score`, `checks`) are stable across all 0.1.x releases
- Each check's `id`, `weight`, and overall `status`/`score` shape is stable
- `details` shape is **not stable** within 0.1.x — new fields may be added in patch releases
- The set of `id`s in `checks` is stable in 0.1.x (no new checks added without a 0.2 release)

## Exit codes (CLI)

| Code | Meaning |
|---|---|
| 0 | Score ≥ 50 (passes minimum bar) |
| 1 | Score < 50 (below minimum) |
| 2 | Fetch error (network, DNS, non-2xx response) |

This makes the CLI usable as a CI smoke check: a failing site fails the pipeline.

## Reference implementation

Source: [`open-llmo/llmo-checker`](https://github.com/open-llmo/llmo-checker)

```bash
npx llmo-checker https://example.com
npx llmo-checker https://example.com --json
```

Requires Node.js 20+.

If the reference implementation and this spec disagree, the spec is correct in intent and the implementation should be fixed — please [file an issue](https://github.com/open-llmo/llmo-checker/issues).

## What v0.1 deliberately does not measure

These are valid LLMO concerns that we have not included in v0.1, with our reasons:

| Indicator | Reason deferred |
|---|---|
| Citation Visibility | Requires probing AI assistants. Out of scope for a pure static check. Planned for v0.2 as an optional opt-in check. |
| Chunk Readability | Needs a chunking strategy choice. v0.2 will use a documented default chunker so the check is reproducible. |
| Markdown Quality | Only applies when a Markdown source is published. v0.2 will detect `/index.md`-style endpoints. |
| Content quality / accuracy | Out of scope. The score measures substrate, not editorial quality. |
| Retrieval stability over time | Requires longitudinal probing. Reserved for the Benchmark project, not the per-URL Score. |

## Versioning policy

The score version is independent of the reference implementation version. v0.1 of the score may be implemented by `llmo-checker@0.1.x` (any patch). v0.2 of the score will require `llmo-checker@0.2.x`.

Breaking changes between minor versions of the score (0.1 → 0.2) are expected during the Draft phase. We will publish a 1.0 specification only after Phase 2 (Community) closes — that is, after we have outcome data from the citation correlation pilot, external implementations exist, and the weights have been recalibrated.

## Contributing

Spec changes happen via issues at the [llmo-guide repo](https://github.com/kenimo49/llmo-guide/issues) (this site's source).

When proposing a new check or weight change:

1. State the signal and what it measures (one sentence)
2. State the scoring rule (must be deterministic from one HTTP fetch unless v0.2+)
3. Cite a paper, public experiment, or Lighthouse-style argument for the weight
4. Provide a reproducer (a URL that scores high and a URL that scores low under the proposed rule)

Implementation changes happen at [`open-llmo/llmo-checker`](https://github.com/open-llmo/llmo-checker).

## Acknowledgments

The score structure is heavily influenced by [Lighthouse](https://developer.chrome.com/docs/lighthouse/) (Google) and the [llms.txt proposal](https://llmstxt.org/) (Jeremy Howard). Both are well-designed, opinionated, and falsifiable — properties we have tried to preserve.
