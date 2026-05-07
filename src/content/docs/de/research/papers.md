---
title: "Publikationen & Referenzen"
description: "Akademische Forschung und Branchenberichte zu LLMO und KI-Suchoptimierung. Enthält GEO (KDD 2024), den llms.txt-Vorschlag und verwandte Studien."
pubDate: 2026-04-30
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

## Aktualisierungen 2025–2026

Die LLMO-Landschaft hat sich seit dem ursprünglichen GEO-Paper schnell weiterentwickelt. Die folgenden Quellen werden als laufende Primärreferenzen verfolgt.

### Cloudflare Radar — AI Insights
- **Herausgeber**: Cloudflare
- **URL**: [radar.cloudflare.com/ai-insights](https://radar.cloudflare.com/ai-insights)
- **Typ**: Live-Dashboard (kontinuierlich aktualisiert)
- **Relevanz**: Öffentliche Daten zu KI-Bot-Crawl-Anteilen, führenden KI-Crawlern (GPTBot, ClaudeBot, PerplexityBot, Bytespider, Google-Extended usw.) und domainspezifischen KI-Bot- vs. Referral-Verhältnissen. Cloudflare hat 2024 KI-Bot-Blocking eingeführt und über 2025 hinweg vierteljährliche Trenddaten veröffentlicht.

### OpenAI GPTBot Documentation
- **Herausgeber**: OpenAI
- **URL**: [platform.openai.com/docs/bots](https://platform.openai.com/docs/bots)
- **Typ**: Offizielle Crawler-Offenlegung
- **Relevanz**: Kanonische Referenz für GPTBot User-Agent, IP-Bereiche, robots.txt-Anweisungen und Opt-out-Semantik. Wird kontinuierlich aktualisiert.

### Anthropic Crawler Disclosure
- **Herausgeber**: Anthropic
- **URL**: [support.anthropic.com](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- **Typ**: Offizielle Crawler-Offenlegung
- **Relevanz**: Kanonische Referenz für ClaudeBot-, Claude-Web- und Claude-User-User-Agents und wie Site-Betreiber sie steuern.

### llms.txt Adoption Tracker
- **Herausgeber**: directory.llmstxt.cloud
- **URL**: [directory.llmstxt.cloud](https://directory.llmstxt.cloud/)
- **Typ**: Community-gepflegtes Verzeichnis
- **Relevanz**: Verfolgt Sites, die den `/llms.txt`-Standard übernommen haben. Die Adoption hat sich 2025 hinweg auf Dokumentationsseiten (Anthropic, Mintlify, Stripe-artige API-Docs) ausgeweitet.

### Schema.org Releases (2025)
- **Herausgeber**: schema.org
- **URL**: [schema.org/docs/releases.html](https://schema.org/docs/releases.html)
- **Typ**: Versionierte Vokabular-Releases
- **Relevanz**: Fortlaufende Erweiterungen am Vokabular für LLMO-Komponente 2 (Strukturierte Formatierung). Verfolge neue Typen, die für die KI-Konsumption relevant sind (z. B. `LearningResource`, `EducationalOccupationalCredential`).

## Weiterführende Forschung

### Schema.org Structured Data
- **URL**: [schema.org](https://schema.org/)
- **Relevanz**: Der Vokabularstandard für die JSON-LD-Implementierung strukturierter Daten in LLMO-Komponente 2 (Strukturierte Formatierung).

### Google Structured Data Documentation
- **URL**: [developers.google.com/search/docs/appearance/structured-data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- **Relevanz**: Implementierungsrichtlinien für strukturierte Daten, die sowohl von Suchmaschinen als auch von KI-Systemen erkannt werden.

## Mitwirken

Kennen Sie eine relevante Publikation oder einen Bericht? [Erstellen Sie ein Issue](https://github.com/kenimo49/llmo-guide/issues) oder reichen Sie einen Pull Request ein, um die Liste zu ergänzen.
