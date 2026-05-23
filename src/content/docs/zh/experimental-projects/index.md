---
title: "实验性项目"
description: "Open LLMO Research Initiative 的三个实验性项目：LLMOFramework Score、LLMOFramework Benchmark 与 LLMOFramework Compatible。"
pubDate: 2026-05-24
---

由 Open LLMO Research Initiative 发布的实验性项目。全部以 **Draft / Experimental** 状态交付。正式规范状态延后至 Phase 3。

## 概览

| 项目 | 作用 | 类比 | 状态 |
|------|------|------|------|
| [1. LLMOFramework Score](#1-llmoframework-score) | 衡量网站的 AI 可发现性 | Lighthouse Score | 指标制定中（Phase 1 发布 Draft v0.1） |
| [2. LLMOFramework Benchmark](#2-llmoframework-benchmark) | 实验性对比网站结构 | 行业基准 benchmark | 规划中（Phase 1-2） |
| [3. LLMOFramework Compatible](#3-llmoframework-compatible) | 面向合规网站的认证徽章 | "Certified" 标记 | 仅在路线图中（Phase 3） |

---

## 1. LLMOFramework Score

### 衡量什么

按网站打分，评估内容对 AI 的可识别性、可引用性与可解析性。AI 时代对应 SEO 的 Domain Authority 或 Lighthouse Score 的角色。

### 候选指标（v0.1 Draft）

| 指标 | 描述 |
|------|------|
| Citation Visibility | 内容是否被 AI 引用 |
| Chunk Readability | 内容拆分为 chunk 的可读性 |
| Semantic Structure | 语义结构的明确程度 |
| AI Crawlability | 对 AI crawler 的兼容性 |
| llms.txt | llms.txt 合规性 |
| Markdown Quality | 结构质量 |
| Entity Clarity | 实体识别难易程度 |
| Retrieval Stability | retrieval 的稳定性 |

每个指标都附带 **计算公式与 OSS checker 代码**。Lighthouse 之所以赢得信任，是因为它"可测量、可复现"，本项目沿用相同原则。

### 关联 OSS

`llmo-checker` 计划在 Phase 1 发布。

```
npx llmo-checker https://example.com

LLMOFramework Score: 74

Citation Visibility: 81
Semantic Chunkability: 68
AI Readability: 77
Grounding Stability: 70
```

### 状态

指标定义制定中。Draft v0.1 发布时间瞄准 Phase 1（具体时间待定）。

---

## 2. LLMOFramework Benchmark

### 对比什么

实验性比较哪种网站结构对 AI 表现更好。AI retrieval 与 citation 领域尚无标准 benchmark，本项目先行提出测量方法论。

### 候选对比轴

- Markdown vs HTML
- 是否使用 FAQ schema
- 表格结构
- chunk 大小
- citation 格式
- 内部链接
- 与 GitHub 的集成
- llms.txt 合规
- MCP 暴露

### 发布方针

每次实验都以 **Reproducible Benchmark Report** 的形式发布到 GitHub 与本站，包含数据集、测量脚本、原始结果与评测 prompt。

### 状态

规划中。首个对比实验（Markdown vs HTML 的 retrieval 效率）计划在 Phase 1 进行。

---

## 3. LLMOFramework Compatible

### 徽章的用途

面向符合 AI 优化结构的网站的认证标记。预期面向 SaaS、文档站、OSS 项目与 AI 产品。

### 视觉示意

```
[ LLMOFramework Compatible ]
[ AI Retrieval Ready ]
[ Grounding Optimized ]
```

### 合规要求（Draft 概念）

| 要求 | 内容 |
|------|------|
| llms.txt 放置 | 站点根目录存在有效的 llms.txt |
| Semantic Structure | 主要页面满足 heading 层级与语义 HTML |
| Chunk Optimization | 主要章节落在推荐 chunk size 区间内 |
| Grounding-friendly Docs | 引用来源、数据来源与更新日期均明示 |

### 状态

**仅在路线图中**。位置在 Phase 3（最后）。原因：

- 认证依赖生态采用度，因此 Score 与 Benchmark 必须先行成熟
- 单人运营阶段发认证会显得"权威感先行"，反而损害信任
- Compatible 徽章只有在 Open Source 社区出现第三方采用之后才进入设计阶段

---

## 与 Phase 的对应

| Phase | 项目进展 |
|-------|---------|
| Phase 0（当前） | 指标制定，项目概念公开 |
| Phase 1 | Score Draft v0.1，OSS `llmo-checker`，首份 Benchmark Report |
| Phase 2 | Score 修订，Benchmark 持续更新，社区反馈整合 |
| Phase 3 | Compatible 认证设计，规范正式化，Working Group 组建 |

每个项目的源码与讨论均公开于 [GitHub 仓库](https://github.com/kenimo49/llmo-guide) 与 [Issues](https://github.com/kenimo49/llmo-guide/issues)。
