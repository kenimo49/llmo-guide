---
title: "LLMO Score v0.1 を自分のサイト6つに当てた話"
description: "公開直前の llmo-checker CLI を運用中の 6 サイトに当てた。全部 90 以上だった。それより興味深いのは、公開を直前で取り消した別の方の結果のほう。"
pubDate: 2026-05-24
---

Open LLMO Research Initiative の **Public Experiment Log の第1回**。

公開直後の [`llmo-checker`](https://github.com/open-llmo/llmo-checker)（Lighthouse 型の AI 可視性スコア CLI、v0.1 Draft）を、最初に **私たち自身が運用している 6 サイト** に当てた。

訂正後の結果見出し: **私たち所有の 6 プロパティはすべて 90 以上**。ただし、この実験から得られたより useful な artifact は、その **訂正の経緯** のほう。以下に詳しく書く。

## 方法

- ツール: `npx llmo-checker <url>` v0.1.0
- 日付: 2026-05-24
- 対象: 私たちが運用している 6 プロパティ
- スコア: 5 つの静的チェックの重み付き平均 — `llms-txt`（重み 20）、`robots-ai`（15）、`canonical`（15）、`jsonld`（20）、`meta`（15）
- スコア帯: 85+ well-grounded（よく根づいている）/ 65–84 needs work（要改善）/ 40–64 poor（不良）/ 0–39 critical（致命的）

すべてのチェックは純粋な HTTP fetch と HTML パース。v0.1 では AI 引用のシミュレーションは行わない。スコアは AI クローラーが実際に見ることのできる **substrate（地盤）** だけを測る。

## 結果

| サイト | 役割 | スコア | 帯 | 一番弱いチェック |
|---|---|---|---|---|
| `llmoframework.com` | このイニシアティブのサイト | **96** | well-grounded | `llms-txt` にリンクリストなし（軽微） |
| `kenimoto.dev` | 著者個人サイト | **96** | well-grounded | 同上 |
| `propel-lab.co.jp` | 運営法人の公式サイト | **94** | well-grounded | `<meta name="description">` が 47 文字（推奨 80–200） |
| `legacydram.com` | ウィスキー×エンジニアメディア | **93** | well-grounded | JSON-LD 部分的（`Organization`/`Person` なし） |
| `mypcrig.com` | PC ビルドキュレーション | **90** | well-grounded | `hreflang` なし（単一言語サイトなので可）+ JSON-LD 部分的 |
| `kaoriq.com` | フレグランス EC | **90** | well-grounded | robots.txt に AI bot 個別ルールなし |

中央値 93、最低 90。well-grounded 帯を下回ったサイトはない。

これは、私たちが直前まで書こうとしていたテーブルよりずっとドラマ性に欠ける表だ。

## この実験は、もう少しで別の話になりかけた

この記事の初稿には、別の見出しがついていた: **「自分たちの法人公式サイトが 29 / 100、テスト中ワースト」**。新しい測定プロジェクトに信用を与えるタイプの、いかにも刺さる自社批判記事だった。

そのストーリーはこうだった。`propel-lab.com` を測ったら 29 / 100、critical 帯。ルートを curl したら HTML 1 行が返ってきた:

```bash
$ curl -s https://propel-lab.com/
<!DOCTYPE html><html><head><script>window.onload=function(){window.location.href="/lander"}</script></head></html>
```

`window.location.href` で `/lander` にリダイレクトするだけ。私たちの知る限りすべての AI クローラーから不可視。さらに `/lander` 単体を測ったら **31 / 100**、こちらも critical。2 層とも失敗。完璧なモラルストーリーがあった: LLMO に特化した法人の `.com` が、自分たちが説いている substrate テストに落ちている。

公開直前まで進んでいた。

## 何が止めたか

公開前に、その遷移先 HTML をもう一度 curl し直したら、3 つのサインが目に飛び込んできた:

```html
<script>window.LANDER_SYSTEM="PW"</script>
<script src="https://www.google.com/adsense/domains/caf.js"></script>
<script src="https://img1.wsimg.com/parking-lander/static/js/main.be9a3b28.js"></script>
```

これは **ドメインパーキングページ** のフィンガープリント。`wsimg.com/parking-lander` はサードパーティのパーキングテンプレート、Google AdSense for Domains と一緒に配信されている。これはパーキング業者が動いている、法人サイトではない。

`propel-lab.com` は私たちの所有物ではない。一度も所有したことがない。法人公式サイトは `propel-lab.co.jp` で、スコアは **94 / 100** — well-grounded、表で 3 番目。

私たちのモラルストーリーは、他人がパークしているドメインの話だった。

## なぜこの経緯をログに残すか

公開直前にこういうニアミスを捕まえた後の自然な誘惑は、ドラフトをこっそり直して、近接事故の記録なしに無難で正しい版を出すこと。私たちはそれをしない。理由は 3 つ:

1. **ニアミスを隠す LLMO イニシアティブは、悪いスコアを隠すイニシアティブと同じ**。 falsifiability を掲げる以上、falsification の痕跡を残さなければ整合しない
2. **パーキングドメインのパターンはそれ自体が valid な substrate failure case**。ブランディングのために `.com` を取って、そこに実サイトを置かない人はみんな `propel-lab.com` 形状の substrate を AI クローラーに出している。誰のドメインだったかと無関係に、この insight は同じ
3. **dogfooding の結果は 90+ のみのデータセット**。それは、私たちが望んだ証明としては too clean。自分の作品を測って最低が 90 だったとき分かるのは「自分は自分の基準どおりに作っている」だけで、「その基準が何かを予測する」ことではない

本質的な問い — 「LLMO Score は実際の AI 引用挙動を予測するか?」— は、全部 pass した 6 サイト self-audit では答えられない。external baseline panel と citation-correlation pilot が必要。それが次の 2 つの Experiment Log。

## それでも私たち自身のサイトで直すこと

パーキングドメインの話を抜きにしても、表には小さな修正候補がある:

1. **`propel-lab.co.jp` の description** — 現在 47 文字、推奨 80–200。 portfolio 内の他法人サイトと同じ長さに拡張
2. **`mypcrig.com` と `kaoriq.com` の JSON-LD カバレッジ改善** — 両方 `jsonld` で 82 / 100、関連タイプ（`Product`, `Person`, `Article`）の一部しか出していない
3. **`kaoriq.com` の robots.txt に AI bot ポリシー明示** — 現在中立、GPTBot / ClaudeBot / Google-Extended に明示的 opt-in
4. **`llmoframework.com` と `kenimoto.dev` の `/llms.txt` にリンクリスト追加** — 現状は prose だがリンクセクションがない。両方とも `llms-txt` の重みを少しずつ落としている

これらが完了したら、再測定したスコア込みでフォローアップ Experiment Log を公開する。delta が出ようが出まいが honest に書く。

## 予想外に学んだこと

一番くっきりした教訓は substrate の話ではない。narrative discipline の話だ。

`propel-lab.com` のスコアが 29 で返ってきた瞬間、最初に動いたのは「数字の周りに物語を組み立てる」こと。物語は tight で、contrarian で、よくシェアされるタイプの post になっただろう。その数字こそが物語を成立させる装置だった。

`propel-lab.com` を私たちが所有しているという事実は、確認なしに前提されていた。良い narrative がある時ほど、こういう前提は補強される — そのギャップを認めると post 全体が崩れるから。私たちはたまたまそれを捕まえた。前提を疑うためではなく、別の発見を探して HTML の別パートをもう一度 curl したことから。

価値提案が **「AI substrate が何に見えるかを仮定する前に測れ」** であるプロジェクトが、**「自分のドメイン所有を測る前に何かを仮定して」** ほぼ記事を出してしまったというのは、正しい意味で恥ずかしい。

## この実験の限界

- v0.1 は substrate しか測っていない。あるサイトが substrate で 95 を取っても、コンテンツ自体がつまらない・既知の事実と矛盾している・より権威のあるソースと内容が重複している、といった理由で AI 引用がゼロになる可能性はある。Citation Visibility は v0.2 のための予約席
- スコアの重み (`llms-txt` 20 / `robots-ai` 15 / `canonical` 15 / `jsonld` 20 / `meta` 15) は著者が設定した値であり、outcome データから導出したものではない。妥当なデフォルトであって、検証済みではない。Phase 2 で引用 outcome データを集めながら再キャリブレーション予定
- 今回はホームページのみを測った。各サイトの記事ページは別のスコアになる可能性がある
- データセットは私たちが自分の基準で作った 6 サイト。基準が一般化するかどうかについては何も言っていない

## 実験の再現方法

```bash
npx llmo-checker@0.1.0 https://llmoframework.com/
npx llmo-checker@0.1.0 https://kenimoto.dev/
npx llmo-checker@0.1.0 https://propel-lab.co.jp/
npx llmo-checker@0.1.0 https://legacydram.com/
npx llmo-checker@0.1.0 https://mypcrig.com/
npx llmo-checker@0.1.0 https://kaoriq.com/
```

マシンリーダブル出力には `--json` を付ける。バージョンは `@0.1.0` で固定すること — JSON shape は v0.2 で変わる可能性がある。

パーキングドメインの検出を再現するには、追加で:

```bash
npx llmo-checker@0.1.0 https://propel-lab.com/
npx llmo-checker@0.1.0 https://propel-lab.com/lander
curl -s https://propel-lab.com/lander | head -1
```

最初の 2 つは critical を返す。3 つ目は HTML 内に `LANDER_SYSTEM` / `parking-lander` / `adsense/domains` のマーカーが表面化する。

## 次にやること

これは Public Experiment Log の第1回。次に走らせる予定のものは 2 つ:

- **外部ベースラインパネル** — ハイトラフィックの技術系サイト（ドキュメントポータル、開発ブログ、製品マーケティングサイト）を数十本スコアリングして、分布を公開。「普通」がどう見えるかをキャリブレーションする — 今回の self-audit だけでは出せなかった比較
- **引用相関パイロット** — 約 50 URL について、LLMO スコアと実際の AI 引用率（ChatGPT、Claude、Perplexity をプローブ）を比較する。スコアが主張する outcome を実際に予測できているかの初の本検証

全ロードマップは [Experimental Projects](/ja/experimental-projects/) を参照。v0.1 スコアの重み定義は [Score v0.1 Draft Specification](/ja/specifications/score-v01/) にある。
