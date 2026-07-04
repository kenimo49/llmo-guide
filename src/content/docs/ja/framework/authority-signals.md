---
title: "4. 権威性シグナル"
description: "権威性シグナルは、AIに対して専門性と信頼性を示すシグナルである。複数のソースが類似の情報を提供する場合、AIは最も信頼性の高い情報源を引用する。"
pubDate: 2026-04-30
---

## 概要

権威性シグナルは、AIシステムに対して専門性、信頼性、信用度を示す指標である。LLMがコンテンツを信頼できるソースとして引用すべきかどうかの判断に役立つ。

## なぜ重要か

LLMは権威あるソースを優先するよう学習されている。複数のソースが類似の情報を提供する場合、AIシステムは最も信頼性が高いと判断されるソースを引用する。権威性シグナルは、この選定プロセスでコンテンツが選ばれるための助けとなる。

## 実装方法

### 1. 明確な著者帰属を提供する
すべてのコンテンツに、検証可能な資格情報を持つ著者を明示する:
- 氏名と肩書
- 関連する経験と資格
- 専門プロフィールへのリンク

### 2. クロスプラットフォームでの一貫性を維持する
すべてのプラットフォームで情報が一貫していることを確認する:
- WebサイトのプロフィールとLinkedInプロフィールが一致している
- GitHubプロフィールがWebサイトにリンクしている
- 出版物が同じ資格情報を参照している

### 3. オリジナルの調査・知見を公開する
AIシステムは、集約された情報よりもオリジナルコンテンツを高く評価する:
- 独自のデータや発見を共有する
- 専門家としての分析を提供する
- ケーススタディと結果を文書化する

### 4. 検証可能な実績を構築する
専門性の文書化された履歴を作る:
- 公開された記事や論文
- カンファレンスでの講演やプレゼンテーション
- オープンソースへの貢献
- 専門資格・認定

### 5. Identity-as-Code: 1人の人物に1つの `@id`、参照はどこからでも

記事32本とBook LP 22ページを持つ4言語サイトでは、ページごとにインライン定義すると *80通りの `Person` 定義* が簡単に生まれてしまう。ここから3つの問題が生じる。

1. **エンティティの分裂** — 検索エンジンやLLMが各定義を別々のエンティティとして扱い、権威性が積み上がらない可能性がある。
2. **不整合のドリフト** — ENページの `jobTitle` だけを変更してJAページを変更し忘れると、アイデンティティが静かに分裂する。
3. **出力の肥大化** — すべてのページが同じ1〜2KBの冗長なJSON-LDを配信することになる。

解決策は、各エンティティを安定した `@id` で *一度だけ* 定義し、他のすべての場所からはそれを参照することだ。

**アンチパターン（ページごとの重複定義）:**

```json
// すべてのブログ記事と書籍ページが完全なPersonオブジェクトを繰り返す
{
  "@type": "BlogPosting",
  "author": { "@type": "Person", "name": "Ken Imoto", "jobTitle": "..." },
  "publisher": { "@type": "Organization", "name": "Propel-Lab", "url": "..." }
}
```

**Identity-as-Codeパターン:**

```json
// トップページ（または専用のidentityページ）で一度だけ定義する
{
  "@type": "Person",
  "@id": "https://example.com/#person",
  "name": "Ken Imoto",
  "jobTitle": "AI Systems Engineer",
  "url": "https://example.com/",
  "sameAs": ["https://github.com/...", "https://linkedin.com/..."],
  "worksFor": { "@id": "https://example.com/#organization" }
}

// すべての記事・書籍・商品ページからは参照する
{
  "@type": "BlogPosting",
  "author": { "@id": "https://example.com/#person" },
  "publisher": { "@id": "https://example.com/#organization" }
}
```

**なぜ権威性を分裂させずに積み上げられるのか:**

- GoogleもAIクローラーも、ページをまたぐシグナルを *同一の* エンティティノードに集約する。公開した記事の1本1本が、同じ専門家プロフィールを補強していく。
- 多言語サイト（EN/JA/PT/ES）で、言語バリアントごとにアイデンティティが分裂するのを防げる。`@id` が唯一の正となる。
- 新しいプラットフォーム（Hashnode、TabNews）や資格を追加するときは、`sameAs` 配列を *1箇所* 更新するだけでよい。80ページを直す必要はない。

**実装ルール:**

- `@id` はURLベース（`https://yoursite/#person`）にする。ランダムな文字列ではなく、URLベースのIDならクローラーが解決できる。
- `Person`、`Organization`、`WebSite` の定義はトップページ（または専用の `/identity` ページ）に置き、他のページからはすべて参照にする。
- 多言語サイトでは、`WebSite` の *言語バリアント* には別々のID（`/#website-en`、`/#website-ja`）を与える。ただし `Person` と `Organization` は言語間で共有する。
- 記事で著者に言及するとき、`author` フィールドは `{"@id": "..."}` でなければならない。完全なPersonオブジェクトを書かない。

## 例

**--- 弱いAuthority:**
> Some guy wrote this blog post about AI.

**--- 強いAuthority:**
> Ken Imoto, AI Systems Engineer and CEO of Propel-Lab, author of "Practical Claude Code" and "LLMO" (published on Kindle and Zenn). Research focus: LLMO, AI Agent Design, Context Engineering.

## チェックリスト

- [ ] すべてのコンテンツに著者名と資格情報が記載されている
- [ ] 専門プロフィール（LinkedIn、GitHub）がリンクされ一貫している
- [ ] オリジナルの調査や独自の知見が定期的に公開されている
- [ ] 出版物と資格情報が検証可能である
- [ ] プロフィール情報がすべてのプラットフォームで一貫している
- [ ] `Person` と `Organization` を、URLベースの `@id` 付きでトップページまたはidentityページに一度だけ定義している
- [ ] 他のすべてのページは完全なオブジェクトの繰り返しではなく `{"@id": "..."}` でエンティティを参照している
- [ ] 多言語バリアントが同じ `Person`/`Organization` の `@id` を共有している（言語ごとに変わるのは `WebSite` のみ）
