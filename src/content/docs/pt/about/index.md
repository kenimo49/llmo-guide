---
title: "Sobre a Open LLMO Research Initiative"
description: "Missão, princípios de pesquisa, Founder e plano de Phases da Open LLMO Research Initiative."
pubDate: 2026-05-24
---

A **Open LLMO Research Initiative** é uma iniciativa independente de pesquisa sobre retrieval, citação e grounding para a web aberta no contexto de IA. Publica especificações, benchmarks e ferramentas open-source como suas principais entregas.

## Missão

Pesquisar retrieval AI-native, visibilidade de grounding e arquitetura da informação orientada a LLM, e publicar métricas e especificações reprodutíveis.

### Áreas de pesquisa

| Área | Escopo |
|------|--------|
| AI Citation Analysis | Condições em que LLMs citam conteúdo, e frequência de citação |
| Grounding Visibility | Métodos para tornar visível em que a IA baseia suas respostas |
| LLM Retrieval Optimization | Otimização de documentos para a camada de retrieval de LLMs |
| AI-native Documentation | Pesquisa sobre formatos de documento que LLMs processam bem |
| Agent-oriented Information Architecture | Estruturas de informação operáveis por agentes de IA |

## Por que esta Initiative

O espaço LLMO / AEO / GEO cresce rápido, mas três peças fundamentais estão ausentes:

- **Sem medição reprodutível** — não existe ferramenta pública que cumpra o papel do Lighthouse ou do PageSpeed Insights para descobribilidade por IA
- **Sem vocabulário ou escopo compartilhado** — cada fornecedor publica definições próprias e o campo está fragmentado
- **Pouco dado experimental aberto** — ferramentas comerciais de SEO dominam e a camada de pesquisa é fina

Esta Initiative foi construída para preencher essas três lacunas. O objetivo é cumprir, para LLMO, o papel que o Lighthouse cumpre para SEO: publicar a metodologia, entregar as ferramentas e deixar a comunidade construir a partir disso.

## Princípios de pesquisa

| Princípio | Significado |
|-----------|-------------|
| Reproducibility first | Cada métrica vem com fórmula de cálculo e checker OSS |
| Draft over Standard | Especificações são publicadas como "Draft / Experimental / Proposal v0.1" para permanecerem revisáveis |
| Open Source first | Ferramentas sob licenças OSS, dados sob CC BY, especificações sob MIT |
| Solo-honest | A operação solo é declarada explicitamente, em vez de disfarçada como consórcio |

## Founder

[Ken Imoto](https://kenimoto.dev). Autor de múltiplos livros sobre LLMO e harness engineering, publicados na Zenn e na Amazon Kindle. Fundador e CEO da Propel-Lab Inc. Responsável pela implementação e operação de múltiplos frameworks internos e do llmoframework.com.

Publicações principais:

- Livros: [Lista completa (kenimoto.dev/pt/books)](https://kenimoto.dev/pt/books/)
  - Série LLMO (Kindle / Zenn Book, em japonês, inglês, português e espanhol)
  - Série de harness engineering (Kindle / Zenn Book)
- Web: [kenimoto.dev](https://kenimoto.dev) / [propel-lab.co.jp](https://propel-lab.co.jp)
- Página do autor na Amazon: [Ken Imoto on Amazon](https://www.amazon.co.jp/stores/author/B0GQNPRCGF)
- Zenn: [zenn.dev/kenimo49](https://zenn.dev/kenimo49)
- OSS: [github.com/kenimo49](https://github.com/kenimo49)

## Plano de Phases

A Initiative amadurece em fases. Cada Phase é pré-requisito da próxima.

| Phase | Escopo | Status |
|-------|--------|--------|
| Phase 0 | Framing de pesquisa, publicação da Missão, primeiro Experiment Log | Em andamento |
| Phase 1 | Reprodutibilidade — CLI OSS (llmo-checker), Score v0.1 Draft, publicação de datasets | Planejada |
| Phase 2 | Comunidade — contributors, referências externas, canais de feedback | Planejada |
| Phase 3 | Padronização — especificações formais, badge Compatible, formação de Working Group | Planejada |

A padronização vem por último. Sem OSS, benchmarks e implementações maduras como base, nem certificação nem especificações conseguem conquistar confiança.

## Contribuir

| Método | Link |
|--------|------|
| Issues / report de bugs | [github.com/kenimo49/llmo-guide/issues](https://github.com/kenimo49/llmo-guide/issues) |
| Pull Requests | [github.com/kenimo49/llmo-guide](https://github.com/kenimo49/llmo-guide) |

## Licença

Este site e todos os draft specs são publicados sob a [Licença MIT](https://opensource.org/licenses/MIT).
