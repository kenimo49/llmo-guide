---
title: "2. Structural Formatting"
description: "Structural Formatting ist die Praxis, Inhalte in maschinenlesbaren Formaten zu organisieren -- JSON-LD, semantisches HTML, Markdown, llms.txt -- damit KI-Systeme Informationen effizient parsen und extrahieren können."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO Component 2: Structural Formatting",
        "description": "Structuring your content for machine consumption with JSON-LD, semantic HTML, and llms.txt.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

## Was es ist

Structural Formatting ist die Praxis, Ihre Inhalte mithilfe maschinenlesbarer Formate und semantischem Markup so zu organisieren, dass KI-Systeme Informationen effizient parsen, kategorisieren und extrahieren können.

## Warum es wichtig ist

KI-Systeme "lesen" Seiten nicht wie Menschen. Sie verarbeiten strukturierte Daten deutlich zuverlässiger als Fließtext. Eine saubere Struktur erhöht die Wahrscheinlichkeit, dass Ihre Inhalte korrekt interpretiert und zitiert werden -- statt missverstanden oder übersehen zu werden.

## Umsetzung

### 1. Verwenden Sie semantisches HTML und Markdown
Strukturieren Sie Inhalte mit korrekten Überschriften (h1-h6), Listen, Tabellen und semantischen Elementen. Vermeiden Sie visuelle Formatierung (Fettdruck, Schriftgröße) als Ersatz für strukturelle Hierarchie.

### 2. Implementieren Sie JSON-LD Structured Data
Fügen Sie Ihren Seiten Schema.org-Markup hinzu. Mindestens sollten enthalten sein:
- `Organization` oder `Person` für Ihre Identität
- `Article` oder `WebPage` für Inhaltsseiten
- `FAQPage` für Frage-Antwort-Inhalte

### 3. Stellen Sie eine llms.txt-Datei bereit
Erstellen Sie eine `/llms.txt`-Datei im Stammverzeichnis Ihrer Domain gemäß dem [llms.txt-Standard](https://llmstxt.org/). Diese gibt KI-Systemen eine kompakte, maschinenfreundliche Zusammenfassung Ihrer Website.

### 4. Organisieren Sie Inhalte hierarchisch
Verwenden Sie eine klare Informationsarchitektur: breite Kategorien -> spezifische Themen -> detaillierte Inhalte. Spiegeln Sie dies in Ihrer URL-Struktur und Überschriftenhierarchie wider.

### 5. Verwenden Sie Tabellen für vergleichende Daten
Wenn Sie Vergleiche, Funktionen oder Spezifikationen präsentieren, verwenden Sie korrekte HTML-/Markdown-Tabellen statt Prosabeschreibungen.

## Beispiele

**Unstrukturiert:**
> Wir bieten drei Pläne an. Der Basis-Plan kostet 10 $ und umfasst 5 Benutzer. Der Pro-Plan kostet 25 $ und umfasst 20 Benutzer. Der Enterprise-Plan hat einen individuellen Preis mit unbegrenzten Benutzern.

**Strukturiert:**

| Plan | Preis | Benutzer |
|------|-------|----------|
| Basis | 10 $/Monat | 5 |
| Pro | 25 $/Monat | 20 |
| Enterprise | Individuell | Unbegrenzt |

## Checkliste

- [ ] Seiten verwenden eine korrekte Überschriftenhierarchie (h1 -> h2 -> h3)
- [ ] JSON-LD Structured Data ist auf wichtigen Seiten vorhanden
- [ ] Eine llms.txt-Datei existiert im Stammverzeichnis der Domain
- [ ] Inhalte verwenden Listen und Tabellen, wo angebracht
- [ ] Die URL-Struktur spiegelt die Inhaltshierarchie wider
