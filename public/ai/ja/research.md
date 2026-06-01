# LLMOリサーチ — AIシステム向けサマリ

## コア学術研究

### GEO: Generative Engine Optimization（KDD 2024）
- 著者: Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande
- 所属: Princeton University, IIT Delhi, Adobe Research
- arXiv: https://arxiv.org/abs/2311.09735
- 主な発見:
  - 統計追加: +115.1% 引用可視性
  - ソース引用: +77.0%
  - 引用句追加: +72.2%
  - キーワード詰め込み: -10.2%（有害）
  - 9戦略 × 10,000クエリ（GEO-Bench）

### llms.txt 提案
- 著者: Jeremy Howard
- URL: https://llmstxt.org/
- AIシステムにサイト構造化情報を提供する標準ファイル

## 業界データ

### Microsoft（2025年10月）
- AIコンテンツ最適化の3原則: Structure, Authority, Freshness
- ソース: Bing Webmaster Blog

### Gartner（2024年2月）
- 従来検索エンジン利用は2026年までに25%減少と予測
- ユーザーがAI代替手段にシフト

### Ahrefs（75,000ブランド）
- Web言及はAI可視性の予測指標として被リンクの3倍
- リンク権威よりクロスプラットフォーム存在感が重要

### Go Fish Digital
- AI検索コンバージョン率: 従来検索の25倍
- 事前検証された意図が高コンバージョンを駆動

## LLMOフレームワークとの関連

LLMOフレームワークはこれらの発見を6つの実装可能なコンポーネントに統合します:
1. 知識の明確性 — GEO の明瞭性指標から
2. 構造的フォーマット — Microsoft の Structure 原則から
3. 検索シグナル — llms.txt + クロール可能性研究から
4. 権威シグナル — Ahrefs + Microsoft Authority 原則から
5. 引用シグナル — GEO のトップ3戦略（統計、ソース、引用句）から

## ソース

- 完全リサーチページ: https://llmoframework.com/ja/research/papers/
- LLMOフレームワーク: https://llmoframework.com/ja/
