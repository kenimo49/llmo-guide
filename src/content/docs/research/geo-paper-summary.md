---
title: "GEO Paper: What the Science Says"
description: "Summary of the GEO (Generative Engine Optimization) paper from Princeton/IIT Delhi, published at KDD 2024. Key findings on citation rates, content strategies, and statistical improvements."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "GEO Paper: What the Science Says",
        "description": "Summary of the GEO paper (KDD 2024) with key findings on AI citation optimization.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"},
        "citation": {
          "@type": "ScholarlyArticle",
          "name": "GEO: Generative Engine Optimization",
          "author": "Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande",
          "datePublished": "2024",
          "url": "https://arxiv.org/abs/2311.09735"
        }
      }
---

The **GEO (Generative Engine Optimization)** paper is the first academic framework for optimizing content visibility in AI-powered search engines. Published at KDD 2024 (ACM SIGKDD), it provides empirical evidence for content optimization strategies that the LLMO Framework builds upon.

## Paper Details

| Field | Value |
|-------|-------|
| Title | GEO: Generative Engine Optimization |
| Authors | Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande |
| Institution | Princeton University, IIT Delhi, Adobe Research |
| Conference | KDD 2024 (ACM SIGKDD) |
| arXiv | [2311.09735](https://arxiv.org/abs/2311.09735) |
| Published | 2024 |

## Research Setup

The researchers built **GEO-Bench**, a benchmark of 10,000 search queries across multiple domains. They tested 9 content optimization strategies against a generative search engine to measure which approaches improved source visibility.

### The 9 Strategies Tested

1. Cite Sources
2. Quotation Addition
3. Statistics Addition
4. Fluency Optimization
5. Unique Words
6. Technical Terms
7. Authoritative Tone
8. Easy-to-Understand Language
9. Keyword Stuffing

## Key Findings

### Strategy Effectiveness

| Strategy | Visibility Improvement | LLMO Component |
|----------|----------------------|----------------|
| **Statistics Addition** | **+115.1%** | Citation Signals |
| **Cite Sources** | **+77.0%** | Citation Signals |
| **Quotation Addition** | **+72.2%** | Authority Signals |
| Authoritative Tone | +21.5% | Knowledge Clarity |
| Fluency Optimization | +15.2% | Knowledge Clarity |
| Technical Terms | +5.8% | Knowledge Clarity |
| Easy-to-Understand | +2.4% | Knowledge Clarity |
| Unique Words | -3.1% | — |
| Keyword Stuffing | -10.2% | — |

### The Top Three

The three most effective strategies share a common trait: they provide **verifiable, external evidence**.

1. **Statistics Addition (+115.1%)**: Adding specific numbers and data points made content more than twice as visible. Example: "Revenue grew 34% YoY" vs "Revenue grew significantly."

2. **Cite Sources (+77.0%)**: Referencing specific papers, reports, or documentation increased visibility by 77%. AI systems prefer content they can cross-reference.

3. **Quotation Addition (+72.2%)**: Including direct quotes from experts or authoritative sources added credibility that AI systems recognized and cited.

### What Doesn't Work

- **Keyword Stuffing (-10.2%)**: Traditional SEO tactics actively hurt AI visibility. AI systems can detect and penalize artificial keyword density.
- **Unique Words (-3.1%)**: Using unusual vocabulary did not improve visibility. Clarity beats cleverness.

## Implications for LLMO

### 1. Citation Signals are the highest-leverage component

The GEO data shows that Citation Signals (statistics, sources, quotes) account for the largest visibility improvements. This is why the LLMO Framework places Citation Signals as Component 5 — the capstone that multiplies the effect of all other components.

### 2. Content clarity matters, but less than evidence

Strategies related to Knowledge Clarity (authoritative tone, fluency, easy language) all showed positive but modest improvements (2–22%). Good writing is necessary but not sufficient. The multiplier comes from adding verifiable facts.

### 3. SEO tactics are counterproductive for AI

Keyword stuffing, the cornerstone of early SEO, actively reduced AI visibility. This confirms that LLMO requires a fundamentally different approach from traditional SEO.

## Domain-Specific Variations

The GEO paper found that strategy effectiveness varies by domain:

- **Factual/scientific queries**: Statistics Addition was most effective
- **Opinion/subjective queries**: Quotation Addition performed best
- **Technical queries**: Cite Sources had the highest impact

This suggests that LLMO implementation should be tailored to your content domain. A research site benefits most from statistics, while a thought leadership blog benefits more from expert quotations.

## How LLMO Builds on GEO

The LLMO Framework extends GEO in three ways:

1. **Broader scope**: GEO focuses on generative search engines. LLMO covers all LLM interactions including direct queries, RAG, and AI agents.
2. **Implementation focus**: GEO identifies *what* works. LLMO provides *how to implement it* with specific file formats (llms.txt), structured data (JSON-LD), and content design patterns.
3. **Retrieval layer**: GEO assumes content is already retrieved. LLMO adds the Retrieval Signals component to ensure content is discoverable in the first place.

## Further Reading

- [Full paper on arXiv](https://arxiv.org/abs/2311.09735)
- [LLMO Framework Overview](/framework/overview/)
- [Citation Signals](/framework/citation-signals/) — implementing the most effective GEO strategy
