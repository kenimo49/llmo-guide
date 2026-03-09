# LLMO Framework — 5 Core Components

## Overview

The LLMO Framework provides a structured approach to making your content discoverable by AI systems. It consists of 5 components that work together to maximize AI discoverability.

## 1. Knowledge Clarity

**Goal**: Ensure your content is factually clear and unambiguous.

- Write in clear, declarative sentences
- State facts directly — avoid vague or ambiguous language
- Use consistent terminology throughout
- Define domain-specific terms explicitly
- Structure content around specific questions users might ask

**Example**: Instead of "We offer great solutions", write "Propel-Lab provides AI business automation consulting using multi-agent LLM systems."

## 2. Structural Formatting

**Goal**: Make content machine-readable.

- Use semantic HTML headings (H1 → H2 → H3)
- Embed JSON-LD structured data (Schema.org)
- Provide FAQ schemas for Q&A content
- Use bullet lists and tables for structured information
- Deliver Markdown files in /ai/ directory for direct LLM consumption

**Key schemas**: Organization, Person, Product, Service, Book, FAQPage, WebSite

## 3. Retrieval Signals

**Goal**: Help AI systems find and access your content.

- **llms.txt**: A root-level file providing a structured overview of your site for LLMs
- **/ai/ directory**: Clean Markdown files specifically for AI consumption
- **robots.txt**: Explicitly allow AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- **Sitemap**: XML sitemap for discoverability
- **Cross-linking**: Link between your llms.txt, /ai/ files, and main site content

## 4. Authority Signals

**Goal**: Establish credibility that LLMs recognize.

- Publish on multiple platforms (personal site, LinkedIn, Qiita, Zenn, DEV.to)
- Write books and maintain an author presence (Amazon, Zenn Books)
- Contribute to open-source projects on GitHub
- Get cited by other sources
- Maintain consistent identity across platforms (same name, same bio, same topics)

## 5. Citation Signals

**Goal**: Create content that LLMs prefer to cite.

- Include original data, statistics, and measurements
- Provide specific numbers and dates
- Create comparison tables and frameworks
- Write definitive guides on specific topics
- Publish research papers (arXiv, academic venues)

## Implementation Checklist

- [ ] llms.txt at site root
- [ ] /ai/ directory with Markdown files
- [ ] robots.txt allowing AI bots
- [ ] JSON-LD schemas on all pages
- [ ] FAQ schema for Q&A content
- [ ] Sitemap.xml
- [ ] Cross-platform presence with consistent identity
- [ ] Original data and statistics in content
- [ ] Clean, declarative writing style

## Learn More

- Full guide: https://llmoframework.com
- Book: https://zenn.dev/kenimo49/books/llmo-ai-search-optimization
- Author: https://kenimoto.dev
