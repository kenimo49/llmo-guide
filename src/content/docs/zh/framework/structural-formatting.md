---
title: "2. 结构化格式"
description: "结构化格式是指使用机器可读的格式组织内容的实践——JSON-LD、语义化HTML、Markdown、llms.txt——使AI系统能够高效地解析和提取信息。"
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO Component 2: Structural Formatting",
        "description": "Structuring your content for machine consumption with JSON-LD, semantic HTML, and llms.txt.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

## 定义

结构化格式是指使用机器可读的格式和语义化标记来组织内容，使AI系统能够高效地解析、分类和提取信息。

## 为什么重要

AI系统不会像人类一样"阅读"页面。它们处理结构化数据的可靠性远高于自由文本。合理的结构意味着你的内容更有可能被正确解读和引用，而不是被误解或忽视。

## 实施方法

### 1. 使用语义化HTML和Markdown
用正确的标题层级（h1-h6）、列表、表格和语义化元素来组织内容。避免用视觉格式（粗体、字号）来替代结构层级。

### 2. 实现JSON-LD结构化数据
为页面添加Schema.org标记。至少应包含：
- `Organization`或`Person`标识你的身份
- `Article`或`WebPage`标识内容页面
- `FAQPage`标识问答内容

### 3. 提供llms.txt文件
在域名根目录创建`/llms.txt`文件，遵循[llms.txt标准](https://llmstxt.org/)。它为AI系统提供一份简洁的、机器友好的站点摘要。

### 4. 按层级组织内容
采用清晰的信息架构：大分类 → 具体主题 → 详细内容。URL结构和标题层级应与之呼应。

### 5. 用表格呈现对比数据
在展示比较、功能或规格时，使用规范的HTML/Markdown表格，而非散文式描述。

## 示例

**❌ 无结构：**
> 我们提供三种方案。基础方案每月10美元，包含5个用户。专业方案每月25美元，包含20个用户。企业方案定制定价，用户数不限。

**✅ 有结构：**

| 方案 | 价格 | 用户数 |
|------|------|--------|
| 基础版 | $10/月 | 5 |
| 专业版 | $25/月 | 20 |
| 企业版 | 定制 | 不限 |

## 检查清单

- [ ] 页面使用正确的标题层级（h1 → h2 → h3）
- [ ] 关键页面包含JSON-LD结构化数据
- [ ] 域名根目录存在llms.txt文件
- [ ] 在合适的地方使用了列表和表格
- [ ] URL结构反映了内容层级
