---
title: "Acerca de la Open LLMO Research Initiative"
description: "Misión, principios de investigación, Founder y roadmap de Phases de la Open LLMO Research Initiative."
pubDate: 2026-05-24
---

La **Open LLMO Research Initiative** es una iniciativa independiente de investigación sobre retrieval, citación y grounding para la web abierta en el contexto de IA. Publica especificaciones, benchmarks y herramientas open-source como sus principales entregables.

## Misión

Investigar retrieval AI-native, visibilidad de grounding y arquitectura de la información orientada a LLM, y publicar métricas y especificaciones reproducibles.

### Áreas de investigación

| Área | Alcance |
|------|---------|
| AI Citation Analysis | Condiciones bajo las que LLMs citan contenido, y frecuencia de citación |
| Grounding Visibility | Métodos para visualizar en qué se basa la IA para responder |
| LLM Retrieval Optimization | Optimización de documentos para la capa de retrieval de LLMs |
| AI-native Documentation | Investigación sobre formatos de documento que los LLMs procesan bien |
| Agent-oriented Information Architecture | Estructuras de información que los agentes de IA pueden operar |

## Por qué esta Initiative

El espacio LLMO / AEO / GEO está creciendo rápido, pero faltan tres piezas fundamentales:

- **Sin medición reproducible** — no existe herramienta pública que cumpla el papel de Lighthouse o PageSpeed Insights para descubribilidad por IA
- **Sin vocabulario ni alcance compartido** — cada proveedor publica sus propias definiciones y el campo se ha fragmentado
- **Pocos datos experimentales abiertos** — las herramientas comerciales de SEO dominan y la capa de investigación es delgada

Esta Initiative se construyó para llenar esos tres huecos. El objetivo es cumplir, para LLMO, el papel que Lighthouse cumple para SEO: publicar la metodología, entregar las herramientas y dejar que la comunidad construya encima.

## Principios de investigación

| Principio | Significado |
|-----------|-------------|
| Reproducibility first | Cada métrica viene con fórmula de cálculo y checker OSS |
| Draft over Standard | Las especificaciones se publican como "Draft / Experimental / Proposal v0.1" para mantenerse revisables |
| Open Source first | Herramientas bajo licencias OSS, datos bajo CC BY, especificaciones bajo MIT |
| Solo-honest | La operación en solitario se declara explícitamente, en vez de disfrazarse como un consorcio |

## Founder

[Ken Imoto](https://kenimoto.dev). Autor de múltiples libros sobre LLMO y harness engineering, publicados en Zenn y Amazon Kindle. Fundador y CEO de Propel-Lab Inc. Responsable de la implementación y operación de múltiples frameworks internos y de llmoframework.com.

Publicaciones principales:

- Libros: [Lista completa (kenimoto.dev/es/books)](https://kenimoto.dev/es/books/)
  - Serie LLMO (Kindle / Zenn Book, en japonés, inglés, portugués y español)
  - Serie de harness engineering (Kindle / Zenn Book)
- Web: [kenimoto.dev](https://kenimoto.dev) / [propel-lab.co.jp](https://propel-lab.co.jp)
- Página de autor en Amazon: [Ken Imoto on Amazon](https://www.amazon.co.jp/stores/author/B0GQNPRCGF)
- Zenn: [zenn.dev/kenimo49](https://zenn.dev/kenimo49)
- OSS: [github.com/kenimo49](https://github.com/kenimo49)

## Roadmap de Phases

La Initiative madura por phases. Cada phase es prerrequisito de la siguiente.

| Phase | Alcance | Estado |
|-------|---------|--------|
| Phase 0 | Framing de investigación, publicación de la Misión, primer Experiment Log | En curso |
| Phase 1 | Reproducibilidad — CLI OSS (llmo-checker), Score v0.1 Draft, publicación de datasets | Planeada |
| Phase 2 | Comunidad — contributors, referencias externas, canales de feedback | Planeada |
| Phase 3 | Estandarización — especificaciones formales, badge Compatible, formación de Working Group | Planeada |

La estandarización va al final. Sin OSS, benchmarks e implementaciones maduros que la respalden, ni la certificación ni las especificaciones pueden ganarse la confianza.

## Contribuir

| Método | Enlace |
|--------|--------|
| Issues / reportes de bugs | [github.com/kenimo49/llmo-guide/issues](https://github.com/kenimo49/llmo-guide/issues) |
| Pull Requests | [github.com/kenimo49/llmo-guide](https://github.com/kenimo49/llmo-guide) |

## Licencia

Este sitio y todos los draft specs se publican bajo la [Licencia MIT](https://opensource.org/licenses/MIT).
