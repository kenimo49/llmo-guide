---
title: "LLMO Score v0.1 を自分のサイト6つに当てた話"
description: "公開したばかりの llmo-checker CLI を、Open LLMO Research Initiative の運営母体を含む 6 サイトに当てた。法人サイトのスコアは 29 / 100。"
pubDate: 2026-05-24
---

Open LLMO Research Initiative の **Public Experiment Log の第1回**。

公開直後の [`llmo-checker`](https://github.com/open-llmo/llmo-checker)（Lighthouse 型の AI 可視性スコア CLI、v0.1 Draft）を、最初に **私たち自身が運用している 6 サイト** に当てた。このイニシアティブを運営している法人の公式サイトも含まれている。

結果の見出し: **法人公式サイト `propel-lab.com` が 29 / 100 でワースト**。LLMO の参照実装を提供しているはずの法人サイトが、配下の消費者向けサイト 5 つすべてを下回った。

## 方法

- ツール: `npx llmo-checker <url>` v0.1.0 (commit `1db47ea`)
- 日付: 2026-05-24
- 対象: 私たちが運用している 6 プロパティ
- スコア: 5 つの静的チェックの重み付き平均 — `llms-txt`（重み 20）、`robots-ai`（15）、`canonical`（15）、`jsonld`（20）、`meta`（15）
- スコア帯: 85+ well-grounded（よく根づいている）/ 65–84 needs work（要改善）/ 40–64 poor（不良）/ 0–39 critical（致命的）

すべてのチェックは純粋な HTTP fetch と HTML パース。v0.1 では AI 引用のシミュレーションは行わない。スコアは AI クローラーが実際に見ることのできる **substrate（地盤）** だけを測る。

## 結果

| サイト | 役割 | スコア | 帯 | 一番弱いチェック |
|---|---|---|---|---|
| `llmoframework.com` | このイニシアティブ自身のサイト | **96** | well-grounded | `llms-txt` にリンクリストが無い（軽微） |
| `kenimoto.dev` | 著者個人サイト | **96** | well-grounded | 同上 |
| `legacydram.com` | ウィスキー×エンジニアメディア | **93** | well-grounded | JSON-LD 部分的（`Organization`/`Person` なし） |
| `mypcrig.com` | PC ビルドキュレーション | **90** | well-grounded | `hreflang` なし（単一言語サイトなので可）+ JSON-LD 部分的 |
| `kaoriq.com` | フレグランス EC | **90** | well-grounded | robots.txt に AI bot 個別ルールなし |
| **`propel-lab.com`** | **運営法人の公式サイト** | **29** | **critical** | ほぼ全部 |

`propel-lab.com` はこのイニシアティブそのものを運営している法人の公式サイト。出荷している消費者向けサイトすべてより低いスコアになった。

## 法人サイトはなぜ落ちたか

ルートを curl してみるとすべてが分かる:

```bash
$ curl -s https://propel-lab.com/
<!DOCTYPE html><html><head><script>window.onload=function(){window.location.href="/lander"}</script></head></html>
```

`propel-lab.com` のルートは **HTML 1 行**。`window.location.href` のリダイレクトがブラウザで走り、訪問者を `/lander` に飛ばす。

人間が Chrome で見るぶんには問題ない。しかし私たちの知る限りすべての AI クローラーは **fetch 時に JavaScript を実行しない**。GPTBot、ClaudeBot、CCBot、Google-Extended、PerplexityBot、Applebot-Extended、いずれも上の生 HTML を見て止まる。

つまり、AI システムが最初にプローブしてくるルート URL では、checker は次のような状態を検出した:

- `<title>` なし
- `<meta name="description">` なし
- OpenGraph なし
- `<h1>` 要素ゼロ
- `<html lang>` 属性なし
- JSON-LD なし
- `<link rel="canonical">` なし

次にリダイレクト先 `https://propel-lab.com/lander` 単独でも測ってみた。スコアは **31 / 100** — こちらも critical。中身はあるが canonical 不在、JSON-LD 不在、メタデータ弱。

つまり 2 段とも落ちている。

## ここから何が言えるか

「splash → landing」構造を法人サイトに置き、Google は JS を扱ってくれるはずだと仮定して、その先 non-JS クローラーから見たときどう見えるかを誰も確認しない。これは多くのチームに共通するパターン。Google 検索についてはおおむね正しかった仮定だが、**2026 年現在の AI クローラーについてはほぼ正しくない**。

私たちのケースでは、**LLMO に特化した法人の公式サイト** がまさにこの罠に落ちていた。ツールを作って自分自身に向けたから発見できた。ツールがなければ、人間向けの UX が綺麗に見えるので問題なしと思い続けていた。

これが OSS で checker を公開している意義そのもの。substrate のギャップは、測るまで見えない。

## 私たちが変えること

この実験の結果として、以下を公開バックログに追加する:

1. **`propel-lab.com/` をサーバーサイドリダイレクトに変更** — JS リダイレクトを 301 にする、もしくはランディングコンテンツをルートで直接レンダリングする
2. **`/lander` に canonical + JSON-LD `Organization` + OG metadata を追加** — 単体スコアを 31 から 85+ に
3. **checker を smoke step として自前 deploy pipeline に組み込む** — 将来の regression を自動で表面化する
4. **`mypcrig.com` と `kaoriq.com` の JSON-LD カバレッジを改善** — 両方とも `jsonld` チェックで 82 / 100、`Product` / `Person` / `Article` などの関連タイプを一部しか出していないため
5. **`kaoriq.com` の robots.txt に明示的な AI bot ポリシーを追加** — 現在中立、GPTBot / ClaudeBot / Google-Extended には opt-in を明示する方針に

これらが完了したら、再測定したスコア込みでフォローアップ Experiment Log を公開する。delta が出ようが出まいが honest に書く。

## 悪いスコアをなぜ公表するか

測定ツールを出荷すると、自然と「競合に向けて使う」誘惑が強くなる。私たちは意図的に逆をやっている。`llmo-checker` の最初の公開データセットは **私たち自身のプロパティ** で、最悪のスコアが出たものも含めて出す。

理由は 2 つ:

1. **スコアは反証可能でなければならない**。自分が運用しているもので失敗スコアを一度も公表しないなら、スコアリングが honest だと信じる理由が外側からは無い
2. **このイニシアティブの信用は framing ではなく artifact から来る**。法人公式サイトが 29 / 100 だと公表する研究組織のほうが、マニフェストを出して自己採点 100 / 100 を出す組織より信用される

## この実験の限界

- v0.1 は substrate しか測っていない。あるサイトが substrate で 95 を取っても、コンテンツ自体がつまらない・既知の事実と矛盾している・より権威のあるソースと内容が重複している、といった理由で AI 引用がゼロになる可能性はある。Citation Visibility は v0.2 のための予約席
- スコアの重み (`llms-txt` 20 / `robots-ai` 15 / `canonical` 15 / `jsonld` 20 / `meta` 15) は著者が設定した値であり、outcome データから導出したものではない。妥当なデフォルトであって、検証済みではない。Phase 2 で引用 outcome データを集めながら再キャリブレーション予定
- 今回はホームページのみを測った。各サイトの記事ページは別のスコアになる可能性がある

## 実験の再現方法

```bash
npx llmo-checker@0.1.0 https://llmoframework.com/
npx llmo-checker@0.1.0 https://kenimoto.dev/
npx llmo-checker@0.1.0 https://legacydram.com/
npx llmo-checker@0.1.0 https://mypcrig.com/
npx llmo-checker@0.1.0 https://kaoriq.com/
npx llmo-checker@0.1.0 https://propel-lab.com/
npx llmo-checker@0.1.0 https://propel-lab.com/lander
```

マシンリーダブル出力には `--json` を付ける。バージョンは `@0.1.0` で固定すること — JSON shape は v0.2 で変わる可能性がある。

## 次にやること

これは Public Experiment Log の第1回。次に走らせる予定のものは 2 つ:

- **外部ベースラインパネル** — ハイトラフィックの技術系サイト（ドキュメントポータル、開発ブログ、製品マーケティングサイト）を数十本スコアリングして、分布を公開。「普通」がどう見えるかをキャリブレーションする
- **引用相関パイロット** — 約 50 URL について、LLMO スコアと実際の AI 引用率（ChatGPT、Claude、Perplexity をプローブ）を比較する。スコアが主張する outcome を実際に予測できているかの初の本検証

全ロードマップは [Experimental Projects](/ja/experimental-projects/) を参照。v0.1 スコアの重み定義は [Score v0.1 Draft Specification](/ja/specifications/score-v01/) にある。
