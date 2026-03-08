---
title: "3. Retrieval Signals"
description: Ensuring AI systems can find your content when they need it
---

## What It Is

Retrieval Signals are the indicators and mechanisms that enable AI systems to discover and access your content. This includes both traditional crawlability and newer AI-specific discovery methods.

## Why It Matters

Even the clearest, best-structured content is worthless if AI systems can't find it. As LLMs increasingly use retrieval-augmented generation (RAG), web browsing, and tool use, your content needs to be discoverable through multiple channels.

## How to Implement

### 1. Ensure Basic Crawlability
- Maintain an up-to-date `robots.txt` that allows AI crawlers
- Generate and submit a `sitemap.xml`
- Ensure pages load without JavaScript where possible (SSG/SSR)

### 2. Implement the llms.txt Standard
Create a `/llms.txt` file that provides a concise summary of your site, key pages, and how to navigate your content. This is the AI equivalent of a site's "About" page.

### 3. Provide Machine-Readable Endpoints
Offer content in formats AI systems can easily consume:
- Markdown versions of key pages
- API endpoints for structured data
- RSS/Atom feeds for updates

### 4. Optimize for AI Search Engines
Ensure your content appears in AI-powered search tools like Perplexity, SearchGPT, and Google AI Overviews by following their respective guidelines.

### 5. Cross-Reference Across Platforms
Publish consistent information on multiple platforms (your website, GitHub, LinkedIn, etc.) so AI systems can triangulate and verify your content from multiple sources.

## Examples

**Minimum retrieval setup:**
```
/robots.txt          — Allow crawlers
/sitemap.xml         — List all pages
/llms.txt            — AI-specific summary
/feed.xml            — RSS feed
```

**Enhanced retrieval:**
```
/api/info.json       — Structured data endpoint
/docs/overview.md    — Markdown version of docs
```

## Checklist

- [ ] robots.txt allows major AI crawlers
- [ ] sitemap.xml is generated and up-to-date
- [ ] llms.txt file exists with accurate site summary
- [ ] Key content is available without JavaScript
- [ ] Content is published on multiple platforms for cross-referencing
