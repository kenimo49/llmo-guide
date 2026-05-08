---
title: "6. 整合性シグナル"
description: "整合性シグナルは、AIが読むあらゆる面（HTML / JSON-LD / Markdown / llms.txt）で同じ事実が同じ物語を語ることを保証する。不整合は引用精度を落とし、信頼性を損なう。"
pubDate: 2026-05-08
---

## 概要

整合性シグナル（Coherence Signals）は、**AIエージェントが読み取るすべての面で同じ事実が同じ物語を語っているか**を測る。LLMO最適化されたモダンなサイトは、複数のチャネルで事実を露出している:

- HTML本文（人間とAIクローラの両方が見る）
- JSON-LD構造化データ
- llms.txt / llms-full.txt
- /ai/*.md や URL.md エンドポイント（例: `/company.md`）
- OG / Twitter メタタグ
- sitemap、robots.txt、hreflang 宣言

同じ事実（数値・住所・サービス一覧・公開日）が複数の面で異なって書かれていると、両方を参照したAIは混乱する。重みづけが大きい方の値を採用するか、古い数値を表に出すか、不整合を品質低下のシグナルと見なして引用そのものを避けることもある。

整合性シグナルとは、**全面で単一ソース・オブ・トゥルース（Single Source of Truth）を保証する**LLMOの規律である。

## なぜ重要か

引用精度は**証拠の収束**に依存する。AIが複数経路から取得した値が一致するとき、引用への信頼度は上がりユーザーに届く。値が一致しないとき、いくつかの失敗モードが現れる:

- **引用率の低下** — 内部証拠が一貫している競合ソースに譲る
- **誤った事実の引用** — 古い `/ai/founder.md` の値をAIが拾うと、トップページで更新された数値はユーザーに届かない
- **ハルシネーションの増幅** — 面ごとに矛盾があると、モデルはどちらにも一致しない「折衷値」を生成しやすくなる
- **権威性の低下** — 高度なAIリランカー（Perplexity、AI Overviews）はクロスリファレンスを比較する。自己矛盾は低品質シグナルとして読まれる

2024年に [Propel-Lab](https://propel-lab.co.jp/) で実施した自社監査では、同じ著者プロファイルが**4冊 / Qiita 39,000+ PV**（`/ai/founder.md`、`llms-full.txt`）と**14冊 / Qiita 80,000+ PV**（トップページのプロファイルコンポーネント）の両方を主張していた。AIクローラには数ヶ月の間、矛盾した自己説明が配信され続けていた。

## 実装方法

### 1. 各事実に対して単一のソースを指定する

すべての数値・事実主張について、**1つ**のファイルを正規ソースとする。他のすべての面は、そこから import または引用する。

| 事実 | 正規ソース | 参照先 |
|------|----------|--------|
| 著書数、PV統計 | `src/data/profile.ts` | プロファイルコンポーネント、`/ai/founder.md`、`llms-full.txt`、JSON-LD |
| サービスカタログ | `src/data/services.ts` | `/products/`、JSON-LD `Service[]`、`/ai/services.md`、`llms.txt` |
| 住所、設立日 | `src/data/company.ts` | フッター、`/company.md`、JSON-LD `Organization`、`llms-full.txt` |
| FAQ項目 | `src/lib/faq-schema.ts` | FAQコンポーネント、JSON-LD `FAQPage`、`/faq.md` |

パターンは、コンテンツコレクションまたは型付きデータモジュール → テンプレートと静的エンドポイント両方がそこから引く、という形である。

### 2. AI向けの面を HTML と同じソースから生成する

`llms.txt` や `/ai/*.md` を、その内容がすでに型付きデータに存在しているのに手書きで書いてはいけない:

```typescript
// src/pages/products.md.ts
import { services } from '../data/services';

export const GET: APIRoute = async () => {
  const markdown = services
    .map((s) => `## ${s.name}\n\n${s.summary}\n\n— 対象: ${s.target}`)
    .join('\n\n---\n\n');
  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
```

HTML、JSON-LD `Service[]`、`/products.md` のすべてが `services` から派生する。ドリフトが構造的に発生不可能になる。

### 3. URL の正規化を整合性問題として扱う

`https://www.example.com/` と `https://example.com/` は、文字列マッチするクローラから見れば別の文字列である。1つの正規ホストを選び、それを徹底する:

- すべてのページに `<link rel="canonical">`
- `og:url`、JSON-LD `url`、サイトマップエントリ — 同一ホスト
- `/ai/*.md`、`llms.txt` 内の参照 — 同一ホスト
- 内部リンク — 相対パスまたは正規絶対URLのみ。代替ホストは使わない

よくあるバグは、`www.` から apex（または逆）への移行で `/ai/*.md` ファイルを更新し忘れることだ。サイト本体は正規化されているが、Markdown面が静かに誤ったホストをAIに漏らし続ける。

### 4. 末尾スラッシュ方針を整合性問題として扱う

ホストが `/blog/post` → `/blog/post/` を301で正規化するなら、すべての内部リンクは最初からスラッシュ付きであるべきだ。混在は次の問題を生む:

- リダイレクトでクロール予算を浪費
- リダイレクト適用期間中の正規シグナル衝突
- スラッシュあり・なしが混ざった hreflang

フレームワーク層で方針を決め（Astroの `trailingSlash: 'always'` または `'never'`）、リポジトリを grep して違反箇所を一掃する。

### 5. クロスファイルチェックでドリフトを検出する

CIに、同じ数値・文字列主張が複数面で一致するかを grep で検査するステップを追加する:

```bash
# 古い著書数が残っていれば失敗
! grep -rn "4 books\|4冊\|Kindle著者: 4" public/ src/data/ src/content/
```

さらに踏み込むなら、インライン `<script>` 内のJSON-LDと別建ての `.jsonld` ファイルを両方パースして、共有 `@id` の値が一致しているかを検証するバリデータを書く。

### 6. 同じ `@id` に対する重複JSON-LDエンティティを避ける

最もよくある silent failure: レイアウトが住所Aの `Organization` を出力し、ページ別スニペットが住所Bの `Organization` を追加で出す。両方がHTMLに残る。クローラは両方をパースする。ページの信頼スコアが下がる。

修正方法: 各エンティティにフレームワーク層で `@id` を割り当て（`https://example.com/#org`、`#founder`、`#website`）、他の場所からは `@id` 参照のみにする。重複はコードレビューで明白になる。

## 例

**❌ 面ごとのドリフト:**

```markdown
# /ai/founder.md
- Publishing: Kindle author of 4 books
- Technical Writing: 39,000+ PV on Qiita
```

```astro
<!-- src/components/Profile.astro (トップページに描画される) -->
<p>Kindle 14冊・Qiita 80,000+ PV。</p>
```

```jsonld
// JSON-LD on /
{ "@type": "Person", "name": "Ken Imoto" /* 数値なし */ }
```

3つの面、3つの異なる物語。`/ai/founder.md` を引用するAIは古い数値を返す。HTMLを引用するAIは現在の数値を返す。JSON-LDは矛盾解決の助けにならない。

**✅ 単一ソース:**

```typescript
// src/data/profile.ts — 正規
export const profile = {
  highlights: [
    'Kindle著者: 14冊',
    'Qiita: 80,000+ PV',
  ],
};
```

```astro
<!-- プロファイルコンポーネント -->
{profile.highlights.map(h => <li>{h}</li>)}
```

```typescript
// src/pages/founder.md.ts
return new Response(
  `# Founder\n\n${profile.highlights.map(h => `- ${h}`).join('\n')}`,
  { headers: { 'Content-Type': 'text/markdown' } }
);
```

1つの値が1つの場所に存在する。HTML、AI向けMarkdownエンドポイント、JSON-LDが連動して進化する。

## チェックリスト

- [ ] すべての事実主張（数値、住所、日付、カタログ）に対して、正規ソースファイルが1つ指定されている
- [ ] AI専用の面（`llms.txt`、`/ai/*.md`、URL.mdエンドポイント）は、HTMLと同じデータから生成されている。並行して手書きで保守されていない
- [ ] 正規ホストが `<link rel="canonical">`、`og:url`、JSON-LD、サイトマップ、Markdown面で一貫している
- [ ] 末尾スラッシュ方針がフレームワーク層で設定され、すべての内部リンクに反映されている
- [ ] 同じエンティティを異なる値で記述する2つのJSON-LDブロックが存在しない。エンティティはページ間参照に安定した `@id` を使う
- [ ] 主要な指標（著書数、PV統計、サービスリスト）について、CIがクロスファイルのドリフトをチェックしている
- [ ] 定期的な二段監査（自己レビュー → セカンドオピニオンAIレビュー）が、リリース間のドリフトを捕捉する — [LLMO監査: 二段レビュー](/ja/guide/llmo-audit-two-pass-review/) を参照
