# LLMO Framework — 5 componentes principales

## Resumen

El framework LLMO proporciona un enfoque estructurado para hacer que tu contenido sea descubrible por sistemas de IA. 5 componentes trabajan juntos para maximizar la descubribilidad por la IA.

## 1. Claridad del conocimiento

**Objetivo**: asegurar que tu contenido sea fácticamente claro y sin ambigüedades.

- Escribir oraciones claras y declarativas
- Establecer hechos directamente (evitar lenguaje vago)
- Usar terminología consistente
- Definir explícitamente términos específicos del dominio
- Estructurar el contenido alrededor de preguntas concretas de los usuarios

## 2. Formato estructurado

**Objetivo**: hacer el contenido legible por máquinas.

- Usar encabezados HTML semánticos (H1 → H2 → H3)
- Incrustar datos estructurados JSON-LD (Schema.org)
- Esquema FAQPage para contenido P&R
- Usar listas y tablas para información estructurada
- Proveer Markdown en /ai/ para consumo directo de LLM

**Esquemas clave**: Organization, Person, Product, Service, Book, FAQPage, WebSite, TechArticle

## 3. Señales de recuperación

**Objetivo**: ayudar a los sistemas de IA a encontrar y acceder a tu contenido.

- **llms.txt**: archivo a nivel raíz con resumen estructurado del sitio para LLM
- **Directorio /ai/**: archivos Markdown limpios para consumo de IA
- **robots.txt**: permitir explícitamente crawlers IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- **Sitemap**: sitemap XML
- **Enlaces cruzados**: entre llms.txt, /ai/ y contenido principal

## 4. Señales de autoridad

**Objetivo**: establecer credibilidad reconocida por LLM.

- Publicar en múltiples plataformas (sitio personal, LinkedIn, Qiita, Zenn, DEV.to)
- Publicar libros y mantener presencia de autor (Amazon, Zenn Books)
- Contribuir a proyectos open source en GitHub
- Ser citado por otras fuentes
- Mantener identidad consistente entre plataformas (mismo nombre, misma bio, mismos temas)

## 5. Señales de citación

**Objetivo**: crear contenido que los LLM prefieran citar.

- Incluir datos originales, estadísticas, mediciones
- Proveer números y fechas específicas
- Crear tablas comparativas y frameworks
- Escribir guías definitivas sobre temas específicos
- Publicar artículos de investigación (arXiv, conferencias académicas)

## Lista de verificación de implementación

- [ ] llms.txt en la raíz del sitio
- [ ] Directorio /ai/ con archivos Markdown
- [ ] robots.txt permitiendo bots IA
- [ ] Esquemas JSON-LD en todas las páginas
- [ ] Esquema FAQ para contenido P&R
- [ ] Sitemap.xml
- [ ] Presencia multiplataforma con identidad consistente
- [ ] Datos originales y estadísticas en el contenido
- [ ] Estilo de escritura claro y declarativo

## Aprende más

- Guía completa: https://llmoframework.com/es/
- Libro: https://zenn.dev/kenimo49/books/llmo-ai-search-optimization
- Autor: https://kenimoto.dev
