---
title: "6. 一致性信号"
description: "一致性信号确保同一事实在AI读取的每个面（HTML、JSON-LD、Markdown、llms.txt）上讲述同一个故事。不一致会降低引用准确性，并损害信任。"
pubDate: 2026-05-08
---

## 定义

> **与结构化格式的边界**：*结构化格式* 问的是「每个面单独看是否格式良好？」——有效的 JSON-LD、语义化 HTML、按页限定作用域的 schema。*一致性信号* 问的是「这些面彼此之间是否一致？」——HTML 与 Markdown 中是否为同一地址，`llms.txt` 与首页简介中是否为同一数字，是否存在两个字段相互矛盾的 `Organization` 实体。一个页面可以通过结构化格式检查，却仍然在一致性上失败：每个区块都有效，但合在一起讲了两个故事。

一致性信号衡量你的内容是否**在AI智能体能读取的每个面上讲述同一个故事**。一个现代的、为LLMO优化的站点会通过多个渠道暴露事实：

- HTML 页面正文（人类与AI爬虫都能看到）
- JSON-LD 结构化数据
- llms.txt 与 llms-full.txt
- /ai/*.md 与 URL.md 端点（例如 `/company.md`）
- OG / Twitter meta 标签
- sitemap、robots.txt、hreflang 声明

当同一个事实（一个数字、一个地址、一份服务目录、一个发布日期）在其中两个面上写得不一样时，同时参考两者的AI系统就会混乱。模型可能采用它权重更高的那个值，把过时的数字呈现出来，或者因为冲突暗示了低质量而干脆拒绝引用。

一致性是LLMO的一项纪律：保证在每个面上都有**单一可信源（single source of truth）**。

## 为什么重要

引用准确性取决于**证据的收敛**。当模型从多条路径检索到你的内容且各处数值一致时，置信度上升，引用会被送达用户。当数值不一致时，会出现几种失败模式：

- **引用率下降** —— 模型转而采信内部证据一致的来源。
- **引用了错误的事实** —— 如果AI从 `/ai/founder.md` 选取了旧版本，你首页上更新过的数字就永远到不了用户那里。
- **幻觉被放大** —— 当各面互相冲突时，模型更可能内插出一个两边都对不上的「折中」答案。
- **权威性被侵蚀** —— 老练的AI重排器（Perplexity、AI Overviews）会比对交叉引用；自相矛盾的自我描述会被读作低质量。

2024年对 [Propel-Lab](https://propel-lab.co.jp/) 的一次自我审计发现，同一份作者简介既声称**4本书 / Qiita 39,000+ PV**（在 `/ai/founder.md`、`llms-full.txt` 中），又声称**14本书 / Qiita 80,000+ PV**（在首页的简介组件中）——这是一个活生生的矛盾，而且已经向AI爬虫提供了好几个月。

## 实施方法

### 1. 为每个事实指定单一来源

对每一项数值或事实主张，指定**一个**文件作为正规来源。其他所有面都从它 import 或引用。

| 事实 | 正规来源 | 消费方 |
|------|---------|--------|
| 书籍数量、PV 统计 | `src/data/profile.ts` | 简介组件、`/ai/founder.md`、`llms-full.txt`、JSON-LD |
| 服务目录 | `src/data/services.ts` | `/products/`、JSON-LD `Service[]`、`/ai/services.md`、`llms.txt` |
| 地址、成立日期 | `src/data/company.ts` | 页脚、`/company.md`、JSON-LD `Organization`、`llms-full.txt` |
| FAQ 条目 | `src/lib/faq-schema.ts` | FAQ 组件、JSON-LD `FAQPage`、`/faq.md` |

模式是：内容集合或带类型的数据模块 → 模板和静态端点都从它拉取。

### 2. AI 面与 HTML 从同一来源生成

如果 `llms.txt` 或 `/ai/*.md` 的内容已经存在于带类型的数据中，就不要手写它们：

```typescript
// src/pages/products.md.ts
import { services } from '../data/services';

export const GET: APIRoute = async () => {
  const markdown = services
    .map((s) => `## ${s.name}\n\n${s.summary}\n\n— 目标对象: ${s.target}`)
    .join('\n\n---\n\n');
  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
```

HTML 视图、JSON-LD `Service[]` 和 `/products.md` 全部源自 `services`。漂移在结构上变得不可能。

### 3. 把 URL 规范化当作一致性问题来处理

对一个做字符串匹配的爬虫来说，`https://www.example.com/` 与 `https://example.com/` 是两个字符串。选定一个正规主机，然后贯彻它：

- 每个页面都有 `<link rel="canonical">`
- `og:url`、JSON-LD `url`、sitemap 条目 —— 同一主机
- `/ai/*.md`、`llms.txt` 中的引用 —— 同一主机
- 内部链接 —— 相对路径或正规绝对URL，绝不用备用主机

一个常见的 bug 是：从 `www.` 迁移到 apex（或反向）时忘了更新 `/ai/*.md` 文件。站点其余部分都已规范化，而 Markdown 面悄悄地把错误的主机泄露给了AI。

### 4. 把末尾斜杠策略当作一致性问题来处理

如果你的主机用 301 把 `/blog/post` 规范化为 `/blog/post/`，那么每个内部链接本来就应该带上斜杠。混用会产生：

- 重定向浪费爬取预算
- 重定向生效期内的正规信号冲突
- 带斜杠与不带斜杠混杂的 hreflang

在框架层面选定一个策略（Astro 的 `trailingSlash: 'always'` 或 `'never'`），并 grep 你的仓库，确保没有残留的违规项。

### 5. 用跨文件检查来检测漂移

加一个 CI 步骤，用 grep 检查同一个数值或字符串主张在各面之间是否相等：

```bash
# 如果任何来源仍有旧的书籍数量则失败
! grep -rn "4 books\|4冊\|Kindle著者: 4" public/ src/data/ src/content/
```

更进一步：写一个 JSON-LD 校验器，把内联 `<script>` 和任何独立的 `.jsonld` 文件都解析出来，断言它们在共享的 `@id` 值上保持一致。

### 6. 发布流程本身就是一个一致性面

在LLMO的意义上，版本号也是一个事实 —— 一个AI可以引用的、关于你站点的主张。如果 `package.json` 写着 `1.2.0`，`src/data/version.ts` 写着 `1.1.0`，changelog 页面英文版写 `v1.2.0` 而日文版写 `v1.1.0`，最新的 git tag 又是 `v1.1.0`，那么这个站点就在五个面上、围绕同一个事实自相矛盾。

这不是理论。你正在读的这个框架就在 v1.2.0 上犯过这个漂移；[自我审计案例研究 (英文)](/case-studies/llmo-framework-self-audit/) 记录了当时发生了什么。

防止它的模式：

1. **尽可能多地从一个来源生成版本面**。一个能同时更新 `package.json`、带类型的数据模块和 changelog Markdown 的 bump 脚本，对任何把一致性当作价值观的框架来说都是必备基础设施。
2. **让版本在运行时可见，而不只是藏在元数据里**。一个从带类型的数据模块读取并显示 `v{VERSION}` 的页脚，能把构建期的漂移立刻变成面向用户的反馈。跑 `npm run build` 的维护者会在每一页都看到这处不一致。
3. **用跨文件检查为发布设门禁**。一个 CI 步骤读取 `package.json` 的版本号，再 grep 它是否出现在 `CHANGELOG.md`、`src/data/version.ts` 和 changelog 页面中，任何一处不一致就以非零退出。
4. **打 tag 之前跑一遍只读的AI二次复审**。成本是几美分的API token，收益是抢在用户之前抓住这个讽刺。

发布流程就是框架的内容面在实时地对AI讲话。要用同一套纪律来对待它。

### 7. 避免为同一个 `@id` 生成重复的 JSON-LD 实体

最常见的 silent failure：布局输出了一个用地址A的 `Organization`，而某个按页的片段又输出了一个用地址B的 `Organization`。两者都进入了HTML。爬虫把两者都解析了。该页面的信任分下降。

修复方法：在框架层面给每个实体分配一个 `@id`（`https://example.com/#org`、`#founder`、`#website`），其他任何地方都用 `@id` 引用。任何重复在代码评审中都会一目了然。

## 示例

**❌ 各面之间漂移：**

```markdown
# /ai/founder.md
- Publishing: Kindle author of 4 books
- Technical Writing: 39,000+ PV on Qiita
```

```astro
<!-- src/components/Profile.astro（渲染到首页） -->
<p>Kindle 14冊・Qiita 80,000+ PV。</p>
```

```jsonld
// JSON-LD on /
{ "@type": "Person", "name": "Ken Imoto" /* 没有当前数字 */ }
```

三个面，三个不同的故事。引用 `/ai/founder.md` 的AI报告过时数字；引用 HTML 的AI报告当前数字；JSON-LD 对解决冲突毫无帮助。

**✅ 单一来源：**

```typescript
// src/data/profile.ts —— 正规来源
export const profile = {
  highlights: [
    'Kindle author: 14 books',
    'Qiita: 80,000+ PV',
  ],
};
```

```astro
<!-- 简介组件 -->
{profile.highlights.map(h => <li>{h}</li>)}
```

```typescript
// src/pages/founder.md.ts
return new Response(
  `# Founder\n\n${profile.highlights.map(h => `- ${h}`).join('\n')}`,
  { headers: { 'Content-Type': 'text/markdown' } }
);
```

一个值只存在于一个地方。HTML 视图、AI 的 Markdown 端点和 JSON-LD 一起演进。

## 检查清单

- [ ] 每一项事实主张（数字、地址、日期、目录）都恰好有一个正规来源文件
- [ ] AI 专用面（`llms.txt`、`/ai/*.md`、URL.md 端点）与 HTML 从同一份数据生成，而非并行手工维护
- [ ] 正规主机在 `<link rel="canonical">`、`og:url`、JSON-LD、sitemap 和 Markdown 面上保持一致
- [ ] 末尾斜杠策略在框架层面设定，并反映在每一个内部链接中
- [ ] 没有两个 JSON-LD 区块用不同的值描述同一个实体；实体使用稳定的 `@id` 做跨页引用
- [ ] CI 对关键指标（书籍数量、PV 统计、服务列表）做跨文件漂移检查
- [ ] 定期做两遍审计（自我复审 → 第二意见AI复审），在两次发布之间抓住漂移 —— 参见 [LLMO 审计：两遍复审 (英文)](/guide/llmo-audit-two-pass-review/)
