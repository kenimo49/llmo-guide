---
title: "LLMOフレームワーク: AI発見可能性の標準"
description: "LLMOフレームワークは、AI発見可能性のための6つのコアコンポーネントを定義する: ナレッジクラリティ、構造化フォーマット、検索シグナル、権威性シグナル、引用シグナル、整合性シグナル。最大スコア: 18点。"
pubDate: 2026-05-08
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        "@id": "https://llmoframework.com/ja/framework/overview/#6つのコンポーネントとは何か",
        "name": "LLMOフレームワークのコンポーネント",
        "description": "LLMOフレームワークの6つのコアコンポーネント。各コンポーネントを0-3点でスコアリングし、サイトの最大スコアは18点。",
        "hasDefinedTerm": [
          {
            "@type": "DefinedTerm",
            "name": "ナレッジクラリティ",
            "description": "AIが正確に理解・要約できる、明確で事実に基づく曖昧さのないコンテンツ。平易な表現、用語の明示的な定義、構造化された事実、説明なしの専門用語が無いことで測る。",
            "inDefinedTermSet": "https://llmoframework.com/ja/framework/overview/#6つのコンポーネントとは何か",
            "url": "https://llmoframework.com/ja/framework/knowledge-clarity/"
          },
          {
            "@type": "DefinedTerm",
            "name": "構造化フォーマット",
            "description": "セマンティックHTML、Markdown、ページ別にスコープしたJSON-LD、llms.txt標準を含む機械可読な構造。配信HTMLでJSON-LDが実際に出力されているかをビルド時に検証する。",
            "inDefinedTermSet": "https://llmoframework.com/ja/framework/overview/#6つのコンポーネントとは何か",
            "url": "https://llmoframework.com/ja/framework/structural-formatting/"
          },
          {
            "@type": "DefinedTerm",
            "name": "検索シグナル",
            "description": "AIシステムがコンテンツを見つけるためのシグナル。robots.txtとsitemap.xmlによるクロール可能性、/ai/配下の機械可読エンドポイント、llms.txt標準の採用。",
            "inDefinedTermSet": "https://llmoframework.com/ja/framework/overview/#6つのコンポーネントとは何か",
            "url": "https://llmoframework.com/ja/framework/retrieval-signals/"
          },
          {
            "@type": "DefinedTerm",
            "name": "権威性シグナル",
            "description": "専門性と信頼性を示すシグナル。検証可能な著者の帰属、クロスプラットフォームのアイデンティティ（sameAsリンク）、引用付きのエビデンスに基づく主張。",
            "inDefinedTermSet": "https://llmoframework.com/ja/framework/overview/#6つのコンポーネントとは何か",
            "url": "https://llmoframework.com/ja/framework/authority-signals/"
          },
          {
            "@type": "DefinedTerm",
            "name": "引用シグナル",
            "description": "AIシステムが検証できる参照。一次情報源、公開日・更新日、バージョン情報、学術論文や公式ドキュメントへのリンク。",
            "inDefinedTermSet": "https://llmoframework.com/ja/framework/overview/#6つのコンポーネントとは何か",
            "url": "https://llmoframework.com/ja/framework/citation-signals/"
          },
          {
            "@type": "DefinedTerm",
            "name": "整合性シグナル",
            "description": "AIが読むあらゆる面（HTML、JSON-LD、Markdown、llms.txt）で同じ事実が同じ物語を語ること。数値・事実主張の単一ソース・オブ・トゥルースと、クロスファイルドリフトを防ぐCIゲートで支える。",
            "inDefinedTermSet": "https://llmoframework.com/ja/framework/overview/#6つのコンポーネントとは何か",
            "url": "https://llmoframework.com/ja/framework/coherence-signals/"
          }
        ]
      }
---

**LLMOフレームワークは、ナレッジクラリティ、構造化フォーマット、検索シグナル、権威性シグナル、引用シグナル、整合性シグナルの6つのコアコンポーネントを定義する。この6つが、AIシステムがコンテンツを発見し、理解し、正確に引用できるかどうかを決める。** 各コンポーネントは0-3点でスコアリングし、サイトの最大スコアは18点になる。

概念から知りたいなら、まず [LLMOとは何か](/ja/guide/what-is-llmo/) を、すぐに実装したいなら [30分でクイックスタート](/ja/guide/quickstart/) を参照してほしい。

## 6つのコンポーネントとは何か？

コンテンツの明確さを測る「ナレッジクラリティ」、機械可読性の「構造化フォーマット」、到達可能性の「検索シグナル」、信頼性の「権威性シグナル」、検証可能性の「引用シグナル」、面間一貫性の「整合性シグナル」の6つである。

### 1. ナレッジクラリティ
ナレッジクラリティとは、AIが正確に理解・要約できる、明確で事実に基づく曖昧さのないコンテンツを指す。

- 平易で曖昧さのない表現を使う
- 重要な用語を明示的に定義する
- 構造化された事実（誰が、何を、いつ、どこで）を提供する
- 説明なしの専門用語を避ける

### 2. 構造化フォーマット
構造化フォーマットとは、セマンティックHTML・Markdown・ページ別JSON-LD・llms.txt標準を含む、機械が消費しやすい構造を指す。

- セマンティックHTMLとMarkdownを使う
- JSON-LD構造化データをページ別にスコープして実装する
- AI向けコンテンツとしてllms.txtを提供する
- 配信HTMLでJSON-LDが実際に出力されているか検証する

### 3. 検索シグナル
検索シグナルとは、AIシステムが必要なときにコンテンツを見つけられるようにするシグナルを指す。

- クロール可能性を確保する（robots.txt、sitemap.xml）
- 機械可読なエンドポイント（/ai/、.mdファイル）を提供する
- llms.txt標準を実装する
- 可能な場所ではAPI経由でコンテンツを利用可能にする

### 4. 権威性シグナル
権威性シグナルとは、コンテンツの専門性と信頼性を示すシグナルを指す。

- 検証可能な資格を持つ著者の帰属
- クロスプラットフォームでの存在感（GitHub、LinkedIn、出版物）
- すべてのプラットフォームで一貫した情報
- 引用付きのエビデンスベースの主張

### 5. 引用シグナル
引用シグナルとは、AIが検証できる参照（一次情報源・日付・バージョン）を指す。

- 一次情報源にリンクする
- 公開日を含める
- バージョン情報を提供する
- 学術論文や公式ドキュメントを参照する

### 6. 整合性シグナル
整合性シグナルとは、AIが読むあらゆる面（HTML、JSON-LD、Markdown、llms.txt）で同じ事実が同じ物語を語っている状態を指す。

- すべての数値・事実主張に対して単一ソース・オブ・トゥルース
- AI専用面（`llms.txt`、`/ai/*.md`）はHTMLと同じデータから生成
- 正規ホストと末尾スラッシュ方針があらゆる箇所で徹底
- 同じ `@id` に対する重複JSON-LDエンティティが無い

## スコアリング

各コンポーネントは0-3でスコアリングできる:

| スコア | レベル | 説明 |
|------|------|------|
| 0 | なし | コンポーネント未対応 |
| 1 | 基礎 | 最小限の実装 |
| 2 | 良 | 改善の余地はあるが堅実な実装 |
| 3 | 優 | ベストプラクティス実装 |

**最大スコア: 18点**（6コンポーネント × 3点）

## セルフ評価チェックリスト

各コンポーネントに対してサイトをスコアリングする。自信を持ってチェックできるものを1点として扱い、各コンポーネントで3つチェックを目指して最高スコアに到達する。

### 1. ナレッジクラリティ（最大3点）
- [ ] すべてのページが主要な質問に対する1文の回答で始まっている（Answer-first）
- [ ] ドメイン固有の用語が初出時に定義されている（説明なしの専門用語が無い）
- [ ] 各段落が単一のアイデアを保持している（複数主張段落が無い）

### 2. 構造化フォーマット（最大3点）
- [ ] ページが見出しのスキップ無しでセマンティックなH1 → H2 → H3階層を使っている
- [ ] すべての意味あるページがページ別の関連JSON-LDを出力。サイト全体レイアウトは `Organization` / `WebSite` / `Person` のみ
- [ ] ビルドパイプラインが `dist/` HTML で JSON-LD のパース可能性を検証している

### 3. 検索シグナル（最大3点）
- [ ] サイトルートに `/llms.txt` が存在し主要ページがリスト化されている
- [ ] `/ai/` ディレクトリが各主要トピック（多言語サイトなら言語別）にクリーンなMarkdownを配信
- [ ] `robots.txt` が GPTBot、ClaudeBot、PerplexityBot、Google-Extended を明示的に許可。`sitemap.xml` が到達可能

### 4. 権威性シグナル（最大3点）
- [ ] 著者が LinkedIn / GitHub / X / 出版プロファイルへの `sameAs` リンク付きの検証可能なバイオを持つ
- [ ] 同じアイデンティティ（名前、役割、トピックフォーカス）が少なくとも3プラットフォームで一貫
- [ ] サイトが著者が実際に公開した一次研究、書籍、論文にリンクしている

### 5. 引用シグナル（最大3点）
- [ ] 数値を使うすべての主張が名前と年でソースを引用している
- [ ] 各**コンテンツページ**（記事、ガイド、ケーススタディ）が `datePublished` と `dateModified` の両方を露出（JSON-LD または可視メタ）。サイトルートとエラーページは対象外
- [ ] 比較コンテンツが業界標準（W3C、RFC、ISO、schema.org）を名前とリンクで参照

### 6. 整合性シグナル（最大3点）
- [ ] 各数値・事実主張が、他のすべての場所から参照される単一の正規ソースファイルを持つ
- [ ] AI面（`llms.txt`、`/ai/*.md`、URL.mdエンドポイント）が HTML と同じデータから生成されている
- [ ] CI が主要な指標のクロスファイルドリフトをチェック。同じ `@id` の重複JSON-LDエンティティが無い

### スコアガイド

| 合計 | バンド |
|------|------|
| 16–18 | プロダクショングレード — AIシステムから積極的に引用される |
| 11–15 | 良 — AIに見えるが整合性に欠ける |
| 6–10 | 部分的 — 検索・権威・整合性に重大なギャップ |
| 0–5 | 不可視 — `/llms.txt`、robots.txt、JSON-LDから始める |

> より高いスコアを目指すなら、各コンポーネントページ（ナレッジクラリティ、構造化フォーマット、検索シグナル、権威性シグナル、引用シグナル、整合性シグナル）が、スコアを 1 → 2 → 3 に上げる具体的な実装を示している。
