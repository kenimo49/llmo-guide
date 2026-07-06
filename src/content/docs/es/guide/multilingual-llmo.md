---
title: LLMO multilingüe
description: "Traducir el contenido es necesario pero no suficiente para la visibilidad en IA en otros idiomas. Los motores de IA a menudo citan la versión en inglés a lectores no angloparlantes. Qué hacen realmente hreflang, los canonicals y llms.txt por idioma — y la asimetría que convierte a los idiomas no anglosajones en la inversión de mayor ROI."
pubDate: 2026-07-07
---

**Traducir tu contenido es necesario y no suficiente.** En 2026 existe una brecha real y medible entre "publiqué una versión en portugués" y "la búsqueda con IA cita mi versión en portugués." Esta guía cubre los dos problemas multilingües que el LLMO debe resolver: lograr que los motores de IA citen la versión en el *idioma correcto*, y decidir *qué* idiomas compensan la inversión.

## El problema de la citación en el idioma equivocado

Un motor de búsqueda clásico decide *qué documento* servir y lo sirve. `hreflang` es una señal de ranking para la que ha sido entrenado durante dos décadas, y Google es genuinamente bueno eligiendo la URL del idioma correcto.

Un motor respaldado por LLM hace algo diferente: recupera un puñado de documentos, genera una respuesta en el idioma del usuario y adjunta las URLs que la capa de recuperación trajo a la superficie. El paso de generación es fluidamente multilingüe. El paso de recuperación es donde vive la selección de idioma, y con frecuencia tiene un sesgo hacia el inglés.

El resultado observable, de una prueba cruzada de la misma consulta multilingüe (Glenn Gabe, GSQI) y el rastreo de citaciones propio de un sitio en cuatro idiomas:

- **Los motores respaldados por Google** (AI Overviews, AI Mode, Gemini, Copilot) heredan décadas de manejo de `hreflang` y en su mayoría citan la URL localizada correcta.
- **Perplexity**, configurado para preferir el francés, devolvió la página en inglés de todos modos.
- **ChatGPT** escribió su respuesta en francés y luego enlazó la versión en inglés de la página. La respuesta habla el idioma del lector; la citación no.

Por qué la capa de recuperación tiene sesgo hacia el inglés:

- La versión en inglés típicamente tiene más enlaces entrantes y mayor historial de rastreo, por lo que rankea más alto en el índice de recuperación independientemente del idioma del lector.
- Muchos crawlers de IA no parsean completamente los clusters de `hreflang` como lo hace Googlebot.
- La calidad de la traducción es una señal de confianza. Si una página traducida parece salida de una máquina, la capa de recuperación la trata como un duplicado de baja confianza y recurre al original en inglés.

El fallo no es "la IA no puede hablar portugués." Es "la capa de recuperación de la IA no confía suficientemente en tu página en portugués como para citarla."

## Qué mueve realmente la aguja, por orden

Desde un experimento de campo de una sola variable en un sitio de cuatro idiomas ([informe de campo](https://kenimoto.dev/blog/ai-cites-wrong-language-version-multilingual-llmo/)) (en inglés):

1. **`hreflang` + `x-default` — hizo más.** Cada versión de idioma debe declarar el cluster completo con un `x-default` sensato. Esta es la señal que los motores respaldados por Google leen de forma fiable, y esos motores son una gran parte de la búsqueda con IA. Si haces una sola cosa, hazla bien.
2. **Canonical con autorreferencia por idioma — silenciosamente crítico.** Cada versión de idioma debe tener un canonical que apunte a *sí misma*, no al original en inglés. Una página traducida cuyo canonical apunta de vuelta al inglés le dice a cada crawler "la página real es la inglesa". Es una herida autoinfligida.
3. **`llms.txt` por idioma — pequeño, barato, posiblemente vale la pena.** Curada por idioma para que cada archivo apunte a las URLs localizadas correctas. Ningún motor importante ha confirmado darle peso a esto aún, pero cuesta quince minutos por idioma, no tiene ningún inconveniente y documenta qué URL es canónica por idioma.
4. **Intentar configurar el motor — no hizo nada.** No existe ningún ajuste que haga que ChatGPT cite tu URL localizada. No puedes salir de un sesgo de recuperación mediante configuración; solo puedes alimentar la capa de recuperación con señales más limpias y esperar.

Incluso con todas las señales limpias, espera una brecha residual: parte del fallo vive dentro de capas de recuperación que no controlas. Puedes reducir la brecha, no cerrarla.

## Asimetría de idiomas: la oportunidad estratégica

La misma inmadurez que causa citaciones en el idioma equivocado crea una oportunidad. La competencia en búsqueda con IA es dramáticamente desigual entre idiomas, y los fundamentos de LLMO se acumulan más rápido en idiomas donde aún son escasos.

Una medición de GA4 de 22 días en un blog que publicó el mismo contenido en cuatro idiomas ([informe de campo](https://kenimoto.dev/blog/four-languages-thirty-days-portuguese-four-x-traffic/)) (en inglés):

| Idioma | Páginas vistas | Artículos | Notas |
|---|---|---|---|
| Portugués | 748 | 17 | ~3,8 veces el inglés con menos artículos |
| Inglés | 195 | 26 | Mercado saturado, pequeña cuota de voz |
| Japonés | 27 | 25 | Los lectores viven en plataformas (Qiita/Zenn), no en blogs |
| Español | 7 | 10 | Competencia escasa pero sin puerta a la comunidad |

**La asimetría de idiomas puede absorber completamente la asimetría en el número de artículos.** Tres asimetrías se acumularon para producir el resultado en portugués:

1. **Puerta a la comunidad** — una plataforma abierta por idioma donde un autor desconocido puede ser leído el mismo día (Brasil tiene TabNews; el inglés no tiene equivalente con un umbral comparable).
2. **Campos de búsqueda con IA más delgados** — en portugués, muchos menos candidatos compiten por los mismos prompts. La primera respuesta razonable en un idioma desatendido gana; la primera respuesta razonable en inglés queda enterrada.
3. **Fundamentos de pionero** — un `/pt/llms.txt` es ligeramente diferenciador donde la mayoría de sitios en ese idioma no publican nada; en inglés el mismo archivo es mera higiene.

El modelo de distribución también difiere por idioma: el resultado en japonés muestra un idioma donde el blog debe servir como el archivo canónico que los crawlers de IA indexan, mientras que las publicaciones en plataformas (Zenn/Qiita) hacen el trabajo de tráfico humano. El mismo contenido, roles opuestos.

## Orden de implementación

1. **Identifica la puerta a la comunidad de cada idioma objetivo antes de traducir.** No el tamaño de la audiencia, sino la puerta. Si no hay una plataforma de publicación abierta, espera el resultado del español anterior.
2. **Publica `/{lang}/llms.txt` desde el primer día.** Quince minutos por idioma; la diferenciación más barata disponible en idiomas desatendidos.
3. **Configura analytics con filtros de prefijo de idioma antes de publicar**, o reharás la medición en el segundo mes en lugar de escribir.
4. **Traduce primero el 20% de artículos más importantes** — los que tienen más probabilidad de llegar a la puerta de la comunidad. Valida la distribución antes de traducir el archivo.
5. **Rastrea la cuota de voz en búsqueda con IA por idioma como KPIs separados.** Ejecuta los mismos prompts relevantes para la marca en ChatGPT, Perplexity y Claude en cada idioma, mensualmente ([Midiendo el LLMO](/es/guide/measuring-llmo/) cubre las métricas). Las asimetrías son grandes e invisibles hasta que se miden.
6. **Edita manualmente las traducciones automáticas para registro y localización.** La calidad de la traducción es una señal de confianza de recuperación, no solo una cortesía para el lector.

## Cómo implementa este sitio

llmoframework.com publica en 8 locales con el inglés como fuente canónica. Las páginas sin traducción sirven el contenido en inglés como alternativa con `noindex` y exclusión del sitemap: una página sin traducir no debe competir con su propio canonical en ningún índice de recuperación. Cada locale declara un cluster completo de `hreflang` y canonicals con autorreferencia.

## Lista de verificación

- [ ] Cada versión de idioma declara el cluster completo de `hreflang` incluyendo `x-default`
- [ ] Cada versión de idioma tiene un canonical con autorreferencia (nunca apuntando al original en inglés)
- [ ] Cada directorio de idioma publica su propio `llms.txt` con URLs localizadas
- [ ] Las páginas de respaldo sin traducir tienen `noindex` y están excluidas del sitemap
- [ ] Las traducciones se editan manualmente para registro y localización, no son salida cruda de máquina
- [ ] La puerta a la comunidad de cada idioma objetivo se identifica antes de comenzar la traducción
- [ ] La cuota de voz en búsqueda con IA se mide por idioma, en el idioma, mensualmente
- [ ] El esfuerzo de publicación se pondera hacia idiomas desatendidos, no hacia el recuento total de hablantes
