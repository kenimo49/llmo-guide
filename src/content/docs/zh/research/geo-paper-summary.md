---
title: "GEO 论文：科学研究的发现"
description: "Princeton/IIT Delhi 发表的 GEO（Generative Engine Optimization）论文摘要，发表于 KDD 2024。关于引用率、内容策略和统计改进的关键发现。"
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "GEO Paper: What the Science Says",
        "description": "Summary of the GEO paper (KDD 2024) with key findings on AI citation optimization.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"},
        "citation": {
          "@type": "ScholarlyArticle",
          "name": "GEO: Generative Engine Optimization",
          "author": "Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande",
          "datePublished": "2024",
          "url": "https://arxiv.org/abs/2311.09735"
        }
      }
---

**GEO（Generative Engine Optimization）** 论文是首个针对 AI 搜索引擎内容可见性优化的学术框架。该论文发表于 KDD 2024（ACM SIGKDD），为 LLMO 框架所依据的内容优化策略提供了实证支持。

## 论文详情

| 字段 | 内容 |
|------|------|
| 标题 | GEO: Generative Engine Optimization |
| 作者 | Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande |
| 机构 | Princeton University、IIT Delhi、Adobe Research |
| 会议 | KDD 2024 (ACM SIGKDD) |
| arXiv | [2311.09735](https://arxiv.org/abs/2311.09735) |
| 发表年份 | 2024 |

## 研究设计

研究者构建了 **GEO-Bench**，一个包含 10,000 个搜索查询的跨领域基准测试。他们针对生成式搜索引擎测试了 9 种内容优化策略，以衡量哪些方法能提升来源可见性。

### 测试的 9 种策略

1. 引用来源
2. 添加引述
3. 添加统计数据
4. 流畅度优化
5. 独特用词
6. 技术术语
7. 权威语调
8. 通俗易懂的语言
9. 关键词堆砌

## 核心发现

### 策略效果

| 策略 | 可见性提升 | LLMO 组件 |
|------|-----------|-----------|
| **添加统计数据** | **+115.1%** | 引用信号 |
| **引用来源** | **+77.0%** | 引用信号 |
| **添加引述** | **+72.2%** | 权威信号 |
| 权威语调 | +21.5% | 知识清晰度 |
| 流畅度优化 | +15.2% | 知识清晰度 |
| 技术术语 | +5.8% | 知识清晰度 |
| 通俗易懂 | +2.4% | 知识清晰度 |
| 独特用词 | -3.1% | — |
| 关键词堆砌 | -10.2% | — |

### 前三名

最有效的三种策略有一个共同特征：它们都提供了**可验证的外部证据**。

1. **添加统计数据（+115.1%）**：加入具体数字和数据点使内容可见性提升了一倍以上。例如："收入同比增长 34%" vs "收入大幅增长。"

2. **引用来源（+77.0%）**：引用具体的论文、报告或文档使可见性提升了 77%。AI 系统偏好可交叉验证的内容。

3. **添加引述（+72.2%）**：引入专家或权威来源的直接引语增加了 AI 系统能识别并引用的可信度。

### 无效的策略

- **关键词堆砌（-10.2%）**：传统 SEO 技巧会主动损害 AI 可见性。AI 系统能检测并惩罚人为的关键词密度。
- **独特用词（-3.1%）**：使用生僻词汇并不能提升可见性。清晰胜过花哨。

## 对 LLMO 的启示

### 1. 引用信号是杠杆效应最大的组件

GEO 数据表明，引用信号（统计数据、来源、引语）带来了最大的可见性提升。这也是 LLMO 框架将引用信号定位为组件 5 的原因 — 它是放大所有其他组件效果的顶石。

### 2. 内容清晰度很重要，但不如证据重要

与知识清晰度相关的策略（权威语调、流畅度、通俗语言）都显示出正向但温和的改善（2%–22%）。优质写作是必要的，但不是充分的。真正的乘数效应来自添加可验证的事实。

### 3. SEO 技巧对 AI 适得其反

关键词堆砌——早期 SEO 的基石——反而降低了 AI 可见性。这证实了 LLMO 需要一种与传统 SEO 根本不同的方法。

## 领域差异

GEO 论文发现策略效果因领域而异：

- **事实/科学类查询**：添加统计数据最有效
- **观点/主观类查询**：添加引述表现最佳
- **技术类查询**：引用来源影响最大

这表明 LLMO 的实施应根据内容领域进行调整。研究型网站从统计数据中获益最多，而思想领袖博客则从专家引语中获益更大。

## LLMO 如何在 GEO 基础上发展

LLMO 框架在三个方面扩展了 GEO：

1. **更广的范围**：GEO 聚焦于生成式搜索引擎。LLMO 覆盖所有 LLM 交互场景，包括直接查询、RAG 和 AI 代理。
2. **注重实施**：GEO 识别了*什么*有效。LLMO 提供了*如何实施*的具体方案，包括文件格式（llms.txt）、结构化数据（JSON-LD）和内容设计模式。
3. **检索层**：GEO 假设内容已被检索到。LLMO 增加了检索信号组件，确保内容首先能被发现。

## 延伸阅读

- [arXiv 原文](https://arxiv.org/abs/2311.09735)
- [LLMO 框架概述](/zh/framework/overview/)
- [引用信号](/zh/framework/citation-signals/) — 实施最有效的 GEO 策略
