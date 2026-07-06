---
title: LLMO vs SEO vs AEO vs GEO
description: "Comparação entre LLMO, SEO, AEO e GEO. O LLMO é o framework guarda-chuva que inclui AEO e GEO enquanto cobre todas as interações com LLMs."
pubDate: 2026-05-07
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Qual é a diferença entre LLMO, SEO, AEO e GEO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O SEO otimiza para posições em motores de busca (Google, Bing). O AEO otimiza para se tornar a resposta direta em motores de resposta (assistentes de voz, featured snippets). O GEO otimiza a visibilidade em motores de busca generativos (ChatGPT, Perplexity). O LLMO é o termo guarda-chuva que inclui AEO e GEO e se estende a todas as interações com LLMs, incluindo consultas diretas em chat, aplicações RAG e agentes de IA autônomos."
            }
          },
          {
            "@type": "Question",
            "name": "Como LLMO, AEO e GEO se relacionam?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O LLMO é o guarda-chuva mais amplo que contém tanto o AEO (focado em motores de resposta) quanto o GEO (focado em busca generativa). O AEO é um subconjunto do GEO, e o GEO é um subconjunto do LLMO. O LLMO cobre ainda consultas diretas a LLMs e agentes de IA, que os termos mais restritos não abordam."
            }
          },
          {
            "@type": "Question",
            "name": "Para qual devo otimizar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Otimizar para o LLMO cobre AEO e GEO como efeito colateral, porque o LLMO é um superconjunto. Sites que otimizam apenas para SEO ainda aparecem no Google, mas podem ser invisíveis para ChatGPT, Claude, Gemini e Perplexity. Comece pelo LLMO se o seu público usa ferramentas de IA para descobrir conteúdo."
            }
          },
          {
            "@type": "Question",
            "name": "LLMO e SEO entram em conflito?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Parcialmente. As táticas de LLMO se dividem em três classes em relação ao SEO: táticas que coexistem (poda de conteúdo, títulos estruturados, estatísticas e citações) ajudam ambos; táticas condicionais (links internos, consistência de palavras-chave) ajudam ou prejudicam dependendo da execução; táticas conflitantes (reescritas agressivas com resposta imediata, condensação excessiva do corpo do texto) podem aumentar as citações de IA enquanto reduzem o tempo de permanência, a profundidade temática e o tráfego de busca. Aplique as táticas que coexistem em todo o site, distribua as táticas conflitantes por função de página e meça SEO e LLMO com métricas separadas."
            }
          }
        ]
      }
---

## A Evolução da Otimização de Busca

```
1997: SEO — Otimize para motores de busca
2018: AEO — Otimize para motores de resposta
2023: GEO — Otimize para motores generativos
2024: LLMO — Otimize para todas as interações com LLMs
```

## Comparação

| | SEO | AEO | GEO | LLMO |
|---|---|---|---|---|
| **Foco** | Posições na busca | Respostas de IA | Busca generativa | Todas as interações com LLMs |
| **Alvo** | Google, Bing | Assistentes de voz, busca por IA | Motores de busca com IA | ChatGPT, Claude, Gemini, Perplexity |
| **Respaldo acadêmico** | Décadas de pesquisa | Limitado | Princeton (KDD 2024) | Emergente |
| **Framework** | Bem estabelecido | Informal | Focado em pesquisa | LLMO Framework (6 componentes) |
| **Escopo** | Busca na web | Restrito (apenas respostas) | Restrito (busca generativa) | Amplo (todos os contextos de LLM) |

## A Relação

O LLMO inclui abordagens como AEO e GEO, ao mesmo tempo que vai além da busca para cobrir todos os contextos em que LLMs interagem com conteúdo web.

```
LLMO (todas as interações com LLMs)
├── GEO (motores de busca generativos)
│   └── AEO (busca focada em respostas)
└── Consultas diretas a LLMs (ChatGPT, Claude, etc.)
    └── Aplicações baseadas em RAG
    └── Agentes de IA navegando na web
```

## LLMO e SEO entram em conflito?

Parcialmente — e "aplicar todas as táticas de LLMO em todas as páginas" é a forma específica como os sites descobrem isso. Em um caso documentado, um site que adotou reescritas com resposta imediata, texto condensado e títulos em forma de pergunta em todas as páginas viu as citações de IA aumentarem em um mês enquanto o Google Search Console mostrava uma queda no tráfego de busca existente ([relatório de campo](https://zenn.dev/kenimo49/articles/llmo-seo-tradeoff-coexist-design) (em japonês)).

Em relação ao SEO, as táticas de LLMO se dividem em três classes:

**1. Táticas que coexistem — aplique em todo o site sem hesitar**

- **Poda de conteúdo**: consolidar páginas rasas ou duplicadas ajuda tanto o SEO (equity de links, sinais de qualidade) quanto o LLMO — múltiplas URLs competindo pelo mesmo conceito passam uma imagem de baixa confiança para os motores generativos. Combine a poda com a manutenção atualizada da página sobrevivente: páginas desatualizadas perdem frequência de citação.
- **Títulos estruturados e formatação Q&A**: extração mais rica para a IA, snippets mais ricos para a busca.
- **Estatísticas e fontes citadas**: a tática de coexistência mais forte. A pesquisa GEO mostra que adicionar estatísticas aumenta as taxas de citação; os mesmos dados primários fortalecem o E-E-A-T. As próprias diretrizes de otimização para IA do Google posicionam a visibilidade generativa como uma extensão do SEO forte, não uma substituição.

**2. Táticas condicionais — o resultado depende da execução**

- **Links internos**: podar sem redirecionar links cria páginas órfãs que quebram tanto a navegação humana quanto os caminhos dos crawlers. Poda e revinculação devem ser uma operação única.
- **Palavras-chave**: a repetição por densidade measurably *reduz* a visibilidade para a IA, enquanto a terminologia consistente no nível de entidade ajuda ambos os motores. Consistência supera densidade.

**3. Táticas conflitantes — distribua por função de página, nunca aplique de forma uniforme**

- **Estrutura com resposta imediata** melhora a citação de IA (a recuperação em tempo real julga a relevância pelo trecho de abertura), mas pode reduzir o tempo de permanência e a profundidade de rolagem quando os leitores obtêm a resposta completa já no início.
- **Condensação excessiva** facilita a extração de fragmentos, mas remove a profundidade temática e a cobertura de cauda longa que a busca recompensa. A solução é estrutural: mantenha resumos iniciais e frases de abertura de seção enxutos, preserve a profundidade total do corpo e use listas e tabelas para tornar o conteúdo aprofundado extraível. Encurte a *distância até a resposta*, não o conteúdo.

A resolução é a atribuição de função por página: páginas de glossário e FAQ vão totalmente com resposta imediata; estudos de caso e páginas técnicas aprofundadas mantêm um resumo inicial, mas preservam a profundidade. Não tente maximizar as duas disciplinas em uma única página.

**Meça as duas disciplinas separadamente.** Um painel combinado dilui o trade-off — as citações de IA sobem enquanto o tráfego de busca se erode silenciosamente. Acompanhe o SEO pelo Search Console (tráfego, posição) e o LLMO por consultas diretas a IA em sessões novas ([Medindo o LLMO](/pt/guide/measuring-llmo/) cobre as métricas). Somente o acompanhamento lado a lado revela a taxa de câmbio real que uma tática tem.
