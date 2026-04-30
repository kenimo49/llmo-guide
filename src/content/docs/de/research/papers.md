---
title: "Publikationen & Referenzen"
description: "Akademische Forschung und Branchenberichte zu LLMO und KI-Suchoptimierung. Enthält GEO (KDD 2024), den llms.txt-Vorschlag und verwandte Studien."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO Research Papers & References",
        "description": "Academic research and industry reports related to LLMO and AI search optimization.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

## Kernpublikationen

### GEO: Generative Engine Optimization
- **Autoren**: Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande
- **Institutionen**: Princeton University, IIT Delhi, Adobe Research
- **Konferenz**: KDD 2024 (ACM SIGKDD)
- **Link**: [arXiv:2311.09735](https://arxiv.org/abs/2311.09735)
- **Zusammenfassung**: Erstes akademisches Framework zur Optimierung der Content-Sichtbarkeit in generativen Suchmaschinen. 9 Optimierungsstrategien wurden an 10.000 Suchanfragen getestet. Zentrales Ergebnis: Das Hinzufügen von Statistiken verbesserte die Sichtbarkeit um +115,1 %.
- **[Ausführliche Zusammenfassung →](/de/research/geo-paper-summary/)**

### llms.txt-Vorschlag
- **Autor**: Jeremy Howard
- **Link**: [llmstxt.org](https://llmstxt.org/)
- **Zusammenfassung**: Ein Vorschlag für eine standardisierte Datei, die LLMs Informationen über eine Website bereitstellt. Vergleichbar mit robots.txt, aber für KI-Nutzung statt Crawler-Steuerung konzipiert.

## Branchenberichte & Richtlinien

### Microsoft: Optimizing Content for AI-Powered Search Answers
- **Herausgeber**: Microsoft (Bing Webmaster Blog)
- **Datum**: Oktober 2025
- **Zusammenfassung**: Offizielle Richtlinien mit 3 Prinzipien für KI-Content-Optimierung: Struktur, Autorität und Aktualität.
- **[Ausführliche Zusammenfassung →](/de/research/microsoft-guidelines/)**

### Ahrefs: Web Mentions vs. Backlinks für KI-Sichtbarkeit
- **Herausgeber**: Ahrefs
- **Datensatz**: 75.000 Marken
- **Zusammenfassung**: Web Mentions (Marke + Keyword) sind 3-fach prädiktiver für KI-Sichtbarkeit als traditionelle Backlinks.

### Gartner: The Future of Search
- **Herausgeber**: Gartner
- **Datum**: Februar 2024
- **Zusammenfassung**: Prognose, dass die Nutzung traditioneller Suchmaschinen bis 2026 um 25 % sinken wird, da Nutzer auf KI-gestützte Alternativen umsteigen.

### Go Fish Digital: Conversion-Raten bei KI-Suche
- **Herausgeber**: Go Fish Digital
- **Zusammenfassung**: Traffic aus KI-gestützter Suche konvertiert 25-fach besser als traditioneller Such-Traffic — dank vorvalidierter Nutzerabsicht.

## Weiterführende Forschung

### Schema.org Structured Data
- **URL**: [schema.org](https://schema.org/)
- **Relevanz**: Der Vokabularstandard für die JSON-LD-Implementierung strukturierter Daten in LLMO-Komponente 2 (Structural Formatting).

### Google Structured Data Documentation
- **URL**: [developers.google.com/search/docs/appearance/structured-data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- **Relevanz**: Implementierungsrichtlinien für strukturierte Daten, die sowohl von Suchmaschinen als auch von KI-Systemen erkannt werden.

## Mitwirken

Kennen Sie eine relevante Publikation oder einen Bericht? [Erstellen Sie ein Issue](https://github.com/kenimo49/llmo-guide/issues) oder reichen Sie einen Pull Request ein, um die Liste zu ergänzen.
