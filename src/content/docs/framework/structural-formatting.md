---
title: "2. Structural Formatting"
description: "Structural Formatting is the practice of organizing content using machine-readable formats — JSON-LD, semantic HTML, Markdown, llms.txt — so AI systems can efficiently parse and extract information."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO Component 2: Structural Formatting",
        "description": "Structuring your content for machine consumption with JSON-LD, semantic HTML, and llms.txt.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

## What It Is

Structural Formatting is the practice of organizing your content using machine-readable formats and semantic markup so that AI systems can efficiently parse, categorize, and extract information.

## Why It Matters

AI systems don't "read" pages like humans do. They process structured data far more reliably than free-form text. Proper structure means your content is more likely to be correctly interpreted and cited, rather than misunderstood or overlooked.

## How to Implement

### 1. Use Semantic HTML and Markdown
Structure content with proper headings (h1-h6), lists, tables, and semantic elements. Avoid using visual formatting (bold, font size) as a substitute for structural hierarchy.

### 2. Implement JSON-LD Structured Data
Add Schema.org markup to your pages. At minimum, include:
- `Organization` or `Person` for your identity
- `Article` or `WebPage` for content pages
- `FAQPage` for Q&A content

### 3. Provide an llms.txt File
Create a `/llms.txt` file at your domain root following the [llms.txt standard](https://llmstxt.org/). This gives AI systems a concise, machine-friendly summary of your site.

### 4. Organize Content Hierarchically
Use a clear information architecture: broad categories → specific topics → detailed content. Mirror this in your URL structure and heading hierarchy.

### 5. Use Tables for Comparative Data
When presenting comparisons, features, or specifications, use proper HTML/Markdown tables rather than prose descriptions.

## Examples

**❌ Unstructured:**
> We offer three plans. The basic plan costs $10 and includes 5 users. The pro plan costs $25 and includes 20 users. The enterprise plan is custom priced with unlimited users.

**✅ Structured:**

| Plan | Price | Users |
|------|-------|-------|
| Basic | $10/mo | 5 |
| Pro | $25/mo | 20 |
| Enterprise | Custom | Unlimited |

## Checklist

- [ ] Pages use proper heading hierarchy (h1 → h2 → h3)
- [ ] JSON-LD structured data is present on key pages
- [ ] An llms.txt file exists at the domain root
- [ ] Content uses lists and tables where appropriate
- [ ] URL structure reflects content hierarchy
