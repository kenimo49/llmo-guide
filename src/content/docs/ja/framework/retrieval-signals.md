---
title: "3. Retrieval Signals"
description: "Retrieval Signalsは、AIシステムがコンテンツを発見しアクセスするための仕組みである。robots.txt、llms.txt、sitemap、/ai/エンドポイント、クロスプラットフォームでのプレゼンスが含まれる。"
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO Component 3: Retrieval Signals",
        "description": "Ensuring AI systems can find your content through crawlability, llms.txt, and machine-readable endpoints.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

## 概要

Retrieval Signalsは、AIシステムがコンテンツを発見しアクセスするための指標と仕組みである。従来のクロール可能性と、より新しいAI固有の発見方法の両方が含まれる。

## なぜ重要か

どれほど明確で構造化されたコンテンツであっても、AIシステムがそれを見つけられなければ意味がない。LLMがRAG（Retrieval-Augmented Generation）、Webブラウジング、ツール利用を活用する場面が増える中、コンテンツは複数のチャネルから発見可能である必要がある。

## 実装方法

### 1. 基本的なクロール可能性を確保する
- AIクローラーを許可する最新の`robots.txt`を維持する
- `sitemap.xml`を生成し送信する
- 可能な限りJavaScriptなしでページが読み込まれるようにする（SSG/SSR）

### 2. llms.txt標準を実装する
サイトの簡潔な要約、主要ページ、コンテンツのナビゲーション方法を提供する`/llms.txt`ファイルを作成する。これはサイトの「About」ページに相当するAI向けのものである。

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

- [ ] robots.txtが主要なAIクローラーを許可している
- [ ] sitemap.xmlが生成され最新の状態である
- [ ] 正確なサイト要約を含むllms.txtファイルが存在する
- [ ] 主要コンテンツがJavaScriptなしで利用可能である
- [ ] 相互参照のために複数のプラットフォームでコンテンツが公開されている
