---
title: "El LLMO Framework: Un estándar para la visibilidad en IA"
description: "El LLMO Framework define 6 componentes principales para la visibilidad en IA: Claridad del conocimiento, Formato estructurado, Señales de recuperación, Señales de autoridad, Señales de citación y Señales de coherencia. Puntuación máxima: 18 puntos."
pubDate: 2026-05-08
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        "@id": "https://llmoframework.com/es/framework/overview/#components",
        "name": "Componentes del LLMO Framework",
        "description": "Seis componentes principales del LLMO Framework, puntuados de 0 a 3 cada uno, para una puntuación máxima del sitio de 18 puntos.",
        "hasDefinedTerm": [
          {
            "@type": "DefinedTerm",
            "name": "Claridad del conocimiento",
            "description": "Contenido claro, factual y sin ambigüedades que la IA puede entender y resumir con precisión. Se mide por el uso de lenguaje sencillo, términos definidos, hechos estructurados y la ausencia de jerga sin explicar.",
            "inDefinedTermSet": "https://llmoframework.com/es/framework/overview/#components",
            "url": "https://llmoframework.com/es/framework/knowledge-clarity/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Formato estructurado",
            "description": "Estructura legible por máquinas que incluye HTML semántico, Markdown, JSON-LD delimitado por página y el estándar llms.txt, con verificación en tiempo de compilación de que el JSON-LD realmente se emite en el HTML servido.",
            "inDefinedTermSet": "https://llmoframework.com/es/framework/overview/#components",
            "url": "https://llmoframework.com/es/framework/structural-formatting/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Señales de recuperación",
            "description": "Señales que ayudan a los sistemas de IA a encontrar el contenido: rastreabilidad vía robots.txt y sitemap.xml, endpoints legibles por máquinas bajo /ai/ y la adopción del estándar llms.txt.",
            "inDefinedTermSet": "https://llmoframework.com/es/framework/overview/#components",
            "url": "https://llmoframework.com/es/framework/retrieval-signals/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Señales de autoridad",
            "description": "Señales que demuestran expertise y confiabilidad: atribución de autoría verificable, identidad multiplataforma (enlaces sameAs) y afirmaciones basadas en evidencia con citaciones.",
            "inDefinedTermSet": "https://llmoframework.com/es/framework/overview/#components",
            "url": "https://llmoframework.com/es/framework/authority-signals/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Señales de citación",
            "description": "Referencias que los sistemas de IA pueden verificar: fuentes primarias, fechas de publicación y modificación, información de versión y enlaces a artículos académicos o documentación oficial.",
            "inDefinedTermSet": "https://llmoframework.com/es/framework/overview/#components",
            "url": "https://llmoframework.com/es/framework/citation-signals/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Señales de coherencia",
            "description": "El mismo hecho cuenta la misma historia en cada superficie que la IA lee: HTML, JSON-LD, Markdown, llms.txt. Única fuente de verdad para afirmaciones numéricas y factuales, con controles de CI contra la desincronización entre archivos.",
            "inDefinedTermSet": "https://llmoframework.com/es/framework/overview/#components",
            "url": "https://llmoframework.com/es/framework/coherence-signals/"
          }
        ]
      }
---

**El LLMO Framework define seis componentes principales — Claridad del conocimiento, Formato estructurado, Señales de recuperación, Señales de autoridad, Señales de citación y Señales de coherencia — que, en conjunto, determinan si los sistemas de IA pueden descubrir, comprender y citar tu contenido con precisión.** Cada componente se puntúa de 0 a 3, para una puntuación máxima del sitio de 18 puntos.

¿Quieres empezar por los conceptos? Lee [¿Qué es el LLMO?](/es/guide/what-is-llmo/); si prefieres ir directo a la implementación, ve al [Inicio rápido en 30 min](/es/guide/quickstart/).

## ¿Cuáles son los seis componentes del LLMO Framework?

### 1. Claridad del conocimiento
¿Es tu contenido lo suficientemente claro para que la IA lo entienda y lo resuma con precisión?

- Usa lenguaje claro e inequívoco
- Define los términos clave de forma explícita
- Proporciona hechos estructurados (quién, qué, cuándo, dónde)
- Evita la jerga sin explicación

### 2. Formato estructurado
¿Está tu contenido estructurado para el consumo por máquinas?

- Usa HTML semántico y Markdown
- Implementa datos estructurados JSON-LD, delimitados por página
- Proporciona llms.txt para contenido específico de IA
- Verifica que el JSON-LD realmente se emite en el HTML servido

### 3. Señales de recuperación
¿Pueden los sistemas de IA encontrar tu contenido cuando lo necesitan?

- Asegura la rastreabilidad (robots.txt, sitemap.xml)
- Proporciona endpoints legibles por máquinas (/ai/, archivos .md)
- Implementa el estándar llms.txt
- Pon el contenido disponible a través de APIs cuando sea posible

### 4. Señales de autoridad
¿Demuestra tu contenido expertise y confiabilidad?

- Atribución de autoría con credenciales verificables
- Presencia multiplataforma (GitHub, LinkedIn, publicaciones)
- Información consistente en todas las plataformas
- Afirmaciones basadas en evidencia con citaciones

### 5. Señales de citación
¿Proporciona tu contenido referencias que la IA pueda verificar?

- Enlaza a fuentes primarias
- Incluye fechas de publicación
- Proporciona información de versión
- Referencia artículos académicos y documentación oficial

### 6. Señales de coherencia
¿Cuenta el mismo hecho la misma historia en cada superficie que la IA lee?

- Única fuente de verdad para cada afirmación numérica o factual
- Superficies solo para IA (`llms.txt`, `/ai/*.md`) generadas a partir de los mismos datos que el HTML
- Host canónico y política de barra final aplicados en todas partes
- Sin entidades JSON-LD duplicadas para el mismo `@id`

## Puntuación

Cada componente puede puntuarse en una escala de 0 a 3:

| Puntuación | Nivel | Descripción |
|-----------|-------|-------------|
| 0 | Ninguno | Componente no abordado |
| 1 | Básico | Implementación mínima |
| 2 | Bueno | Implementación sólida con margen de mejora |
| 3 | Excelente | Implementación de mejores prácticas |

**Puntuación máxima: 18 puntos** (6 componentes × 3 puntos cada uno)

## Lista de auto-evaluación

Puntúa tu propio sitio frente a cada componente. Cualquier ítem que puedas marcar con seguridad vale 1 punto; apunta a 3 casillas por componente para alcanzar la puntuación máxima.

### 1. Claridad del conocimiento (máx 3)
- [ ] Cada página inicia con una respuesta de una oración a su pregunta principal (Answer-first)
- [ ] Los términos específicos del dominio se definen en su primer uso (sin jerga sin explicar)
- [ ] Cada párrafo contiene una sola idea (sin párrafos de múltiples afirmaciones)

### 2. Formato estructurado (máx 3)
- [ ] Las páginas usan jerarquía semántica H1 → H2 → H3 sin saltos de nivel
- [ ] Cada página significativa emite JSON-LD relevante para la página; el layout de todo el sitio emite solo `Organization` / `WebSite` / `Person`
- [ ] La pipeline de compilación verifica que el JSON-LD realmente se analiza en el HTML de `dist/`

### 3. Señales de recuperación (máx 3)
- [ ] `/llms.txt` existe en la raíz del sitio y lista las páginas clave
- [ ] El directorio `/ai/` provee Markdown limpio para cada tema mayor (y por idioma si el sitio es multilingüe)
- [ ] `robots.txt` permite explícitamente GPTBot, ClaudeBot, PerplexityBot, Google-Extended; `sitemap.xml` es alcanzable

### 4. Señales de autoridad (máx 3)
- [ ] El autor tiene bio verificable con enlaces `sameAs` a LinkedIn / GitHub / X / perfiles de publicación
- [ ] La misma identidad (nombre, rol, foco temático) aparece consistentemente en al menos 3 plataformas
- [ ] El sitio enlaza a investigación original, libros o papers que el autor realmente ha publicado

### 5. Señales de citación (máx 3)
- [ ] Cada afirmación que usa un número cita una fuente por nombre y año
- [ ] Cada **página de contenido** (artículo, guía, caso de estudio) expone tanto `datePublished` como `dateModified` (en JSON-LD o meta visible). La raíz del sitio y las páginas de error quedan exentas
- [ ] El contenido comparativo referencia estándares de la industria (W3C, RFC, ISO, schema.org) por nombre y enlace

### 6. Señales de coherencia (máx 3)
- [ ] Cada afirmación numérica / factual tiene un único archivo de fuente canónica referenciado en todos los demás lugares
- [ ] Las superficies de IA (`llms.txt`, `/ai/*.md`, endpoints URL.md) se generan a partir de los mismos datos que el HTML
- [ ] La CI verifica la desincronización entre archivos en las métricas clave; sin entidad JSON-LD duplicada para el mismo `@id`

### Guía de puntuación

| Total | Banda |
|-------|------|
| 16–18 | Nivel producción — citado activamente por sistemas de IA |
| 11–15 | Bueno — visible para IA pero inconsistente |
| 6–10  | Parcial — lagunas significativas en recuperación, autoridad o coherencia |
| 0–5   | Invisible — comienza con `/llms.txt`, robots.txt y JSON-LD |

> ¿Quieres mayor puntuación? Cada página de componente (Claridad del conocimiento, Formato estructurado, Señales de recuperación, Señales de autoridad, Señales de citación, Señales de coherencia) lista las implementaciones específicas que mueven la puntuación de 1 → 2 → 3.
