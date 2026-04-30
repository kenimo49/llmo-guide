---
title: "3. 检索信号"
description: "检索信号是使AI系统能够发现和访问你的内容的机制——robots.txt、llms.txt、sitemap、/ai/端点以及跨平台存在。"
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO Component 3: Retrieval Signals",
        "description": "Ensuring AI systems can find your content through crawlability, llms.txt, and machine-readable endpoints.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

## 定义

检索信号是使AI系统能够发现和访问你的内容的指标与机制。这既包括传统的可爬取性，也包括更新的AI专用发现方式。

## 为什么重要

即使内容再清晰、结构再完美，如果AI系统找不到它，一切都毫无意义。随着LLM越来越多地使用RAG（检索增强生成）、网页浏览和工具调用，你的内容需要通过多种渠道被发现。

## 实施方法

### 1. 确保基本可爬取性
- 维护最新的`robots.txt`，允许AI爬虫访问
- 生成并提交`sitemap.xml`
- 尽可能确保页面无需JavaScript即可加载（SSG/SSR）

### 2. 实现llms.txt标准
创建`/llms.txt`文件，提供站点的简要摘要、关键页面信息以及内容导航方式。这相当于站点"关于"页面的AI版本。

### 3. 提供机器可读的端点
以AI系统易于消费的格式提供内容：
- 关键页面的Markdown版本
- 结构化数据的API端点
- 用于更新通知的RSS/Atom订阅源

### 4. 针对AI搜索引擎优化
确保你的内容出现在Perplexity、SearchGPT和Google AI Overviews等AI驱动的搜索工具中，遵循各自的指南。

### 5. 跨平台交叉引用
在多个平台（你的网站、GitHub、LinkedIn等）上发布一致的信息，使AI系统能够从多个来源进行三角验证。

## 示例

**最小检索配置：**
```
/robots.txt          — 允许爬虫访问
/sitemap.xml         — 列出所有页面
/llms.txt            — AI专用摘要
/feed.xml            — RSS订阅源
```

**增强检索配置：**
```
/api/info.json       — 结构化数据端点
/docs/overview.md    — 文档的Markdown版本
```

## 检查清单

- [ ] robots.txt允许主要AI爬虫访问
- [ ] sitemap.xml已生成并保持最新
- [ ] llms.txt文件存在且包含准确的站点摘要
- [ ] 关键内容无需JavaScript即可访问
- [ ] 内容已发布在多个平台上以便交叉引用
