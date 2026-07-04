---
title: LLMO vs SEO vs AEO vs GEO
description: "LLMO、SEO、AEO、GEOは互いに重なり合う4つのコンテンツ最適化手法である。LLMOはAEOとGEOを包含し、すべてのLLMインタラクションをカバーする上位概念である。"
pubDate: 2026-04-30
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
            "name": "LLMO・SEO・AEO・GEOの違いは何か?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "SEOは検索エンジン (Google、Bing) のランキングに最適化する。AEOは回答エンジン (音声アシスタント、強調スニペット) で直接回答として選ばれることに最適化する。GEOは生成型検索エンジン (ChatGPT、Perplexity) での可視性に最適化する。LLMOはAEOとGEOを包含する上位概念で、直接的なLLMクエリ、RAGアプリケーション、自律的なAIエージェントを含むすべてのLLMインタラクションに及ぶ。"
            }
          },
          {
            "@type": "Question",
            "name": "LLMO・AEO・GEOはどのような関係か?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "LLMOはAEO (回答エンジン重視) とGEO (生成型検索重視) の両方を含む上位概念である。AEOはGEOのサブセットであり、GEOはLLMOのサブセットである。LLMOはさらに、この2つの用語ではカバーされない直接的なLLMクエリとAIエージェントも対象に含む。"
            }
          },
          {
            "@type": "Question",
            "name": "どれに最適化すべきか?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "LLMOはスーパーセットなので、LLMOに最適化すればAEOとGEOは副次的にカバーされる。SEOだけに最適化したサイトはGoogleでは上位表示されても、ChatGPT、Claude、Gemini、Perplexityからは見えないままになり得る。読者がAIツールでコンテンツを見つけているなら、LLMOから始めるのがよい。"
            }
          }
        ]
      }
---

**LLMO、SEO、AEO、GEOは、互いに重なり合う4つのコンテンツ最適化手法である。** LLMOはAEOとGEOを包含し、すべてのLLMインタラクションに及ぶ上位概念であり、SEOはAIシステムではなく検索エンジンを対象とする先行手法にあたる。

用語そのものを確認したい場合は、まず [LLMOとは何か](/ja/guide/what-is-llmo/) から。このページは定義を理解している前提で進む。

## LLMO・SEO・AEO・GEOの違いは何か?

**SEOは検索エンジンのランキング、AEOは回答エンジンでの直接回答、GEOは生成型検索エンジンでの可視性を対象とし、LLMOはAEOとGEOを含むすべてのLLMインタラクションを対象とする。**

- **SEO (Search Engine Optimization、1997年〜)** — 検索エンジン (Google、Bing) の検索結果で上位表示されるように最適化する。シグナル: 被リンク、キーワード、技術的パフォーマンス。
- **AEO (Answer Engine Optimization、2018年〜)** — 回答エンジン (音声アシスタント、強調スニペット) で直接回答として選ばれるように最適化する。シグナル: 疑問文型の見出し、構造化されたQ&A。
- **GEO (Generative Engine Optimization、2023年〜)** — 生成型検索エンジン (ChatGPT、Perplexity) での可視性を最適化する学術的フレームワーク。シグナル: 統計データ、引用、権威ある発言者の言葉。
- **LLMO (Large Language Model Optimization、2024年〜)** — AEO + GEO + 直接的なLLMクエリ + RAG + AIエージェントをカバーする上位手法。シグナル: ナレッジクラリティ、構造化フォーマット、検索シグナル、権威性シグナル、引用シグナル、整合性シグナル。

```
1997: SEO — 検索エンジン向けの最適化
2018: AEO — 回答エンジン向けの最適化
2023: GEO — 生成エンジン向けの最適化
2024: LLMO — すべてのLLMインタラクション向けの最適化
```

## 比較表

| | SEO | AEO | GEO | LLMO |
|---|---|---|---|---|
| **焦点** | 検索ランキング | AIによる回答 | 生成型検索 | すべてのLLMインタラクション |
| **対象** | Google、Bing | 音声アシスタント、AI検索 | AI搭載の検索エンジン | ChatGPT、Claude、Gemini、Perplexity |
| **学術的裏付け** | 数十年の研究蓄積 | 限定的 | Princeton大学 (KDD 2024) | 新興分野 |
| **フレームワーク** | 確立済み | 非公式 | 研究重視 | LLMO Framework (6コンポーネント) |
| **スコープ** | Web検索 | 狭い (回答のみ) | 狭い (生成型検索のみ) | 広い (すべてのLLMコンテキスト) |

## LLMO・AEO・GEOはどのような関係か?

**LLMOはAEOとGEOをサブセットとして包含し、検索を超えて、LLMがWebコンテンツとやり取りするすべてのコンテキストをカバーする。**

```
LLMO (すべてのLLMインタラクション)
├── GEO (生成型検索エンジン)
│   └── AEO (回答重視の検索)
└── 直接的なLLMクエリ (ChatGPT, Claude 等)
    └── RAGベースのアプリケーション
    └── Webを閲覧するAIエージェント
```

一文で言えば **AEO ⊂ GEO ⊂ LLMO** — AEOでの成果はそのままGEOの成果であり、LLMOの成果でもある。逆方向は成り立たない。

## どれに最適化すべきか?

**最も広い範囲をカバーしたいなら、LLMOに最適化する。** LLMOはスーパーセットなので、そのチェックリストを満たせばAEOとGEOも副次的にカバーされる。SEOだけに最適化したサイトは、Googleでは上位表示され続けても、ChatGPT、Claude、Gemini、Perplexityからは見えないままになり得る。ユーザーが質問を始める場所は、いまやそちらへ移りつつある。

はじめの一歩は [30分でクイックスタート](/ja/guide/quickstart/)。サイトを「AIから見えない状態」から「AIに引用される状態」へ動かす3つの必須ファイル (`robots.txt`、`llms.txt`、JSON-LD) を扱っている。

ローカルビジネスやマップ検索が対象なら、[ローカルビジネス向けのLLMO vs GEO vs AEO](https://ainativemeo.com/ja/blog/llmo-vs-geo-vs-aeo/) が同じ比較をGoogleビジネスプロフィール、NAPのエンティティ解決、各AIエンジンによるローカルデータの引用に当てはめて解説している。
