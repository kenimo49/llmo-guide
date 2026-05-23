---
title: "研究领域 — 五个方向"
description: "Open LLMO Research Initiative 的五个研究领域：AI Citation Analysis、Grounding Visibility、LLM Retrieval Optimization、AI-native Documentation、Agent-oriented Information Architecture。"
pubDate: 2026-05-24
---

Open LLMO Research Initiative 将工作划分为五个研究领域。各领域独立推进，最终汇入 [LLMOFramework Score](/zh/experimental-projects/) 的指标体系。

## 概览

| 领域 | 核心问题 |
|------|---------|
| [1. AI Citation Analysis](#1-ai-citation-analysis) | LLM 引用哪些内容？在什么条件下引用？ |
| [2. Grounding Visibility](#2-grounding-visibility) | 如何让 AI 的 grounding 来源可见？ |
| [3. LLM Retrieval Optimization](#3-llm-retrieval-optimization) | 文档应如何为 LLM 检索层优化？ |
| [4. AI-native Documentation](#4-ai-native-documentation) | LLM 最擅长处理哪种文档格式？ |
| [5. Agent-oriented Information Architecture](#5-agent-oriented-information-architecture) | 哪种信息结构最便于 AI 智能体导航？ |

---

## 1. AI Citation Analysis

### 范围

针对给定主题，分析 LLM（ChatGPT、Claude、Gemini、Perplexity）会引用哪些内容。观察对象包括引用频率、被引用文档的结构特征以及导致引用发生的 retrieval 路径。

### 关键问题

- 对同一主题，不同 LLM 之间的引用域名重合度有多高？
- 能否识别被引用文档的结构特征（heading 层级、表格、统计密度、外链数量等）？
- 能否事后构建一份 checklist，让内容更易被引用？

### 当前方向

AI 引用观测的数据采集已经开始。Phase 1 计划：将 Citation Visibility 作为指标内置进 OSS `llmo-checker`。

---

## 2. Grounding Visibility

### 范围

可视化 AI 响应的 grounding。涉及 LLM 据何生成答案，以及该来源能否回溯到可验证的一手参考。

### 关键问题

- 能否定义一个从 AI 响应反向定位到源文档的标准方法？
- 让 grounding 在网站上"可见"（明确出处、数据来源、引用格式）是否与更高的 AI 引用率相关？
- 幻觉与薄弱的 grounding 之间是否相关？

### 当前方向

已在 LLMO Framework 第五个组件 Citation Signals 中部分处理。Phase 1 计划：量化为 Grounding Stability 指标。

---

## 3. LLM Retrieval Optimization

### 范围

文档侧针对 LLM 检索层（RAG、embedding retrieval、Web 检索插件等）的优化。涉及 chunking 策略、语义结构、文档长度与 heading 设计。

### 关键问题

- 不同主题下，chunk 大小与 retrieval 精度的关系如何变化？
- Markdown、HTML、JSON-LD 之间的 retrieval 效率差距有多大？
- 内部链接密度如何影响 AI 检索的上下文扩展？

### 当前方向

llmoframework.com 本身就作为实现参考。Phase 1 计划：公开 chunking 对比实验。

---

## 4. AI-native Documentation

### 范围

研究 LLM 易于读写的文档格式。涉及 llms.txt、Markdown 约定与面向 AI 元数据的最优形态。

### 关键问题

- 实际上哪些 LLM 与爬虫会查阅 llms.txt？
- Markdown 与 HTML 之间，retrieval 效率与表达力的最佳平衡点在哪里？
- 面向 AI 的结构化元数据（JSON-LD 等）是否影响引用率？

### 当前方向

llms.txt 的实现与效果测量在持续进行。Phase 1 计划：发布 OSS 工具 llms.txt-validator。

---

## 5. Agent-oriented Information Architecture

### 范围

研究面向 AI 智能体（Claude Code、Cursor、自主 agent 等）的信息架构。涉及 MCP（Model Context Protocol）暴露、API 文档设计与可发现性。

### 关键问题

- 暴露 MCP 服务器的网站在 AI 搜索可见性上是否更有优势？
- agent-readable 的 API 文档（OpenAPI + 自然语言）是否比纯 API 参考更易被发现？
- 能否建立观察自主 agent 探索行为的方法？

### 当前方向

MCP 暴露对搜索可见性影响的实验正在进行。Phase 1 计划：提出 Agent Visibility 初步指标。

---

## 与 Phase 的对应

| 领域 | Phase 1 计划交付物 |
|------|-------------------|
| AI Citation Analysis | `llmo-checker` 中的 Citation Visibility 指标 |
| Grounding Visibility | Grounding Stability 指标 + 评测数据集 |
| LLM Retrieval Optimization | chunking 对比实验报告 |
| AI-native Documentation | OSS llms.txt-validator |
| Agent-oriented IA | Agent Visibility 初步指标 |

各领域的进展会发布在 [Changelog](/zh/changelog/) 与 [GitHub Issues](https://github.com/kenimo49/llmo-guide/issues)。
