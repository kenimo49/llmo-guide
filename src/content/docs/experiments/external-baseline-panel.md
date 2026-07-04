---
title: "Public Experiment Log #2: External baseline panel"
description: "We scored 39 high-traffic technical sites with llmo-checker@0.1.0 to calibrate what 'normal' looks like. The median is 61. Three of the largest documentation portals score below 40."
pubDate: 2026-05-24
---

The first Public Experiment Log scored six sites we own. All six landed at 90+. That was honest about being too clean to function as proof of anything. This is the calibration the first log could not provide: a panel of 39 high-traffic technical sites we do not own, scored with the same tool, on the same day.

The headline finding is mundane and the headline finding is uncomfortable. The mundane part: the median is 61, with a stdev of 19.5 — a normal-looking distribution centred well below "good". The uncomfortable part: three of the most-visited documentation portals on the modern web — `rust-lang.org`, `tailwindcss.com`, `djangoproject.com` — score below 40.

## Methodology

A panel of 40 URLs was selected to span three categories: developer-facing documentation (20), product marketing sites (12), and engineering blogs (6). Two more (`docs.anthropic.com`, `platform.openai.com/docs/`) were included as a separate "AI provider docs" sanity-check pair. Selection was done before the measurement run; URLs were not added or removed based on score.

The 40 URLs were measured with `llmo-checker@0.1.0` in a single batch run with a one-second delay between requests. One URL (`platform.openai.com/docs/`) returned a parse error and was dropped, leaving **n = 39**.

The same User-Agent (`llmo-checker/0.1.0`) was used for every request, matching what an AI crawler reading our recommendations would send. No site was retried; the first measurement stands.

## Results

| Statistic | Value |
|---|---|
| n | 39 |
| Mean | 58.8 |
| Median | 61 |
| Stdev | 19.5 |
| Q1 / Q3 | 45 / 69 |
| Min / Max | 23 / 94 |

### Score distribution (10-point buckets)

```
 20-29  ███         3
 30-39  ████        4
 40-49  █████████   9
 50-59  ██          2
 60-69  ████████████ 12
 70-79  █           1
 80-89  █████       5
 90-99  ███         3
```

The distribution is roughly bimodal: one cluster around 40–49 (early-to-mid-tier sites with weak machine-readability) and a larger one around 60–69 (mid-tier sites with most things done but `jsonld` and/or `llms.txt` missing).

### Top 5

| # | Site | Score |
|---|---|---|
| 1 | `supabase.com` | 94 |
| 2 | `redis.io` | 93 |
| 2 | `www.cloudflare.com` | 93 |
| 4 | `stripe.com` | 89 |
| 5 | `docs.docker.com` | 84 |

### Bottom 5

| # | Site | Score |
|---|---|---|
| 39 | `www.rust-lang.org` | 23 |
| 38 | `tailwindcss.com` | 25 |
| 37 | `www.djangoproject.com` | 26 |
| 36 | `www.postgresql.org` | 32 |
| 35 | `golang.org` | 37 |

### By category

| Category | n | Median | Mean | Range |
|---|---|---|---|---|
| Product marketing | 12 | 68.5 | 74.8 | 58–94 |
| Dev blog | 6 | 65.0 | 65.3 | 44–80 |
| Documentation | 20 | 45.5 | 48.0 | 23–93 |

### Per-check medians

| Check | Median | Mean | Range |
|---|---|---|---|
| `llms-txt` | 90 | 54.9 | 0–100 |
| `robots-ai` | 80 | 78.7 | 60–100 |
| `canonical` | 90 | 67.9 | 0–100 |
| `jsonld` | **0** | 26.1 | 0–94 |
| `meta` | 80 | 78.5 | 0–100 |

## What surprised us

**Documentation sites are the weakest category.** This was the prediction we would have gotten wrong if asked beforehand. The default assumption — including ours, before the data came in — was that docs portals would be the *best* category, because they have always been a curated authoritative source for both humans and search engines. The data says the opposite: the median documentation score (45.5) is more than 20 points below the median product marketing score (68.5). Documentation portals are widely loved, mature, and well-engineered for humans, but the same teams have not, on average, invested in the machine-readable surface.

**The schema.org floor is very low.** The median `jsonld` score in the panel is **0**. More than half of these well-known technical sites emit no recognizable JSON-LD `@type` at all. The mean is dragged up to 26 by a small number of well-instrumented sites (mostly product marketing). A `jsonld` score of 0 does not mean the site is broken — it means there is no entity-graph surface for an AI crawler to ground a citation on.

**`llms.txt` is bimodal, not gradual.** The median is 90, but the mean is 54.9. Either a site has invested in a spec-compliant `/llms.txt` (clean 90s and 100s) or it does not have the file at all (0). Very few sites sit in the middle. This means the cost of going from 0 → 90+ on `llms-txt` is a single file commit, not a multi-stage migration.

**The three lowest scores are household names.** `rust-lang.org` (23), `tailwindcss.com` (25), and `djangoproject.com` (26) are the lowest-scoring URLs in the entire panel. They are also among the most-visited developer URLs on the web by any reasonable traffic estimate. The score is not measuring traffic, brand recognition, or content quality. It is measuring whether an AI crawler can ground a citation on the page's metadata — and on that single axis, these three are at the bottom.

**The `Cloudflare` family scores 93 / 64 / 44 across three URLs.** `www.cloudflare.com` (93) is the top product page; `www.cloudflare.com/blog/` (64) is the blog index; `blog.cloudflare.com` (44) is the blog's subdomain frontend. Same engineering org, three different surfaces, 50-point spread. Multi-site organisations are often this uneven, and our own portfolio confirms it (the v1.5.1 Experiment Log already documented our own 90–99 vs 96 vs 94 spread).

## Where our owned sites stand

The first Experiment Log scored six sites we own at 93–99. In isolation, that looked uncomfortably high. Now it has context:

| Site | Score | Panel percentile (approx.) |
|---|---|---|
| `llmoframework.com` | 99 | > 99th |
| `kenimoto.dev` | 99 | > 99th |
| `kaoriq.com` | 96 | > 95th |
| `propel-lab.co.jp` | 96 | > 95th |
| `mypcrig.com` | 93 | > 90th (ties with `supabase.com` and `redis.io`) |
| `legacydram.com` | — | (not re-measured in this run) |

That places our owned sites at the very top of a 39-site high-traffic technical panel. We do not think this means our content is better than `rust-lang.org`'s or `stripe.com`'s. It means we have been measuring and fixing the same five mechanical checks the score targets, which is exactly what a self-built tool is supposed to make easy.

This is the calibration the first log was missing. The 90+ cluster we sit in is not normal. It is the cluster of sites that have decided to optimize for the machine-readable surface specifically, and on this panel that decision separates a small group at the top from a long tail in the 40–69 band.

## What this still does not prove

The score is internally consistent (Experiment Log #1 update confirmed that fixes produce the deltas the spec predicts). The score now also has an external panel to compare against. But neither of those two facts is the same as proving that a higher score causes a higher AI citation rate.

That is still the job of Experiment Log #3 (citation correlation pilot). For 50 URLs spanning the full score range — including some of the panel's bottom 5 and some of its top 5 — we will compare LLMO Score to actual AI citation rate (Perplexity API + ChatGPT search + Claude web tool). If the score is real, the bottom 5 of this panel should be cited markedly less often than the top 5, for queries where any of them would be a credible source.

The honest version of this update is: the score has now passed two of the three tests a measurement tool has to pass. It is internally consistent (v1.5.2 update), and it produces a non-flat distribution against a credible external panel (this log). The third test — does it predict the outcome it claims to predict — is the one that decides whether the project is worth continuing.

## Limitations

The panel is small (n = 39) and English-language. There is no Japanese, Chinese, German, or French site in the run — a deliberate choice to keep the first panel focused, but a real limitation for cross-language calibration.

The category split is uneven: 20 docs, 12 product marketing, 6 dev blogs. This makes the per-category medians directional, not statistically tight (especially Dev blogs at n = 6).

Selection was performed by us, before the measurement run. We tried to favour well-known, high-traffic technical URLs to minimise the "we cherry-picked weak sites" objection, but selection bias cannot be ruled out. The raw URL list is committed alongside this post (`experiments/external-baseline-2026-05/urls.txt`) so the panel can be reproduced or expanded.

`platform.openai.com/docs/` was dropped because the checker returned no parseable JSON. That is one data point of survivorship bias; the AI-provider docs comparison would have been more interesting with both points than with one (`docs.anthropic.com` scored 64).

## Reproducing this experiment

```bash
git clone https://github.com/open-llmo/llmo-checker
cd llmo-checker
npm install && npm run build

# Pull the URL list and the run script
cd experiments/external-baseline-2026-05
cat urls.txt          # 40 URLs
bash run-measurements.sh   # produces results/*.json
python3 analyze.py    # prints the summary above
```

The raw `results/*.json` files are committed; running against the same URLs with `llmo-checker@0.1.0` should produce within ±1 of the scores in this post (sites do change between runs; one new `<meta>` tag can shift `meta` by 10).

## What's next

The roadmap is unchanged from Experiment Log #1's closing:

- **Experiment Log #3 — Citation correlation pilot.** For ~50 URLs across the score range, probe Perplexity / ChatGPT / Claude with the same set of queries and compute the correlation between LLMO Score and citation rate. This is the real validation: does the score predict what it claims to predict?
- **v0.2 score weights.** If the citation-correlation data lands as expected, the per-check weights will be re-tuned to maximise the observed correlation. If it does not, the spec gets a much more interesting follow-up post.

The full roadmap lives at [Experimental Projects](/experimental-projects/), and v0.1 score weights are defined in [Score v0.1 Draft Specification](/specifications/score-v01/).
