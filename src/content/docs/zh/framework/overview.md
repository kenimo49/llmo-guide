---
title: "LLMO框架：AI可发现性标准"
description: "LLMO框架定义了AI可发现性的5个核心组件：知识清晰度、结构化格式、检索信号、权威信号和引用信号。满分：15分。"
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "The LLMO Framework: A Standard for AI Discoverability",
        "description": "Five core components for making your content discoverable by AI.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

LLMO框架定义了五个核心组件，用于衡量AI系统能否发现、理解并准确引用你的内容。

## 五大组件

### 1. 知识清晰度
你的内容是否清晰到AI能准确理解和概括？

- 使用简洁、无歧义的语言
- 明确定义关键术语
- 提供结构化的事实信息（谁、什么、何时、何地）
- 避免未经解释的专业术语

### 2. 结构化格式
你的内容是否采用了机器可读的结构？

- 使用语义化HTML和Markdown
- 实现JSON-LD结构化数据
- 提供llms.txt供AI专用内容
- 按层级组织内容

### 3. 检索信号
AI系统在需要时能否找到你的内容？

- 确保可爬取性（robots.txt、sitemap.xml）
- 提供机器可读的端点（/ai/、.md文件）
- 实现llms.txt标准
- 尽可能通过API提供内容

### 4. 权威信号
你的内容是否展现了专业能力和可信度？

- 作者署名并附可验证的资质信息
- 跨平台存在感（GitHub、LinkedIn、出版物）
- 各平台信息保持一致
- 基于证据的主张，附有引用来源

### 5. 引用信号
你的内容是否提供了AI可验证的参考文献？

- 链接到一手来源
- 包含发布日期
- 提供版本信息
- 引用学术论文和官方文档

## 评分标准

每个组件按0-3分评分：

| 分数 | 等级 | 说明 |
|------|------|------|
| 0 | 无 | 未涉及该组件 |
| 1 | 基础 | 最低限度的实现 |
| 2 | 良好 | 扎实的实现，仍有改进空间 |
| 3 | 优秀 | 最佳实践级别的实现 |

**满分：15分**（5个组件 × 每个3分）
