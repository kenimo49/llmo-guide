---
title: LLMOとは何か
description: "LLMO (Large Language Model Optimization) とは、AIシステムがWebコンテンツを正確に発見・理解・引用できるように最適化する手法である。"
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is LLMO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "LLMO (Large Language Model Optimization) is the practice of optimizing web content so that Large Language Models — such as ChatGPT, Claude, Gemini, and Perplexity — can accurately discover, understand, and cite it in their responses."
            }
          },
          {
            "@type": "Question",
            "name": "How is LLMO different from SEO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "SEO targets search engine crawlers to rank in search results. LLMO targets LLM training and retrieval to be cited in AI responses. SEO uses backlinks and keywords; LLMO uses clarity, structure, and authority signals."
            }
          },
          {
            "@type": "Question",
            "name": "What is the relationship between LLMO, AEO, and GEO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "LLMO is an umbrella concept that includes AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization). LLMO encompasses both approaches while providing a broader framework for all LLM interactions, not just search engines."
            }
          }
        ]
      }
---

**LLMO (Large Language Model Optimization)** とは、Large Language ModelがWebコンテンツを正確に発見・理解し、回答の中で引用できるように最適化する手法である。

## 課題

ユーザーがAIアシスタントにビジネス・製品・専門分野について質問した際、AIが以下のような問題を起こすことがある:
- そもそも言及されない
- 古い情報を提示する
- 成果を別の人物に帰属させる
- 不正確な説明をする

LLMOは、コンテンツを**AIが発見できる状態**にすることでこれらの問題を解決する。

## LLMOと従来のSEOの違い

| 項目 | SEO | LLMO |
|--------|-----|------|
| 対象 | 検索エンジンのクローラー | LLMの学習データとリトリーバル |
| 目的 | 検索結果での上位表示 | AIの回答で引用される |
| 形式 | HTML最適化 | Markdown + 構造化データ |
| シグナル | 被リンク、キーワード | 明確性、構造、権威性 |
| 測定指標 | ランキング、CTR | AI引用の精度 |

## LLMOとAEO・GEOの関係

LLMOは以下を包含する上位概念である:

- **AEO (Answer Engine Optimization)**: AI搭載検索での回答として選ばれることに焦点を当てる。Jason Barnardが2018年に提唱。
- **GEO (Generative Engine Optimization)**: 生成型検索エンジンでの可視性を最適化する学術的フレームワーク。Princeton大学の研究者が2023年に発表。

LLMOは両方のアプローチを包含しつつ、検索エンジンに限らないすべてのLLMインタラクションに対応した、より広範で実装重視のフレームワークを提供する。
