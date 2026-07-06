---
title: "Midiendo el LLMO: Tasa de citación, densidad de menciones y conversión de tráfico por IA"
description: "La medición del LLMO es la práctica de rastrear si los sistemas de IA citan tu contenido y cuánto vale esa citación. Tres métricas principales — Tasa de citación, Densidad de menciones de marca y Conversión de tráfico por IA — reemplazan los KPIs de posición en rankings que la búsqueda con IA volvió obsoletos."
pubDate: 2026-07-07
---

La medición del LLMO es la práctica de rastrear si los sistemas de IA citan tu contenido, con qué profundidad lo citan y cuánto valen esas citaciones para tu negocio. Reemplaza los KPIs de posición en rankings del SEO clásico, que no tienen equivalente en la búsqueda con IA: no existe la posición 1 al 100, solo citado o no citado.

## La brecha de medición

La medición del SEO es un problema resuelto: Google Search Console reporta rankings, impresiones, clics y CTR de forma gratuita y diaria. El LLMO no tiene equivalente. A partir de 2026, ninguna plataforma de IA (OpenAI, Anthropic, Google o Perplexity) ofrece una API oficial que reporte con qué frecuencia se cita tu sitio.

Dos consecuencias:

1. **El tráfico referido en GA4 es la punta del iceberg.** Cuando una IA te cita y el usuario hace clic en el enlace, GA4 registra una referencia. Cuando una IA te cita y nadie hace clic (que es la mayoría de las veces), nada se registra en ningún lugar que puedas ver. Una citación que nunca recibe clics sigue posicionándote como fuente dentro de la respuesta, y eso se acumula.
2. **Los rastreadores de terceros no coinciden.** Una comparación controlada conectó el mismo sitio a siete rastreadores de citas de IA durante 15 días y obtuvo siete números distintos, de 38 a 312, una diferencia de 8,2 veces ([informe completo](https://kenimoto.dev/blog/seven-ai-citation-trackers-seven-different-numbers)) (en inglés). La divergencia es un problema de definición, no un fallo del proveedor: las herramientas difieren en qué cuenta como citación (fuente enlazada vs. cualquier mención de marca), qué LLMs muestrean, con qué frecuencia muestrean y en qué idiomas.

La regla práctica que se desprende: **escribe tu definición de "citación" en una oración antes de comprar o construir cualquier rastreador.** Si te importa el tráfico de atribución, cuenta solo las citaciones enlazadas. Si te importa la presencia de marca, cuenta las menciones. Los números no son comparables entre definiciones.

## Las tres métricas principales

Los indicadores macro como SOV (Share of Voice) y SOM (Share of Model) te dicen si tu presencia general en IA mejoró, pero no te dicen qué hacer a continuación. Para un ciclo de mejora, descompón en tres métricas:

| Métrica | Qué mide | Unidad | Cadencia |
|---|---|---|---|
| Tasa de citación | Con qué frecuencia la IA te menciona en un conjunto fijo de prompts | % | Semanal |
| Densidad de menciones de marca | Con qué profundidad habla la IA de ti cuando lo hace | menciones por 1k palabras | Mensual |
| Conversión de tráfico por IA | Cuánto vale una visita referida por IA | % | Mensual |

Juntas cubren frecuencia, profundidad y valor: un recuento de citaciones aislado confunde las tres.

### 1. Tasa de citación

Ejecuta un conjunto fijo de 10 a 20 prompts en las plataformas de IA que te interesan, y mide la proporción de ejecuciones donde aparece tu marca o dominio:

```
Tasa de citación = mencionado (prompt × plataforma) / total de ejecuciones × 100
```

10 prompts × 5 plataformas = 50 ejecuciones; 12 menciones = 24%.

El conjunto de prompts debe permanecer congelado. Las respuestas de los LLM no son deterministas: el mismo prompt produce respuestas distintas en días diferentes, por lo que una sola verificación es ruido. Rastrea la tendencia en un conjunto de prompts sin cambios durante al menos 4 semanas antes de sacar conclusiones.

### 2. Densidad de menciones de marca

La Tasa de citación es binaria por ejecución: mencionado o no. Pero las citaciones varían en profundidad: un "otras opciones incluyen X" de paso vale menos que un párrafo explicando tu enfoque. La Densidad de menciones mide las ocurrencias de términos de marca por cada 1.000 palabras del texto de respuesta:

```python
def mention_density(answer_text: str, brand_terms: list[str]) -> float:
    total_words = len(answer_text.split())
    mentions = sum(answer_text.lower().count(t.lower()) for t in brand_terms)
    return mentions / total_words * 1000
```

Una citación profunda suele pesar más que muchas superficiales. La densidad es cómo ves la diferencia.

### 3. Conversión de tráfico por IA

En GA4, crea un grupo de canales (Admin → Grupos de canales) con una expresión regular de origen de sesión:

```regex
chatgpt\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com
```

Luego compara la tasa de conversión de este segmento con la Búsqueda orgánica. Las mediciones de campo encuentran consistentemente que los visitantes referidos por IA convierten a un múltiplo del orgánico: datos de la industria de 2026 reportan 8–12% frente a 2–3% del orgánico, y nuestro rastreo en sitios de referencia ha oscilado entre 2–4 veces el orgánico ([configuración de medición](https://kenimoto.dev/blog/measure-ai-citations-llmo-kpi/)) (en inglés). El mecanismo: un usuario que le pregunta a una IA "qué debería usar para X" está más adelante en el proceso de decisión que alguien escribiendo palabras clave en Google. La IA hizo la investigación; el clic está más cerca de la decisión.

Punto ciego conocido: los usuarios de ChatGPT en nivel gratuito a menudo no envían referrer, por lo que sus clics aterrizan en Directo. Tus números de IA en GA4 son un piso, no un techo.

## Tres capas de implementación

Comienza en la capa que corresponde a tus recursos; cada capa agrega resolución.

### Capa 1: Grupo de canales GA4 (gratis, 5 minutos)
La expresión regular anterior. Mide solo clics (la punta del iceberg), pero es verificable y lleva cinco minutos.

### Capa 2: El protocolo manual de cinco plataformas (gratis, 30 minutos/mes)
En un día fijo cada mes, ejecuta tus 10–15 prompts congelados en ChatGPT, Perplexity, Gemini, Claude y Copilot. Registra por ejecución: mencionado (sí/no), contexto (recomendación / comparación / neutral / negativo), precisión y si se proporcionó una URL. Calcula la Tasa de citación. Manual y tedioso, y aun así el método más fiable disponible, porque ninguna herramienta automatizada juzga si una mención fue una recomendación o un rechazo.

### Capa 3: Automatiza con APIs (una tarde, ~$1–8/mes)
El protocolo manual, con scripts:

```python
BRAND_TERMS = ["tu-sitio.com", "Tu Marca"]
CHECK_QUERIES = ["Mejores herramientas para <tu categoría>", ...]  # conjunto congelado

def check(query: str, ask) -> dict:
    answer = ask(query)  # Llamada a API de OpenAI / Anthropic / Perplexity
    return {
        "query": query,
        "mentioned": any(t.lower() in answer.lower() for t in BRAND_TERMS),
        "density": mention_density(answer, BRAND_TERMS),
        "snippet": answer[:300],
    }
```

Ejecuta semanalmente vía cron, agrega a una serie temporal en JSON o CSV. Después de 8–12 semanas puedes atribuir movimientos a intervenciones específicas: "la tasa de citación subió del 12% al 28% tras agregar datos estructurados" es una oración que la Capa 3 te permite decir.

## La señal de crawler que la mayoría de sitios ignora

Los logs de acceso del servidor ya registran qué sistemas de IA visitan tu contenido: GPTBot, ClaudeBot, PerplexityBot y Google-Extended se identifican en el User-Agent:

```bash
grep -E "GPTBot|ClaudeBot|PerplexityBot|Google-Extended" access.log \
  | awk '{print $7}' | sort | uniq -c | sort -rn
```

Las páginas que nunca son rastreadas no pueden citarse desde el índice en vivo. La frecuencia de rastreo es un indicador indirecto pero adelantado: te dice qué contenido los sistemas de IA están omitiendo antes de que los datos de citación puedan hacerlo.

## El ciclo de mejora

Medir sin actuar es acumular datos. Un ritmo sostenible:

- **Semanal (10 min):** revisa el canal de IA en GA4 y el delta de Tasa de citación; marca los prompts que produjeron citaciones inusualmente profundas.
- **Mensual (30 min):** revisa la tendencia de Densidad de menciones y la Conversión de tráfico por IA frente al orgánico; lista los prompts que siguen en cero citaciones.
- **Trimestral (1 hora):** revisión completa: actualiza el conjunto de consultas y comprueba si los cambios de contenido produjeron un movimiento medible.

Prioriza los prompts con cero citaciones. Llevar un prompt del 0% al 10% es casi siempre más barato que llevar uno del 30% al 40%, porque el cero suele tener una causa estructural: ninguna página apunta a esa pregunta, o la que lo hace viola la [Claridad del conocimiento](/es/framework/knowledge-clarity/) o las [Señales de recuperación](/es/framework/retrieval-signals/).

## Relación con LLMO Score

Las métricas de esta página miden *resultados*: si la IA realmente te cita. El [LLMOFramework Score](/es/specifications/score-v01/) mide *sustrato*: si las superficies legibles por máquina de tu sitio están instaladas. Las verificaciones de sustrato son instantáneas y deterministas; las métricas de resultado son lentas y ruidosas. Ejecuta ambas: el sustrato para encontrar qué corregir, los resultados para confirmar que las correcciones importaron.

## Lista de verificación

- [ ] "Citación" está definida en una oración antes de adoptar cualquier herramienta
- [ ] Un conjunto de 10–20 consultas está escrito y congelado
- [ ] GA4 tiene un grupo de canal de Búsqueda por IA con la expresión regular de referidos
- [ ] La Tasa de citación se rastrea con una cadencia fija (semanal o mensual)
- [ ] La Densidad de menciones distingue las citaciones profundas de las superficiales
- [ ] La Conversión de tráfico por IA se compara con el orgánico, no se ve de forma aislada
- [ ] Los logs del crawler se revisan para detectar páginas que los sistemas de IA nunca visitan
- [ ] Los prompts con cero citaciones impulsan el backlog de contenido
