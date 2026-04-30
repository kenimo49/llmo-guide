---
title: "MicrosoftのAIコンテンツ3原則"
description: "AI生成の検索回答にコンテンツを表示させるためのMicrosoft公式ガイドライン。3つの中核原則: 構造（Structure）、権威性（Authority）、鮮度（Freshness）。"
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Microsoft's 3 Principles for AI Content",
        "description": "Summary of Microsoft's official guidelines for AI content optimization.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

2025年10月、MicrosoftはAI生成の検索回答（Bing Chat、Copilot）にコンテンツを表示させたいコンテンツ制作者向けの公式ガイドラインを公開した。このガイドラインはLLMOフレームワークと高い整合性を持ち、複数のLLMOコンポーネントに対するベンダー確認済みの裏付けを提供している。

## 3つの原則

Microsoftのガイドラインは、AIがコンテンツを生成回答に含めるかどうかを決定する3つの中核属性を示している。

### 1. 構造（Structure）

AIシステムは、非構造的な散文よりも構造化されたコンテンツからの方が確実に情報を抽出できる。Microsoftは以下を推奨している。

- **明確な見出し階層**（H1 → H2 → H3）でコンテンツの構成を反映する
- **比較データには表を使用する** — AIは文中の比較よりも表形式のデータをより高い精度で抽出する
- **順序・分類情報にはリストを使用する** — 手順には番号付きリスト、選択肢には箇条書き
- **Schema.orgマークアップ** — JSON-LD構造化データにより、AIがエンティティの種類と関係を理解しやすくなる

**LLMOとの対応:** コンポーネント2（Structural Formatting）に直接対応する。JSON-LD、セマンティックHTML、llms.txtの使用というLLMOフレームワークの推奨事項がMicrosoftのガイドラインによって検証されている。

### 2. 権威性（Authority）

AIシステムはソースを引用する前に、その信頼性を評価する。Microsoftは以下の権威性シグナルを挙げている。

- **著者の帰属** — 検証可能な資格を持つ実名の著者
- **クロスプラットフォームでの存在感** — Web全体（自サイト、LinkedIn、GitHub、出版物）での一貫した情報
- **出版の実績** — 正確で引用されてきたコンテンツの履歴を持つサイトが優先される
- **独自の研究** — ファーストパーティのデータ、調査、分析は、集約コンテンツよりも重みを持つ

**LLMOとの対応:** コンポーネント4（Authority Signals）に対応する。LLMOフレームワークはクロスプラットフォームでの一貫性と検証可能な資格を主要な差別化要因として強調している。

### 3. 鮮度（Freshness）

AIシステムは、特に変化の多いトピックについて、最新の情報を好む。Microsoftは以下を推奨している。

- **すべてのコンテンツに公開日を記載する** — AIは情報の新しさを評価するために日付を使用する
- **定期的な更新** — 更新されたコンテンツはアクティブなメンテナンスのシグナルになる
- **バージョン情報** — コンテンツが対応する製品バージョンやAPIバージョンを明記する
- **非推奨の通知** — 古いコンテンツにマークを付けることで、AIが陳腐化した情報を引用するのを防ぐ

**LLMOとの対応:** コンポーネント5（Citation Signals）が公開日とバージョン情報を要求しており、コンポーネント3（Retrieval Signals）が定期的に更新されるllms.txtやサイトマップファイルを重視していることから、両コンポーネントにまたがっている。

## 実装チェックリスト

Microsoftのガイドラインに基づいた具体的なアクション項目は以下の通り。

| アクション | Microsoftの原則 | LLMOコンポーネント | 優先度 |
|-----------|----------------|-------------------|-------|
| すべてのページにJSON-LDを追加 | 構造 | 2. Structural Formatting | 高 |
| 一貫した見出し階層を使用 | 構造 | 2. Structural Formatting | 高 |
| 資格情報付きの著者紹介を追加 | 権威性 | 4. Authority Signals | 高 |
| 公開日を記載 | 鮮度 | 5. Citation Signals | 高 |
| 散文の比較を表に変換 | 構造 | 2. Structural Formatting | 中 |
| Schema.orgのArticle/Personマークアップを追加 | 構造 + 権威性 | 2 + 4 | 中 |
| コンテンツを四半期以上の頻度で更新 | 鮮度 | 3. Retrieval Signals | 中 |
| 一次ソースへのリンクを追加 | 権威性 | 5. Citation Signals | 中 |

## Microsoftの原則とLLMOの対応関係

```
Microsoftの3原則              LLMOフレームワーク（5コンポーネント）
─────────────────────────    ────────────────────────────
構造（Structure）          →   2. Structural Formatting
                               3. Retrieval Signals（部分的）
権威性（Authority）        →   4. Authority Signals
                               1. Knowledge Clarity（部分的）
鮮度（Freshness）          →   5. Citation Signals
                               3. Retrieval Signals（部分的）
```

LLMOフレームワークのコンポーネント1（Knowledge Clarity）とコンポーネント3（Retrieval Signals）の実装詳細は、Microsoftのガイドラインの範囲を超えている。これは、LLMOがBing/Copilot検索だけでなく、LLMインタラクションの全範囲を対象としているためだ。

## 重要なポイント

Microsoftのガイドラインは、AIコンテンツ最適化が推測的なものではなく、ベンダーが公式にサポートするベストプラクティスを伴う確立された手法であることを裏付けている。LLMOフレームワークはこれらのガイドラインに先行し、かつ拡張するものであり、より包括的で実装に焦点を当てたアプローチを提供している。

MicrosoftのプリンシプルとLLMOフレームワークの収束は、これらがプラットフォーム固有のテクニックではなく、LLMがコンテンツを評価し引用対象として選択する方法の根本的な特性であることを示唆している。

## ソース

- Microsoft Bing Webmaster Blog: "Optimizing your content for AI-powered search answers"（2025年10月）
- [LLMOフレームワーク概要](/ja/framework/overview/)
- [Structural Formatting](/ja/framework/structural-formatting/)
- [Authority Signals](/ja/framework/authority-signals/)
