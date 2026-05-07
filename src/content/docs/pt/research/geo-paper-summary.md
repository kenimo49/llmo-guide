---
title: "Paper GEO: O Que a Ciência Diz"
description: "Resumo do paper GEO (Generative Engine Optimization) de Princeton/IIT Delhi, publicado no KDD 2024. Descobertas principais sobre taxas de citação, estratégias de conteúdo e melhorias estatísticas."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "GEO Paper: What the Science Says",
        "description": "Summary of the GEO paper (KDD 2024) with key findings on AI citation optimization.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"},
        "citation": {
          "@type": "ScholarlyArticle",
          "name": "GEO: Generative Engine Optimization",
          "author": "Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande",
          "datePublished": "2024",
          "url": "https://arxiv.org/abs/2311.09735"
        }
      }
---

O paper **GEO (Generative Engine Optimization)** é o primeiro framework acadêmico para otimizar a visibilidade de conteúdo em motores de busca baseados em IA. Publicado no KDD 2024 (ACM SIGKDD), fornece evidências empíricas para estratégias de otimização de conteúdo nas quais o LLMO Framework se baseia.

## Detalhes do Paper

| Campo | Valor |
|-------|-------|
| Título | GEO: Generative Engine Optimization |
| Autores | Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande |
| Instituição | Princeton University, IIT Delhi, Adobe Research |
| Conferência | KDD 2024 (ACM SIGKDD) |
| arXiv | [2311.09735](https://arxiv.org/abs/2311.09735) |
| Publicado | 2024 |

## Configuração da Pesquisa

Os pesquisadores construíram o **GEO-Bench**, um benchmark de 10.000 consultas de busca em múltiplos domínios. Testaram 9 estratégias de otimização de conteúdo em um motor de busca generativo para medir quais abordagens melhoravam a visibilidade das fontes.

### As 9 Estratégias Testadas

1. Citar Fontes
2. Adição de Citações Diretas
3. Adição de Estatísticas
4. Otimização de Fluência
5. Palavras Únicas
6. Termos Técnicos
7. Tom Autoritativo
8. Linguagem de Fácil Compreensão
9. Keyword Stuffing

## Descobertas Principais

### Eficácia das Estratégias

| Estratégia | Melhoria de Visibilidade | Componente LLMO |
|------------|--------------------------|-----------------|
| **Adição de Estatísticas** | **+115,1%** | Sinais de citação |
| **Citar Fontes** | **+77,0%** | Sinais de citação |
| **Adição de Citações Diretas** | **+72,2%** | Sinais de autoridade |
| Tom Autoritativo | +21,5% | Clareza de conhecimento |
| Otimização de Fluência | +15,2% | Clareza de conhecimento |
| Termos Técnicos | +5,8% | Clareza de conhecimento |
| Linguagem de Fácil Compreensão | +2,4% | Clareza de conhecimento |
| Palavras Únicas | -3,1% | — |
| Keyword Stuffing | -10,2% | — |

### As Três Principais

As três estratégias mais eficazes compartilham uma característica comum: fornecem **evidências externas verificáveis**.

1. **Adição de Estatísticas (+115,1%)**: Adicionar números e pontos de dados específicos tornou o conteúdo mais de duas vezes mais visível. Exemplo: "A receita cresceu 34% a/a" vs. "A receita cresceu significativamente."

2. **Citar Fontes (+77,0%)**: Referenciar papers específicos, relatórios ou documentação aumentou a visibilidade em 77%. Sistemas de IA preferem conteúdo que conseguem cruzar com outras referências.

3. **Adição de Citações Diretas (+72,2%)**: Incluir citações diretas de especialistas ou fontes autoritativas adicionou credibilidade que sistemas de IA reconheceram e citaram.

### O Que Não Funciona

- **Keyword Stuffing (-10,2%)**: Táticas tradicionais de SEO prejudicam ativamente a visibilidade em IA. Sistemas de IA conseguem detectar e penalizar densidade artificial de palavras-chave.
- **Palavras Únicas (-3,1%)**: Usar vocabulário incomum não melhorou a visibilidade. Clareza supera originalidade lexical.

## Implicações para o LLMO

### 1. Sinais de citação são o componente de maior alavancagem

Os dados do GEO mostram que Sinais de citação (estatísticas, fontes, citações diretas) representam as maiores melhorias de visibilidade. É por isso que o LLMO Framework posiciona Sinais de citação como Componente 5 — o ponto culminante que multiplica o efeito de todos os outros componentes.

### 2. A clareza do conteúdo importa, mas menos que a evidência

Estratégias relacionadas à Clareza de conhecimento (tom autoritativo, fluência, linguagem de fácil compreensão) mostraram melhorias positivas, mas modestas (2–22%). Boa escrita é necessária, mas não suficiente. O multiplicador vem de adicionar fatos verificáveis.

### 3. Táticas de SEO são contraproducentes para IA

Keyword stuffing, a base do SEO tradicional, reduziu ativamente a visibilidade em IA. Isso confirma que o LLMO requer uma abordagem fundamentalmente diferente do SEO tradicional.

## Variações por Domínio

O paper GEO constatou que a eficácia das estratégias varia por domínio:

- **Consultas factuais/científicas**: Adição de estatísticas foi mais eficaz
- **Consultas de opinião/subjetivas**: Adição de citações diretas teve melhor desempenho
- **Consultas técnicas**: Citar fontes teve maior impacto

Isso sugere que a implementação do LLMO deve ser adaptada ao seu domínio de conteúdo. Um site de pesquisa se beneficia mais de estatísticas, enquanto um blog de liderança de pensamento se beneficia mais de citações de especialistas.

## Como o LLMO Expande o GEO

O LLMO Framework estende o GEO de três maneiras:

1. **Escopo mais amplo**: GEO foca em motores de busca generativos. O LLMO cobre todas as interações com LLMs, incluindo consultas diretas, RAG e agentes de IA.
2. **Foco em implementação**: GEO identifica *o que* funciona. O LLMO fornece *como implementar* com formatos de arquivo específicos (llms.txt), dados estruturados (JSON-LD) e padrões de design de conteúdo.
3. **Camada de recuperação**: GEO assume que o conteúdo já foi recuperado. O LLMO adiciona o componente de Sinais de recuperação para garantir que o conteúdo seja descobrível em primeiro lugar.

## Leitura Adicional

- [Paper completo no arXiv](https://arxiv.org/abs/2311.09735)
- [Visão Geral do LLMO Framework](/framework/overview/)
- [Sinais de citação](/framework/citation-signals/) — implementando a estratégia GEO mais eficaz
