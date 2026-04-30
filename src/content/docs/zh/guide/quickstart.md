---
title: "LLMO快速入门：30分钟实施指南"
description: "在30分钟内为你的网站添加三个核心LLMO文件：llms.txt、AI爬虫专用robots.txt和JSON-LD结构化数据。"
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "LLMO Quickstart: Implement in 30 Minutes",
        "description": "Add the three essential LLMO files to your site in under 30 minutes.",
        "totalTime": "PT30M",
        "step": [
          {"@type": "HowToStep", "name": "Add robots.txt for AI crawlers", "position": 1},
          {"@type": "HowToStep", "name": "Create llms.txt", "position": 2},
          {"@type": "HowToStep", "name": "Add JSON-LD structured data", "position": 3}
        ],
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"}
      }
---

只需三个文件，30分钟内即可让你的网站对AI可发现。本指南介绍LLMO的最小可行实施方案。

## 三个核心文件

| 文件 | 用途 | 耗时 |
|------|------|------|
| `robots.txt` | 允许AI爬虫访问你的网站 | 5分钟 |
| `llms.txt` | 为AI提供你网站的结构化摘要 | 15分钟 |
| JSON-LD `<script>` | 为AI提供关于你内容的结构化数据 | 10分钟 |

## 第1步：为AI爬虫配置robots.txt（5分钟）

大多数网站已经有 `robots.txt`。为AI爬虫添加明确的 `Allow` 规则：

```txt
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

**为什么需要明确的Allow规则？** 一些托管平台和CDN默认会屏蔽AI爬虫。明确的规则可以防止意外屏蔽。

### 已知的AI爬虫

| 爬虫 | 运营方 | 用途 |
|------|--------|------|
| GPTBot | OpenAI | ChatGPT、网页浏览 |
| ClaudeBot | Anthropic | Claude网页搜索 |
| Google-Extended | Google | Gemini、AI Overviews |
| PerplexityBot | Perplexity | Perplexity搜索 |
| Amazonbot | Amazon | Alexa、商品搜索 |
| CCBot | Common Crawl | 训练数据收集 |

## 第2步：创建llms.txt（15分钟）

`llms.txt` 文件（由Jeremy Howard在 [llmstxt.org](https://llmstxt.org) 提出）为AI系统提供你网站的结构化摘要。

将此文件放置在网站根目录：`https://yoursite.com/llms.txt`

### 模板

```markdown
# 你的网站名称

> 用一句话描述你的网站做什么。

## 我们做什么

简要说明你的核心业务、专业领域或目标。
使用通俗语言，避免营销术语。

## 关键信息

- 成立时间：[年份]
- 团队规模：[人数或核心成员]
- 所在地：[如相关]
- 专业方向：[核心专长]

## 产品/服务

- **产品A**：简要描述
- **产品B**：简要描述

## 链接

- 官网：https://yoursite.com
- 文档：https://yoursite.com/docs
- GitHub：https://github.com/yourorg
- 联系方式：https://yoursite.com/contact
```

### 最佳实践

1. **以事实开头，而非营销话术。** "我们使用AI自动化构建Android应用"比"我们利用前沿协同效应"更有效。
2. **包含结构化数据。** 表格、列表和键值对比长段落文字更容易被AI解析。
3. **控制在2,000词以内。** 简洁的摘要更有可能被完整读取。
4. **定期更新。** AI系统会周期性地重新抓取。过时的llms.txt意味着过时的AI回答。

## 第3步：JSON-LD结构化数据（10分钟）

在首页的 `<head>` 中添加JSON-LD脚本。这有助于AI理解你的实体类型、关联关系和关键属性。

### Organization Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company",
  "url": "https://yoursite.com",
  "description": "What your company does in one sentence.",
  "founder": {
    "@type": "Person",
    "name": "Founder Name"
  },
  "sameAs": [
    "https://github.com/yourorg",
    "https://linkedin.com/company/yourorg",
    "https://x.com/yourorg"
  ]
}
</script>
```

### Article Schema（用于博客文章）

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Your Article Title",
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "https://authorsite.com"
  },
  "datePublished": "2026-01-15",
  "publisher": {
    "@type": "Organization",
    "name": "Your Company"
  }
}
</script>
```

### Schema类型选择指南

| 内容类型 | Schema | 优先级 |
|----------|--------|--------|
| 首页 | Organization 或 Person | 高 |
| 博客文章 | Article 或 BlogPosting | 高 |
| 产品 | Product | 高 |
| FAQ页面 | FAQPage | 中 |
| 技术文档 | TechArticle | 中 |
| 书籍 | Book | 中 |

## 验证你的实施

部署后，检查以下几项：

1. **robots.txt**：访问 `https://yoursite.com/robots.txt`，确认AI爬虫已被允许
2. **llms.txt**：访问 `https://yoursite.com/llms.txt`，验证内容准确无误
3. **JSON-LD**：使用 [Google Rich Results测试工具](https://search.google.com/test/rich-results) 或查看页面源码确认script标签存在
4. **AI测试**：向ChatGPT或Perplexity询问关于你网站/产品的问题，观察回答结果

## 下一步

本快速入门涵盖了LLMO Framework的 **Retrieval Signals** 和 **Structural Formatting** 组件。要了解完整框架：

- [Knowledge Clarity](/zh/framework/knowledge-clarity/) — 撰写AI能理解的内容
- [Authority Signals](/zh/framework/authority-signals/) — 建立可验证的专业权威
- [Citation Signals](/zh/framework/citation-signals/) — 提供AI愿意引用的数据
- [Framework Overview](/zh/framework/overview/) — 从5大组件全面评估你的网站
