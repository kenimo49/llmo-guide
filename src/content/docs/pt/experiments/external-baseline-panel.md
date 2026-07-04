---
title: "Public Experiment Log #2: Painel de baseline externa"
description: "Pontuamos 39 sites técnicos de alto tráfego com llmo-checker@0.1.0 para calibrar o que é 'normal'. A mediana é 61. Três dos maiores portais de documentação ficam abaixo de 40."
pubDate: 2026-05-24
---

O primeiro Public Experiment Log pontuou seis sites que operamos. Os seis aterrissaram em 90+. O texto foi honesto em reconhecer que era limpo demais para servir de prova de qualquer coisa. Esta é a calibração que o primeiro log não conseguiu entregar: um painel de 39 sites técnicos de alto tráfego que não operamos, pontuados com a mesma ferramenta, no mesmo dia.

A manchete do resultado é morna e a manchete do resultado é desconfortável. A parte morna: a mediana é 61, com desvio padrão de 19,5 — uma distribuição de cara normal, centrada bem abaixo de "bom". A parte desconfortável: três dos portais de documentação mais visitados da web moderna — `rust-lang.org`, `tailwindcss.com`, `djangoproject.com` — ficam abaixo de 40.

## Metodologia

Um painel de 40 URLs foi selecionado para cobrir três categorias: documentação voltada a desenvolvedores (20), sites de marketing de produto (12) e blogs de engenharia (6). Dois URLs adicionais (`docs.anthropic.com`, `platform.openai.com/docs/`) entraram como par "sanity-check de docs de provedor de IA". A seleção foi feita antes da rodada de medição; nenhum URL foi adicionado ou removido com base no score.

Os 40 URLs foram medidos com `llmo-checker@0.1.0` em uma única rodada em lote, com um segundo de intervalo entre requisições. Um URL (`platform.openai.com/docs/`) devolveu erro de parsing e foi descartado, deixando **n = 39**.

O mesmo User-Agent (`llmo-checker/0.1.0`) foi usado em toda requisição, casando com o que um crawler de IA leitor das nossas recomendações enviaria. Nenhum site foi tentado de novo; vale a primeira medição.

## Resultados

| Estatística | Valor |
|---|---|
| n | 39 |
| Média | 58,8 |
| Mediana | 61 |
| Desvio padrão | 19,5 |
| Q1 / Q3 | 45 / 69 |
| Mín / Máx | 23 / 94 |

### Distribuição de score (faixas de 10 pontos)

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

A distribuição é aproximadamente bimodal: um agrupamento por volta de 40–49 (sites de primeiro escalão e meio de tabela com legibilidade-de-máquina fraca) e outro maior por volta de 60–69 (sites meio-de-tabela com a maior parte das coisas em pé, mas `jsonld` e/ou `llms.txt` ausentes).

### Top 5

| # | Site | Score |
|---|---|---|
| 1 | `supabase.com` | 94 |
| 2 | `redis.io` | 93 |
| 2 | `www.cloudflare.com` | 93 |
| 4 | `stripe.com` | 89 |
| 5 | `docs.docker.com` | 84 |

### Bottom 5

| # | Site | Score |
|---|---|---|
| 39 | `www.rust-lang.org` | 23 |
| 38 | `tailwindcss.com` | 25 |
| 37 | `www.djangoproject.com` | 26 |
| 36 | `www.postgresql.org` | 32 |
| 35 | `golang.org` | 37 |

### Por categoria

| Categoria | n | Mediana | Média | Faixa |
|---|---|---|---|---|
| Marketing de produto | 12 | 68,5 | 74,8 | 58–94 |
| Blog de dev | 6 | 65,0 | 65,3 | 44–80 |
| Documentação | 20 | 45,5 | 48,0 | 23–93 |

### Medianas por check

| Check | Mediana | Média | Faixa |
|---|---|---|---|
| `llms-txt` | 90 | 54,9 | 0–100 |
| `robots-ai` | 80 | 78,7 | 60–100 |
| `canonical` | 90 | 67,9 | 0–100 |
| `jsonld` | **0** | 26,1 | 0–94 |
| `meta` | 80 | 78,5 | 0–100 |

## O que nos surpreendeu

**Sites de documentação são a categoria mais fraca.** Era a previsão que teríamos errado se perguntada de antemão. A suposição padrão — inclusive a nossa, antes dos dados chegarem — era que portais de docs seriam a *melhor* categoria, porque sempre foram fonte autoritativa curada tanto para humanos quanto para mecanismos de busca. Os dados dizem o oposto: a mediana de documentação (45,5) está mais de 20 pontos abaixo da mediana de marketing de produto (68,5). Portais de documentação são amplamente amados, maduros e bem desenhados para humanos, mas as mesmas equipes não investiram, em média, na superfície legível por máquina.

**O chão do schema.org é muito baixo.** A mediana de `jsonld` no painel é **0**. Mais da metade desses sites técnicos famosos não emite nenhum `@type` JSON-LD reconhecível. A média é puxada para cima até 26 por um pequeno número de sites bem instrumentados (em sua maioria marketing de produto). Um score `jsonld` de 0 não quer dizer que o site está quebrado — quer dizer que não existe superfície de grafo de entidades sobre a qual um crawler de IA possa firmar uma citação.

**`llms.txt` é bimodal, não gradual.** A mediana é 90, mas a média é 54,9. Ou o site investiu em um `/llms.txt` conforme ao spec (90s e 100s limpos) ou simplesmente não tem o arquivo (0). Pouquíssimos sites ficam no meio. Isso quer dizer que o custo de ir de 0 → 90+ em `llms-txt` é um único commit de arquivo, não uma migração em várias fases.

**Os três scores mais baixos são nomes famosos.** `rust-lang.org` (23), `tailwindcss.com` (25) e `djangoproject.com` (26) são os URLs de menor score no painel inteiro. Também estão entre os URLs de desenvolvedor mais visitados da web por qualquer estimativa razoável de tráfego. O score não mede tráfego, reconhecimento de marca ou qualidade de conteúdo. Mede se um crawler de IA consegue firmar uma citação sobre os metadados da página — e nesse eixo único, esses três estão no fundo.

**A família `Cloudflare` pontua 93 / 64 / 44 em três URLs.** `www.cloudflare.com` (93) é a página de produto principal; `www.cloudflare.com/blog/` (64) é o índice do blog; `blog.cloudflare.com` (44) é o frontend do subdomínio do blog. Mesma organização de engenharia, três superfícies diferentes, 50 pontos de variação. Organizações multi-site costumam ser desiguais assim, e nosso próprio portfólio confirma (o Experiment Log do v1.5.1 já documentou nossa própria variação 90–99 vs 96 vs 94).

## Onde nossos sites operados ficam

O primeiro Experiment Log pontuou seis sites que operamos entre 93–99. Isolado, parecia desconfortavelmente alto. Agora ganha contexto:

| Site | Score | Percentil no painel (aprox.) |
|---|---|---|
| `llmoframework.com` | 99 | > 99º |
| `kenimoto.dev` | 99 | > 99º |
| `kaoriq.com` | 96 | > 95º |
| `propel-lab.co.jp` | 96 | > 95º |
| `mypcrig.com` | 93 | > 90º (empatado com `supabase.com` e `redis.io`) |
| `legacydram.com` | — | (não foi remedido nesta rodada) |

Isso coloca nossos sites operados bem no topo de um painel técnico de alto tráfego com 39 sites. Não achamos que isso signifique que nosso conteúdo é melhor que o de `rust-lang.org` ou `stripe.com`. Significa que viemos medindo e corrigindo os mesmos cinco checks mecânicos que o score mira, que é exatamente o que uma ferramenta construída por dentro deve facilitar.

Esta é a calibração que faltou ao primeiro log. O agrupamento 90+ onde nos sentamos não é normal. É o agrupamento dos sites que decidiram otimizar especificamente para a superfície legível por máquina, e neste painel essa decisão separa um pequeno grupo do topo de uma cauda longa na faixa 40–69.

## O que isso ainda não prova

O score é internamente consistente (a atualização do Experiment Log #1 confirmou que as correções produzem os deltas que o spec prevê). O score agora também tem um painel externo para comparação. Mas nenhum desses dois fatos equivale a provar que um score mais alto causa uma taxa de citação por IA mais alta.

Esse continua sendo o trabalho do Experiment Log #3 (piloto de correlação com citação). Para 50 URLs cobrindo toda a faixa de score — incluindo alguns do bottom 5 do painel e alguns do top 5 — vamos comparar o LLMO Score com a taxa real de citação por IA (Perplexity API + busca do ChatGPT + ferramenta web do Claude). Se o score é real, o bottom 5 deste painel deveria ser citado bem menos que o top 5, em consultas onde qualquer um deles seria fonte crível.

A versão honesta desta atualização é: o score passou agora em dois dos três testes que uma ferramenta de medição precisa passar. É internamente consistente (update v1.5.2) e produz distribuição não-chapada contra um painel externo crível (este log). O terceiro teste — ele prevê o resultado que afirma prever — é o que decide se o projeto vale a pena continuar.

## Limites

O painel é pequeno (n = 39) e em inglês. Não há site em japonês, chinês, alemão ou francês na rodada — escolha deliberada para manter o primeiro painel focado, mas uma limitação real para calibração entre idiomas.

A divisão por categoria é desigual: 20 docs, 12 marketing de produto, 6 blogs de dev. Isso faz as medianas por categoria serem direcionais, não estatisticamente apertadas (especialmente blogs de dev com n = 6).

A seleção foi feita por nós, antes da rodada de medição. Tentamos privilegiar URLs técnicos famosos e de alto tráfego para minimizar a objeção "vocês escolheram a dedo sites fracos", mas viés de seleção não pode ser descartado. A lista crua de URLs está commitada junto com este post (`experiments/external-baseline-2026-05/urls.txt`) para o painel poder ser reproduzido ou expandido.

`platform.openai.com/docs/` foi descartado porque o checker não devolveu JSON parseável. Esse é um caso de viés de sobrevivência; a comparação entre docs de provedores de IA teria sido mais interessante com os dois pontos do que com um só (`docs.anthropic.com` ficou em 64).

## Reproduzindo este experimento

```bash
git clone https://github.com/open-llmo/llmo-checker
cd llmo-checker
npm install && npm run build

# Pegar a lista de URLs e o script de rodada
cd experiments/external-baseline-2026-05
cat urls.txt          # 40 URLs
bash run-measurements.sh   # gera results/*.json
python3 analyze.py    # imprime o sumário acima
```

Os arquivos crus em `results/*.json` estão commitados; rodar contra os mesmos URLs com `llmo-checker@0.1.0` deve produzir resultados dentro de ±1 dos scores deste post (sites mudam entre rodadas; uma nova tag `<meta>` pode deslocar `meta` em 10).

## Próximos passos

O roadmap segue inalterado em relação ao fechamento do Experiment Log #1:

- **Experiment Log #3 — Piloto de correlação com citação.** Para ~50 URLs cobrindo a faixa de score, sondar Perplexity / ChatGPT / Claude com o mesmo conjunto de consultas e calcular a correlação entre LLMO Score e taxa de citação. Esta é a validação real: o score prevê o que afirma prever?
- **Pesos do score v0.2.** Se os dados de correlação com citação aterrissarem como esperado, os pesos por check serão recalibrados para maximizar a correlação observada. Se não aterrissarem, o spec ganha um post de follow-up bem mais interessante.

O roadmap completo está em [Experimental Projects](/pt/experimental-projects/), e os pesos do score v0.1 estão definidos em [Score v0.1 Draft Specification](/pt/specifications/score-v01/).
