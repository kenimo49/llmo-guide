---
title: "Áreas de Investigación — 5 Dominios"
description: "Cinco áreas de investigación de la Open LLMO Research Initiative: AI Citation Analysis, Grounding Visibility, LLM Retrieval Optimization, AI-native Documentation y Agent-oriented Information Architecture."
pubDate: 2026-05-24
---

La Open LLMO Research Initiative organiza su trabajo en cinco áreas de investigación. Cada área avanza de forma independiente, pero alimenta el conjunto de métricas definido por el [LLMOFramework Score](/es/experimental-projects/).

## Visión general

| Área | Pregunta central |
|------|------------------|
| [1. AI Citation Analysis](#1-ai-citation-analysis) | ¿Qué contenido citan los LLMs, y bajo qué condiciones? |
| [2. Grounding Visibility](#2-grounding-visibility) | ¿Cómo hacer visibles las fuentes de grounding de la IA? |
| [3. LLM Retrieval Optimization](#3-llm-retrieval-optimization) | ¿Cómo optimizar documentos para la capa de retrieval de LLMs? |
| [4. AI-native Documentation](#4-ai-native-documentation) | ¿Qué formatos de documento procesan mejor los LLMs? |
| [5. Agent-oriented Information Architecture](#5-agent-oriented-information-architecture) | ¿Qué estructuras de información son más fáciles de navegar para los agentes de IA? |

---

## 1. AI Citation Analysis

### Alcance

Análisis de qué contenido es citado por los LLMs (ChatGPT, Claude, Gemini, Perplexity) para un tema dado. Las observaciones cubren frecuencia de citación, características estructurales de los documentos citados y el camino de retrieval que llevó a la citación.

### Preguntas clave

- ¿Cuánto se superponen los dominios citados entre LLMs para el mismo tema?
- ¿Es posible identificar las características estructurales (jerarquía de headings, tablas, densidad estadística, número de enlaces externos) de los documentos citados?
- ¿Se puede construir una checklist a posteriori para hacer que el contenido tenga más probabilidad de ser citado?

### Dirección actual

Recolección de datos para observación de citaciones por IA en curso. Plan para Phase 1: enviar Citation Visibility como métrica en el OSS `llmo-checker`.

---

## 2. Grounding Visibility

### Alcance

Visualización de grounding para respuestas de IA. Cubre en qué se apoyó un LLM para producir una respuesta y si esa fuente puede rastrearse hasta una referencia primaria verificable.

### Preguntas clave

- ¿Se puede definir un método estándar de reverse lookup desde la respuesta de IA hasta el documento fuente?
- ¿Hacer "visible" el grounding en un sitio (fuentes explícitas, referencias de datos, formato de citación) se correlaciona con tasas más altas de citación por IA?
- ¿Está la alucinación correlacionada con grounding débil?

### Dirección actual

Ya está parcialmente abordado como Citation Signals (el quinto componente del LLMO Framework). Plan para Phase 1: cuantificarlo como métrica de Grounding Stability.

---

## 3. LLM Retrieval Optimization

### Alcance

Optimización del lado del documento para la capa de retrieval de LLMs (RAG, embedding retrieval, plugins de búsqueda web, etc.). Cubre estrategia de chunking, estructura semántica, longitud de documento y diseño de headings.

### Preguntas clave

- ¿Cómo varía la relación entre tamaño de chunk y precisión de retrieval entre temas?
- ¿Cuál es la diferencia de eficiencia de retrieval entre Markdown, HTML y JSON-LD?
- ¿Cómo contribuye la densidad de enlaces internos a la expansión de contexto en búsqueda por IA?

### Dirección actual

El propio llmoframework.com sirve como referencia de implementación. Plan para Phase 1: publicar un experimento de comparación de chunking.

---

## 4. AI-native Documentation

### Alcance

Investigación sobre formatos de documento que los LLMs leen y escriben bien. Cubre llms.txt, convenciones de Markdown y la forma óptima de metadatos orientados a IA.

### Preguntas clave

- ¿Qué LLMs y crawlers consultan realmente llms.txt?
- ¿Dónde está el balance óptimo entre eficiencia de retrieval y poder expresivo entre Markdown y HTML?
- ¿Los metadatos estructurados para IA (JSON-LD, etc.) afectan las tasas de citación?

### Dirección actual

Implementación y medición de efecto de llms.txt en curso. Plan para Phase 1: publicar la herramienta OSS llms.txt-validator.

---

## 5. Agent-oriented Information Architecture

### Alcance

Investigación sobre arquitectura de la información para agentes de IA (Claude Code, Cursor, agentes autónomos, etc.). Cubre exposición de MCP (Model Context Protocol), diseño de documentación de API y descubribilidad.

### Preguntas clave

- ¿Los sitios que exponen servidores MCP tienen ventaja en visibilidad de búsqueda por IA?
- ¿Las docs de API agent-readable (OpenAPI + lenguaje natural) son más descubribles que referencias de API puras?
- ¿Se pueden establecer métodos para observar el comportamiento de exploración de los agentes autónomos?

### Dirección actual

Experimentos sobre el impacto de la exposición de MCP en la visibilidad de búsqueda en curso. Plan para Phase 1: proponer una métrica preliminar de Agent Visibility.

---

## Mapeo a Phases

| Área | Entregable planeado para Phase 1 |
|------|----------------------------------|
| AI Citation Analysis | Métrica Citation Visibility en `llmo-checker` |
| Grounding Visibility | Métrica Grounding Stability + dataset de evaluación |
| LLM Retrieval Optimization | Reporte de experimento de comparación de chunking |
| AI-native Documentation | OSS llms.txt-validator |
| Agent-oriented IA | Métrica preliminar de Agent Visibility |

El progreso de cada área se publica en el [Changelog](/es/changelog/) y en las [GitHub Issues](https://github.com/kenimo49/llmo-guide/issues).
