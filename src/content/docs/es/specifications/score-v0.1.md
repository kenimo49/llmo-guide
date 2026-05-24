---
title: "LLMOFramework Score v0.1 — Draft Specification"
description: "Definición formal del LLMOFramework Score v0.1 Draft: 5 verificaciones de substrate, pesos, reglas de puntuación y formato del JSON. Implementación de referencia: llmo-checker."
pubDate: 2026-05-24
---

> **Status: Draft.** Es la v0.1, la primera versión publicada. Pesos, lista de verificaciones y formato del JSON pueden cambiar en la v0.2 sin compatibilidad con versión anterior. Fija la versión del checker si dependes del formato del JSON.

El LLMOFramework Score es un único número (0–100) que resume qué tan recuperable por IA es una URL. El score v0.1 mide **solo señales de substrate** — señales estáticas que un crawler de IA puede extraer en un solo fetch HTTP, sin correr JavaScript, sin ejecutar un LLM y sin simular retrieval.

La implementación de referencia es el CLI OSS [`llmo-checker`](https://github.com/open-llmo/llmo-checker), mantenido por la Open LLMO Research Initiative.

## Principios de diseño

1. **Substrate antes que behavior.** v0.1 mide señales que un crawler de IA puede extraer de un solo fetch HTTP. Las señales conductuales (citación, estabilidad de retrieval, lectura por LLM) quedan diferidas para v0.2+.
2. **Reproducible.** Cada verificación es una función pura del HTML, robots.txt y llms.txt obtenidos por fetch. Sin red más allá, sin llamadas de IA, sin comportamiento dependiente del reloj.
3. **Puntuación falsable.** Cada verificación publica su regra de puntuación. Si no estás de acuerdo con una regla, puedes correr el checker y el spec en paralelo y mostrar dónde divergen.
4. **Pesos honestos.** Los pesos v0.1 son valores por defecto definidos por los autores, no derivados de datos de resultado. La v0.2 recalibrará usando el [piloto de correlación con citación](/es/experiments/dogfooding-our-own-sites/).

## Composición del score

El score es un promedio ponderado de 5 verificaciones:

| ID | Peso | Mide |
|---|---|---|
| `llms-txt` | 20 | Existencia y estructura de `/llms.txt` |
| `robots-ai` | 15 | Posicionamiento explícito frente a crawlers de IA conocidos en `/robots.txt` |
| `canonical` | 15 | Corrección de `<link rel="canonical">` y alternativos `hreflang` |
| `jsonld` | 20 | Existencia, parseabilidad y tipos schema.org reconocidos del JSON-LD |
| `meta` | 15 | `<title>`, `<meta name="description">`, OpenGraph, `<h1>`, `<html lang>` |

Peso total en v0.1: **85**. Los scores se normalizan a 0–100 vía promedio ponderado.

### Bandas de score

| Banda | Score | Interpretación |
|---|---|---|
| Verde | 85–100 | Bien fundamentado para retrieval por IA |
| Amarillo | 65–84 | Requiere trabajo — varias señales faltantes o débiles |
| Amarillo | 40–64 | Pobre — huecos significativos en el substrate |
| Rojo | 0–39 | Crítico — la página está prácticamente invisible para crawlers de IA |

## Especificaciones por verificación

### `llms-txt` (peso 20)

**Fetch:** `GET {origin}/llms.txt`

**Puntuación:**

| Condición | Impacto en score |
|---|---|
| HTTP 404 o 5xx | 0 |
| Body vacío | 10 |
| Body no-vacío (base) | 60 |
| Línea de título `# Title` presente | +15 |
| Al menos un encabezado `## Section` | +10 |
| ≥ 3 entradas de enlace con patrón `^- \[` | +15 |
| 1–2 entradas de enlace | +8 |
| 0 entradas de enlace | +5 |

**Status:** `pass` ≥ 85, `warn` ≥ 60, `fail` en caso contrario.

Spec de referencia: [llmstxt.org](https://llmstxt.org/).

### `robots-ai` (peso 15)

**Fetch:** `GET {origin}/robots.txt`

**User-agents de IA reconocidos (v0.1):** `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`, `ClaudeBot`, `Claude-Web`, `anthropic-ai`, `CCBot`, `Google-Extended`, `PerplexityBot`, `Applebot-Extended`, `cohere-ai`.

**Puntuación:**

| Condición | Impacto en score |
|---|---|
| HTTP 404 | 60 (warn — posicionamiento explícito recomendado) |
| HTTP 5xx | 0 |
| Body parseable (base) | 70 |
| ≥ 3 bots de IA reconocidos mencionados explícitamente | +20 |
| 1–2 bots de IA mencionados | +10 |
| Grupo con User-agent wildcard `*` presente | +10 |

**Status:** `pass` ≥ 85, `warn` ≥ 60, `fail` en caso contrario. Score acotado a 100.

La mención cuenta sea cual sea la regla (`Allow` o `Disallow`). v0.1 registra `disallowedBots` en la salida JSON pero no penaliza Disallow — hacer opt-out de crawlers de IA es un posicionamiento válido.

### `canonical` (peso 15)

**Fuente:** el HTML obtenido por fetch.

**Puntuación:**

| Condición | Impacto en score |
|---|---|
| Sin `<link rel="canonical">` | 0 (fail) |
| `href` no es una URL válida | 20 (fail) |
| Canonical apunta a otro origin | 60 (warn) |
| Canonical apunta al mismo origin (base) | 90 (pass) |
| `<link rel="alternate" hreflang>` presente | +10 |

**Status:** `pass` si canonical presente y mismo origin, `warn` para cross-origin, `fail` en caso contrario. Score acotado a 100.

El canonical cross-origin es intencional para mirrors republicados, pero se descuenta por defecto porque suele ser más bien un error de configuración.

### `jsonld` (peso 20)

**Fuente:** todos los bloques `<script type="application/ld+json">` en el HTML obtenido por fetch.

**Tipos de entidad schema.org reconocidos (v0.1):** `Organization`, `Person`, `Article`, `BlogPosting`, `TechArticle`, `Book`, `WebSite`, `WebPage`, `BreadcrumbList`, `FAQPage`, `HowTo`, `Product`, `SoftwareApplication`.

**Puntuación:**

| Condición | Impacto en score |
|---|---|
| Sin bloques JSON-LD | 0 (fail) |
| Al menos un bloque parseable (base) | 50 |
| Por `@type` reconocido (tope en 3) | +12 c/u |
| `Organization` o `Person` presente | +8 |
| Cualquier bloque falla al parsear | −20 |

El checker recorre arrays `@graph` recursivamente para juntar tipos.

**Status:** `pass` ≥ 85, `warn` ≥ 50, `fail` en caso contrario. Score acotado a 0–100.

### `meta` (peso 15)

**Fuente:** `<head>` y primer `<body>` del HTML obtenido por fetch.

**Puntuación:**

| Señal | Impacto en score |
|---|---|
| `<title>` de 20–70 caracteres | +20 |
| `<title>` presente pero fuera de 20–70 | +10 |
| `<meta name="description">` de 80–200 caracteres | +20 |
| Description presente pero fuera de 80–200 | +10 |
| OpenGraph `title` + `description` presentes | +20 |
| OpenGraph `type` presente | +10 |
| Exactamente un `<h1>` | +20 |
| Atributo `<html lang>` presente | +10 |

**Status:** `pass` ≥ 85, `warn` ≥ 60, `fail` en caso contrario. Score acotado a 100.

## Formato del JSON

La salida `--json` del CLI y la API programática devuelven:

```typescript
interface CheckerReport {
  url: string;              // URL de entrada resuelta
  origin: string;           // URL.origin de la página
  timestamp: string;        // ISO 8601
  checkerVersion: string;   // semver del CLI
  scoreVersion: "0.1";      // versión de esta especificación
  score: number;            // promedio ponderado, 0-100
  checks: CheckResult[];
}

interface CheckResult {
  id: string;               // identificador estable de la verificación (ej: "llms-txt")
  name: string;             // nombre amigable de presentación
  status: "pass" | "warn" | "fail" | "skip";
  score: number;            // 0-100
  weight: number;           // contribución al score general
  details: Record<string, unknown>;  // datos específicos de la verificación
  notes: string[];          // notas legibles con sugerencia de acción
}
```

**Garantías de estabilidad para v0.1:**

- Los nombres de los campos de nivel superior (`url`, `origin`, `timestamp`, `checkerVersion`, `scoreVersion`, `score`, `checks`) son estables en todas las releases 0.1.x
- El `id`, el `weight` y el formato general de `status`/`score` de cada verificación son estables
- El formato de `details` **no es estable** dentro de 0.1.x — campos nuevos pueden añadirse en releases patch
- El conjunto de `id` en `checks` es estable en 0.1.x (no se añaden verificaciones nuevas sin release v0.2)

## Códigos de salida (CLI)

| Código | Significado |
|---|---|
| 0 | Score ≥ 50 (pasa el mínimo) |
| 1 | Score < 50 (debajo del mínimo) |
| 2 | Error de fetch (red, DNS, respuesta no-2xx) |

Esto permite usar el CLI como smoke check en CI: un sitio reprobado reprueba el pipeline.

## Implementación de referencia

Fuente: [`open-llmo/llmo-checker`](https://github.com/open-llmo/llmo-checker)

```bash
npx llmo-checker https://example.com
npx llmo-checker https://example.com --json
```

Requiere Node.js 20+.

Si la implementación de referencia y este spec divergen, el spec está correcto en intención y la implementación debe corregirse — por favor [abre un issue](https://github.com/open-llmo/llmo-checker/issues).

## Lo que la v0.1 deliberadamente no mide

Son preocupaciones válidas de LLMO que no incluimos en v0.1, con los motivos:

| Indicador | Motivo del aplazamiento |
|---|---|
| Citation Visibility | Exige sondear asistentes de IA. Fuera de alcance de una verificación puramente estática. Planeado para v0.2 como verificación opt-in opcional. |
| Chunk Readability | Exige elegir estrategia de chunking. La v0.2 usará un chunker por defecto documentado para que la verificación sea reproducible. |
| Markdown Quality | Solo aplica cuando hay una fuente Markdown publicada. La v0.2 detectará endpoints estilo `/index.md`. |
| Calidad / precisión del contenido | Fuera de alcance. El score mide substrate, no calidad editorial. |
| Estabilidad de retrieval en el tiempo | Requiere sondeo longitudinal. Reservado al proyecto Benchmark, no al Score por URL. |

## Política de versionamiento

La versión del score es independiente de la versión de la implementación de referencia. La v0.1 del score puede ser implementada por `llmo-checker@0.1.x` (cualquier patch). La v0.2 del score requerirá `llmo-checker@0.2.x`.

Cambios incompatibles entre versiones minor del score (0.1 → 0.2) son esperables durante la fase Draft. Vamos a publicar la especificación 1.0 solo después que cierre la Phase 2 (Community) — es decir, después de tener datos de resultado del piloto de correlación con citación, después de que existan implementaciones externas y después de que los pesos sean recalibrados.

## Contribuir

Los cambios al spec entran vía issues en el [repo llmo-guide](https://github.com/kenimo49/llmo-guide/issues) (fuente de este sitio).

Al proponer una verificación nueva o cambio de peso:

1. Indica la señal y qué mide (una oración)
2. Indica la regla de puntuación (debe ser determinística a partir de un fetch HTTP a menos que sea v0.2+)
3. Cita un paper, experimento público o argumento estilo Lighthouse para el peso
4. Provee un reproductor (una URL que puntúa alto y una URL que puntúa bajo bajo la regla propuesta)

Los cambios de implementación entran en [`open-llmo/llmo-checker`](https://github.com/open-llmo/llmo-checker).

## Agradecimientos

La estructura del score está fuertemente influida por [Lighthouse](https://developer.chrome.com/docs/lighthouse/) (Google) y la [propuesta llms.txt](https://llmstxt.org/) (Jeremy Howard). Ambos son bien diseñados, opinionados y falsables — propiedades que intentamos preservar.
