---
title: "About the Open LLMO Research Initiative"
description: "Mission, research principles, Founder, and Phase roadmap of the Open LLMO Research Initiative."
pubDate: 2026-05-24
---

The **Open LLMO Research Initiative** is an independent research initiative on AI retrieval, citation, and grounding for the open web. It publishes specifications, benchmarks, and open-source tooling as its primary outputs.

## Mission

Research AI-native retrieval, grounding visibility, and LLM-oriented information architecture, and publish reproducible metrics and specifications.

### Research Areas

| Area | Scope |
|------|-------|
| AI Citation Analysis | The conditions under which LLMs cite content, and citation frequency |
| Grounding Visibility | Methods for visualizing what AI bases its responses on |
| LLM Retrieval Optimization | Document optimization for the LLM retrieval layer |
| AI-native Documentation | Research on document formats that LLMs handle well |
| Agent-oriented Information Architecture | Information structures that AI agents can operate on |

## Why This Initiative

The LLMO / AEO / GEO space is expanding rapidly, but three foundational pieces are missing:

- **No reproducible measurement** — there is no public tool that plays the role of Lighthouse or PageSpeed Insights for AI discoverability
- **No shared vocabulary or scope** — each vendor publishes its own definitions and the field has fragmented
- **Little open experimental data** — commercial SEO tools dominate, and the research layer is thin

This Initiative is built to fill those three gaps. The goal is to play the role Lighthouse plays for SEO: publish the methodology, ship the tooling, and let the community build on top.

## Research Principles

| Principle | Meaning |
|-----------|---------|
| Reproducibility first | Every metric ships with a calculation formula and an OSS checker |
| Draft over Standard | Specifications are published as "Draft / Experimental / Proposal v0.1" so they remain revisable |
| Open Source first | Tools under OSS licenses, data under CC BY, specifications under MIT |
| Solo-honest | Solo operation is stated explicitly rather than dressed up as a consortium |

## Founder

[Ken Imoto](https://kenimoto.dev). Author of multiple books on LLMO and harness engineering, published on Zenn and Amazon Kindle. Founder and CEO of Propel-Lab Inc. Responsible for the implementation and operation of multiple in-house frameworks and llmoframework.com.

Main publications:

- Books: [Full book list (kenimoto.dev/books)](https://kenimoto.dev/books/)
  - LLMO series (Kindle / Zenn Book, in Japanese, English, Portuguese, and Spanish)
  - Harness engineering series (Kindle / Zenn Book)
- Web: [kenimoto.dev](https://kenimoto.dev) / [propel-lab.co.jp](https://propel-lab.co.jp)
- Amazon Author Page: [Ken Imoto on Amazon](https://www.amazon.co.jp/stores/author/B0GQNPRCGF)
- Zenn: [zenn.dev/kenimo49](https://zenn.dev/kenimo49)
- OSS: [github.com/kenimo49](https://github.com/kenimo49)

## Phase Roadmap

The Initiative matures in phases. Each phase is the prerequisite for the next.

| Phase | Scope | Status |
|-------|-------|--------|
| Phase 0 | Research framing, Mission publication, first Experiment Log | In progress |
| Phase 1 | Reproducibility — OSS CLI (llmo-checker), Score v0.1 Draft, dataset publication | Planned |
| Phase 2 | Community — contributors, external references, feedback channels | Planned |
| Phase 3 | Standardization — formal specifications, Compatible certification badge, Working Group formation | Planned |

Standardization comes last. Without mature OSS, benchmarks, and implementations to back them up, neither certification nor specifications can earn trust.

## Contribute

| Method | Link |
|--------|------|
| Issues / bug reports | [github.com/kenimo49/llmo-guide/issues](https://github.com/kenimo49/llmo-guide/issues) |
| Pull Requests | [github.com/kenimo49/llmo-guide](https://github.com/kenimo49/llmo-guide) |

## License

This site and all draft specifications are published under the [MIT License](https://opensource.org/licenses/MIT).
