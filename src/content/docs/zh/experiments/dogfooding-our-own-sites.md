---
title: "Dogfooding LLMO Score v0.1：我们把 Checker 跑在了自己的 6 个站点上"
description: "我们用刚发布的 llmo-checker CLI 测量了运营中的 6 个站点 —— 包括 LLMOFramework 背后实验室的官网。官网得分 29 / 100。"
pubDate: 2026-05-24
---

Open LLMO Research Initiative 的第一篇 **Public Experiment Log**。

我们刚刚发布了 [`llmo-checker`](https://github.com/open-llmo/llmo-checker)，一个 Lighthouse 风格的 CLI，用来度量一个 URL 对 AI 的可被检索程度（v0.1 Draft）。我们用它做的第一件事，是把每个我们运营的站点都过了一遍 —— 包括这个 initiative 所属实验室的官网。

结果的标题是: **我们自己的官网得分 29 / 100**，比它本应作为参照的所有面向消费者的站点都要低。

## 方法

- 工具：`npx llmo-checker <url>` v0.1.0 (commit `1db47ea`)
- 日期：2026-05-24
- 站点：6 个我们拥有或运营的资产
- 得分：5 项静态检查的加权平均 —— `llms-txt`（权重 20）、`robots-ai`（15）、`canonical`（15）、`jsonld`（20）、`meta`（15）
- 得分带：85+ well-grounded · 65–84 needs work · 40–64 poor · 0–39 critical

所有检查都是纯 HTTP fetch 加 HTML 解析。v0.1 不做 AI 引用模拟：得分度量的是 AI crawler 实际能看到的 **substrate**（基底）。

## 结果

| 站点 | 角色 | 得分 | 带 | 最弱的 check |
|---|---|---|---|---|
| `llmoframework.com` | 本 initiative 的站点 | **96** | well-grounded | `llms-txt` 缺链接列表（无关紧要） |
| `kenimoto.dev` | 作者个人站 | **96** | well-grounded | 同上 |
| `legacydram.com` | 威士忌 × 工程师媒体 | **93** | well-grounded | JSON-LD 不完整（没有 `Organization`/`Person`） |
| `mypcrig.com` | PC 装机精选 | **90** | well-grounded | 无 `hreflang`（单语言站可以）+ JSON-LD 不完整 |
| `kaoriq.com` | 香水电商 | **90** | well-grounded | robots.txt 没有针对 AI bot 的明确规则 |
| **`propel-lab.com`** | **运营实验室的官网** | **29** | **critical** | 几乎全部 |

`propel-lab.com` 就是运营这个 initiative 的实验室官网。它的得分比我们出货的所有面向消费者的产品站都低。

## 官网为什么挂了

对根路径 `curl` 一下，整个故事就出来了：

```bash
$ curl -s https://propel-lab.com/
<!DOCTYPE html><html><head><script>window.onload=function(){window.location.href="/lander"}</script></head></html>
```

`propel-lab.com` 的根路径就是 **一行 HTML**。`window.location.href` 的跳转在浏览器里执行，把访客送到 `/lander`。

对用 Chrome 的人来说没问题。但对我们所知的所有 AI crawler 都是不可见的。GPTBot、ClaudeBot、CCBot、Google-Extended、PerplexityBot、Applebot-Extended 里没有一个在 fetch 时执行 JavaScript。它们看到上面这行原始 HTML，然后就停了。

所以在根 URL（AI 系统首先会探测的那一个）上，checker 发现：

- 没有 `<title>`
- 没有 `<meta name="description">`
- 没有 OpenGraph
- `<h1>` 元素 0 个
- 没有 `<html lang>`
- 没有 JSON-LD
- 没有 `<link rel="canonical">`

然后我们把 checker 对着 **跳转目标** `https://propel-lab.com/lander` 又跑了一次。得分 **31 / 100**，也是 critical。目标页有内容，但没有 canonical，没有 JSON-LD，元数据也弱。

两层都没过。

## 这意味着什么

有一种常见模式：团队在官网上发布一个 "splash → landing" 结构，假定 Google 处理 JS 没问题，从来不检查页面在不执行 JS 的 crawler 眼里是什么样。这个假定对 Google search 来说大致成立。**对 2026 年的 AI crawler 来说大致不成立。**

我们这边，一个 *专注 LLMO* 的实验室的官网，正好掉进了这个坑里。我们抓到这个问题，是因为我们做了一个工具，强迫我们去看 substrate。没有这个工具，我们会一直假定一切正常，因为面向人的 UX 看起来很干净。

这就是把 checker 开源的全部意义。substrate 上的缝隙，在你测量之前是看不见的。

## 我们会改什么

作为这次实验的结果，加入我们的公开 backlog：

1. **`propel-lab.com/` 换成 server-side redirect** —— 把 JS 跳转换成 301，或者把 landing 内容直接渲染到根
2. **给 `/lander` 加 canonical + JSON-LD `Organization` + OG metadata** —— 把它单独的得分从 31 拉到 ≥ 85
3. **把 checker 加进 smoke step** —— 把这个审计塞进我们自己的 deploy pipeline，让未来的回归立刻浮出来
4. **改进 `mypcrig.com` 和 `kaoriq.com` 的 JSON-LD 覆盖** —— 两个在 `jsonld` 都停在 82 / 100，因为只发出了一部分相关类型（`Product`、`Person`、`Article`）
5. **给 `kaoriq.com` 的 robots.txt 加上明确的 AI bot 策略** —— 当前是中性的；我们想对 GPTBot / ClaudeBot / Google-Extended 做明确的 opt-in

做完这些以后，我们会发一篇 follow-up 的 Experiment Log，附上重新测的得分。delta 有没有都如实写。

## 为什么把坏分发出来

发布一个测量工具的时候，自然会有一种强烈的冲动 —— 拿它主要去测竞争对手。我们刻意反过来：`llmo-checker` 的第一份公开数据，是 **我们自己的资产**，包括分数最差的那一个。

两个理由：

1. **得分必须是可证伪的。** 如果我们从来没在自己的东西上发出过一个不及格的分，外界没有理由相信这个评分是诚实的。
2. **这个 initiative 的信用来自 artifact，不来自 framing。** 一个把自己官网在 29 / 100 公开的实验室，比一个发宣言加给自己打 100 / 100 的实验室更可信。

## 本实验的局限

- v0.1 只测 substrate。一个站点可能 substrate 上拿 95 分，但仍然得到零 AI 引用，原因可能是内容本身没意思、与已知事实矛盾、或者重复了权威更高的来源。Citation Visibility 留给 v0.2。
- 得分的权重（`llms-txt` 20、`robots-ai` 15、`canonical` 15、`jsonld` 20、`meta` 15）是作者设定的默认值，没有经过验证。是合理的默认，不是从 outcome 数据里推导出来的。我们打算在 Phase 2 收集引用 outcome 数据时重新校准。
- 我们只测了首页。每个站点的文章页可能得分不同。

## 复现这个实验

```bash
npx llmo-checker@0.1.0 https://llmoframework.com/
npx llmo-checker@0.1.0 https://kenimoto.dev/
npx llmo-checker@0.1.0 https://legacydram.com/
npx llmo-checker@0.1.0 https://mypcrig.com/
npx llmo-checker@0.1.0 https://kaoriq.com/
npx llmo-checker@0.1.0 https://propel-lab.com/
npx llmo-checker@0.1.0 https://propel-lab.com/lander
```

加 `--json` 拿机器可读的输出。把版本钉死（`@0.1.0`）—— JSON 的 shape 可能在 v0.2 变。

## 下一步

这是 Public Experiment Log 系列的第一篇。我们计划跑的下两篇：

- **外部 baseline 面板** —— 给几十个高流量技术站点（文档门户、开发者博客、产品营销站）打分，把分布公开。给"正常长什么样"做校准。
- **引用相关性 pilot** —— 对 ~50 个 URL，比较 LLMO Score 和真实的 AI 引用率（探测 ChatGPT、Claude、Perplexity）。这是对 score 是否真的能预测它声称要预测的 outcome 的第一次真测试。

完整 roadmap 在 [Experimental Projects](/zh/experimental-projects/)，v0.1 的权重定义在 [Score v0.1 Draft Specification](/zh/specifications/score-v01/)。
