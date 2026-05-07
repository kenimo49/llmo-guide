---
title: "El LLMO Framework: Un estándar para la visibilidad en IA"
description: "El LLMO Framework define 5 componentes principales para la visibilidad en IA: Claridad del conocimiento, Formato estructurado, Señales de recuperación, Señales de autoridad y Señales de citación. Puntuación máxima: 15 puntos."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "The LLMO Framework: A Standard for AI Discoverability",
        "description": "Five core components for making your content discoverable by AI.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

El LLMO Framework define cinco componentes principales que determinan si los sistemas de IA pueden descubrir, comprender y citar tu contenido con precisión.

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
