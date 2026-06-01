---
title: "6. Señales de coherencia"
description: "Las Señales de coherencia garantizan que el mismo hecho cuente la misma historia en cada superficie que la IA lee: HTML, JSON-LD, Markdown, llms.txt. Las inconsistencias degradan la precisión de las citaciones y erosionan la confianza."
pubDate: 2026-05-08
---

## Qué son

> **Frontera con el Formato estructurado**: el *Formato estructurado* pregunta «¿está cada superficie bien formada por separado?» — JSON-LD válido, HTML semántico, esquema delimitado por página. Las *Señales de coherencia* preguntan «¿concuerdan las superficies entre sí?» — la misma dirección en HTML y Markdown, los mismos números en `llms.txt` y en el perfil de la página de inicio, ninguna pareja de entidades `Organization` con campos en conflicto. Una página puede pasar el Formato estructurado y aun así fallar en coherencia: cada bloque es válido, pero juntos cuentan dos historias.

Las Señales de coherencia miden si tu contenido cuenta **la misma historia en cada superficie que un agente de IA puede leer**. Un sitio moderno optimizado para LLMO expone hechos a través de muchos canales:

- Cuerpo de la página HTML (visible para humanos y rastreadores de IA)
- Datos estructurados JSON-LD
- llms.txt y llms-full.txt
- Endpoints /ai/*.md y URL.md (por ejemplo, `/company.md`)
- Metaetiquetas OG/Twitter
- Sitemap, robots.txt, declaraciones hreflang

Cuando el mismo hecho (un número, una dirección, un catálogo de servicios, una fecha de publicación) aparece de forma distinta en dos de estas superficies, un sistema de IA que se nutre de ambas se confunde. El modelo puede elegir el valor al que da más peso, mostrar una cifra desactualizada o negarse a citar porque el conflicto le señala baja calidad.

La coherencia es la disciplina LLMO de garantizar una **única fuente de verdad** en cada superficie.

## Por qué importan

La precisión de las citaciones depende de la **evidencia convergente**. Cuando un modelo recupera tu contenido por varias rutas y los valores concuerdan, la confianza sube y la citación llega al usuario. Cuando los valores difieren, aparecen varios modos de falla:

- **Menor tasa de citación**: el modelo cede ante una fuente cuya evidencia interna es consistente.
- **Hecho incorrecto citado**: si la IA toma la variante más antigua de `/ai/founder.md`, el número actualizado de tu página de inicio nunca llega al usuario.
- **Amplificación de alucinaciones**: cuando las superficies entran en conflicto, el modelo tiende a interpolar una respuesta «de compromiso» que no coincide con ninguna.
- **Erosión de la autoridad**: los reordenadores de IA más avanzados (Perplexity, AI Overviews) comparan las referencias cruzadas; las autorreferencias contradictorias se leen como baja calidad.

Una autoauditoría de 2024 en [Propel-Lab](https://propel-lab.co.jp/) encontró que el mismo perfil de autor afirmaba a la vez **4 libros / 39,000+ PV en Qiita** (en `/ai/founder.md`, `llms-full.txt`) y **14 libros / 80,000+ PV en Qiita** (en el componente de perfil de la página de inicio): una contradicción activa que se había servido a los rastreadores de IA durante meses.

## Cómo implementarlo

### 1. Designa una sola fuente para cada hecho

Para cada afirmación numérica o factual, nombra **un** archivo como fuente canónica. Cualquier otra superficie lo importa o lo cita.

| Hecho | Fuente canónica | Consumidores |
|-------|-----------------|--------------|
| Número de libros, estadísticas de PV | `src/data/profile.ts` | Componente de perfil, `/ai/founder.md`, `llms-full.txt`, JSON-LD |
| Catálogo de servicios | `src/data/services.ts` | `/products/`, JSON-LD `Service[]`, `/ai/services.md`, `llms.txt` |
| Dirección, fecha de fundación | `src/data/company.ts` | Pie de página, `/company.md`, JSON-LD `Organization`, `llms-full.txt` |
| Ítems de FAQ | `src/lib/faq-schema.ts` | Componente de FAQ, JSON-LD `FAQPage`, `/faq.md` |

El patrón es: colección de contenido o módulo de datos tipado → las plantillas y los endpoints estáticos tiran ambos de él.

### 2. Genera las superficies de IA desde la misma fuente que el HTML

No escribas a mano `llms.txt` ni `/ai/*.md` si su contenido ya existe en datos tipados:

```typescript
// src/pages/products.md.ts
import { services } from '../data/services';

export const GET: APIRoute = async () => {
  const markdown = services
    .map((s) => `## ${s.name}\n\n${s.summary}\n\n— Público: ${s.target}`)
    .join('\n\n---\n\n');
  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
```

La vista HTML, el JSON-LD `Service[]` y `/products.md` se originan todos en `services`. La desincronización se vuelve estructuralmente imposible.

### 3. Trata la canonicalización de URL como un asunto de coherencia

`https://www.example.com/` y `https://example.com/` son dos cadenas para un rastreador que compara cadenas. Elige un host canónico y luego hazlo cumplir:

- `<link rel="canonical">` en cada página
- `og:url`, JSON-LD `url`, entradas del sitemap: el mismo host
- Referencias en `/ai/*.md`, `llms.txt`: el mismo host
- Enlaces internos: relativos o canónicos-absolutos, nunca el host alterno

Un error común es olvidar los archivos `/ai/*.md` al migrar de `www.` al dominio raíz (o viceversa). El resto del sitio queda canonicalizado y las superficies Markdown filtran en silencio el host equivocado a la IA.

### 4. Trata la política de barra final como un asunto de coherencia

Si tu host normaliza `/blog/post` → `/blog/post/` con un 301, cada enlace interno ya debería incluir la barra. Las formas mezcladas producen:

- Presupuesto de rastreo desperdiciado en redirecciones
- Señales canónicas en conflicto durante la ventana de redirección
- hreflang roto (algunos declarados con barra, otros sin ella)

Fija una política a nivel del framework (Astro `trailingSlash: 'always'` o `'never'`) y haz grep en tu repositorio para asegurarte de que no quede ninguna infracción.

### 5. Detecta la desincronización con verificaciones entre archivos

Agrega un paso de CI que haga grep de la misma afirmación numérica o de cadena en varias superficies y verifique la igualdad:

```bash
# Falla si alguna fuente conserva el número de libros antiguo
! grep -rn "4 books\|4冊\|Kindle著者: 4" public/ src/data/ src/content/
```

Aún más sencillo: un validador de JSON-LD que analice tanto el `<script>` en línea como cualquier archivo `.jsonld` independiente y verifique que coinciden en los valores `@id` compartidos.

### 6. El proceso de publicación es una superficie de coherencia

En el sentido LLMO, un número de versión es un hecho: una afirmación sobre tu sitio que una IA puede citar. Si `package.json` dice `1.2.0`, `src/data/version.ts` dice `1.1.0`, la página de changelog dice `v1.2.0` en inglés pero `v1.1.0` en japonés y la última etiqueta de git es `v1.1.0`, el sitio se contradice a sí mismo en cinco superficies sobre el mismo hecho.

Esto no es teórico. El framework que estás leyendo lanzó exactamente esa desincronización en la v1.2.0; el [caso de estudio de autoauditoría](/es/case-studies/llmo-framework-self-audit/) registra lo que pasó.

El patrón que lo evita:

1. **Genera tantas superficies de versión como sea posible desde una sola fuente**. Un script de bump que actualice `package.json` + un módulo de datos tipado + el changelog en Markdown a la vez es infraestructura obligatoria para cualquier framework que declare la coherencia como un valor.
2. **Haz visible la versión en tiempo de ejecución, no solo en los metadatos**. Un pie de página que muestre `v{VERSION}` leyendo desde el módulo de datos tipado convierte la desincronización de tiempo de compilación en retroalimentación inmediata de cara al usuario. Quien mantenga el sitio y ejecute `npm run build` verá la discrepancia en cada página.
3. **Condiciona la publicación a verificaciones cruzadas**. Un paso de CI que lea la versión de `package.json` y haga grep de ella en `CHANGELOG.md`, `src/data/version.ts` y la página de changelog debería salir con código distinto de cero si alguno discrepa.
4. **Pasa una revisión de IA de solo lectura antes de etiquetar**. El costo son unos centavos en tokens de API; el beneficio es atrapar la ironía antes de que la vean los usuarios.

El proceso de publicación es la superficie de contenido del framework hablándole a la IA en tiempo real. Trátalo como tal.

### 7. Evita entidades JSON-LD duplicadas para el mismo `@id`

La falla silenciosa más común: el layout emite `Organization` con una dirección y un fragmento por página emite otra `Organization` con una dirección distinta. Ambas llegan al HTML. El rastreador analiza ambas. La puntuación de confianza de la página baja.

Solución: asigna a cada entidad un `@id` a nivel del framework (`https://example.com/#org`, `#founder`, `#website`) y referénciala por `@id` en todos los demás lugares. Cualquier duplicado se vuelve obvio en la revisión de código.

## Ejemplos

**❌ Desincronización entre superficies:**

```markdown
# /ai/founder.md
- Publishing: Kindle author of 4 books
- Technical Writing: 39,000+ PV on Qiita
```

```astro
<!-- src/components/Profile.astro (renderizado en la página de inicio) -->
<p>Kindle 14冊・Qiita 80,000+ PV。</p>
```

```jsonld
// JSON-LD en /
{ "@type": "Person", "name": "Ken Imoto" /* sin números actuales */ }
```

Tres superficies, tres historias distintas. Una IA que cite `/ai/founder.md` reporta números desactualizados; una IA que cite el HTML reporta los números actuales; el JSON-LD no ayuda a resolver el conflicto.

**✅ Fuente única:**

```typescript
// src/data/profile.ts — canónica
export const profile = {
  highlights: [
    'Kindle author: 14 books',
    'Qiita: 80,000+ PV',
  ],
};
```

```astro
<!-- Componente de perfil -->
{profile.highlights.map(h => <li>{h}</li>)}
```

```typescript
// src/pages/founder.md.ts
return new Response(
  `# Founder\n\n${profile.highlights.map(h => `- ${h}`).join('\n')}`,
  { headers: { 'Content-Type': 'text/markdown' } }
);
```

Un valor vive en un solo lugar. La vista HTML, el endpoint Markdown para IA y el JSON-LD evolucionan juntos.

## Lista de verificación

- [ ] Cada afirmación factual (números, direcciones, fechas, catálogos) tiene exactamente un archivo de fuente canónica
- [ ] Las superficies solo para IA (`llms.txt`, `/ai/*.md`, endpoints URL.md) se generan a partir de los mismos datos que el HTML, no se mantienen a mano en paralelo
- [ ] El host canónico es consistente en `<link rel="canonical">`, `og:url`, JSON-LD, sitemap y superficies Markdown
- [ ] La política de barra final se fija a nivel del framework y se refleja en cada enlace interno
- [ ] No hay dos bloques JSON-LD que describan la misma entidad con valores distintos; las entidades usan un `@id` estable para las referencias entre páginas
- [ ] La CI verifica la desincronización entre archivos en las métricas clave (número de libros, estadísticas de PV, listas de servicios)
- [ ] Una auditoría periódica en dos pasos (autorrevisión → revisión de IA de segunda opinión) atrapa la desincronización entre publicaciones — ver [Auditoría LLMO: revisión en dos pasos](/es/guide/llmo-audit-two-pass-review/)
