---
title: "Dogfooding LLMO Score v0.1：我们把 Checker 跑在了自己的 6 个站点上"
description: "我们用刚发布的 llmo-checker CLI 测量了运营中的 6 个站点。全部 90 以上。更有意思的结果是我们差点发布、但在上线前撤下的那一份。"
pubDate: 2026-05-24
---

Open LLMO Research Initiative 的第一篇 **Public Experiment Log**。

我们刚刚发布了 [`llmo-checker`](https://github.com/open-llmo/llmo-checker)，一个 Lighthouse 风格的 CLI，用来度量一个 URL 对 AI 的可被抓取程度（v0.1 Draft）。我们用它做的第一件事，是把每个我们运营的站点都过了一遍。

订正后的结果标题：**我们拥有的六个站点全部拿到 90 或以上**。这次实验更有用的产物是这个 *订正* 的经过本身 —— 完整记录在下面。

## 方法

- 工具：`npx llmo-checker <url>` v0.1.0
- 日期：2026-05-24
- 站点：我们拥有或运营的 6 个站点
- 得分：5 项静态检查的加权平均 —— `llms-txt`（权重 20）、`robots-ai`（15）、`canonical`（15）、`jsonld`（20）、`meta`（15）
- 评分档位：85+ well-grounded · 65–84 needs work · 40–64 poor · 0–39 critical

所有检查都仅做 HTTP 抓取和 HTML 解析。v0.1 不做 AI 引用模拟：得分度量的是 AI crawler 实际能看到的 **substrate**（基底）。

## 结果

| 站点 | 角色 | 得分 | 档位 | 最弱检查项 |
|---|---|---|---|---|
| `llmoframework.com` | 本 initiative 的站点 | **96** | well-grounded | `llms-txt` 缺链接列表（无关紧要） |
| `kenimoto.dev` | 作者个人站 | **96** | well-grounded | 同上 |
| `propel-lab.co.jp` | 运营实验室的官网 | **94** | well-grounded | `<meta name="description">` 仅 47 字符（推荐 80–200） |
| `legacydram.com` | 威士忌 × 工程师媒体 | **93** | well-grounded | JSON-LD 不完整（没有 `Organization`/`Person`） |
| `mypcrig.com` | PC 装机精选 | **90** | well-grounded | 无 `hreflang`（单语言站可以）+ JSON-LD 不完整 |
| `kaoriq.com` | 香水电商 | **90** | well-grounded | robots.txt 没有针对 AI bot 的明确规则 |

中位数 93，最低 90。没有任何一个站点掉到 well-grounded 档位以下。

这张表，比我们差点要发的那张乏味得多。

## 这次实验差点变成什么样

本帖的初稿，标题是另一句：**"我们自己的官网拿了 29 / 100，是测试中最差的结果。"** 那是给一个新测量项目加分用的、典型的自我批评式报告。

故事是这样讲的。我们测了 `propel-lab.com`，分数 29 / 100，critical 档。对根路径做了 curl，返回一行 HTML：

```bash
$ curl -s https://propel-lab.com/
<!DOCTYPE html><html><head><script>window.onload=function(){window.location.href="/lander"}</script></head></html>
```

一个 `window.location.href` 跳转到 `/lander`，对我们所知的每一个 AI crawler 都是不可见的。接着我们再把 checker 对着 `/lander` 跑了一遍，得到 **31 / 100**，也是 critical。两层都挂。一个完美的道德故事：一个专注 LLMO 的实验室，自己的 `.com` 官网过不了自己宣扬的 substrate 测试。

差点就发了。

## 是什么把它拦住的

发布前，我们又对那个跳转目标的 HTML 多 curl 了一次。三个特征跳出来：

```html
<script>window.LANDER_SYSTEM="PW"</script>
<script src="https://www.google.com/adsense/domains/caf.js"></script>
<script src="https://img1.wsimg.com/parking-lander/static/js/main.be9a3b28.js"></script>
```

这是 **域名停放页面** 的指纹 —— `wsimg.com/parking-lander` 是第三方托管的 parking 模板，跟 Google AdSense for Domains 一起发出来。这个页面在跑停放业务，不是企业官网。

我们并不拥有 `propel-lab.com`。从来没拥有过。企业官网是 `propel-lab.co.jp`，它的得分是 **94 / 100** —— well-grounded，表里第三。

我们的那个道德故事，讲的是别人停放的一个域名。

## 为什么把这段经过留在 log 里

发布前抓到这种擦肩而过的事故后，自然的诱惑是悄悄改掉草稿、上一份无趣的诚实版本、不留下任何记录。我们不这么做。三个理由：

1. **一个掩盖自己擦肩事故的 LLMO 倡议，跟掩盖坏分数的倡议是同一种。** 既然把 falsifiability 写成原则，就必须留下被证伪的痕迹。
2. **停放域名的模式本身就是一种 substrate failure。** 凡是注册了 `.com` 做品牌、却从不在那里放真正站点的人，都在向 AI crawler 提供一份 `propel-lab.com` 形状的 substrate。这个洞察不会因为域名是谁的而变。
3. **dogfooding 给我们的是一份全是 90+ 的数据。** 这干净得不像我们期望的那种证据。如果你测自己的作品、最差是 90，你学到的是"我能稳定地按自己的标准写站点"—— 不是"这个标准能预测什么有用的东西"。

实质性的问题 —— "LLMO Score 能预测真实的 AI 引用行为吗?" —— 在一份全部通过的六站点 self-audit 里得不到回答。它需要外部 baseline 面板和引用相关性 pilot。这两件事是接下来的两篇 Experiment Log。

## 我们仍然要在自己站点上改的事

抛开停放域名的故事，表上也有一些值得修的小问题：

1. **`propel-lab.co.jp` 的 description** —— 当前 47 字符，推荐 80–200。把它扩到跟 portfolio 里其他企业站描述同样的长度
2. **改进 `mypcrig.com` 和 `kaoriq.com` 的 JSON-LD 覆盖** —— 两个都在 `jsonld` 上 82 / 100，因为只发出了相关类型（`Product`、`Person`、`Article`）的一部分
3. **给 `kaoriq.com` 的 robots.txt 加上明确的 AI bot 策略** —— 当前是中性的；要对 GPTBot / ClaudeBot / Google-Extended 做明确的 opt-in
4. **给 `llmoframework.com` 和 `kenimoto.dev` 的 `/llms.txt` 加链接列表** —— 现在文件里有散文但没有链接区块；两边都因此丢了 `llms-txt` 权重的一小段

这些做完之后，我们会带着重新测过的分数发一份 follow-up 的 Experiment Log。delta 有没有都如实写。

## 没预想到学到的事

最清楚的教训不在 substrate，在叙事自律上。

当 `propel-lab.com` 的分数返回 29 时，第一动作就是围绕这个数字搭一个故事。故事写得紧、唱反调、本来会是一个传播力不错的帖子。是那个数字让故事成立的。

我们拥有 `propel-lab.com` —— 这个事实是没确认就被假定下来的。这正是好叙事会强化的那种假设，因为承认这个缺口会让整篇帖子塌掉。我们是偶然抓到的 —— 当时是为了再找一些发现而对 HTML 的另一段做 curl，不是为了质疑前提。

一个价值主张是 **"在你假定 AI substrate 长什么样之前，先测它"** 的项目，差点发出一篇基于 **"在你假定它是什么之前，没去测域名所有权"** 的稿子，这是那种正确意义上的尴尬。

## 本实验的局限

- v0.1 只测 substrate。一个站点可能 substrate 上拿 95 分，但仍然得到零 AI 引用，原因可能是内容本身没意思、与已知事实矛盾、或者重复了权威更高的来源。Citation Visibility 留给 v0.2。
- 得分的权重（`llms-txt` 20、`robots-ai` 15、`canonical` 15、`jsonld` 20、`meta` 15）是作者设定的默认值，没有经过验证。是合理的默认，不是从 outcome 数据里推导出来的。我们打算在 Phase 2 收集引用 outcome 数据时重新校准。
- 我们只测了首页。每个站点的文章页可能得分不同。
- 这份数据是我们自己按自己的标准写出来的六个站点。它没法告诉你这个标准能不能推广。

## 复现这个实验

```bash
npx llmo-checker@0.1.0 https://llmoframework.com/
npx llmo-checker@0.1.0 https://kenimoto.dev/
npx llmo-checker@0.1.0 https://propel-lab.co.jp/
npx llmo-checker@0.1.0 https://legacydram.com/
npx llmo-checker@0.1.0 https://mypcrig.com/
npx llmo-checker@0.1.0 https://kaoriq.com/
```

加 `--json` 拿机器可读的输出。把版本钉死（`@0.1.0`）—— JSON 的 shape 可能在 v0.2 变。

要复现停放域名的检测，再跑：

```bash
npx llmo-checker@0.1.0 https://propel-lab.com/
npx llmo-checker@0.1.0 https://propel-lab.com/lander
curl -s https://propel-lab.com/lander | head -1
```

前两条会返回 critical 分数。第三条会让 `LANDER_SYSTEM` / `parking-lander` / `adsense/domains` 这些标记从 HTML 里浮上来。

## 下一步

这是 Public Experiment Log 系列的第一篇。我们计划跑的下两篇：

- **外部 baseline 面板** —— 给几十个高流量技术站点（文档门户、开发者博客、产品营销站）打分，把分布公开。给"正常长什么样"做校准 —— 这个 self-audit 自己做不到的比较。
- **引用相关性 pilot** —— 对 ~50 个 URL，比较 LLMO Score 和真实的 AI 引用率（探测 ChatGPT、Claude、Perplexity）。这是对 score 是否真的能预测它声称要预测的 outcome 的第一次真测试。

完整 roadmap 在 [Experimental Projects](/zh/experimental-projects/)，v0.1 的权重定义在 [Score v0.1 Draft Specification](/zh/specifications/score-v01/)。
