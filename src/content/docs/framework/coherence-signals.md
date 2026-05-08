---
title: "6. Coherence Signals"
description: "Coherence Signals ensure the same fact tells the same story across every surface AI reads — HTML, JSON-LD, Markdown, llms.txt. Inconsistencies degrade citation accuracy and erode trust."
pubDate: 2026-05-08
---

## What It Is

Coherence Signals measure whether your content tells **the same story across every surface that an AI agent can read**. A modern LLMO-optimized site exposes facts through many channels:

- HTML page body (visible to humans + AI crawlers)
- JSON-LD structured data
- llms.txt and llms-full.txt
- /ai/*.md and URL.md endpoints (e.g. `/company.md`)
- OG/Twitter meta tags
- Sitemap, robots.txt, hreflang declarations

When the same fact (a number, an address, a service catalog, a publication date) appears differently in two of these surfaces, an AI system that draws from both gets confused. The model may pick whichever value it weighs more heavily, surface a stale figure, or refuse to cite at all because the conflict signals low quality.

Coherence is the LLMO discipline of guaranteeing **single source of truth** across every surface.

## Why It Matters

Citation accuracy depends on **convergent evidence**. When a model retrieves your content from multiple paths and the values agree, confidence rises and the citation is shipped to the user. When the values disagree, several failure modes appear:

- **Lower citation rate** — the model defers to a source where internal evidence is consistent.
- **Wrong fact cited** — if the AI picks the older variant from `/ai/founder.md`, your homepage's updated number never reaches the user.
- **Hallucination amplification** — when surfaces conflict, the model is more likely to interpolate a "compromise" answer that matches neither.
- **Authority erosion** — savvy AI re-rankers (Perplexity, AI Overviews) compare cross-references; conflicting self-references read as low quality.

A 2024 self-audit of [Propel-Lab](https://propel-lab.co.jp/) found that the same author profile claimed both **4 books / 39,000+ Qiita PV** (in `/ai/founder.md`, `llms-full.txt`) and **14 books / 80,000+ Qiita PV** (in the homepage profile component) — an active contradiction that had been served to AI crawlers for months.

## How to Implement

### 1. Designate a single source for each fact

For every numeric or factual claim, name **one** file as the canonical source. Every other surface imports or quotes it.

| Fact | Canonical source | Consumers |
|------|-----------------|-----------|
| Book count, PV stats | `src/data/profile.ts` | Profile component, `/ai/founder.md`, `llms-full.txt`, JSON-LD |
| Service catalog | `src/data/services.ts` | `/products/`, JSON-LD `Service[]`, `/ai/services.md`, `llms.txt` |
| Address, founding date | `src/data/company.ts` | Footer, `/company.md`, JSON-LD `Organization`, `llms-full.txt` |
| FAQ items | `src/lib/faq-schema.ts` | FAQ component, JSON-LD `FAQPage`, `/faq.md` |

The pattern is content collection or typed data module → templates and static endpoints both pull from it.

### 2. Generate AI surfaces from the same source as HTML

Don't hand-write `llms.txt` or `/ai/*.md` if their content already exists in typed data:

```typescript
// src/pages/products.md.ts
import { services } from '../data/services';

export const GET: APIRoute = async () => {
  const markdown = services
    .map((s) => `## ${s.name}\n\n${s.summary}\n\n— Target: ${s.target}`)
    .join('\n\n---\n\n');
  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
```

The HTML view, the JSON-LD `Service[]`, and `/products.md` all originate from `services`. Drift becomes structurally impossible.

### 3. Treat URL canonicalization as a coherence concern

`https://www.example.com/` and `https://example.com/` are two strings to a string-matching crawler. Pick one canonical host, then enforce it:

- `<link rel="canonical">` on every page
- `og:url`, JSON-LD `url`, sitemap entries — same host
- `/ai/*.md`, `llms.txt` references — same host
- Internal links — relative or canonical-absolute, never the alternate host

A common bug is forgetting `/ai/*.md` files when migrating from `www.` to apex (or vice versa). The rest of the site is canonical, and the Markdown surfaces silently leak the wrong host to AI.

### 4. Treat trailing-slash policy as a coherence concern

If your host normalizes `/blog/post` → `/blog/post/` with a 301, every internal link should already include the slash. Mixed forms produce:

- Wasted crawl budget on redirects
- Conflicting canonical signals during the redirect window
- Broken hreflang (some declared with slash, some without)

Pick a policy at the framework level (Astro `trailingSlash: 'always'` or `'never'`) and grep your repo to ensure no offenders remain.

### 5. Detect drift with cross-file checks

Add a CI step that grep's for the same numeric or string claim across surfaces and asserts equality:

```bash
# Will fail if any source has the old book count
! grep -rn "4 books\|4冊\|Kindle著者: 4" public/ src/data/ src/content/
```

Even simpler: a JSON-LD validator that parses both inline `<script>` and any standalone `.jsonld` file and asserts they agree on shared `@id` values.

### 6. Avoid duplicate JSON-LD entities for the same `@id`

The most common silent failure: the layout emits `Organization` with one address, and a per-page snippet emits another `Organization` with a different address. Both make it to HTML. The crawler parses both. The trust score for the page drops.

Fix: assign each entity an `@id` at the framework level (`https://example.com/#org`, `#founder`, `#website`) and reference by `@id` everywhere else. Any duplicate becomes obvious in code review.

## Examples

**❌ Drift across surfaces:**

```markdown
# /ai/founder.md
- Publishing: Kindle author of 4 books
- Technical Writing: 39,000+ PV on Qiita
```

```typescript
// src/components/Profile.astro (rendered to homepage)
<p>Kindle 14冊・Qiita 80,000+ PV。</p>
```

```jsonld
// JSON-LD on /
{ "@type": "Person", "name": "Ken Imoto" /* no current numbers */ }
```

Three surfaces, three different stories. An AI quoting `/ai/founder.md` reports stale numbers; an AI quoting the HTML reports current numbers; the JSON-LD provides no help in resolving the conflict.

**✅ Single source:**

```typescript
// src/data/profile.ts — canonical
export const profile = {
  highlights: [
    'Kindle author: 14 books',
    'Qiita: 80,000+ PV',
  ],
};
```

```astro
<!-- Profile component -->
{profile.highlights.map(h => <li>{h}</li>)}
```

```typescript
// src/pages/founder.md.ts
return new Response(
  `# Founder\n\n${profile.highlights.map(h => `- ${h}`).join('\n')}`,
  { headers: { 'Content-Type': 'text/markdown' } }
);
```

One value lives in one place. The HTML view, the AI Markdown endpoint, and the JSON-LD all evolve together.

## Checklist

- [ ] Every factual claim (numbers, addresses, dates, catalogs) has exactly one canonical source file
- [ ] AI-only surfaces (`llms.txt`, `/ai/*.md`, URL.md endpoints) are generated from the same data as the HTML, not hand-maintained in parallel
- [ ] Canonical host is consistent across `<link rel="canonical">`, `og:url`, JSON-LD, sitemap, and Markdown surfaces
- [ ] Trailing-slash policy is set at the framework level and reflected in every internal link
- [ ] No two JSON-LD blocks describe the same entity with different values; entities use stable `@id` for cross-page references
- [ ] CI checks for cross-file drift on key metrics (book counts, PV stats, service lists)
- [ ] Periodic two-pass audit (self review → second-opinion AI review) catches drift between releases — see [LLMO Audit: Two-Pass Review](/guide/llmo-audit-two-pass-review/)
