---
title: "Papers & References"
description: "Academic research and industry reports related to LLMO and AI search optimization. Includes GEO (KDD 2024), llms.txt proposal, and related studies."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO Research Papers & References",
        "description": "Academic research and industry reports related to LLMO and AI search optimization.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
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

## Related Research

### Schema.org Structured Data
- **URL**: [schema.org](https://schema.org/)
- **Relevance**: The vocabulary standard used for JSON-LD structured data implementation in LLMO Component 2 (Structural Formatting).

### Google Structured Data Documentation
- **URL**: [developers.google.com/search/docs/appearance/structured-data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- **Relevance**: Implementation guidelines for structured data that are recognized by both search engines and AI systems.

## Contributing

Know a relevant paper or report? [Open an issue](https://github.com/kenimo49/llmo-guide/issues) or submit a pull request to add it to this list.
