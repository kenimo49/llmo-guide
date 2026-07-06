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

## v1.6.2 — 2026-07-06

**Headline**: [LLMOとは何か](/ja/guide/what-is-llmo/) ページが用語を正式に定義するページになった — `DefinedTerm` スキーマ、用語の由来セクション、「LLMOはどう実践するのか？」セクションを追加 (EN/JA)。

### Added

- **「LLMOは何の略か？」** — Large Language Model Optimization の展開形と、この用語が表面ではなく機構 (LLMのリトリーバル・引用挙動) を名指ししている理由
- **「LLMOはどう実践するのか？」** — 3つの必須ファイル (`llms.txt`、AIクローラー向け `robots.txt`、JSON-LD) を実装順に提示し、[クイックスタート](/ja/guide/quickstart/) へ誘導
- 用語「LLMO」の glossary エントリを示す `DefinedTerm` JSON-LD。FAQPage エントリを3問から5問に拡張

### Why this is a PATCH bump

既存ガイドページへのセクションとスキーマの追加。新コンポーネント・新ガイド・新ケーススタディはなく、採点も不変。

## v1.6.1 — 2026-05-25

**見出し**: トップページの末尾に「Reference implementations」セクションを追加した。LLMO Framework を特定バーティカルに適用したリファレンス実装を一覧化する場所。最初のエントリは **AI Native MEO** (`ainativemeo.com`) — ローカルビジネス / マップ検索バーティカルへの適用。

### 追加

- トップページ (`index.mdx`、EN canonical) の末尾に `Reference implementations` セクションを新設。フレームワークのバーティカル別実装をどう追跡するかを示す入口を設けた。
- 初出エントリ: [AI Native MEO](https://ainativemeo.com/) — Google Business Profile を JSON-LD として読み解く / NAP エンティティ解決 / 各 AI エンジンのローカルデータ引用挙動などの実務系記事を擁する。

### なぜ PATCH bump か

新コンポーネント / 新ガイド / 新ケーススタディの追加ではなく、既存ページへの新セクション追加に留まる。フレームワークの構造とスコアリングは変わっていない。

## v1.4.0 — 2026-05-24

**見出し**: llmoframework.com を **Open LLMO Research Initiative** として再ポジショニングし、LLMO Framework を本イニシアティブが最初に公開した参照アーティファクトとして位置付けた。3つの Initiative トップレベルページを全8言語に展開、サイドバーは Initiative を Framework より前に配置、Footer に Founder アトリビューションを全サイト共通で表示する。

### 追加（24ページ × 8言語）

- **[このイニシアティブについて](/ja/about/)** — Mission、研究原則（Reproducibility-first / Draft-over-Standard / OSS-first / Solo-honest）、Founder credentials、Phase 0–3 ロードマップ。
- **[Research Areas](/ja/research-areas/)** — 5つの研究領域: AI Citation Analysis、Grounding Visibility、LLM Retrieval Optimization、AI-native Documentation、Agent-oriented Information Architecture。各領域に scope、主要な問い、Phase 1 想定 deliverable を記載。
- **[実験プロジェクト](/ja/experimental-projects/)** — 3つの Core Projects: **LLMOFramework Score**（Draft v0.1 指標）、**Benchmark**（計画段階）、**Compatible**（Phase 3 ロードマップのみ。認証を ecosystem adoption の後に出すため意図的に Phase 3 まで遅らせている）。

### リフレーミング

- Hero tagline を「オープンスタンダード」から「AI retrieval、grounding visibility、LLM ネイティブ Web アーキテクチャを扱うオープン研究イニシアティブ」に変更（EN + JA `index.mdx`）。
- サイト description と WebSite JSON-LD description: `astro.config.mjs` 経由で全言語に同じリフレーミングを反映。
- `Footer.astro` に「Open LLMO Research Initiative — Founded and maintained by Ken Imoto」アトリビューションを version line の上に追加、全サイト共通。

### Schema 整合性

- `SoftwareApplication`（Framework）に `isPartOf` → `WebSite#website` を追加。Initiative ↔ Framework 関係を JSON-LD 上で構造的に表現し、prose だけに依存しない。
- 「なぜLLMO」セクション（EN + JA）: "implementation-focused standard" → "implementation-focused reference" に変更し、ページレベルの言葉遣いを新フレーミングに合わせた。

### サイドバー

- 新しい最上位セクション "Open LLMO Research Initiative" を追加。About / Research Areas / Experimental Projects を含み、全8言語にローカライズ。セクションラベル自体はブランド名として全言語で英語表記を維持、各項目ラベルは翻訳済み。
- "Getting Started" の前に配置し、Initiative が Framework の親であることを構造的に示す。

## v1.3.3 — 2026-05-18

**見出し**: v1.3.2 の changelog が「既知の整合性ドリフト」として2つの AI 専用面を指摘した。`/ai/` と `/llms.txt` の残りを監査したところ、3つ目のもっと深刻なドリフトを発見した: `framework.md` が**全8言語で**5個の component セクションしか持たず、タイトルだけ言語間で分裂していた。ドキュメント化されたのと同じ時間内に3面すべてを閉じた。

### 修正（25面）

- **`public/llms.txt`（8言語）** — version label を `v1.1.0` から `v1.3.2` に更新。root の `llms.txt` の Changelog 行も更新。
- **`public/ai/about.md`（8言語）** — 6番目のリスト項目として **Coherence Signals** を追加（各言語の `framework/coherence-signals.md` 翻訳から名称を引いた）。見出し「5 components」→「6」を stale だった EN/KO で修正。最大スコア 15→18 を stale だった EN/PT/ZH/ES/DE/KO で修正。
- **`public/ai/framework.md`（8言語）** — `## 6. 整合性シグナル` セクション (Goal + 5 bullets) を各 Implementation Checklist の前に追加。タイトル「5 Core」→「6 Core」を stale だった EN/JA/ZH/DE/KO で修正。

### typo修正ではなくリリースとして扱う理由

このドリフトは load-bearing だった: `/ai/about.md` や `/llms.txt` をクロールする AI システムは5コンポーネントの framework を読み、同じサイトの人間読者は6コンポーネントの framework を見ていた。整合性シグナルはまさにこの failure mode を定義するコンポーネントだ。あるリリースで追加し、その後**4つの後続リリース**で AI 専用面に反映しないままだった — これはフレームワークが produce できる最も恥ずかしいクラスの違反だ。これを PATCH として扱う（typo / no-bump として扱わない）のは、フレームワーク自身の監査トレイルを honest に保つ唯一の方法だ。

### 整合性のナラティブ連続性

フレームワークは「あるドリフト面が次を露出する」6リリースの連鎖を持つに至った: v1.1.0 が整合性シグナル追加 → v1.2.0 が /llms.txt の components を fix（version label は放置）→ v1.3.0 が v1.1.0→v1.2.0 のドリフトを case study 化 → v1.3.1 が CSS 視覚層を fix → v1.3.2 が /ai/ のドリフトを document → v1.3.3 がそれを close。すべてのリリースが前回が見逃したものを surface する。規律とは列挙を公開し、次の読者（または AI）が見落としを見つけてくれるのに任せることだ。

## v1.3.2 — 2026-05-18

**見出し**: AI 発見性を教えるフレームワークサイト自身が引用されていなかった。3回連続の観測で citation rate = 0、一方で LLMO 概念自体は75%のクエリで言及されていた。H2 がトピック名で疑問文ではなかったため、AI 抽出層に持ち上げる aim 文が無かった。

### 変更

- **[LLMO とは?](/ja/guide/what-is-llmo/)** — トピック型 H2 を既存 FAQPage schema の質問文と完全一致させた。各セクションは表やリストの前に1文の定義で開始する。先頭段落を bold に昇格して引用抽出されやすくした。
- **[LLMO vs SEO vs AEO vs GEO](/ja/guide/llmo-vs-seo-aeo-geo/)** — 3つの疑問文 H2 (`LLMO, SEO, AEO, GEO の違いは何か?`、`LLMO, AEO, GEO はどう関係するか?`、`どれを最適化すべきか?`) に再構成、各セクションは定義で開始。
- **[LLMO フレームワーク: 概要](/ja/framework/overview/)** — 冒頭段落を6コンポーネントを全てインライン列挙する1文の bold definition に書き直した。AI が1文から完全なコンポーネント一覧を抽出できる。

### 新規構造化データ（新規ページではない）

- **`framework/overview`** — 6つの `DefinedTerm` エントリを持つ `DefinedTermSet` を付与。各エントリは `@id` でページアンカーにピン留めされ、外部サイトが URL fragment で個別コンポーネントを引用できる。
- **`guide/llmo-vs-seo-aeo-geo`** — 新 H2 と対応する3つの Q&A を持つ `FAQPage` を追加。従来は `what-is-llmo` のみがこの層を持っていた。

### なぜ

これはフレームワークを自身に適用した実験だ。仮説: AI 抽出には H2 の表現が内容品質より効く。今後2-3週の観測で Claude / Perplexity / OpenAI 全体で citation rate が H2 改修と schema 追加だけで0%から動けば、LLMO フレームワークは自身のサイトを証拠として指せる。動かなければ、フレームワークは H2 軸を過大評価していたと認める必要がある。どちらの結果も将来のリリースで記録する。

### 既知の整合性ドリフト（このリリースでは対応しない）

`public/llms.txt` の見出しは依然として `v1.1.0` と書かれており、`public/ai/about.md` は依然として5コンポーネントを列挙している（現在は6）。これらは既存ドリフトで本リリースとは別件、次の保守パスでフラグ済み。

## v1.3.1 — 2026-05-08

**見出し**: 5つの整合性面を閉じたと自慢したケーススタディが、6つ目で失敗した。ken が v1.3.0 ページを読む時間で6つ目を見つけた。

### 修正

- **`src/styles/custom.css`** — `.site-title::after { content: 'v1.0' }` を削除。バージョンバッジがプロジェクトの初コミットからヘッダー CSS にハードコードされており、一度も更新されていなかった。v1.0 → v1.1 → v1.2 → v1.3 — 4 リリースが視覚層の嘘に誰も気づかずに通過した。フッター（v1.2.0 で追加）は `src/data/version.ts` から読み、これが唯一の正規可視ソースとなる
- **[自社監査ケーススタディ](/ja/case-studies/llmo-framework-self-audit/)** — *追記: 6つ目の面* セクションを EN + JA に追加。ケーススタディは元々5つのドリフト面を列挙していたが、追記は1時間以内に発見された6つ目（CSS 視覚層）を記録し、教訓を一般化する: 「この事実が住む場所すべて」を列挙するときは、データ層だけでなく視覚層も含める

### なぜ

このフレームワークのすべてのリリースが、前回のリリースが見えなかったものを暴く。v1.1.0 が整合性シグナルを導入、v1.2.0 が `llms.txt` でそれを違反、v1.3.0 がその違反をケーススタディとして文書化、v1.3.1 がそのケーススタディ自身の不完全さを文書化する。このパターンはフレームワークが機能している証拠だ — すべての整合性面を見つけたと確信する唯一の方法は、自分の列挙を公開し、他の読者が見落としを見つけてくれるのに任せることだ。

## v1.3.0 — 2026-05-08

**見出し**: フレームワークが自身の整合性失敗をファーストクラスのケーススタディとして記録する。

### 新規

- **ケーススタディ: [フレームワーク作者がフレームワークを破ったとき](/ja/case-studies/llmo-framework-self-audit/)** — このサイト自身の自社監査。v1.1.0 が整合性シグナルを導入、v1.2.0 が5つのバージョン情報がバラバラの状態でリリースされた（`package.json`、`version.ts`、`CHANGELOG.md`、EN/JA changelog ページ、git タグ）。codex 第2段レビューが4分で皮肉を捕えた。ケーススタディはドリフト、検出、10ステップの修正、そして一般化される3つのパターン（リリースプロセス自体が整合性面である / ツールはバイパスされたときに価値を証明する / フレームワークは作者を免除しない）を文書化している
- **[整合性シグナル: リリースプロセスは整合性面である](/ja/framework/coherence-signals/#6-リリースプロセスは整合性面である)** — v1.2.0 のエピソードを一般化する新サブセクション。バージョン番号を LLMO の意味での事実として捉え、4 ステップの予防パターン（1つのソースから生成 / 実行時にバージョンを可視化 / クロスチェックでゲート / タグ前に第2段レビュー）を定義する

### なぜ独立したリリースとして扱うか

このエピソードを changelog の脚注に埋もれさせず、ファーストクラスのケーススタディとして記録することを選んだ。理由は2つ。第1に、これはリリース整合性を超えて一般化する — 自身の整合性フレームワークで整合性違反をリリースするフレームワーク作者は、すべて異なるスケールでの同じ failure mode だ。第2に、失敗を隠すこと自体が、私たちが言うこと（透明性、Single Source of Truth）と実際にやることの間の整合性違反になる。

## v1.2.0 — 2026-05-08

**見出し**: 既存コンポーネントの下に2つの実戦パターンを追加 + codex 第2段レビューで判明した整合性問題のクリーンアップ。

### 拡張

- **[権威性シグナル](/ja/framework/authority-signals/)** — *Identity-as-Code*: 1つの Person/Organization JSON-LD、URL ベースの `@id` を 1 つだけ定義し、他の場所はすべて `@id` 参照する。多言語サイトのルール（共有 `Person`/`Organization`、言語別 `WebSite`）も含む。チェックリストに3項目追加
- **[検索シグナル](/ja/framework/retrieval-signals/)** — *Citation Preferred + build-time llms.txt*: トピックごとに正規エントリポイントを命名し、AI が複数ある類似ページの中から正しい URL を引用するよう誘導。`llms.txt`/`llms-full.txt`/`/ai/publications.md` を単一のコンテンツコレクションから生成。チェックリストに3項目追加
- **CI ゲート: `scripts/verify-json-ld.mjs`** — GitHub Actions のデプロイ前に走る。すべての `<script type="application/ld+json">` がパース可能か、すべてのページがサイト全体の `Organization`/`WebSite`/`Person` を出力しているか、404 ページが article 系スキーマを抱えていないかを検証

### 修正（Coherence cleanup）

- **`public/llms.txt`（8言語）** — 5コンポーネント/15点から 6コンポーネント/18点に更新。Coherence Signals・Two-Pass Review・Self-Audit ケーススタディ・Changelog のエントリを追加
- **`/ai/*.md`（8言語）** — 同じ5→6 コンポーネント更新。正規ホストの正規化（`www.propel-lab.co.jp` → `propel-lab.co.jp`）、Kindle 4→14 冊・Qiita 39,000+ → 80,000+ をプロファイルデータに揃える
- **`framework/coherence-signals`** — Structural Formatting との境界を冒頭で明文化
- **`framework/overview`** — Citation Signals チェックリストのスコープを「コンテンツページ」に限定（サイトルートとエラーページは対象外）
- **`case-studies/propel-lab-self-audit`** — 各 finding に対象サイトラベル（kaoriq / propel-lab / 両サイト）を付与
- **`scripts/bump-version.sh`** — SUMMARY を環境変数経由で安全に渡す。同じバージョンセクションや git タグの上書き禁止ガード追加。python heredoc を quoted に
- **`src/components/Head.astro`** — 多言語 fallback 検出: 英語 fallback を配信している非英語URL では JSON-LD `inLanguage` と OG `og:locale` を `en` に揃える。404 ページから `TechArticle` を除外

### なぜ今

3つのサイトを1セッションでレビューしたところ（mypcrig, legacydram, kenimoto.dev）、同じ2つの failure mode が浮上した — 言語とページをまたいだアイデンティティの分断と、`llms.txt` が手動運用で実コンテンツからドリフトしていく問題。両方とも、チェックリストに埋もれさせるのではなく明示的なフレームワーク指針として導入した。

v1.1.0 のリリースに対する codex 第2段レビューが、最大の皮肉を発見した: 整合性シグナルを定義したサイト本体が、`llms.txt` を「5コンポーネント / 15点」のまま放置していた。それを修正している。

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
