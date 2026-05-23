---
title: "关于 Open LLMO Research Initiative"
description: "Open LLMO Research Initiative 的使命、研究原则、Founder 与 Phase 路线图。"
pubDate: 2026-05-24
---

**Open LLMO Research Initiative** 是一个独立的研究倡议，关注 AI 语境下开放网络的 retrieval、citation 和 grounding。以规范、benchmark 和开源工具作为主要交付物对外公开。

## 使命

研究 AI 原生 retrieval、grounding visibility 与面向 LLM 的信息架构，发布可复现的指标与规范。

### 研究领域

| 领域 | 范围 |
|------|------|
| AI Citation Analysis | LLM 引用内容的条件与频率分析 |
| Grounding Visibility | 可视化 AI 回答所依据来源的方法 |
| LLM Retrieval Optimization | 面向 LLM 检索层的文档优化 |
| AI-native Documentation | LLM 易于处理的文档格式研究 |
| Agent-oriented Information Architecture | AI 智能体易于操作的信息结构 |

## 为什么需要这个 Initiative

LLMO / AEO / GEO 领域正在快速扩张，但有三块基础尚不到位：

- **没有可复现的测量** — 没有公开工具能在 AI 可发现性领域承担 Lighthouse 或 PageSpeed Insights 的角色
- **没有共享的词汇与范围** — 各厂商各自给出定义，领域被切碎
- **公开实验数据稀缺** — 商业 SEO 工具占主导，研究层很薄

本 Initiative 的设立正是为了填补这三块空白。目标是为 LLMO 扮演 Lighthouse 之于 SEO 的角色：公布方法论、交付工具，留出空间让社区在其上构建。

## 研究原则

| 原则 | 含义 |
|------|------|
| Reproducibility first | 每个指标都附带计算公式与 OSS checker |
| Draft over Standard | 规范以 "Draft / Experimental / Proposal v0.1" 形式发布，保留可修订性 |
| Open Source first | 工具采用 OSS 许可证，数据采用 CC BY，规范采用 MIT |
| Solo-honest | 明确声明单人运营，不伪装成联盟 |

## Founder

[Ken Imoto](https://kenimoto.dev)。在 Zenn 和 Amazon Kindle 出版多本 LLMO 与 harness engineering 相关书籍。Propel-Lab Inc. 创始人兼 CEO。负责多个自研框架与 llmoframework.com 的实现与运营。

主要公开物：

- 书籍：[完整书单 (kenimoto.dev/books)](https://kenimoto.dev/books/)
  - LLMO 系列（Kindle / Zenn Book，日语、英语、葡语、西语）
  - Harness engineering 系列（Kindle / Zenn Book）
- Web：[kenimoto.dev](https://kenimoto.dev) / [propel-lab.co.jp](https://propel-lab.co.jp)
- Amazon 作者页：[Ken Imoto on Amazon](https://www.amazon.co.jp/stores/author/B0GQNPRCGF)
- Zenn：[zenn.dev/kenimo49](https://zenn.dev/kenimo49)
- OSS：[github.com/kenimo49](https://github.com/kenimo49)

## Phase 路线图

本 Initiative 分阶段成熟。每个 Phase 是下一 Phase 的前提。

| Phase | 范围 | 状态 |
|-------|------|------|
| Phase 0 | 研究 framing、Mission 公开、首篇 Experiment Log | 进行中 |
| Phase 1 | 可复现性 — OSS CLI (llmo-checker)、Score v0.1 Draft、数据集公开 | 计划 |
| Phase 2 | 社区 — contributors、外部引用、反馈渠道 | 计划 |
| Phase 3 | 标准化 — 正式规范、Compatible 认证徽章、Working Group 组建 | 计划 |

标准化被放在最后。没有成熟的 OSS、benchmark 与实现作为支撑，认证与规范都无法赢得信任。

## 贡献方式

| 方法 | 链接 |
|------|------|
| Issue / Bug 报告 | [github.com/kenimo49/llmo-guide/issues](https://github.com/kenimo49/llmo-guide/issues) |
| Pull Request | [github.com/kenimo49/llmo-guide](https://github.com/kenimo49/llmo-guide) |

## 许可证

本站全部内容与所有 draft spec 均以 [MIT License](https://opensource.org/licenses/MIT) 发布。
