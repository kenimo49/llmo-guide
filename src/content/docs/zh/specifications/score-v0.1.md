---
title: "LLMOFramework Score v0.1 — Draft Specification"
description: "LLMOFramework Score v0.1 Draft 的正式定义：5 项 substrate 检查、权重、计分规则、JSON 输出 schema。参考实现：llmo-checker。"
pubDate: 2026-05-24
---

> **Status: Draft.** 这是 v0.1，首个公开版本。权重、检查项列表和 JSON 输出 shape 可能在 v0.2 发生不向后兼容的变更。如果你依赖 JSON shape，请把 checker 版本钉死。

LLMOFramework Score 是一个 0–100 的单一数字，概括一个 URL 对 AI 的可被检索程度。v0.1 的 score **只度量 substrate 信号** —— 即 AI crawler 在一次 HTTP fetch 中可以提取的静态信号，不执行 JavaScript，不调用 LLM，不模拟 retrieval。

参考实现是 OSS CLI [`llmo-checker`](https://github.com/open-llmo/llmo-checker)，由 Open LLMO Research Initiative 维护。

## 设计原则

1. **substrate 先于 behavior。** v0.1 度量的是 AI crawler 从一次 HTTP fetch 中可以提取的信号。行为类信号（citation、retrieval stability、LLM 阅读）推迟到 v0.2+。
2. **可复现。** 每项检查都是 fetch 到的 HTML、robots.txt 和 llms.txt 的纯函数。没有其他网络调用，没有 AI 调用，没有依赖时间的行为。
3. **可证伪的计分。** 每项检查都公开它的计分规则。如果你不同意某条规则，可以把 checker 和 spec 并排跑，指出它们哪里不一致。
4. **诚实的权重。** v0.1 权重是作者设定的默认值，不是从 outcome 数据里推出来的。v0.2 会用[引用相关性 pilot](/zh/experiments/dogfooding-our-own-sites/) 来重新校准。

## Score 构成

Score 是 5 项检查的加权平均：

| ID | 权重 | 度量内容 |
|---|---|---|
| `llms-txt` | 20 | `/llms.txt` 的存在性与结构 |
| `robots-ai` | 15 | `/robots.txt` 对已知 AI crawler 的明确态度 |
| `canonical` | 15 | `<link rel="canonical">` 的正确性以及 `hreflang` 替代 |
| `jsonld` | 20 | JSON-LD 结构化数据的存在性、可解析性、以及识别出的 schema.org `@type` |
| `meta` | 15 | `<title>`、`<meta name="description">`、OpenGraph、`<h1>`、`<html lang>` |

v0.1 总权重：**85**。Score 通过加权平均归一化到 0–100。

### Score 带

| 带 | Score | 含义 |
|---|---|---|
| 绿 | 85–100 | 在 AI retrieval 上根基扎实 |
| 黄 | 65–84 | 需要改进 —— 多个信号缺失或弱 |
| 黄 | 40–64 | 差 —— substrate 有显著缺口 |
| 红 | 0–39 | 危险 —— 页面对 AI crawler 几乎不可见 |

## 各项检查规范

### `llms-txt`（权重 20）

**Fetch：** `GET {origin}/llms.txt`

**计分：**

| 条件 | 分值影响 |
|---|---|
| HTTP 404 或 5xx | 0 |
| Body 为空 | 10 |
| Body 非空（base） | 60 |
| 顶层 `# Title` 行存在 | +15 |
| 至少一个 `## Section` 标题 | +10 |
| 匹配 `^- \[` 的链接条目 ≥ 3 | +15 |
| 链接条目 1–2 | +8 |
| 链接条目 0 | +5 |

**Status：** `pass` ≥ 85，`warn` ≥ 60，其他为 `fail`。

参考 spec：[llmstxt.org](https://llmstxt.org/)。

### `robots-ai`（权重 15）

**Fetch：** `GET {origin}/robots.txt`

**识别的 AI user-agent（v0.1）：** `GPTBot`、`ChatGPT-User`、`OAI-SearchBot`、`ClaudeBot`、`Claude-Web`、`anthropic-ai`、`CCBot`、`Google-Extended`、`PerplexityBot`、`Applebot-Extended`、`cohere-ai`。

**计分：**

| 条件 | 分值影响 |
|---|---|
| HTTP 404 | 60（warn —— 建议显式表态） |
| HTTP 5xx | 0 |
| Body 可解析（base） | 70 |
| 显式提及识别出的 AI bot ≥ 3 | +20 |
| 提及识别出的 AI bot 1–2 | +10 |
| 存在 wildcard `User-agent: *` 组 | +10 |

**Status：** `pass` ≥ 85，`warn` ≥ 60，其他为 `fail`。Score 上限为 100。

提及本身算分，不论规则是 `Allow` 还是 `Disallow`。v0.1 会在 JSON 输出里记录 `disallowedBots`，但不会因为 Disallow 扣分 —— 对 AI crawler 做 opt-out 是一种合理的态度。

### `canonical`（权重 15）

**来源：** 通过 fetch 拿到的 HTML。

**计分：**

| 条件 | 分值影响 |
|---|---|
| 没有 `<link rel="canonical">` | 0（fail） |
| `href` 不是合法 URL | 20（fail） |
| canonical 指向不同 origin | 60（warn） |
| canonical 指向同 origin（base） | 90（pass） |
| 存在 `<link rel="alternate" hreflang>` | +10 |

**Status：** canonical 存在且同 origin 为 `pass`，跨 origin 为 `warn`，其他为 `fail`。Score 上限为 100。

跨 origin canonical 对转载镜像是有意为之的，但默认扣分，因为它更常见的是配置错误。

### `jsonld`（权重 20）

**来源：** 通过 fetch 拿到的 HTML 中所有 `<script type="application/ld+json">` 块。

**识别的 schema.org 实体类型（v0.1）：** `Organization`、`Person`、`Article`、`BlogPosting`、`TechArticle`、`Book`、`WebSite`、`WebPage`、`BreadcrumbList`、`FAQPage`、`HowTo`、`Product`、`SoftwareApplication`。

**计分：**

| 条件 | 分值影响 |
|---|---|
| 没有 JSON-LD 块 | 0（fail） |
| 至少一个可解析的块（base） | 50 |
| 每个识别出的 `@type`（最多算 3 个） | +12 每个 |
| `Organization` 或 `Person` 存在 | +8 |
| 任何块解析失败 | −20 |

checker 会递归遍历 `@graph` 数组来收集类型。

**Status：** `pass` ≥ 85，`warn` ≥ 50，其他为 `fail`。Score 限定在 0–100。

### `meta`（权重 15）

**来源：** 通过 fetch 拿到的 HTML 的 `<head>` 和第一个 `<body>`。

**计分：**

| 信号 | 分值影响 |
|---|---|
| `<title>` 长度 20–70 | +20 |
| `<title>` 存在但长度不在 20–70 | +10 |
| `<meta name="description">` 长度 80–200 | +20 |
| description 存在但长度不在 80–200 | +10 |
| OpenGraph `title` + `description` 都存在 | +20 |
| OpenGraph `type` 存在 | +10 |
| 恰好一个 `<h1>` | +20 |
| 存在 `<html lang>` 属性 | +10 |

**Status：** `pass` ≥ 85，`warn` ≥ 60，其他为 `fail`。Score 上限为 100。

## JSON 输出 schema

CLI 的 `--json` 输出和编程 API 返回：

```typescript
interface CheckerReport {
  url: string;              // 解析后的输入 URL
  origin: string;           // 页面的 URL.origin
  timestamp: string;        // ISO 8601
  checkerVersion: string;   // CLI 的 semver
  scoreVersion: "0.1";      // 本规范的版本
  score: number;            // 加权平均，0-100
  checks: CheckResult[];
}

interface CheckResult {
  id: string;               // 稳定的检查标识符（如 "llms-txt"）
  name: string;             // 人类可读的展示名
  status: "pass" | "warn" | "fail" | "skip";
  score: number;            // 0-100
  weight: number;           // 对总分的贡献
  details: Record<string, unknown>;  // 检查特有数据
  notes: string[];          // 人类可读、可操作的说明
}
```

**v0.1 的稳定性保证：**

- 顶层字段名（`url`、`origin`、`timestamp`、`checkerVersion`、`scoreVersion`、`score`、`checks`）在所有 0.1.x 发布中保持稳定
- 每项检查的 `id`、`weight` 以及总体 `status`/`score` shape 保持稳定
- `details` shape 在 0.1.x 内 **不保证稳定** —— patch 发布中可能加新字段
- `checks` 中的 `id` 集合在 0.1.x 内保持稳定（没有 v0.2 发布的情况下不加新检查）

## 退出码（CLI）

| 码 | 含义 |
|---|---|
| 0 | Score ≥ 50（达到最低线） |
| 1 | Score < 50（低于最低线） |
| 2 | Fetch 错误（网络、DNS、非 2xx 响应） |

这让 CLI 可作为 CI smoke check：失败的站点直接让 pipeline 失败。

## 参考实现

源码：[`open-llmo/llmo-checker`](https://github.com/open-llmo/llmo-checker)

```bash
npx llmo-checker https://example.com
npx llmo-checker https://example.com --json
```

需要 Node.js 20+。

如果参考实现和这份 spec 不一致，spec 在意图上是对的，实现需要修正 —— 请[提个 issue](https://github.com/open-llmo/llmo-checker/issues)。

## v0.1 故意不度量的内容

下面这些是合理的 LLMO 关注点，但我们没有放进 v0.1，并附上原因：

| 指标 | 推迟原因 |
|---|---|
| Citation Visibility | 需要对 AI 助手做探测。超出纯静态检查范围。计划在 v0.2 作为可选 opt-in 检查。 |
| Chunk Readability | 需要选择 chunking 策略。v0.2 会用一个有文档说明的默认 chunker，使检查可复现。 |
| Markdown Quality | 仅当发布 Markdown 源时适用。v0.2 会检测 `/index.md` 这类 endpoint。 |
| 内容质量 / 准确性 | 超出范围。score 度量的是 substrate，不是编辑质量。 |
| Retrieval 在时间上的稳定性 | 需要长期探测。归 Benchmark 项目，不归 per-URL Score。 |

## 版本策略

Score 版本与参考实现版本相互独立。Score v0.1 可以由 `llmo-checker@0.1.x`（任意 patch）实现。Score v0.2 需要 `llmo-checker@0.2.x`。

Score 在 minor 版本之间（0.1 → 0.2）出现破坏性变更，是 Draft 阶段的预期行为。1.0 规范只会在 Phase 2（Community）结束之后公开 —— 也就是说，我们要先拿到 citation correlation pilot 的 outcome 数据、要有外部实现存在、要把权重重新校准。

## 贡献

Spec 的变更通过 [llmo-guide repo](https://github.com/kenimo49/llmo-guide/issues) 的 issue 进入（这是本站的源代码仓库）。

提议新检查或权重变更时：

1. 用一句话说明这是什么信号、度量什么
2. 给出计分规则（除非是 v0.2+，否则必须能从一次 HTTP fetch 中确定地算出）
3. 给出权重的依据（一篇论文、一个公开实验、或 Lighthouse 式的论证）
4. 给出可复现样例（提议规则下一个高分 URL 和一个低分 URL）

实现变更进入 [`open-llmo/llmo-checker`](https://github.com/open-llmo/llmo-checker)。

## 致谢

Score 的结构深受 [Lighthouse](https://developer.chrome.com/docs/lighthouse/)（Google）和 [llms.txt 提案](https://llmstxt.org/)（Jeremy Howard）影响。两者都设计扎实、立场明确、可证伪 —— 这些我们都努力保留下来。
