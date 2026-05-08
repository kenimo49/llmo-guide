---
title: "Self-Audit: 20 LLMO Findings on the Propel-Lab Reference Site"
description: "An LLMO framework site audited its own implementation in May 2026. The two-pass review (self → independent AI) surfaced 20 findings across SEO, structured data, and content coherence — including silent JSON-LD drops the team had run with for months."
pubDate: 2026-05-08
---

## Why This Case Study Exists

The other case studies on this site describe outcomes — TRM Labs' +8,337% AI traffic growth, Go Fish Digital's 25× conversion lift. They show *what's possible* when LLMO is implemented well.

This one shows *what goes wrong even when you build LLMO infrastructure on purpose*.

[Propel-Lab](https://propel-lab.co.jp/) is the company behind this framework. The site was built explicitly as a reference implementation: 11 JSON-LD schemas, llms.txt + llms-full.txt + llms-ja.txt, /ai/ Markdown directory, URL.md endpoints (`/company.md`, `/products.md`), Playwright tests asserting every LLMO surface. By any external rubric, the site looked complete.

A two-pass audit in May 2026 — first by the implementer, then by an independent AI agent ([codex CLI](https://github.com/openai/codex) in `--sandbox read-only` mode) — surfaced 20 distinct findings. We describe them here because **the second pass caught patterns the first pass structurally cannot see**, and the patterns generalize.

## Method

The audit covered two production sites built by the same team:

- [propel-lab.co.jp](https://propel-lab.co.jp/) — the company site, this framework's reference implementation
- [kaoriq.com](https://kaoriq.com/) — a multilingual content site (5 languages) built on the same playbook

For each site we ran a two-pass review:

1. **Pass 1 (self-review)**: Claude assistant in the same session as the original developer, reviewing source code and `dist/` output against an LLMO checklist.
2. **Pass 2 (independent AI)**: codex CLI in a separate process with `--sandbox read-only`, given the post-fix repository and a structured audit prompt.

Findings were triaged by severity (P0 / P1 / P2) and fixed in two commits per site. Total wall-clock time including both audit passes and remediation: ~6 hours per site.

## Findings That the First Pass Caught (n=11)

These are the kinds of issues a careful self-review can spot when you know the LLMO checklist:

| # | Finding | Why first pass caught it |
|---|---------|--------------------------|
| 1 | OG image fallback returned 404 in production | Visible if you check `curl -I` on the OG URL |
| 2 | `og:type` emitted twice (website + article) on blog posts | Shows up in any view-source check |
| 3 | Trailing slash missing on internal blog links → 301 redirects | Greps clearly for `]( /blog/` patterns |
| 4 | Static pages had no hreflang declarations | Comparing meta blocks across page types reveals it |
| 5 | JSON-LD `BlogPosting` missing `image` / `dateModified` / `publisher.logo` | Schema.org checklist |
| 6 | Header/Footer hardcoded in Japanese on the English page | Visiting `/en/` exposes it immediately |
| 7 | Coming Soon cards had no links | UX review |
| 8 | Empty `public/ai/` directory deployed | File system inspection |
| 9 | `llms.txt` only listed 2 of 5 supported languages | Comparing llms.txt to actual `/blog/` directory |
| 10 | Nav language switcher always showed all 6 languages, even on pages with no translation | Click-test reveals dead-ends |
| 11 | Diacritic loss in PT/ES translated content (não → nao, voce instead of você) | Native-speaker review |

The pattern: these are findings where **looking at the right thing surfaces the bug**. The reviewer just has to look.

## Findings the Second Pass Caught (n=9)

These are the findings that broke the implementer's mental model:

### F12. Silent JSON-LD drop via missing `<slot name="head" />`

The Astro layout had no `<slot name="head" />` declaration in its `<head>`. Pages that wrote `<script slot="head" type="application/ld+json">` for page-specific schema were silently dropped — the framework discarded the script with no warning.

The site had been deployed for months in this state. The implementer had written the schema in source. The schema never reached `dist/` HTML. The implementer was satisfied because "I added the JSON-LD." The implementation said: it was never emitted.

**LLMO lesson**: Output verification is a discrete framework concern. *Writing* JSON-LD and *emitting* JSON-LD are different events. The build pipeline must verify every JSON-LD block makes it to the served HTML, every release.

### F13. Two `Organization` entities, conflicting addresses

The shared layout emitted `Organization` with the address `天神4丁目6-28 天神ファーストビル7階`. A page-level snippet (intended to override the layout, but not written that way) added a second `Organization` with `天神4-6-28 天神第一ビル7F` — same building, different transcription. Both made it to HTML.

A crawler parsing both for the same `@id`-less entity gets two contradictory address strings. Some AI re-rankers explicitly look for self-consistency in structured data; conflict here lowers confidence.

**LLMO lesson**: Duplicate entity declarations are a coherence failure, not a structure failure. JSON-LD validators don't catch them because each declaration is individually well-formed. The fix is to assign stable `@id` values to all primary entities and use `@id` references everywhere else.

### F14. Cross-file numeric drift (4 books vs 14 books)

The author profile claimed:

- **4 books, Qiita 39,000+ PV** in `/ai/founder.md`, `llms-full.txt`
- **14 books, Qiita 80,000+ PV** in the homepage Profile component

Both surfaces were served to AI crawlers. An AI quoting `/ai/founder.md` reported stale numbers; an AI quoting HTML reported current numbers; the Person JSON-LD didn't include numeric stats and couldn't break the tie.

**LLMO lesson**: Coherence Signals are real. Every numeric or factual claim needs a single canonical source file, with all surfaces (HTML, Markdown, JSON-LD, llms.txt) generated from it.

### F15. JSON-LD over-injection on every page

The shared layout emitted 11 schemas on *every* page — `Organization`, `Person`, `Service[]` (×7), `MusicGroup`, `Book[]` (×2), `FAQPage`, `WebSite`. The 404 page advertised the full music project. The privacy page advertised every book. The /products page and /yureru page each carried entities they had nothing to do with.

A model parsing these reads them as page-relevant claims about page subject. Carrying `MusicGroup` on a 404 page is an LLM hint that the 404 page is about music — not what you want.

**LLMO lesson**: Structural Formatting requires *scope*, not just *presence*. Site-wide entities are `Organization` / `WebSite` / `Person`. Page-relevant entities (`Service[]`, `Book[]`, `MusicGroup`, `FAQPage`) belong on the pages that are actually about them.

### F16. og:locale stuck at ja_JP on English pages

The `/en/` page declared `og:locale = ja_JP` because the layout hardcoded it. Social platforms and AI integrations using OG metadata for language detection saw a Japanese page when serving an English audience.

**LLMO lesson**: OG metadata is part of multilingual LLMO. Language signal must be lang-aware end-to-end: HTML `lang`, JSON-LD `inLanguage`, OG `og:locale`, hreflang, content-language headers.

### F17. www. and apex domain mixed across `/ai/` files

The canonical domain was `https://propel-lab.co.jp`. Five `/ai/*.md` files referenced `https://www.propel-lab.co.jp` instead. AI agents crawling these markdown surfaces would receive the non-canonical URL and either follow a 301 (cost) or treat it as a separate entity (worse).

**LLMO lesson**: Canonical domain enforcement is not just an HTML concern. Every Markdown surface, every llms.txt link, every internal-reference URL must use the same canonical host.

### F18. 404 page canonical pointed to `/404/` instead of `/404.html`

Astro generated `dist/404.html` (per GitHub Pages convention). The page emitted `og:url = https://propel-lab.co.jp/404/` because that's the route Astro inferred. GitHub Pages serves `404.html` directly on any miss; the `/404/` URL doesn't actually return the 404 page.

Result: shared 404 URLs misdirected. The canonical declaration was internally consistent but didn't match the deployment.

**LLMO lesson**: Canonical URLs must match what the host serves, not what the framework infers. For 404 pages specifically, suppressing canonical and OG entirely is cleaner than declaring URLs that don't resolve.

### F19. Invalid HTML output (`<a>` adoption agency bug in `<table>`)

The `<dt>`-style company info table used `<a>` inside the last `<td>`. Astro's HTML emission produced an empty `<a></a>` plus an open `<a>` wrapping the entire next section — invalid HTML that browsers (and crawlers) auto-corrected differently. The empty anchor and the wrapping anchor both pointed to `mailto:info@propel-lab.co.jp`.

The fix was switching `<table>` → `<dl>` for the structured key/value layout; the bug stopped reproducing.

**LLMO lesson**: Output verification matters even for non-JSON-LD HTML. Invalid markup in `dist/` reaches AI crawlers — and the way each crawler corrects it is non-deterministic. Validate the actual served HTML against W3C validator at least at major releases.

### F20. Hreflang declared `/en/` as alternate for sub-pages with no English equivalent

The Japanese `/company/`, `/products/`, `/yureru/` pages declared `hreflang="en" href="https://propel-lab.co.jp/en/"`. But `/en/` is a single page that consolidates the whole English site — it isn't the company page in English, the products page in English, or the yureru page in English. The hreflang asserted a 4-to-1 equivalence that wasn't true.

**LLMO lesson**: Hreflang is a precision claim about content equivalence. Declaring `hreflang en` from a sub-page to a generic landing page is technically a misuse and downgrades multilingual signal. Cleaner: hreflang only on pages that have a true alternate, suppressed elsewhere.

## What the Findings Tell Us About LLMO Practice

Three patterns emerge from the second-pass set:

1. **Silent failures dominate**. The first-pass review caught issues that produce visible symptoms (broken images, wrong language). The second-pass caught issues where *the system runs fine but the LLMO outcome is wrong*: schema is silently dropped, two entities exist where there should be one, numbers drift across files. Symptoms appear only in AI citation quality — months later, if at all.

2. **Coherence is its own problem class**. Almost half the second-pass findings are about *the same fact appearing differently in two places*. Existing LLMO frameworks treat this implicitly under Authority or Structural Formatting. We've added [Coherence Signals](/framework/coherence-signals/) as a sixth framework component to surface it explicitly.

3. **The reference implementation has the same bugs as everyone else**. The site was built by people who teach LLMO. It still shipped with these issues. *Implementing LLMO is not the same as auditing it* — they require different attention modes, and the audit step is what most teams skip.

## Outcome

After remediation across both sites, the second-pass review re-ran clean for P0 and P1 findings. P2 items (Google Fonts self-hosting, expanded EN sub-page coverage) remain on the backlog as non-urgent.

Total commits: 4 commits across kaoriq, 2 commits across propel-lab-website. Net diff: ~600 lines added, ~550 lines deleted (mostly schema scope refactor and data deduplication). No content was lost; some content was rationalized into single-source files.

## What to Take Away

If you're auditing your own LLMO implementation:

1. **Do the audit at all**. The implementation step is not the audit step. Schedule a separate review.
2. **Use a two-pass structure**: yourself first, then an independent agent in read-only mode. See [LLMO Audit: Two-Pass Review](/guide/llmo-audit-two-pass-review/) for the operational details.
3. **Look at `dist/`, not just source**. The bugs that hurt LLMO live in the gap between intent and emission.
4. **Search for cross-file drift explicitly**. Numbers, addresses, dates, catalogs — any factual claim that appears more than once is a candidate for divergence.
5. **Verify schema scope**. If your shared layout emits more than `Organization` / `WebSite` / `Person`, page-relevant entities are probably bleeding onto pages they don't belong on.

The full set of findings, fixes, and reasoning is documented in commit history at the [propel-lab-website](https://github.com/kenimo49/propel-lab-website) and [kaoriq](https://github.com/kenimo49/kaoriq) repositories under May 8, 2026.

## Related

- [LLMO Audit: Two-Pass Review](/guide/llmo-audit-two-pass-review/) — methodology
- [Coherence Signals](/framework/coherence-signals/) — the framework principle most violated in this audit
- [Structural Formatting](/framework/structural-formatting/) — JSON-LD scope and output verification
