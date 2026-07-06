---
title: "AI Citation Half-Life: Citations Are a Flow, Not a Stock"
description: "AI citations decay. A 90-day fixed-protocol measurement across ChatGPT, Claude, and Perplexity found half-lives of 3.2 to 9.1 weeks depending on content type and engine — with evergreen pages holding citations roughly twice as long as experience reports."
pubDate: 2026-07-07
---

**An AI citation is not a trophy you win and keep. It is a perishable good.** A page that five engines cite today can lose half of that citation rate within a month while its Google search traffic stays flat. This page summarizes the published decay estimates, a reproducible measurement protocol, and the half-life numbers from a 90-day field measurement.

## The published estimates

Industry measurements in 2026 converge on the same shape:

| Finding | Source |
|---|---|
| Median AI citation half-life ≈ 4.5 weeks; ChatGPT churns fastest, Perplexity holds longest | Authority Tech platform analysis |
| AI-cited domains turn over 40–60% every month | Machine Relations |
| Roughly half of all AI-cited content is under 13 weeks old; pages updated within 30 days earn several times more citations | Authority Tech freshness analysis |

The mechanism is structural, not a quality judgment. Google's organic ranking for an established page is sticky — signals move slowly and a quiet week does not dislodge it. AI citations are pulled from a live index at answer time, and that index is biased toward fresh material. A page does not get worse; the pool it competes in gets younger.

Recent retrieval research (TempRetriever, arXiv 2502.21024; knowledge-drift work on RAG limits, arXiv 2604.05096) models the upstream cause: retrieval is biased toward fresh content, and the bias strengthens when the question is time-sensitive.

## Why a fixed protocol matters

"Half-life" only means something against a frozen protocol. Change the prompt set, the cadence, or the success criterion and the number drifts by weeks — two people quoting "4.5 weeks" may be measuring unrelated phenomena. The reproducible protocol, in five rules:

1. **Fixed prompt set** — ten real user questions per page, written before day 0 and frozen. Rewriting a prompt mid-experiment breaks the bench.
2. **Three retries per prompt** — separate sessions, no history. A "cite" means the URL appears as a clickable source in at least one of three runs, counted at the prompt level (counting at the source-list level over-weights engines that return more sources — a correction that lowered one measurement's numbers by ~15%).
3. **Fixed weekly cadence** — same weekday, same window. A skipped week is a hole in the curve and a worse fit.
4. **Two clocks** — log the AI citation rate *and* the same week's Search Console clicks for the same URL. When both curves move together, something else happened (outage, algorithm change, viral link). The signal is the AI curve moving while the search curve holds.
5. **Decay is fit from the peak, not from week 1.** Citation rates climb for two to four weeks as engines index the page, then decay. Mixing climb and decay into one fit — the most common error in public write-ups — yields flatter half-lives than the truth.

The decay portion fits an exponential: `cites(t) = peak × 0.5^(t / T_half)`, with `t` in weeks from the peak.

## The measured half-lives

A 90-day (13-week) run of this protocol on three pages of one technical site, across ChatGPT (web search on), Claude (default web mode), and Perplexity (Sonar Pro):

| Page type | ChatGPT | Claude | Perplexity |
|---|---|---|---|
| Evergreen how-to | 6.8 wk | 7.4 wk | 9.1 wk |
| Experience report | 3.2 wk | 3.6 wk | 4.4 wk |
| Methodology post | 5.1 wk | 5.9 wk | 6.7 wk |

Three findings, in order of surprise:

1. **Content type dominates.** The evergreen page held citations roughly 2× longer than the experience report on every engine. Engines weight freshness, but they also weight whether the page still answers the question — a how-to keeps answering for months; an experience report stops fast. Averaging across page types reproduces the published "≈4.5 weeks" headline while hiding the 2× spread that actually matters.
2. **Perplexity decays slowest on all three pages** (its published ranking guidance puts freshness at ~15% of weight), **ChatGPT fastest in every row** — consistent with the platform-by-platform churn reports.
3. **Refreshes restore citations partially and unevenly.** A *substantive* update (new section, new data table) to the experience report recovered ChatGPT to ~70% of peak within two weeks, Claude to ~60%, Perplexity to ~75% by week 12 — never back to peak. A cosmetic dateline bump in an earlier nine-week run produced nothing measurable. The first launch matters more than any refresh.

Full data and protocol: [the 90-day methodology write-up](https://kenimoto.dev/blog/measuring-ai-citation-half-life-90-day-methodology/) and [the initial nine-week decay log](https://kenimoto.dev/blog/ai-citations-half-life-decay/).

## Operational consequences

- **Classify every page as evergreen or expiring before publishing.** Evergreen pages get substantive refreshes on the cadence the half-life implies (roughly every 6–8 weeks). Expiring pages are not refreshed — no edit makes a stale experience report relevant — they are archived and replaced.
- **Report citation metrics as rates over time, never as snapshots.** "Cited by five engines" is true on a Monday and a lie by the next month. The trend line across a fixed prompt set is the honest metric — see [Measuring LLMO](/guide/measuring-llmo/) for the weekly loop this slots into.
- **Getting cited is a launch problem; staying cited is a retention problem.** [Citation Signals](/framework/citation-signals/) govern whether you enter the citation pool. [Authority](/framework/authority-signals/) and [Coherence](/framework/coherence-signals/) — plus the refresh cadence — govern whether you stay in it.

## Limits of the measurement

Single site, three pages, one refresh event — the engine-asymmetric refresh response could be a freshness-weight difference or noise. Methodology posts self-cannibalize (engines can answer new prompts with the older measurement post). And a 13-week window cannot show whether half-lives shorten further as engine indexes grow. Treat the half-life values as one defensible protocol's output, not constants.
