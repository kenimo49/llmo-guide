---
title: "When the Framework Author Violates the Framework: v1.1.0 → v1.2.0 Self-Audit"
description: "The site that defines Coherence Signals shipped v1.2.0 with five out-of-sync version surfaces. The codex second-pass review caught it in 4 minutes. This is what 'release coherence' costs when no one tools it — and how we closed the gap."
pubDate: 2026-05-08
---

> This is the second case study in the self-audit series. The [previous one](/case-studies/propel-lab-self-audit/) covered two product sites built on the framework. This one covers the framework site itself, immediately after it added the rule it then broke.

## The Setup

Three days before this article was written, we released [v1.1.0](/changelog/) of the LLMO Framework. The headline was a new sixth component: [Coherence Signals](/framework/coherence-signals/) — the discipline of making sure the same fact tells the same story across every surface that an AI agent can read.

The component's core claim:

> Every numeric or factual claim has a single canonical source file referenced everywhere else.

Two days later, we released v1.2.0 — adding two patterns under existing components (Identity-as-Code, Citation Preferred). The bump was manual: a developer edited `package.json` to set `version: "1.2.0"`, wrote a commit message, and pushed.

When [codex was run as a second-pass review](/guide/llmo-audit-two-pass-review/) on the v1.2.0 state, the most ironic finding possible came back at the top:

> **`/llms.txt` was stuck at "5 components / 15 points"** while the rest of the site advertised the new sixth component.

The site that defines Coherence Signals had violated Coherence Signals on its own primary AI-readable surface, in the very release that introduced the concept.

## The Drift

A version is, in the LLMO sense, a fact. The fact "the framework is at v1.2.0" was supposed to be one canonical claim. In the v1.2.0 release commit, it lived in five places — and they didn't agree:

| Surface | What it said | Source |
|---|---|---|
| `package.json` | `1.2.0` ✓ | Manually edited |
| `src/data/version.ts` | `1.1.0` ✗ | Untouched |
| `CHANGELOG.md` | `[1.1.0]` (no v1.2.0 entry) ✗ | Untouched |
| `src/content/docs/changelog.md` (EN) | `v1.2.0` ✓ | Manually edited |
| `src/content/docs/ja/changelog.md` (JA) | `v1.1.0` (no v1.2.0 entry) ✗ | Untouched |
| Git tags | `v1.1.0` (no `v1.2.0`) ✗ | Forgotten |

Plus, downstream of the version drift, the `/llms.txt` content drift in 8 languages — none of them updated to reflect the new sixth component or the `Two-Pass Review` guide or the `Self-Audit` case study.

Six surfaces, three different stories. An AI quoting `package.json` reports v1.2.0 with new patterns. An AI quoting `llms.txt` reports v1.0.0-shaped framework with five components. An AI checking the changelog page (EN) sees v1.2.0 but the JA reader sees v1.1.0. The site contradicts itself.

## Why This Happened

We wrote a [`/bump-llmoframework` skill](https://github.com/kenimo49/sns-operations/blob/main/.claude/skills/bump-llmoframework/SKILL.md) and a [`scripts/bump-version.sh`](https://github.com/kenimo49/llmo-guide/blob/main/scripts/bump-version.sh) script. Together they update three of the five surfaces atomically (`package.json`, `src/data/version.ts`, `CHANGELOG.md`). They explicitly tell the operator to update the remaining two (changelog.md EN/JA) as part of Phase 3.

Neither was used for v1.2.0. The release happened by direct edit + commit + push.

The mechanism that should have enforced coherence was bypassed — and the surface that monitors coherence (the framework site itself) demonstrated, in real time, what bypassing it costs.

There is no malice or carelessness in this. It's the predictable outcome of a single rule:

> If a coherence surface is maintained by hand, eventually a hand will forget it.

The bump script and skill exist precisely because hands forget. When you skip them, you become the coherence test case for everyone reading the framework.

## Detection

A read-only `codex exec` invocation against the v1.2.0 repository, with the prompt asking specifically for *coherence between v1.1.0 release artifacts and the actual deployed state*, returned:

> Maximum irony: the new Coherence Signals component is being violated on `/llms.txt` and the version files. Recommend updating before any further release.

Wall time: about 4 minutes. The relevant commands are documented in [LLMO Audit: Two-Pass Review](/guide/llmo-audit-two-pass-review/) — the same article that v1.1.0 introduced.

## The Fix (committed as part of v1.2.0 cleanup)

| Step | Surface | Change |
|---|---|---|
| 1 | `src/data/version.ts` | `VERSION = '1.2.0'`; new `RELEASES[0]` entry with summary + 4 highlights |
| 2 | `CHANGELOG.md` | Full v1.2.0 section (Headline / Added / Changed / Why) + compare link |
| 3 | `src/content/docs/ja/changelog.md` | Full v1.2.0 section in Japanese, parallel to EN |
| 4 | `src/content/docs/changelog.md` (EN) | Expanded v1.2.0 section to match CHANGELOG.md density |
| 5 | `public/llms.txt` (8 langs) | Updated to 6 components / 18 points; added Coherence/Two-Pass/Self-Audit/Changelog entries |
| 6 | `public/ai/*.md` (8 langs) | Same update; canonical host normalized; numbers aligned with profile data |
| 7 | Git tag | `v1.2.0` annotated tag created and pushed |
| 8 | `src/components/Footer.astro` | New: every page now displays `v{VERSION} · Changelog`, reading from `src/data/version.ts`. The version becomes visible to humans, not just buried in metadata |
| 9 | `scripts/verify-json-ld.mjs` | New: CI gate that runs after `npm run build`. Asserts JSON-LD parses, every page emits site-wide `Organization`/`WebSite`/`Person`, and the 404 page does not carry article-shaped schema |
| 10 | `.github/workflows/deploy.yml` | Added `verify-json-ld` step before deploy. The next time a release tries to ship with broken structured data, GitHub Actions fails before publish |

After step 10 the site survived a re-run of the codex second-pass review with no P0 findings related to release coherence.

## What This Episode Tells Us About Coherence Signals

Three patterns generalize from this:

### 1. Release process is itself a coherence surface

A version number is a fact. A release that updates one place but not five is a coherence violation as real as a stale `llms.txt`. **The release pipeline is part of the framework's content surface, not separate from it.** Every coherence framework that doesn't account for its own release process will fail at release time.

### 2. Tooling earns its keep when bypassed

The `bump-version.sh` script + `/bump-llmoframework` skill exist because manual bumps drift. The drift in v1.2.0 happened *exactly* because both were bypassed. The cost of skipping the tool was paid in the most public way possible: the framework that defines coherence was the place that broke it.

This is not a tooling failure. The script, run against v1.1.0, would have produced a coherent v1.2.0. The failure was in the human decision to edit `package.json` directly. The fix is not better tooling — it's making the human path noisier:

- The Footer now displays `v{VERSION} · Changelog` on every page. A drift between `package.json` and `src/data/version.ts` becomes immediately visible at the bottom of every page rendered by `npm run build`.
- The CI gate runs `verify-json-ld.mjs` before deploy. A scope or parse violation can no longer reach production.
- The bump script's idempotency guard refuses to re-run against an existing version section or git tag, preventing duplicate-section bugs that hid earlier drift.

The general rule: **when manual paths exist, give them feedback that surfaces drift on every build.**

### 3. Frameworks don't exempt their authors

The most uncomfortable lesson is the simplest. The team that proposed Coherence Signals as a framework component shipped a Coherence Signals violation in the release that introduced it. Not in v0.x while finding their footing — in v1.2.0, with the rule freshly written, with the skill and script already provisioned.

> Implementing a framework and following the framework are different cognitive acts.

The first uses concept-formation muscles. The second uses discipline muscles. Authors of frameworks often have outsized concept-formation muscles and ordinary discipline muscles. Outside observers — second-pass reviewers, AI agents in read-only sandboxes — don't have the concept-formation context, but their discipline is uniform across every page they look at.

This is why two-pass review isn't optional for the framework's own site. It's the same reason a doctor with a paper cut goes to a colleague.

## Lessons for Anyone Implementing LLMO

You don't have to write a framework to inherit this problem. Any organization with multiple AI-readable surfaces (HTML / Markdown / JSON-LD / llms.txt / API responses / docs sites) and any release cadence will produce the same drift if humans maintain those surfaces independently.

Practical steps in order of leverage:

1. **List your coherence surfaces explicitly.** Most teams don't know how many places one fact lives in. Write them down.
2. **Identify which surfaces are auto-generated and which are manual.** Manual is where the drift happens.
3. **For the smallest set of canonical facts (version, headcount, key URLs, brand naming), generate as many surfaces as possible from one source.** Even a 50-line Node script that reads `src/data/*.ts` and emits the manual files will pay for itself in one release cycle.
4. **For surfaces that must remain manual, gate the release on cross-checks.** A `make verify-coherence` step that grep's for inconsistencies and exits non-zero will catch what the human eye glosses over.
5. **Run a read-only AI second-pass review on every minor or higher release.** Cost: cents-to-low-dollars in API tokens. Benefit: catching the irony before it goes live.
6. **Accept that being the framework author does not exempt you from the framework.** Build the gates anyway.

## Postscript (v1.3.1): The Sixth Surface

This case study, as originally published with v1.3.0, claimed five surfaces of version drift: `package.json`, `src/data/version.ts`, `CHANGELOG.md`, EN/JA changelog pages, and git tags. Within an hour of publishing, ken — reading the live site — pointed out that **the header still said `v1.0`**.

The header was a CSS pseudo-element (`.site-title::after { content: 'v1.0' }`) hardcoded into `src/styles/custom.css`. It had been there since the project's first commit. v1.0 → v1.1 → v1.2 → v1.3 — four releases, four versions, none of them touched the CSS. The Footer was added in v1.2.0 to read from `src/data/version.ts`, becoming the canonical version display. The CSS badge in the header was never noticed; it lived in the visual layer, not in the version-management mental model.

So the actual count was six surfaces, not five. Five were synchronized. One was forgotten — and lived in plain sight on every page.

The fix in v1.3.1 was to remove the CSS pseudo-element entirely. The Footer is now the single source of visible version information. A comment in `custom.css` documents the removal so the next maintainer doesn't recreate the badge in another form.

The lesson generalizes:

> **Surfaces of the same fact are not always where you expect them to be.** A version number can live in JSON, in TypeScript, in Markdown, in a git tag, in a YAML frontmatter — and in a CSS `content:` property. When you enumerate "every place this fact lives," include the visual layer, not just the data layer. Anything that renders text to the user is a surface.

ken caught the sixth surface in the time it took to read the v1.3.0 page that bragged about closing five. That is not a failure of the framework — it is the framework working. The only way to be sure you have found every coherence surface is to publish your enumeration and let other readers find what you missed.

## What's Next

The v1.3.0 work that introduces this case study also adds a new sub-section to [Coherence Signals](/framework/coherence-signals/#6-release-process-is-a-coherence-surface) called *"Release Process is a Coherence Surface"*, generalizing the lesson.

The framework is not finished. Every release reveals something the previous release didn't see — including, sometimes, an hour after the previous release shipped.

## Related

- [LLMO Audit: Two-Pass Review](/guide/llmo-audit-two-pass-review/) — the methodology that caught this
- [Coherence Signals](/framework/coherence-signals/) — the framework principle violated and then upheld
- [Self-Audit on Propel-Lab Reference Sites](/case-studies/propel-lab-self-audit/) — the previous case study; this one continues the pattern
- [Changelog](/changelog/) — the actual version history this article describes
