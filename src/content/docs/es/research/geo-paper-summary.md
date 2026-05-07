---
title: "Artículo GEO: Lo que dice la ciencia"
description: "Resumen del artículo GEO (Generative Engine Optimization) de Princeton/IIT Delhi, publicado en KDD 2024. Hallazgos clave sobre tasas de citación, estrategias de contenido y mejoras estadísticas."
---

El artículo **GEO (Generative Engine Optimization)** es el primer marco académico para optimizar la visibilidad del contenido en motores de búsqueda potenciados por IA. Publicado en KDD 2024 (ACM SIGKDD), proporciona evidencia empírica de las estrategias de optimización de contenido sobre las que se basa el LLMO Framework.

## Detalles del artículo

| Campo | Valor |
|-------|-------|
| Título | GEO: Generative Engine Optimization |
| Autores | Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande |
| Institución | Princeton University, IIT Delhi, Adobe Research |
| Conferencia | KDD 2024 (ACM SIGKDD) |
| arXiv | [2311.09735](https://arxiv.org/abs/2311.09735) |
| Publicado | 2024 |

## Diseño de la investigación

Los investigadores construyeron **GEO-Bench**, un benchmark de 10,000 consultas de búsqueda en múltiples dominios. Probaron 9 estrategias de optimización de contenido en un motor de búsqueda generativo para medir qué enfoques mejoraban la visibilidad de las fuentes.

### Las 9 estrategias probadas

1. Citar fuentes
2. Adición de citas textuales
3. Adición de estadísticas
4. Optimización de fluidez
5. Palabras únicas
6. Términos técnicos
7. Tono autoritativo
8. Lenguaje fácil de entender
9. Keyword stuffing

## Hallazgos clave

### Efectividad de las estrategias

| Estrategia | Mejora de visibilidad | Componente LLMO |
|-----------|----------------------|-----------------|
| **Adición de estadísticas** | **+115.1%** | Señales de citación |
| **Citar fuentes** | **+77.0%** | Señales de citación |
| **Adición de citas textuales** | **+72.2%** | Señales de autoridad |
| Tono autoritativo | +21.5% | Claridad del conocimiento |
| Optimización de fluidez | +15.2% | Claridad del conocimiento |
| Términos técnicos | +5.8% | Claridad del conocimiento |
| Lenguaje fácil de entender | +2.4% | Claridad del conocimiento |
| Palabras únicas | -3.1% | — |
| Keyword stuffing | -10.2% | — |

### El top tres

Las tres estrategias más efectivas comparten un rasgo común: proporcionan **evidencia externa verificable**.

1. **Adición de estadísticas (+115.1%)**: Agregar números y datos específicos hizo el contenido más del doble de visible. Ejemplo: "Los ingresos crecieron un 34% año a año" frente a "Los ingresos crecieron significativamente."

2. **Citar fuentes (+77.0%)**: Referenciar artículos, informes o documentación específicos aumentó la visibilidad en un 77%. Los sistemas de IA prefieren contenido que puedan contrastar.

3. **Adición de citas textuales (+72.2%)**: Incluir citas directas de expertos o fuentes autoritativas agregó credibilidad que los sistemas de IA reconocieron y citaron.

### Qué no funciona

- **Keyword stuffing (-10.2%)**: Las tácticas de SEO tradicionales perjudican activamente la visibilidad en IA. Los sistemas de IA pueden detectar y penalizar la densidad artificial de palabras clave.
- **Palabras únicas (-3.1%)**: Usar vocabulario inusual no mejoró la visibilidad. La claridad supera a la creatividad.

## Implicaciones para LLMO

### 1. Las Señales de citación son el componente de mayor palanca

Los datos de GEO muestran que las Señales de citación (estadísticas, fuentes, citas textuales) representan las mayores mejoras de visibilidad. Por eso el LLMO Framework sitúa las Señales de citación como Componente 5 — la pieza final que multiplica el efecto de todos los demás componentes.

### 2. La claridad del contenido importa, pero menos que la evidencia

Las estrategias relacionadas con la Claridad del conocimiento (tono autoritativo, fluidez, lenguaje fácil) mostraron mejoras positivas pero moderadas (2–22%). Escribir bien es necesario pero no suficiente. El multiplicador viene de agregar hechos verificables.

### 3. Las tácticas de SEO son contraproducentes para la IA

El keyword stuffing, la piedra angular del SEO temprano, redujo activamente la visibilidad en IA. Esto confirma que LLMO requiere un enfoque fundamentalmente diferente al SEO tradicional.

## Variaciones por dominio

El artículo GEO encontró que la efectividad de las estrategias varía según el dominio:

- **Consultas factuales/científicas**: La Adición de estadísticas fue más efectiva
- **Consultas de opinión/subjetivas**: La Adición de citas textuales tuvo mejor rendimiento
- **Consultas técnicas**: Citar fuentes tuvo el mayor impacto

Esto sugiere que la implementación de LLMO debe adaptarse al dominio de tu contenido. Un sitio de investigación se beneficia más de las estadísticas, mientras que un blog de liderazgo de pensamiento se beneficia más de las citas de expertos.

## Cómo LLMO se basa en GEO

El LLMO Framework extiende GEO de tres maneras:

1. **Alcance más amplio**: GEO se centra en los motores de búsqueda generativos. LLMO cubre todas las interacciones con LLM, incluyendo consultas directas, RAG y agentes de IA.
2. **Enfoque en la implementación**: GEO identifica *qué* funciona. LLMO proporciona *cómo implementarlo* con formatos de archivo específicos (llms.txt), datos estructurados (JSON-LD) y patrones de diseño de contenido.
3. **Capa de recuperación**: GEO asume que el contenido ya ha sido recuperado. LLMO agrega el componente de Señales de recuperación para garantizar que el contenido sea descubrible en primer lugar.

## Lectura adicional

- [Artículo completo en arXiv](https://arxiv.org/abs/2311.09735)
- [Resumen del LLMO Framework](/es/framework/overview/)
- [Señales de citación](/es/framework/citation-signals/) — implementando la estrategia GEO más efectiva
