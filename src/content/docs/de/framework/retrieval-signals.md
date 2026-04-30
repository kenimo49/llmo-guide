---
title: "3. Retrieval Signals"
description: "Retrieval Signals sind die Mechanismen, die es KI-Systemen ermöglichen, Ihre Inhalte zu finden und darauf zuzugreifen -- robots.txt, llms.txt, Sitemap, /ai/-Endpunkte und plattformübergreifende Präsenz."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO Component 3: Retrieval Signals",
        "description": "Ensuring AI systems can find your content through crawlability, llms.txt, and machine-readable endpoints.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

## Was es ist

Retrieval Signals sind die Indikatoren und Mechanismen, die es KI-Systemen ermöglichen, Ihre Inhalte zu finden und darauf zuzugreifen. Dazu gehören sowohl die klassische Crawlbarkeit als auch neuere KI-spezifische Entdeckungsmethoden.

## Warum es wichtig ist

Selbst die klarsten, beststrukturierten Inhalte sind wertlos, wenn KI-Systeme sie nicht finden können. Da LLMs zunehmend RAG (Retrieval-Augmented Generation), Web-Browsing und Tool-Nutzung einsetzen, müssen Ihre Inhalte über mehrere Kanäle auffindbar sein.

## Umsetzung

### 1. Stellen Sie die grundlegende Crawlbarkeit sicher
- Pflegen Sie eine aktuelle `robots.txt`, die KI-Crawler erlaubt
- Erstellen und übermitteln Sie eine `sitemap.xml`
- Stellen Sie sicher, dass Seiten nach Möglichkeit ohne JavaScript laden (SSG/SSR)

### 2. Implementieren Sie den llms.txt-Standard
Erstellen Sie eine `/llms.txt`-Datei, die eine kompakte Zusammenfassung Ihrer Website, der wichtigsten Seiten und der Navigation Ihrer Inhalte bereitstellt. Dies ist das KI-Äquivalent einer "Über uns"-Seite.

### 3. Bieten Sie maschinenlesbare Endpunkte an
Stellen Sie Inhalte in Formaten bereit, die KI-Systeme leicht verarbeiten können:
- Markdown-Versionen wichtiger Seiten
- API-Endpunkte für strukturierte Daten
- RSS/Atom-Feeds für Aktualisierungen

### 4. Optimieren Sie für KI-Suchmaschinen
Stellen Sie sicher, dass Ihre Inhalte in KI-gestützten Suchtools wie Perplexity, SearchGPT und Google AI Overviews erscheinen, indem Sie deren jeweilige Richtlinien befolgen.

### 5. Plattformübergreifende Querverweise
Veröffentlichen Sie konsistente Informationen auf mehreren Plattformen (Ihre Website, GitHub, LinkedIn usw.), damit KI-Systeme Ihre Inhalte aus mehreren Quellen triangulieren und verifizieren können.

## Beispiele

**Minimale Retrieval-Konfiguration:**
```
/robots.txt          — Crawler erlauben
/sitemap.xml         — Alle Seiten auflisten
/llms.txt            — KI-spezifische Zusammenfassung
/feed.xml            — RSS-Feed
```

**Erweiterte Retrieval-Konfiguration:**
```
/api/info.json       — Endpunkt für strukturierte Daten
/docs/overview.md    — Markdown-Version der Dokumentation
```

## Checkliste

- [ ] robots.txt erlaubt die wichtigsten KI-Crawler
- [ ] sitemap.xml wird generiert und ist aktuell
- [ ] llms.txt-Datei existiert mit korrekter Website-Zusammenfassung
- [ ] Wichtige Inhalte sind ohne JavaScript verfügbar
- [ ] Inhalte werden auf mehreren Plattformen für Querverweise veröffentlicht
