---
title: "Vida media de las citas de IA: Las citas son un flujo, no un stock"
description: "Las citas de IA decaen. Una medición de 90 días con protocolo fijo en ChatGPT, Claude y Perplexity encontró vidas medias de 3,2 a 9,1 semanas según el tipo de contenido y el motor — con páginas evergreen manteniendo citas aproximadamente el doble que los informes de experiencia."
pubDate: 2026-07-07
---

**Una cita de IA no es un trofeo que ganas y conservas. Es un bien perecedero.** Una página que cinco motores citan hoy puede perder la mitad de esa tasa de citación en un mes mientras su tráfico de búsqueda en Google se mantiene estable. Esta página resume las estimaciones publicadas de decaimiento, un protocolo de medición reproducible y los números de vida media de una medición de campo de 90 días.

## Las estimaciones publicadas

Las mediciones de la industria en 2026 convergen en la misma forma:

| Hallazgo | Fuente |
|---|---|
| Vida media mediana de citas de IA ≈ 4,5 semanas; ChatGPT rota más rápido, Perplexity mantiene más tiempo | Análisis de plataforma Authority Tech |
| Los dominios citados por IA rotan entre un 40–60% cada mes | Machine Relations |
| Aproximadamente la mitad de todo el contenido citado por IA tiene menos de 13 semanas; las páginas actualizadas en los últimos 30 días obtienen varias veces más citas | Análisis de frescura Authority Tech |

El mecanismo es estructural, no un juicio de calidad. El ranking orgánico de Google para una página establecida es estable: las señales se mueven lentamente y una semana tranquila no lo desplaza. Las citas de IA se extraen de un índice en vivo en el momento de responder, y ese índice tiene sesgo hacia el material fresco. Una página no empeora; el grupo con el que compite se vuelve más joven.

Investigación reciente de recuperación (TempRetriever, arXiv 2502.21024; trabajo sobre deriva del conocimiento en los límites de RAG, arXiv 2604.05096) modela la causa subyacente: la recuperación tiene sesgo hacia el contenido fresco, y ese sesgo se fortalece cuando la pregunta es sensible al tiempo.

## Por qué importa un protocolo fijo

"Vida media" solo significa algo frente a un protocolo congelado. Cambia el conjunto de prompts, la cadencia o el criterio de éxito y el número se mueve semanas; dos personas citando "4,5 semanas" pueden estar midiendo fenómenos sin relación. El protocolo reproducible, en cinco reglas:

1. **Conjunto de prompts fijo** — diez preguntas reales de usuarios por página, escritas antes del día 0 y congeladas. Reescribir un prompt a mitad del experimento rompe el banco.
2. **Tres reintentos por prompt** — sesiones separadas, sin historial. Una "cita" significa que la URL aparece como fuente con enlace en al menos una de tres ejecuciones, contada a nivel de prompt (contar a nivel de lista de fuentes sobrepondera los motores que devuelven más fuentes; una corrección que bajó los números de una medición en ~15%).
3. **Cadencia semanal fija** — el mismo día de la semana, la misma ventana. Una semana omitida es un agujero en la curva y un peor ajuste.
4. **Dos relojes** — registra la tasa de citas de IA *y* los clics de Search Console de la misma semana para la misma URL. Cuando ambas curvas se mueven juntas, ocurrió otra cosa (corte, cambio de algoritmo, enlace viral). La señal es la curva de IA moviéndose mientras la curva de búsqueda se mantiene.
5. **El decaimiento se ajusta desde el pico, no desde la semana 1.** Las tasas de citación suben durante dos a cuatro semanas mientras los motores indexan la página, luego decaen. Mezclar subida y decaimiento en un solo ajuste (el error más común en los reportes públicos) produce vidas medias más planas que la realidad.

La porción de decaimiento se ajusta a una exponencial: `citas(t) = pico × 0,5^(t / T_mitad)`, con `t` en semanas desde el pico.

## Las vidas medias medidas

Una ejecución de 90 días (13 semanas) de este protocolo en tres páginas de un sitio técnico, en ChatGPT (búsqueda web activada), Claude (modo web predeterminado) y Perplexity (Sonar Pro):

| Tipo de página | ChatGPT | Claude | Perplexity |
|---|---|---|---|
| How-to evergreen | 6,8 sem | 7,4 sem | 9,1 sem |
| Informe de experiencia | 3,2 sem | 3,6 sem | 4,4 sem |
| Publicación de metodología | 5,1 sem | 5,9 sem | 6,7 sem |

Tres hallazgos, en orden de sorpresa:

1. **El tipo de contenido domina.** La página evergreen mantuvo citas aproximadamente 2 veces más que el informe de experiencia en todos los motores. Los motores ponderan la frescura, pero también ponderan si la página sigue respondiendo la pregunta: un how-to sigue respondiendo durante meses; un informe de experiencia deja de responder rápido. Promediar entre tipos de página reproduce el titular publicado de "≈4,5 semanas" mientras oculta la diferencia de 2 veces que realmente importa.
2. **Perplexity decae más lentamente en las tres páginas** (su orientación de ranking publicada sitúa la frescura en ~15% del peso); **ChatGPT lo hace más rápido en cada fila**, consistente con los informes de rotación plataforma por plataforma.
3. **Las actualizaciones restauran las citas de forma parcial y desigual.** Una actualización *sustantiva* (nueva sección, nueva tabla de datos) del informe de experiencia recuperó ChatGPT al ~70% del pico en dos semanas, Claude al ~60%, Perplexity al ~75% en la semana 12, nunca de vuelta al pico. Un simple cambio de fecha en una ejecución anterior de nueve semanas no produjo nada medible. El primer lanzamiento importa más que cualquier actualización.

Datos completos y protocolo: [el informe de metodología de 90 días](https://kenimoto.dev/blog/measuring-ai-citation-half-life-90-day-methodology/) (en inglés) y [el registro de decaimiento de las primeras nueve semanas](https://kenimoto.dev/blog/ai-citations-half-life-decay/) (en inglés).

## Consecuencias operativas

- **Clasifica cada página como evergreen o efímera antes de publicar.** Las páginas evergreen reciben actualizaciones sustantivas en la cadencia que la vida media implica (aproximadamente cada 6–8 semanas). Las páginas efímeras no se actualizan: ninguna edición hace relevante un informe de experiencia obsoleto; se archivan y se reemplazan.
- **Reporta las métricas de citas como tasas en el tiempo, nunca como instantáneas.** "Citado por cinco motores" es verdad un lunes y mentira al mes siguiente. La línea de tendencia en un conjunto fijo de prompts es la métrica honesta; ver [Midiendo el LLMO](/es/guide/measuring-llmo/) para el ciclo semanal en el que encaja.
- **Ser citado es un problema de lanzamiento; mantenerse citado es un problema de retención.** Las [Señales de citación](/es/framework/citation-signals/) gobiernan si entras al grupo de citaciones. La [Autoridad](/es/framework/authority-signals/) y la [Coherencia](/es/framework/coherence-signals/) (más la cadencia de actualización) gobiernan si te mantienes en él.

## Límites de la medición

Un sitio, tres páginas, un evento de actualización: la respuesta asimétrica por motor ante la actualización podría ser una diferencia en el peso de frescura o ruido. Las publicaciones de metodología se autocanibalizan (los motores pueden responder nuevas preguntas con la publicación de medición más antigua). Y una ventana de 13 semanas no puede mostrar si las vidas medias se acortan aún más a medida que los índices de los motores crecen. Trata los valores de vida media como la salida de un protocolo defendible, no como constantes.
