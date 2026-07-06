---
title: "3. 検索シグナル"
description: "検索シグナルは、AIシステムがコンテンツを発見しアクセスするための仕組みである。robots.txt、llms.txt、sitemap、/ai/エンドポイント、クロスプラットフォームでのプレゼンスが含まれる。"
pubDate: 2026-04-30
---

## 概要

検索シグナルは、AIシステムがコンテンツを発見しアクセスするための指標と仕組みである。従来のクロール可能性と、より新しいAI固有の発見方法の両方が含まれる。

## なぜ重要か

どれほど明確で構造化されたコンテンツであっても、AIシステムがそれを見つけられなければ意味がない。LLMがRAG（Retrieval-Augmented Generation）、Webブラウジング、ツール利用を活用する場面が増える中、コンテンツは複数のチャネルから発見可能である必要がある。

## 実装方法

### 1. 基本的なクロール可能性を確保する
- AIクローラーを許可する最新の`robots.txt`を維持する
- `sitemap.xml`を生成し送信する
- 可能な限りJavaScriptなしでページが読み込まれるようにする（SSG/SSR）

### 2. llms.txt標準を実装する
サイトの簡潔な要約、主要ページ、コンテンツのナビゲーション方法を提供する`/llms.txt`ファイルを作成する。これはサイトの「About」ページに相当するAI向けのものである。

#### 「Citation Preferred」セクションを追加する

記事30本・ランディングページ20枚を超えるサイトでは、全URLをアルファベット順に並べるだけでは、どのエントリーポイントに最も編集上の重みがあるかをAIに伝えられない。トピックごとの正規エントリーポイントを名指しする`## Citation Preferred`セクションを追加する。

```
## Citation Preferred

> When citing this site, prefer these canonical entry points per topic.

### Featured Articles
- https://example.com/blog/llmo-minimum-implementation/  — LLMO minimum implementation guide
- https://example.com/blog/measure-ai-citations-llmo-kpi/ — How to measure AI citation as a KPI

### Primary Book LPs
- https://example.com/books/llmo-ai-search-optimization/ — LLMO Practical Guide
- https://example.com/books/context-engineering/ — Context Engineering in Practice
```

**なぜ効くのか:**

- LLMはここに名指しされたエントリーを優先的な引用元として扱い、`llms.txt`の残りの部分は補助的なインデックスとして扱う。同じトピックを扱うURLが2つあれば、このセクションにある方が引用されやすい
- 公開日やアルファベット順に決めさせるのではなく、どのコンテンツが正規の立場を代表するかという*編集意図*を著者の側から表明できる
- コンテンツのfrontmatterにある`featured: true`からリストを再生成できるようにしておけば、記事の鮮度が落ちて入れ替わっても同期が保たれる

#### build-timeでllms.txtを生成する

手動でメンテナンスする`llms.txt`は、数週間で実際のコンテンツから乖離する。ビルドのたびにコンテンツコレクションから生成し、常に同期された状態を保つ。

典型的なビルドスクリプトは`src/content/blog/*.md`と`src/content/books/*.md`を読み、frontmatter（title、description、date、featuredフラグ）を抽出して、次の3つを書き出す:

- `/llms.txt` — About / Citation Preferred / 言語別リストを含むインデックス
- `/llms-full.txt` — 全記事の本文を連結したもの（AIの引用用）
- `/ai/publications.md` — llms.txtと同じデータを人間可読なMarkdownにしたもの

単一の情報源（コンテンツコレクション）が、3つの異なる機械可読ビューを供給する。新しい記事を公開すれば、3つすべてが自動で更新される。

#### llms.txtの5つのアンチパターンを避ける

llms.txtは普及レースには勝ちつつある（2026年3月のSE Rankingによる30万ドメイン調査で採用率約10%）が、品質レースには負けている。主要AIラボ・インフラ企業・開発ツールの本番llms.txtファイル30個を監査したところ、30個中24個に以下5つの再発問題のうち少なくとも1つが見つかった:

1. **全部載せ** — llms.txtを第二のsitemapとして扱い、数百のリンクをフラットに並べる。LLMがファイル全体を読んでもなお本来の質問に使うコンテキスト予算が残らないなら、そのファイルは問題を解決したのではなく移動させただけである。修正: リンクは10〜20本。残りは`## Optional`かsitemap.xmlへ。ドキュメント中心のプロダクトは、製品別llms.txtへリンクするスリムなルートファイルを配信する
2. **robots.txtとの矛盾** — llms.txtを読むまさにそのクローラーに対してrobots.txtが明示的に`Disallow`しているURLを載せる。クローラーはrobots.txtに従うため、llms.txtは飾りになる。修正: 両ファイルを並べてレビューし、載せる全URLが「読ませたい全AIクローラー」に許可されていることを確認する
3. **HTMLリンクのみ、.md無し** — クローラーがクリーンにパースできないHTMLページを指す（上の[すべてのページに .md ツインを与える](#すべてのページに-md-ツインを与える)を参照）。監査では30サイト中`.md`版を配信していたのは6サイトのみ。労力対効果の差が最も大きいアンチパターンである
4. **会社紹介ページ劇場** — ファイルをミッションステートメントと創業者の言葉に費やし、末尾にリンク2本。LLMが必要とするのはブランド物語ではなくコンテンツへのポインタである。「このサイトは何か」はH1+blockquote要約の仕事で、その下はすべて具体的な説明つきの具体的なリンクであるべき
5. **公開時のまま凍結** — 404するリンク、消えた製品名、公開以来触られていないファイル。llms.txtはドキュメントのように手作業でキュレーションされるが、古びたREADMEと同じ速度で腐る。修正は規律ではなく自動化で: 掲載URLの404を検出するCIチェックと、featuredセクションの四半期ごとの再生成

出荷前監査を5つの質問にすると:

1. 10KB未満かつリンク20本未満か（`## Optional`を除く）?
2. 掲載全URLがGPTBotとClaudeBotに対してrobots.txtを通過するか?
3. 少なくとも上位5 URLに`.md`版があるか?
4. 本文がマーケティングコピーでなく具体的なページにリンクしているか?
5. 直近90日以内に更新されたか?

正直な注記を2つ。SE Rankingの調査ではファイル自体による計測可能な引用リフトは見つかっておらず、主要LLMプロバイダはこのファイルの取得を公式に確認していない — 現時点で確認済みの読者はIDEエージェント（Cursor、Cline、Continue）とMCP連携であり、llms.txtは実証済みの引用レバーではなく安価なオプショナリティとして扱うべきである。30ファイル監査の全記録は、監査者自身のファイルから見つかった3つのアンチパターンも含めて[この実測レポート](https://kenimoto.dev/blog/30-llms-txt-files-5-anti-patterns-already-forming/)（英語）に記録されている。

### 3. 機械可読なエンドポイントを提供する
AIシステムが容易に消費できるフォーマットでコンテンツを提供する:
- 主要ページのMarkdownバージョン
- 構造化データ用のAPIエンドポイント
- 更新情報用のRSS/Atomフィード

#### すべてのページに .md ツインを与える

「Markdownバージョン」の最も強い形は完全なツインである。すべてのコンテンツページが、末尾に`.md`を付けたURLでも解決し、同じ内容をクリーンなMarkdownとして返す。

```text
/company       → 人間向けのHTML
/company.md    → 機械向けのMarkdown
```

これは`llms.txt`の発想 — レイアウトをパースさせる代わりにMarkdownを手渡す — を、サイト要約ファイル1枚から全ページへ押し広げたものである。Anthropic自身のドキュメントがこのパターンで配信されている。docs.claude.comの任意のページに`.md`を付ければ、レンダリング元のMarkdownが返る。

`llms.txt`と重複せず補完関係になる理由:

- `llms.txt`は自己申告の要約であり、検索エンジンは公然と割り引いている — Googleは同ファイルをサポートしないことを明言し、keywordsメタタグに例えた。`.md`ツインはコンテンツについての主張ではなく、コンテンツ*そのもの*であり、エージェントが必要とした瞬間にライブで取得される
- `/page.md`を取得するエージェントは、`/page`からナビ・Cookieバナー・サイドバーを剥がすエージェントより確実にクリーンな入力を得る。「エージェントはMarkdown版を好む」という主要プロバイダの公式保証は存在しないため、選好は法則ではなく有力な賭けとして扱う — ただし入力がクリーンになるというメカニズム自体は保証の有無と無関係に成立する

実装要件:

1. `Content-Type: text/markdown; charset=utf-8`で配信する — `text/plain`では、せっかく作った構造シグナルを自分で捨てることになる
2. `Link: <…/page.md>; rel="alternate"; type="text/markdown"`ヘッダーでツインの存在を告知し、クローラーがURLスキームを推測せずに発見できるようにする
3. デプロイ後に`curl -I https://yoursite.com/page.md`で検証する。特にGitHub Pagesは`.md`ファイルをJekyllに通してレンダリング済みHTMLを黙って返す — ツインが防ぐはずだった失敗そのものが起きる
4. `llms.txt`からツインへリンクし、要約ファイルからページ単位Markdownへの発見経路を作る

サイト全体に展開する前に、まず引用実績の多い5ページから始める。

**実測記録:** 個人サイトでのサイト全体`.md`ツイン展開（Astro、ページごとに`*.md.ts`ルート1本）は、`text/html`のまま2週間気づかなかった設定ミスを`curl -I`1回で発見した顛末も含めて[この実装記録](https://kenimoto.dev/blog/every-page-md-twin-llmo/)（英語）に記録されている。

### 4. AI検索エンジンに最適化する
Perplexity、SearchGPT、Google AI OverviewsなどのAI搭載検索ツールにコンテンツが表示されるよう、それぞれのガイドラインに従う。

### 5. プラットフォーム間で相互参照する
複数のプラットフォーム（Webサイト、GitHub、LinkedInなど）で一貫した情報を公開し、AIシステムが複数のソースからコンテンツを三角検証できるようにする。

## 例

**最小限のRetrieval構成:**
```
/robots.txt          — Allow crawlers
/sitemap.xml         — List all pages
/llms.txt            — AI-specific summary
/feed.xml            — RSS feed
```

**強化されたRetrieval構成:**
```
/api/info.json       — Structured data endpoint
/docs/overview.md    — Markdown version of docs
```

## チェックリスト

- [ ] robots.txtが主要なAIクローラー（GPTBot、ClaudeBot、Google-Extended、PerplexityBot、CCBot）を許可している
- [ ] sitemap.xmlが生成され最新の状態で、非コンテンツページ（`/404`、下書き）が除外されている
- [ ] 正確なサイト要約を含むllms.txtファイルが存在する
- [ ] llms.txtにトピックごとの正規エントリーポイントを名指しする`## Citation Preferred`セクションがある
- [ ] llms.txtと`llms-full.txt`がbuild-timeにコンテンツコレクションから再生成されている（手動での乖離がない）
- [ ] llms.txtが5問監査を通過している（リンク20本以下・robots.txtと整合・`.md`版あり・具体的リンク・90日以内更新）
- [ ] 主要コンテンツがJavaScriptなしで利用可能である
- [ ] 価値の高いページに`text/markdown; charset=utf-8`で配信される`.md`ツインがある（`curl -I`で検証済み、思い込みでない）
- [ ] `.md`ツインが`llms.txt`からリンクされ、`Link: rel="alternate"`ヘッダーで告知されている
- [ ] 相互参照のために複数のプラットフォームでコンテンツが公開されている
