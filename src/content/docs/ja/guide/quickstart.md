---
title: "LLMOクイックスタート: 30分で実装"
description: "30分以内にサイトへLLMOの3つの必須ファイルを追加する: llms.txt、AI向けrobots.txt、JSON-LD構造化データ。"
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "LLMO Quickstart: Implement in 30 Minutes",
        "description": "Add the three essential LLMO files to your site in under 30 minutes.",
        "totalTime": "PT30M",
        "step": [
          {"@type": "HowToStep", "name": "Add robots.txt for AI crawlers", "position": 1},
          {"@type": "HowToStep", "name": "Create llms.txt", "position": 2},
          {"@type": "HowToStep", "name": "Add JSON-LD structured data", "position": 3}
        ],
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"}
      }
---

3つのファイルを追加するだけで、サイトをAIに発見可能な状態にできる。所要時間は30分。このガイドではLLMOの最小限の実装を解説する。

## 3つの必須ファイル

| ファイル | 目的 | 所要時間 |
|------|---------|------|
| `robots.txt` | AIクローラーにサイトへのアクセスを許可する | 5分 |
| `llms.txt` | サイトの構造化されたサマリーをAIに提供する | 15分 |
| JSON-LD `<script>` | コンテンツの構造化データをAIに伝える | 10分 |

## ステップ1: AI向けrobots.txt (5分)

ほとんどのサイトにはすでに`robots.txt`がある。AIクローラー向けの明示的な`Allow`ルールを追加する:

```txt
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

**なぜ明示的なAllowが必要か？** 一部のホスティングプラットフォームやCDNは、デフォルトでAIクローラーをブロックしている。明示的なルールを設定することで、意図しないブロックを防げる。

### 主要なAIクローラー

| クローラー | 運営元 | 用途 |
|---------|----------|---------|
| GPTBot | OpenAI | ChatGPT、Webブラウジング |
| ClaudeBot | Anthropic | Claude Web検索 |
| Google-Extended | Google | Gemini、AI Overviews |
| PerplexityBot | Perplexity | Perplexity検索 |
| Amazonbot | Amazon | Alexa、商品検索 |
| CCBot | Common Crawl | 学習データ収集 |

## ステップ2: llms.txtの作成 (15分)

`llms.txt`ファイル (Jeremy Howardが[llmstxt.org](https://llmstxt.org)で提案) は、AIシステムにサイトの構造化されたサマリーを提供する。

サイトのルートに配置する: `https://yoursite.com/llms.txt`

### テンプレート

```markdown
# サイト名

> サイトの概要を1文で。

## 事業内容

コア事業、専門分野、目的を簡潔に説明する段落。
平易な言葉を使い、マーケティング用語は避ける。

## 基本情報

- 設立: [年]
- チーム: [規模または主要メンバー]
- 所在地: [必要に応じて]
- 専門分野: [コア領域]

## 製品・サービス

- **製品A**: 簡潔な説明
- **製品B**: 簡潔な説明

## リンク

- Webサイト: https://yoursite.com
- ドキュメント: https://yoursite.com/docs
- GitHub: https://github.com/yourorg
- お問い合わせ: https://yoursite.com/contact
```

### ベストプラクティス

1. **事実を先に、マーケティングは後に。** 「AI自動化を活用したAndroidアプリを開発」は「最先端のシナジーを活用」より優れている。
2. **構造化データを含める。** テーブル、リスト、キーバリューペアは、散文よりもAIが解析しやすい。
3. **2,000語以内に収める。** 簡潔なサマリーほど完全に取り込まれる可能性が高い。
4. **定期的に更新する。** AIシステムは定期的に再クロールする。古いllms.txtは古いAIの回答につながる。

## ステップ3: JSON-LD構造化データ (10分)

ホームページの`<head>`にJSON-LDスクリプトを追加する。AIがエンティティの種類、関係性、主要な属性を理解する助けになる。

### Organizationスキーマ

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company",
  "url": "https://yoursite.com",
  "description": "What your company does in one sentence.",
  "founder": {
    "@type": "Person",
    "name": "Founder Name"
  },
  "sameAs": [
    "https://github.com/yourorg",
    "https://linkedin.com/company/yourorg",
    "https://x.com/yourorg"
  ]
}
</script>
```

### Articleスキーマ (ブログ記事用)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Your Article Title",
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "https://authorsite.com"
  },
  "datePublished": "2026-01-15",
  "publisher": {
    "@type": "Organization",
    "name": "Your Company"
  }
}
</script>
```

### どのスキーマタイプを使うか

| コンテンツ種別 | スキーマ | 優先度 |
|-------------|--------|----------|
| ホームページ | Organization または Person | 高 |
| ブログ記事 | Article または BlogPosting | 高 |
| 製品 | Product | 高 |
| FAQページ | FAQPage | 中 |
| ドキュメント | TechArticle | 中 |
| 書籍 | Book | 中 |

## 実装の確認

デプロイ後、以下を確認する:

1. **robots.txt**: `https://yoursite.com/robots.txt` にアクセスし、AIクローラーが許可されていることを確認
2. **llms.txt**: `https://yoursite.com/llms.txt` にアクセスし、内容が正確であることを確認
3. **JSON-LD**: [Googleのリッチリザルトテスト](https://search.google.com/test/rich-results)を使うか、ページソースを表示してscriptタグの存在を確認
4. **AIテスト**: ChatGPTやPerplexityにサイト・製品について質問し、回答を観察

## 次のステップ

このクイックスタートでは、LLMO Frameworkの**Retrieval Signals**と**Structural Formatting**コンポーネントをカバーした。フレームワークの全体像については以下を参照:

- [Knowledge Clarity](/ja/framework/knowledge-clarity/) -- AIが理解できるコンテンツの書き方
- [Authority Signals](/ja/framework/authority-signals/) -- 検証可能な専門性の構築
- [Citation Signals](/ja/framework/citation-signals/) -- AIが引用したくなるデータの提供
- [Framework Overview](/ja/framework/overview/) -- 5つのコンポーネントでサイトをスコアリング
