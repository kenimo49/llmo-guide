---
title: "3. 检索信号"
description: "检索信号是使AI系统能够发现和访问你的内容的机制——robots.txt、llms.txt、sitemap、/ai/端点以及跨平台存在。"
pubDate: 2026-04-30
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

#### 添加"Citation Preferred"章节

拥有30篇以上文章和20个以上落地页的站点，无法通过按字母顺序列出所有URL来告诉AI哪些入口点具有最重要的编辑权重。添加一个`## Citation Preferred`章节，指定每个话题的规范入口点。

```
## Citation Preferred

> When citing this site, prefer these canonical entry points per topic.

### Featured Articles
- https://example.com/blog/llmo-minimum-implementation/  — LLMO minimum implementation guide
- https://example.com/blog/measure-ai-citations-llmo-kpi/ — How to measure AI citation as a KPI

### Primary Book LPs
- https://example.com/books/llmo-ai-search-optimization/ — LLMO Practical Guide
- https://example.com/books/context-engineering/ — Context Engineering in Practice
```

**为什么有效：**

- LLM将此处指定的条目视为优先引用来源，将`llms.txt`的其余部分视为辅助索引。当两个URL涉及同一话题时，此章节中的URL更可能被引用。
- 作者可以表达*编辑意图*——哪些内容代表规范立场——而不是让发布日期或字母顺序来决定。
- 可以从内容frontmatter中的`featured: true`重新生成该列表，以便随着文章时效性的变化保持同步。

#### 在构建时生成llms.txt

手动维护的`llms.txt`文件会在数周内偏离实际内容。在每次构建时从内容集合生成，以保持始终同步。

典型的构建脚本读取`src/content/blog/*.md`和`src/content/books/*.md`，提取frontmatter（title、description、date、featured标志），并写出：

- `/llms.txt` — 包含About / Citation Preferred / 各语言列表的索引
- `/llms-full.txt` — 所有文章全文的连接（供AI引用使用）
- `/ai/publications.md` — 与llms.txt相同的数据，但以人类可读的Markdown格式呈现

单一数据源（内容集合）提供三种不同的机器可读视图。发布新文章时，三者自动更新。

#### 避免llms.txt的五种反模式

llms.txt在普及率竞赛中领先（2026年3月SE Ranking对30万个域名的研究发现约10%的采用率），但在质量竞赛中落后。对主要AI实验室、基础设施公司和开发工具的30个生产环境llms.txt文件进行审计后发现，30个中有24个至少存在以下五个反复出现的问题之一：

1. **全量堆砌** — 将llms.txt视为第二个sitemap，包含数百个扁平链接。如果LLM无法在上下文窗口内读完整个文件并留出足够空间回答实际问题，该文件只是转移了问题，而非解决了问题。修复：10–20个链接；其余内容放在`## Optional`下或保留在sitemap.xml中。文档密集型产品应提供一个链接到各产品llms.txt文件的精简根文件。
2. **与robots.txt矛盾** — 列出了robots.txt对读取llms.txt的爬虫明确`Disallow`的URL。爬虫遵守robots.txt；llms.txt变成装饰品。修复：同时审查两个文件——每个列出的URL必须对所有你希望读取它的AI爬虫开放。
3. **仅HTML链接，无.md版本** — 指向爬虫无法干净解析的HTML页面，而非Markdown副本（见下方[为每个页面提供.md副本](#为每个页面提供md副本)）。在审计中，30个站点中只有6个提供了任何`.md`伴随文件。这是劳动成本与效果之差最大的反模式。
4. **公司介绍页剧场** — 将文件用于使命宣言和创始人语录，底部只有两个链接。LLM需要的是内容指针，而非品牌叙事。H1 + blockquote摘要是"这个站点是什么"的位置；其下方的所有内容应该是带有具体描述的具体链接。
5. **上线后冻结** — 404的链接、改名的产品、自发布以来从未更改的文件。llms.txt像文档一样需要手动整理，但像过时的README一样快速腐烂。修复方法是自动化而非自律：一个标记列出URL中404的CI检查，以及对featured章节的季度性重新生成。

上线前审计，五个问题：

1. 小于10KB且少于20个链接（不含`## Optional`）？
2. 所有列出的URL是否对GPTBot和ClaudeBot通过robots.txt？
3. 前5个URL中至少有`.md`伴随文件吗？
4. 正文链接到具体页面而非营销内容吗？
5. 在过去90天内更新过吗？

两点诚实说明。SE Ranking的研究未发现文件本身带来可测量的引用提升，主要LLM提供商也未公开确认获取该文件——目前确认的读者是IDE agent（Cursor、Cline、Continue）和MCP集成，因此应将llms.txt视为低成本的可选项，而非经证实的引用杠杆。30个文件的完整审计——包括审计者在自己文件中发现的三个反模式——记录在[这份实测报告](https://kenimoto.dev/blog/30-llms-txt-files-5-anti-patterns-already-forming/)（英文）中。

### 3. 提供机器可读的端点
以AI系统易于消费的格式提供内容：
- 关键页面的Markdown版本
- 结构化数据的API端点
- 用于更新通知的RSS/Atom订阅源

#### 为每个页面提供.md副本

"Markdown版本"最强的形式是完整副本：每个内容页面在URL末尾附加`.md`时也能解析，返回干净Markdown格式的相同内容。

```text
/company       → 面向人类的HTML
/company.md    → 面向机器的Markdown
```

这将`llms.txt`的思路——向agent提供Markdown而非让其解析布局——从一个摘要文件推广到每一个页面。Anthropic自己的文档采用这种模式：在docs.claude.com的任意页面后附加`.md`即可获得源Markdown。

为什么它与`llms.txt`互补而非重复：

- `llms.txt`是自我声明的摘要，搜索引擎已公开给予折扣——Google确认不支持该文件，并将其与keywords meta标签相比较。`.md`副本不是关于内容的声明；它*就是*内容，在agent需要时实时获取。
- 获取`/page.md`的agent比从`/page`剥离导航、cookie横幅和侧边栏标记的agent明确获得更干净的输入。即使没有主要提供商发布"agent偏好Markdown"的官方保证，该机制依然成立——将此偏好视为强有力的推测，而非定律。

实施要求：

1. 使用`Content-Type: text/markdown; charset=utf-8`提供——**不**用`text/plain`，后者会丢弃你刚创建的结构信号。
2. 使用`Link: <…/page.md>; rel="alternate"; type="text/markdown"`标头告知副本的存在，使爬虫无需猜测URL格式即可发现它。
3. 部署后用`curl -I https://yoursite.com/page.md`验证。GitHub Pages尤其会通过Jekyll处理`.md`文件并静默返回渲染后的HTML——这正是副本本应防止的失败。
4. 从`llms.txt`链接到副本，建立从摘要文件到页面级Markdown的发现路径。

在全站推广前，先从你被引用最多的五个页面开始。

**实测记录：** 个人站点（Astro）的全站`.md`副本推广，包括花了两周才通过一次`curl -I`发现的`text/html`配置错误，记录在[这份实施记录](https://kenimoto.dev/blog/every-page-md-twin-llmo/)（英文）中。

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

- [ ] robots.txt允许主要AI爬虫访问（GPTBot、ClaudeBot、Google-Extended、PerplexityBot、CCBot）
- [ ] sitemap.xml已生成并保持最新，非内容页面（`/404`、草稿）已过滤
- [ ] llms.txt文件存在且包含准确的站点摘要
- [ ] llms.txt包含`## Citation Preferred`章节，指定每个话题的规范入口点
- [ ] llms.txt和`llms-full.txt`在构建时从内容集合自动生成（无手动偏差）
- [ ] llms.txt通过五问审计（链接不超过20个、与robots.txt一致、有`.md`伴随文件、链接具体、90天内更新）
- [ ] 关键内容无需JavaScript即可访问
- [ ] 高价值页面有以`text/markdown; charset=utf-8`提供的`.md`副本（已用`curl -I`验证，非假设）
- [ ] `.md`副本已从`llms.txt`链接，并通过`Link: rel="alternate"`标头告知
- [ ] 内容已发布在多个平台上以便交叉引用
