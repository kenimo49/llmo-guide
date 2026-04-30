---
title: "5. 引用信号"
description: "引用信号提供参考文献、来源和元数据，使AI能够验证主张。添加统计数据可将AI引用率提升+115.1%（GEO, KDD 2024）。"
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO Component 5: Citation Signals",
        "description": "Providing references and verifiable data that AI systems can cite. Statistics addition improves visibility by +115.1%.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

## 定义

引用信号是你的内容中提供的参考文献、来源和元数据，它们使AI系统能够验证主张、追溯出处，并增强引用你的内容的信心。

## 为什么重要

LLM越来越倾向于为其回答提供来源支撑。包含可验证参考文献的内容更容易被引用，因为AI可以将你的主张与其他来源交叉验证，从而增强对你内容准确性的信心。

## 实施方法

### 1. 链接到一手来源
在提出主张时，直接链接到原始来源：
- 学术论文（附DOI或arXiv链接）
- 官方文档
- 原始公告或新闻稿

### 2. 包含发布日期
始终为内容标注日期。AI系统利用日期来：
- 判断信息的时效性
- 解决信息冲突（倾向于引用更新的来源）
- 在回答中提供时间背景

### 3. 提供版本信息
对于技术内容、文档或持续演进的框架：
- 注明引用的软件/API版本
- 包含"最后更新"日期
- 记录重大更新的变更日志

### 4. 引用标准和规范
在适用的情况下，引用已确立的标准：
- W3C规范
- RFC文档
- ISO标准
- 行业框架

### 5. 使用规范的学术引用格式
对于研究导向的内容，使用AI系统可解析的引用格式：
- 作者姓名、年份、标题、发表场所
- DOI或稳定URL
- 会议或期刊名称

## 示例

**❌ 无引用：**
> 研究表明，结构化数据能提升AI可发现性。

**✅ 规范引用：**
> Aggarwal等人（2024）证明，结构化内容格式可将生成式搜索引擎中的可见度提升高达40%（GEO: Generative Engine Optimization, KDD 2024, [arXiv:2311.09735](https://arxiv.org/abs/2311.09735)）。

## 检查清单

- [ ] 主张有一手来源的链接支撑
- [ ] 所有内容包含发布日期或最后更新日期
- [ ] 技术引用注明了版本号
- [ ] 学术引用包含作者、年份、标题和发表场所
- [ ] 链接指向稳定的URL（DOI、arXiv、官方文档）
