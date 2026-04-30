---
title: "Das LLMO-Framework: Ein Standard für KI-Auffindbarkeit"
description: "Das LLMO-Framework definiert 5 Kernkomponenten für die KI-Auffindbarkeit: Knowledge Clarity, Structural Formatting, Retrieval Signals, Authority Signals und Citation Signals. Maximale Punktzahl: 15 Punkte."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "The LLMO Framework: A Standard for AI Discoverability",
        "description": "Five core components for making your content discoverable by AI.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

Das LLMO-Framework definiert fünf Kernkomponenten, die bestimmen, ob KI-Systeme Ihre Inhalte finden, verstehen und korrekt zitieren können.

## Die fünf Komponenten

### 1. Knowledge Clarity
Ist Ihr Inhalt klar genug, damit KI ihn richtig verstehen und zusammenfassen kann?

- Verwenden Sie klare, eindeutige Sprache
- Definieren Sie Schlüsselbegriffe explizit
- Liefern Sie strukturierte Fakten (wer, was, wann, wo)
- Vermeiden Sie Fachjargon ohne Erklärung

### 2. Structural Formatting
Ist Ihr Inhalt für die maschinelle Verarbeitung strukturiert?

- Verwenden Sie semantisches HTML und Markdown
- Implementieren Sie JSON-LD Structured Data
- Stellen Sie eine llms.txt für KI-spezifische Inhalte bereit
- Organisieren Sie Inhalte hierarchisch

### 3. Retrieval Signals
Können KI-Systeme Ihre Inhalte finden, wenn sie diese benötigen?

- Stellen Sie Crawlbarkeit sicher (robots.txt, sitemap.xml)
- Bieten Sie maschinenlesbare Endpunkte an (/ai/, .md-Dateien)
- Implementieren Sie den llms.txt-Standard
- Machen Sie Inhalte nach Möglichkeit über APIs verfügbar

### 4. Authority Signals
Demonstriert Ihr Inhalt Fachkompetenz und Vertrauenswürdigkeit?

- Autorenangabe mit überprüfbaren Referenzen
- Plattformübergreifende Präsenz (GitHub, LinkedIn, Publikationen)
- Konsistente Informationen über alle Plattformen hinweg
- Evidenzbasierte Aussagen mit Quellenangaben

### 5. Citation Signals
Enthält Ihr Inhalt Referenzen, die KI verifizieren kann?

- Verlinken Sie auf Primärquellen
- Geben Sie Veröffentlichungsdaten an
- Liefern Sie Versionsinformationen
- Verweisen Sie auf wissenschaftliche Arbeiten und offizielle Dokumentation

## Bewertung

Jede Komponente wird auf einer Skala von 0-3 bewertet:

| Punktzahl | Stufe | Beschreibung |
|-----------|-------|--------------|
| 0 | Keine | Komponente nicht berücksichtigt |
| 1 | Basis | Minimale Umsetzung |
| 2 | Gut | Solide Umsetzung mit Verbesserungspotenzial |
| 3 | Exzellent | Best-Practice-Umsetzung |

**Maximale Punktzahl: 15 Punkte** (5 Komponenten x 3 Punkte)
