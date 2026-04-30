---
title: "LLMO-Schnellstart: In 30 Minuten umsetzen"
description: "Fügen Sie die drei wichtigsten LLMO-Dateien in unter 30 Minuten zu Ihrer Website hinzu: llms.txt, robots.txt für KI-Crawler und JSON-LD strukturierte Daten."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "LLMO Quickstart: Implement in 30 Minutes",
        "description": "Add the three essential LLMO files to your site in under 30 minutes.",
        "totalTime": "PT30M",
        "step": [
          {"@type": "HowToStep", "name": "Add robots.txt for AI crawlers", "position": 1},
          {"@type": "HowToStep", "name": "Create llms.txt", "position": 2},
          {"@type": "HowToStep", "name": "Add JSON-LD structured data", "position": 3}
        ],
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"}
      }
---

Sie können Ihre Website in 30 Minuten KI-auffindbar machen — mit drei Dateien. Diese Anleitung beschreibt die minimale LLMO-Implementierung.

## Die drei wichtigsten Dateien

| Datei | Zweck | Zeitaufwand |
|-------|-------|-------------|
| `robots.txt` | KI-Crawlern den Zugriff auf Ihre Website erlauben | 5 Min |
| `llms.txt` | KI eine strukturierte Zusammenfassung Ihrer Website bereitstellen | 15 Min |
| JSON-LD `<script>` | KI strukturierte Daten über Ihre Inhalte liefern | 10 Min |

## Schritt 1: robots.txt für KI-Crawler (5 Min)

Die meisten Websites haben bereits eine `robots.txt`. Fügen Sie explizite `Allow`-Regeln für KI-Crawler hinzu:

```txt
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

**Warum explizites Allow?** Einige Hosting-Plattformen und CDNs blockieren KI-Crawler standardmäßig. Explizite Regeln verhindern versehentliches Blockieren.

### Bekannte KI-Crawler

| Crawler | Betreiber | Zweck |
|---------|-----------|-------|
| GPTBot | OpenAI | ChatGPT, Web-Browsing |
| ClaudeBot | Anthropic | Claude Websuche |
| Google-Extended | Google | Gemini, AI Overviews |
| PerplexityBot | Perplexity | Perplexity-Suche |
| Amazonbot | Amazon | Alexa, Produktsuche |
| CCBot | Common Crawl | Sammlung von Trainingsdaten |

## Schritt 2: llms.txt erstellen (15 Min)

Die Datei `llms.txt` (vorgeschlagen von Jeremy Howard auf [llmstxt.org](https://llmstxt.org)) bietet KI-Systemen eine strukturierte Zusammenfassung Ihrer Website.

Platzieren Sie diese Datei im Stammverzeichnis Ihrer Website: `https://yoursite.com/llms.txt`

### Vorlage

```markdown
# Name Ihrer Website

> Ein-Satz-Beschreibung dessen, was Ihre Website bietet.

## Was wir tun

Ein kurzer Absatz, der Ihr Kernangebot, Ihre Expertise oder Ihren Zweck erklärt.
Verwenden Sie einfache Sprache. Vermeiden Sie Marketing-Jargon.

## Wichtige Fakten

- Gegründet: [Jahr]
- Team: [Größe oder Schlüsselpersonen]
- Standort: [falls relevant]
- Spezialisierung: [Ihre Kernkompetenz]

## Produkte / Dienstleistungen

- **Produkt A**: Kurze Beschreibung
- **Produkt B**: Kurze Beschreibung

## Links

- Website: https://yoursite.com
- Dokumentation: https://yoursite.com/docs
- GitHub: https://github.com/yourorg
- Kontakt: https://yoursite.com/contact
```

### Best Practices

1. **Fakten statt Marketing.** "Wir entwickeln Android-Apps mit KI-Automatisierung" ist besser als "Wir nutzen wegweisende Synergien."
2. **Strukturierte Daten einbinden.** Tabellen, Listen und Schlüssel-Wert-Paare sind für KI leichter zu verarbeiten als Fließtext.
3. **Unter 2.000 Wörter bleiben.** Knappe Zusammenfassungen werden mit höherer Wahrscheinlichkeit vollständig erfasst.
4. **Regelmäßig aktualisieren.** KI-Systeme crawlen periodisch nach. Eine veraltete llms.txt führt zu veralteten KI-Antworten.

## Schritt 3: JSON-LD strukturierte Daten (10 Min)

Fügen Sie ein JSON-LD-Script in den `<head>` Ihrer Startseite ein. Dies hilft KI, Ihren Entitätstyp, Beziehungen und wichtige Attribute zu verstehen.

### Organization Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ihr Unternehmen",
  "url": "https://yoursite.com",
  "description": "Was Ihr Unternehmen in einem Satz tut.",
  "founder": {
    "@type": "Person",
    "name": "Name des Gründers"
  },
  "sameAs": [
    "https://github.com/yourorg",
    "https://linkedin.com/company/yourorg",
    "https://x.com/yourorg"
  ]
}
</script>
```

### Article Schema (für Blogbeiträge)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Ihr Artikeltitel",
  "author": {
    "@type": "Person",
    "name": "Name des Autors",
    "url": "https://authorsite.com"
  },
  "datePublished": "2026-01-15",
  "publisher": {
    "@type": "Organization",
    "name": "Ihr Unternehmen"
  }
}
</script>
```

### Welche Schema-Typen verwenden

| Inhaltstyp | Schema | Priorität |
|-----------|--------|-----------|
| Startseite | Organization oder Person | Hoch |
| Blogbeiträge | Article oder BlogPosting | Hoch |
| Produkte | Product | Hoch |
| FAQ-Seiten | FAQPage | Mittel |
| Dokumentation | TechArticle | Mittel |
| Bücher | Book | Mittel |

## Implementierung überprüfen

Prüfen Sie nach dem Deployment:

1. **robots.txt**: Rufen Sie `https://yoursite.com/robots.txt` auf und bestätigen Sie, dass KI-Crawler zugelassen sind
2. **llms.txt**: Rufen Sie `https://yoursite.com/llms.txt` auf und überprüfen Sie die Richtigkeit der Inhalte
3. **JSON-LD**: Verwenden Sie den [Rich-Results-Test von Google](https://search.google.com/test/rich-results) oder prüfen Sie den Seitenquelltext, ob das Script-Tag vorhanden ist
4. **KI-Test**: Fragen Sie ChatGPT oder Perplexity nach Ihrer Website/Ihrem Produkt und beobachten Sie die Antwort

## Wie geht es weiter?

Dieser Schnellstart deckt die Komponenten **Retrieval Signals** und **Structural Formatting** des LLMO Frameworks ab. Für das vollständige Framework:

- [Knowledge Clarity](/de/framework/knowledge-clarity/) — Inhalte schreiben, die KI verstehen kann
- [Authority Signals](/de/framework/authority-signals/) — Überprüfbare Expertise aufbauen
- [Citation Signals](/de/framework/citation-signals/) — Daten bereitstellen, die KI gerne zitiert
- [Framework-Übersicht](/de/framework/overview/) — Ihre Website anhand aller 5 Komponenten bewerten
