---
title: "Artículos y referencias"
description: "Investigación académica e informes del sector relacionados con LLMO y la optimización para búsqueda con IA. Incluye GEO (KDD 2024), la propuesta llms.txt y estudios relacionados."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO Research Papers & References",
        "description": "Academic research and industry reports related to LLMO and AI search optimization.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

## Artículos principales

### GEO: Generative Engine Optimization
- **Autores**: Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande
- **Instituciones**: Princeton University, IIT Delhi, Adobe Research
- **Publicación**: KDD 2024 (ACM SIGKDD)
- **Enlace**: [arXiv:2311.09735](https://arxiv.org/abs/2311.09735)
- **Resumen**: Primer marco académico para optimizar la visibilidad del contenido en motores de búsqueda generativos. Se probaron 9 estrategias de optimización en 10,000 consultas. Hallazgo clave: agregar estadísticas mejoró la visibilidad en +115.1%.
- **[Resumen detallado →](/es/research/geo-paper-summary/)**

### Propuesta llms.txt
- **Autor**: Jeremy Howard
- **Enlace**: [llmstxt.org](https://llmstxt.org/)
- **Resumen**: Una propuesta para un archivo estandarizado que proporciona información a los LLM sobre un sitio web. Análogo a robots.txt pero diseñado para el consumo de IA en lugar del control de rastreadores.

## Informes y directrices del sector

### Microsoft: Optimización de contenido para respuestas de búsqueda con IA
- **Editor**: Microsoft (Bing Webmaster Blog)
- **Fecha**: octubre de 2025
- **Resumen**: Directrices oficiales que identifican 3 principios para la optimización de contenido en IA: Estructura, Autoridad y Actualidad.
- **[Resumen detallado →](/es/research/microsoft-guidelines/)**

### Ahrefs: Menciones web vs. backlinks para la visibilidad en IA
- **Editor**: Ahrefs
- **Conjunto de datos**: 75,000 marcas
- **Resumen**: Las menciones web (marca + palabra clave) son 3x más predictivas de la visibilidad en IA que los backlinks tradicionales.

### Gartner: El futuro de la búsqueda
- **Editor**: Gartner
- **Fecha**: febrero de 2024
- **Resumen**: Predicción de que el uso de los motores de búsqueda tradicionales caerá un 25% para 2026 a medida que los usuarios migren hacia alternativas potenciadas por IA.

### Go Fish Digital: Tasas de conversión de búsqueda con IA
- **Editor**: Go Fish Digital
- **Resumen**: El tráfico desde búsqueda con IA convierte a una tasa 25x mayor que el tráfico de búsqueda tradicional, gracias a la intención pre-validada del usuario.

## Investigación relacionada

### Datos estructurados de Schema.org
- **URL**: [schema.org](https://schema.org/)
- **Relevancia**: El estándar de vocabulario utilizado para la implementación de datos estructurados JSON-LD en el Componente 2 de LLMO (Formato estructurado).

### Documentación de datos estructurados de Google
- **URL**: [developers.google.com/search/docs/appearance/structured-data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- **Relevancia**: Directrices de implementación para datos estructurados reconocidos tanto por motores de búsqueda como por sistemas de IA.

## Contribuir

¿Conoces algún artículo o informe relevante? [Abre un issue](https://github.com/kenimo49/llmo-guide/issues) o envía un pull request para agregarlo a esta lista.
