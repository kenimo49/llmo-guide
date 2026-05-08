---
title: "2. Structural Formatting"
description: "Structural Formatting is the practice of organizing content using machine-readable formats — JSON-LD, semantic HTML, Markdown, llms.txt — so AI systems can efficiently parse and extract information."
pubDate: 2026-03-09
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

### 6. Scope JSON-LD Entities to Page Subject

Don't inject every entity on every page. Common LLMO setups put `Organization`, `Person`, `Service[]`, `Book[]`, `MusicGroup`, and `FAQPage` into a shared layout, which means your 404 page, your privacy page, and every blog post all carry the same payload. AI systems read this as semantic noise — entities are advertised on pages that have nothing to do with them.

The cleaner pattern is a **two-tier scope**:

| Tier | Entities | Where |
|------|---------|-------|
| Site-wide | `Organization`, `WebSite`, `Person` (founder/author) | Shared layout `<head>` |
| Page-relevant | `Service[]`, `Book[]`, `MusicGroup`, `FAQPage`, `ItemList`, `BreadcrumbList`, `Article` | The page that the entities are about |

A homepage with services and FAQ gets `Service[]` + `FAQPage`. A book catalog page gets `Book[]`. A music project page gets `MusicGroup`. The 404 page and the privacy page get only the site-wide tier.

Use stable `@id` values (`https://example.com/#org`, `#founder`, `#website`) so per-page entities can reference site-wide ones without re-declaring them.

### 7. Verify the JSON-LD Actually Emits

A common silent failure: you write `<script slot="head" type="application/ld+json">` in a page, but the layout has no matching `<slot name="head" />` declaration. The framework drops the script with no warning. Your structured data never reaches users — and you don't know.

Make output verification part of your build:

```bash
# Count JSON-LD blocks per page in the dist output
for p in dist/*/index.html dist/index.html; do
  n=$(grep -oE '<script type="application/ld\+json">' "$p" | wc -l)
  echo "$p: $n block(s)"
done

# Validate that each block parses
python3 -c "
import re, json, sys
with open('dist/index.html') as f: html = f.read()
for m in re.finditer(r'<script type=\"application/ld\+json\">(.+?)</script>', html, re.DOTALL):
    try: json.loads(m.group(1))
    except: sys.exit('INVALID JSON-LD: ' + m.group(1)[:200])
print('OK')
"
```

For a stronger guarantee, use the [Schema.org Validator](https://validator.schema.org/) and Google's [Rich Results Test](https://search.google.com/test/rich-results) on representative pages. CI can call these via API.

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
- [ ] Site-wide layout emits only `Organization` / `WebSite` / `Person`; page-relevant entities are scoped to their pages
- [ ] Each entity has a stable `@id` for cross-page reference
- [ ] Build pipeline verifies JSON-LD blocks emit and parse on every page (no silent drops)
- [ ] Representative pages pass Google Rich Results Test and Schema.org Validator
