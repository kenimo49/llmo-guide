---
title: "Dogfooding do LLMO Score v0.1: Rodamos o Checker em 6 Sites Nossos"
description: "Medimos 6 sites que operamos — incluindo o site institucional do laboratório por trás do LLMOFramework — com o novo CLI llmo-checker. O site institucional tirou 29 / 100."
pubDate: 2026-05-24
---

O primeiro **Public Experiment Log** da Open LLMO Research Initiative.

Acabamos de lançar o [`llmo-checker`](https://github.com/open-llmo/llmo-checker), um CLI estilo Lighthouse que mede quão recuperável por IA uma URL é (v0.1 Draft). A primeira coisa que fizemos com ele foi apontá-lo para cada site que operamos, incluindo o site institucional do laboratório que mantém esta iniciativa.

A manchete do resultado: **nosso próprio site institucional tirou 29 / 100**, abaixo de qualquer um dos sites voltados ao consumidor que ele supostamente serve como referência.

## Metodologia

- Ferramenta: `npx llmo-checker <url>` v0.1.0 (commit `1db47ea`)
- Data: 2026-05-24
- Sites: 6 propriedades que possuímos ou operamos
- Score: média ponderada de 5 verificações estáticas — `llms-txt` (peso 20), `robots-ai` (15), `canonical` (15), `jsonld` (20), `meta` (15)
- Faixas de score: 85+ well-grounded · 65–84 needs work · 40–64 poor · 0–39 critical

Todas as verificações são fetches HTTP puros e parsing de HTML. Em v0.1 não há simulação de citação por IA: o score mede o **substrate** que um crawler de IA consegue de fato enxergar.

## Resultados

| Site | Papel | Score | Faixa | Check mais fraco |
|---|---|---|---|---|
| `llmoframework.com` | Site desta iniciativa | **96** | well-grounded | `llms-txt` sem lista de links (cosmético) |
| `kenimoto.dev` | Site pessoal do autor | **96** | well-grounded | idem |
| `legacydram.com` | Mídia uísque × engenharia | **93** | well-grounded | JSON-LD parcial (sem `Organization`/`Person`) |
| `mypcrig.com` | Curadoria de PC builds | **90** | well-grounded | Sem `hreflang` (ok para site monolíngue) + JSON-LD parcial |
| `kaoriq.com` | E-commerce de fragrâncias | **90** | well-grounded | Sem regras explícitas de bots de IA em robots.txt |
| **`propel-lab.com`** | **Site institucional do laboratório** | **29** | **critical** | Praticamente tudo |

`propel-lab.com` é o site institucional do laboratório que mantém esta exata iniciativa. Tirou pontuação pior do que cada site de produto voltado ao consumidor que entregamos.

## Por que o site institucional falhou

Um `curl` na raiz já conta a história inteira:

```bash
$ curl -s https://propel-lab.com/
<!DOCTYPE html><html><head><script>window.onload=function(){window.location.href="/lander"}</script></head></html>
```

A raiz de `propel-lab.com` é **uma linha de HTML**. Um redirect via `window.location.href` roda no navegador, mandando o visitante para `/lander`.

Funciona para um humano no Chrome. É invisível para todo crawler de IA que conhecemos. Nenhum dos GPTBot, ClaudeBot, CCBot, Google-Extended, PerplexityBot ou Applebot-Extended executa JavaScript no fetch. Eles veem o HTML literal acima e param.

Então, na URL raiz (a primeira que a maioria dos sistemas de IA vai sondar), o checker encontrou:

- Sem `<title>`
- Sem `<meta name="description">`
- Sem OpenGraph
- Zero elementos `<h1>`
- Sem `<html lang>`
- Sem JSON-LD
- Sem `<link rel="canonical">`

Depois rodamos o checker contra o **destino do redirect**, `https://propel-lab.com/lander`. Tirou **31 / 100**, também critical. A página de destino tem conteúdo, mas não tem canonical, não tem JSON-LD, e a metadata é fraca.

As duas camadas falham.

## O que isso significa

Existe um padrão comum em que times publicam uma estrutura "splash → landing" no site institucional, assumem que o Google trata JS sem problema, e nunca verificam como a página fica para um crawler sem JS. Essa suposição era razoavelmente verdadeira para o Google search. **É bem pouco verdadeira para crawlers de IA em 2026.**

No nosso caso, o site institucional de um *laboratório focado em LLMO* caiu exatamente nessa armadilha. Pegamos isso porque construímos uma ferramenta que nos obrigou a olhar o substrate. Sem a ferramenta, teríamos continuado assumindo que estava tudo bem porque o UX voltado ao humano parecia limpo.

É exatamente esse o ponto de publicar o checker como OSS. A lacuna no substrate é invisível até você medir.

## O que vamos mudar

Adicionamos isto ao nosso backlog público como resultado deste experimento:

1. **Redirect server-side em `propel-lab.com/`** — trocar o redirect via JS por um 301 ou renderizar o conteúdo da landing diretamente na raiz
2. **Adicionar canonical + JSON-LD `Organization` + metadata OG em `/lander`** — levar o score sozinho de 31 para ≥ 85
3. **Rodar o checker como smoke step** — colocar a auditoria no nosso pipeline de deploy, para regressões futuras virem à tona na hora
4. **Melhorar a cobertura de JSON-LD em `mypcrig.com` e `kaoriq.com`** — os dois estão em 82 / 100 no `jsonld` porque emitem alguns mas não todos os tipos relevantes (`Product`, `Person`, `Article`)
5. **Adicionar política explícita de bots de IA no robots.txt de `kaoriq.com`** — hoje neutro; queremos opt-in explícito para GPTBot / ClaudeBot / Google-Extended

Quando terminarmos, publicamos um Experiment Log de follow-up com os scores remedidos. Honestos sobre o delta, exista ou não.

## Por que publicamos a nota ruim

Existe uma tentação forte, quando você lança uma ferramenta de medição, de usá-la principalmente em competidores. Estamos fazendo deliberadamente o oposto: o primeiro dataset público do `llmo-checker` é **das nossas próprias propriedades**, incluindo aquela que tirou a pior nota.

Dois motivos:

1. **O score precisa ser falsificável.** Se nunca publicamos uma nota ruim em algo que possuímos, ninguém tem motivo para confiar que a pontuação é honesta.
2. **A credibilidade da iniciativa vem dos artefatos, não do enquadramento.** Um laboratório que publica o próprio site institucional em 29 / 100 é mais crível do que um que publica um manifesto e um auto-score de 100 / 100.

## Limites deste experimento

- v0.1 mede só substrate. Um site pode tirar 95 em substrate e ainda assim ter zero citações em IA porque o conteúdo é desinteressante, contradiz fatos conhecidos, ou duplica fontes de mais autoridade. Citation Visibility fica reservado para v0.2.
- Os pesos (`llms-txt` 20, `robots-ai` 15, `canonical` 15, `jsonld` 20, `meta` 15) foram definidos pelos autores e não foram validados. São valores padrão razoáveis, não derivados de dados de resultado. Vamos recalibrar conforme coletarmos dados de resultado de citação durante a Phase 2.
- Testamos só páginas iniciais. Páginas de artigo de cada site podem ter score diferente.

## Reproduzindo este experimento

```bash
npx llmo-checker@0.1.0 https://llmoframework.com/
npx llmo-checker@0.1.0 https://kenimoto.dev/
npx llmo-checker@0.1.0 https://legacydram.com/
npx llmo-checker@0.1.0 https://mypcrig.com/
npx llmo-checker@0.1.0 https://kaoriq.com/
npx llmo-checker@0.1.0 https://propel-lab.com/
npx llmo-checker@0.1.0 https://propel-lab.com/lander
```

Use `--json` para saída legível por máquina. Fixe a versão (`@0.1.0`); o formato do JSON pode mudar na v0.2.

## Próximos passos

Este é o primeiro Public Experiment Log da série. Os dois próximos que planejamos rodar:

- **Painel de linha de base externa** — pontuar algumas dezenas de sites técnicos de alto tráfego (portais de documentação, blogs de dev, sites de marketing de produto) e publicar a distribuição. Calibra como "normal" se parece.
- **Piloto de correlação com citação** — para ~50 URLs, comparar LLMO Score com a taxa real de citação por IA (sondando ChatGPT, Claude e Perplexity). É o primeiro teste real de se o score prevê o resultado que ele afirma prever.

O plano completo está em [Experimental Projects](/pt/experimental-projects/), e os pesos do v0.1 estão definidos em [Score v0.1 Draft Specification](/pt/specifications/score-v01/).
