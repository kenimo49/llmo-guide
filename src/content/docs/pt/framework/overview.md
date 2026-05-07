---
title: "O LLMO Framework: Um Padrão para Descobribilidade por IA"
description: "O LLMO Framework define 5 componentes principais para descobribilidade por IA: Clareza de conhecimento, Formatação estrutural, Sinais de recuperação, Sinais de autoridade e Sinais de citação. Pontuação máxima: 15 pontos."
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

## Checklist de autoavaliação

Avalie seu próprio site contra cada componente. Qualquer item que você possa marcar com confiança vale 1 ponto; vise 3 caixas por componente para alcançar a pontuação máxima.

### 1. Clareza de conhecimento (máx 3)
- [ ] Cada página começa com uma resposta de uma frase para sua pergunta principal (Answer-first)
- [ ] Termos específicos do domínio são definidos no primeiro uso (sem jargão sem explicação)
- [ ] Cada parágrafo contém uma única ideia (sem parágrafos com múltiplas afirmações)

### 2. Formatação estrutural (máx 3)
- [ ] As páginas usam hierarquia semântica H1 → H2 → H3 sem pular níveis
- [ ] Cada página significativa emite JSON-LD (Article / TechArticle / FAQPage / Product / Organization, conforme apropriado)
- [ ] Conteúdo comparativo usa tabelas, não listas em prosa

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
- [ ] Cada página expõe tanto `datePublished` quanto `dateModified` (em JSON-LD ou meta visível)
- [ ] Conteúdo comparativo referencia padrões da indústria (W3C, RFC, ISO, schema.org) por nome e link

### Guia de pontuação

| Total | Faixa |
|-------|-------|
| 13–15 | Nível produção — ativamente citado por sistemas de IA |
| 9–12  | Bom — visível para IA mas inconsistente |
| 5–8   | Parcial — lacunas significativas em recuperação ou autoridade |
| 0–4   | Invisível — comece com `/llms.txt`, robots.txt e JSON-LD |

> Quer pontuação maior? Cada página de componente (Clareza de conhecimento, Formatação estrutural, Sinais de recuperação, Sinais de autoridade, Sinais de citação) lista as implementações específicas que movem a pontuação de 1 → 2 → 3.
