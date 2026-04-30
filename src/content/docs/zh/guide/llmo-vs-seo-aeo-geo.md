---
title: LLMO vs SEO vs AEO vs GEO
description: "LLMO、SEO、AEO、GEO的比较。LLMO是涵盖AEO和GEO，同时覆盖所有LLM交互场景的上位框架。"
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO vs SEO vs AEO vs GEO",
        "description": "Comparison of search optimization approaches: LLMO, SEO, AEO, and GEO.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
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
| **框架** | 成熟完善 | 非正式 | 以研究为导向 | LLMO Framework（5大组件） |
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
