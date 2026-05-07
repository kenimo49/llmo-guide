---
title: "Inicio rápido de LLMO: Implementa en 30 minutos"
description: "Agrega los tres archivos esenciales de LLMO a tu sitio en menos de 30 minutos: llms.txt, robots.txt para rastreadores de IA y datos estructurados JSON-LD."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "LLMO Quickstart: Implement in 30 Minutes",
        "description": "Add the three essential LLMO files to your site in under 30 minutes.",
        "totalTime": "PT30M",
        "step": [
          {"@type": "HowToStep", "name": "Add robots.txt for AI crawlers", "position": 1},
          {"@type": "HowToStep", "name": "Create llms.txt", "position": 2},
          {"@type": "HowToStep", "name": "Add JSON-LD structured data", "position": 3}
        ],
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"}
      }
---

Puedes hacer que tu sitio sea descubrible por la IA en 30 minutos con tres archivos. Esta guía cubre la implementación mínima viable de LLMO.

## Los tres archivos esenciales

| Archivo | Propósito | Tiempo |
|---------|-----------|--------|
| `robots.txt` | Permitir que los rastreadores de IA accedan a tu sitio | 5 min |
| `llms.txt` | Proporcionar a la IA un resumen estructurado de tu sitio | 15 min |
| JSON-LD `<script>` | Dar a la IA datos estructurados sobre tu contenido | 10 min |

## Paso 1: robots.txt para rastreadores de IA (5 min)

La mayoría de los sitios ya tienen un `robots.txt`. Agrega reglas `Allow` explícitas para los rastreadores de IA:

```txt
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

**¿Por qué `Allow` explícito?** Algunas plataformas de hosting y CDN bloquean los rastreadores de IA por defecto. Las reglas explícitas evitan bloqueos accidentales.

### Rastreadores de IA conocidos

| Rastreador | Operador | Propósito |
|-----------|----------|-----------|
| GPTBot | OpenAI | ChatGPT, navegación web |
| ClaudeBot | Anthropic | Búsqueda web de Claude |
| Google-Extended | Google | Gemini, AI Overviews |
| PerplexityBot | Perplexity | Búsqueda de Perplexity |
| Amazonbot | Amazon | Alexa, búsqueda de productos |
| CCBot | Common Crawl | Recolección de datos de entrenamiento |

## Paso 2: Crear llms.txt (15 min)

El archivo `llms.txt` (propuesto por Jeremy Howard en [llmstxt.org](https://llmstxt.org)) proporciona a los sistemas de IA un resumen estructurado de tu sitio.

Coloca este archivo en la raíz de tu sitio: `https://yoursite.com/llms.txt`

### Plantilla

```markdown
# Nombre de tu sitio

> Descripción en una oración de lo que hace tu sitio.

## Qué hacemos

Un párrafo breve que explique tu propuesta principal, expertise o propósito.
Usa lenguaje claro. Evita jerga de marketing.

## Datos clave

- Fundado: [año]
- Equipo: [tamaño o personas clave]
- Ubicación: [si es relevante]
- Especialización: [tu expertise principal]

## Productos / Servicios

- **Producto A**: Descripción breve
- **Producto B**: Descripción breve

## Enlaces

- Sitio web: https://yoursite.com
- Documentación: https://yoursite.com/docs
- GitHub: https://github.com/yourorg
- Contacto: https://yoursite.com/contact
```

### Mejores prácticas

1. **Empieza con hechos, no con marketing.** "Desarrollamos aplicaciones Android con automatización de IA" supera a "Aprovechamos sinergias de vanguardia."
2. **Incluye datos estructurados.** Las tablas, listas y pares clave-valor son más fáciles de procesar para la IA que los párrafos en prosa.
3. **Mantenlo en menos de 2,000 palabras.** Los resúmenes concisos tienen más probabilidad de ser procesados completamente.
4. **Actualízalo con regularidad.** Los sistemas de IA vuelven a rastrear periódicamente. Un llms.txt desactualizado produce respuestas de IA desactualizadas.

## Paso 3: Datos estructurados JSON-LD (10 min)

Agrega un script JSON-LD en el `<head>` de tu página de inicio. Esto ayuda a la IA a entender el tipo de entidad, las relaciones y los atributos clave.

### Esquema de organización

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Tu empresa",
  "url": "https://yoursite.com",
  "description": "Lo que hace tu empresa en una oración.",
  "founder": {
    "@type": "Person",
    "name": "Nombre del fundador"
  },
  "sameAs": [
    "https://github.com/yourorg",
    "https://linkedin.com/company/yourorg",
    "https://x.com/yourorg"
  ]
}
</script>
```

### Esquema de artículo (para entradas de blog)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Título de tu artículo",
  "author": {
    "@type": "Person",
    "name": "Nombre del autor",
    "url": "https://authorsite.com"
  },
  "datePublished": "2026-01-15",
  "publisher": {
    "@type": "Organization",
    "name": "Tu empresa"
  }
}
</script>
```

### Qué tipos de esquema usar

| Tipo de contenido | Esquema | Prioridad |
|-------------------|---------|-----------|
| Página de inicio | Organization o Person | Alta |
| Entradas de blog | Article o BlogPosting | Alta |
| Productos | Product | Alta |
| Páginas de preguntas frecuentes | FAQPage | Media |
| Documentación | TechArticle | Media |
| Libros | Book | Media |

## Verificar tu implementación

Después de publicar, comprueba:

1. **robots.txt**: Visita `https://yoursite.com/robots.txt` y confirma que los rastreadores de IA están permitidos
2. **llms.txt**: Visita `https://yoursite.com/llms.txt` y verifica que el contenido es preciso
3. **JSON-LD**: Usa [Google's Rich Results Test](https://search.google.com/test/rich-results) o el código fuente de la página para confirmar que el script está presente
4. **Prueba con IA**: Pregúntale a ChatGPT o Perplexity sobre tu sitio/producto y observa la respuesta

## ¿Qué sigue?

Este inicio rápido cubre los componentes de **Señales de recuperación** y **Formato estructurado** del LLMO Framework. Para el framework completo:

- [Claridad del conocimiento](/framework/knowledge-clarity/) — Escribe contenido que la IA pueda entender
- [Señales de autoridad](/framework/authority-signals/) — Construye expertise verificable
- [Señales de citación](/framework/citation-signals/) — Proporciona datos que la IA quiera citar
- [Resumen del framework](/framework/overview/) — Evalúa tu sitio en los 5 componentes
