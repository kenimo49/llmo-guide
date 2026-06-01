---
title: "LLMO框架：AI可发现性标准"
description: "LLMO框架定义了AI可发现性的6个核心组件：知识清晰度、结构化格式、检索信号、权威信号、引用信号和一致性信号。满分：18分。"
pubDate: 2026-05-08
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        "@id": "https://llmoframework.com/zh/framework/overview/#components",
        "name": "LLMO Framework Components",
        "description": "Six core components of the LLMO Framework, scored 0-3 each, for a maximum site score of 18 points.",
        "hasDefinedTerm": [
          {
            "@type": "DefinedTerm",
            "name": "Knowledge Clarity",
            "description": "Clear, factual, unambiguous content that AI can understand and summarize accurately. Measured by plain language use, defined terms, structured facts, and absence of unexplained jargon.",
            "inDefinedTermSet": "https://llmoframework.com/zh/framework/overview/#components",
            "url": "https://llmoframework.com/zh/framework/knowledge-clarity/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Structural Formatting",
            "description": "Machine-readable structure including semantic HTML, Markdown, page-scoped JSON-LD, and the llms.txt standard, with build-time verification that JSON-LD actually emits in served HTML.",
            "inDefinedTermSet": "https://llmoframework.com/zh/framework/overview/#components",
            "url": "https://llmoframework.com/zh/framework/structural-formatting/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Retrieval Signals",
            "description": "Signals that help AI systems find content: crawlability via robots.txt and sitemap.xml, machine-readable endpoints under /ai/, and adoption of the llms.txt standard.",
            "inDefinedTermSet": "https://llmoframework.com/zh/framework/overview/#components",
            "url": "https://llmoframework.com/zh/framework/retrieval-signals/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Authority Signals",
            "description": "Signals that demonstrate expertise and trustworthiness: verifiable author attribution, cross-platform identity (sameAs links), and evidence-based claims with citations.",
            "inDefinedTermSet": "https://llmoframework.com/zh/framework/overview/#components",
            "url": "https://llmoframework.com/zh/framework/authority-signals/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Citation Signals",
            "description": "References that AI systems can verify: primary sources, publication and modification dates, version information, and links to academic papers or official documentation.",
            "inDefinedTermSet": "https://llmoframework.com/zh/framework/overview/#components",
            "url": "https://llmoframework.com/zh/framework/citation-signals/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Coherence Signals",
            "description": "Same fact tells the same story across every surface an AI reads: HTML, JSON-LD, Markdown, llms.txt. Single source of truth for numeric and factual claims, with CI gates against cross-file drift.",
            "inDefinedTermSet": "https://llmoframework.com/zh/framework/overview/#components",
            "url": "https://llmoframework.com/zh/framework/coherence-signals/"
          }
        ]
      }
---

LLMO框架定义了六个核心组件，用于衡量AI系统能否发现、理解并准确引用你的内容。

想先了解概念？可以从 [什么是LLMO？](/zh/guide/what-is-llmo/) 开始；想直接动手，请跳到 [30分钟快速入门](/zh/guide/quickstart/)。

## 六大组件

### 1. 知识清晰度
你的内容是否清晰到AI能准确理解和概括？

- 使用简洁、无歧义的语言
- 明确定义关键术语
- 提供结构化的事实信息（谁、什么、何时、何地）
- 避免未经解释的专业术语

### 2. 结构化格式
你的内容是否采用了机器可读的结构？

- 使用语义化HTML和Markdown
- 实现按页限定作用域的JSON-LD结构化数据
- 提供llms.txt供AI专用内容
- 验证JSON-LD在实际配信的HTML中确实输出

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

### 6. 一致性信号
同一事实在AI读取的每个面上是否讲述同一个故事？

- 每一项数值或事实主张都有单一可信源
- AI 专用面（`llms.txt`、`/ai/*.md`）与 HTML 从同一份数据生成
- 正规主机与末尾斜杠策略在各处贯彻
- 不为同一个 `@id` 生成重复的 JSON-LD 实体

## 评分标准

每个组件按0-3分评分：

| 分数 | 等级 | 说明 |
|------|------|------|
| 0 | 无 | 未涉及该组件 |
| 1 | 基础 | 最低限度的实现 |
| 2 | 良好 | 扎实的实现，仍有改进空间 |
| 3 | 优秀 | 最佳实践级别的实现 |

**满分：18分**（6个组件 × 每个3分）

## 自我评估清单

针对每个组件给自己的网站打分。每个能自信打勾的项目算 1 分；目标是每个组件 3 项满分。

### 1. 知识清晰度（最高 3 分）
- [ ] 每个页面以一句话回答其主要问题（Answer-first）
- [ ] 领域专有术语在首次出现时定义（无未解释的术语）
- [ ] 每个段落只承载一个想法（无多重主张段落）

### 2. 结构化格式（最高 3 分）
- [ ] 页面使用语义化 H1 → H2 → H3 层级，无跳级标题
- [ ] 每个有意义的页面输出与该页相关的 JSON-LD；站点级布局只输出 `Organization` / `WebSite` / `Person`
- [ ] 构建管线验证 JSON-LD 在 `dist/` HTML 中确实可解析

### 3. 检索信号（最高 3 分）
- [ ] `/llms.txt` 存在于站点根目录并列出关键页面
- [ ] `/ai/` 目录为每个主要主题提供干净的 Markdown（多语言站点按语言分）
- [ ] `robots.txt` 显式允许 GPTBot、ClaudeBot、PerplexityBot、Google-Extended；`sitemap.xml` 可访问

### 4. 权威信号（最高 3 分）
- [ ] 作者有可验证的简介，含 LinkedIn / GitHub / X / 出版平台的 `sameAs` 链接
- [ ] 同一身份（姓名、角色、主题）在至少 3 个平台保持一致
- [ ] 站点链接到作者实际发布的一手研究、书籍或论文

### 5. 引用信号（最高 3 分）
- [ ] 每个使用数字的主张都按名称和年份引用来源
- [ ] 每个**内容页面**（文章、指南、案例研究）同时暴露 `datePublished` 和 `dateModified`（在 JSON-LD 或可见 meta 中）。站点根目录和错误页面除外
- [ ] 比较型内容按名称和链接引用行业标准（W3C、RFC、ISO、schema.org）

### 6. 一致性信号（最高 3 分）
- [ ] 每一项数值 / 事实主张都有一个被其他所有地方引用的单一正规来源文件
- [ ] AI 面（`llms.txt`、`/ai/*.md`、URL.md 端点）与 HTML 从同一份数据生成
- [ ] CI 对关键指标做跨文件漂移检查；不为同一个 `@id` 生成重复的 JSON-LD 实体

### 评分指南

| 总分 | 区间 |
|------|------|
| 16–18 | 生产级 — 被 AI 系统积极引用 |
| 11–15 | 良好 — AI 可见但一致性不足 |
| 6–10  | 部分 — 检索、权威或一致性方面有重大缺口 |
| 0–5   | 隐形 — 从 `/llms.txt`、robots.txt、JSON-LD 开始 |

> 想要更高分？每个组件页面（知识清晰度、结构化格式、检索信号、权威信号、引用信号、一致性信号）都列出了将分数从 1 → 2 → 3 提升的具体实施。
