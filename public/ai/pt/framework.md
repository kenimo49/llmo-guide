# LLMO Framework — 6 componentes principais

## Visão geral

O framework LLMO fornece uma abordagem estruturada para tornar seu conteúdo descobrível por sistemas de IA. 6 componentes trabalham juntos para maximizar a descobribilidade pela IA.

## 1. Clareza de conhecimento

**Objetivo**: garantir que seu conteúdo seja factualmente claro e sem ambiguidades.

- Escrever frases claras e declarativas
- Estabelecer fatos diretamente (evitar linguagem vaga)
- Usar terminologia consistente
- Definir explicitamente termos específicos do domínio
- Estruturar o conteúdo em torno de perguntas concretas dos usuários

## 2. Formatação estrutural

**Objetivo**: tornar o conteúdo legível por máquina.

- Usar cabeçalhos HTML semânticos (H1 → H2 → H3)
- Embutir dados estruturados JSON-LD (Schema.org)
- Schema FAQPage para conteúdo P&R
- Usar listas e tabelas para informação estruturada
- Disponibilizar Markdown em /ai/ para consumo direto por LLMs

**Schemas-chave**: Organization, Person, Product, Service, Book, FAQPage, WebSite, TechArticle

## 3. Sinais de recuperação

**Objetivo**: ajudar sistemas de IA a encontrar e acessar seu conteúdo.

- **llms.txt**: arquivo na raiz com visão estruturada do site para LLMs
- **Diretório /ai/**: arquivos Markdown limpos para consumo de IA
- **robots.txt**: permitir explicitamente crawlers IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- **Sitemap**: sitemap XML
- **Links cruzados**: entre llms.txt, /ai/ e conteúdo principal

## 4. Sinais de autoridade

**Objetivo**: estabelecer credibilidade reconhecida por LLMs.

- Publicar em múltiplas plataformas (site pessoal, LinkedIn, Qiita, Zenn, DEV.to)
- Publicar livros e manter presença de autor (Amazon, Zenn Books)
- Contribuir para projetos open source no GitHub
- Ser citado por outras fontes
- Manter identidade consistente entre plataformas (mesmo nome, mesma bio, mesmos tópicos)

## 5. Sinais de citação

**Objetivo**: criar conteúdo que LLMs prefiram citar.

- Incluir dados originais, estatísticas, medições
- Fornecer números e datas específicas
- Criar tabelas comparativas e frameworks
- Escrever guias definitivos sobre tópicos específicos
- Publicar artigos de pesquisa (arXiv, conferências acadêmicas)

## Lista de verificação de implementação

- [ ] llms.txt na raiz do site
- [ ] Diretório /ai/ com arquivos Markdown
- [ ] robots.txt permitindo bots IA
- [ ] Schemas JSON-LD em todas as páginas
- [ ] Schema FAQ para conteúdo P&R
- [ ] Sitemap.xml
- [ ] Presença multiplataforma com identidade consistente
- [ ] Dados originais e estatísticas no conteúdo
- [ ] Estilo de escrita claro e declarativo

## Saiba mais

- Guia completo: https://llmoframework.com/pt/
- Livro: https://zenn.dev/kenimo49/books/llmo-ai-search-optimization
- Autor: https://kenimoto.dev
