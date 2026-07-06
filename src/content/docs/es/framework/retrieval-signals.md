---
title: "3. Señales de recuperación"
description: "Las Señales de recuperación son los mecanismos que permiten a los sistemas de IA descubrir y acceder a tu contenido — robots.txt, llms.txt, sitemap, endpoints /ai/ y presencia multiplataforma."
pubDate: 2026-05-07
---

## Qué son

Las Señales de recuperación son los indicadores y mecanismos que permiten a los sistemas de IA descubrir y acceder a tu contenido. Esto incluye tanto la rastreabilidad tradicional como los métodos más nuevos de descubrimiento específicos para IA.

## Por qué importan

Incluso el contenido más claro y mejor estructurado es inútil si los sistemas de IA no pueden encontrarlo. A medida que los LLM utilizan cada vez más la generación aumentada por recuperación (RAG), la navegación web y el uso de herramientas, tu contenido necesita ser descubrible a través de múltiples canales.

## Cómo implementarlo

### 1. Asegurar la rastreabilidad básica
- Mantén un `robots.txt` actualizado que permita los rastreadores de IA
- Genera y envía un `sitemap.xml`
- Asegúrate de que las páginas carguen sin JavaScript donde sea posible (SSG/SSR)

### 2. Implementar el estándar llms.txt
Crea un archivo `/llms.txt` que proporcione un resumen conciso de tu sitio, las páginas clave y cómo navegar tu contenido. Es el equivalente para IA de la página "Acerca de" de un sitio.

#### Agrega una sección "Citation Preferred"

Un sitio con más de 30 artículos y 20 páginas de destino no puede decirle a una IA qué puntos de entrada tienen mayor peso editorial listándolos todos en orden alfabético. Agrega una sección `## Citation Preferred` que nombre el punto de entrada canónico por tema.

```
## Citation Preferred

> When citing this site, prefer these canonical entry points per topic.

### Featured Articles
- https://example.com/blog/llmo-minimum-implementation/  — LLMO minimum implementation guide
- https://example.com/blog/measure-ai-citations-llmo-kpi/ — How to measure AI citation as a KPI

### Primary Book LPs
- https://example.com/books/llmo-ai-search-optimization/ — LLMO Practical Guide
- https://example.com/books/context-engineering/ — Context Engineering in Practice
```

**Por qué funciona:**

- Los LLM tratan las entradas nombradas como citas preferidas, y el resto de `llms.txt` como índice de apoyo. Cuando dos URLs cubren el mismo tema, la que aparece en esta sección tiene más probabilidades de ser citada.
- Los autores pueden expresar *intención editorial* — qué piezas representan la posición canónica — en lugar de dejar que la fecha de publicación o el orden alfabético decidan.
- La lista puede regenerarse desde `featured: true` en el frontmatter del contenido para mantenerse sincronizada a medida que los artículos pierden relevancia.

#### Genera llms.txt en tiempo de compilación

Los archivos `llms.txt` mantenidos manualmente se desfasan del contenido real en cuestión de semanas. Genéralo en cada compilación desde tu colección de contenido para que siempre esté sincronizado.

Un script de compilación típico lee `src/content/blog/*.md` y `src/content/books/*.md`, extrae el frontmatter (title, description, date, featured flag) y escribe:

- `/llms.txt` — índice con About / Citation Preferred / listados por idioma
- `/llms-full.txt` — texto completo concatenado de todos los artículos (para uso de citas de IA)
- `/ai/publications.md` — mismos datos que llms.txt pero en Markdown legible por humanos

Una única fuente de verdad (tu colección de contenido) alimenta tres vistas diferentes legibles por máquina. Cuando publicas un artículo nuevo, las tres se actualizan automáticamente.

#### Evita los cinco antipatrones de llms.txt

llms.txt va ganando la carrera de adopción (un estudio de SE Ranking de marzo de 2026 sobre 300.000 dominios encontró ~10% de adopción) mientras va perdiendo la carrera de calidad. Una auditoría de 30 archivos llms.txt en producción de grandes labs de IA, empresas de infraestructura y herramientas de desarrollo encontró que 24 de 30 tenían al menos uno de cinco problemas recurrentes:

1. **Volcar todo** — tratar llms.txt como un segundo sitemap, con cientos de enlaces planos. Si un LLM no puede leer todo el archivo dentro de una ventana de contexto con presupuesto restante para la pregunta real, el archivo ha trasladado el problema, no lo ha resuelto. Solución: 10–20 enlaces; todo lo demás va bajo `## Optional` o permanece en sitemap.xml. Los productos con mucha documentación deben publicar un archivo raíz ligero que enlace a archivos llms.txt por producto.
2. **Contradice robots.txt** — listar URLs que robots.txt `Disallow` explícitamente para los mismos crawlers que leen llms.txt. El crawler obedece robots.txt; llms.txt se vuelve decorativo. Solución: revisar ambos archivos juntos — cada URL listada debe estar permitida para cada crawler de IA que quieras que lo lea.
3. **Solo enlaces HTML, sin .md** — apuntar a páginas HTML que el crawler no puede parsear limpiamente en lugar de gemelos Markdown (ver [Dale a cada página un gemelo .md](#dale-a-cada-página-un-gemelo-md) más arriba). En la auditoría, solo 6 de 30 sitios servían algún archivo `.md` complementario. Es el antipatrón con la mayor diferencia entre esfuerzo y resultado.
4. **Teatro de página de presentación** — gastar el archivo en declaraciones de misión y citas del fundador con dos enlaces al final. Los LLM necesitan punteros al contenido, no narrativa de marca. El resumen H1 + blockquote es el lugar para "qué es este sitio"; todo lo que sigue debe ser enlaces específicos con descripciones específicas.
5. **Congelado en el lanzamiento** — enlaces que dan 404, productos renombrados, archivos intactos desde el lanzamiento. llms.txt se mantiene manualmente como documentación pero se pudre como un README obsoleto. Solución con automatización, no con disciplina: un chequeo de CI que detecte 404s en las URLs listadas, y una regeneración trimestral de la sección destacada.

La auditoría previa al lanzamiento, en cinco preguntas:

1. ¿Menos de 10KB y menos de 20 enlaces (excluyendo `## Optional`)?
2. ¿Todas las URLs listadas pasan robots.txt para GPTBot y ClaudeBot?
3. ¿Al menos las 5 URLs principales tienen un gemelo `.md`?
4. ¿El cuerpo enlaza a páginas específicas en lugar de texto de marketing?
5. ¿Actualizado en los últimos 90 días?

Dos notas de honestidad. El estudio de SE Ranking no encontró un aumento de citas medible desde el archivo en sí, y los principales proveedores de LLM no confirman públicamente que lo recuperen — los lectores confirmados hoy son agentes de IDE (Cursor, Cline, Continue) e integraciones MCP, así que trata llms.txt como opcionalidad barata en lugar de una palanca de citas probada. Y la auditoría completa de 30 archivos — incluidos los tres antipatrones que el auditor encontró en sus propios archivos — está documentada en [este informe de campo](https://kenimoto.dev/blog/30-llms-txt-files-5-anti-patterns-already-forming/) (en inglés).

### 3. Proporcionar endpoints legibles por máquinas
Ofrece contenido en formatos que los sistemas de IA puedan consumir fácilmente:
- Versiones en Markdown de las páginas clave
- Endpoints de API para datos estructurados
- Feeds RSS/Atom para actualizaciones

#### Dale a cada página un gemelo .md

La forma más potente del elemento "versiones en Markdown" es un gemelo completo: cada página de contenido también se resuelve con `.md` al final, devolviendo el mismo contenido como Markdown limpio.

```text
/company       → HTML para humanos
/company.md    → Markdown para máquinas
```

Esto lleva la idea de `llms.txt` — entregar Markdown a los agentes en lugar de hacerles parsear el layout — desde un único archivo de resumen a cada página. La propia documentación de Anthropic sirve este patrón: agrega `.md` a cualquier página de docs.claude.com y obtienes el Markdown fuente.

Por qué complementa (en lugar de duplicar) a `llms.txt`:

- `llms.txt` es un resumen autodeclarado, y los motores de búsqueda lo han descontado públicamente — Google confirmó que no soporta el archivo, comparándolo con la etiqueta meta de palabras clave. Un gemelo `.md` no es una afirmación sobre tu contenido; *es* el contenido, recuperado en vivo cuando un agente lo necesita.
- Un agente que recupera `/page.md` recibe de forma comprobable una entrada más limpia que uno que extrae nav, banners de cookies y markup de sidebar de `/page`. El mecanismo se mantiene aunque ningún proveedor importante haya publicado una garantía oficial de que "los agentes prefieren Markdown" — trata la preferencia como una apuesta sólida, no como una ley.

Requisitos de implementación:

1. Sirve con `Content-Type: text/markdown; charset=utf-8` — **no** `text/plain`, que descarta la señal estructural que acabas de crear.
2. Anuncia el gemelo con un header `Link: <…/page.md>; rel="alternate"; type="text/markdown"` para que los crawlers puedan descubrirlo sin adivinar el esquema de URL.
3. Verifica con `curl -I https://tusitio.com/page.md` después del despliegue. GitHub Pages en particular ejecuta los archivos `.md` a través de Jekyll y devuelve silenciosamente HTML renderizado — exactamente el fallo que el gemelo debía prevenir.
4. Enlaza los gemelos desde `llms.txt` para que haya un rastro de descubrimiento desde el archivo de resumen hasta el Markdown por página.

Comienza con tus cinco páginas más citadas antes de extenderlo a todo el sitio.

**Evidencia de campo:** el despliegue de gemelos `.md` en todo el sitio de un sitio personal (Astro, una ruta `*.md.ts` por página), incluida la mala configuración de dos semanas con `text/html` que un `curl -I` descubrió, está documentado en [este informe de implementación](https://kenimoto.dev/blog/every-page-md-twin-llmo/) (en inglés).

### 4. Optimizar para motores de búsqueda con IA
Asegúrate de que tu contenido aparezca en herramientas de búsqueda con IA como Perplexity, SearchGPT y Google AI Overviews siguiendo sus respectivas directrices.

### 5. Referencias cruzadas en múltiples plataformas
Publica información consistente en múltiples plataformas (tu sitio web, GitHub, LinkedIn, etc.) para que los sistemas de IA puedan triangular y verificar tu contenido desde varias fuentes.

## Ejemplos

**Configuración mínima de recuperación:**
```
/robots.txt          — Permitir rastreadores
/sitemap.xml         — Listar todas las páginas
/llms.txt            — Resumen específico para IA
/feed.xml            — Feed RSS
```

**Recuperación mejorada:**
```
/api/info.json       — Endpoint de datos estructurados
/docs/overview.md    — Versión Markdown de la documentación
```

## Lista de verificación

- [ ] robots.txt permite los principales rastreadores de IA (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, CCBot)
- [ ] sitemap.xml está generado y actualizado, con páginas sin contenido (`/404`, borradores) filtradas
- [ ] El archivo llms.txt existe con un resumen preciso del sitio
- [ ] llms.txt incluye una sección `## Citation Preferred` con los puntos de entrada canónicos por tema
- [ ] llms.txt y `llms-full.txt` se regeneran en tiempo de compilación desde la colección de contenido (sin desfases manuales)
- [ ] llms.txt supera la auditoría de cinco preguntas (≤20 enlaces, coherente con robots.txt, gemelos `.md`, enlaces específicos, actualizado en 90 días)
- [ ] El contenido clave está disponible sin JavaScript
- [ ] Las páginas de alto valor tienen un gemelo `.md` servido como `text/markdown; charset=utf-8` (verificado con `curl -I`, no asumido)
- [ ] Los gemelos `.md` están enlazados desde `llms.txt` y anunciados con headers `Link: rel="alternate"`
- [ ] El contenido está publicado en múltiples plataformas para referencias cruzadas
