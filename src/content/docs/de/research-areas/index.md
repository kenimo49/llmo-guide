---
title: "Forschungsbereiche — 5 Domänen"
description: "Fünf Forschungsbereiche der Open LLMO Research Initiative: AI Citation Analysis, Grounding Visibility, LLM Retrieval Optimization, AI-native Documentation und Agent-oriented Information Architecture."
pubDate: 2026-05-24
---

Die Open LLMO Research Initiative gliedert ihre Arbeit in fünf Forschungsbereiche. Jeder Bereich läuft unabhängig, fließt aber letztlich in den Metrik-Satz des [LLMOFramework Score](/de/experimental-projects/) ein.

## Überblick

| Bereich | Kernfrage |
|---------|-----------|
| [1. AI Citation Analysis](#1-ai-citation-analysis) | Welche Inhalte zitieren LLMs, und unter welchen Bedingungen? |
| [2. Grounding Visibility](#2-grounding-visibility) | Wie machen wir KI-Grounding-Quellen sichtbar? |
| [3. LLM Retrieval Optimization](#3-llm-retrieval-optimization) | Wie sollten Dokumente für die LLM-Retrieval-Schicht optimiert werden? |
| [4. AI-native Documentation](#4-ai-native-documentation) | Welche Dokumentformate verarbeiten LLMs am besten? |
| [5. Agent-oriented Information Architecture](#5-agent-oriented-information-architecture) | Welche Informationsstrukturen sind für KI-Agenten am leichtesten zu navigieren? |

---

## 1. AI Citation Analysis

### Umfang

Analyse, welche Inhalte LLMs (ChatGPT, Claude, Gemini, Perplexity) zu einem bestimmten Thema zitieren. Beobachtungen umfassen Zitationshäufigkeit, strukturelle Merkmale zitierter Dokumente und den Retrieval-Pfad, der zur Zitation führte.

### Schlüsselfragen

- Wie stark überschneiden sich zitierte Domains zwischen LLMs für dasselbe Thema?
- Lassen sich die strukturellen Merkmale (Heading-Hierarchie, Tabellen, statistische Dichte, externe Link-Anzahl) zitierter Dokumente identifizieren?
- Lässt sich nachträglich eine Checkliste erstellen, damit Inhalte mit höherer Wahrscheinlichkeit zitiert werden?

### Aktuelle Richtung

Datensammlung für KI-Zitationsbeobachtung läuft. Plan für Phase 1: Citation Visibility als Metrik im OSS `llmo-checker` ausliefern.

---

## 2. Grounding Visibility

### Umfang

Visualisierung des Groundings für KI-Antworten. Umfasst, worauf ein LLM seine Antwort gestützt hat und ob diese Quelle bis zu einer verifizierbaren Primärreferenz zurückverfolgt werden kann.

### Schlüsselfragen

- Lässt sich eine standardisierte Reverse-Lookup-Methode von KI-Antwort zu Quelldokument definieren?
- Korreliert es mit höheren KI-Zitationsraten, wenn Grounding auf einer Website "sichtbar" gemacht wird (explizite Quellen, Datenreferenzen, Zitationsformatierung)?
- Korreliert Halluzination mit schwachem Grounding?

### Aktuelle Richtung

Bereits teilweise als Citation Signals (die fünfte Komponente des LLMO Framework) adressiert. Plan für Phase 1: als Grounding-Stability-Metrik quantifizieren.

---

## 3. LLM Retrieval Optimization

### Umfang

Dokumentseitige Optimierung für die Retrieval-Schicht von LLMs (RAG, Embedding-Retrieval, Web-Search-Plugins usw.). Umfasst Chunking-Strategie, semantische Struktur, Dokumentlänge und Heading-Design.

### Schlüsselfragen

- Wie variiert die Beziehung zwischen Chunk-Größe und Retrieval-Genauigkeit über Themen hinweg?
- Wie groß ist der Retrieval-Effizienz-Unterschied zwischen Markdown, HTML und JSON-LD?
- Wie trägt interne Link-Dichte zur Kontexterweiterung in KI-Suche bei?

### Aktuelle Richtung

llmoframework.com selbst dient als Implementierungsreferenz. Plan für Phase 1: Chunking-Vergleichsexperiment veröffentlichen.

---

## 4. AI-native Documentation

### Umfang

Forschung zu Dokumentformaten, die LLMs gut lesen und schreiben. Umfasst llms.txt, Markdown-Konventionen und die optimale Form KI-gerichteter Metadaten.

### Schlüsselfragen

- Welche LLMs und Crawler konsultieren llms.txt tatsächlich?
- Wo liegt das optimale Gleichgewicht zwischen Retrieval-Effizienz und Ausdruckskraft bei Markdown gegenüber HTML?
- Beeinflussen KI-gerichtete strukturierte Metadaten (JSON-LD usw.) Zitationsraten?

### Aktuelle Richtung

Implementierung und Wirkungsmessung von llms.txt laufen. Plan für Phase 1: das OSS-Werkzeug llms.txt-validator veröffentlichen.

---

## 5. Agent-oriented Information Architecture

### Umfang

Forschung zur Informationsarchitektur für KI-Agenten (Claude Code, Cursor, autonome Agenten usw.). Umfasst MCP-Exposure (Model Context Protocol), API-Dokumentationsdesign und Auffindbarkeit.

### Schlüsselfragen

- Haben Websites, die MCP-Server exponieren, einen Vorteil bei der KI-Suche-Sichtbarkeit?
- Sind agent-readable API-Dokumente (OpenAPI + natürliche Sprache) auffindbarer als reine API-Referenzen?
- Lassen sich Methoden zur Beobachtung des Erkundungsverhaltens autonomer Agenten etablieren?

### Aktuelle Richtung

Experimente zur Auswirkung von MCP-Exposure auf die Suche-Sichtbarkeit laufen. Plan für Phase 1: vorläufige Agent-Visibility-Metrik vorschlagen.

---

## Mapping zu Phasen

| Bereich | Geplante Lieferung für Phase 1 |
|---------|--------------------------------|
| AI Citation Analysis | Citation-Visibility-Metrik im `llmo-checker` |
| Grounding Visibility | Grounding-Stability-Metrik + Evaluationsdatensatz |
| LLM Retrieval Optimization | Chunking-Vergleichs-Experimentbericht |
| AI-native Documentation | OSS llms.txt-validator |
| Agent-oriented IA | Vorläufige Agent-Visibility-Metrik |

Fortschritt zu jedem Bereich wird im [Changelog](/de/changelog/) und in den [GitHub Issues](https://github.com/kenimo49/llmo-guide/issues) veröffentlicht.
