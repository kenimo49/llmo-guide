---
title: "Dogfooding LLMO Score v0.1: We Ran the Checker on Our Own 6 Sites"
description: "We measured 6 sites we own — including the corporate site of the initiative behind LLMOFramework — with the new llmo-checker CLI. The corporate site scored 29 / 100."
pubDate: 2026-05-24
---

The first **Public Experiment Log** of the Open LLMO Research Initiative.

We just released [`llmo-checker`](https://github.com/open-llmo/llmo-checker), a Lighthouse-style CLI that scores how AI-retrievable a URL is (v0.1 Draft). The very first thing we did with it was point it at every site we operate — including the corporate site of the lab that runs this initiative.

The headline result: **our own corporate site scored 29 / 100**, lower than any of the consumer-facing sites it supposedly serves as a reference for.

## Methodology

- Tool: `npx llmo-checker <url>` v0.1.0 (commit `1db47ea`)
- Date: 2026-05-24
- Sites: 6 properties we own or operate
- Score: weighted average of 5 static checks — `llms-txt` (weight 20), `robots-ai` (15), `canonical` (15), `jsonld` (20), `meta` (15)
- Score bands: 85+ well-grounded · 65–84 needs work · 40–64 poor · 0–39 critical

All checks are pure HTTP fetches and HTML parsing. In v0.1 there is no AI-citation simulation: the score measures the **substrate** that an AI crawler can actually see.

## Results

| Site | Role | Score | Band | Weakest check |
|---|---|---|---|---|
| `llmoframework.com` | This initiative's site | **96** | well-grounded | `llms-txt` lacks link list (cosmetic) |
| `kenimoto.dev` | Author personal site | **96** | well-grounded | same as above |
| `legacydram.com` | Whisky × engineer media | **93** | well-grounded | JSON-LD partial (no `Organization`/`Person`) |
| `mypcrig.com` | PC-build curation site | **90** | well-grounded | No `hreflang` (single-language is fine) + JSON-LD partial |
| `kaoriq.com` | Fragrance e-commerce | **90** | well-grounded | No explicit AI-bot rules in robots.txt |
| **`propel-lab.com`** | **Operating lab corporate site** | **29** | **critical** | Nearly everything |

`propel-lab.com` is the corporate site of the lab that runs this very initiative. It scored worse than every consumer-facing product site we ship.

## Why the corporate site failed

Curling the root tells the whole story:

```bash
$ curl -s https://propel-lab.com/
<!DOCTYPE html><html><head><script>window.onload=function(){window.location.href="/lander"}</script></head></html>
```

The root of `propel-lab.com` is **one line of HTML**. A `window.location.href` redirect runs in the browser, sending visitors to `/lander`.

This is fine for a human in Chrome. It is invisible to every AI crawler we know of. None of GPTBot, ClaudeBot, CCBot, Google-Extended, PerplexityBot, or Applebot-Extended execute JavaScript on fetch. They see the literal HTML above and stop.

So at the root URL (the one most AI systems probe first), the checker found:

- Missing `<title>`
- Missing `<meta name="description">`
- Missing OpenGraph
- Zero `<h1>` elements
- Missing `<html lang>`
- No JSON-LD
- No `<link rel="canonical">`

We then ran the checker against the **redirect destination**, `https://propel-lab.com/lander`. It scored **31 / 100**, also critical. The destination page has content, but no canonical, no JSON-LD, and weak metadata.

Both layers fail.

## What this means

There is a common pattern where teams ship a "splash → landing" structure on the corporate site, assume Google handles JS just fine, and never check what the page looks like to a non-JS crawler. That assumption used to be mostly true for Google search. **It is mostly false for AI crawlers in 2026.**

In our case, the corporate site of an *LLMO-focused lab* fell into exactly this trap. We caught it because we built a tool that forced us to look at the substrate. Without the tool, we would have kept assuming everything was fine because the human-facing UX looked clean.

This is the entire point of publishing the checker as OSS. The substrate gap is invisible until you measure it.

## What we are changing

Adding this to our public backlog as a result of this experiment:

1. **Server-side redirect on `propel-lab.com/`** — replace the JS redirect with a 301 or render the landing content directly at the root
2. **Add canonical + JSON-LD `Organization` + OG metadata to `/lander`** — bring it from 31 to ≥ 85 on its own
3. **Re-run the checker as a smoke step** — script the audit into our own deploy pipeline, so future regressions surface immediately
4. **Improve `mypcrig.com` and `kaoriq.com` JSON-LD coverage** — both currently sit at 82 / 100 on `jsonld` because they emit some but not all relevant types (`Product`, `Person`, `Article`)
5. **Add explicit AI-bot policy to `kaoriq.com` robots.txt** — currently neutral; we want explicit opt-in for GPTBot / ClaudeBot / Google-Extended

We will publish a follow-up Experiment Log when these are done, with re-measured scores. Honest delta or no delta.

## Why we are publishing the bad score

There is a strong temptation, when you ship a measurement tool, to use it primarily on competitors. We are deliberately doing the opposite: the first public dataset for `llmo-checker` is **our own properties**, including the one that came out worst.

Two reasons:

1. **The score has to be falsifiable.** If we never publish a failing score on something we own, no one has reason to trust the scoring is honest.
2. **The initiative's credibility comes from artifacts, not framing.** A lab that publishes its own corporate site at 29 / 100 is more believable than one that publishes a manifesto and a 100 / 100 self-assessment.

## Limitations of this experiment

- v0.1 measures substrate only. A site could score 95 on substrate and still get zero AI citations because the content itself is uninteresting, contradicts known facts, or duplicates higher-authority sources. Citation Visibility is reserved for v0.2.
- The score weights (`llms-txt` 20, `robots-ai` 15, `canonical` 15, `jsonld` 20, `meta` 15) are author-set and unvalidated. They are reasonable defaults, not derived from outcome data. We expect to recalibrate them as we collect citation-outcome data through Phase 2.
- We tested home pages only. Article pages on each site may score differently.

## Reproducing this experiment

```bash
npx llmo-checker@0.1.0 https://llmoframework.com/
npx llmo-checker@0.1.0 https://kenimoto.dev/
npx llmo-checker@0.1.0 https://legacydram.com/
npx llmo-checker@0.1.0 https://mypcrig.com/
npx llmo-checker@0.1.0 https://kaoriq.com/
npx llmo-checker@0.1.0 https://propel-lab.com/
npx llmo-checker@0.1.0 https://propel-lab.com/lander
```

Add `--json` for machine output. Pin the version (`@0.1.0`); the JSON shape may change in v0.2.

## What's next

This is the first entry of a Public Experiment Log series. The next two we plan to run:

- **External baseline panel** — score a few dozen high-traffic technical sites (documentation portals, dev blogs, product marketing sites) and publish the distribution. This calibrates what "normal" looks like.
- **Citation correlation pilot** — for ~50 URLs, compare LLMO Score to actual AI citation rate (probing ChatGPT, Claude, and Perplexity). This is the first real test of whether the score predicts the outcome it claims to predict.

The full roadmap lives at [Experimental Projects](/experimental-projects/), and v0.1 score weights are defined in [Score v0.1 Draft Specification](/specifications/score-v01/).
