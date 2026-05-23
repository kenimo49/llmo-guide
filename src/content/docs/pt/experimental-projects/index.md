---
title: "Projetos Experimentais"
description: "Três projetos experimentais da Open LLMO Research Initiative: LLMOFramework Score, LLMOFramework Benchmark e LLMOFramework Compatible."
pubDate: 2026-05-24
---

Projetos experimentais publicados pela Open LLMO Research Initiative. Todos são entregues em estado **Draft / Experimental**. Status de especificação formal fica adiado para Phase 3.

## Visão geral

| Projeto | Função | Análogo | Status |
|---------|--------|---------|--------|
| [1. LLMOFramework Score](#1-llmoframework-score) | Medir descobribilidade por IA de um site | Lighthouse Score | Indicadores em rascunho (Draft v0.1 na Phase 1) |
| [2. LLMOFramework Benchmark](#2-llmoframework-benchmark) | Comparar estruturas de site experimentalmente | Benchmark de referência do setor | Em planejamento (Phase 1-2) |
| [3. LLMOFramework Compatible](#3-llmoframework-compatible) | Badge de certificação para sites em conformidade | Marca "Certified" | Apenas no plano (Phase 3) |

---

## 1. LLMOFramework Score

### O que mede

Score por site de quão reconhecível, citável e parseável o conteúdo é para a IA. O contraponto da era IA ao Domain Authority do SEO ou ao Lighthouse Score.

### Indicadores candidatos (v0.1 Draft)

| Indicador | Descrição |
|-----------|-----------|
| Citation Visibility | Se o conteúdo é citado pela IA |
| Chunk Readability | Quão bem o conteúdo se divide em chunks |
| Semantic Structure | Quão explícita é a estrutura semântica |
| AI Crawlability | Compatibilidade com crawlers de IA |
| llms.txt | Conformidade com llms.txt |
| Markdown Quality | Qualidade estrutural |
| Entity Clarity | Facilidade de reconhecimento de entidades |
| Retrieval Stability | Consistência de retrieval |

Cada indicador é entregue com **fórmula de cálculo e código de checker OSS**. O Lighthouse conquistou confiança porque era mensurável e reprodutível, e este projeto adota o mesmo princípio.

### OSS relacionado

`llmo-checker` está planejado para a Phase 1.

```
npx llmo-checker https://example.com

LLMOFramework Score: 74

Citation Visibility: 81
Semantic Chunkability: 68
AI Readability: 77
Grounding Stability: 70
```

### Status

As definições de indicador estão em rascunho. A publicação de Draft v0.1 está mirada para a Phase 1 (data a definir).

---

## 2. LLMOFramework Benchmark

### O que compara

Comparação experimental de quais estruturas de site têm melhor desempenho para IA. Como não existe benchmark padrão para retrieval e citação por IA ainda, este projeto propõe primeiro uma metodologia de medição.

### Eixos de comparação candidatos

- Markdown vs HTML
- Presença de FAQ schema
- Estrutura de tabela
- Tamanho de chunk
- Formato de citação
- Linkagem interna
- Integração com GitHub
- Conformidade com llms.txt
- Exposição de MCP

### Política de publicação

Cada experimento é entregue como **Reproducible Benchmark Report** no GitHub e neste site, incluindo o dataset, scripts de medição, resultados brutos e prompts de avaliação.

### Status

Em planejamento. O primeiro experimento de comparação (Markdown vs HTML, eficiência de retrieval) está planejado para a Phase 1.

---

## 3. LLMOFramework Compatible

### Propósito do badge

Marca de certificação para sites em conformidade com estrutura otimizada para IA. Pensada para ser exibida por SaaS, sites de documentação, projetos OSS e produtos de IA.

### Conceito visual

```
[ LLMOFramework Compatible ]
[ AI Retrieval Ready ]
[ Grounding Optimized ]
```

### Requisitos de conformidade (rascunho conceitual)

| Requisito | Conteúdo |
|-----------|----------|
| Colocação de llms.txt | Um llms.txt válido existe na raiz do site |
| Semantic Structure | Páginas principais satisfazem hierarquia de headings e HTML semântico |
| Chunk Optimization | Seções principais cabem dentro do intervalo recomendado de chunk size |
| Grounding-friendly Docs | Citações, fontes de dados e datas de atualização são explícitas |

### Status

**Apenas no plano**. Posicionado na Phase 3 (última). As razões:

- Certificação depende de adoção pelo ecossistema, então Score e Benchmark precisam amadurecer antes
- Emitir certificação operando solo lê como autoridade de fachada e corrói confiança
- O badge Compatible será desenhado apenas depois que a comunidade Open Source tiver produzido adoção por terceiros

---

## Mapeamento para Phases

| Phase | Progresso dos projetos |
|-------|------------------------|
| Phase 0 (atual) | Rascunho de indicadores, publicação do conceito dos projetos |
| Phase 1 | Score Draft v0.1, OSS `llmo-checker`, primeiro Benchmark Report |
| Phase 2 | Revisão do Score, updates contínuos do Benchmark, integração de feedback da comunidade |
| Phase 3 | Design da certificação Compatible, especificações formais, formação de Working Group |

Código-fonte e discussão de cada projeto são públicos no [repositório GitHub](https://github.com/kenimo49/llmo-guide) e nas [Issues](https://github.com/kenimo49/llmo-guide/issues).
