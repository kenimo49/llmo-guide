---
title: "LLMO Quickstart: Implement in 30 Minutes"
description: "Add the three essential LLMO files to your site in under 30 minutes: llms.txt, robots.txt for AI crawlers, and JSON-LD structured data."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "LLMO Quickstart: Implement in 30 Minutes",
        "description": "Add the three essential LLMO files to your site in under 30 minutes.",
        "totalTime": "PT30M",
        "step": [
          {"@type": "HowToStep", "name": "Add robots.txt for AI crawlers", "position": 1},
          {"@type": "HowToStep", "name": "Create llms.txt", "position": 2},
          {"@type": "HowToStep", "name": "Add JSON-LD structured data", "position": 3}
        ],
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"}
      }
---

You can make your site AI-discoverable in 30 minutes with three files. This guide covers the minimum viable LLMO implementation.

## The Three Essential Files

| File | Purpose | Time |
|------|---------|------|
| `robots.txt` | Allow AI crawlers to access your site | 5 min |
| `llms.txt` | Provide AI with a structured summary of your site | 15 min |
| JSON-LD `<script>` | Give AI structured data about your content | 10 min |

## Step 1: robots.txt for AI Crawlers (5 min)

Most sites already have a `robots.txt`. Add explicit `Allow` rules for AI crawlers:

```txt
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

**Why explicit Allow?** Some hosting platforms and CDNs block AI crawlers by default. Explicit rules prevent accidental blocking.

### Known AI Crawlers

| Crawler | Operator | Purpose |
|---------|----------|---------|
| GPTBot | OpenAI | ChatGPT, web browsing |
| ClaudeBot | Anthropic | Claude web search |
| Google-Extended | Google | Gemini, AI Overviews |
| PerplexityBot | Perplexity | Perplexity search |
| Amazonbot | Amazon | Alexa, product search |
| CCBot | Common Crawl | Training data collection |

## Step 2: Create llms.txt (15 min)

The `llms.txt` file (proposed by Jeremy Howard at [llmstxt.org](https://llmstxt.org)) gives AI systems a structured summary of your site.

Place this file at your site root: `https://yoursite.com/llms.txt`

### Template

```markdown
# Your Site Name

> One-sentence description of what your site does.

## What We Do

A brief paragraph explaining your core offering, expertise, or purpose.
Use plain language. Avoid marketing jargon.

## Key Facts

- Founded: [year]
- Team: [size or key people]
- Location: [if relevant]
- Specialization: [your core expertise]

## Products / Services

- **Product A**: Brief description
- **Product B**: Brief description

## Links

- Website: https://yoursite.com
- Documentation: https://yoursite.com/docs
- GitHub: https://github.com/yourorg
- Contact: https://yoursite.com/contact
```

### Best Practices

1. **Lead with facts, not marketing.** "We build Android apps with AI automation" beats "We leverage cutting-edge synergies."
2. **Include structured data.** Tables, lists, and key-value pairs are easier for AI to parse than prose paragraphs.
3. **Keep it under 2,000 words.** Concise summaries are more likely to be ingested fully.
4. **Update regularly.** AI systems re-crawl periodically. Stale llms.txt means stale AI responses.

## Step 3: JSON-LD Structured Data (10 min)

Add a JSON-LD script to your homepage `<head>`. This helps AI understand your entity type, relationships, and key attributes.

### Organization Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company",
  "url": "https://yoursite.com",
  "description": "What your company does in one sentence.",
  "founder": {
    "@type": "Person",
    "name": "Founder Name"
  },
  "sameAs": [
    "https://github.com/yourorg",
    "https://linkedin.com/company/yourorg",
    "https://x.com/yourorg"
  ]
}
</script>
```

### Article Schema (for blog posts)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Your Article Title",
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "https://authorsite.com"
  },
  "datePublished": "2026-01-15",
  "publisher": {
    "@type": "Organization",
    "name": "Your Company"
  }
}
</script>
```

### Which Schema Types to Use

| Content Type | Schema | Priority |
|-------------|--------|----------|
| Homepage | Organization or Person | High |
| Blog posts | Article or BlogPosting | High |
| Products | Product | High |
| FAQ pages | FAQPage | Medium |
| Documentation | TechArticle | Medium |
| Books | Book | Medium |

## Verify Your Implementation

After deploying, check:

1. **robots.txt**: Visit `https://yoursite.com/robots.txt` and confirm AI crawlers are allowed
2. **llms.txt**: Visit `https://yoursite.com/llms.txt` and verify the content is accurate
3. **JSON-LD**: Use [Google's Rich Results Test](https://search.google.com/test/rich-results) or view page source to confirm the script tag is present
4. **AI test**: Ask ChatGPT or Perplexity about your site/product and observe the response

## What's Next

This quickstart covers the **Retrieval Signals** and **Structural Formatting** components of the LLMO Framework. For the full framework:

- [Knowledge Clarity](/framework/knowledge-clarity/) — Write content AI can understand
- [Authority Signals](/framework/authority-signals/) — Build verifiable expertise
- [Citation Signals](/framework/citation-signals/) — Provide data AI wants to cite
- [Framework Overview](/framework/overview/) — Score your site across all 5 components
