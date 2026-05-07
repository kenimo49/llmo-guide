---
title: "Papers & References"
description: "Academic research and industry reports related to LLMO and AI search optimization. Includes GEO (KDD 2024), llms.txt proposal, and related studies."
---

## Core Papers

### GEO: Generative Engine Optimization
- **Authors**: Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande
- **Institutions**: Princeton University, IIT Delhi, Adobe Research
- **Venue**: KDD 2024 (ACM SIGKDD)
- **Link**: [arXiv:2311.09735](https://arxiv.org/abs/2311.09735)
- **Summary**: First academic framework for optimizing content visibility in generative search engines. Tested 9 optimization strategies on 10,000 queries. Key finding: adding statistics improved visibility by +115.1%.
- **[Detailed summary →](/research/geo-paper-summary/)**

### llms.txt Proposal
- **Author**: Jeremy Howard
- **Link**: [llmstxt.org](https://llmstxt.org/)
- **Summary**: A proposal for a standardized file that provides information to LLMs about a website. Analogous to robots.txt but designed for AI consumption rather than crawler control.

## Industry Reports & Guidelines

### Microsoft: Optimizing Content for AI-Powered Search Answers
- **Publisher**: Microsoft (Bing Webmaster Blog)
- **Date**: October 2025
- **Summary**: Official guidelines identifying 3 principles for AI content optimization: Structure, Authority, and Freshness.
- **[Detailed summary →](/research/microsoft-guidelines/)**

### Ahrefs: Web Mentions vs Backlinks for AI Visibility
- **Publisher**: Ahrefs
- **Dataset**: 75,000 brands
- **Summary**: Web mentions (brand + keyword) are 3x more predictive of AI visibility than traditional backlinks.

### Gartner: The Future of Search
- **Publisher**: Gartner
- **Date**: February 2024
- **Summary**: Prediction that traditional search engine usage will decline by 25% by 2026 as users shift to AI-powered alternatives.

### Go Fish Digital: AI Search Conversion Rates
- **Publisher**: Go Fish Digital
- **Summary**: Traffic from AI-powered search converts at 25x the rate of traditional search traffic, due to pre-validated user intent.

## 2025–2026 Updates

The LLMO landscape has moved fast since the original GEO paper. The following sources are tracked as live, primary references.

### Cloudflare Radar — AI Insights
- **Publisher**: Cloudflare
- **URL**: [radar.cloudflare.com/ai-insights](https://radar.cloudflare.com/ai-insights)
- **Type**: Live dashboard (continuously updated)
- **Relevance**: Public data on AI bot crawl share, top AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Bytespider, Google-Extended, etc.), and per-domain AI bot vs. referral ratios. Cloudflare added AI bot blocking in 2024 and has published quarterly trend data through 2025.

### OpenAI GPTBot Documentation
- **Publisher**: OpenAI
- **URL**: [platform.openai.com/docs/bots](https://platform.openai.com/docs/bots)
- **Type**: Official crawler disclosure
- **Relevance**: Canonical reference for GPTBot user agent, IP ranges, robots.txt directives, and opt-out semantics. Updated continuously.

### Anthropic Crawler Disclosure
- **Publisher**: Anthropic
- **URL**: [support.anthropic.com](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- **Type**: Official crawler disclosure
- **Relevance**: Canonical reference for ClaudeBot, Claude-Web, and Claude-User user agents and how site owners control them.

### llms.txt Adoption Tracker
- **Publisher**: directory.llmstxt.cloud
- **URL**: [directory.llmstxt.cloud](https://directory.llmstxt.cloud/)
- **Type**: Community-maintained directory
- **Relevance**: Tracks sites that have adopted the `/llms.txt` standard. Adoption widened through 2025 across documentation sites (Anthropic, Mintlify, Stripe-style API docs).

### Schema.org Releases (2025)
- **Publisher**: schema.org
- **URL**: [schema.org/docs/releases.html](https://schema.org/docs/releases.html)
- **Type**: Versioned vocabulary releases
- **Relevance**: Continued additions to vocabulary used by LLMO Component 2 (Structural Formatting). Track new types relevant to AI consumption (e.g. `LearningResource`, `EducationalOccupationalCredential`).

## Related Research

### Schema.org Structured Data
- **URL**: [schema.org](https://schema.org/)
- **Relevance**: The vocabulary standard used for JSON-LD structured data implementation in LLMO Component 2 (Structural Formatting).

### Google Structured Data Documentation
- **URL**: [developers.google.com/search/docs/appearance/structured-data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- **Relevance**: Implementation guidelines for structured data that are recognized by both search engines and AI systems.

## Contributing

Know a relevant paper or report? [Open an issue](https://github.com/kenimo49/llmo-guide/issues) or submit a pull request to add it to this list.
