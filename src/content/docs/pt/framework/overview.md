---
title: "O LLMO Framework: Um Padrão para Descobribilidade por IA"
description: "O LLMO Framework define 6 componentes principais para descobribilidade por IA: Clareza de conhecimento, Formatação estrutural, Sinais de recuperação, Sinais de autoridade, Sinais de citação e Sinais de coerência. Pontuação máxima: 18 pontos."
pubDate: 2026-05-08
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        "@id": "https://llmoframework.com/pt/framework/overview/#components",
        "name": "Componentes do LLMO Framework",
        "description": "Seis componentes principais do LLMO Framework, pontuados de 0 a 3 cada, para uma pontuação máxima de site de 18 pontos.",
        "hasDefinedTerm": [
          {
            "@type": "DefinedTerm",
            "name": "Clareza de conhecimento",
            "description": "Conteúdo claro, factual e sem ambiguidades que a IA consegue entender e resumir com precisão. Medido pelo uso de linguagem simples, termos definidos, fatos estruturados e ausência de jargão sem explicação.",
            "inDefinedTermSet": "https://llmoframework.com/pt/framework/overview/#components",
            "url": "https://llmoframework.com/pt/framework/knowledge-clarity/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Formatação estrutural",
            "description": "Estrutura legível por máquina, incluindo HTML semântico, Markdown, JSON-LD com escopo por página e o padrão llms.txt, com verificação em tempo de build de que o JSON-LD realmente é emitido no HTML servido.",
            "inDefinedTermSet": "https://llmoframework.com/pt/framework/overview/#components",
            "url": "https://llmoframework.com/pt/framework/structural-formatting/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Sinais de recuperação",
            "description": "Sinais que ajudam sistemas de IA a encontrar conteúdo: rastreabilidade via robots.txt e sitemap.xml, endpoints legíveis por máquina sob /ai/ e adoção do padrão llms.txt.",
            "inDefinedTermSet": "https://llmoframework.com/pt/framework/overview/#components",
            "url": "https://llmoframework.com/pt/framework/retrieval-signals/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Sinais de autoridade",
            "description": "Sinais que demonstram expertise e confiabilidade: atribuição de autoria verificável, identidade multiplataforma (links sameAs) e afirmações baseadas em evidências com citações.",
            "inDefinedTermSet": "https://llmoframework.com/pt/framework/overview/#components",
            "url": "https://llmoframework.com/pt/framework/authority-signals/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Sinais de citação",
            "description": "Referências que sistemas de IA conseguem verificar: fontes primárias, datas de publicação e modificação, informações de versão e links para artigos acadêmicos ou documentação oficial.",
            "inDefinedTermSet": "https://llmoframework.com/pt/framework/overview/#components",
            "url": "https://llmoframework.com/pt/framework/citation-signals/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Sinais de coerência",
            "description": "O mesmo fato conta a mesma história em todas as superfícies que a IA lê: HTML, JSON-LD, Markdown, llms.txt. Fonte única de verdade para afirmações numéricas e factuais, com gates de CI contra divergências entre arquivos.",
            "inDefinedTermSet": "https://llmoframework.com/pt/framework/overview/#components",
            "url": "https://llmoframework.com/pt/framework/coherence-signals/"
          }
        ]
      }
---

**O LLMO Framework define seis componentes principais — Clareza de conhecimento, Formatação estrutural, Sinais de recuperação, Sinais de autoridade, Sinais de citação e Sinais de coerência — que, juntos, determinam se sistemas de IA conseguem descobrir, entender e citar seu conteúdo com precisão.** Cada componente é pontuado de 0 a 3, para uma pontuação máxima de site de 18 pontos.

Quer começar pelo conceito? Leia [O que é LLMO?](/pt/guide/what-is-llmo/). Quer implementar logo? Vá direto para o [Início rápido em 30 min](/pt/guide/quickstart/).

## Quais são os seis componentes do LLMO Framework?

### 1. Clareza de conhecimento
Seu conteúdo é claro o suficiente para a IA entender e resumir com precisão?

- Use linguagem simples e sem ambiguidades
- Defina termos-chave explicitamente
- Forneça fatos estruturados (quem, o quê, quando, onde)
- Evite jargão sem explicação

### 2. Formatação estrutural
Seu conteúdo está estruturado para consumo por máquina?

- Use HTML semântico e Markdown
- Implemente dados estruturados JSON-LD, com escopo por página
- Forneça llms.txt para conteúdo específico para IA
- Verifique se o JSON-LD realmente é emitido no HTML servido

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

### 6. Sinais de coerência
O mesmo fato conta a mesma história em todas as superfícies que a IA lê?

- Fonte única de verdade para toda afirmação numérica ou factual
- Superfícies exclusivas de IA (`llms.txt`, `/ai/*.md`) geradas a partir dos mesmos dados do HTML
- Host canônico e política de barra final aplicados em todo lugar
- Nenhuma entidade JSON-LD duplicada para o mesmo `@id`

## Pontuação

Cada componente pode ser avaliado em uma escala de 0 a 3:

| Pontuação | Nível | Descrição |
|-----------|-------|-----------|
| 0 | Nenhum | Componente não abordado |
| 1 | Básico | Implementação mínima |
| 2 | Bom | Implementação sólida com espaço para melhoria |
| 3 | Excelente | Implementação de melhores práticas |

**Pontuação máxima: 18 pontos** (6 componentes × 3 pontos cada)

## Checklist de autoavaliação

Avalie seu próprio site contra cada componente. Qualquer item que você possa marcar com confiança vale 1 ponto; vise 3 caixas por componente para alcançar a pontuação máxima.

### 1. Clareza de conhecimento (máx 3)
- [ ] Cada página começa com uma resposta de uma frase para sua pergunta principal (Answer-first)
- [ ] Termos específicos do domínio são definidos no primeiro uso (sem jargão sem explicação)
- [ ] Cada parágrafo contém uma única ideia (sem parágrafos com múltiplas afirmações)

### 2. Formatação estrutural (máx 3)
- [ ] As páginas usam hierarquia semântica H1 → H2 → H3 sem pular níveis
- [ ] Cada página significativa emite JSON-LD relevante para a página; o layout do site inteiro emite apenas `Organization` / `WebSite` / `Person`
- [ ] O pipeline de build verifica se o JSON-LD realmente faz parse no HTML em `dist/`

### 3. Sinais de recuperação (máx 3)
- [ ] `/llms.txt` existe na raiz do site e lista páginas-chave
- [ ] O diretório `/ai/` fornece Markdown limpo para cada tópico principal (e por idioma se o site for multilíngue)
- [ ] `robots.txt` permite explicitamente GPTBot, ClaudeBot, PerplexityBot, Google-Extended; `sitemap.xml` está acessível

### 4. Sinais de autoridade (máx 3)
- [ ] O autor tem bio verificável com links `sameAs` para LinkedIn / GitHub / X / perfis de publicação
- [ ] A mesma identidade (nome, função, foco temático) aparece consistentemente em pelo menos 3 plataformas
- [ ] O site liga a pesquisa original, livros ou papers que o autor realmente publicou

### 5. Sinais de citação (máx 3)
- [ ] Cada afirmação que usa um número cita uma fonte por nome e ano
- [ ] Cada **página de conteúdo** (artigo, guia, estudo de caso) expõe tanto `datePublished` quanto `dateModified` (em JSON-LD ou meta visível). A raiz do site e páginas de erro estão isentas
- [ ] Conteúdo comparativo referencia padrões da indústria (W3C, RFC, ISO, schema.org) por nome e link

### 6. Sinais de coerência (máx 3)
- [ ] Cada afirmação numérica / factual tem um único arquivo de fonte canônica referenciado em todos os outros lugares
- [ ] Superfícies de IA (`llms.txt`, `/ai/*.md`, endpoints URL.md) são geradas a partir dos mesmos dados do HTML
- [ ] A CI verifica divergências entre arquivos nas métricas-chave; nenhuma entidade JSON-LD duplicada para o mesmo `@id`

### Guia de pontuação

| Total | Faixa |
|-------|-------|
| 16–18 | Nível produção — ativamente citado por sistemas de IA |
| 11–15 | Bom — visível para IA mas inconsistente |
| 6–10  | Parcial — lacunas significativas em recuperação, autoridade ou coerência |
| 0–5   | Invisível — comece com `/llms.txt`, robots.txt e JSON-LD |

> Quer pontuação maior? Cada página de componente (Clareza de conhecimento, Formatação estrutural, Sinais de recuperação, Sinais de autoridade, Sinais de citação, Sinais de coerência) lista as implementações específicas que movem a pontuação de 1 → 2 → 3.
