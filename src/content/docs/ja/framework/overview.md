---
title: "LLMOフレームワーク: AI発見可能性の標準"
description: "LLMOフレームワークは、AI発見可能性のための5つのコアコンポーネントを定義する: Knowledge Clarity、Structural Formatting、Retrieval Signals、Authority Signals、Citation Signals。最大スコア: 15点。"
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "The LLMO Framework: A Standard for AI Discoverability",
        "description": "Five core components for making your content discoverable by AI.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

LLMOフレームワークは、AIシステムがコンテンツを発見し、理解し、正確に引用できるかどうかを決定する5つのコアコンポーネントを定義する。

## 5つのコンポーネント

### 1. Knowledge Clarity
コンテンツは、AIが正確に理解・要約できるほど明確か？

- 平易で曖昧さのない表現を使う
- 重要な用語を明示的に定義する
- 構造化された事実（誰が、何を、いつ、どこで）を提供する
- 説明なしの専門用語を避ける

### 2. Structural Formatting
コンテンツは機械が消費しやすい構造になっているか？

- セマンティックHTMLとMarkdownを使う
- JSON-LD構造化データを実装する
- AI向けコンテンツとしてllms.txtを提供する
- コンテンツを階層的に整理する

### 3. Retrieval Signals
AIシステムは必要なときにコンテンツを見つけられるか？

- クロール可能性を確保する（robots.txt、sitemap.xml）
- 機械可読なエンドポイントを提供する（/ai/、.mdファイル）
- llms.txt標準を実装する
- 可能な場合はAPI経由でコンテンツを提供する

### 4. Authority Signals
コンテンツは専門性と信頼性を示しているか？

- 検証可能な資格情報を持つ著者の帰属表示
- クロスプラットフォームでのプレゼンス（GitHub、LinkedIn、出版物）
- すべてのプラットフォームで一貫した情報
- 引用に基づくエビデンスベースの主張

### 5. Citation Signals
コンテンツにはAIが検証できる参考文献が含まれているか？

- 一次情報源へのリンク
- 公開日の記載
- バージョン情報の提供
- 学術論文や公式ドキュメントの参照

## スコアリング

各コンポーネントは0-3のスケールで採点できる:

| スコア | レベル | 説明 |
|-------|-------|------|
| 0 | なし | コンポーネントが対応されていない |
| 1 | 基本 | 最小限の実装 |
| 2 | 良好 | 改善の余地はあるが堅実な実装 |
| 3 | 優秀 | ベストプラクティスに沿った実装 |

**最大スコア: 15点**（5コンポーネント x 各3点）
