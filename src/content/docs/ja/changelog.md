---
title: "変更履歴"
description: "LLMOフレームワークのバージョン履歴。新コンポーネント・新ガイド・新ケーススタディはここで追跡される。デザイン調整やtypo修正はカウントしない。"
pubDate: 2026-05-08
---

LLMOフレームワークは、進化するドキュメントサイト向けに設計されたコンテンツバージョニング方針に従う: バージョンを上げるのは**概念とコンテンツ主張の変更**だけだ。デザイン調整、コピー編集、翻訳バックフィルは、バージョン番号を動かさずに継続的に行われる。

## バージョニング方針

| 種類 | トリガー |
|------|---------|
| **MAJOR** | フレームワークの破壊的変更 — コンポーネントの改名・削除、スコアスケール変更、基本用語の変更 |
| **MINOR** | 新フレームワークコンポーネント、新ガイド記事、新ケーススタディ、新リサーチエントリ |
| **PATCH** | 既存記事への実質的なセクション追加（新しい小見出し、例、チェックリスト項目） |

現在のバージョン、`package.json` の `version` フィールド、git タグ `vX.Y.Z` は常に一致する。

完全な機械可読履歴は [GitHub の CHANGELOG.md](https://github.com/kenimo49/llmo-guide/blob/main/CHANGELOG.md) に存在する。以下は人間可読のサマリだ。

## v1.1.0 — 2026-05-08

**見出し**: フレームワークが5コンポーネントから6コンポーネントに拡張。最大スコアは18（旧15）。

### 新規

- **6番目のフレームワークコンポーネント: [整合性シグナル](/ja/framework/coherence-signals/)** — AIが読むあらゆる面（HTML、JSON-LD、Markdown、llms.txt、/ai/*.md）で同じ事実が同じ物語を語ることを保証する規律。実世界の実装の多くが、他のLLMOチェックをすり抜けるクロスファイルドリフトを抱えてリリースされていたため追加した
- **[LLMO監査: 二段レビュー](/ja/guide/llmo-audit-two-pass-review/)** — 自分のLLMO実装を監査する方法論。まず自己レビュー、次に read-only サンドボックスの独立AIエージェント。Codex CLI の起動パターン（`</dev/null` の stdin 罠を含む）と構造化プロンプトテンプレートを含む
- **ケーススタディ: [Propel-Lab リファレンスサイトの自社監査](/ja/case-studies/propel-lab-self-audit/)** — 20件の発見（自己レビューで11件、第2段でのみ捕捉した9件）。チームが数ヶ月運用していた silent JSON-LD drop を含む。LLMOの実装と監査が異なる注意モードであることを示す

### 拡張

- **[構造化フォーマット](/ja/framework/structural-formatting/)** — 2つの新セクション:
  - *JSON-LDエンティティをページ主題に絞る*: サイト全体レイアウトは `Organization` / `WebSite` / `Person` のみを出力。ページ別エンティティ（`Service[]`、`Book[]`、`MusicGroup`、`FAQPage`）はそれらが主題となるページに属する
  - *JSON-LDが実際に出力されているか検証する*: 出力検証を独立したフレームワーク上の関心事として扱う。silent drop のビルド時チェック、Schema.org Validator と Rich Results Test の統合

### 再スコア

- **[フレームワーク概要](/ja/framework/overview/)** — 6コンポーネント構造に再構築、スコアバンドを18点満点に再調整、セルフ評価チェックリストに整合性関連の3項目を追加

## v1.0.0 — 2026-04-30

LLMOフレームワークドキュメントサイトの初公開リリース。5フレームワークコンポーネント、8言語、Getting Started・Framework・Case Studies・Research の全セクションを含む。

## 更新を追跡する方法

- **GitHub リポジトリをウォッチ**: [kenimo49/llmo-guide](https://github.com/kenimo49/llmo-guide)
- **リリースを購読**: GitHub リリースは上記のバージョンに一致する `vX.Y.Z` でタグ付けされる
- **RSS / Atom**: Starlight の組み込みフィード（有効化時）は pubDate に従う。pubDate はフレームワーク変更時のみ更新される
