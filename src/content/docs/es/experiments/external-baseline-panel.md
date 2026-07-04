---
title: "Public Experiment Log #2: Panel de línea base externa"
description: "Medimos 39 sitios técnicos de alto tráfico con llmo-checker@0.1.0 para calibrar cómo se ve lo 'normal'. La mediana es 61. Tres de los portales de documentación más grandes sacan menos de 40."
pubDate: 2026-05-24
---

El primer Public Experiment Log midió seis sitios que poseemos. Los seis aterrizaron en 90+. Fue honesto al admitir que estaba demasiado limpio como para servir de prueba de nada. Este es el calibrado que ese primer log no podía dar: un panel de 39 sitios técnicos de alto tráfico que no nos pertenecen, medidos con la misma herramienta, el mismo día.

El hallazgo de titular es a la vez mundano e incómodo. La parte mundana: la mediana es 61, con desviación estándar de 19,5 — una distribución de aspecto normal centrada bastante por debajo de "bueno". La parte incómoda: tres de los portales de documentación más visitados de la web moderna — `rust-lang.org`, `tailwindcss.com`, `djangoproject.com` — sacan menos de 40.

## Metodología

Se seleccionó un panel de 40 URLs que cubre tres categorías: documentación para desarrolladores (20), sitios de marketing de producto (12) y blogs de ingeniería (6). Otras dos (`docs.anthropic.com`, `platform.openai.com/docs/`) se incluyeron como par aparte de sanity-check de "docs de proveedores de IA". La selección se hizo antes de la corrida de medición; no se agregaron ni quitaron URLs en función del score.

Las 40 URLs se midieron con `llmo-checker@0.1.0` en una sola corrida batch con un segundo de delay entre requests. Una URL (`platform.openai.com/docs/`) devolvió un error de parseo y quedó descartada, dejando **n = 39**.

Se usó el mismo User-Agent (`llmo-checker/0.1.0`) en cada request, idéntico al que mandaría un crawler de IA leyendo nuestras recomendaciones. Ningún sitio fue reintentado; vale la primera medición.

## Resultados

| Estadístico | Valor |
|---|---|
| n | 39 |
| Media | 58,8 |
| Mediana | 61 |
| Desv. estándar | 19,5 |
| Q1 / Q3 | 45 / 69 |
| Mín / Máx | 23 / 94 |

### Distribución de score (cubetas de 10 puntos)

```
 20-29  ███         3
 30-39  ████        4
 40-49  █████████   9
 50-59  ██          2
 60-69  ████████████ 12
 70-79  █           1
 80-89  █████       5
 90-99  ███         3
```

La distribución es aproximadamente bimodal: un cúmulo alrededor de 40–49 (sitios de tier inicial-medio con débil legibilidad por máquina) y otro más grande alrededor de 60–69 (sitios de tier medio con la mayoría de cosas resueltas pero sin `jsonld` y/o sin `llms.txt`).

### Top 5

| # | Sitio | Score |
|---|---|---|
| 1 | `supabase.com` | 94 |
| 2 | `redis.io` | 93 |
| 2 | `www.cloudflare.com` | 93 |
| 4 | `stripe.com` | 89 |
| 5 | `docs.docker.com` | 84 |

### Bottom 5

| # | Sitio | Score |
|---|---|---|
| 39 | `www.rust-lang.org` | 23 |
| 38 | `tailwindcss.com` | 25 |
| 37 | `www.djangoproject.com` | 26 |
| 36 | `www.postgresql.org` | 32 |
| 35 | `golang.org` | 37 |

### Por categoría

| Categoría | n | Mediana | Media | Rango |
|---|---|---|---|---|
| Marketing de producto | 12 | 68,5 | 74,8 | 58–94 |
| Blog de devs | 6 | 65,0 | 65,3 | 44–80 |
| Documentación | 20 | 45,5 | 48,0 | 23–93 |

### Medianas por check

| Check | Mediana | Media | Rango |
|---|---|---|---|
| `llms-txt` | 90 | 54,9 | 0–100 |
| `robots-ai` | 80 | 78,7 | 60–100 |
| `canonical` | 90 | 67,9 | 0–100 |
| `jsonld` | **0** | 26,1 | 0–94 |
| `meta` | 80 | 78,5 | 0–100 |

## Lo que nos sorprendió

**Los sitios de documentación son la categoría más débil.** Esta es la predicción que habríamos errado si nos hubieran preguntado de antemano. La suposición por defecto — incluyendo la nuestra, antes de tener los datos — era que los portales de docs serían la *mejor* categoría, porque siempre han sido una fuente curada y autoritativa tanto para humanos como para buscadores. Los datos dicen lo contrario: la mediana de documentación (45,5) está más de 20 puntos por debajo de la mediana de marketing de producto (68,5). Los portales de documentación son queridos, maduros y bien construidos para humanos, pero los mismos equipos no han invertido, en promedio, en la superficie legible por máquina.

**El piso de schema.org es muy bajo.** La mediana de `jsonld` en el panel es **0**. Más de la mitad de estos sitios técnicos conocidos no emite ningún `@type` JSON-LD reconocible. La media sube a 26 arrastrada por unos pocos sitios bien instrumentados (sobre todo marketing de producto). Un `jsonld` en 0 no significa que el sitio esté roto — significa que no hay superficie de grafo de entidades sobre la cual un crawler de IA pueda apoyar una citación.

**`llms.txt` es bimodal, no gradual.** La mediana es 90, pero la media es 54,9. O un sitio invirtió en un `/llms.txt` que cumple la spec (90 y 100 limpios) o no tiene el archivo (0). Muy pocos sitios quedan en el medio. Esto quiere decir que el costo de pasar de 0 a 90+ en `llms-txt` es un solo commit de archivo, no una migración multi-etapa.

**Los tres scores más bajos son nombres conocidos.** `rust-lang.org` (23), `tailwindcss.com` (25) y `djangoproject.com` (26) son las URLs con score más bajo de todo el panel. También están entre las URLs más visitadas por desarrolladores en la web según cualquier estimación razonable de tráfico. El score no mide tráfico, reconocimiento de marca ni calidad de contenido. Mide si un crawler de IA puede anclar una citación en los metadatos de la página — y en ese único eje, estas tres están al fondo.

**La familia `Cloudflare` saca 93 / 64 / 44 en tres URLs.** `www.cloudflare.com` (93) es la página top de producto; `www.cloudflare.com/blog/` (64) es el índice del blog; `blog.cloudflare.com` (44) es el frontend del subdominio del blog. La misma organización de ingeniería, tres superficies distintas, 50 puntos de spread. Las organizaciones multi-sitio suelen ser así de desparejas, y nuestro propio portafolio lo confirma (el Experiment Log v1.5.1 ya documentó nuestro propio spread de 90–99 vs 96 vs 94).

## Dónde quedan los sitios que poseemos

El primer Experiment Log midió seis sitios propios entre 93 y 99. Aislado, ese resultado se veía incómodamente alto. Ahora tiene contexto:

| Sitio | Score | Percentil del panel (aprox.) |
|---|---|---|
| `llmoframework.com` | 99 | > 99 |
| `kenimoto.dev` | 99 | > 99 |
| `kaoriq.com` | 96 | > 95 |
| `propel-lab.co.jp` | 96 | > 95 |
| `mypcrig.com` | 93 | > 90 (empatado con `supabase.com` y `redis.io`) |
| `legacydram.com` | — | (no re-medido en esta corrida) |

Eso ubica nuestros sitios propios en la cima absoluta de un panel de 39 sitios técnicos de alto tráfico. No creemos que esto signifique que nuestro contenido sea mejor que el de `rust-lang.org` o el de `stripe.com`. Significa que hemos estado midiendo y arreglando los mismos cinco checks mecánicos que el score apunta — que es exactamente lo que una herramienta hecha por uno mismo debería hacer fácil.

Este es el calibrado que le faltaba al primer log. El cúmulo de 90+ en el que estamos no es lo normal. Es el cúmulo de sitios que decidieron optimizar específicamente para la superficie legible por máquina, y en este panel esa decisión separa a un grupo pequeño en la cima de una cola larga en la banda 40–69.

## Lo que esto todavía no demuestra

El score es internamente consistente (la actualización del Experiment Log #1 confirmó que los arreglos producen los deltas que el spec predice). El score ahora también tiene un panel externo contra el cual compararse. Pero ninguno de esos dos hechos equivale a demostrar que un score más alto cause una tasa más alta de citaciones por IA.

Ese sigue siendo el trabajo del Experiment Log #3 (piloto de correlación con citación). Para 50 URLs que cubran el rango completo de score — incluyendo algunas del bottom 5 del panel y algunas del top 5 — vamos a comparar el LLMO Score contra la tasa real de citación por IA (Perplexity API + ChatGPT search + Claude web tool). Si el score es real, el bottom 5 de este panel debería ser citado notablemente menos seguido que el top 5, para queries donde cualquiera de los dos grupos sería una fuente creíble.

La versión honesta de esta actualización es: el score ya pasó dos de las tres pruebas que una herramienta de medición tiene que pasar. Es internamente consistente (actualización v1.5.2) y produce una distribución no plana contra un panel externo creíble (este log). La tercera prueba — ¿predice el outcome que dice predecir? — es la que decide si el proyecto vale la pena continuarlo.

## Limitaciones

El panel es chico (n = 39) y en inglés. No hay ningún sitio en japonés, chino, alemán ni francés en la corrida — una decisión deliberada para mantener este primer panel acotado, pero una limitación real para calibrado cross-language.

El split por categoría es desparejo: 20 docs, 12 marketing de producto, 6 blogs de devs. Esto hace que las medianas por categoría sean direccionales, no estadísticamente apretadas (especialmente blogs de devs con n = 6).

La selección la hicimos nosotros, antes de la corrida de medición. Tratamos de favorecer URLs técnicas conocidas y de alto tráfico para minimizar la objeción de "elegieron sitios débiles a propósito", pero no se puede descartar el sesgo de selección. La lista cruda de URLs está commiteada junto con este post (`experiments/external-baseline-2026-05/urls.txt`) para que el panel se pueda reproducir o ampliar.

`platform.openai.com/docs/` quedó descartada porque el checker no devolvió JSON parseable. Eso es un punto de sesgo de supervivencia; la comparación de docs de proveedores de IA habría sido más interesante con dos puntos que con uno (`docs.anthropic.com` sacó 64).

## Reproducir este experimento

```bash
git clone https://github.com/open-llmo/llmo-checker
cd llmo-checker
npm install && npm run build

# Toma la lista de URLs y el script de la corrida
cd experiments/external-baseline-2026-05
cat urls.txt          # 40 URLs
bash run-measurements.sh   # produce results/*.json
python3 analyze.py    # imprime el resumen de arriba
```

Los archivos crudos `results/*.json` están commiteados; correr contra las mismas URLs con `llmo-checker@0.1.0` debería producir scores dentro de ±1 respecto a los de este post (los sitios cambian entre corridas; una sola etiqueta `<meta>` nueva puede mover `meta` 10 puntos).

## Lo que sigue

La hoja de ruta no cambió respecto al cierre del Experiment Log #1:

- **Experiment Log #3 — Piloto de correlación con citación.** Para ~50 URLs a lo largo del rango de score, sondear Perplexity / ChatGPT / Claude con el mismo set de queries y calcular la correlación entre LLMO Score y tasa de citación. Esta es la validación real: ¿el score predice lo que dice predecir?
- **Pesos del score v0.2.** Si los datos de correlación con citación aterrizan como esperamos, los pesos por check se re-tunearán para maximizar la correlación observada. Si no, el spec se gana un post de seguimiento bastante más interesante.

La hoja de ruta completa está en [Experimental Projects](/es/experimental-projects/), y los pesos del score v0.1 están definidos en [Score v0.1 Draft Specification](/es/specifications/score-v01/).
