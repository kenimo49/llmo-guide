---
title: "GEO論文: 科学が示すもの"
description: "Princeton/IIT Delhiによる GEO（Generative Engine Optimization）論文のサマリー。KDD 2024で発表。引用率、コンテンツ戦略、統計改善に関する主要な知見。"
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "GEO Paper: What the Science Says",
        "description": "Summary of the GEO paper (KDD 2024) with key findings on AI citation optimization.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"},
        "citation": {
          "@type": "ScholarlyArticle",
          "name": "GEO: Generative Engine Optimization",
          "author": "Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande",
          "datePublished": "2024",
          "url": "https://arxiv.org/abs/2311.09735"
        }
      }
---

**GEO（Generative Engine Optimization）** 論文は、AI搭載検索エンジンにおけるコンテンツの可視性を最適化するための初の学術フレームワークである。KDD 2024（ACM SIGKDD）で発表されたこの論文は、LLMOフレームワークが基盤とするコンテンツ最適化戦略について実証的な根拠を提供している。

## 論文の詳細

| 項目 | 内容 |
|------|------|
| タイトル | GEO: Generative Engine Optimization |
| 著者 | Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande |
| 機関 | Princeton University、IIT Delhi、Adobe Research |
| 学会 | KDD 2024（ACM SIGKDD） |
| arXiv | [2311.09735](https://arxiv.org/abs/2311.09735) |
| 発表年 | 2024 |

## 研究設計

研究チームは複数のドメインにわたる10,000件の検索クエリからなるベンチマーク **GEO-Bench** を構築した。生成型検索エンジンに対して9つのコンテンツ最適化戦略をテストし、どのアプローチがソースの可視性を向上させるかを測定した。

### テストされた9つの戦略

1. ソースの引用（Cite Sources）
2. 引用文の追加（Quotation Addition）
3. 統計データの追加（Statistics Addition）
4. 流暢さの最適化（Fluency Optimization）
5. ユニークな語彙（Unique Words）
6. 技術用語（Technical Terms）
7. 権威的なトーン（Authoritative Tone）
8. 平易な表現（Easy-to-Understand Language）
9. キーワード詰め込み（Keyword Stuffing）

## 主要な知見

### 戦略の有効性

| 戦略 | 可視性の改善 | LLMOコンポーネント |
|------|------------|-------------------|
| **統計データの追加** | **+115.1%** | Citation Signals |
| **ソースの引用** | **+77.0%** | Citation Signals |
| **引用文の追加** | **+72.2%** | Authority Signals |
| 権威的なトーン | +21.5% | Knowledge Clarity |
| 流暢さの最適化 | +15.2% | Knowledge Clarity |
| 技術用語 | +5.8% | Knowledge Clarity |
| 平易な表現 | +2.4% | Knowledge Clarity |
| ユニークな語彙 | -3.1% | -- |
| キーワード詰め込み | -10.2% | -- |

### 上位3戦略

最も効果的な3つの戦略には共通の特徴がある。いずれも**検証可能な外部エビデンス**を提供している点だ。

1. **統計データの追加（+115.1%）**: 具体的な数値やデータポイントの追加により、コンテンツの可視性が2倍以上に向上した。例: 「売上はYoYで34%成長した」vs「売上は大幅に成長した」

2. **ソースの引用（+77.0%）**: 特定の論文、レポート、ドキュメントへの参照により可視性が77%向上した。AIシステムはクロスリファレンスできるコンテンツを好む。

3. **引用文の追加（+72.2%）**: 専門家や権威あるソースからの直接引用を含めることで、AIシステムが認識して引用する信頼性が付加された。

### 効果のない手法

- **キーワード詰め込み（-10.2%）**: 従来のSEO手法はAI可視性に悪影響を与える。AIシステムは人工的なキーワード密度を検出してペナルティを課すことができる。
- **ユニークな語彙（-3.1%）**: 珍しい語彙の使用は可視性を向上させなかった。巧みさよりも明快さが重要である。

## LLMOへの示唆

### 1. Citation Signalsが最もレバレッジの高いコンポーネント

GEOのデータは、Citation Signals（統計データ、ソース、引用文）が最大の可視性改善をもたらすことを示している。LLMOフレームワークがCitation Signalsをコンポーネント5（他のすべてのコンポーネントの効果を乗算するキャップストーン）として位置づけているのはこのためだ。

### 2. コンテンツの明快さは重要だが、エビデンスほどではない

Knowledge Clarityに関連する戦略（権威的なトーン、流暢さ、平易な表現）はすべてプラスだが控えめな改善（2-22%）を示した。良い文章は必要だが十分ではない。真のレバレッジは検証可能な事実の追加にある。

### 3. SEOの手法はAIには逆効果

初期SEOの柱であったキーワード詰め込みは、AI可視性を積極的に低下させた。これは、LLMOが従来のSEOとは根本的に異なるアプローチを必要とすることを裏付けている。

## ドメイン固有の変動

GEO論文は、戦略の有効性がドメインによって異なることを発見した。

- **事実/科学系クエリ**: 統計データの追加が最も効果的
- **意見/主観系クエリ**: 引用文の追加が最も効果的
- **技術系クエリ**: ソースの引用が最も効果的

この結果は、LLMOの実装をコンテンツのドメインに合わせてカスタマイズすべきことを示唆している。研究サイトは統計データから最も恩恵を受け、ソートリーダーシップブログは専門家の引用からより多くの恩恵を受ける。

## LLMOがGEOを拡張する3つの点

LLMOフレームワークはGEOを3つの方向で拡張している。

1. **対象範囲の拡大**: GEOは生成型検索エンジンに焦点を当てている。LLMOは直接クエリ、RAG、AIエージェントを含むすべてのLLMインタラクションをカバーする。
2. **実装への注力**: GEOは*何が*有効かを特定する。LLMOは具体的なファイル形式（llms.txt）、構造化データ（JSON-LD）、コンテンツ設計パターンによって*どう実装するか*を提供する。
3. **検索レイヤー**: GEOはコンテンツがすでに取得されていることを前提としている。LLMOはコンテンツが最初に発見可能であることを保証するRetrieval Signalsコンポーネントを追加する。

## 参考リンク

- [arXivの論文全文](https://arxiv.org/abs/2311.09735)
- [LLMOフレームワーク概要](/ja/framework/overview/)
- [Citation Signals](/ja/framework/citation-signals/) — GEOで最も効果的な戦略の実装方法
