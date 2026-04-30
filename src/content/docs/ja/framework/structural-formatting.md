---
title: "2. Structural Formatting"
description: "Structural Formattingは、JSON-LD、セマンティックHTML、Markdown、llms.txtなどの機械可読フォーマットを使ってコンテンツを構造化し、AIシステムが効率的に情報を解析・抽出できるようにする手法である。"
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO Component 2: Structural Formatting",
        "description": "Structuring your content for machine consumption with JSON-LD, semantic HTML, and llms.txt.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

## 概要

Structural Formattingは、機械可読なフォーマットとセマンティックマークアップを使ってコンテンツを構造化し、AIシステムが効率的に解析・分類・情報抽出できるようにする手法である。

## なぜ重要か

AIシステムは人間のようにページを「読む」わけではない。構造化されたデータは、自由形式のテキストよりもはるかに確実に処理できる。適切な構造を持たせることで、コンテンツが正しく解釈・引用される可能性が高まり、誤解や見落としを防げる。

## 実装方法

### 1. セマンティックHTMLとMarkdownを使う
適切な見出し（h1-h6）、リスト、テーブル、セマンティック要素でコンテンツを構造化する。視覚的な書式設定（太字、フォントサイズ）を構造的な階層の代わりに使うことは避ける。

### 2. JSON-LD構造化データを実装する
ページにSchema.orgマークアップを追加する。最低限、以下を含める:
- アイデンティティ用の`Organization`または`Person`
- コンテンツページ用の`Article`または`WebPage`
- Q&Aコンテンツ用の`FAQPage`

### 3. llms.txtファイルを提供する
[llms.txt標準](https://llmstxt.org/)に従って、ドメインルートに`/llms.txt`ファイルを作成する。これはAIシステムに対して、サイトの簡潔で機械にやさしい要約を提供するものである。

### 4. コンテンツを階層的に整理する
明確な情報アーキテクチャを使う: 大分類 → 具体的なトピック → 詳細なコンテンツ。この構造をURL構造と見出し階層に反映させる。

### 5. 比較データにはテーブルを使う
比較、機能、仕様を提示する際は、散文的な説明ではなく適切なHTML/Markdownテーブルを使う。

## 例

**--- 非構造化:**
> We offer three plans. The basic plan costs $10 and includes 5 users. The pro plan costs $25 and includes 20 users. The enterprise plan is custom priced with unlimited users.

**--- 構造化:**

| Plan | Price | Users |
|------|-------|-------|
| Basic | $10/mo | 5 |
| Pro | $25/mo | 20 |
| Enterprise | Custom | Unlimited |

## チェックリスト

- [ ] ページが適切な見出し階層（h1 → h2 → h3）を使っている
- [ ] 主要ページにJSON-LD構造化データが存在する
- [ ] ドメインルートにllms.txtファイルが存在する
- [ ] コンテンツが適切にリストやテーブルを使っている
- [ ] URL構造がコンテンツの階層を反映している
