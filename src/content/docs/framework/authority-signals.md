---
title: "4. Authority Signals"
description: "Authority Signals demonstrate expertise and trustworthiness to AI. When multiple sources provide similar information, AI cites the one that appears most credible."
pubDate: 2026-03-09
---

## What It Is

Authority Signals are the indicators that demonstrate your expertise, credibility, and trustworthiness to AI systems. They help LLMs determine whether to cite your content as a reliable source.

## Why It Matters

LLMs are trained to prefer authoritative sources. When multiple sources provide similar information, AI systems will cite the one that appears most credible. Authority signals help your content win this selection process.

## How to Implement

### 1. Provide Clear Author Attribution
Every piece of content should have a visible author with verifiable credentials:
- Full name and title
- Relevant experience and qualifications
- Links to professional profiles

### 2. Maintain Cross-Platform Consistency
Ensure your information is consistent across all platforms:
- Website bio matches LinkedIn profile
- GitHub profile links to your website
- Publications reference the same credentials

### 3. Publish Original Research and Insights
AI systems value original content over aggregated information:
- Share unique data and findings
- Provide expert analysis
- Document case studies and results

### 4. Build a Verifiable Track Record
Create a documented history of expertise:
- Published articles and papers
- Conference talks and presentations
- Open-source contributions
- Professional certifications

### 5. Identity-as-Code: One Person, One `@id`, Cited Everywhere

A four-language site with 32 articles and 22 book LPs can easily emit *80 different `Person` definitions* — one inline per page. Three problems follow:

1. **Entity fragmentation** — search engines and LLMs may treat each definition as a separate entity, so authority does not accumulate.
2. **Inconsistency drift** — a `jobTitle` change on the EN page and not the JA page silently splits the identity.
3. **Output bloat** — every page ships the same 1–2 KB of redundant JSON-LD.

The fix is to define each entity *once* with a stable `@id`, and reference it from everywhere else.

**Anti-pattern (per-page duplication):**

```json
// Every blog post and book page repeats the full Person object
{
  "@type": "BlogPosting",
  "author": { "@type": "Person", "name": "Ken Imoto", "jobTitle": "..." },
  "publisher": { "@type": "Organization", "name": "Propel-Lab", "url": "..." }
}
```

**Identity-as-Code pattern:**

```json
// Define once on the home page (or a dedicated identity page)
{
  "@type": "Person",
  "@id": "https://example.com/#person",
  "name": "Ken Imoto",
  "jobTitle": "AI Systems Engineer",
  "url": "https://example.com/",
  "sameAs": ["https://github.com/...", "https://linkedin.com/..."],
  "worksFor": { "@id": "https://example.com/#organization" }
}

// Reference from every article, book, and product page
{
  "@type": "BlogPosting",
  "author": { "@id": "https://example.com/#person" },
  "publisher": { "@id": "https://example.com/#organization" }
}
```

**Why it earns authority instead of fragmenting it:**

- Both Google and AI crawlers consolidate signals across pages onto the *same* entity node, so every article published reinforces the same expert profile.
- Cross-language sites (EN/JA/PT/ES) avoid splitting identity across language variants. The `@id` is the single source of truth.
- Adding a new platform (Hashnode, TabNews) or credential means updating *one* `sameAs` array, not 80 pages.

**Implementation rules:**

- Use a URL-based `@id` (`https://yoursite/#person`), not a random string. URL-based IDs let crawlers resolve them.
- Keep `Person`, `Organization`, and `WebSite` definitions on the home page (or a dedicated `/identity` page). Reference everywhere else.
- For multi-language sites, give *language variants* of `WebSite` distinct IDs (`/#website-en`, `/#website-ja`), but keep `Person` and `Organization` shared across languages.
- When an article mentions the author, the `author` field must be `{"@id": "..."}` — not the full Person object.

## Examples

**❌ Weak authority:**
> Some guy wrote this blog post about AI.

**✅ Strong authority:**
> Ken Imoto, AI Systems Engineer and CEO of Propel-Lab, author of "Practical Claude Code" and "LLMO" (published on Kindle and Zenn). Research focus: LLMO, AI Agent Design, Context Engineering.

## Checklist

- [ ] Author name and credentials appear on all content
- [ ] Professional profiles (LinkedIn, GitHub) are linked and consistent
- [ ] Original research or unique insights are published regularly
- [ ] Publications and credentials are verifiable
- [ ] Bio information is consistent across all platforms
- [ ] `Person` and `Organization` are defined once with URL-based `@id` on a home or identity page
- [ ] All other pages reference the entity by `{"@id": "..."}`, not by repeating the full object
- [ ] Multi-language variants share the same `Person`/`Organization` `@id` (only `WebSite` varies per language)
