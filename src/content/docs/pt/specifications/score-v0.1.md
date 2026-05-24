---
title: "LLMOFramework Score v0.1 — Draft Specification"
description: "Definição formal do LLMOFramework Score v0.1 Draft: 5 verificações de substrate, pesos, regras de pontuação e schema do JSON. Implementação de referência: llmo-checker."
pubDate: 2026-05-24
---

> **Status: Draft.** É a v0.1, a primeira versão publicada. Pesos, lista de verificações e formato do JSON podem mudar na v0.2 sem compatibilidade com versão anterior. Fixe a versão do checker se você depende do formato do JSON.

O LLMOFramework Score é um único número (0–100) que resume quão recuperável por IA uma URL é. O score v0.1 mede **apenas sinais de substrate** — sinais estáticos que um crawler de IA consegue extrair em um único fetch HTTP sem rodar JavaScript, sem executar LLM e sem simular retrieval.

A implementação de referência é o CLI OSS [`llmo-checker`](https://github.com/open-llmo/llmo-checker), mantido pela Open LLMO Research Initiative.

## Princípios de design

1. **Substrate antes de behavior.** v0.1 mede sinais que um crawler de IA consegue extrair de um único fetch HTTP. Sinais comportamentais (citação, estabilidade de retrieval, leitura por LLM) ficam adiados para v0.2+.
2. **Reproduzível.** Toda verificação é uma função pura do HTML, robots.txt e llms.txt obtidos via fetch. Sem rede além disso, sem chamadas de IA, sem comportamento dependente de relógio.
3. **Pontuação falsificável.** Cada verificação publica sua regra de pontuação. Se você discorda de uma regra, dá para rodar o checker e o spec lado a lado e mostrar onde divergem.
4. **Pesos honestos.** Os pesos da v0.1 são valores padrão definidos pelos autores, não derivados de dados de resultado. A v0.2 vai recalibrar usando o [piloto de correlação com citação](/pt/experiments/dogfooding-our-own-sites/).

## Composição do score

O score é uma média ponderada de 5 verificações:

| ID | Peso | Mede |
|---|---|---|
| `llms-txt` | 20 | Existência e estrutura do `/llms.txt` |
| `robots-ai` | 15 | Posicionamento explícito em relação a crawlers de IA conhecidos no `/robots.txt` |
| `canonical` | 15 | Correção do `<link rel="canonical">` e alternativos `hreflang` |
| `jsonld` | 20 | Existência, parseabilidade e tipos schema.org reconhecidos do JSON-LD |
| `meta` | 15 | `<title>`, `<meta name="description">`, OpenGraph, `<h1>`, `<html lang>` |

Peso total na v0.1: **85**. Os scores são normalizados para 0–100 via média ponderada.

### Faixas de score

| Faixa | Score | Interpretação |
|---|---|---|
| Verde | 85–100 | Bem fundamentado para retrieval por IA |
| Amarelo | 65–84 | Precisa de trabalho — vários sinais ausentes ou fracos |
| Amarelo | 40–64 | Ruim — lacunas significativas no substrate |
| Vermelho | 0–39 | Crítico — a página está praticamente invisível para crawlers de IA |

## Especificações por verificação

### `llms-txt` (peso 20)

**Faz fetch:** `GET {origin}/llms.txt`

**Pontuação:**

| Condição | Impacto no score |
|---|---|
| HTTP 404 ou 5xx | 0 |
| Body vazio | 10 |
| Body não-vazio (base) | 60 |
| Linha `# Title` de topo presente | +15 |
| Pelo menos um cabeçalho `## Section` | +10 |
| ≥ 3 entradas de link no padrão `^- \[` | +15 |
| 1–2 entradas de link | +8 |
| 0 entradas de link | +5 |

**Status:** `pass` ≥ 85, `warn` ≥ 60, `fail` caso contrário.

Spec de referência: [llmstxt.org](https://llmstxt.org/).

### `robots-ai` (peso 15)

**Faz fetch:** `GET {origin}/robots.txt`

**User-agents de IA reconhecidos (v0.1):** `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`, `ClaudeBot`, `Claude-Web`, `anthropic-ai`, `CCBot`, `Google-Extended`, `PerplexityBot`, `Applebot-Extended`, `cohere-ai`.

**Pontuação:**

| Condição | Impacto no score |
|---|---|
| HTTP 404 | 60 (warn — posicionamento explícito recomendado) |
| HTTP 5xx | 0 |
| Body parseável (base) | 70 |
| ≥ 3 bots de IA reconhecidos explicitamente mencionados | +20 |
| 1–2 bots de IA mencionados | +10 |
| Grupo com User-agent wildcard `*` presente | +10 |

**Status:** `pass` ≥ 85, `warn` ≥ 60, `fail` caso contrário. Score limitado a 100.

A menção em si conta, independente da regra ser `Allow` ou `Disallow`. v0.1 registra `disallowedBots` na saída JSON mas não penaliza Disallow — fazer opt-out de crawlers de IA é um posicionamento válido.

### `canonical` (peso 15)

**Fonte:** o HTML obtido via fetch.

**Pontuação:**

| Condição | Impacto no score |
|---|---|
| Sem `<link rel="canonical">` | 0 (fail) |
| `href` não é uma URL válida | 20 (fail) |
| Canonical aponta para origin diferente | 60 (warn) |
| Canonical aponta para mesma origin (base) | 90 (pass) |
| `<link rel="alternate" hreflang>` presente | +10 |

**Status:** `pass` se canonical presente e mesma origin, `warn` para cross-origin, `fail` caso contrário. Score limitado a 100.

Canonical cross-origin é intencional para mirrors republicados, mas é descontado por padrão porque é mais comumente um erro de configuração.

### `jsonld` (peso 20)

**Fonte:** todos os blocos `<script type="application/ld+json">` no HTML obtido via fetch.

**Tipos de entidade schema.org reconhecidos (v0.1):** `Organization`, `Person`, `Article`, `BlogPosting`, `TechArticle`, `Book`, `WebSite`, `WebPage`, `BreadcrumbList`, `FAQPage`, `HowTo`, `Product`, `SoftwareApplication`.

**Pontuação:**

| Condição | Impacto no score |
|---|---|
| Sem blocos JSON-LD | 0 (fail) |
| Pelo menos um bloco parseável (base) | 50 |
| Por `@type` reconhecido (cap em 3) | +12 cada |
| `Organization` ou `Person` presente | +8 |
| Qualquer bloco falha ao parsear | −20 |

O checker percorre arrays `@graph` recursivamente para coletar tipos.

**Status:** `pass` ≥ 85, `warn` ≥ 50, `fail` caso contrário. Score limitado a 0–100.

### `meta` (peso 15)

**Fonte:** `<head>` e primeiro `<body>` do HTML obtido via fetch.

**Pontuação:**

| Sinal | Impacto no score |
|---|---|
| `<title>` com 20–70 caracteres | +20 |
| `<title>` presente mas fora de 20–70 | +10 |
| `<meta name="description">` com 80–200 caracteres | +20 |
| Description presente mas fora de 80–200 | +10 |
| OpenGraph `title` + `description` presentes | +20 |
| OpenGraph `type` presente | +10 |
| Exatamente um `<h1>` | +20 |
| Atributo `<html lang>` presente | +10 |

**Status:** `pass` ≥ 85, `warn` ≥ 60, `fail` caso contrário. Score limitado a 100.

## Schema do JSON

A saída `--json` do CLI e a API programática retornam:

```typescript
interface CheckerReport {
  url: string;              // URL de entrada resolvida
  origin: string;           // URL.origin da página
  timestamp: string;        // ISO 8601
  checkerVersion: string;   // semver do CLI
  scoreVersion: "0.1";      // versão desta especificação
  score: number;            // média ponderada, 0-100
  checks: CheckResult[];
}

interface CheckResult {
  id: string;               // identificador estável da verificação (ex: "llms-txt")
  name: string;             // nome amigável para leitura
  status: "pass" | "warn" | "fail" | "skip";
  score: number;            // 0-100
  weight: number;           // contribuição para o score geral
  details: Record<string, unknown>;  // dados específicos da verificação
  notes: string[];          // notas legíveis, com sugestão de ação
}
```

**Garantias de estabilidade para v0.1:**

- Os nomes dos campos de nível superior (`url`, `origin`, `timestamp`, `checkerVersion`, `scoreVersion`, `score`, `checks`) são estáveis em todas as releases 0.1.x
- O `id`, `weight` e o formato geral de `status`/`score` de cada verificação são estáveis
- O formato de `details` **não é estável** dentro de 0.1.x — campos novos podem ser adicionados em releases patch
- O conjunto de `id`s em `checks` é estável em 0.1.x (nenhuma verificação nova sem release v0.2)

## Códigos de saída (CLI)

| Código | Significado |
|---|---|
| 0 | Score ≥ 50 (passa o mínimo) |
| 1 | Score < 50 (abaixo do mínimo) |
| 2 | Erro de fetch (rede, DNS, resposta não-2xx) |

Isso permite usar o CLI como smoke check em CI: um site reprovado reprova o pipeline.

## Implementação de referência

Fonte: [`open-llmo/llmo-checker`](https://github.com/open-llmo/llmo-checker)

```bash
npx llmo-checker https://example.com
npx llmo-checker https://example.com --json
```

Requer Node.js 20+.

Se a implementação de referência e este spec divergirem, o spec está correto em intenção e a implementação precisa ser corrigida — por favor [abra uma issue](https://github.com/open-llmo/llmo-checker/issues).

## O que a v0.1 deliberadamente não mede

Estas são preocupações legítimas de LLMO que não incluímos na v0.1, com os motivos:

| Indicador | Motivo de adiamento |
|---|---|
| Citation Visibility | Exige sondar assistentes de IA. Fora do escopo de uma verificação puramente estática. Planejado para v0.2 como verificação opt-in opcional. |
| Chunk Readability | Exige escolha de estratégia de chunking. A v0.2 vai usar um chunker default documentado para que a verificação seja reproduzível. |
| Markdown Quality | Só se aplica quando uma fonte Markdown está publicada. A v0.2 vai detectar endpoints no formato `/index.md`. |
| Qualidade / precisão do conteúdo | Fora do escopo. O score mede substrate, não qualidade editorial. |
| Estabilidade de retrieval no tempo | Exige sondagem longitudinal. Reservado para o projeto Benchmark, não para o Score por URL. |

## Política de versionamento

A versão do score é independente da versão da implementação de referência. A v0.1 do score pode ser implementada por `llmo-checker@0.1.x` (qualquer patch). A v0.2 do score vai exigir `llmo-checker@0.2.x`.

Mudanças incompatíveis entre versões minor do score (0.1 → 0.2) são esperadas durante a fase Draft. Vamos publicar uma especificação 1.0 só depois que a Phase 2 (Community) fechar — ou seja, depois que tivermos dados de resultado do piloto de correlação com citação, depois que implementações externas existirem e depois que os pesos forem recalibrados.

## Contribuindo

Mudanças no spec entram via issues no [repo llmo-guide](https://github.com/kenimo49/llmo-guide/issues) (fonte deste site).

Ao propor uma verificação nova ou mudança de peso:

1. Diga qual sinal e o que ele mede (uma frase)
2. Diga a regra de pontuação (precisa ser determinística a partir de um fetch HTTP a menos que seja v0.2+)
3. Cite um paper, experimento público ou argumento estilo Lighthouse para o peso
4. Forneça um reprodutor (uma URL que pontua alto e uma URL que pontua baixo sob a regra proposta)

Mudanças de implementação entram em [`open-llmo/llmo-checker`](https://github.com/open-llmo/llmo-checker).

## Agradecimentos

A estrutura do score é fortemente influenciada pelo [Lighthouse](https://developer.chrome.com/docs/lighthouse/) (Google) e pela [proposta llms.txt](https://llmstxt.org/) (Jeremy Howard). Os dois são bem desenhados, opinativos e falsificáveis — propriedades que tentamos preservar.
