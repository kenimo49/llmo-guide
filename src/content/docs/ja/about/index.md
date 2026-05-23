---
title: "Open LLMO Research Initiative について"
description: "Open LLMO Research Initiative の Mission、研究方針、Founder、Phase ロードマップ。"
pubDate: 2026-05-24
---

**Open LLMO Research Initiative** は、AI による情報検索 (retrieval)、引用 (citation)、根拠付け (grounding) の領域を扱う独立した研究イニシアティブ。仕様策定、ベンチマーク、オープンソースツールを成果物として公開する。

## Mission

AIネイティブな retrieval、grounding visibility、LLM 指向の情報アーキテクチャを研究し、再現可能な指標と仕様を公開する。

### 研究領域

| 領域 | 内容 |
|------|------|
| AI Citation Analysis | LLM がコンテンツを引用する条件と頻度の分析 |
| Grounding Visibility | AI が何を根拠に回答しているかを可視化する手法 |
| LLM Retrieval Optimization | LLM 検索層に対する文書最適化 |
| AI-native Documentation | LLM が扱いやすい文書フォーマットの研究 |
| Agent-oriented Information Architecture | AIエージェントが操作しやすい情報構造の研究 |

## なぜこの Initiative なのか

LLMO / AEO / GEO 領域は急速に拡大しているが、以下の前提が欠落している。

- **再現可能な計測指標がない** — SEO における Lighthouse / PageSpeed Insights に相当する公開ツールが存在しない
- **共通の用語・スコープが定まっていない** — 各社の独自定義が乱立している
- **オープンな実験データが少ない** — 商用 SEO ツールが中心で、研究レイヤーが薄い

本イニシアティブは、上記3点を埋めることを目的とする。Lighthouse が SEO の方法論を公開・標準化したのと同じ役割を、LLMO 領域で果たすことを目指す。

## 研究方針

| 原則 | 意味 |
|------|------|
| Reproducibility first | すべての指標に計算式と OSS チェッカーコードを添える |
| Draft over Standard | 仕様は "Draft / Experimental / Proposal v0.1" として公開し、変更可能性を保つ |
| Open Source first | ツールは OSS、データは CC BY、Spec は MIT で公開 |
| Solo-honest | 1人運営である事実を明示し、過剰な権威化を避ける |

## Founder

[Ken Imoto](https://kenimoto.dev)。LLMO とハーネスエンジニアリングに関する複数書籍を Zenn / Amazon Kindle で公開。Propel-Lab Inc. 代表。harness-ops（事業運営自律化フレームワーク）と llmoframework.com の実装・運営担当。

主な公開物:

- 書籍: [全書籍リスト (kenimoto.dev/ja/books)](https://kenimoto.dev/ja/books/)
  - LLMO シリーズ（Kindle / Zenn Book、日本語・英語・ポルトガル語・スペイン語）
  - ハーネスエンジニアリングシリーズ（Kindle / Zenn Book）
- Web: [kenimoto.dev](https://kenimoto.dev) / [propel-lab.co.jp](https://propel-lab.co.jp)
- Amazon Author Page: [Ken Imoto on Amazon](https://www.amazon.co.jp/stores/author/B0GQNPRCGF)
- Zenn: [zenn.dev/kenimo49](https://zenn.dev/kenimo49)
- OSS: [github.com/kenimo49](https://github.com/kenimo49)

## Phase ロードマップ

本イニシアティブは段階的に成熟させる。各 Phase の完了は次 Phase の前提となる。

| Phase | 内容 | 状態 |
|-------|------|------|
| Phase 0 | Research framing / Mission 公開 / 最初の Experiment Log | 進行中 |
| Phase 1 | Reproducibility — OSS CLI (llmo-checker)、Score v0.1 Draft、データセット公開 | 計画 |
| Phase 2 | Community — contributors、external references、フィードバック導線 | 計画 |
| Phase 3 | Standardization — Spec 正式化、Compatible 認証バッジ、Working Group 化 | 計画 |

「標準化」は最後に位置する。OSS とベンチマークと実装が先に成熟しなければ、認証も Spec も信頼を獲得できない。

## コントリビュートする

| 方法 | リンク |
|------|--------|
| Issue / バグ報告 | [github.com/kenimo49/llmo-guide/issues](https://github.com/kenimo49/llmo-guide/issues) |
| Pull Request | [github.com/kenimo49/llmo-guide](https://github.com/kenimo49/llmo-guide) |

## ライセンス

本サイト全文と Spec ドラフトは [MIT License](https://opensource.org/licenses/MIT) の下で公開している。
