---
title: "3. Sinais de recuperação"
description: "Sinais de recuperação são os mecanismos que permitem que sistemas de IA descubram e acessem seu conteúdo — robots.txt, llms.txt, sitemap, endpoints /ai/ e presença multiplataforma."
pubDate: 2026-05-07
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

#### Evite os Cinco Antipadrões do llms.txt

O llms.txt está vencendo a corrida de adoção (um estudo de março de 2026 da SE Ranking sobre 300.000 domínios encontrou ~10% de adoção) enquanto perde a corrida de qualidade. Uma auditoria de 30 arquivos llms.txt de produção de grandes laboratórios de IA, empresas de infraestrutura e ferramentas para desenvolvedores constatou que 24 dos 30 tinham pelo menos um dos cinco problemas recorrentes:

1. **Despejar tudo** — tratar o llms.txt como um segundo sitemap, com centenas de links planos. Se um LLM não conseguir ler o arquivo inteiro dentro de uma janela de contexto ainda com orçamento para a pergunta real, o arquivo moveu o problema, não o resolveu. Solução: 10 a 20 links; todo o resto vai em `## Optional` ou permanece no sitemap.xml. Produtos com muita documentação devem publicar um arquivo raiz enxuto que aponte para llms.txt por produto.
2. **Contradiz o robots.txt** — listar URLs que o robots.txt explicitamente `Disallow` para os próprios crawlers que leem o llms.txt. O crawler obedece ao robots.txt; o llms.txt torna-se decorativo. Solução: revisar os dois arquivos juntos — cada URL listada deve ser permitida para todos os crawlers de IA que você quer que a leiam.
3. **Apenas links HTML, sem .md** — apontar para páginas HTML que o crawler não consegue processar de forma limpa, em vez de versões Markdown (ver [Dê a Cada Página um Gêmeo .md](#dê-a-cada-página-um-gêmeo-md) abaixo). Na auditoria, apenas 6 dos 30 sites disponibilizavam algum arquivo `.md` complementar. É o antipadrão com a maior diferença entre esforço e resultado.
4. **Teatro da página institucional** — gastar o arquivo em declarações de missão e citações de fundadores, com dois links no final. LLMs precisam de apontadores para conteúdo, não de narrativa de marca. O H1 + resumo em blockquote é o lugar para "o que é este site"; tudo abaixo deve ser links específicos com descrições específicas.
5. **Congelado desde o lançamento** — links com 404, produtos renomeados, arquivos intocados desde a publicação. O llms.txt é curado manualmente como documentação, mas apodrece como um README desatualizado. Solução com automação, não com disciplina: uma verificação de CI que sinaliza 404s em URLs listadas, e uma regeneração trimestral da seção em destaque.

A auditoria pré-publicação, em cinco perguntas:

1. Menos de 10KB e menos de 20 links (excluindo `## Optional`)?
2. Todas as URLs listadas passam pelo robots.txt para GPTBot e ClaudeBot?
3. As 5 principais URLs têm um arquivo `.md` complementar?
4. O corpo aponta para páginas específicas em vez de texto de marketing?
5. Atualizado nos últimos 90 dias?

Duas notas de honestidade. O estudo da SE Ranking não encontrou nenhum ganho de citação mensurável pelo arquivo em si, e os principais fornecedores de LLM não confirmam publicamente que o buscam — os leitores confirmados hoje são agentes de IDE (Cursor, Cline, Continue) e integrações MCP; portanto, trate o llms.txt como opcionalidade barata, não como uma alavanca de citação comprovada. A auditoria completa dos 30 arquivos — incluindo os três antipadrões que o auditor encontrou nos seus próprios arquivos — está documentada [neste relatório de campo](https://kenimoto.dev/blog/30-llms-txt-files-5-anti-patterns-already-forming/) (em inglês).

### 3. Forneça Endpoints Legíveis por Máquina
Ofereça conteúdo em formatos que sistemas de IA consigam consumir facilmente:
- Versões Markdown de páginas principais
- Endpoints de API para dados estruturados
- Feeds RSS/Atom para atualizações

#### Dê a Cada Página um Gêmeo .md

A forma mais forte do item "versões Markdown" é um gêmeo completo: cada página de conteúdo também resolve com `.md` acrescentado ao URL, retornando o mesmo conteúdo como Markdown limpo.

```text
/company       → HTML para humanos
/company.md    → Markdown para máquinas
```

Isso leva a ideia do `llms.txt` — entregar Markdown aos agentes em vez de fazê-los processar o layout — de um único arquivo de resumo para cada página. A documentação da Anthropic adota esse padrão: acrescente `.md` a qualquer página de docs.claude.com e você obtém o Markdown-fonte.

Por que complementa (em vez de duplicar) o `llms.txt`:

- O `llms.txt` é um resumo autodeclarado, e os motores de busca o desconsideram abertamente — o Google confirmou que não suporta o arquivo, comparando-o à meta tag keywords. Um gêmeo `.md` não é uma afirmação sobre seu conteúdo; *é* o conteúdo, buscado ao vivo quando um agente precisa.
- Um agente que busca `/page.md` recebe comprovadamente uma entrada mais limpa do que aquele que remove nav, banners de cookies e markup de sidebar de `/page`. O mecanismo se mantém mesmo sem uma garantia oficial publicada de que "agentes preferem Markdown" — trate a preferência como uma aposta forte, não como uma lei.

Requisitos de implementação:

1. Sirva com `Content-Type: text/markdown; charset=utf-8` — **não** `text/plain`, que descarta o sinal estrutural que você acabou de criar.
2. Anuncie o gêmeo com um cabeçalho `Link: <…/page.md>; rel="alternate"; type="text/markdown"` para que os crawlers possam descobri-lo sem adivinhar o esquema de URL.
3. Verifique com `curl -I https://seusite.com/page.md` após o deploy. O GitHub Pages, em particular, processa arquivos `.md` pelo Jekyll e silenciosamente retorna HTML renderizado — exatamente a falha que o gêmeo deveria prevenir.
4. Vincule os gêmeos do `llms.txt` para criar uma trilha de descoberta do arquivo de resumo ao Markdown por página.

Comece pelas suas cinco páginas mais citadas antes de implantar em todo o site.

**Evidência de campo:** um rollout de gêmeos `.md` em todo um site pessoal (Astro, uma rota `*.md.ts` por página), incluindo a configuração incorreta de `text/html` que durou duas semanas e foi detectada com um único `curl -I`, está documentado [neste relato de implementação](https://kenimoto.dev/blog/every-page-md-twin-llmo/) (em inglês).

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

- [ ] robots.txt permite os principais crawlers de IA (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, CCBot)
- [ ] sitemap.xml está gerado e atualizado, com páginas sem conteúdo (`/404`, rascunhos) filtradas
- [ ] Arquivo llms.txt existe com resumo preciso do site
- [ ] llms.txt passa a auditoria das cinco perguntas (≤20 links, consistente com robots.txt, arquivos `.md` complementares, links específicos, atualizado nos últimos 90 dias)
- [ ] Conteúdo principal está disponível sem JavaScript
- [ ] Páginas de alto valor têm um gêmeo `.md` servido como `text/markdown; charset=utf-8` (verificado com `curl -I`, não assumido)
- [ ] Os gêmeos `.md` estão vinculados no `llms.txt` e anunciados via cabeçalhos `Link: rel="alternate"`
- [ ] Conteúdo está publicado em múltiplas plataformas para referência cruzada
