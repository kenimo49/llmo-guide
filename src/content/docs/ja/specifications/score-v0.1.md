---
title: "LLMOFramework Score v0.1 — Draft Specification"
description: "LLMOFramework Score v0.1 Draft の正式定義。5つの substrate チェック、重み、スコアリングルール、JSON 出力スキーマ。リファレンス実装: llmo-checker。"
pubDate: 2026-05-24
---

> **Status: Draft.** v0.1、最初の公開版。重み、チェック一覧、JSON 出力 shape は v0.2 で後方互換なしに変わる可能性がある。JSON shape に依存するなら checker のバージョンを固定すること。

LLMOFramework Score は、URL の AI 可視性を 1 つの数値（0–100）に要約したもの。v0.1 は **substrate シグナルだけ** を測る。1 回の HTTP fetch で AI クローラーが取得できる静的シグナル、JavaScript を実行せず、LLM を呼ばず、retrieval をシミュレートしない範囲。

リファレンス実装は OSS CLI [`llmo-checker`](https://github.com/open-llmo/llmo-checker)。Open LLMO Research Initiative がメンテナンスする。

## 設計原則

1. **Behavior より前に substrate**。v0.1 は単一 HTTP fetch から取れるシグナルだけを測る。behavioral シグナル（引用、retrieval stability、LLM の読解）は v0.2 以降に先送り
2. **再現可能であること**。各チェックは fetch した HTML / robots.txt / llms.txt の純関数。それ以上のネットワーク呼び出しなし、AI 呼び出しなし、時刻依存なし
3. **反証可能なスコアリング**。各チェックはスコアリングルールを公開する。ルールに同意しないなら、checker と spec を並べて、どこが食い違うかを示せる
4. **Honest な重み**。v0.1 の重みは著者が設定したデフォルトであり、outcome データから導出したものではない。v0.2 では [引用相関パイロット](/ja/experiments/dogfooding-our-own-sites/) を使って再キャリブレーションする

## スコア構成

スコアは 5 つのチェックの重み付き平均:

| ID | 重み | 測るもの |
|---|---|---|
| `llms-txt` | 20 | `/llms.txt` の存在と構造 |
| `robots-ai` | 15 | `/robots.txt` における既知 AI クローラーへの明示的な posture |
| `canonical` | 15 | `<link rel="canonical">` の妥当性と `hreflang` alternate |
| `jsonld` | 20 | JSON-LD 構造化データの存在、parse 可能性、認識される `@type` |
| `meta` | 15 | `<title>`、`<meta name="description">`、OpenGraph、`<h1>`、`<html lang>` |

v0.1 の総重み: **85**。スコアは重み付き平均で 0–100 に正規化する。

### スコア帯

| 帯 | スコア | 解釈 |
|---|---|---|
| 緑 | 85–100 | AI retrieval に対してよく根づいている |
| 黄 | 65–84 | 要改善 — いくつかのシグナルが欠落 or 弱い |
| 黄 | 40–64 | 不良 — substrate に大きな穴 |
| 赤 | 0–39 | 致命的 — AI クローラーからほぼ見えない |

## 個別チェック仕様

### `llms-txt`（重み 20）

**取得対象:** `GET {origin}/llms.txt`

**スコアリング:**

| 条件 | スコア影響 |
|---|---|
| HTTP 404 または 5xx | 0 |
| Body が空 | 10 |
| Body が空でない（base） | 60 |
| トップレベルの `# Title` 行あり | +15 |
| `## Section` 見出しが最低 1 つ | +10 |
| `^- \[` にマッチするリンクエントリ 3 個以上 | +15 |
| リンクエントリ 1–2 個 | +8 |
| リンクエントリ 0 個 | +5 |

**Status:** 85 以上 `pass`、60 以上 `warn`、それ以下 `fail`。

参照 spec: [llmstxt.org](https://llmstxt.org/)。

### `robots-ai`（重み 15）

**取得対象:** `GET {origin}/robots.txt`

**認識する AI user-agent（v0.1）:** `GPTBot`、`ChatGPT-User`、`OAI-SearchBot`、`ClaudeBot`、`Claude-Web`、`anthropic-ai`、`CCBot`、`Google-Extended`、`PerplexityBot`、`Applebot-Extended`、`cohere-ai`。

**スコアリング:**

| 条件 | スコア影響 |
|---|---|
| HTTP 404 | 60（warn — 明示的な posture 推奨） |
| HTTP 5xx | 0 |
| Body が parse 可能（base） | 70 |
| 認識される AI bot を 3 個以上明示 | +20 |
| 認識される AI bot を 1–2 個明示 | +10 |
| ワイルドカード `User-agent: *` グループ あり | +10 |

**Status:** 85 以上 `pass`、60 以上 `warn`、それ以下 `fail`。スコアは 100 でクランプ。

ルールが `Allow` か `Disallow` かは判定に影響しない（言及自体がカウントされる）。v0.1 では `disallowedBots` を JSON 出力に記録するが、Disallow を減点しない。AI クローラーを opt-out するのも valid な posture とする。

### `canonical`（重み 15）

**ソース:** fetch した HTML。

**スコアリング:**

| 条件 | スコア影響 |
|---|---|
| `<link rel="canonical">` なし | 0（fail） |
| `href` が valid な URL でない | 20（fail） |
| canonical が異なる origin を指す | 60（warn） |
| canonical が同一 origin を指す（base） | 90（pass） |
| `<link rel="alternate" hreflang>` あり | +10 |

**Status:** canonical あり + 同一 origin で `pass`、cross-origin で `warn`、それ以外 `fail`。スコアは 100 でクランプ。

Cross-origin canonical は republished mirror として意図されることもあるが、デフォルトでは減点する。設定ミスのほうが多いため。

### `jsonld`（重み 20）

**ソース:** fetch した HTML 内のすべての `<script type="application/ld+json">` ブロック。

**認識する schema.org エンティティタイプ（v0.1）:** `Organization`、`Person`、`Article`、`BlogPosting`、`TechArticle`、`Book`、`WebSite`、`WebPage`、`BreadcrumbList`、`FAQPage`、`HowTo`、`Product`、`SoftwareApplication`。

**スコアリング:**

| 条件 | スコア影響 |
|---|---|
| JSON-LD ブロックなし | 0（fail） |
| parse 可能なブロックが最低 1 つ（base） | 50 |
| 認識される `@type` あたり（3 個まで） | +12 |
| `Organization` または `Person` あり | +8 |
| いずれかのブロックが parse 失敗 | −20 |

`@graph` 配列は再帰的に走査して type を集める。

**Status:** 85 以上 `pass`、50 以上 `warn`、それ以下 `fail`。スコアは 0–100 でクランプ。

### `meta`（重み 15）

**ソース:** fetch した HTML の `<head>` および body 先頭。

**スコアリング:**

| シグナル | スコア影響 |
|---|---|
| `<title>` 長さ 20–70 | +20 |
| `<title>` あり、ただし 20–70 外 | +10 |
| `<meta name="description">` 長さ 80–200 | +20 |
| description あり、ただし 80–200 外 | +10 |
| OpenGraph `title` + `description` 両方あり | +20 |
| OpenGraph `type` あり | +10 |
| `<h1>` がちょうど 1 個 | +20 |
| `<html lang>` 属性あり | +10 |

**Status:** 85 以上 `pass`、60 以上 `warn`、それ以下 `fail`。スコアは 100 でクランプ。

## JSON 出力スキーマ

CLI の `--json` 出力およびプログラマブル API の戻り値:

```typescript
interface CheckerReport {
  url: string;              // 解決後の入力 URL
  origin: string;           // ページの URL.origin
  timestamp: string;        // ISO 8601
  checkerVersion: string;   // CLI の semver
  scoreVersion: "0.1";      // この仕様のバージョン
  score: number;            // 重み付き平均、0-100
  checks: CheckResult[];
}

interface CheckResult {
  id: string;               // 安定したチェック識別子（例: "llms-txt"）
  name: string;             // 人間向け表示名
  status: "pass" | "warn" | "fail" | "skip";
  score: number;            // 0-100
  weight: number;           // 全体スコアへの寄与
  details: Record<string, unknown>;  // チェック固有データ
  notes: string[];          // 人間向けの対処可能な notes
}
```

**v0.1 における安定性保証:**

- トップレベルフィールド名（`url` / `origin` / `timestamp` / `checkerVersion` / `scoreVersion` / `score` / `checks`）は 0.1.x 全リリースで安定
- 各チェックの `id` / `weight` / 全体 `status` と `score` の shape は安定
- `details` の shape は 0.1.x の中で **非安定**。patch リリースで新フィールドが追加される可能性あり
- `checks` 内の `id` セットは 0.1.x で安定（新チェックは v0.2 リリースなしには追加しない）

## Exit code（CLI）

| Code | 意味 |
|---|---|
| 0 | スコア 50 以上（最低ラインを通過） |
| 1 | スコア 50 未満（最低ライン以下） |
| 2 | Fetch エラー（network、DNS、非 2xx レスポンス） |

これにより CLI を CI の smoke check として使える — 落ちたサイトが pipeline を落とす。

## リファレンス実装

ソース: [`open-llmo/llmo-checker`](https://github.com/open-llmo/llmo-checker)

```bash
npx llmo-checker https://example.com
npx llmo-checker https://example.com --json
```

Node.js 20+ が必要。

リファレンス実装とこの spec が食い違う場合、spec が intent として正しく、実装を修正する。[Issue を出してほしい](https://github.com/open-llmo/llmo-checker/issues)。

## v0.1 で意図的に測らないもの

LLMO として妥当な懸念だが v0.1 に含めていないものと、その理由:

| 指標 | 先送りした理由 |
|---|---|
| Citation Visibility | AI アシスタントへのプロービングが必要。純粋な静的チェックの範囲外。v0.2 で optional な opt-in チェックとして予定 |
| Chunk Readability | chunking 戦略の選択が必要。v0.2 ではドキュメント化されたデフォルト chunker を使って再現性を確保 |
| Markdown Quality | Markdown ソースを公開している場合のみ適用。v0.2 で `/index.md` 形式の endpoint を検出する予定 |
| Content quality / accuracy | スコープ外。スコアは substrate を測るもので、編集品質ではない |
| Retrieval stability over time | 経時プロービングが必要。Benchmark プロジェクトの担当範囲、per-URL Score の担当ではない |

## バージョニングポリシー

スコアバージョンはリファレンス実装のバージョンと独立。Score v0.1 は `llmo-checker@0.1.x`（patch 任意）で実装される。Score v0.2 には `llmo-checker@0.2.x` が必要。

Draft フェーズの間は、minor バージョン間（0.1 → 0.2）の破壊的変更を想定している。1.0 仕様の公開は Phase 2（Community）終了後 — つまり引用相関パイロットの outcome データを得て、外部実装が存在して、重みを再キャリブレーションした後になる。

## コントリビュート

Spec の変更は [llmo-guide repo](https://github.com/kenimo49/llmo-guide/issues)（このサイトのソース）の issue で受ける。

新チェック or 重み変更を提案するとき:

1. シグナル名と何を測るかを 1 文で
2. スコアリングルール（v0.2 以降でなければ 1 回の HTTP fetch から deterministic に求まること）
3. 重みの根拠（論文、公開実験、または Lighthouse 流の議論）
4. 再現器（提案ルール下で高スコアになる URL と低スコアになる URL）

実装の変更は [`open-llmo/llmo-checker`](https://github.com/open-llmo/llmo-checker) 側で受ける。

## 謝辞

スコア構造は [Lighthouse](https://developer.chrome.com/docs/lighthouse/)（Google）と [llms.txt proposal](https://llmstxt.org/)（Jeremy Howard）から強く影響を受けている。両方とも well-designed で opinionated で反証可能 — 私たちが保ちたいと思っている性質。
