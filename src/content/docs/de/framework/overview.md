---
title: "Das LLMO-Framework: Ein Standard für KI-Auffindbarkeit"
description: "Das LLMO-Framework definiert 6 Kernkomponenten für die KI-Auffindbarkeit: Wissensklarheit, Strukturierte Formatierung, Abrufsignale, Autoritätssignale, Zitiersignale und Kohärenzsignale. Maximale Punktzahl: 18 Punkte."
pubDate: 2026-05-08
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        "@id": "https://llmoframework.com/de/framework/overview/#components",
        "name": "LLMO Framework Components",
        "description": "Six core components of the LLMO Framework, scored 0-3 each, for a maximum site score of 18 points.",
        "hasDefinedTerm": [
          {
            "@type": "DefinedTerm",
            "name": "Knowledge Clarity",
            "description": "Clear, factual, unambiguous content that AI can understand and summarize accurately. Measured by plain language use, defined terms, structured facts, and absence of unexplained jargon.",
            "inDefinedTermSet": "https://llmoframework.com/de/framework/overview/#components",
            "url": "https://llmoframework.com/de/framework/knowledge-clarity/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Structural Formatting",
            "description": "Machine-readable structure including semantic HTML, Markdown, page-scoped JSON-LD, and the llms.txt standard, with build-time verification that JSON-LD actually emits in served HTML.",
            "inDefinedTermSet": "https://llmoframework.com/de/framework/overview/#components",
            "url": "https://llmoframework.com/de/framework/structural-formatting/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Retrieval Signals",
            "description": "Signals that help AI systems find content: crawlability via robots.txt and sitemap.xml, machine-readable endpoints under /ai/, and adoption of the llms.txt standard.",
            "inDefinedTermSet": "https://llmoframework.com/de/framework/overview/#components",
            "url": "https://llmoframework.com/de/framework/retrieval-signals/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Authority Signals",
            "description": "Signals that demonstrate expertise and trustworthiness: verifiable author attribution, cross-platform identity (sameAs links), and evidence-based claims with citations.",
            "inDefinedTermSet": "https://llmoframework.com/de/framework/overview/#components",
            "url": "https://llmoframework.com/de/framework/authority-signals/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Citation Signals",
            "description": "References that AI systems can verify: primary sources, publication and modification dates, version information, and links to academic papers or official documentation.",
            "inDefinedTermSet": "https://llmoframework.com/de/framework/overview/#components",
            "url": "https://llmoframework.com/de/framework/citation-signals/"
          },
          {
            "@type": "DefinedTerm",
            "name": "Coherence Signals",
            "description": "Same fact tells the same story across every surface an AI reads: HTML, JSON-LD, Markdown, llms.txt. Single source of truth for numeric and factual claims, with CI gates against cross-file drift.",
            "inDefinedTermSet": "https://llmoframework.com/de/framework/overview/#components",
            "url": "https://llmoframework.com/de/framework/coherence-signals/"
          }
        ]
      }
---

Das LLMO-Framework definiert sechs Kernkomponenten, die bestimmen, ob KI-Systeme Ihre Inhalte finden, verstehen und korrekt zitieren können.

Möchten Sie zuerst das Konzept verstehen, lesen Sie [Was ist LLMO?](/de/guide/what-is-llmo/); wollen Sie sofort loslegen, folgen Sie dem [30-Minuten-Quickstart](/de/guide/quickstart/).

## Die sechs Komponenten

### 1. Wissensklarheit
Ist Ihr Inhalt klar genug, damit KI ihn richtig verstehen und zusammenfassen kann?

- Verwenden Sie klare, eindeutige Sprache
- Definieren Sie Schlüsselbegriffe explizit
- Liefern Sie strukturierte Fakten (wer, was, wann, wo)
- Vermeiden Sie Fachjargon ohne Erklärung

### 2. Strukturierte Formatierung
Ist Ihr Inhalt für die maschinelle Verarbeitung strukturiert?

- Verwenden Sie semantisches HTML und Markdown
- Implementieren Sie JSON-LD Structured Data
- Stellen Sie eine llms.txt für KI-spezifische Inhalte bereit
- Organisieren Sie Inhalte hierarchisch

### 3. Abrufsignale
Können KI-Systeme Ihre Inhalte finden, wenn sie diese benötigen?

- Stellen Sie Crawlbarkeit sicher (robots.txt, sitemap.xml)
- Bieten Sie maschinenlesbare Endpunkte an (/ai/, .md-Dateien)
- Implementieren Sie den llms.txt-Standard
- Machen Sie Inhalte nach Möglichkeit über APIs verfügbar

### 4. Autoritätssignale
Demonstriert Ihr Inhalt Fachkompetenz und Vertrauenswürdigkeit?

- Autorenangabe mit überprüfbaren Referenzen
- Plattformübergreifende Präsenz (GitHub, LinkedIn, Publikationen)
- Konsistente Informationen über alle Plattformen hinweg
- Evidenzbasierte Aussagen mit Quellenangaben

### 5. Zitiersignale
Enthält Ihr Inhalt Referenzen, die KI verifizieren kann?

- Verlinken Sie auf Primärquellen
- Geben Sie Veröffentlichungsdaten an
- Liefern Sie Versionsinformationen
- Verweisen Sie auf wissenschaftliche Arbeiten und offizielle Dokumentation

### 6. Kohärenzsignale
Erzählt dieselbe Tatsache auf jeder von KI gelesenen Oberfläche dieselbe Geschichte?

- Single Source of Truth für jede numerische oder faktische Aussage
- KI-exklusive Oberflächen (`llms.txt`, `/ai/*.md`) werden aus denselben Daten wie das HTML erzeugt
- Kanonischer Host und Trailing-Slash-Policy werden überall durchgesetzt
- Keine doppelten JSON-LD-Entitäten für dieselbe `@id`

## Bewertung

Jede Komponente wird auf einer Skala von 0-3 bewertet:

| Punktzahl | Stufe | Beschreibung |
|-----------|-------|--------------|
| 0 | Keine | Komponente nicht berücksichtigt |
| 1 | Basis | Minimale Umsetzung |
| 2 | Gut | Solide Umsetzung mit Verbesserungspotenzial |
| 3 | Exzellent | Best-Practice-Umsetzung |

**Maximale Punktzahl: 18 Punkte** (6 Komponenten x 3 Punkte)

## Selbstbewertungs-Checkliste

Bewerte deine Site anhand jeder Komponente. Was du sicher abhaken kannst, zählt 1 Punkt; ziele auf 3 Häkchen pro Komponente für die Höchstpunktzahl.

### 1. Wissensklarheit (max. 3)
- [ ] Jede Seite beginnt mit einem Ein-Satz-Antwort auf ihre Hauptfrage (Answer-first)
- [ ] Domänenspezifische Begriffe werden bei der ersten Verwendung definiert (kein unerklärter Jargon)
- [ ] Jeder Absatz enthält eine einzige Idee (keine Mehrfach-Aussage-Absätze)

### 2. Strukturierte Formatierung (max. 3)
- [ ] Seiten verwenden semantische H1 → H2 → H3-Hierarchie ohne Übersprünge
- [ ] Jede sinnvolle Seite gibt JSON-LD aus (Article / TechArticle / FAQPage / Product / Organization usw.)
- [ ] Vergleichsinhalte verwenden Tabellen, keine Prosa-Listen

### 3. Abrufsignale (max. 3)
- [ ] `/llms.txt` existiert im Site-Root und listet wichtige Seiten
- [ ] `/ai/`-Verzeichnis liefert sauberes Markdown für jedes Hauptthema (bei mehrsprachiger Site auch pro Sprache)
- [ ] `robots.txt` erlaubt GPTBot, ClaudeBot, PerplexityBot, Google-Extended explizit; `sitemap.xml` ist erreichbar

### 4. Autoritätssignale (max. 3)
- [ ] Autor hat eine überprüfbare Bio mit `sameAs`-Links zu LinkedIn / GitHub / X / Publikationsprofilen
- [ ] Dieselbe Identität (Name, Rolle, Themenfokus) erscheint konsistent auf mindestens 3 Plattformen
- [ ] Site verlinkt zu Originalforschung, Büchern oder Papers, die der Autor tatsächlich veröffentlicht hat

### 5. Zitiersignale (max. 3)
- [ ] Jede Aussage mit einer Zahl zitiert eine Quelle mit Name und Jahr
- [ ] Jede Seite zeigt sowohl `datePublished` als auch `dateModified` (in JSON-LD oder sichtbarem Meta)
- [ ] Vergleichsinhalte referenzieren Industriestandards (W3C, RFC, ISO, schema.org) mit Name und Link

### 6. Kohärenzsignale (max. 3)
- [ ] Jede numerische / faktische Aussage hat eine einzige kanonische Quelldatei, die überall sonst referenziert wird
- [ ] KI-Oberflächen (`llms.txt`, `/ai/*.md`, URL.md-Endpunkte) werden aus denselben Daten wie das HTML erzeugt
- [ ] CI prüft dateiübergreifende Drift bei wichtigen Kennzahlen; keine doppelte JSON-LD-Entität für dieselbe `@id`

### Bewertungsleitfaden

| Gesamt | Band |
|--------|------|
| 16–18 | Produktionsreif — wird aktiv von KI-Systemen zitiert |
| 11–15 | Gut — sichtbar für KI, aber inkonsistent |
| 6–10  | Teilweise — erhebliche Lücken bei Abruf, Autorität oder Kohärenz |
| 0–5   | Unsichtbar — beginne mit `/llms.txt`, robots.txt und JSON-LD |

> Höhere Punktzahl gewünscht? Jede Komponentenseite (Wissensklarheit, Strukturierte Formatierung, Abrufsignale, Autoritätssignale, Zitiersignale, Kohärenzsignale) listet die spezifischen Implementierungen auf, die den Score von 1 → 2 → 3 bewegen.
