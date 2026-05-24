---
title: "Dogfooding del LLMO Score v0.1: Pasamos el Checker por Nuestros 6 Sitios"
description: "Medimos 6 sitios que operamos con el nuevo CLI llmo-checker. Todos sacaron 90 o más. El resultado más interesante fue el que casi publicamos — y tuvimos que retirar antes de subir."
pubDate: 2026-05-24
---

El primer **Public Experiment Log** de la Open LLMO Research Initiative.

Acabamos de publicar [`llmo-checker`](https://github.com/open-llmo/llmo-checker), un CLI estilo Lighthouse que mide qué tan recuperable por IA es una URL (v0.1 Draft). Lo primero que hicimos con él fue apuntarlo a cada sitio que operamos.

El titular del resultado, después de una corrección: **las seis propiedades que poseemos sacaron 90 o más**. El artefacto más útil de este experimento es lo que pasó durante esa *corrección* — contado en detalle más abajo.

## Metodología

- Herramienta: `npx llmo-checker <url>` v0.1.0
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
| `propel-lab.co.jp` | Sitio corporativo del laboratorio | **94** | well-grounded | `<meta name="description">` con 47 caracteres (ideal 80–200) |
| `legacydram.com` | Medio de whisky × ingeniería | **93** | well-grounded | JSON-LD parcial (sin `Organization`/`Person`) |
| `mypcrig.com` | Curaduría de PC builds | **90** | well-grounded | Sin `hreflang` (ok para sitio monolingüe) + JSON-LD parcial |
| `kaoriq.com` | E-commerce de fragancias | **90** | well-grounded | Sin reglas explícitas de bots de IA en robots.txt |

Mediana 93, mínimo 90. Ningún sitio por debajo de la banda well-grounded.

Es una tabla bastante menos dramática que la que casi publicamos.

## De qué casi se trataba este experimento

La primera versión de esta entrada tenía otro titular: **"Nuestro propio sitio corporativo sacó 29 / 100, el peor resultado de la prueba."** Era el tipo de reporte auto-crítico que da credibilidad a un proyecto nuevo de medición.

La historia iba así. Habíamos medido `propel-lab.com` y sacado 29 / 100 — banda critical. Habíamos hecho `curl` a la raíz y encontrado una línea de HTML:

```bash
$ curl -s https://propel-lab.com/
<!DOCTYPE html><html><head><script>window.onload=function(){window.location.href="/lander"}</script></head></html>
```

Un redirect vía `window.location.href` a `/lander`, invisible para todo crawler de IA que conocemos. Después corrimos el checker contra el mismo `/lander` y sacamos **31 / 100**, también critical. Dos capas, las dos fallando. Teníamos una moraleja redonda: un laboratorio enfocado en LLMO cuyo `.com` corporativo no pasaba la prueba de substrate que predica.

Casi lo publicamos.

## Qué lo detuvo

Antes de subir, corrimos un curl más sobre ese HTML de destino. Tres firmas saltaron:

```html
<script>window.LANDER_SYSTEM="PW"</script>
<script src="https://www.google.com/adsense/domains/caf.js"></script>
<script src="https://img1.wsimg.com/parking-lander/static/js/main.be9a3b28.js"></script>
```

Esa es la huella de una **página de dominio aparcado** — `wsimg.com/parking-lander` es un template de parking hosteado por terceros, servido junto con Google AdSense for Domains. La página opera como un parking, no como un sitio corporativo.

No somos dueños de `propel-lab.com`. Nunca lo fuimos. El sitio corporativo es `propel-lab.co.jp`, que sacó **94 / 100** — well-grounded, tercero en la tabla.

Nuestra moraleja era sobre un dominio aparcado por otra persona.

## Por qué dejamos esto en el log

La tentación, después de atrapar un casi-accidente así antes de publicar, es corregir el borrador en silencio y mandar la versión honesta y sin gracia, sin dejar registro del caso. No lo vamos a hacer. Tres razones:

1. **Una iniciativa LLMO que esconde sus casi-accidentes es la misma que esconde notas malas.** Si vamos a poner la falsabilidad como principio declarado, hay que dejar huellas de las falsaciones.
2. **El patrón de dominio aparcado es un caso real de falla de substrate.** Cualquiera que registra un `.com` para branding pero nunca sirve un sitio real ahí está entregando a los crawlers de IA un substrate con la misma forma que `propel-lab.com`. Ese insight es el mismo, sea cual sea el dueño del dominio.
3. **El dogfooding nos dio un dataset solo-90+.** Es demasiado limpio para la prueba que esperábamos. Si mides tu propio trabajo y la peor nota es 90, aprendiste que escribes sitios consistentemente según tu propio estándar — no que el estándar prediga algo útil.

La pregunta sustantiva — "¿el LLMO Score predice el comportamiento real de citación por IA?" — no se contesta con un self-audit de seis sitios donde todo pasa. Requiere panel externo de línea base y piloto de correlación con citación. Esos son los dos próximos Experiment Logs.

## Qué seguimos cambiando en nuestros propios sitios

Incluso sin la historia del dominio aparcado, la tabla muestra cosas pequeñas que vale corregir:

1. **Description de `propel-lab.co.jp`** — actualmente 47 caracteres, ideal 80–200. Extender al mismo largo que las otras descripciones corporativas de nuestro portafolio
2. **Mejorar la cobertura de JSON-LD en `mypcrig.com` y `kaoriq.com`** — ambos están en 82 / 100 en `jsonld` porque emiten algunos pero no todos los tipos relevantes (`Product`, `Person`, `Article`)
3. **Agregar política explícita de bots de IA al robots.txt de `kaoriq.com`** — hoy neutral; queremos opt-in explícito para GPTBot / ClaudeBot / Google-Extended
4. **Agregar lista de enlaces al `/llms.txt` de `llmoframework.com` y `kenimoto.dev`** — los archivos actuales tienen prosa pero sin sección de enlaces; los dos pierden una fracción pequeña del peso de `llms-txt`

Cuando esto termine, publicamos un Experiment Log de follow-up con los scores re-medidos. Honestos sobre el delta, exista o no.

## Lo que aprendimos sin esperarlo

La lección más nítida no es sobre substrate. Es sobre disciplina narrativa.

Cuando la nota de `propel-lab.com` volvió en 29, el primer movimiento fue construir una narrativa alrededor del número. La narrativa quedó tight, contraria al sentido común, y habría sido un post que se comparte. El número es lo que hacía posible la narrativa.

El hecho de que somos dueños de `propel-lab.com` se asumió sin chequear. Es el tipo de supuesto que una buena narrativa refuerza, porque admitir la falla colapsa el post entero. Lo cazamos por accidente — corriendo un curl más sobre otra parte del HTML buscando hallazgos adicionales, no para cuestionar la premisa.

Para un proyecto cuya propuesta de valor es *medí tu substrate de IA antes de asumir cómo se ve*, casi publicar una pieza basada en **no medir la propiedad del dominio antes de asumir qué era** es la vergüenza correcta.

## Límites del experimento

- v0.1 mide solo substrate. Un sitio puede sacar 95 en substrate y aun así tener cero citaciones en IA porque el contenido es poco interesante, contradice hechos conocidos, o duplica fuentes con más autoridad. Citation Visibility queda reservado para v0.2.
- Los pesos (`llms-txt` 20, `robots-ai` 15, `canonical` 15, `jsonld` 20, `meta` 15) los fijaron los autores y no están validados. Son valores por defecto razonables, no derivados de datos de resultado. Vamos a recalibrar conforme juntemos datos de resultado de citación durante Phase 2.
- Probamos solo páginas de inicio. Las páginas de artículo en cada sitio pueden sacar score distinto.
- El dataset son seis sitios que nosotros mismos escribimos según nuestro propio estándar. No dice nada sobre si el estándar generaliza.

## Reproducir el experimento

```bash
npx llmo-checker@0.1.0 https://llmoframework.com/
npx llmo-checker@0.1.0 https://kenimoto.dev/
npx llmo-checker@0.1.0 https://propel-lab.co.jp/
npx llmo-checker@0.1.0 https://legacydram.com/
npx llmo-checker@0.1.0 https://mypcrig.com/
npx llmo-checker@0.1.0 https://kaoriq.com/
```

Agrega `--json` para salida legible por máquina. Fija la versión (`@0.1.0`); el formato del JSON puede cambiar en v0.2.

Para reproducir la detección de dominio aparcado, corré también:

```bash
npx llmo-checker@0.1.0 https://propel-lab.com/
npx llmo-checker@0.1.0 https://propel-lab.com/lander
curl -s https://propel-lab.com/lander | head -1
```

Los dos primeros van a devolver notas críticas. El tercero va a mostrar marcadores `LANDER_SYSTEM` / `parking-lander` / `adsense/domains` en el HTML.

## Lo que sigue

Este es el primer Public Experiment Log de la serie. Los dos próximos que planeamos correr:

- **Panel de línea base externa** — puntuar algunas decenas de sitios técnicos de alto tráfico (portales de documentación, blogs de devs, sitios de marketing de producto) y publicar la distribución. Calibra cómo se ve "lo normal" — la comparación que este self-audit por sí solo no puede hacer.
- **Piloto de correlación con citación** — para ~50 URLs, comparar LLMO Score con la tasa real de citación por IA (sondeando ChatGPT, Claude y Perplexity). Es la primera prueba real de si el score predice el resultado que dice predecir.

La hoja de ruta completa está en [Experimental Projects](/es/experimental-projects/), y los pesos del v0.1 están definidos en [Score v0.1 Draft Specification](/es/specifications/score-v01/).

## Update (24/05/2026, mismo día): re-medido tras entregar las cuatro correcciones

Las cuatro correcciones listadas en "Lo que aún estamos cambiando en nuestros propios sitios" se desplegaron el mismo día que el post original, en dos olas. Re-medido con `llmo-checker@0.1.0`:

| Sitio | Antes | Después | Qué ayudó |
|---|---|---|---|
| `llmoframework.com` | 96 | **99** | Sección `## Links` del `/llms.txt` convertida a entradas `- [title](url)` conformes al spec (llms-txt 90 → 100) |
| `kenimoto.dev` | 96 | **99** | Misma corrección: `## Links`, `## Books`, `## Blog Articles` y `## Research Papers` reescritas como entradas `[title](url)` (llms-txt 90 → 100) |
| `kaoriq.com` | 93 | **96** | Añadimos un schema `Person` como `@type` independiente en la home (antes estaba anidado en `Organization.founder`, y el score lo cuenta solo una vez) — jsonld 82 → 94 |
| `mypcrig.com` | 90 | **93** | Misma corrección: `Person` elevado a un bloque `@type` propio — jsonld 82 → 94 |
| `propel-lab.co.jp` | 96 | 96 | `<meta name="description">` ya se había extendido de 47 a 129 caracteres en la ola del v1.5.1 |

Los deltas son exactamente lo que la regla de scoring publicada predice: `llms-txt` tiene peso 20 × el salto de 10 puntos (90 → 100) = +2 al total (redondeado a +3 por el redondeo per-check), y el bump de cuenta de `@type` en `jsonld` (+12 por `@type` reconocido, peso 20%) aterriza como ~+2,4 sobre el total. Ese tipo de previsibilidad explícita es exactamente lo que un score transparente estilo Lighthouse gana como subproducto — y es la propiedad que vamos a buscar, en la dirección inversa, cuando lleguen los datos del panel de baseline externa.

Las correcciones fueron pequeñas en líneas (cada una llevó menos de una hora, incluyendo build y verificación de deploy), que es la lección más honesta: el score no señaló nada misterioso ni difícil de arreglar. Señaló cuatro cosas mecánicas que aún no habíamos limpiado, y una vez medidas, eran lo bastante pequeñas como para enviarlas todas en una sola ola de follow-up.

Lo que esto **no** demostró: que cualquiera de estos deltas se correlacione con el comportamiento de citación por IA downstream. Eso sigue siendo el trabajo del Experiment Log #3. Este update solo confirma que el score es internamente consistente — las correcciones producen los deltas que el spec predice. El panel externo y el piloto de correlación con citación siguen siendo el camino real de validación.
