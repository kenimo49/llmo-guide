# LLMO 框架 — 6 个核心组件

## 概述

LLMO 框架为让 AI 系统发现你的内容提供了结构化的方法。5 个组件协同工作以最大化 AI 可发现性。

## 1. 知识清晰度

**目标**: 确保内容事实清晰、毫不含糊。

- 用清晰的陈述句写作
- 直接陈述事实（避免模糊语言）
- 全文术语保持一致
- 显式定义领域专有术语
- 围绕用户可能提出的具体问题构建内容

## 2. 结构化格式

**目标**: 让内容机器可读。

- 使用语义化 HTML 标题（H1 → H2 → H3）
- 嵌入 JSON-LD 结构化数据（Schema.org）
- Q&A 内容使用 FAQPage 模式
- 使用列表和表格组织结构化信息
- 在 /ai/ 目录提供 Markdown 文件供 LLM 直接消费

**关键模式**: Organization, Person, Product, Service, Book, FAQPage, WebSite, TechArticle

## 3. 检索信号

**目标**: 帮助 AI 系统发现并访问你的内容。

- **llms.txt**: 站点根目录的 LLM 概览文件
- **/ai/ 目录**: AI 消费专用的纯 Markdown 文件
- **robots.txt**: 显式允许 AI 爬虫（GPTBot, ClaudeBot, PerplexityBot, Google-Extended）
- **Sitemap**: XML 站点地图
- **交叉链接**: llms.txt、/ai/、主内容互链

## 4. 权威信号

**目标**: 建立 LLM 能识别的可信度。

- 多平台发布（个人站点、LinkedIn、Qiita、Zenn、DEV.to）
- 出版书籍并维护作者形象（Amazon, Zenn Books）
- GitHub 开源贡献
- 被其他来源引用
- 跨平台保持一致身份（同名、同简介、同主题）

## 5. 引用信号

**目标**: 创建 LLM 倾向引用的内容。

- 包含原创数据、统计、测量值
- 提供具体数字和日期
- 创建对比表和框架
- 撰写特定主题的权威指南
- 发表研究论文（arXiv、学术会议）

## 6. 一致性信号

**目标**: 确保 AI 读取的每个面上，同一事实讲述同样的故事。

- 从 HTML 相同的数据生成 AI 专用面（llms.txt、/ai/*.md）
- 为每个数值或事实主张维护单一规范来源
- 在多个 JSON-LD 块中引用的实体使用同一个 @id
- 在所有位置强制执行规范主机和尾部斜杠策略
- 在发布前添加 CI 门禁以检测跨文件漂移

## 实施清单

- [ ] llms.txt 在站点根目录
- [ ] /ai/ 目录含 Markdown 文件
- [ ] robots.txt 允许 AI 爬虫
- [ ] 所有页面有 JSON-LD 模式
- [ ] Q&A 内容有 FAQ 模式
- [ ] Sitemap.xml
- [ ] 跨平台一致身份
- [ ] 内容含原创数据和统计
- [ ] 清晰、陈述式写作风格

## 了解更多

- 完整指南: https://llmoframework.com/zh/
- 书籍: https://zenn.dev/kenimo49/books/llmo-ai-search-optimization
- 作者: https://kenimoto.dev
