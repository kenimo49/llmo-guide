---
title: "LLMO FAQ"
description: "Frequently asked questions about implementing LLMO — how it relates to SEO, how long it takes, what to instrument first, and how to measure AI visibility."
pubDate: 2026-05-08
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Does LLMO replace SEO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. LLMO and SEO solve different problems and run in parallel. SEO targets ranked search results; LLMO targets being cited, summarized, or directly answered by AI systems (ChatGPT, Claude, Gemini, Perplexity). Most LLMO work — semantic HTML, JSON-LD, sitemaps, robots.txt — also strengthens SEO, so you do not pick one over the other."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to implement LLMO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A minimum LLMO baseline (llms.txt, /ai/ Markdown, robots.txt allowing GPTBot/ClaudeBot/PerplexityBot, JSON-LD on key pages) takes about 30 minutes on a small site. Reaching 16/18 on the LLMO Framework typically takes a few weeks of incremental work as you fix authority and citation signals across the site."
            }
          },
          {
            "@type": "Question",
            "name": "What should I implement first?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Start with Retrieval Signals: ship /llms.txt, /ai/ Markdown summaries, an updated robots.txt that explicitly allows AI crawlers, and a working sitemap.xml. These four touch the lowest layer — without them, Knowledge Clarity and Authority work cannot be discovered."
            }
          },
          {
            "@type": "Question",
            "name": "Do I really need /llms.txt and an /ai/ directory?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Both are recommended but optional. /llms.txt (per llmstxt.org) gives an AI a fast, structured map of the site — particularly valuable when AI agents fetch pages directly rather than via search. /ai/ Markdown gives crawlers and copy-paste users clean text without HTML chrome. They cost very little to maintain and remove ambiguity for AI ingestion."
            }
          },
          {
            "@type": "Question",
            "name": "How do I block AI crawlers I do not want?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use robots.txt with explicit User-agent directives. For example, 'User-agent: GPTBot' followed by 'Disallow: /' opts your site out of OpenAI training crawls. Each major crawler — GPTBot (OpenAI), ClaudeBot (Anthropic), PerplexityBot (Perplexity), Google-Extended (Google), Bytespider (ByteDance) — publishes its user agent and opt-out semantics. LLMO is opt-in; blocking is always allowed."
            }
          },
          {
            "@type": "Question",
            "name": "How do I measure whether LLMO is working?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Three layers: (1) Server logs — look for GPTBot, ClaudeBot, PerplexityBot user agents and which pages they fetch; (2) AI prompt audits — query ChatGPT, Claude, Perplexity with industry-relevant questions and check whether your site is cited; (3) Referral analytics — Google Analytics or server logs showing visits from chat.openai.com, claude.ai, perplexity.ai, and similar. Track all three monthly."
            }
          },
          {
            "@type": "Question",
            "name": "Is JSON-LD required, or is plain HTML enough?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Plain semantic HTML alone is workable but underperforms. JSON-LD (Schema.org) lets you express explicit facts — author, publisher, datePublished, sameAs identities — that AI systems consume without parsing prose. For LLMO, JSON-LD is the cheapest single move that lifts both Structural Formatting and Authority Signals simultaneously."
            }
          },
          {
            "@type": "Question",
            "name": "Does LLMO matter for B2B sites with low traffic?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes — arguably more. B2B traffic from AI search converts at much higher rates than from generic search (Go Fish Digital observed 25× higher conversion). When buyers ask AI assistants for vendors, being the cited source is more valuable than being on page 2 of Google."
            }
          },
          {
            "@type": "Question",
            "name": "How does LLMO relate to AEO and GEO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "LLMO is the umbrella. AEO (Answer Engine Optimization) targets featured snippets and voice answers — a 2018 concept by Jason Barnard, with no formal academic framework. GEO (Generative Engine Optimization) is the Princeton/IIT Delhi/Adobe paper from KDD 2024, focused specifically on generative search. LLMO synthesizes both, plus retrieval and authority signals, into one implementable framework."
            }
          },
          {
            "@type": "Question",
            "name": "Can I implement LLMO on a static site (no backend)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Static sites are the ideal LLMO target — every component (llms.txt, /ai/ Markdown, JSON-LD, robots.txt, sitemap.xml) is a static file. The site you are reading is a static Astro site published on GitHub Pages, scoring 18/18 on the LLMO Framework."
            }
          },
          {
            "@type": "Question",
            "name": "How often should I update content for Citation Signals?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AI systems weight freshness. Aim to update primary reference pages (frameworks, guides, papers/research) at least quarterly, and pages on fast-moving topics (model releases, AI policy, tooling) monthly. Always update both datePublished (creation) and dateModified (revision) — Microsoft's October 2025 guidelines list freshness as one of three core principles."
            }
          }
        ]
      }
---

Common questions about implementing the LLMO Framework. If yours is missing, [open an issue](https://github.com/kenimo49/llmo-guide/issues) — answers from the issue tracker get folded back into this page. For the underlying definition, see [What is LLMO?](/guide/what-is-llmo/).

## Does LLMO replace SEO?

No. LLMO and SEO solve different problems and run in parallel.

- **SEO** targets ranked search results.
- **LLMO** targets being cited, summarized, or directly answered by AI systems (ChatGPT, Claude, Gemini, Perplexity).

Most LLMO work — semantic HTML, JSON-LD, sitemaps, robots.txt — also strengthens SEO, so you do not pick one over the other.

## How long does it take to implement LLMO?

- **30 minutes**: minimum baseline (llms.txt, /ai/ Markdown, AI-allowing robots.txt, JSON-LD on key pages). See the [Quickstart](/guide/quickstart/).
- **A few weeks**: reach 16/18 on the [LLMO Framework](/framework/overview/). Most of the time goes into Authority and Citation signals across the site.

## What should I implement first?

Start with **Retrieval Signals** (Component 3):

1. `/llms.txt` at site root
2. `/ai/` Markdown summaries (and per-language if multilingual)
3. `robots.txt` explicitly allowing GPTBot, ClaudeBot, PerplexityBot, Google-Extended
4. `sitemap.xml` reachable from the root

Without these, Knowledge Clarity and Authority work cannot be discovered.

## Do I really need /llms.txt and an /ai/ directory?

Both are recommended but optional.

- **`/llms.txt`** (per [llmstxt.org](https://llmstxt.org/)) gives an AI a fast, structured map of the site — particularly valuable when AI agents fetch pages directly rather than via search.
- **`/ai/` Markdown** gives crawlers and copy-paste users clean text without HTML chrome.

They cost very little to maintain and remove ambiguity for AI ingestion.

## How do I block AI crawlers I do not want?

Use `robots.txt` with explicit `User-agent` directives. To opt out of OpenAI training crawls:

```
User-agent: GPTBot
Disallow: /
```

Major crawlers and their opt-out specs are listed in [Research → Papers](/research/papers/). LLMO is opt-in; blocking is always allowed.

## How do I measure whether LLMO is working?

Three layers, tracked monthly:

1. **Server logs** — look for GPTBot, ClaudeBot, PerplexityBot user agents and which pages they fetch
2. **AI prompt audits** — query ChatGPT, Claude, Perplexity with industry-relevant questions and check whether your site is cited
3. **Referral analytics** — visits from `chat.openai.com`, `claude.ai`, `perplexity.ai`, etc.

## Is JSON-LD required, or is plain HTML enough?

Plain semantic HTML alone is workable but underperforms. JSON-LD lets you express explicit facts — `author`, `publisher`, `datePublished`, `sameAs` identities — that AI systems consume without parsing prose. **It is the cheapest single move that lifts both Structural Formatting and Authority Signals at once.**

## Does LLMO matter for B2B sites with low traffic?

Yes — arguably more. B2B traffic from AI search converts at much higher rates than from generic search (Go Fish Digital observed 25× higher conversion). When buyers ask AI assistants for vendors, being the cited source beats being on page 2 of Google.

## How does LLMO relate to AEO and GEO?

LLMO is the umbrella.

| Standard | Origin | Scope |
|----------|--------|-------|
| AEO | Jason Barnard, 2018 | Featured snippets, voice answers — no formal framework |
| GEO | Princeton/IIT Delhi/Adobe, KDD 2024 | Generative search, academic |
| **LLMO** | This site, 2026 | All LLM interactions: search, chat, RAG, agents |

See [LLMO vs SEO vs AEO vs GEO](/guide/llmo-vs-seo-aeo-geo/) for the full breakdown.

## Can I implement LLMO on a static site (no backend)?

Yes. Static sites are the ideal LLMO target — every component (llms.txt, /ai/ Markdown, JSON-LD, robots.txt, sitemap.xml) is a static file.

The site you are reading is a static Astro site published on GitHub Pages, scoring 18/18 on the LLMO Framework.

## How often should I update content for Citation Signals?

AI systems weight freshness.

- **Quarterly**: primary reference pages (frameworks, guides, papers/research)
- **Monthly**: fast-moving topics (model releases, AI policy, tooling)
- **Always**: update both `datePublished` (creation) and `dateModified` (revision)

Microsoft's October 2025 guidelines list freshness as one of three core principles. See [Microsoft Guidelines](/research/microsoft-guidelines/).
