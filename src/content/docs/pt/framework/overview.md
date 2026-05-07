---
title: "O LLMO Framework: Um Padrão para Descobribilidade por IA"
description: "O LLMO Framework define 5 componentes principais para descobribilidade por IA: Clareza de conhecimento, Formatação estrutural, Sinais de recuperação, Sinais de autoridade e Sinais de citação. Pontuação máxima: 15 pontos."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "The LLMO Framework: A Standard for AI Discoverability",
        "description": "Five core components for making your content discoverable by AI.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

O LLMO Framework define cinco componentes principais que determinam se sistemas de IA conseguem descobrir, entender e citar seu conteúdo com precisão.

## Os Cinco Componentes

### 1. Clareza de conhecimento
Seu conteúdo é claro o suficiente para a IA entender e resumir com precisão?

- Use linguagem simples e sem ambiguidades
- Defina termos-chave explicitamente
- Forneça fatos estruturados (quem, o quê, quando, onde)
- Evite jargão sem explicação

### 2. Formatação estrutural
Seu conteúdo está estruturado para consumo por máquina?

- Use HTML semântico e Markdown
- Implemente dados estruturados JSON-LD
- Forneça llms.txt para conteúdo específico para IA
- Organize o conteúdo hierarquicamente

### 3. Sinais de recuperação
Sistemas de IA conseguem encontrar seu conteúdo quando precisam?

- Garanta rastreabilidade (robots.txt, sitemap.xml)
- Forneça endpoints legíveis por máquina (/ai/, arquivos .md)
- Implemente o padrão llms.txt
- Torne o conteúdo disponível via APIs quando possível

### 4. Sinais de autoridade
Seu conteúdo demonstra expertise e confiabilidade?

- Atribuição de autoria com credenciais verificáveis
- Presença multiplataforma (GitHub, LinkedIn, publicações)
- Informações consistentes em todas as plataformas
- Afirmações baseadas em evidências com citações

### 5. Sinais de citação
Seu conteúdo fornece referências que a IA pode verificar?

- Link para fontes primárias
- Inclua datas de publicação
- Forneça informações de versão
- Referencie artigos acadêmicos e documentação oficial

## Pontuação

Cada componente pode ser avaliado em uma escala de 0 a 3:

| Pontuação | Nível | Descrição |
|-----------|-------|-----------|
| 0 | Nenhum | Componente não abordado |
| 1 | Básico | Implementação mínima |
| 2 | Bom | Implementação sólida com espaço para melhoria |
| 3 | Excelente | Implementação de melhores práticas |

**Pontuação máxima: 15 pontos** (5 componentes × 3 pontos cada)
