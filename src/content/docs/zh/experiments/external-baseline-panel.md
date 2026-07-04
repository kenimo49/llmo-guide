---
title: "Public Experiment Log #2：外部 baseline 面板"
description: "我们用 llmo-checker@0.1.0 给 39 个高流量技术站点打了分，用来校准'正常'是什么样子。中位数是 61。其中三个最大的文档门户得分低于 40。"
pubDate: 2026-05-24
---

第一篇 Public Experiment Log 给我们自己拥有的 6 个站点打了分。六个全部落在 90+。我们当时就坦率写过：那份数据干净得没法当作任何东西的证据。这篇是第一篇 log 给不出的那块校准：一个由 39 个我们 *不拥有* 的高流量技术站点组成的面板，用同一个工具、在同一天打分。

主要发现既乏味又不太舒服。乏味的部分：中位数 61，标准差 19.5 —— 一个分布形状正常、中心明显落在"good"以下的分布。不舒服的部分：现代 web 上访问量最大的三个文档门户 —— `rust-lang.org`、`tailwindcss.com`、`djangoproject.com` —— 得分都低于 40。

## 方法

面板由 40 个 URL 组成，覆盖三类：面向开发者的文档（20）、产品营销站（12）、工程博客（6）。另外两个（`docs.anthropic.com`、`platform.openai.com/docs/`）作为单独的"AI 厂商文档"对照组放进来。选取在测量之前完成；URL 没有根据得分加入或剔除。

40 个 URL 用 `llmo-checker@0.1.0` 在一次 batch run 里测量，请求间隔 1 秒。其中一个（`platform.openai.com/docs/`）返回 parse error 被剔除，剩下 **n = 39**。

每次请求都使用同一个 User-Agent（`llmo-checker/0.1.0`），跟一个读我们推荐的 AI crawler 发出来的请求一致。没有任何站点被重测；以第一次测量结果为准。

## 结果

| 统计量 | 值 |
|---|---|
| n | 39 |
| 均值 | 58.8 |
| 中位数 | 61 |
| 标准差 | 19.5 |
| Q1 / Q3 | 45 / 69 |
| Min / Max | 23 / 94 |

### 得分分布（10 分一档）

```
 20-29  ███         3
 30-39  ████        4
 40-49  █████████   9
 50-59  ██          2
 60-69  ████████████ 12
 70-79  █           1
 80-89  █████       5
 90-99  ███         3
```

分布大致是双峰：一个簇在 40–49（中下游、机器可读性偏弱的站点），更大的一个簇在 60–69（基本面都做了、但缺 `jsonld` 和/或 `llms.txt` 的中游站点）。

### Top 5

| # | 站点 | 得分 |
|---|---|---|
| 1 | `supabase.com` | 94 |
| 2 | `redis.io` | 93 |
| 2 | `www.cloudflare.com` | 93 |
| 4 | `stripe.com` | 89 |
| 5 | `docs.docker.com` | 84 |

### Bottom 5

| # | 站点 | 得分 |
|---|---|---|
| 39 | `www.rust-lang.org` | 23 |
| 38 | `tailwindcss.com` | 25 |
| 37 | `www.djangoproject.com` | 26 |
| 36 | `www.postgresql.org` | 32 |
| 35 | `golang.org` | 37 |

### 按类别

| 类别 | n | 中位数 | 均值 | 范围 |
|---|---|---|---|---|
| 产品营销 | 12 | 68.5 | 74.8 | 58–94 |
| 开发者博客 | 6 | 65.0 | 65.3 | 44–80 |
| 文档 | 20 | 45.5 | 48.0 | 23–93 |

### 各检查项的中位数

| 检查项 | 中位数 | 均值 | 范围 |
|---|---|---|---|
| `llms-txt` | 90 | 54.9 | 0–100 |
| `robots-ai` | 80 | 78.7 | 60–100 |
| `canonical` | 90 | 67.9 | 0–100 |
| `jsonld` | **0** | 26.1 | 0–94 |
| `meta` | 80 | 78.5 | 0–100 |

## 让我们意外的事

**文档站是最弱的一类。** 如果事先让我们预测，这一点我们一定会猜反。默认假设 —— 包括数据出来之前我们自己的假设 —— 是文档门户应该是 *最好* 的一类，因为它们一直是给人和搜索引擎共用的精选权威来源。数据说的恰好相反：文档中位数（45.5）比产品营销中位数（68.5）低了 20 多分。文档门户被广泛喜爱、成熟、为人类工程得当，但同一批团队平均下来并没有在机器可读的那一面投入。

**schema.org 的地板非常低。** 面板里 `jsonld` 的中位数是 **0**。这些知名技术站里超过一半根本没有发出任何可识别的 JSON-LD `@type`。均值被少数几个 instrumentation 做得好的站点（多数是产品营销）拉到 26。`jsonld` 得 0 不代表站点坏了 —— 它代表 AI crawler 没有可以把 citation 落到上面的实体图（entity-graph）表面。

**`llms.txt` 是双峰的，不是渐变的。** 中位数是 90，但均值只有 54.9。一个站点要么投入做了一份 spec 合规的 `/llms.txt`（干净的 90 多到 100），要么根本没有这个文件（0）。中间地带的站点极少。这意味着 `llms-txt` 从 0 → 90+ 的成本是 single file commit，不是一次多阶段迁移。

**得分最低的三个都是家喻户晓的名字。** `rust-lang.org`（23）、`tailwindcss.com`（25）、`djangoproject.com`（26）是整个面板里得分最低的三个 URL。按任何合理的流量估算，它们同时是 web 上访问量最大的开发者 URL 之一。这个分数测的不是流量、品牌认知、或内容质量。它测的是 AI crawler 能不能把一条 citation 落到页面 metadata 上 —— 单看这条轴，这三家在最底部。

**`Cloudflare` 家族在三个 URL 上得到 93 / 64 / 44。** `www.cloudflare.com`（93）是顶部的产品页；`www.cloudflare.com/blog/`（64）是博客索引；`blog.cloudflare.com`（44）是博客的子域前端。同一个工程团队，三个不同的表面，差出 50 分。多站点组织经常这么不均匀，我们自己的 portfolio 也佐证了这一点（v1.5.1 那份 Experiment Log 已经记录过我们自家的 90–99 vs 96 vs 94 差距）。

## 我们自己拥有的站点处在什么位置

第一篇 Experiment Log 给我们自己的 6 个站点打了 93–99。孤立地看，这个高度让人有点不安。现在有了 context：

| 站点 | 得分 | 面板百分位（约） |
|---|---|---|
| `llmoframework.com` | 99 | > 99th |
| `kenimoto.dev` | 99 | > 99th |
| `kaoriq.com` | 96 | > 95th |
| `propel-lab.co.jp` | 96 | > 95th |
| `mypcrig.com` | 93 | > 90th（与 `supabase.com`、`redis.io` 并列） |
| `legacydram.com` | — | （本次未重新测量） |

这把我们自己的站点放在了一个 39 站点高流量技术面板的最顶端。我们并不认为这意味着我们的内容比 `rust-lang.org` 或 `stripe.com` 更好。它意味着我们一直在测量并修复 score 所对准的同样这 5 项机械检查 —— 一个自建工具本来就应该让这件事变得容易做。

这就是第一篇 log 缺的那块校准。我们所在的 90+ 簇并不正常。它是那群专门为机器可读表面做优化的站点 —— 在这个面板上，这个决定把顶部一小群人和 40–69 段那条长尾分开了。

## 这仍然没有证明什么

Score 是内部一致的（Experiment Log #1 的 update 已经确认修复会产生 spec 预测的 delta）。Score 现在也有了一个外部面板可以对比。但这两个事实，跟"更高的 score 会带来更高的 AI 引用率"是两回事。

那仍然是 Experiment Log #3（citation correlation pilot）要做的事。我们会挑 50 个跨越整个得分区间的 URL —— 包括本面板 bottom 5 的一部分和 top 5 的一部分 —— 比较 LLMO Score 和真实的 AI 引用率（Perplexity API + ChatGPT search + Claude web 工具）。如果 score 是真的，对那些"任一者都会是可信来源"的 query，本面板的 bottom 5 应该被引用的频率明显低于 top 5。

这次 update 的诚实版本是：score 已经过了一个测量工具要过的三道关里的两道。它内部一致（v1.5.2 update），并且在一个可信的外部面板上产生非平坦的分布（本篇 log）。第三道关 —— 它能不能预测它声称要预测的 outcome —— 才是决定这个项目值不值得继续的那道。

## 局限

面板偏小（n = 39），而且只有英文站。这次 run 里没有日语、中文、德语、法语站点 —— 这是为了让第一份面板保持聚焦而有意做的选择，但对跨语言校准来说是个真实的局限。

类别比例不均：20 个文档、12 个产品营销、6 个开发者博客。这让每类的中位数只能当作方向性参考，统计上不算紧（尤其是 Dev 博客只有 n = 6）。

选取是我们自己在测量之前做的。我们尽量挑了知名、高流量的技术 URL，以减少"你们专挑了弱站点"的反驳，但 selection bias 没法完全排除。原始 URL 列表跟本帖一起提交（`experiments/external-baseline-2026-05/urls.txt`），方便复现或扩展这个面板。

`platform.openai.com/docs/` 被剔除是因为 checker 没拿到可解析的 JSON。这就是一个 survivorship bias 的数据点；AI 厂商文档的对照原本两个点都在会比只剩一个（`docs.anthropic.com` 得了 64）有意思得多。

## 复现这个实验

```bash
git clone https://github.com/open-llmo/llmo-checker
cd llmo-checker
npm install && npm run build

# 拉取 URL 列表和运行脚本
cd experiments/external-baseline-2026-05
cat urls.txt          # 40 URLs
bash run-measurements.sh   # 产出 results/*.json
python3 analyze.py    # 打印上面那份汇总
```

原始的 `results/*.json` 文件已提交；用 `llmo-checker@0.1.0` 对同样这批 URL 跑一遍，得分应该跟本帖里在 ±1 以内一致（站点会在 run 之间变；一个新加的 `<meta>` 标签就能让 `meta` 移 10 分）。

## 接下来

Roadmap 跟 Experiment Log #1 收尾时一致：

- **Experiment Log #3 — Citation correlation pilot。** 对 ~50 个跨越得分区间的 URL，用同一组 query 探测 Perplexity / ChatGPT / Claude，计算 LLMO Score 与引用率的相关性。这是真正的验证：score 能不能预测它声称要预测的东西？
- **v0.2 的 score 权重。** 如果 citation-correlation 数据落得跟我们预期一致，各检查项的权重会被重新调到让相关性最大。如果不一致，spec 就会得到一篇更有意思得多的后续帖。

完整 roadmap 在 [Experimental Projects](/zh/experimental-projects/)，v0.1 的权重定义在 [Score v0.1 Draft Specification](/zh/specifications/score-v01/)。
