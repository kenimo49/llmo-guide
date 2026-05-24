---
title: "Dogfooding do LLMO Score v0.1: Rodamos o Checker em 6 Sites Nossos"
description: "Medimos 6 sites que operamos com o novo CLI llmo-checker. Todos tiraram 90 ou mais. O resultado mais interessante foi aquele que quase publicamos — e tivemos que retirar antes de subir."
pubDate: 2026-05-24
---

O primeiro **Public Experiment Log** da Open LLMO Research Initiative.

Acabamos de lançar o [`llmo-checker`](https://github.com/open-llmo/llmo-checker), um CLI estilo Lighthouse que mede quão recuperável por IA uma URL é (v0.1 Draft). A primeira coisa que fizemos com ele foi apontá-lo para cada site que operamos.

A manchete do resultado, depois de uma correção: **todas as seis propriedades que possuímos tiraram 90 ou mais**. O artefato mais útil deste experimento é o que aconteceu durante essa *correção* — relatado em detalhes abaixo.

## Metodologia

- Ferramenta: `npx llmo-checker <url>` v0.1.0
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
| `propel-lab.co.jp` | Site institucional do laboratório | **94** | well-grounded | `<meta name="description">` com 47 caracteres (ideal 80–200) |
| `legacydram.com` | Mídia uísque × engenharia | **93** | well-grounded | JSON-LD parcial (sem `Organization`/`Person`) |
| `mypcrig.com` | Curadoria de PC builds | **90** | well-grounded | Sem `hreflang` (ok para site monolíngue) + JSON-LD parcial |
| `kaoriq.com` | E-commerce de fragrâncias | **90** | well-grounded | Sem regras explícitas de bots de IA em robots.txt |

Mediana 93, mínimo 90. Nenhum site abaixo da faixa well-grounded.

É uma tabela bem menos dramática do que a que quase publicamos.

## O que este experimento quase virou

A primeira versão deste registro tinha outra manchete: **"Nosso próprio site institucional tirou 29 / 100, o pior resultado do teste."** Era o tipo de relato auto-crítico que dá credibilidade a um novo projeto de medição.

A história ia assim. Tínhamos medido `propel-lab.com` e tirado 29 / 100 — faixa critical. Tínhamos rodado um `curl` na raiz e encontrado uma linha de HTML:

```bash
$ curl -s https://propel-lab.com/
<!DOCTYPE html><html><head><script>window.onload=function(){window.location.href="/lander"}</script></head></html>
```

Um redirect via `window.location.href` para `/lander`, invisível para todo crawler de IA que conhecemos. Depois rodamos o checker no próprio `/lander` e tiramos **31 / 100**, também critical. Duas camadas, as duas falhando. Tínhamos uma fábula moral redondinha: um laboratório focado em LLMO cujo `.com` institucional não passava no teste de substrate que prega.

Quase publicamos.

## O que segurou

Antes de subir, rodamos mais um curl naquele HTML de destino. Três assinaturas pularam:

```html
<script>window.LANDER_SYSTEM="PW"</script>
<script src="https://www.google.com/adsense/domains/caf.js"></script>
<script src="https://img1.wsimg.com/parking-lander/static/js/main.be9a3b28.js"></script>
```

Essa é a impressão digital de uma **página de domínio estacionado** — `wsimg.com/parking-lander` é um template de parking hospedado por terceiros, servido junto com Google AdSense for Domains. A página opera como um estacionamento, não como site institucional.

Não somos donos de `propel-lab.com`. Nunca fomos. O site institucional é `propel-lab.co.jp`, que tirou **94 / 100** — well-grounded, terceiro melhor da tabela.

Nossa fábula moral era sobre um domínio estacionado por outra pessoa.

## Por que deixamos isso no log

A tentação, depois de pegar um quase-acidente desses pouco antes de publicar, é corrigir o rascunho discretamente e mandar a versão honesta e sem graça, sem deixar registro do caso. Não vamos fazer isso. Três motivos:

1. **Uma iniciativa LLMO que esconde seus quase-acidentes é a mesma que esconde notas ruins.** Se vamos colocar falsificabilidade como princípio declarado, temos que deixar vestígios das falsificações.
2. **O padrão de domínio estacionado é um caso real de falha de substrate.** Qualquer um que registra um `.com` para branding mas nunca serve um site real ali está entregando para crawlers de IA um substrate com o mesmo formato do `propel-lab.com`. Esse insight é o mesmo, independentemente de quem era dono do domínio.
3. **O dogfooding nos deu um dataset só-90+.** É limpo demais para a prova que esperávamos. Se você mede o próprio trabalho e a pior nota é 90, aprendeu que escreve sites consistentemente segundo o próprio padrão — não que o padrão prevê algo útil.

A pergunta substantiva — "o LLMO Score prevê comportamento real de citação por IA?" — não é respondida por um self-audit de seis sites em que tudo passa. Precisa de painel externo de baseline e piloto de correlação com citação. Esses são os dois próximos Experiment Logs.

## O que ainda vamos mudar nos nossos próprios sites

Mesmo sem a história do domínio estacionado, a tabela mostra coisas pequenas que vale corrigir:

1. **Description de `propel-lab.co.jp`** — atualmente 47 caracteres, ideal 80–200. Estender para o mesmo comprimento das outras descrições institucionais do nosso portfólio
2. **Melhorar cobertura de JSON-LD em `mypcrig.com` e `kaoriq.com`** — os dois estão em 82 / 100 no `jsonld` porque emitem alguns mas não todos os tipos relevantes (`Product`, `Person`, `Article`)
3. **Adicionar política explícita de bots de IA no robots.txt de `kaoriq.com`** — hoje neutro; queremos opt-in explícito para GPTBot / ClaudeBot / Google-Extended
4. **Adicionar lista de links ao `/llms.txt` de `llmoframework.com` e `kenimoto.dev`** — os arquivos atuais têm prosa mas sem seção de links; ambos perdem uma fração pequena do peso de `llms-txt`

Quando isso terminar, publicamos um Experiment Log de follow-up com os scores remedidos. Honestos sobre o delta, exista ou não.

## O que aprendemos sem esperar

A lição mais nítida não é sobre substrate. É sobre disciplina narrativa.

Quando a nota de `propel-lab.com` voltou como 29, o primeiro movimento foi construir uma narrativa em volta do número. A narrativa ficou amarrada, contrária ao senso comum, e teria virado um post bem compartilhado. O número é o que tornava a narrativa possível.

O fato de sermos donos de `propel-lab.com` foi assumido sem checagem. É o tipo de suposição que uma narrativa boa reforça, porque admitir a falha colapsa o post inteiro. Pegamos por acaso — rodando mais um curl em outra parte do HTML procurando achados adicionais, não para questionar a premissa.

Para um projeto cuja proposta de valor é *meça seu substrate de IA antes de assumir como ele se parece*, quase publicar uma peça baseada em **não medir a posse do domínio antes de assumir o que era** é o tipo certo de embaraço.

## Limites deste experimento

- v0.1 mede só substrate. Um site pode tirar 95 em substrate e ainda assim ter zero citações em IA porque o conteúdo é desinteressante, contradiz fatos conhecidos, ou duplica fontes de mais autoridade. Citation Visibility fica reservado para v0.2.
- Os pesos (`llms-txt` 20, `robots-ai` 15, `canonical` 15, `jsonld` 20, `meta` 15) foram definidos pelos autores e não foram validados. São valores padrão razoáveis, não derivados de dados de resultado. Vamos recalibrar conforme coletarmos dados de resultado de citação durante a Phase 2.
- Testamos só páginas iniciais. Páginas de artigo de cada site podem ter score diferente.
- O dataset é seis sites que nós mesmos escrevemos segundo nosso próprio padrão. Não diz nada sobre o padrão generalizar.

## Reproduzindo este experimento

```bash
npx llmo-checker@0.1.0 https://llmoframework.com/
npx llmo-checker@0.1.0 https://kenimoto.dev/
npx llmo-checker@0.1.0 https://propel-lab.co.jp/
npx llmo-checker@0.1.0 https://legacydram.com/
npx llmo-checker@0.1.0 https://mypcrig.com/
npx llmo-checker@0.1.0 https://kaoriq.com/
```

Use `--json` para saída legível por máquina. Fixe a versão (`@0.1.0`); o formato do JSON pode mudar na v0.2.

Para reproduzir a detecção de domínio estacionado, rode também:

```bash
npx llmo-checker@0.1.0 https://propel-lab.com/
npx llmo-checker@0.1.0 https://propel-lab.com/lander
curl -s https://propel-lab.com/lander | head -1
```

Os dois primeiros vão devolver notas críticas. O terceiro vai mostrar marcadores `LANDER_SYSTEM` / `parking-lander` / `adsense/domains` no HTML.

## Próximos passos

Este é o primeiro Public Experiment Log da série. Os dois próximos que planejamos rodar:

- **Painel de linha de base externa** — pontuar algumas dezenas de sites técnicos de alto tráfego (portais de documentação, blogs de dev, sites de marketing de produto) e publicar a distribuição. Calibra como "normal" se parece — a comparação que este self-audit sozinho não consegue fazer.
- **Piloto de correlação com citação** — para ~50 URLs, comparar LLMO Score com a taxa real de citação por IA (sondando ChatGPT, Claude e Perplexity). É o primeiro teste real de se o score prevê o resultado que ele afirma prever.

O plano completo está em [Experimental Projects](/pt/experimental-projects/), e os pesos do v0.1 estão definidos em [Score v0.1 Draft Specification](/pt/specifications/score-v01/).

## Update (24/05/2026, mesmo dia): re-medido depois de entregar as quatro correções

As quatro correções listadas em "O que ainda estamos mudando nos nossos próprios sites" entraram no ar no mesmo dia do post original, em duas ondas. Re-medido com `llmo-checker@0.1.0`:

| Site | Antes | Depois | O que ajudou |
|---|---|---|---|
| `llmoframework.com` | 96 | **99** | Seção `## Links` do `/llms.txt` convertida para entradas `- [title](url)` conformes ao spec (llms-txt 90 → 100) |
| `kenimoto.dev` | 96 | **99** | Mesma correção: `## Links`, `## Books`, `## Blog Articles` e `## Research Papers` reescritas como entradas `[title](url)` (llms-txt 90 → 100) |
| `kaoriq.com` | 93 | **96** | Adicionamos um schema `Person` como `@type` independente na home (antes ficava aninhado em `Organization.founder`, e o score conta só uma vez) — jsonld 82 → 94 |
| `mypcrig.com` | 90 | **93** | Mesma correção: `Person` promovido para um bloco `@type` próprio — jsonld 82 → 94 |
| `propel-lab.co.jp` | 96 | 96 | `<meta name="description">` já tinha sido expandido de 47 para 129 caracteres na onda do v1.5.1 |

Os deltas são exatamente o que a regra de scoring publicada prevê: `llms-txt` tem peso 20 × o salto de 10 pontos (90 → 100) = +2 no score total (arredondado para +3 pelo per-check rounding), e o bump de contagem de `@type` em `jsonld` (+12 por `@type` reconhecido, peso 20%) cai como ~+2,4 no total. Esse tipo de previsibilidade explícita é exatamente o que um score transparente estilo Lighthouse ganha como subproduto — e é a propriedade que vamos procurar, na direção inversa, quando os dados do painel de baseline externa chegarem.

As correções foram pequenas em linhas (cada uma levou menos de uma hora, incluindo build e verificação de deploy), o que é a lição mais honesta: o score não apontou nada misterioso ou difícil de consertar. Ele apontou quatro coisas mecânicas que ainda não tínhamos limpado, e uma vez medidas, eram pequenas o suficiente para entregar tudo numa única onda de follow-up.

O que isso **não** provou: que qualquer um desses deltas se correlaciona com o comportamento de citação por IA downstream. Esse continua sendo o trabalho do Experiment Log #3. Este update apenas confirma que o score é internamente consistente — as correções produzem os deltas que o spec prevê. O painel externo e o piloto de correlação com citação continuam sendo o caminho real de validação.
