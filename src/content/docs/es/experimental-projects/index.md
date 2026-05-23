---
title: "Proyectos Experimentales"
description: "Tres proyectos experimentales de la Open LLMO Research Initiative: LLMOFramework Score, LLMOFramework Benchmark y LLMOFramework Compatible."
pubDate: 2026-05-24
---

Los proyectos experimentales publicados por la Open LLMO Research Initiative. Todos se entregan en estado **Draft / Experimental**. El estatus de especificación formal queda diferido a Phase 3.

## Visión general

| Proyecto | Función | Análogo | Estado |
|----------|---------|---------|--------|
| [1. LLMOFramework Score](#1-llmoframework-score) | Medir la descubribilidad por IA de un sitio | Lighthouse Score | Indicadores en borrador (Draft v0.1 en Phase 1) |
| [2. LLMOFramework Benchmark](#2-llmoframework-benchmark) | Comparar estructuras de sitio experimentalmente | Benchmark de referencia del sector | En planeación (Phase 1-2) |
| [3. LLMOFramework Compatible](#3-llmoframework-compatible) | Badge de certificación para sitios conformes | Marca "Certified" | Solo roadmap (Phase 3) |

---

## 1. LLMOFramework Score

### Qué mide

Score por sitio de qué tan reconocible, citable y parseable es el contenido para la IA. La contraparte de la era IA al Domain Authority del SEO o al Lighthouse Score.

### Indicadores candidatos (v0.1 Draft)

| Indicador | Descripción |
|-----------|-------------|
| Citation Visibility | Si el contenido es citado por la IA |
| Chunk Readability | Qué tan bien se divide el contenido en chunks |
| Semantic Structure | Qué tan explícita es la estructura semántica |
| AI Crawlability | Compatibilidad con crawlers de IA |
| llms.txt | Conformidad con llms.txt |
| Markdown Quality | Calidad estructural |
| Entity Clarity | Facilidad de reconocimiento de entidades |
| Retrieval Stability | Consistencia de retrieval |

Cada indicador se entrega con **fórmula de cálculo y código de checker OSS**. Lighthouse ganó confianza porque era medible y reproducible, y este proyecto sigue el mismo principio.

### OSS relacionado

`llmo-checker` está planeado para Phase 1.

```
npx llmo-checker https://example.com

LLMOFramework Score: 74

Citation Visibility: 81
Semantic Chunkability: 68
AI Readability: 77
Grounding Stability: 70
```

### Estado

Las definiciones de indicadores están en borrador. La publicación de Draft v0.1 está apuntada a Phase 1 (fecha por confirmar).

---

## 2. LLMOFramework Benchmark

### Qué compara

Comparación experimental de qué estructuras de sitio rinden mejor para IA. Como aún no existe un benchmark estándar para retrieval y citación por IA, este proyecto propone primero una metodología de medición.

### Ejes de comparación candidatos

- Markdown vs HTML
- Presencia de FAQ schema
- Estructura de tabla
- Tamaño de chunk
- Formato de citación
- Linkado interno
- Integración con GitHub
- Conformidad con llms.txt
- Exposición de MCP

### Política de publicación

Cada experimento se entrega como **Reproducible Benchmark Report** en GitHub y en este sitio, incluyendo el dataset, scripts de medición, resultados brutos y prompts de evaluación.

### Estado

En planeación. El primer experimento de comparación (Markdown vs HTML, eficiencia de retrieval) está planeado para Phase 1.

---

## 3. LLMOFramework Compatible

### Propósito del badge

Marca de certificación para sitios conformes con estructura optimizada para IA. Pensada para ser exhibida por SaaS, sitios de documentación, proyectos OSS y productos de IA.

### Concepto visual

```
[ LLMOFramework Compatible ]
[ AI Retrieval Ready ]
[ Grounding Optimized ]
```

### Requisitos de conformidad (borrador conceptual)

| Requisito | Contenido |
|-----------|-----------|
| Colocación de llms.txt | Un llms.txt válido existe en la raíz del sitio |
| Semantic Structure | Las páginas principales satisfacen jerarquía de headings y HTML semántico |
| Chunk Optimization | Las secciones principales caben dentro del rango recomendado de chunk size |
| Grounding-friendly Docs | Citaciones, fuentes de datos y fechas de actualización son explícitas |

### Estado

**Solo roadmap**. Posicionado en Phase 3 (la última). Las razones:

- La certificación depende de la adopción por el ecosistema, así que Score y Benchmark deben madurar primero
- Emitir certificación operando solo se lee como autoridad de fachada y erosiona la confianza
- El badge Compatible se diseñará solamente después de que la comunidad Open Source haya producido adopción por terceros

---

## Mapeo a Phases

| Phase | Progreso de proyectos |
|-------|----------------------|
| Phase 0 (actual) | Borrador de indicadores, publicación del concepto de los proyectos |
| Phase 1 | Score Draft v0.1, OSS `llmo-checker`, primer Benchmark Report |
| Phase 2 | Revisión del Score, updates continuos del Benchmark, integración del feedback de la comunidad |
| Phase 3 | Diseño de la certificación Compatible, especificaciones formales, formación de Working Group |

El código fuente y la discusión de cada proyecto son públicos en el [repositorio de GitHub](https://github.com/kenimo49/llmo-guide) y en las [Issues](https://github.com/kenimo49/llmo-guide/issues).
