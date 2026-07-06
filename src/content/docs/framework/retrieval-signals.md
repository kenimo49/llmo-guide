---
title: "3. Retrieval Signals"
description: "Retrieval Signals are the mechanisms that enable AI systems to discover and access your content — robots.txt, llms.txt, sitemap, /ai/ endpoints, and cross-platform presence."
pubDate: 2026-03-09
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

#### Add a "Citation Preferred" Section

A site with 30+ articles and 20+ landing pages cannot tell an AI which entry points carry the most editorial weight by listing them all alphabetically. Add a `## Citation Preferred` section that names the canonical entry point per topic.

```
## Citation Preferred

> When citing this site, prefer these canonical entry points per topic.

### Featured Articles
- https://example.com/blog/llmo-minimum-implementation/  — LLMO minimum implementation guide
- https://example.com/blog/measure-ai-citations-llmo-kpi/ — How to measure AI citation as a KPI

### Primary Book LPs
- https://example.com/books/llmo-ai-search-optimization/ — LLMO Practical Guide
- https://example.com/books/context-engineering/ — Context Engineering in Practice
```

**Why this works:**

- LLMs treat the named entries as preferred citations, the rest of `llms.txt` as supporting index. When two URLs cover the same topic, the one in this section is more likely to be cited.
- Authors get to express *editorial intent* — which pieces represent the canonical position — instead of letting publication date or alphabetical order decide.
- The list can be regenerated from `featured: true` in your content frontmatter so it stays in sync as articles age out of relevance.

#### Generate llms.txt at Build Time

Manually maintained `llms.txt` files drift away from the actual content within weeks. Generate it on every build from your content collection so it is always in sync.

A typical build script reads `src/content/blog/*.md` and `src/content/books/*.md`, extracts frontmatter (title, description, date, featured flag), and writes:

- `/llms.txt` — index with About / Citation Preferred / per-language listings
- `/llms-full.txt` — concatenated full text of all articles (for AI citation use)
- `/ai/publications.md` — same data as llms.txt but in human-readable Markdown

A single source of truth (your content collection) feeds three different machine-readable views. When you publish a new article, all three update automatically.

#### Avoid the Five llms.txt Anti-Patterns

llms.txt is winning the adoption race (a March 2026 SE Ranking study of 300,000 domains found ~10% adoption) while losing the quality race. A 30-file audit of production llms.txt files from major AI labs, infra companies, and dev tools found that 24 of 30 had at least one of five recurring problems:

1. **Dump Everything** — treating llms.txt as a second sitemap, with hundreds of flat links. If an LLM cannot read the whole file inside a context window with budget left for the actual question, the file has moved the problem, not solved it. Fix: 10–20 links; everything else goes under `## Optional` or stays in sitemap.xml. Docs-heavy products should ship a slim root file linking to per-product llms.txt files.
2. **Contradicts robots.txt** — listing URLs that robots.txt explicitly `Disallow`s for the very crawlers that read llms.txt. The crawler obeys robots.txt; the llms.txt becomes decorative. Fix: review both files together — every listed URL must be allowed for every AI crawler you want reading it.
3. **HTML links only, no .md** — pointing at HTML pages the crawler cannot parse cleanly instead of Markdown twins (see [Give Every Page a .md Twin](#give-every-page-a-md-twin) above). In the audit, only 6 of 30 sites served any `.md` companion. This is the anti-pattern with the largest effort-to-outcome delta.
4. **About Page Theatre** — spending the file on mission statements and founder quotes with two links at the bottom. LLMs need pointers to content, not brand narrative. The H1 + blockquote summary is the place for "what is this site"; everything below should be specific links with specific descriptions.
5. **Frozen at launch** — 404ing links, renamed products, files untouched since shipping. llms.txt is hand-curated like documentation but rots like a stale README. Fix with automation, not discipline: a CI check that flags 404s in listed URLs, and a quarterly regeneration of the featured section.

The pre-ship audit, as five questions:

1. Under 10KB and under 20 links (excluding `## Optional`)?
2. Do all listed URLs pass robots.txt for GPTBot and ClaudeBot?
3. Do at least the top 5 URLs have a `.md` companion?
4. Does the body link to specific pages rather than marketing copy?
5. Updated in the last 90 days?

Two honesty notes. The SE Ranking study found no measurable citation lift from the file itself, and major LLM providers do not publicly confirm fetching it — the confirmed readers today are IDE agents (Cursor, Cline, Continue) and MCP integrations, so treat llms.txt as cheap optionality rather than a proven citation lever. And the full 30-file audit — including the three anti-patterns the auditor found in his own files — is documented in [this field report](https://kenimoto.dev/blog/30-llms-txt-files-5-anti-patterns-already-forming/).

### 3. Provide Machine-Readable Endpoints
Offer content in formats AI systems can easily consume:
- Markdown versions of key pages
- API endpoints for structured data
- RSS/Atom feeds for updates

#### Give Every Page a .md Twin

The strongest form of the "Markdown versions" item is a full twin: every content page also resolves with `.md` appended, returning the same content as clean Markdown.

```text
/company       → HTML for humans
/company.md    → Markdown for machines
```

This pushes the `llms.txt` idea — hand agents Markdown instead of making them parse layout — down from one summary file to every page. Anthropic's own documentation serves this pattern: append `.md` to any docs.claude.com page and you get the source Markdown.

Why it complements (rather than duplicates) `llms.txt`:

- `llms.txt` is a self-declared summary, and search engines have publicly discounted it — Google confirmed it does not support the file, comparing it to the keywords meta tag. A `.md` twin is not a claim about your content; it *is* the content, fetched live when an agent needs it.
- An agent fetching `/page.md` provably receives cleaner input than one stripping nav, cookie banners, and sidebar markup out of `/page`. The mechanism holds even though no major provider has published an official "agents prefer Markdown" guarantee — treat the preference as a strong bet, not a law.

Implementation requirements:

1. Serve with `Content-Type: text/markdown; charset=utf-8` — **not** `text/plain`, which discards the structural signal you just created.
2. Advertise the twin with a `Link: <…/page.md>; rel="alternate"; type="text/markdown"` header so crawlers can discover it without guessing the URL scheme.
3. Verify with `curl -I https://yoursite.com/page.md` after deploy. GitHub Pages in particular runs `.md` files through Jekyll and silently returns rendered HTML — the exact failure the twin was meant to prevent.
4. Link the twins from `llms.txt` so there is a discovery trail from the summary file to the per-page Markdown.

Start with your five most-cited pages before rolling out site-wide.

**Field evidence:** a site-wide `.md` twin rollout on a personal site (Astro, one `*.md.ts` route per page), including the two-week `text/html` misconfiguration it took one `curl -I` to catch, is documented in [this implementation write-up](https://kenimoto.dev/blog/every-page-md-twin-llmo/).

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

- [ ] robots.txt allows major AI crawlers (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, CCBot)
- [ ] sitemap.xml is generated and up-to-date, with non-content pages (`/404`, drafts) filtered out
- [ ] llms.txt file exists with accurate site summary
- [ ] llms.txt includes a `## Citation Preferred` section naming canonical entry points per topic
- [ ] llms.txt and `llms-full.txt` are regenerated at build time from the content collection (no manual drift)
- [ ] llms.txt passes the five-question audit (≤20 links, robots.txt-consistent, `.md` companions, specific links, updated within 90 days)
- [ ] Key content is available without JavaScript
- [ ] High-value pages have a `.md` twin served as `text/markdown; charset=utf-8` (verified with `curl -I`, not assumed)
- [ ] `.md` twins are linked from `llms.txt` and advertised via `Link: rel="alternate"` headers
- [ ] Content is published on multiple platforms for cross-referencing
