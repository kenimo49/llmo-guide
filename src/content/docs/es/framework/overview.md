---
title: "El LLMO Framework: Un estándar para la visibilidad en IA"
description: "El LLMO Framework define 5 componentes principales para la visibilidad en IA: Claridad del conocimiento, Formato estructurado, Señales de recuperación, Señales de autoridad y Señales de citación. Puntuación máxima: 15 puntos."
pubDate: 2026-05-07
---

El LLMO Framework define cinco componentes principales que determinan si los sistemas de IA pueden descubrir, comprender y citar tu contenido con precisión.

¿Quieres empezar por los conceptos? Lee [¿Qué es el LLMO?](/es/guide/what-is-llmo/); si prefieres ir directo a la implementación, ve al [Inicio rápido en 30 min](/es/guide/quickstart/).

## Los cinco componentes

### 1. Claridad del conocimiento
¿Es tu contenido lo suficientemente claro para que la IA lo entienda y lo resuma con precisión?

- Usa lenguaje claro e inequívoco
- Define los términos clave de forma explícita
- Proporciona hechos estructurados (quién, qué, cuándo, dónde)
- Evita la jerga sin explicación

### 2. Formato estructurado
¿Está tu contenido estructurado para el consumo por máquinas?

- Usa HTML semántico y Markdown
- Implementa datos estructurados JSON-LD
- Proporciona llms.txt para contenido específico de IA
- Organiza el contenido de forma jerárquica

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

## Puntuación

Cada componente puede puntuarse en una escala de 0 a 3:

| Puntuación | Nivel | Descripción |
|-----------|-------|-------------|
| 0 | Ninguno | Componente no abordado |
| 1 | Básico | Implementación mínima |
| 2 | Bueno | Implementación sólida con margen de mejora |
| 3 | Excelente | Implementación de mejores prácticas |

**Puntuación máxima: 15 puntos** (5 componentes × 3 puntos cada uno)

## Lista de auto-evaluación

Puntúa tu propio sitio frente a cada componente. Cualquier ítem que puedas marcar con seguridad vale 1 punto; apunta a 3 casillas por componente para alcanzar la puntuación máxima.

### 1. Claridad del conocimiento (máx 3)
- [ ] Cada página inicia con una respuesta de una oración a su pregunta principal (Answer-first)
- [ ] Los términos específicos del dominio se definen en su primer uso (sin jerga sin explicar)
- [ ] Cada párrafo contiene una sola idea (sin párrafos de múltiples afirmaciones)

### 2. Formato estructurado (máx 3)
- [ ] Las páginas usan jerarquía semántica H1 → H2 → H3 sin saltos de nivel
- [ ] Cada página significativa emite JSON-LD (Article / TechArticle / FAQPage / Product / Organization, según corresponda)
- [ ] El contenido comparativo usa tablas, no listas en prosa

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
- [ ] Cada página expone tanto `datePublished` como `dateModified` (en JSON-LD o meta visible)
- [ ] El contenido comparativo referencia estándares de la industria (W3C, RFC, ISO, schema.org) por nombre y enlace

### Guía de puntuación

| Total | Banda |
|-------|-------|
| 13–15 | Nivel producción — citado activamente por sistemas de IA |
| 9–12  | Bueno — visible para IA pero inconsistente |
| 5–8   | Parcial — lagunas significativas en recuperación o autoridad |
| 0–4   | Invisible — comienza con `/llms.txt`, robots.txt y JSON-LD |

> ¿Quieres mayor puntuación? Cada página de componente (Claridad del conocimiento, Formato estructurado, Señales de recuperación, Señales de autoridad, Señales de citación) lista las implementaciones específicas que mueven la puntuación de 1 → 2 → 3.
