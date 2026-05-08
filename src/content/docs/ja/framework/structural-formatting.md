---
title: "2. 構造化フォーマット"
description: "構造化フォーマットは、JSON-LD、セマンティックHTML、Markdown、llms.txtなどの機械可読フォーマットを使ってコンテンツを構造化し、AIシステムが効率的に情報を解析・抽出できるようにする手法である。"
pubDate: 2026-04-30
---

## 概要

構造化フォーマットは、機械可読なフォーマットとセマンティックマークアップを使ってコンテンツを構造化し、AIシステムが効率的に解析・分類・情報抽出できるようにする手法である。

## なぜ重要か

AIシステムは人間のようにページを「読む」わけではない。構造化されたデータは、自由形式のテキストよりもはるかに確実に処理できる。適切な構造を持たせることで、コンテンツが正しく解釈・引用される可能性が高まり、誤解や見落としを防げる。

## 実装方法

### 1. セマンティックHTMLとMarkdownを使う
適切な見出し（h1-h6）、リスト、テーブル、セマンティック要素でコンテンツを構造化する。視覚的な書式設定（太字、フォントサイズ）を構造的な階層の代わりに使うことは避ける。

### 2. JSON-LD構造化データを実装する
ページにSchema.orgマークアップを追加する。最低限、以下を含める:
- アイデンティティ用の`Organization`または`Person`
- コンテンツページ用の`Article`または`WebPage`
- Q&Aコンテンツ用の`FAQPage`

### 3. llms.txtファイルを提供する
[llms.txt標準](https://llmstxt.org/)に従って、ドメインルートに`/llms.txt`ファイルを作成する。これはAIシステムに対して、サイトの簡潔で機械にやさしい要約を提供するものである。

### 4. コンテンツを階層的に整理する
明確な情報アーキテクチャを使う: 大分類 → 具体的なトピック → 詳細なコンテンツ。この構造をURL構造と見出し階層に反映させる。

### 5. 比較データにはテーブルを使う
比較、機能、仕様を提示する際は、散文的な説明ではなく適切なHTML/Markdownテーブルを使う。

### 6. JSON-LDエンティティをページ主題に絞る

すべてのエンティティをすべてのページに注入してはいけない。よくあるLLMO実装では、`Organization`、`Person`、`Service[]`、`Book[]`、`MusicGroup`、`FAQPage` を共通レイアウトに入れてしまう。結果、404ページやプライバシーページ、すべてのブログ記事に同じペイロードが乗る。AIシステムはこれを意味的ノイズとして読む — エンティティが、それと無関係なページに広告されてしまう。

クリーンなパターンは**2階層スコープ**である:

| 階層 | エンティティ | 配置 |
|------|----------|------|
| サイト全体 | `Organization`、`WebSite`、`Person`（創業者・著者） | 共通レイアウトの `<head>` |
| ページ別 | `Service[]`、`Book[]`、`MusicGroup`、`FAQPage`、`ItemList`、`BreadcrumbList`、`Article` | そのエンティティが主題となるページ |

サービスとFAQを掲載するトップページには `Service[]` + `FAQPage` を出す。書籍カタログページには `Book[]`。音楽プロジェクトページには `MusicGroup`。404ページとプライバシーページにはサイト全体階層のみを出す。

安定した `@id` 値（`https://example.com/#org`、`#founder`、`#website`）を使うことで、ページ別エンティティはサイト全体エンティティを再宣言せずに参照できる。

### 7. JSON-LDが実際に出力されているか検証する

よくある silent failure: ページに `<script slot="head" type="application/ld+json">` を書いたが、レイアウトに対応する `<slot name="head" />` 宣言が無い。フレームワークは警告なしにスクリプトを破棄する。書いた構造化データはユーザーに届かない — そして、それに気づけない。

出力検証をビルドの一部にする:

```bash
# dist 出力の各ページのJSON-LDブロック数を数える
for p in dist/*/index.html dist/index.html; do
  n=$(grep -oE '<script type="application/ld\+json">' "$p" | wc -l)
  echo "$p: $n block(s)"
done

# 各ブロックがパース可能か検証
python3 -c "
import re, json, sys
with open('dist/index.html') as f: html = f.read()
for m in re.finditer(r'<script type=\"application/ld\+json\">(.+?)</script>', html, re.DOTALL):
    try: json.loads(m.group(1))
    except: sys.exit('INVALID JSON-LD: ' + m.group(1)[:200])
print('OK')
"
```

より強力な保証としては、代表的なページに対して [Schema.org Validator](https://validator.schema.org/) と Google の [Rich Results Test](https://search.google.com/test/rich-results) を実行する。CIからAPI経由で呼び出せる。

## 例

**--- 非構造化:**
> We offer three plans. The basic plan costs $10 and includes 5 users. The pro plan costs $25 and includes 20 users. The enterprise plan is custom priced with unlimited users.

**--- 構造化:**

| Plan | Price | Users |
|------|-------|-------|
| Basic | $10/mo | 5 |
| Pro | $25/mo | 20 |
| Enterprise | Custom | Unlimited |

## チェックリスト

- [ ] ページが適切な見出し階層（h1 → h2 → h3）を使っている
- [ ] 主要ページにJSON-LD構造化データが存在する
- [ ] ドメインルートにllms.txtファイルが存在する
- [ ] コンテンツが適切にリストやテーブルを使っている
- [ ] URL構造がコンテンツの階層を反映している
- [ ] サイト全体レイアウトは `Organization` / `WebSite` / `Person` のみを出力。ページ別エンティティはそのページにスコープしている
- [ ] 各エンティティがページ間参照のための安定した `@id` を持つ
- [ ] ビルドパイプラインが各ページで JSON-LD ブロックの出力とパース可能性を検証している（silent drop なし）
- [ ] 代表的なページが Google Rich Results Test と Schema.org Validator をパスする
