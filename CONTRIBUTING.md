# Contributing to LLMO Guide

Thank you for your interest in contributing to the LLMO Guide!

## How to Contribute

1. Fork the repository
2. Create a branch for your changes (e.g. `add-faq-i18n`, `fix-typo-fr`)
3. Make your changes — keep PRs focused and small
4. Open a pull request describing the change and motivation

## Types of Contributions

- **Content**: Improve guides, add examples, fix errors
- **Translations**: Add or refine translations in the existing supported languages
- **Research**: Add relevant papers, reports, and primary sources to `research/`
- **Framework**: Propose improvements to the LLMO Framework itself

## Translation Workflow

The site is currently available in eight languages:

| Locale | Directory | hreflang |
|--------|-----------|----------|
| English (default) | `src/content/docs/` | `en` |
| 日本語 | `src/content/docs/ja/` | `ja` |
| 中文 | `src/content/docs/zh/` | `zh-CN` |
| 한국어 | `src/content/docs/ko/` | `ko` |
| Deutsch | `src/content/docs/de/` | `de` |
| Français | `src/content/docs/fr/` | `fr` |
| Español | `src/content/docs/es/` | `es` |
| Português (BR) | `src/content/docs/pt/` | `pt-BR` |

### Adding or improving a translation

1. **Find the source page** under `src/content/docs/<page>.md`. Translations mirror the same path inside the locale folder (e.g. `src/content/docs/ja/<page>.md`).
2. **Preserve frontmatter keys** — `title`, `description`, and any inline `head`/JSON-LD scripts must keep the same shape. Translate values, not keys.
3. **Translate inline links to point at the same locale** when an equivalent localized page exists. Use `/ja/guide/quickstart/` rather than `/guide/quickstart/` from a Japanese page.
4. **Update FAQPage `inLanguage`** in JSON-LD to the BCP-47 tag for the target language (`ja`, `zh-CN`, `ko`, `de`, `fr`, `es`, `pt-BR`).
5. **Update `/public/<lang>/llms.txt`** and `/public/ai/<lang>/*.md` if the change affects the AI-readable summaries.

### Proposing a new language

1. Open an issue first describing the target locale (BCP-47 tag, audience, who will maintain it long-term).
2. Once approved, add the locale to `astro.config.mjs` under `locales`.
3. Mirror the full directory tree of `src/content/docs/` (currently 18 markdown files including FAQ) in the new locale folder.
4. Add `/public/ai/<lang>/{about,framework,case-studies,research}.md` and `/public/<lang>/llms.txt`.
5. Update the sidebar `translations` blocks in `astro.config.mjs`.

### Review process

- Translation PRs need at least one native or fluent reviewer for the target language. If you cannot find one, label your PR `needs-review-<locale>` and the maintainers will help.
- Mark draft translations with `[WIP]` in the PR title until ready.

## Style Guide

- **English source pages** — write in clear, accessible English. Define jargon on first use.
- **Practical examples** — every claim about implementation should show what to type or paste.
- **Cite sources** — cite papers, reports, and statistics by name and year. Statistics without sources do not get merged.
- **Markdown only** — avoid raw HTML inside content unless absolutely required.
- **Heading hierarchy** — H1 is reserved for the page title (frontmatter). Body content starts at H2.
- **Front-load the answer** — each page begins with a one-sentence answer to its primary question (the LLMO "Knowledge Clarity" rule applies to this site).

## Code of Conduct

Be respectful and constructive in all interactions.
