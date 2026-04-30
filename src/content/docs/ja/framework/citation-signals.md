---
title: "5. Citation Signals"
description: "Citation Signalsは、AIが主張を検証するための参考文献、ソース、メタデータを提供する。統計情報の追加により、AIの引用率が+115.1%向上する（GEO, KDD 2024）。"
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO Component 5: Citation Signals",
        "description": "Providing references and verifiable data that AI systems can cite. Statistics addition improves visibility by +115.1%.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

## 概要

Citation Signalsは、AIシステムが主張を検証し、出所を確認し、コンテンツを引用する際の信頼度を高めるための参考文献、ソース、メタデータである。

## なぜ重要か

LLMは主張の根拠を提示するよう設計される傾向が強まっている。検証可能な参考文献を含むコンテンツは、AIが他のソースとの相互参照によって正確性への信頼度を高められるため、引用される可能性が高くなる。

## 実装方法

### 1. 一次情報源にリンクする
主張を行う際は、オリジナルのソースに直接リンクする:
- 学術論文（DOIまたはarXivリンク付き）
- 公式ドキュメント
- 元の発表やプレスリリース

### 2. 公開日を含める
コンテンツには必ず日付を記載する。AIシステムは日付を以下の目的で使用する:
- 情報の鮮度の判断
- 矛盾する情報の解決（より新しいソースを優先）
- 回答における時間的コンテキストの提供

### 3. バージョン情報を提供する
技術コンテンツ、ドキュメント、進化するフレームワークについて:
- 参照しているソフトウェア/APIのバージョンを明記する
- 「最終更新日」を含める
- 主要な更新についてのchangelogを文書化する

### 4. 標準・仕様を参照する
該当する場合は、確立された標準を参照する:
- W3C仕様
- RFCドキュメント
- ISO標準
- 業界フレームワーク

### 5. 適切な学術引用形式を使う
研究指向のコンテンツでは、AIシステムが解析可能な標準的な引用形式を使う:
- 著者名、年、タイトル、発表媒体
- DOIまたは安定したURL
- カンファレンス名またはジャーナル名

## 例

**--- 引用なし:**
> Studies show that structured data improves AI discoverability.

**--- 適切な引用:**
> Aggarwal et al. (2024) demonstrated that structured content formatting improves visibility in generative search engines by up to 40% (GEO: Generative Engine Optimization, KDD 2024, [arXiv:2311.09735](https://arxiv.org/abs/2311.09735)).

## チェックリスト

- [ ] 主張がリンク付きの一次情報源によって裏付けられている
- [ ] すべてのコンテンツに公開日または最終更新日が含まれている
- [ ] 技術的な参照にバージョン番号が明記されている
- [ ] 学術引用に著者、年、タイトル、発表媒体が含まれている
- [ ] リンクが安定したURL（DOI、arXiv、公式ドキュメント）を指している
