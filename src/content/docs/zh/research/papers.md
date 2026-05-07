---
title: "论文与参考文献"
description: "与 LLMO 和 AI 搜索优化相关的学术研究与行业报告。包括 GEO（KDD 2024）、llms.txt 提案及相关研究。"
pubDate: 2026-04-30
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

## 2025–2026 更新

自最初的 GEO 论文以来，LLMO 领域发展迅速。以下是作为实时一手参考持续追踪的来源。

### Cloudflare Radar — AI Insights
- **发布方**：Cloudflare
- **URL**：[radar.cloudflare.com/ai-insights](https://radar.cloudflare.com/ai-insights)
- **类型**：实时仪表板（持续更新）
- **相关性**：关于 AI 机器人爬取份额、主要 AI 爬虫（GPTBot、ClaudeBot、PerplexityBot、Bytespider、Google-Extended 等）以及按域名的 AI 机器人与引荐流量比例的公开数据。Cloudflare 于 2024 年添加了 AI 机器人封锁功能，并在整个 2025 年发布了季度趋势数据。

### OpenAI GPTBot 文档
- **发布方**：OpenAI
- **URL**：[platform.openai.com/docs/bots](https://platform.openai.com/docs/bots)
- **类型**：官方爬虫披露
- **相关性**：GPTBot 用户代理、IP 范围、robots.txt 指令和退出语义的权威参考。持续更新。

### Anthropic 爬虫披露
- **发布方**：Anthropic
- **URL**：[support.anthropic.com](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- **类型**：官方爬虫披露
- **相关性**：ClaudeBot、Claude-Web、Claude-User 用户代理及站点所有者控制方式的权威参考。

### llms.txt 采用追踪器
- **发布方**：directory.llmstxt.cloud
- **URL**：[directory.llmstxt.cloud](https://directory.llmstxt.cloud/)
- **类型**：社区维护目录
- **相关性**：追踪采用 `/llms.txt` 标准的站点。2025 年期间在文档站点（Anthropic、Mintlify、Stripe 风格的 API 文档）中采用范围扩大。

### Schema.org 发布版本（2025）
- **发布方**：schema.org
- **URL**：[schema.org/docs/releases.html](https://schema.org/docs/releases.html)
- **类型**：版本化词汇发布
- **相关性**：持续向 LLMO 组件 2（结构化格式）使用的词汇添加内容。追踪与 AI 消费相关的新类型（如 `LearningResource`、`EducationalOccupationalCredential`）。

## 相关研究

### Schema.org 结构化数据
- **URL**：[schema.org](https://schema.org/)
- **相关性**：LLMO 组件 2（结构化格式）中 JSON-LD 结构化数据实施所使用的标准词汇表。

### Google 结构化数据文档
- **URL**：[developers.google.com/search/docs/appearance/structured-data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- **相关性**：搜索引擎和 AI 系统均可识别的结构化数据实施指南。

## 贡献

有相关论文或报告推荐？欢迎[提交 Issue](https://github.com/kenimo49/llmo-guide/issues) 或发起 Pull Request 将其添加到此列表。
