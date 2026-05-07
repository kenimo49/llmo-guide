---
title: "3. Señales de recuperación"
description: "Las Señales de recuperación son los mecanismos que permiten a los sistemas de IA descubrir y acceder a tu contenido — robots.txt, llms.txt, sitemap, endpoints /ai/ y presencia multiplataforma."
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

### 3. Proporcionar endpoints legibles por máquinas
Ofrece contenido en formatos que los sistemas de IA puedan consumir fácilmente:
- Versiones en Markdown de las páginas clave
- Endpoints de API para datos estructurados
- Feeds RSS/Atom para actualizaciones

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

- [ ] robots.txt permite los principales rastreadores de IA
- [ ] sitemap.xml está generado y actualizado
- [ ] El archivo llms.txt existe con un resumen preciso del sitio
- [ ] El contenido clave está disponible sin JavaScript
- [ ] El contenido está publicado en múltiples plataformas para referencias cruzadas
