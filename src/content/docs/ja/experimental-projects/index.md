---
title: "Experimental Projects — 実験プロジェクト"
description: "Open LLMO Research Initiative の3つの実験プロジェクト。LLMOFramework Score、LLMOFramework Benchmark、LLMOFramework Compatible。"
pubDate: 2026-05-24
---

Open LLMO Research Initiative が公開予定の実験プロジェクトの一覧。すべて **Draft / Experimental** 段階で公開する。正式な Spec として確定するのは Phase 3 以降。

## 概要

| プロジェクト | 役割 | 例えるなら | 状態 |
|------------|------|----------|------|
| [1. LLMOFramework Score](#1-llmoframework-score) | サイトの AI 可視性を測定 | Lighthouse Score | 指標策定中（Phase 1 で Draft v0.1） |
| [2. LLMOFramework Benchmark](#2-llmoframework-benchmark) | サイト構造を実験的に比較 | 業界標準ベンチ | 計画段階（Phase 1-2） |
| [3. LLMOFramework Compatible](#3-llmoframework-compatible) | 準拠サイト向けの認証バッジ | "Certified" マーク | ロードマップのみ（Phase 3） |

---

## 1. LLMOFramework Score

### 何を測るか

「AI にどれだけ認識・引用・理解されやすいか」を1サイトずつスコア化する。SEO の Domain Authority や Lighthouse Score の AI 時代版にあたる。

### 候補指標（v0.1 Draft）

| 指標 | 内容 |
|------|------|
| Citation Visibility | AI に引用されるか |
| Chunk Readability | Chunk 化しやすいか |
| Semantic Structure | 意味構造の明示度 |
| AI Crawlability | AI crawler 対応 |
| llms.txt | llms.txt 対応 |
| Markdown Quality | 構造品質 |
| Entity Clarity | Entity 認識のしやすさ |
| Retrieval Stability | Retrieval の安定性 |

各指標には **計算式と OSS チェッカーコード** を必ず添える。Lighthouse が信頼を得たのは「測定可能 + 再現可能」だったからで、本プロジェクトも同じ原則を採用する。

### 関連 OSS

Phase 1 で `llmo-checker` を公開予定。

```
npx llmo-checker https://example.com

LLMOFramework Score: 74

Citation Visibility: 81
Semantic Chunkability: 68
AI Readability: 77
Grounding Stability: 70
```

### 状態

指標定義の策定中。Draft v0.1 公開は Phase 1（時期未確定）。

---

## 2. LLMOFramework Benchmark

### 何を比較するか

「どのサイト構造が AI に強いか」を実験的に比較する。AI retrieval / citation 領域でまだ標準ベンチマークが存在しないため、本プロジェクトが先に測定方法を提案する。

### 比較対象の候補

- Markdown vs HTML
- FAQ schema の有無
- Table 構造
- Chunk size
- Citation format
- Internal linking
- GitHub 連携
- llms.txt 対応
- MCP exposure

### 公開方針

各実験は **Reproducible Benchmark Report** として GitHub と本サイトに公開する。データセット、計測スクリプト、結果データ、評価プロンプトを全部含める。

### 状態

計画段階。Phase 1 で最初の比較実験（Markdown vs HTML retrieval 効率）を予定。

---

## 3. LLMOFramework Compatible

### 何のためのバッジか

「AI に最適化された構造に準拠している」ことを示す認証マーク。SaaS、Docs サイト、OSS、AI 製品が貼ることを想定する。

### イメージ

```
[ LLMOFramework Compatible ]
[ AI Retrieval Ready ]
[ Grounding Optimized ]
```

### 準拠要件（Draft イメージ）

| 要件 | 内容 |
|------|------|
| llms.txt 配置 | サイトルートに llms.txt が存在し、有効である |
| Semantic Structure | 主要ページが見出し階層と semantic HTML を満たす |
| Chunk Optimization | 推奨 chunk size の範囲内に主要セクションが収まる |
| Grounding-friendly Docs | 引用元、データソース、更新日が明示されている |

### 状態

**ロードマップのみ**。Phase 3（最後）に位置する。理由は以下:

- 認証は ecosystem の adoption が前提となるため、Score と Benchmark が先に成熟する必要がある
- 1人運営の段階で「認証」を出すと権威感が先行し、信用を逆に失う
- Compatible バッジは Open Source community の third-party adoption を受けてから設計に入る

---

## Phase との対応

| Phase | プロジェクト進捗 |
|-------|----------------|
| Phase 0（現在） | 指標策定、プロジェクト構想公開 |
| Phase 1 | Score Draft v0.1、`llmo-checker` OSS、最初の Benchmark Report |
| Phase 2 | Score 改訂、Benchmark の継続更新、Community feedback 反映 |
| Phase 3 | Compatible 認証設計、Spec 正式化、Working Group 化 |

各プロジェクトのソースコードと議論は [GitHub repository](https://github.com/kenimo49/llmo-guide) と [Issues](https://github.com/kenimo49/llmo-guide/issues) で公開する。
