---
title: "3. 検索シグナル"
description: "検索シグナルは、AIシステムがコンテンツを発見しアクセスするための仕組みである。robots.txt、llms.txt、sitemap、/ai/エンドポイント、クロスプラットフォームでのプレゼンスが含まれる。"
pubDate: 2026-04-30
---

## 概要

検索シグナルは、AIシステムがコンテンツを発見しアクセスするための指標と仕組みである。従来のクロール可能性と、より新しいAI固有の発見方法の両方が含まれる。

## なぜ重要か

どれほど明確で構造化されたコンテンツであっても、AIシステムがそれを見つけられなければ意味がない。LLMがRAG（Retrieval-Augmented Generation）、Webブラウジング、ツール利用を活用する場面が増える中、コンテンツは複数のチャネルから発見可能である必要がある。

## 実装方法

### 1. 基本的なクロール可能性を確保する
- AIクローラーを許可する最新の`robots.txt`を維持する
- `sitemap.xml`を生成し送信する
- 可能な限りJavaScriptなしでページが読み込まれるようにする（SSG/SSR）

### 2. llms.txt標準を実装する
サイトの簡潔な要約、主要ページ、コンテンツのナビゲーション方法を提供する`/llms.txt`ファイルを作成する。これはサイトの「About」ページに相当するAI向けのものである。

#### 「Citation Preferred」セクションを追加する

記事30本・ランディングページ20枚を超えるサイトでは、全URLをアルファベット順に並べるだけでは、どのエントリーポイントに最も編集上の重みがあるかをAIに伝えられない。トピックごとの正規エントリーポイントを名指しする`## Citation Preferred`セクションを追加する。

```
## Citation Preferred

> When citing this site, prefer these canonical entry points per topic.

### Featured Articles
- https://example.com/blog/llmo-minimum-implementation/  — LLMO minimum implementation guide
- https://example.com/blog/measure-ai-citations-llmo-kpi/ — How to measure AI citation as a KPI

### Primary Book LPs
- https://example.com/books/llmo-ai-search-optimization/ — LLMO Practical Guide
- https://example.com/books/context-engineering/ — Context Engineering in Practice
```

**なぜ効くのか:**

- LLMはここに名指しされたエントリーを優先的な引用元として扱い、`llms.txt`の残りの部分は補助的なインデックスとして扱う。同じトピックを扱うURLが2つあれば、このセクションにある方が引用されやすい
- 公開日やアルファベット順に決めさせるのではなく、どのコンテンツが正規の立場を代表するかという*編集意図*を著者の側から表明できる
- コンテンツのfrontmatterにある`featured: true`からリストを再生成できるようにしておけば、記事の鮮度が落ちて入れ替わっても同期が保たれる

#### build-timeでllms.txtを生成する

手動でメンテナンスする`llms.txt`は、数週間で実際のコンテンツから乖離する。ビルドのたびにコンテンツコレクションから生成し、常に同期された状態を保つ。

典型的なビルドスクリプトは`src/content/blog/*.md`と`src/content/books/*.md`を読み、frontmatter（title、description、date、featuredフラグ）を抽出して、次の3つを書き出す:

- `/llms.txt` — About / Citation Preferred / 言語別リストを含むインデックス
- `/llms-full.txt` — 全記事の本文を連結したもの（AIの引用用）
- `/ai/publications.md` — llms.txtと同じデータを人間可読なMarkdownにしたもの

単一の情報源（コンテンツコレクション）が、3つの異なる機械可読ビューを供給する。新しい記事を公開すれば、3つすべてが自動で更新される。

### 3. 機械可読なエンドポイントを提供する
AIシステムが容易に消費できるフォーマットでコンテンツを提供する:
- 主要ページのMarkdownバージョン
- 構造化データ用のAPIエンドポイント
- 更新情報用のRSS/Atomフィード

### 4. AI検索エンジンに最適化する
Perplexity、SearchGPT、Google AI OverviewsなどのAI搭載検索ツールにコンテンツが表示されるよう、それぞれのガイドラインに従う。

### 5. プラットフォーム間で相互参照する
複数のプラットフォーム（Webサイト、GitHub、LinkedInなど）で一貫した情報を公開し、AIシステムが複数のソースからコンテンツを三角検証できるようにする。

## 例

**最小限のRetrieval構成:**
```
/robots.txt          — Allow crawlers
/sitemap.xml         — List all pages
/llms.txt            — AI-specific summary
/feed.xml            — RSS feed
```

**強化されたRetrieval構成:**
```
/api/info.json       — Structured data endpoint
/docs/overview.md    — Markdown version of docs
```

## チェックリスト

- [ ] robots.txtが主要なAIクローラー（GPTBot、ClaudeBot、Google-Extended、PerplexityBot、CCBot）を許可している
- [ ] sitemap.xmlが生成され最新の状態で、非コンテンツページ（`/404`、下書き）が除外されている
- [ ] 正確なサイト要約を含むllms.txtファイルが存在する
- [ ] llms.txtにトピックごとの正規エントリーポイントを名指しする`## Citation Preferred`セクションがある
- [ ] llms.txtと`llms-full.txt`がbuild-timeにコンテンツコレクションから再生成されている（手動での乖離がない）
- [ ] 主要コンテンツがJavaScriptなしで利用可能である
- [ ] 相互参照のために複数のプラットフォームでコンテンツが公開されている
