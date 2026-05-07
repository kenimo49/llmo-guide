---
title: "2. Formato estructurado"
description: "El Formato estructurado es la práctica de organizar el contenido usando formatos legibles por máquinas — JSON-LD, HTML semántico, Markdown, llms.txt — para que los sistemas de IA puedan analizar y extraer información eficientemente."
---

## Qué es

El Formato estructurado es la práctica de organizar tu contenido usando formatos legibles por máquinas y marcado semántico para que los sistemas de IA puedan analizar, categorizar y extraer información eficientemente.

## Por qué importa

Los sistemas de IA no "leen" las páginas como los humanos. Procesan datos estructurados con mucha más fiabilidad que el texto libre. Una estructura adecuada significa que tu contenido tiene más probabilidad de ser interpretado y citado correctamente, en lugar de ser malentendido u omitido.

## Cómo implementarlo

### 1. Usa HTML semántico y Markdown
Estructura el contenido con títulos correctos (h1-h6), listas, tablas y elementos semánticos. Evita usar formato visual (negrita, tamaño de fuente) como sustituto de la jerarquía estructural.

### 2. Implementa datos estructurados JSON-LD
Agrega marcado Schema.org a tus páginas. Como mínimo, incluye:
- `Organization` o `Person` para tu identidad
- `Article` o `WebPage` para páginas de contenido
- `FAQPage` para contenido de preguntas y respuestas

### 3. Proporciona un archivo llms.txt
Crea un archivo `/llms.txt` en la raíz de tu dominio siguiendo el [estándar llms.txt](https://llmstxt.org/). Esto proporciona a los sistemas de IA un resumen conciso y amigable para máquinas de tu sitio.

### 4. Organiza el contenido de forma jerárquica
Usa una arquitectura de información clara: categorías amplias → temas específicos → contenido detallado. Refleja esto en la estructura de tus URLs y la jerarquía de títulos.

### 5. Usa tablas para datos comparativos
Al presentar comparaciones, características o especificaciones, usa tablas HTML/Markdown correctas en lugar de descripciones en prosa.

## Ejemplos

**❌ Sin estructura:**
> Ofrecemos tres planes. El plan básico cuesta $10 e incluye 5 usuarios. El plan pro cuesta $25 e incluye 20 usuarios. El plan enterprise tiene precio personalizado con usuarios ilimitados.

**✅ Estructurado:**

| Plan | Precio | Usuarios |
|------|--------|----------|
| Básico | $10/mes | 5 |
| Pro | $25/mes | 20 |
| Enterprise | Personalizado | Ilimitados |

## Lista de verificación

- [ ] Las páginas usan jerarquía de títulos correcta (h1 → h2 → h3)
- [ ] Los datos estructurados JSON-LD están presentes en las páginas clave
- [ ] Existe un archivo llms.txt en la raíz del dominio
- [ ] El contenido usa listas y tablas donde corresponde
- [ ] La estructura de las URLs refleja la jerarquía del contenido
