---
title: "LLMO Audit: The Two-Pass Review"
description: "Why one reviewer misses things, and how a self-review followed by an independent AI second-opinion pass catches what the first one cannot — with concrete commands and prompt templates."
pubDate: 2026-05-08
---

## Quickstart: Three Commands

If you already understand the pattern and just want the commands:

```bash
# 1. Save an audit prompt (you'll edit this for your site)
cat > /tmp/audit-prompt.md <<'EOF'
Review this Astro site for SEO/LLMO/structure. Look at both src/ and dist/.
Output P0/P1/P2 findings with file paths. Diagnostic only — do not edit.
EOF

# 2. Run codex in read-only sandbox, output to a file (note </dev/null)
codex exec -C /path/to/repo -s read-only --skip-git-repo-check \
  -o /tmp/codex-review.md \
  "$(cat /tmp/audit-prompt.md)" </dev/null

# 3. Triage
less /tmp/codex-review.md
```

`</dev/null` is required — without it, `codex exec` invoked from a non-interactive shell hangs waiting for stdin.

The rest of this article explains why and how.

## The Problem with One-Pass Reviews

You've shipped your LLMO implementation. JSON-LD is in place. `llms.txt` exists. Schema.org entities are validated. You've reviewed your own work and it looks complete.

Six months later, an audit finds:

- A `<slot name="head" />` declaration was missing in the layout. Page-specific JSON-LD has been silently dropped on every page since launch. No error, no warning, no test failure — the site just shipped without the metadata you wrote.
- Internal links between sub-pages have no trailing slash, costing a 301 redirect on every click and creating ambiguous canonical signals.
- A footer says "Kindle 4 books" while the homepage profile says "14 books." The author updated the homepage, forgot the footer, and AI crawlers have been quoting both for months.
- A 404 page emits canonical to `/404/` (the route Astro generated) while GitHub Pages actually serves `/404.html`. Shared 404 URLs misalign with the canonical.

Every one of these is hard to spot when you wrote the code yourself. You unconsciously skip over the parts you remember writing correctly. You assume the surface that was right yesterday is still right today. Your review is biased by your knowledge of intent.

A second reviewer with no priors — who sees only what's actually in the repository, dist output, and live site — will catch what you cannot.

## The Two-Pass Pattern

The pattern is simple: **review your own work first, then ask an independent AI agent to review the same artifacts in read-only mode**. The two passes have complementary strengths:

| Pass | Reviewer | Catches |
|------|----------|---------|
| 1st | You (or your usual AI assistant in the same session) | Surface-level fixes; "I know what should be here" issues |
| 2nd | Independent AI in read-only sandbox | Drift between intent and reality; silent failures; assumptions you didn't notice you were making |

The second pass is **not a code review of your changes** — it's an audit of the resulting state. The reviewer doesn't care what you tried to do; it only sees what the deployed system actually does.

This is structurally similar to the principle in scientific peer review: the author validates internal logic, the reviewer validates external claims. In LLMO, your first-pass review validates "did I implement what I planned?" and the second pass validates "does the implementation actually do what I think it does?"

## Why an AI Second-Opinion (and not Just Re-Reading)

Re-reading your own work is the same biased pass as the first one — your eye still skips the parts you wrote. Static linters catch syntax issues but not semantic drift between surfaces. A human reviewer is ideal but expensive and asynchronous.

An AI agent running in read-only mode against your repository hits a different sweet spot:

- **It has no priors about your intent.** It sees only what is on disk and in `dist/`.
- **It reads everything.** It doesn't get bored with your hundredth FAQ entry the way you do.
- **It's fast and repeatable.** A 4-minute pass per release is cheap.
- **It produces structured output.** You can grep, diff, and feed the report into the next iteration.

The cost is that the AI may flag false positives or miss highly contextual issues. Treat its output as a triage queue, not a binding verdict.

## Setting It Up: Codex CLI Example

The example below uses [OpenAI Codex CLI](https://github.com/openai/codex), but any agentic CLI with a read-only sandbox mode works (Claude Code, Aider, etc.).

### 1. Write the prompt as a file

The prompt is the most important asset. Spending 20 minutes on it once gives you a reusable audit harness for every release.

```markdown
# {Site} Full LLMO Review

`/path/to/repo` for the Astro site at `https://example.com`. Review for:

- SEO: meta, hreflang, canonical, og:*, twitter:*, sitemap entries
- LLMO: llms.txt, JSON-LD entities, /ai/ Markdown surfaces, URL.md endpoints
- Structure: i18n coverage, dead links, internal navigation
- Output verification: did the JSON-LD I wrote actually emit?

For each finding, output:
- File path
- The specific issue (quote the bytes)
- Recommended fix

Group findings as P0 (must fix), P1 (high), P2 (nice to have).
End with a summary table by category.

Do not modify any files. Diagnostic only.
```

Tell the AI **exactly what kind of artifacts** to look at: `dist/` for the actual served HTML, `src/` for source. Without this hint the AI may only read source and miss output-side bugs.

### 2. Invoke in read-only sandbox

```bash
codex exec \
  -C /path/to/repo \
  -s read-only \
  --skip-git-repo-check \
  -o /tmp/codex-review.md \
  "$(cat /tmp/review-prompt.md)" \
  </dev/null
```

Two flags matter:

- `-s read-only` (sandbox): the AI cannot modify files even if it tries. Critical for catching drift without altering the artifact under review.
- `</dev/null`: closes stdin explicitly. Without it, `codex exec` invoked from a non-interactive shell may hang waiting for user input.

The `-o` flag writes the final report to a file. Pipe through `tee` if you also want it on stdout.

### 3. Triage the output

Findings come back in P0/P1/P2 buckets. Walk them in priority order:

- **P0 verifies.** Test each on the live site or in `dist/`. If reproducible, fix.
- **P1 evaluates.** Some are real bugs, some are stylistic preferences. Note in the changelog and decide.
- **P2 archives.** Park as a follow-up task.

Don't merge fixes blindly from the AI's recommendations. The AI can suggest patches, but the patch is your code — verify, test, then ship.

## What the Two-Pass Pattern Catches in Practice

A self-audit of two production sites in May 2026 produced these findings (deduplicated):

| Finding type | Self-review caught | Second-pass caught |
|--------------|-------------------:|-------------------:|
| OG image 404 / OG type duplicates | ✓ | |
| Diacritic loss in translated content | ✓ | |
| Internal links missing trailing slash | ✓ | |
| Hreflang on static pages | ✓ | |
| **Dead `slot="head"` (silent JSON-LD drop)** | | ✓ |
| **Cross-file numeric drift (4 vs 14 books)** | | ✓ |
| **Mixed www. / apex domain in /ai/ files** | | ✓ |
| **JSON-LD over-injection on every page** | | ✓ |
| **404 og:url vs actual served URL mismatch** | | ✓ |
| **`<table>` + `<a>` invalid HTML in dist** | | ✓ |
| **og:locale stuck at ja_JP on /en/ pages** | | ✓ |
| **Two `Organization` entities with conflicting addresses** | | ✓ |
| Component tree improvements (i18n in Header/Footer) | ✓ | |

The findings the second pass caught are the ones where **intent and reality had diverged**. The implementation looked right in source, but the deployed artifact didn't match. A first-pass review can't see that without explicitly checking the output.

## Frequency and Cost

- **Per major release**: run a full second-pass review. ~5 minutes of AI runtime, ~30 minutes of human triage time.
- **Per quarterly content audit**: re-run with an updated prompt that explicitly checks numeric drift across files (book counts, PV stats, service catalogs).
- **Per migration** (host change, CMS change, framework upgrade): mandatory. Migrations are when intent-vs-reality drift is highest.

Cost in API tokens for a Codex `exec --sandbox read-only` against a typical content site (~50 files, ~10K LoC) runs in the cents-to-low-dollars range. Cheap enough to gate every release on.

## Anti-Patterns

- **Running the second pass with write access.** The AI will start fixing things and you lose the audit signal. Use `-s read-only` (or your tool's equivalent).
- **Letting the second pass be the same agent in the same session.** It inherits your biases. Spawn a fresh agent in a separate process — different model, different conversation, different working set.
- **Treating the second pass as the final word.** It surfaces *candidates*. You verify, decide, fix, and re-run.
- **Skipping the prompt file.** Inline prompts drift. A versioned prompt file in `audits/` lets you compare findings across releases.

## Checklist

- [ ] You have a versioned audit prompt in your repository (not just in shell history)
- [ ] The prompt explicitly directs the reviewer to check both source AND `dist/` (or live URLs)
- [ ] The prompt asks for findings grouped by P0/P1/P2 with file paths
- [ ] The audit runs in a read-only sandbox; the reviewer cannot modify files
- [ ] Stdin is explicitly closed (`</dev/null`) to prevent the agent from hanging on missing input
- [ ] Output is written to a file you can grep and diff against past audits
- [ ] Findings are triaged into your issue tracker, not merged automatically
- [ ] Audit cadence is documented (per release / per quarter / per migration)

## Related

- [Coherence Signals](/framework/coherence-signals/) — the framework principle the second-pass audit most often surfaces violations of
- [Structural Formatting](/framework/structural-formatting/) — output verification ties into JSON-LD scope and emission checks
