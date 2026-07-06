---
title: Multilingual LLMO
description: "Translating content is necessary but not sufficient for multilingual AI visibility. AI engines often cite the English version to non-English readers. What hreflang, canonicals, and per-language llms.txt actually do — and the asymmetry that makes non-English languages the higher-ROI investment."
pubDate: 2026-07-07
---

**Translating your content is necessary and not sufficient.** In 2026 there is a real, measurable gap between "I published a Portuguese version" and "AI search cites my Portuguese version." This guide covers the two multilingual problems LLMO has to solve: getting AI engines to cite the *right* language version, and deciding *which* languages repay the investment.

## The wrong-language citation problem

A classic search engine resolves *which document* to serve, then serves it. `hreflang` is a ranking signal it has been tuned on for two decades, and Google is genuinely good at picking the matching language URL.

An LLM-backed engine does something different: retrieve a handful of documents, generate an answer in the user's language, then attach whatever URLs the retrieval layer surfaced. The generation step is fluently multilingual. The retrieval step is where language selection lives — and it is frequently English-biased.

The observable result, from a cross-engine test of the same multilingual query (Glenn Gabe, GSQI) and a four-language site's own citation tracking:

- **Google-backed engines** (AI Overviews, AI Mode, Gemini, Copilot) inherit decades of `hreflang` handling and mostly cite the correct localized URL.
- **Perplexity**, set to prefer French, returned the US English page anyway.
- **ChatGPT** wrote its answer in French, then linked the English version of the page. The answer speaks the reader's language; the citation does not.

Why the retrieval layer defaults to English:

- The English version typically has more inbound links and longer crawl history, so it ranks higher in the retrieval index regardless of the reader's language.
- Many AI crawlers do not fully parse `hreflang` clusters the way Googlebot does.
- Translation quality is a trust signal. If a translated page reads like machine output, the retrieval layer treats it as a low-confidence duplicate and reaches for the English original.

The failure is not "the AI can't speak Portuguese." It is "the AI's retrieval layer doesn't trust your Portuguese page enough to cite it."

## What actually moves the needle, ranked

From a single-variable field experiment on a four-language site ([field report](https://kenimoto.dev/blog/ai-cites-wrong-language-version-multilingual-llmo/)):

1. **`hreflang` + `x-default` — did the most.** Every language version must declare the full cluster with a sane `x-default`. This is the one signal the Google-backed engines reliably read, and those engines are a large slice of AI search. If you do one thing, do this properly.
2. **Self-referencing canonical per language — quietly critical.** Each language version must canonical to *itself*, not to the English original. A translated page whose canonical points back to English is telling every crawler "the real page is the English one" — a self-inflicted wound.
3. **Per-language `llms.txt` — small, cheap, plausibly worth it.** Curate links per language so each file points at the correct localized URLs. No major engine is confirmed to weight this yet, but it costs fifteen minutes per language, has zero downside, and documents which URL is canonical per language.
4. **Trying to configure the engine — did nothing.** There is no setting that makes ChatGPT cite your localized URL. You cannot configure your way out of a retrieval bias; you can only feed the retrieval layer cleaner signals and wait.

Even with all signals clean, expect a residual gap: part of the failure lives inside retrieval layers you do not own. You can shrink the gap, not close it.

## Language asymmetry: the strategic upside

The same immaturity that causes wrong-language citations creates an opportunity. AI-search competition is dramatically uneven across languages, and the LLMO basics compound fastest in languages where they are still rare.

A 22-day GA4 measurement on one blog publishing the same content in four languages ([field report](https://kenimoto.dev/blog/four-languages-thirty-days-portuguese-four-x-traffic/)):

| Language | Pageviews | Articles | Notes |
|---|---|---|---|
| Portuguese | 748 | 17 | ~3.8× English with fewer articles |
| English | 195 | 26 | Saturated market, small share of voice |
| Japanese | 27 | 25 | Readers live on platforms (Qiita/Zenn), not blogs |
| Spanish | 7 | 10 | Thin competition but no community door |

**Language asymmetry can swallow article-count asymmetry whole.** Three asymmetries stacked to produce the Portuguese result:

1. **Community door** — a per-language open platform where an unknown author gets read the same day (Brazil has TabNews; English has no equivalent with a comparable floor).
2. **Thinner AI-search fields** — in Portuguese, far fewer candidates compete for the same prompts. The first reasonable answer in an underserved language wins; the first reasonable answer in English gets buried.
3. **Early-mover basics** — a `/pt/llms.txt` is mildly differentiating where most sites in that language ship nothing; in English the same file is mere hygiene.

The distribution model also differs per language: the Japanese result shows a language where the blog should serve as the canonical archive AI crawlers index, while platform posts (Zenn/Qiita) do the human-traffic work. Same content, opposite roles.

## Implementation order

1. **Identify each target language's community door before translating.** Not the audience size — the door. If there is no open posting platform, expect the Spanish outcome above.
2. **Ship `/{lang}/llms.txt` from day one.** Fifteen minutes per language; the cheapest differentiation available in underserved languages.
3. **Set up analytics with language-prefix filters before publishing**, or you will retrofit measurement in month two instead of writing.
4. **Translate the top 20% of articles first** — the ones most likely to land in the community door. Validate distribution before translating the archive.
5. **Track AI-search share of voice per language as separate KPIs.** Run the same brand-relevant prompts in ChatGPT, Perplexity, and Claude in each language, monthly ([Measuring LLMO](/guide/measuring-llmo/) covers the metrics). The asymmetries are large and invisible until measured.
6. **Hand-edit machine translations for register and locale.** Translation quality is a retrieval trust signal, not just a reader courtesy.

## How this site implements it

llmoframework.com publishes in 8 locales with English as the canonical source. Pages without a translation serve the English content as fallback with `noindex` and sitemap exclusion — an untranslated page should not compete with its own canonical in any retrieval index. Every locale declares a full `hreflang` cluster and self-referencing canonicals.

## Checklist

- [ ] Every language version declares the full `hreflang` cluster including `x-default`
- [ ] Every language version has a self-referencing canonical (never pointing at the English original)
- [ ] Each language directory ships its own `llms.txt` with localized URLs
- [ ] Untranslated fallback pages are `noindex`ed and excluded from the sitemap
- [ ] Translations are hand-edited for register and locale, not raw machine output
- [ ] Each target language's community door is identified before translation begins
- [ ] AI-search share of voice is measured per language, in-language, monthly
- [ ] Publishing effort is weighted toward underserved languages, not total speaker count
