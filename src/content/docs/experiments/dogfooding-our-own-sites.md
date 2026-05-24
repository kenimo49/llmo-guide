---
title: "Dogfooding LLMO Score v0.1: We Ran the Checker on Our Own 6 Sites"
description: "We measured 6 sites we operate with the new llmo-checker CLI. All scored 90 or higher. The more interesting result was the one we almost published — and had to retract before going live."
pubDate: 2026-05-24
---

The first **Public Experiment Log** of the Open LLMO Research Initiative.

We just released [`llmo-checker`](https://github.com/open-llmo/llmo-checker), a Lighthouse-style CLI that scores how AI-retrievable a URL is (v0.1 Draft). The very first thing we did with it was point it at every site we operate.

The headline result, after a correction: **all six properties we own scored 90 or higher**. The more useful artifact from this experiment is what happened during the *correction* — recounted in full below.

## Methodology

- Tool: `npx llmo-checker <url>` v0.1.0
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
| `propel-lab.co.jp` | Operating lab corporate site | **94** | well-grounded | `<meta name="description">` 47 chars (sweet spot 80–200) |
| `legacydram.com` | Whisky × engineer media | **93** | well-grounded | JSON-LD partial (no `Organization`/`Person`) |
| `mypcrig.com` | PC-build curation site | **90** | well-grounded | No `hreflang` (single-language is fine) + JSON-LD partial |
| `kaoriq.com` | Fragrance e-commerce | **90** | well-grounded | No explicit AI-bot rules in robots.txt |

Median 93, lowest 90. No site below the well-grounded band.

This is a less dramatic table than the one we almost published.

## What this experiment was almost about

The first draft of this entry had a different headline: **"Our own corporate site scored 29 / 100, the worst result in the test."** It looked like exactly the kind of self-critical reporting that gives a new measurement project credibility.

Here is the story it told. We had measured `propel-lab.com` and gotten 29 / 100 — critical band. We had `curl`ed the root and found one line of HTML:

```bash
$ curl -s https://propel-lab.com/
<!DOCTYPE html><html><head><script>window.onload=function(){window.location.href="/lander"}</script></head></html>
```

A `window.location.href` redirect to `/lander`, invisible to every AI crawler we know of. Then we ran the checker on `/lander` itself and got **31 / 100**, also critical. Two layers, both failing. We had a clean morality tale: an LLMO-focused lab whose own corporate `.com` was failing the substrate test it preaches.

We almost published it.

## What stopped us

Before going live, we ran one more check on that destination HTML. Three signatures jumped out:

```html
<script>window.LANDER_SYSTEM="PW"</script>
<script src="https://www.google.com/adsense/domains/caf.js"></script>
<script src="https://img1.wsimg.com/parking-lander/static/js/main.be9a3b28.js"></script>
```

That is the fingerprint of a **domain parking page** — `wsimg.com/parking-lander` is a third-party hosted-parking template, served alongside Google AdSense for Domains. The page is operating like a parking lot, not a corporate site.

We do not own `propel-lab.com`. We never did. The corporate site is `propel-lab.co.jp`, which scored **94 / 100** — well-grounded, the third-best in the table.

Our morality tale was about someone else's parked domain.

## Why we are leaving this in the log

The temptation, once you catch a near-miss like this before going live, is to quietly fix the draft and ship the boring honest version with no record of the close call. We are not doing that. Three reasons:

1. **An LLMO initiative that hides its near-misses is the same as one that hides bad scores.** If we are going to make falsifiability a stated principle, we have to leave traces of the falsifications.
2. **The parking-domain pattern is a real substrate failure case.** Anyone who registers a `.com` for branding but never serves a real site there is shipping `propel-lab.com`-shaped substrate to AI crawlers. That insight is the same regardless of whose domain it was.
3. **Dogfooding gave us a 90+-only dataset.** That is too clean to be the proof we hoped for. If you measure your own work and the worst score is 90, you have learned that you write sites consistently to your own standard — not that the standard predicts anything useful.

The substantive question — "does the LLMO Score predict actual AI citation behavior?" — is unanswered by a six-site self-audit where everything passes. It needs an external baseline panel and a citation-correlation pilot. Those are the next two Experiment Logs.

## What we are still changing on our own sites

Even without the parking-domain story, the table shows small things worth fixing:

1. **`propel-lab.co.jp` description** — currently 47 characters, sweet spot is 80–200. Expand to the same length as the other corporate-site descriptions in our portfolio.
2. **Improve `mypcrig.com` and `kaoriq.com` JSON-LD coverage** — both sit at 82 / 100 on `jsonld` because they emit some but not all relevant types (`Product`, `Person`, `Article`)
3. **Add explicit AI-bot policy to `kaoriq.com` robots.txt** — currently neutral; we want explicit opt-in for GPTBot / ClaudeBot / Google-Extended
4. **Add link list to `/llms.txt` on `llmoframework.com` and `kenimoto.dev`** — current files have prose but no link section; both lose a small fraction of the `llms-txt` weight

We will publish a follow-up Experiment Log when these are done, with re-measured scores. Honest delta or no delta.

## What we learned that we did not expect

The clearest lesson is not about substrate. It is about narrative discipline.

When the score for `propel-lab.com` came back as 29, the first move was to write a story around the number. The story was tight, contrarian, and would have made the post share well. The number was what made the story possible.

The fact that we owned `propel-lab.com` was assumed without checking. It is the kind of assumption that gets reinforced by a good narrative, because admitting the gap collapses the whole post. We caught it by accident — running one more curl on a different part of the HTML to look for additional findings, not to question the premise.

For a project whose value proposition is *measure your AI substrate before assuming what it looks like*, accidentally almost publishing a piece based on **not measuring our domain ownership before assuming what it was** is the right kind of embarrassing.

## Limitations of this experiment

- v0.1 measures substrate only. A site can score 95 on substrate and still get zero AI citations because the content itself is uninteresting, contradicts known facts, or duplicates higher-authority sources. Citation Visibility is reserved for v0.2.
- The score weights (`llms-txt` 20, `robots-ai` 15, `canonical` 15, `jsonld` 20, `meta` 15) are author-set and unvalidated. They are reasonable defaults, not derived from outcome data. We expect to recalibrate them as we collect citation-outcome data through Phase 2.
- We tested home pages only. Article pages on each site may score differently.
- The dataset is six sites we authored to our own standard. It tells us nothing about whether the standard generalizes.

## Reproducing this experiment

```bash
npx llmo-checker@0.1.0 https://llmoframework.com/
npx llmo-checker@0.1.0 https://kenimoto.dev/
npx llmo-checker@0.1.0 https://propel-lab.co.jp/
npx llmo-checker@0.1.0 https://legacydram.com/
npx llmo-checker@0.1.0 https://mypcrig.com/
npx llmo-checker@0.1.0 https://kaoriq.com/
```

Add `--json` for machine output. Pin the version (`@0.1.0`); the JSON shape may change in v0.2.

To reproduce the parking-domain detection, also run:

```bash
npx llmo-checker@0.1.0 https://propel-lab.com/
npx llmo-checker@0.1.0 https://propel-lab.com/lander
curl -s https://propel-lab.com/lander | head -1
```

The first two will return critical scores. The third will surface `LANDER_SYSTEM` / `parking-lander` / `adsense/domains` markers in the HTML.

## What's next

This is the first entry of a Public Experiment Log series. The next two we plan to run:

- **External baseline panel** — score a few dozen high-traffic technical sites (documentation portals, dev blogs, product marketing sites) and publish the distribution. This calibrates what "normal" looks like — the comparison this self-audit cannot make on its own.
- **Citation correlation pilot** — for ~50 URLs, compare LLMO Score to actual AI citation rate (probing ChatGPT, Claude, and Perplexity). This is the first real test of whether the score predicts the outcome it claims to predict.

The full roadmap lives at [Experimental Projects](/experimental-projects/), and v0.1 score weights are defined in [Score v0.1 Draft Specification](/specifications/score-v01/).
