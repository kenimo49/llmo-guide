---
title: "LLMO FAQ"
description: "LLMOの実装に関するよくある質問 — SEOとの関係、所要時間、最初に着手すべき項目、AI可視性の測定方法。"
pubDate: 2026-05-08
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "inLanguage": "ja",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "LLMOはSEOを置き換えるのか？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "いいえ。LLMOとSEOは別の問題を解き、並列で動きます。SEOはランキング検索結果を狙い、LLMOはAIシステム（ChatGPT, Claude, Gemini, Perplexity）に引用・要約・直接回答されることを狙います。LLMOの作業の大半（セマンティックHTML、JSON-LD、サイトマップ、robots.txt）はSEOも強化するので、二者択一ではありません。"
            }
          },
          {
            "@type": "Question",
            "name": "LLMOの実装にはどれくらい時間がかかる？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "最低限のLLMOベースライン（llms.txt、/ai/ Markdown、GPTBot/ClaudeBot/PerplexityBotを許可するrobots.txt、主要ページのJSON-LD）は小規模サイトで約30分。LLMOフレームワークで16/18を達成するには通常数週間の漸進的な作業が必要です。"
            }
          },
          {
            "@type": "Question",
            "name": "最初に何を実装すべき？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "検索シグナル（コンポーネント3）から開始: /llms.txt、/ai/ Markdownサマリ、AIクローラーを明示的に許可するrobots.txt、到達可能なsitemap.xml。これら4つが最下層に触れます — なければ知識の明確性や権威の作業は発見されません。"
            }
          },
          {
            "@type": "Question",
            "name": "本当に /llms.txt と /ai/ ディレクトリは必要？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "両方とも推奨ですが任意です。/llms.txt（llmstxt.org準拠）はサイトの高速で構造化されたマップをAIに提供し、AIエージェントが検索経由ではなくページを直接取得するときに特に価値があります。/ai/ Markdown はクローラーとコピペユーザーにHTMLクロムなしのクリーンなテキストを提供します。"
            }
          },
          {
            "@type": "Question",
            "name": "不要なAIクローラーをブロックするには？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "robots.txt に明示的な User-agent ディレクティブを使います。例: 'User-agent: GPTBot' に続けて 'Disallow: /' でOpenAIの学習クロールから除外。各主要クローラー（GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bytespider）はユーザーエージェントとオプトアウト仕様を公開しています。LLMOはオプトイン、ブロックは常に許可されます。"
            }
          },
          {
            "@type": "Question",
            "name": "LLMOが効いているかをどう測る？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "3つの層: (1) サーバーログ — GPTBot, ClaudeBot, PerplexityBot のユーザーエージェントとフェッチされたページ; (2) AIプロンプト監査 — ChatGPT, Claude, Perplexity に業界関連の質問をして自サイトが引用されるか確認; (3) リファラル分析 — chat.openai.com, claude.ai, perplexity.ai などからの訪問。月次で全3つを追跡。"
            }
          },
          {
            "@type": "Question",
            "name": "JSON-LDは必須？プレーンHTMLでは不十分？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "プレーンなセマンティックHTML単独でも機能しますがパフォーマンスは低下します。JSON-LDはauthor, publisher, datePublished, sameAsアイデンティティ等の明示的事実を表現し、AIシステムが散文を解析せずに消費できます。LLMOで構造化フォーマットと権威シグナルを同時に持ち上げる最も安価な単一手段。"
            }
          },
          {
            "@type": "Question",
            "name": "低トラフィックのB2BサイトでもLLMOは重要？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "はい — むしろより重要。B2BのAI検索トラフィックは一般検索より高いコンバージョン率（Go Fish Digital観測で25倍）。バイヤーがAIアシスタントにベンダーを尋ねるとき、引用されるソースになる方がGoogleの2ページ目より価値があります。"
            }
          },
          {
            "@type": "Question",
            "name": "LLMOとAEO・GEOの関係は？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "LLMOは上位概念。AEO（Answer Engine Optimization、Jason Barnard 2018）はフィーチャードスニペット・音声回答を狙うが学術フレームワークなし。GEO（Generative Engine Optimization、Princeton/IIT Delhi/Adobe、KDD 2024）は生成検索に特化した学術論文。LLMOは両者に検索・権威シグナルを統合した実装可能なフレームワーク。"
            }
          },
          {
            "@type": "Question",
            "name": "静的サイト（バックエンドなし）でもLLMOを実装できる？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "はい。静的サイトはLLMOの理想的なターゲット — 全コンポーネント（llms.txt, /ai/ Markdown, JSON-LD, robots.txt, sitemap.xml）は静的ファイル。あなたが今読んでいるサイトは GitHub Pages 上の静的Astroサイトで、LLMOフレームワーク 18/18。"
            }
          },
          {
            "@type": "Question",
            "name": "引用シグナルのためにコンテンツをどれくらいの頻度で更新すべき？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AIシステムは鮮度を重み付けします。主要参照ページ（フレームワーク、ガイド、論文・リサーチ）は四半期に1度、変化の速いトピック（モデルリリース、AIポリシー、ツール）は月次。常にdatePublished（作成）とdateModified（改訂）の両方を更新。Microsoftの2025年10月ガイドラインは鮮度を3つのコア原則の1つとして列挙。"
            }
          }
        ]
      }
---

LLMOフレームワーク実装に関するよくある質問。あなたの質問が見つからない場合は [Issue](https://github.com/kenimo49/llmo-guide/issues) を作成してください — issue tracker の回答はこのページに反映されます。

## LLMOはSEOを置き換えるのか？

いいえ。LLMOとSEOは別の問題を解き、並列で動きます。

- **SEO** はランキング検索結果を狙う
- **LLMO** はAIシステム（ChatGPT, Claude, Gemini, Perplexity）に引用・要約・直接回答されることを狙う

LLMOの作業の大半（セマンティックHTML、JSON-LD、サイトマップ、robots.txt）はSEOも強化するため、二者択一ではありません。

## LLMOの実装にはどれくらい時間がかかる？

- **30分**: 最低限のベースライン（llms.txt、/ai/ Markdown、AIを許可するrobots.txt、主要ページのJSON-LD）。[クイックスタート](/ja/guide/quickstart/) を参照。
- **数週間**: [LLMOフレームワーク](/ja/framework/overview/) で 16/18 を達成。大半の時間はサイト全体の権威・引用シグナルに使われます。

## 最初に何を実装すべき？

**検索シグナル**（コンポーネント3）から開始:

1. サイトルートに `/llms.txt`
2. `/ai/` Markdown サマリ（多言語なら言語別にも）
3. GPTBot, ClaudeBot, PerplexityBot, Google-Extended を明示的に許可する `robots.txt`
4. ルートから到達可能な `sitemap.xml`

これらがなければ、知識の明確性や権威の作業は発見されません。

## 本当に /llms.txt と /ai/ ディレクトリは必要？

両方とも推奨ですが任意。

- **`/llms.txt`**（[llmstxt.org](https://llmstxt.org/) 準拠）はサイトの高速で構造化されたマップをAIに提供 — AIエージェントが検索経由ではなく直接ページを取得するときに特に価値あり。
- **`/ai/` Markdown** はクローラーとコピペユーザーにHTMLクロムなしのクリーンなテキストを提供。

維持コストは非常に低く、AI取り込み時の曖昧さを解消します。

## 不要なAIクローラーをブロックするには？

`robots.txt` に明示的な `User-agent` ディレクティブを使います。OpenAIの学習クロールからオプトアウト:

```
User-agent: GPTBot
Disallow: /
```

主要クローラーとオプトアウト仕様は [リサーチ → 論文](/ja/research/papers/) を参照。LLMOはオプトイン、ブロックは常に許可されます。

## LLMOが効いているかをどう測る？

3つの層、月次で追跡:

1. **サーバーログ** — GPTBot, ClaudeBot, PerplexityBot のユーザーエージェントとフェッチされたページ
2. **AIプロンプト監査** — ChatGPT, Claude, Perplexity に業界関連の質問をして自サイトが引用されるか確認
3. **リファラル分析** — `chat.openai.com`, `claude.ai`, `perplexity.ai` 等からの訪問

## JSON-LDは必須？プレーンHTMLでは不十分？

プレーンなセマンティックHTML単独でも機能しますがパフォーマンスは低下します。JSON-LDは `author`, `publisher`, `datePublished`, `sameAs` アイデンティティ等の明示的事実を表現し、AIシステムが散文を解析せずに消費できます。**構造化フォーマットと権威シグナルを同時に持ち上げる最も安価な単一手段。**

## 低トラフィックのB2BサイトでもLLMOは重要？

はい — むしろより重要。B2BのAI検索トラフィックは一般検索より高いコンバージョン率（Go Fish Digital 観測で 25 倍）。バイヤーがAIアシスタントにベンダーを尋ねるとき、引用されるソースになる方がGoogleの2ページ目より価値があります。

## LLMOとAEO・GEOの関係は？

LLMOは上位概念。

| 標準 | 起源 | 範囲 |
|-----|------|------|
| AEO | Jason Barnard, 2018 | フィーチャードスニペット、音声回答 — 学術フレームワークなし |
| GEO | Princeton/IIT Delhi/Adobe, KDD 2024 | 生成検索、学術 |
| **LLMO** | このサイト, 2026 | 全LLMインタラクション: 検索、チャット、RAG、エージェント |

詳細は [LLMO vs SEO vs AEO vs GEO](/ja/guide/llmo-vs-seo-aeo-geo/)。

## 静的サイト（バックエンドなし）でもLLMOを実装できる？

はい。静的サイトはLLMOの理想的なターゲット — 全コンポーネント（llms.txt, /ai/ Markdown, JSON-LD, robots.txt, sitemap.xml）は静的ファイル。

あなたが今読んでいるサイトは GitHub Pages 上の静的Astroサイトで、LLMOフレームワーク 18/18。

## 引用シグナルのためにコンテンツをどれくらいの頻度で更新すべき？

AIシステムは鮮度を重み付け。

- **四半期**: 主要参照ページ（フレームワーク、ガイド、論文・リサーチ）
- **月次**: 変化の速いトピック（モデルリリース、AIポリシー、ツール）
- **常時**: `datePublished`（作成）と `dateModified`（改訂）両方を更新

Microsoftの2025年10月ガイドラインは鮮度を3つのコア原則の1つとして列挙。[Microsoftガイドライン](/ja/research/microsoft-guidelines/) を参照。
