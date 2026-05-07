---
title: "3. Sinais de recuperação"
description: "Sinais de recuperação são os mecanismos que permitem que sistemas de IA descubram e acessem seu conteúdo — robots.txt, llms.txt, sitemap, endpoints /ai/ e presença multiplataforma."
---

## O Que São

Sinais de recuperação são os indicadores e mecanismos que permitem que sistemas de IA descubram e acessem seu conteúdo. Isso inclui tanto a rastreabilidade tradicional quanto métodos de descoberta mais recentes específicos para IA.

## Por Que São Importantes

Mesmo o conteúdo mais claro e bem estruturado é inútil se sistemas de IA não conseguem encontrá-lo. À medida que LLMs usam cada vez mais geração aumentada por recuperação (RAG), navegação na web e uso de ferramentas, seu conteúdo precisa ser descobrível por múltiplos canais.

## Como Implementar

### 1. Garanta Rastreabilidade Básica
- Mantenha um `robots.txt` atualizado que permita crawlers de IA
- Gere e envie um `sitemap.xml`
- Garanta que páginas carreguem sem JavaScript quando possível (SSG/SSR)

### 2. Implemente o Padrão llms.txt
Crie um arquivo `/llms.txt` que forneça um resumo conciso do seu site, páginas principais e como navegar pelo seu conteúdo. Este é o equivalente de IA da página "Sobre" de um site.

### 3. Forneça Endpoints Legíveis por Máquina
Ofereça conteúdo em formatos que sistemas de IA consigam consumir facilmente:
- Versões Markdown de páginas principais
- Endpoints de API para dados estruturados
- Feeds RSS/Atom para atualizações

### 4. Otimize para Motores de Busca por IA
Garanta que seu conteúdo apareça em ferramentas de busca baseadas em IA como Perplexity, SearchGPT e Google AI Overviews seguindo as respectivas diretrizes.

### 5. Referencie Múltiplas Plataformas
Publique informações consistentes em múltiplas plataformas (seu site, GitHub, LinkedIn, etc.) para que sistemas de IA possam triangular e verificar seu conteúdo de várias fontes.

## Exemplos

**Configuração mínima de recuperação:**
```
/robots.txt          — Permitir crawlers
/sitemap.xml         — Listar todas as páginas
/llms.txt            — Resumo específico para IA
/feed.xml            — Feed RSS
```

**Recuperação aprimorada:**
```
/api/info.json       — Endpoint de dados estruturados
/docs/overview.md    — Versão Markdown da documentação
```

## Checklist

- [ ] robots.txt permite os principais crawlers de IA
- [ ] sitemap.xml está gerado e atualizado
- [ ] Arquivo llms.txt existe com resumo preciso do site
- [ ] Conteúdo principal está disponível sem JavaScript
- [ ] Conteúdo está publicado em múltiplas plataformas para referência cruzada
