---
title: "論文・参考文献"
description: "LLMOとAI検索最適化に関連する学術研究と業界レポート。GEO（KDD 2024）、llms.txt提案、関連する研究を掲載。"
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO Research Papers & References",
        "description": "Academic research and industry reports related to LLMO and AI search optimization.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

## 主要論文

### GEO: Generative Engine Optimization
- **著者**: Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande
- **機関**: Princeton University、IIT Delhi、Adobe Research
- **発表**: KDD 2024（ACM SIGKDD）
- **リンク**: [arXiv:2311.09735](https://arxiv.org/abs/2311.09735)
- **概要**: 生成型検索エンジンにおけるコンテンツの可視性を最適化するための初の学術フレームワーク。10,000件のクエリに対して9つの最適化戦略をテスト。主な知見として、統計データの追加が可視性を+115.1%向上させた。
- **[詳細サマリー →](/ja/research/geo-paper-summary/)**

### llms.txt 提案
- **著者**: Jeremy Howard
- **リンク**: [llmstxt.org](https://llmstxt.org/)
- **概要**: Webサイトに関する情報をLLMに提供するための標準化ファイルの提案。robots.txtに類似しているが、クローラー制御ではなくAIによる情報取得を目的として設計されている。

## 業界レポート・ガイドライン

### Microsoft: AIによる検索回答のためのコンテンツ最適化
- **発行元**: Microsoft（Bing Webmaster Blog）
- **発行日**: 2025年10月
- **概要**: AIコンテンツ最適化の3原則を示す公式ガイドライン。構造（Structure）、権威性（Authority）、鮮度（Freshness）。
- **[詳細サマリー →](/ja/research/microsoft-guidelines/)**

### Ahrefs: AI可視性におけるWeb上の言及 vs 被リンク
- **発行元**: Ahrefs
- **データセット**: 75,000ブランド
- **概要**: Web上の言及（ブランド名 + キーワード）は、従来の被リンクと比較してAI可視性の予測力が3倍高い。

### Gartner: 検索の未来
- **発行元**: Gartner
- **発行日**: 2024年2月
- **概要**: 2026年までにAI代替ツールへのユーザーシフトにより、従来の検索エンジン利用が25%減少するとの予測。

### Go Fish Digital: AI検索のコンバージョン率
- **発行元**: Go Fish Digital
- **概要**: AI搭載検索からのトラフィックは、事前検証済みのユーザーインテントにより、従来の検索トラフィックの25倍のコンバージョン率を記録。

## 関連リサーチ

### Schema.org 構造化データ
- **URL**: [schema.org](https://schema.org/)
- **関連性**: LLMOコンポーネント2（Structural Formatting）におけるJSON-LD構造化データ実装で使用される語彙標準。

### Google 構造化データ ドキュメント
- **URL**: [developers.google.com/search/docs/appearance/structured-data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- **関連性**: 検索エンジンとAIシステムの両方で認識される構造化データの実装ガイドライン。

## コントリビュート

関連する論文やレポートをご存じの場合は、[Issue](https://github.com/kenimo49/llmo-guide/issues)を作成するか、プルリクエストを送信してこのリストに追加してください。
