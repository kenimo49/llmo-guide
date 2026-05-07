---
title: "Artigos e referências"
description: "Pesquisas acadêmicas e relatórios do setor relacionados ao LLMO e à otimização para busca por IA. Inclui GEO (KDD 2024), proposta llms.txt e estudos relacionados."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO Research Papers & References",
        "description": "Academic research and industry reports related to LLMO and AI search optimization.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

## Papers Principais

### GEO: Generative Engine Optimization
- **Autores**: Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande
- **Instituições**: Princeton University, IIT Delhi, Adobe Research
- **Evento**: KDD 2024 (ACM SIGKDD)
- **Link**: [arXiv:2311.09735](https://arxiv.org/abs/2311.09735)
- **Resumo**: Primeiro framework acadêmico para otimizar a visibilidade de conteúdo em motores de busca generativos. Testou 9 estratégias de otimização em 10.000 consultas. Descoberta principal: adicionar estatísticas melhorou a visibilidade em +115,1%.
- **[Resumo detalhado →](/research/geo-paper-summary/)**

### Proposta llms.txt
- **Autor**: Jeremy Howard
- **Link**: [llmstxt.org](https://llmstxt.org/)
- **Resumo**: Uma proposta de arquivo padronizado que fornece informações sobre um site para LLMs. Análogo ao robots.txt, mas projetado para consumo por IA em vez de controle de crawler.

## Relatórios e Diretrizes do Setor

### Microsoft: Otimizando Conteúdo para Respostas de Busca com IA
- **Publicador**: Microsoft (Bing Webmaster Blog)
- **Data**: Outubro de 2025
- **Resumo**: Diretrizes oficiais que identificam 3 princípios para otimização de conteúdo para IA: Estrutura, Autoridade e Atualidade.
- **[Resumo detalhado →](/research/microsoft-guidelines/)**

### Ahrefs: Menções na Web vs. Backlinks para Visibilidade em IA
- **Publicador**: Ahrefs
- **Dataset**: 75.000 marcas
- **Resumo**: Menções na web (marca + palavra-chave) são 3x mais preditivas de visibilidade em IA do que backlinks tradicionais.

### Gartner: O Futuro da Busca
- **Publicador**: Gartner
- **Data**: Fevereiro de 2024
- **Resumo**: Previsão de que o uso de motores de busca tradicionais vai declinar 25% até 2026 à medida que usuários migram para alternativas baseadas em IA.

### Go Fish Digital: Taxas de Conversão da Busca por IA
- **Publicador**: Go Fish Digital
- **Resumo**: Tráfego de busca baseada em IA converte a 25x a taxa do tráfego de busca tradicional, devido à intenção pré-validada do usuário.

## Pesquisas Relacionadas

### Dados Estruturados Schema.org
- **URL**: [schema.org](https://schema.org/)
- **Relevância**: O padrão de vocabulário usado para implementação de dados estruturados JSON-LD no Componente 2 do LLMO (Formatação estrutural).

### Documentação de Dados Estruturados do Google
- **URL**: [developers.google.com/search/docs/appearance/structured-data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- **Relevância**: Diretrizes de implementação para dados estruturados reconhecidos tanto por motores de busca quanto por sistemas de IA.

## Contribuindo

Conhece um paper ou relatório relevante? [Abra uma issue](https://github.com/kenimo49/llmo-guide/issues) ou envie um pull request para adicioná-lo a esta lista.
