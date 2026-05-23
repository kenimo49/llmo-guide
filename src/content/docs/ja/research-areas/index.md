---
title: "Research Areas — 5つの研究領域"
description: "Open LLMO Research Initiative の5つの研究領域。AI Citation Analysis、Grounding Visibility、LLM Retrieval Optimization、AI-native Documentation、Agent-oriented Information Architecture。"
pubDate: 2026-05-24
---

Open LLMO Research Initiative は、AI と Web の接点を 5つの領域に分けて研究する。各領域は独立した研究方向を持ちつつ、最終的には [LLMOFramework Score](/ja/experimental-projects/) の指標体系に統合される。

## 概要

| 領域 | 主な問い |
|------|---------|
| [1. AI Citation Analysis](#1-ai-citation-analysis) | LLM はどのコンテンツを、どの条件で引用するか |
| [2. Grounding Visibility](#2-grounding-visibility) | AI が何を根拠に回答しているかをどう可視化するか |
| [3. LLM Retrieval Optimization](#3-llm-retrieval-optimization) | LLM 検索層に対して文書をどう最適化するか |
| [4. AI-native Documentation](#4-ai-native-documentation) | LLM が扱いやすい文書フォーマットとは何か |
| [5. Agent-oriented Information Architecture](#5-agent-oriented-information-architecture) | AI エージェントが操作しやすい情報構造とは何か |

---

## 1. AI Citation Analysis

### 扱う範囲

ChatGPT、Claude、Gemini、Perplexity 等の LLM が、特定のトピックに対してどのコンテンツを引用するかの分析。引用の頻度、引用される文書の構造的特徴、引用に至る retrieval パスを観測対象とする。

### 主な問い

- 同一トピックに対する引用ドメインは LLM 間でどの程度一致するか
- 引用される文書の構造的特徴（見出し階層、テーブル、統計密度、外部リンク数など）は特定できるか
- 引用されやすい文書を後天的に作るためのチェックリストは構築可能か

### 現状と方向性

harness-ops のサイト計測パイプラインで、citation 観測のデータ収集を開始している。Phase 1 で OSS の `llmo-checker` に Citation Visibility 指標として実装予定。

---

## 2. Grounding Visibility

### 扱う範囲

AI の応答に対する grounding（根拠付け）の可視化。LLM が答えを生成する際に何を根拠としたか、その根拠が検証可能な一次情報に辿れるかを扱う。

### 主な問い

- AI 応答から根拠ドキュメントへ逆引きする手法は標準化できるか
- 根拠が「見える」サイト設計（出典明示、データソース引用、引用フォーマット）は AI の引用率に影響するか
- Hallucination と grounding の弱さは相関するか

### 現状と方向性

Citation Signals（LLMO Framework の5番目のコンポーネント）として既に部分的に扱われている。Phase 1 で Grounding Stability 指標として定量化を試みる。

---

## 3. LLM Retrieval Optimization

### 扱う範囲

LLM の検索層（RAG、embedding retrieval、Web 検索プラグイン等）に対して、文書側でできる最適化。chunking 戦略、semantic structure、文書長、見出し設計を研究対象とする。

### 主な問い

- chunk size と retrieval 精度の関係はトピックごとにどう変わるか
- Markdown / HTML / JSON-LD の retrieval 効率差はどの程度か
- 内部リンク密度は AI 検索の文脈拡張にどう寄与するか

### 現状と方向性

llmoframework.com 自体が実装リファレンスとなっている。Phase 1 で chunking 比較実験を公開予定。

---

## 4. AI-native Documentation

### 扱う範囲

LLM が読み書きしやすい文書フォーマットの研究。llms.txt、Markdown 標準、AI 向けメタデータの最適形を扱う。

### 主な問い

- llms.txt は実際にどの LLM / クローラが参照しているか
- Markdown と HTML、それぞれの retrieval 効率と表現力の最適点はどこか
- AI 向けの構造化メタデータ（JSON-LD 等）は引用率に影響するか

### 現状と方向性

llms.txt の実装と効果測定を継続中。Phase 1 で llms.txt-validator OSS ツールを公開予定。

---

## 5. Agent-oriented Information Architecture

### 扱う範囲

AI エージェント（Claude Code、Cursor、自律 agent 等）が情報を取得・操作しやすい IA の研究。MCP（Model Context Protocol）exposure、API ドキュメント設計、検索可能性を扱う。

### 主な問い

- MCP サーバーを公開しているサイトは AI 検索の可視性で優位に立てるか
- agent-readable な API ドキュメント（OpenAPI + 自然言語）は単なる API リファレンスより検索されやすいか
- 自律 agent の探索行動を観測する手法は確立可能か

### 現状と方向性

harness-ops で MCP 公開実験を進行中。Phase 1 で Agent Visibility の予備指標を提案予定。

---

## Phase との対応

| 領域 | Phase 1 で予定する成果物 |
|------|------------------------|
| AI Citation Analysis | `llmo-checker` の Citation Visibility 指標 |
| Grounding Visibility | Grounding Stability 指標 + 評価データセット |
| LLM Retrieval Optimization | chunking 比較実験レポート |
| AI-native Documentation | llms.txt-validator OSS |
| Agent-oriented IA | Agent Visibility 予備指標 |

各領域の進捗は [Changelog](/ja/changelog/) と [GitHub Issues](https://github.com/kenimo49/llmo-guide/issues) で公開する。
