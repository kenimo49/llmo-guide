---
title: "GEO Paper: Was die Wissenschaft sagt"
description: "Zusammenfassung des GEO-Papers (Generative Engine Optimization) von Princeton/IIT Delhi, veröffentlicht auf der KDD 2024. Zentrale Ergebnisse zu Zitationsraten, Content-Strategien und statistischen Verbesserungen."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "GEO Paper: What the Science Says",
        "description": "Summary of the GEO paper (KDD 2024) with key findings on AI citation optimization.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"},
        "citation": {
          "@type": "ScholarlyArticle",
          "name": "GEO: Generative Engine Optimization",
          "author": "Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande",
          "datePublished": "2024",
          "url": "https://arxiv.org/abs/2311.09735"
        }
      }
---

Das **GEO (Generative Engine Optimization)**-Paper ist das erste akademische Framework zur Optimierung der Content-Sichtbarkeit in KI-gestützten Suchmaschinen. Veröffentlicht auf der KDD 2024 (ACM SIGKDD), liefert es empirische Belege für Content-Optimierungsstrategien, auf denen das LLMO Framework aufbaut.

## Paper-Details

| Feld | Wert |
|------|------|
| Titel | GEO: Generative Engine Optimization |
| Autoren | Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande |
| Institution | Princeton University, IIT Delhi, Adobe Research |
| Konferenz | KDD 2024 (ACM SIGKDD) |
| arXiv | [2311.09735](https://arxiv.org/abs/2311.09735) |
| Veröffentlicht | 2024 |

## Forschungsaufbau

Die Forscher erstellten **GEO-Bench**, einen Benchmark mit 10.000 Suchanfragen aus verschiedenen Domänen. Sie testeten 9 Content-Optimierungsstrategien an einer generativen Suchmaschine, um zu messen, welche Ansätze die Quellensichtbarkeit verbesserten.

### Die 9 getesteten Strategien

1. Cite Sources
2. Quotation Addition
3. Statistics Addition
4. Fluency Optimization
5. Unique Words
6. Technical Terms
7. Authoritative Tone
8. Easy-to-Understand Language
9. Keyword Stuffing

## Zentrale Ergebnisse

### Wirksamkeit der Strategien

| Strategie | Sichtbarkeitsverbesserung | LLMO-Komponente |
|-----------|--------------------------|-----------------|
| **Statistics Addition** | **+115,1 %** | Citation Signals |
| **Cite Sources** | **+77,0 %** | Citation Signals |
| **Quotation Addition** | **+72,2 %** | Authority Signals |
| Authoritative Tone | +21,5 % | Knowledge Clarity |
| Fluency Optimization | +15,2 % | Knowledge Clarity |
| Technical Terms | +5,8 % | Knowledge Clarity |
| Easy-to-Understand | +2,4 % | Knowledge Clarity |
| Unique Words | -3,1 % | — |
| Keyword Stuffing | -10,2 % | — |

### Die drei wirksamsten Strategien

Die drei effektivsten Strategien haben eine Gemeinsamkeit: Sie liefern **überprüfbare, externe Belege**.

1. **Statistics Addition (+115,1 %)**: Das Hinzufügen konkreter Zahlen und Datenpunkte machte Inhalte mehr als doppelt so sichtbar. Beispiel: „Der Umsatz stieg um 34 % im Jahresvergleich" vs. „Der Umsatz stieg deutlich."

2. **Cite Sources (+77,0 %)**: Die Referenzierung spezifischer Papers, Berichte oder Dokumentationen erhöhte die Sichtbarkeit um 77 %. KI-Systeme bevorzugen Inhalte, die sie gegenprüfen können.

3. **Quotation Addition (+72,2 %)**: Die Einbindung direkter Zitate von Experten oder autoritativen Quellen erzeugte eine Glaubwürdigkeit, die KI-Systeme erkannten und zitierten.

### Was nicht funktioniert

- **Keyword Stuffing (-10,2 %)**: Traditionelle SEO-Taktiken schaden der KI-Sichtbarkeit aktiv. KI-Systeme können künstliche Keyword-Häufungen erkennen und abstrafen.
- **Unique Words (-3,1 %)**: Die Verwendung ungewöhnlicher Begriffe verbesserte die Sichtbarkeit nicht. Klarheit schlägt Raffinesse.

## Implikationen für LLMO

### 1. Citation Signals sind die wirkungsvollste Komponente

Die GEO-Daten zeigen, dass Citation Signals (Statistiken, Quellen, Zitate) die größten Sichtbarkeitsverbesserungen erzielen. Deshalb setzt das LLMO Framework Citation Signals als Komponente 5 ein — den Schlussstein, der die Wirkung aller anderen Komponenten multipliziert.

### 2. Inhaltsklarheit ist wichtig, aber weniger als Belege

Strategien im Bereich Knowledge Clarity (autoritativer Ton, Flüssigkeit, verständliche Sprache) zeigten allesamt positive, aber moderate Verbesserungen (2–22 %). Gutes Schreiben ist notwendig, aber nicht ausreichend. Der Multiplikator entsteht durch das Hinzufügen überprüfbarer Fakten.

### 3. SEO-Taktiken sind für KI kontraproduktiv

Keyword Stuffing, der Grundpfeiler früher SEO, hat die KI-Sichtbarkeit aktiv reduziert. Das bestätigt, dass LLMO einen grundlegend anderen Ansatz als traditionelle SEO erfordert.

## Domänenspezifische Unterschiede

Das GEO-Paper stellte fest, dass die Wirksamkeit der Strategien je nach Domäne variiert:

- **Faktische/wissenschaftliche Anfragen**: Statistics Addition war am wirksamsten
- **Meinungsbasierte/subjektive Anfragen**: Quotation Addition erzielte die besten Ergebnisse
- **Technische Anfragen**: Cite Sources hatte den größten Effekt

Das deutet darauf hin, dass die LLMO-Implementierung an die jeweilige Content-Domäne angepasst werden sollte. Eine Forschungsseite profitiert am meisten von Statistiken, während ein Thought-Leadership-Blog stärker von Expertenzitaten profitiert.

## Wie LLMO auf GEO aufbaut

Das LLMO Framework erweitert GEO in drei Bereichen:

1. **Breiterer Anwendungsbereich**: GEO konzentriert sich auf generative Suchmaschinen. LLMO deckt alle LLM-Interaktionen ab, einschließlich direkter Abfragen, RAG und KI-Agenten.
2. **Implementierungsfokus**: GEO identifiziert, *was* funktioniert. LLMO zeigt, *wie man es umsetzt* — mit konkreten Dateiformaten (llms.txt), strukturierten Daten (JSON-LD) und Content-Design-Patterns.
3. **Retrieval-Ebene**: GEO geht davon aus, dass Inhalte bereits abgerufen wurden. LLMO fügt die Komponente Retrieval Signals hinzu, um sicherzustellen, dass Inhalte überhaupt erst auffindbar sind.

## Weiterführende Lektüre

- [Vollständiges Paper auf arXiv](https://arxiv.org/abs/2311.09735)
- [LLMO Framework im Überblick](/de/framework/overview/)
- [Citation Signals](/de/framework/citation-signals/) — Umsetzung der wirksamsten GEO-Strategie
