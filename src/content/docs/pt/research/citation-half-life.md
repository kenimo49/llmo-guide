---
title: "Meia-vida da Citação por IA: Citações São um Fluxo, Não um Estoque"
description: "Citações de IA decaem. Uma medição de 90 dias com protocolo fixo no ChatGPT, Claude e Perplexity encontrou meias-vidas de 3,2 a 9,1 semanas dependendo do tipo de conteúdo e do motor — com páginas evergreen mantendo citações cerca de duas vezes mais do que relatórios de experiência."
pubDate: 2026-07-07
---

**Uma citação de IA não é um troféu que você ganha e mantém. É um bem perecível.** Uma página que cinco motores citam hoje pode perder metade dessa taxa de citação em um mês enquanto seu tráfego de busca no Google permanece estável. Esta página resume as estimativas publicadas de decaimento, um protocolo de medição reproduzível e os números de meia-vida de uma medição de campo de 90 dias.

## As estimativas publicadas

As medições da indústria em 2026 convergem para a mesma forma:

| Achado | Fonte |
|---|---|
| Meia-vida mediana de citação por IA ≈ 4,5 semanas; ChatGPT tem o maior giro, Perplexity sustenta mais tempo | Análise de plataforma Authority Tech |
| Domínios citados por IA renovam-se 40 a 60% a cada mês | Machine Relations |
| Cerca de metade de todo o conteúdo citado por IA tem menos de 13 semanas; páginas atualizadas nos últimos 30 dias recebem várias vezes mais citações | Análise de frescor Authority Tech |

O mecanismo é estrutural, não um julgamento de qualidade. O ranqueamento orgânico do Google para uma página estabelecida é estável: os sinais se movem devagar e uma semana tranquila não o desloca. As citações de IA são puxadas de um índice ao vivo no momento da resposta, e esse índice tem viés para material recente. Uma página não fica pior; o pool com o qual compete fica mais jovem.

Pesquisas recentes de recuperação (TempRetriever, arXiv 2502.21024; trabalho sobre knowledge-drift em limites de RAG, arXiv 2604.05096) modelam a causa subjacente: a recuperação tem viés para conteúdo recente, e o viés se intensifica quando a pergunta é sensível ao tempo.

## Por que um protocolo fixo importa

"Meia-vida" só significa algo em relação a um protocolo congelado. Mude o conjunto de prompts, a cadência ou o critério de sucesso e o número deriva por semanas; duas pessoas citando "4,5 semanas" podem estar medindo fenômenos não relacionados. O protocolo reproduzível, em cinco regras:

1. **Conjunto fixo de prompts** — dez perguntas reais de usuários por página, escritas antes do dia 0 e congeladas. Reescrever um prompt no meio do experimento quebra o benchmark.
2. **Três tentativas por prompt** — sessões separadas, sem histórico. Uma "citação" significa que a URL aparece como fonte clicável em pelo menos uma das três execuções, contada no nível do prompt (contar no nível da lista de fontes dá peso excessivo a motores que retornam mais fontes; uma correção que reduziu os números de uma medição em ~15%).
3. **Cadência semanal fixa** — mesmo dia da semana, mesma janela. Uma semana pulada é um buraco na curva e um ajuste pior.
4. **Dois relógios** — registre a taxa de citação de IA *e* os cliques do Search Console da mesma semana para o mesmo URL. Quando ambas as curvas se movem juntas, algo mais aconteceu (interrupção, mudança de algoritmo, link viral). O sinal é a curva de IA se movendo enquanto a curva de busca se mantém.
5. **O decaimento é ajustado a partir do pico, não da semana 1.** As taxas de citação sobem por duas a quatro semanas enquanto os motores indexam a página, depois decaem. Misturar subida e decaimento em um único ajuste (o erro mais comum em relatos públicos) produz meias-vidas mais planas do que a realidade.

A porção de decaimento se ajusta a uma exponencial: `cites(t) = pico × 0,5^(t / T_meia)`, com `t` em semanas a partir do pico.

## As meias-vidas medidas

Uma execução de 90 dias (13 semanas) deste protocolo em três páginas de um site técnico, no ChatGPT (busca na web ativada), Claude (modo web padrão) e Perplexity (Sonar Pro):

| Tipo de página | ChatGPT | Claude | Perplexity |
|---|---|---|---|
| How-to evergreen | 6,8 sem | 7,4 sem | 9,1 sem |
| Relatório de experiência | 3,2 sem | 3,6 sem | 4,4 sem |
| Post de metodologia | 5,1 sem | 5,9 sem | 6,7 sem |

Três achados, em ordem de surpresa:

1. **O tipo de conteúdo domina.** A página evergreen manteve citações cerca de 2× mais do que o relatório de experiência em todos os motores. Os motores valorizam o frescor, mas também valorizam se a página ainda responde à pergunta: um how-to continua respondendo por meses; um relatório de experiência para rapidamente. Fazer a média entre tipos de página reproduz o título publicado de "≈4,5 semanas" enquanto oculta a variação de 2× que realmente importa.
2. **O Perplexity decai mais devagar em todas as três páginas** (sua orientação de ranqueamento publicada coloca o frescor em ~15% do peso), **o ChatGPT mais rápido em todas as linhas**, consistente com os relatórios de giro por plataforma.
3. **As atualizações restauram as citações parcialmente e de forma desigual.** Uma atualização *substantiva* (nova seção, nova tabela de dados) no relatório de experiência recuperou o ChatGPT para ~70% do pico em duas semanas, o Claude para ~60%, o Perplexity para ~75% até a semana 12, nunca de volta ao pico. Um simples ajuste de dateline em uma execução anterior de nove semanas não produziu nada mensurável. O primeiro lançamento importa mais do que qualquer atualização.

Dados completos e protocolo: [o relatório de metodologia de 90 dias](https://kenimoto.dev/blog/measuring-ai-citation-half-life-90-day-methodology/) (em inglês) e [o log inicial de decaimento de nove semanas](https://kenimoto.dev/blog/ai-citations-half-life-decay/) (em inglês).

## Consequências operacionais

- **Classifique cada página como evergreen ou com prazo de validade antes de publicar.** Páginas evergreen recebem atualizações substantivas na cadência que a meia-vida implica (aproximadamente a cada 6 a 8 semanas). Páginas com prazo de validade não são atualizadas: nenhuma edição torna um relatório de experiência desatualizado relevante novamente; elas são arquivadas e substituídas.
- **Reporte métricas de citação como taxas ao longo do tempo, nunca como snapshots.** "Citado por cinco motores" é verdade na segunda-feira e mentira no mês seguinte. A linha de tendência ao longo de um conjunto fixo de prompts é a métrica honesta; veja [Medindo o LLMO](/pt/guide/measuring-llmo/) para o ciclo semanal no qual isso se encaixa.
- **Ser citado é um problema de lançamento; continuar sendo citado é um problema de retenção.** Os [Sinais de Citação](/pt/framework/citation-signals/) governam se você entra no pool de citações. A [Autoridade](/pt/framework/authority-signals/) e a [Coerência](/pt/framework/coherence-signals/) (mais a cadência de atualização) governam se você permanece nele.

## Limites da medição

Um único site, três páginas, um evento de atualização: a resposta assimétrica de atualização entre motores pode ser uma diferença no peso de frescor ou ruído. Posts de metodologia se autocanibalizam (motores podem responder a novos prompts com o post de medição mais antigo). E uma janela de 13 semanas não consegue mostrar se as meias-vidas diminuem ainda mais à medida que os índices dos motores crescem. Trate os valores de meia-vida como o resultado de um protocolo defensável, não como constantes.
