---
title: "The LLMO Framework: A Standard for AI Discoverability"
description: "The LLMO Framework defines 5 core components for AI discoverability: Knowledge Clarity, Structural Formatting, Retrieval Signals, Authority Signals, and Citation Signals. Maximum score: 15 points."
---

The LLMO Framework defines five core components that determine whether AI systems can discover, understand, and accurately cite your content.

## The Five Components

### 1. Knowledge Clarity
Is your content clear enough for AI to understand and summarize accurately?

- Use plain, unambiguous language
- Define key terms explicitly
- Provide structured facts (who, what, when, where)
- Avoid jargon without explanation

### 2. Structural Formatting
Is your content structured for machine consumption?

- Use semantic HTML and Markdown
- Implement JSON-LD structured data
- Provide llms.txt for AI-specific content
- Organize content hierarchically

### 3. Retrieval Signals
Can AI systems find your content when they need it?

- Ensure crawlability (robots.txt, sitemap.xml)
- Provide machine-readable endpoints (/ai/, .md files)
- Implement the llms.txt standard
- Make content available via APIs where possible

### 4. Authority Signals
Does your content demonstrate expertise and trustworthiness?

- Author attribution with verifiable credentials
- Cross-platform presence (GitHub, LinkedIn, publications)
- Consistent information across all platforms
- Evidence-based claims with citations

### 5. Citation Signals
Does your content provide references that AI can verify?

- Link to primary sources
- Include publication dates
- Provide version information
- Reference academic papers and official documentation

## Scoring

Each component can be scored on a scale of 0-3:

| Score | Level | Description |
|-------|-------|-------------|
| 0 | None | Component not addressed |
| 1 | Basic | Minimal implementation |
| 2 | Good | Solid implementation with room for improvement |
| 3 | Excellent | Best-practice implementation |

**Maximum score: 15 points** (5 components × 3 points each)

## Self-Assessment Checklist

Score your own site against each component. Treat anything you can confidently check off as 1 point; aim for 3 boxes per component to reach the top score.

### 1. Knowledge Clarity (max 3)
- [ ] Every page leads with a one-sentence answer to its primary question (Answer-first)
- [ ] Domain-specific terms are defined on first use (no unexplained jargon)
- [ ] Each paragraph holds a single idea (no multi-claim paragraphs)

### 2. Structural Formatting (max 3)
- [ ] Pages use semantic H1 → H2 → H3 hierarchy with no heading skips
- [ ] Every meaningful page emits JSON-LD (Article / TechArticle / FAQPage / Product / Organization, as appropriate)
- [ ] Comparative content uses tables, not prose lists

### 3. Retrieval Signals (max 3)
- [ ] `/llms.txt` exists at the site root and lists key pages
- [ ] `/ai/` directory ships clean Markdown for each major topic (and per-language if the site is multilingual)
- [ ] `robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended; `sitemap.xml` is reachable

### 4. Authority Signals (max 3)
- [ ] Author has a verifiable bio with `sameAs` links to LinkedIn / GitHub / X / publication profiles
- [ ] The same identity (name, role, topic focus) appears consistently across at least 3 platforms
- [ ] Site links to original research, books, or papers the author has actually published

### 5. Citation Signals (max 3)
- [ ] Every claim that uses a number cites a source by name and year
- [ ] Each page exposes both `datePublished` and `dateModified` (in JSON-LD or visible meta)
- [ ] Comparison content references industry standards (W3C, RFC, ISO, schema.org) by name and link

### Scoring guide

| Total | Band |
|-------|------|
| 13–15 | Production-grade — actively cited by AI systems |
| 9–12 | Good — visible to AI but inconsistent |
| 5–8 | Partial — significant gaps in retrieval or authority |
| 0–4 | Invisible — start with `/llms.txt`, robots.txt, and JSON-LD |

> Want a higher score? Each component page (Knowledge Clarity, Structural Formatting, Retrieval Signals, Authority Signals, Citation Signals) lists the specific implementations that move the score from 1 → 2 → 3.
