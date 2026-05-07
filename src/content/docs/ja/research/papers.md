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

## 2025–2026 アップデート

LLMO 領域は GEO 論文以降、急速に変化しています。以下は一次情報として継続的に追跡している参照先。

### Cloudflare Radar — AI Insights
- **発行元**: Cloudflare
- **URL**: [radar.cloudflare.com/ai-insights](https://radar.cloudflare.com/ai-insights)
- **種別**: 継続更新ダッシュボード
- **関連性**: AIボットのクロールシェア、主要AIクローラー（GPTBot、ClaudeBot、PerplexityBot、Bytespider、Google-Extended等）、ドメイン別のAIボット vs リファラル比率の公開データ。Cloudflareは2024年にAIボットブロック機能を追加し、2025年通して四半期トレンドデータを公開。

### OpenAI GPTBot ドキュメント
- **発行元**: OpenAI
- **URL**: [platform.openai.com/docs/bots](https://platform.openai.com/docs/bots)
- **種別**: 公式クローラー仕様
- **関連性**: GPTBot のユーザーエージェント、IP範囲、robots.txt ディレクティブ、オプトアウト仕様の正規リファレンス。継続的に更新。

### Anthropic クローラー仕様
- **発行元**: Anthropic
- **URL**: [support.anthropic.com](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- **種別**: 公式クローラー仕様
- **関連性**: ClaudeBot、Claude-Web、Claude-User の各ユーザーエージェントとサイト所有者による制御方法の正規リファレンス。

### llms.txt 採用トラッカー
- **発行元**: directory.llmstxt.cloud
- **URL**: [directory.llmstxt.cloud](https://directory.llmstxt.cloud/)
- **種別**: コミュニティ管理ディレクトリ
- **関連性**: `/llms.txt` 標準を採用したサイトを追跡。2025年を通じてドキュメントサイト（Anthropic、Mintlify、Stripe形式のAPI docs等）で採用が拡大。

### Schema.org リリース（2025）
- **発行元**: schema.org
- **URL**: [schema.org/docs/releases.html](https://schema.org/docs/releases.html)
- **種別**: バージョン管理された語彙リリース
- **関連性**: LLMO コンポーネント2（構造的フォーマット）で使われる語彙への継続的追加。AI 消費に関連する新しい型（`LearningResource`、`EducationalOccupationalCredential` 等）を追跡。

## 関連リサーチ

### Schema.org 構造化データ
- **URL**: [schema.org](https://schema.org/)
- **関連性**: LLMOコンポーネント2（Structural Formatting）におけるJSON-LD構造化データ実装で使用される語彙標準。

### Google 構造化データ ドキュメント
- **URL**: [developers.google.com/search/docs/appearance/structured-data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- **関連性**: 検索エンジンとAIシステムの両方で認識される構造化データの実装ガイドライン。

## コントリビュート

関連する論文やレポートをご存じの場合は、[Issue](https://github.com/kenimo49/llmo-guide/issues)を作成するか、プルリクエストを送信してこのリストに追加してください。
