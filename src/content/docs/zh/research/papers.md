---
title: "论文与参考文献"
description: "与 LLMO 和 AI 搜索优化相关的学术研究与行业报告。包括 GEO（KDD 2024）、llms.txt 提案及相关研究。"
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO Research Papers & References",
        "description": "Academic research and industry reports related to LLMO and AI search optimization.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

## 核心论文

### GEO: Generative Engine Optimization
- **作者**：Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande
- **机构**：Princeton University、IIT Delhi、Adobe Research
- **会议**：KDD 2024 (ACM SIGKDD)
- **链接**：[arXiv:2311.09735](https://arxiv.org/abs/2311.09735)
- **摘要**：首个针对生成式搜索引擎内容可见性优化的学术框架。在 10,000 个查询上测试了 9 种优化策略。核心发现：添加统计数据可将可见性提升 +115.1%。
- **[详细摘要 →](/zh/research/geo-paper-summary/)**

### llms.txt 提案
- **作者**：Jeremy Howard
- **链接**：[llmstxt.org](https://llmstxt.org/)
- **摘要**：一项标准化文件提案，用于向 LLM 提供网站相关信息。类似于 robots.txt，但设计目标是供 AI 消费而非爬虫控制。

## 行业报告与指南

### Microsoft：面向 AI 搜索的内容优化
- **发布方**：Microsoft（Bing Webmaster Blog）
- **日期**：2025 年 10 月
- **摘要**：官方指南，提出了 AI 内容优化的 3 项原则：结构化、权威性和时效性。
- **[详细摘要 →](/zh/research/microsoft-guidelines/)**

### Ahrefs：网络提及 vs 反向链接对 AI 可见性的影响
- **发布方**：Ahrefs
- **数据集**：75,000 个品牌
- **摘要**：网络提及（品牌 + 关键词）对 AI 可见性的预测力是传统反向链接的 3 倍。

### Gartner：搜索的未来
- **发布方**：Gartner
- **日期**：2024 年 2 月
- **摘要**：预测到 2026 年，传统搜索引擎的使用量将下降 25%，因为用户正在转向 AI 驱动的替代方案。

### Go Fish Digital：AI 搜索转化率
- **发布方**：Go Fish Digital
- **摘要**：由于用户意图经过预验证，AI 搜索流量的转化率是传统搜索流量的 25 倍。

## 相关研究

### Schema.org 结构化数据
- **URL**：[schema.org](https://schema.org/)
- **相关性**：LLMO 组件 2（结构化格式）中 JSON-LD 结构化数据实施所使用的标准词汇表。

### Google 结构化数据文档
- **URL**：[developers.google.com/search/docs/appearance/structured-data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- **相关性**：搜索引擎和 AI 系统均可识别的结构化数据实施指南。

## 贡献

有相关论文或报告推荐？欢迎[提交 Issue](https://github.com/kenimo49/llmo-guide/issues) 或发起 Pull Request 将其添加到此列表。
