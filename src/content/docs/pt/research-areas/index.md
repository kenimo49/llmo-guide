---
title: "Áreas de Pesquisa — 5 Domínios"
description: "Cinco áreas de pesquisa da Open LLMO Research Initiative: AI Citation Analysis, Grounding Visibility, LLM Retrieval Optimization, AI-native Documentation e Agent-oriented Information Architecture."
pubDate: 2026-05-24
---

A Open LLMO Research Initiative organiza seu trabalho em cinco áreas de pesquisa. Cada área roda de forma independente, mas alimenta o conjunto de métricas definido pelo [LLMOFramework Score](/pt/experimental-projects/).

## Visão geral

| Área | Pergunta central |
|------|------------------|
| [1. AI Citation Analysis](#1-ai-citation-analysis) | Que conteúdo LLMs citam, e em que condições? |
| [2. Grounding Visibility](#2-grounding-visibility) | Como tornar visíveis as fontes de grounding da IA? |
| [3. LLM Retrieval Optimization](#3-llm-retrieval-optimization) | Como otimizar documentos para a camada de retrieval de LLMs? |
| [4. AI-native Documentation](#4-ai-native-documentation) | Que formatos de documento LLMs processam melhor? |
| [5. Agent-oriented Information Architecture](#5-agent-oriented-information-architecture) | Que estruturas de informação são mais fáceis de navegar para agentes de IA? |

---

## 1. AI Citation Analysis

### Escopo

Análise de qual conteúdo é citado por LLMs (ChatGPT, Claude, Gemini, Perplexity) para um dado tópico. As observações cobrem frequência de citação, características estruturais dos documentos citados e o caminho de retrieval que levou à citação.

### Perguntas-chave

- Quanto os domínios citados se sobrepõem entre LLMs para o mesmo tópico?
- É possível identificar as características estruturais (hierarquia de headings, tabelas, densidade estatística, contagem de links externos) dos documentos citados?
- É possível construir um checklist a posteriori para tornar conteúdo mais provável de ser citado?

### Direção atual

A coleta de dados para observação de citações por IA está em curso. Plano para Phase 1: enviar Citation Visibility como métrica no OSS `llmo-checker`.

---

## 2. Grounding Visibility

### Escopo

Visualização de grounding para respostas de IA. Cobre em que um LLM se apoiou para produzir uma resposta e se essa fonte pode ser rastreada até uma referência primária verificável.

### Perguntas-chave

- É possível definir um método-padrão de reverse lookup da resposta da IA até o documento fonte?
- Tornar o grounding "visível" no site (fontes explícitas, referências de dados, formatação de citação) correlaciona com taxas mais altas de citação por IA?
- Há correlação entre alucinação e grounding fraco?

### Direção atual

Parcialmente abordado como Citation Signals (o quinto componente do LLMO Framework). Plano para Phase 1: quantificar como métrica de Grounding Stability.

---

## 3. LLM Retrieval Optimization

### Escopo

Otimização no lado do documento para a camada de retrieval de LLMs (RAG, embedding retrieval, plugins de busca na web, etc.). Cobre estratégia de chunking, estrutura semântica, comprimento de documento e design de headings.

### Perguntas-chave

- Como varia a relação entre tamanho de chunk e precisão de retrieval entre tópicos?
- Qual é a diferença de eficiência de retrieval entre Markdown, HTML e JSON-LD?
- Como a densidade de links internos contribui para expansão de contexto em busca por IA?

### Direção atual

O próprio llmoframework.com serve como referência de implementação. Plano para Phase 1: publicar um experimento de comparação de chunking.

---

## 4. AI-native Documentation

### Escopo

Pesquisa sobre formatos de documento que LLMs leem e escrevem bem. Cobre llms.txt, convenções de Markdown e a forma ótima de metadados orientados a IA.

### Perguntas-chave

- Quais LLMs e crawlers realmente consultam llms.txt?
- Onde fica o balanço ótimo entre eficiência de retrieval e poder expressivo entre Markdown e HTML?
- Metadados estruturados para IA (JSON-LD, etc.) afetam taxas de citação?

### Direção atual

Implementação e medição de efeito de llms.txt em curso. Plano para Phase 1: publicar a ferramenta OSS llms.txt-validator.

---

## 5. Agent-oriented Information Architecture

### Escopo

Pesquisa sobre arquitetura da informação para agentes de IA (Claude Code, Cursor, agentes autônomos, etc.). Cobre exposição de MCP (Model Context Protocol), design de documentação de API e descobribilidade.

### Perguntas-chave

- Sites que expõem servidores MCP têm vantagem em visibilidade na busca por IA?
- Docs de API agent-readable (OpenAPI + linguagem natural) são mais descobríveis do que referências de API puras?
- É possível estabelecer métodos para observar comportamento de exploração de agentes autônomos?

### Direção atual

Experimentos sobre o impacto da exposição de MCP na visibilidade de busca em curso. Plano para Phase 1: propor métrica preliminar de Agent Visibility.

---

## Mapeamento para Phases

| Área | Entrega planejada para Phase 1 |
|------|--------------------------------|
| AI Citation Analysis | Métrica Citation Visibility no `llmo-checker` |
| Grounding Visibility | Métrica Grounding Stability + dataset de avaliação |
| LLM Retrieval Optimization | Relatório de experimento de comparação de chunking |
| AI-native Documentation | OSS llms.txt-validator |
| Agent-oriented IA | Métrica preliminar de Agent Visibility |

O progresso de cada área é publicado no [Changelog](/pt/changelog/) e nas [GitHub Issues](https://github.com/kenimo49/llmo-guide/issues).
