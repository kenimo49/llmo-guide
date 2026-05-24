---
title: "Dogfooding del LLMO Score v0.1: Pasamos el Checker por Nuestros 6 Sitios"
description: "Medimos 6 sitios que operamos — incluido el sitio corporativo del laboratorio detrás de LLMOFramework — con el nuevo CLI llmo-checker. El sitio corporativo sacó 29 / 100."
pubDate: 2026-05-24
---

El primer **Public Experiment Log** de la Open LLMO Research Initiative.

Acabamos de publicar [`llmo-checker`](https://github.com/open-llmo/llmo-checker), un CLI estilo Lighthouse que mide qué tan recuperable por IA es una URL (v0.1 Draft). Lo primero que hicimos con él fue apuntarlo a cada sitio que operamos, incluido el sitio corporativo del laboratorio que mantiene esta iniciativa.

El titular del resultado: **nuestro propio sitio corporativo sacó 29 / 100**, más bajo que cualquiera de los sitios de cara al consumidor para los que supuestamente sirve de referencia.

## Metodología

- Herramienta: `npx llmo-checker <url>` v0.1.0 (commit `1db47ea`)
- Fecha: 2026-05-24
- Sitios: 6 propiedades que nos pertenecen u operamos
- Score: promedio ponderado de 5 verificaciones estáticas — `llms-txt` (peso 20), `robots-ai` (15), `canonical` (15), `jsonld` (20), `meta` (15)
- Bandas de score: 85+ well-grounded · 65–84 needs work · 40–64 poor · 0–39 critical

Todas las verificaciones son fetches HTTP puros y parsing de HTML. En v0.1 no hay simulación de citación por IA: el score mide el **substrate** que un crawler de IA puede de hecho ver.

## Resultados

| Sitio | Rol | Score | Banda | Check más débil |
|---|---|---|---|---|
| `llmoframework.com` | Sitio de esta iniciativa | **96** | well-grounded | `llms-txt` sin lista de enlaces (cosmético) |
| `kenimoto.dev` | Sitio personal del autor | **96** | well-grounded | igual que arriba |
| `legacydram.com` | Medio de whisky × ingeniería | **93** | well-grounded | JSON-LD parcial (sin `Organization`/`Person`) |
| `mypcrig.com` | Curaduría de PC builds | **90** | well-grounded | Sin `hreflang` (ok para sitio monolingüe) + JSON-LD parcial |
| `kaoriq.com` | E-commerce de fragancias | **90** | well-grounded | Sin reglas explícitas de bots de IA en robots.txt |
| **`propel-lab.com`** | **Sitio corporativo del laboratorio** | **29** | **critical** | Casi todo |

`propel-lab.com` es el sitio corporativo del laboratorio que mantiene esta misma iniciativa. Sacó peor puntuación que cada sitio de producto de cara al consumidor que enviamos.

## Por qué falló el sitio corporativo

Un `curl` a la raíz cuenta toda la historia:

```bash
$ curl -s https://propel-lab.com/
<!DOCTYPE html><html><head><script>window.onload=function(){window.location.href="/lander"}</script></head></html>
```

La raíz de `propel-lab.com` es **una línea de HTML**. Un redirect vía `window.location.href` se ejecuta en el navegador, mandando al visitante a `/lander`.

Funciona para un humano en Chrome. Es invisible para todo crawler de IA que conocemos. Ninguno de GPTBot, ClaudeBot, CCBot, Google-Extended, PerplexityBot o Applebot-Extended ejecuta JavaScript al hacer el fetch. Ven el HTML literal de arriba y se detienen.

Entonces, en la URL raíz (la primera que la mayoría de los sistemas de IA va a sondear), el checker encontró:

- Sin `<title>`
- Sin `<meta name="description">`
- Sin OpenGraph
- Cero elementos `<h1>`
- Sin `<html lang>`
- Sin JSON-LD
- Sin `<link rel="canonical">`

Después corrimos el checker contra el **destino del redirect**, `https://propel-lab.com/lander`. Sacó **31 / 100**, también critical. La página de destino tiene contenido, pero no tiene canonical, no tiene JSON-LD, y la metadata es débil.

Ambas capas fallan.

## Qué significa esto

Hay un patrón común donde los equipos publican una estructura "splash → landing" en el sitio corporativo, asumen que Google maneja JS sin problema, y nunca verifican cómo se ve la página para un crawler sin JS. Esa suposición era mayormente cierta para Google search. **Es mayormente falsa para crawlers de IA en 2026.**

En nuestro caso, el sitio corporativo de un *laboratorio enfocado en LLMO* cayó exactamente en esa trampa. Lo detectamos porque construimos una herramienta que nos obligó a mirar el substrate. Sin la herramienta, habríamos seguido asumiendo que todo estaba bien porque el UX de cara al humano se veía limpio.

Este es exactamente el sentido de publicar el checker como OSS. La brecha en el substrate es invisible hasta que la mides.

## Qué vamos a cambiar

Agregamos esto a nuestro backlog público como resultado del experimento:

1. **Redirect server-side en `propel-lab.com/`** — reemplazar el redirect por JS con un 301 o renderizar el contenido de la landing directamente en la raíz
2. **Agregar canonical + JSON-LD `Organization` + metadata OG en `/lander`** — llevarlo solo de 31 a ≥ 85
3. **Correr el checker como smoke step** — meter la auditoría en nuestro propio pipeline de deploy, para que las regresiones futuras salgan a flote al instante
4. **Mejorar la cobertura de JSON-LD en `mypcrig.com` y `kaoriq.com`** — ambos están en 82 / 100 en `jsonld` porque emiten algunos pero no todos los tipos relevantes (`Product`, `Person`, `Article`)
5. **Agregar política explícita de bots de IA al robots.txt de `kaoriq.com`** — hoy neutral; queremos opt-in explícito para GPTBot / ClaudeBot / Google-Extended

Cuando terminemos, publicamos un Experiment Log de follow-up con los scores re-medidos. Honestos sobre el delta, exista o no.

## Por qué publicamos la mala nota

Hay una tentación fuerte, cuando lanzas una herramienta de medición, de usarla principalmente en competidores. Estamos haciendo deliberadamente lo opuesto: el primer dataset público de `llmo-checker` son **nuestras propias propiedades**, incluyendo la que sacó la peor nota.

Dos razones:

1. **El score tiene que ser falsable.** Si nunca publicamos una nota fallida sobre algo nuestro, nadie tiene motivo para confiar en que la puntuación es honesta.
2. **La credibilidad de la iniciativa viene de los artefactos, no del encuadre.** Un laboratorio que publica su propio sitio corporativo en 29 / 100 es más creíble que uno que publica un manifiesto y un auto-score de 100 / 100.

## Límites del experimento

- v0.1 mide solo substrate. Un sitio puede sacar 95 en substrate y aun así tener cero citaciones en IA porque el contenido es poco interesante, contradice hechos conocidos, o duplica fuentes con más autoridad. Citation Visibility queda reservado para v0.2.
- Los pesos (`llms-txt` 20, `robots-ai` 15, `canonical` 15, `jsonld` 20, `meta` 15) los fijaron los autores y no están validados. Son valores por defecto razonables, no derivados de datos de resultado. Vamos a recalibrar conforme juntemos datos de resultado de citación durante Phase 2.
- Probamos solo páginas de inicio. Las páginas de artículo en cada sitio pueden sacar score distinto.

## Reproducir el experimento

```bash
npx llmo-checker@0.1.0 https://llmoframework.com/
npx llmo-checker@0.1.0 https://kenimoto.dev/
npx llmo-checker@0.1.0 https://legacydram.com/
npx llmo-checker@0.1.0 https://mypcrig.com/
npx llmo-checker@0.1.0 https://kaoriq.com/
npx llmo-checker@0.1.0 https://propel-lab.com/
npx llmo-checker@0.1.0 https://propel-lab.com/lander
```

Agrega `--json` para salida legible por máquina. Fija la versión (`@0.1.0`); el formato del JSON puede cambiar en v0.2.

## Lo que sigue

Este es el primer Public Experiment Log de la serie. Los dos próximos que planeamos correr:

- **Panel de línea base externa** — puntuar algunas decenas de sitios técnicos de alto tráfico (portales de documentación, blogs de devs, sitios de marketing de producto) y publicar la distribución. Calibra cómo se ve "lo normal".
- **Piloto de correlación con citación** — para ~50 URLs, comparar LLMO Score con la tasa real de citación por IA (sondeando ChatGPT, Claude y Perplexity). Es la primera prueba real de si el score predice el resultado que dice predecir.

La hoja de ruta completa está en [Experimental Projects](/es/experimental-projects/), y los pesos del v0.1 están definidos en [Score v0.1 Draft Specification](/es/specifications/score-v01/).
