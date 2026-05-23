---
title: "Experimental Projects"
description: "Three experimental projects of the Open LLMO Research Initiative: LLMOFramework Score, LLMOFramework Benchmark, and LLMOFramework Compatible."
pubDate: 2026-05-24
---

The experimental projects published by the Open LLMO Research Initiative. All ship in **Draft / Experimental** state. Formal specification status is deferred to Phase 3.

## Overview

| Project | Role | Analog | Status |
|---------|------|--------|--------|
| [1. LLMOFramework Score](#1-llmoframework-score) | Measure AI discoverability of a site | Lighthouse Score | Indicators being drafted (Draft v0.1 in Phase 1) |
| [2. LLMOFramework Benchmark](#2-llmoframework-benchmark) | Experimentally compare site structures | Industry-standard benchmark | Planning (Phase 1-2) |
| [3. LLMOFramework Compatible](#3-llmoframework-compatible) | Certification badge for compliant sites | "Certified" mark | Roadmap only (Phase 3) |

---

## 1. LLMOFramework Score

### What it measures

Per-site score of how recognizable, citable, and parseable content is for AI. The AI-era counterpart to SEO's Domain Authority or Lighthouse Score.

### Candidate indicators (v0.1 Draft)

| Indicator | Description |
|-----------|-------------|
| Citation Visibility | Whether the content gets cited by AI |
| Chunk Readability | How well the content chunks |
| Semantic Structure | How explicit the semantic structure is |
| AI Crawlability | AI crawler compatibility |
| llms.txt | llms.txt compliance |
| Markdown Quality | Structural quality |
| Entity Clarity | Ease of entity recognition |
| Retrieval Stability | Retrieval consistency |

Every indicator ships with a **calculation formula and OSS checker code**. Lighthouse earned trust because it was measurable and reproducible, and this project follows the same principle.

### Related OSS

`llmo-checker` is planned for Phase 1.

```
npx llmo-checker https://example.com

LLMOFramework Score: 74

Citation Visibility: 81
Semantic Chunkability: 68
AI Readability: 77
Grounding Stability: 70
```

### Status

Indicator definitions are being drafted. Draft v0.1 publication is targeted for Phase 1 (timing TBD).

---

## 2. LLMOFramework Benchmark

### What it compares

Experimental comparison of which site structures perform best for AI. No standard benchmark exists for AI retrieval and citation yet, so this project proposes a measurement methodology first.

### Candidate comparison axes

- Markdown vs HTML
- FAQ schema presence
- Table structure
- Chunk size
- Citation format
- Internal linking
- GitHub integration
- llms.txt compliance
- MCP exposure

### Publication policy

Each experiment ships as a **Reproducible Benchmark Report** on GitHub and on this site, including the dataset, measurement scripts, raw results, and evaluation prompts.

### Status

Planning stage. The first comparison experiment (Markdown vs HTML retrieval efficiency) is planned for Phase 1.

---

## 3. LLMOFramework Compatible

### Purpose of the badge

Certification mark for sites that comply with AI-optimized structure. Intended for SaaS, documentation sites, OSS projects, and AI products to display.

### Visual concept

```
[ LLMOFramework Compatible ]
[ AI Retrieval Ready ]
[ Grounding Optimized ]
```

### Compliance requirements (Draft concept)

| Requirement | Content |
|-------------|---------|
| llms.txt placement | A valid llms.txt exists at the site root |
| Semantic Structure | Major pages satisfy heading hierarchy and semantic HTML |
| Chunk Optimization | Major sections fit within the recommended chunk size range |
| Grounding-friendly Docs | Citations, data sources, and update dates are explicit |

### Status

**Roadmap only**. Positioned at Phase 3 (last). The reasons:

- Certification depends on ecosystem adoption, so Score and Benchmark must mature first
- Issuing certification while solo-operated reads as authority cosplay and erodes trust
- The Compatible badge will only be designed after the Open Source community has produced third-party adoption

---

## Mapping to Phases

| Phase | Project progress |
|-------|------------------|
| Phase 0 (current) | Indicator drafting, project concept publication |
| Phase 1 | Score Draft v0.1, `llmo-checker` OSS, first Benchmark Report |
| Phase 2 | Score revision, continuous Benchmark updates, community feedback integration |
| Phase 3 | Compatible certification design, formal specifications, Working Group formation |

Source code and discussion for each project are public at the [GitHub repository](https://github.com/kenimo49/llmo-guide) and [Issues](https://github.com/kenimo49/llmo-guide/issues).
