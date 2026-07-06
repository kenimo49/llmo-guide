---
title: LLMO vs SEO vs AEO vs GEO
description: "LLMO、SEO、AEO、GEO的比较。LLMO是涵盖AEO和GEO，同时覆盖所有LLM交互场景的上位框架。"
pubDate: 2026-04-30
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "LLMO、SEO、AEO和GEO有什么区别？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "SEO针对搜索引擎排名（Google、Bing）进行优化。AEO针对答案引擎（语音助手、精选摘要）中的直接回答进行优化。GEO针对生成式搜索引擎（ChatGPT、Perplexity）中的可见度进行优化。LLMO是涵盖AEO和GEO的上位术语，并延伸至所有LLM交互，包括直接聊天查询、RAG应用和自主AI agent。"
            }
          },
          {
            "@type": "Question",
            "name": "LLMO、AEO和GEO是什么关系？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "LLMO是同时包含AEO（以答案引擎为重点）和GEO（以生成式搜索为重点）的更广泛上位概念。AEO是GEO的子集，GEO是LLMO的子集。LLMO还额外涵盖较窄术语未涉及的直接LLM查询和AI agent。"
            }
          },
          {
            "@type": "Question",
            "name": "应该优化哪一个？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "对LLMO进行优化会将AEO和GEO作为副效果覆盖，因为LLMO是超集。只针对SEO优化的站点仍然能在Google排名，但可能对ChatGPT、Claude、Gemini和Perplexity不可见。如果你的受众使用AI工具发现内容，就从LLMO开始。"
            }
          },
          {
            "@type": "Question",
            "name": "LLMO和SEO会冲突吗？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "部分冲突。LLMO策略相对于SEO分为三类：共存策略（内容精简、结构化标题、统计数据和引用）对两者都有效；条件性策略（内部链接、关键词一致性）根据执行方式有利有弊；冲突策略（激进的结论先行改写、过度压缩正文内容）可能在提高AI引用的同时降低停留时间、话题深度和搜索流量。共存策略全站适用，冲突策略按页面角色分配，SEO和LLMO使用独立指标衡量。"
            }
          }
        ]
      }
---

## 搜索优化的演进

```
1997: SEO — 针对搜索引擎优化
2018: AEO — 针对答案引擎优化
2023: GEO — 针对生成引擎优化
2024: LLMO — 针对所有LLM交互优化
```

## 对比

| | SEO | AEO | GEO | LLMO |
|---|---|---|---|---|
| **侧重点** | 搜索排名 | AI回答 | 生成式搜索 | 所有LLM交互 |
| **目标平台** | Google、Bing | 语音助手、AI搜索 | AI搜索引擎 | ChatGPT、Claude、Gemini、Perplexity |
| **学术支撑** | 数十年的研究积累 | 有限 | 普林斯顿大学（KDD 2024） | 新兴领域 |
| **框架** | 成熟完善 | 非正式 | 以研究为导向 | LLMO Framework（6大组件） |
| **覆盖范围** | 网页搜索 | 较窄（仅限答案） | 较窄（仅限生成式搜索） | 广泛（所有LLM场景） |

## 相互关系

LLMO涵盖了AEO和GEO等方法，同时将覆盖范围扩展到搜索之外，涵盖LLM与网络内容交互的所有场景。

```
LLMO（所有LLM交互）
├── GEO（生成式搜索引擎）
│   └── AEO（以答案为核心的搜索）
└── 直接LLM查询（ChatGPT、Claude等）
    └── 基于RAG的应用
    └── AI Agent的网页浏览
```

## LLMO和SEO会冲突吗？

部分冲突——"将所有LLMO策略应用于所有页面"正是站点发现这一冲突的典型方式。在一个有据可查的案例中，一个在所有页面统一采用结论先行改写、压缩正文和问题形式标题的站点，在一个月内AI引用增加，但Google Search Console显示现有搜索流量下降（[实测报告，日文](https://zenn.dev/kenimo49/articles/llmo-seo-tradeoff-coexist-design)）。

相对于SEO，LLMO策略分为三类：

**1. 共存策略——无需犹豫，全站适用**

- **内容精简**：合并薄页面或重复页面对SEO（链接权重、质量信号）和LLMO都有效——多个URL竞争同一概念在生成引擎看来是低置信度的表现。精简时应与保持留存页面更新同步：停止更新的页面引用频率会下降。
- **结构化标题和Q&A格式**：为AI提供更丰富的提取体验，为搜索提供更丰富的摘要。
- **统计数据和引用来源**：最强的共存策略。GEO研究表明添加统计数据能提高引用率；同样的一手数据也直接强化了E-E-A-T。Google自身的AI优化指南将生成式可见度定位为强SEO的延伸，而非替代。

**2. 条件性策略——结果取决于执行方式**

- **内部链接**：不重新指向链接就进行精简会产生孤立页面，破坏人类导航和爬虫路径。精简和重新链接应作为一项操作同步进行。
- **关键词**：密度型重复会可测量地*降低*AI可见度，而一致的实体级别术语对两种引擎都有效。一致性比密度更重要。

**3. 冲突策略——按页面角色分配，绝不统一适用**

- **结论先行结构**提高AI引用（实时检索根据开头段落判断相关性），但当读者在开头就获得完整答案时，可能降低停留时间和滚动深度。
- **过度压缩**使块更易于提取，但剥夺了搜索奖励的话题深度和长尾覆盖。解决方案在于结构：保持开头摘要和章节引导句简洁，保持总体内容深度，用列表和表格使深层内容可提取。缩短的是*到达答案的距离*，而非内容本身。

解决方案是按页面角色分配：词汇表和FAQ页面完全采用结论先行；案例研究和深度技术页面保留开头摘要但保持深度。不要试图在单个页面上同时最大化两个方向。

**分别衡量两个方向。** 混合仪表板会将权衡平均掉——AI引用增加的同时，搜索流量悄然下降。通过Search Console（流量、排名）追踪SEO，通过全新会话中的直接AI查询追踪LLMO（指标见[衡量LLMO](/zh/guide/measuring-llmo/)）。只有并排追踪才能揭示某一策略实际的交换比率。
