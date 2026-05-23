---
title: "Experimentelle Projekte"
description: "Drei experimentelle Projekte der Open LLMO Research Initiative: LLMOFramework Score, LLMOFramework Benchmark und LLMOFramework Compatible."
pubDate: 2026-05-24
---

Experimentelle Projekte, die von der Open LLMO Research Initiative veröffentlicht werden. Alle werden im Zustand **Draft / Experimental** ausgeliefert. Formaler Spezifikationsstatus wird auf Phase 3 verschoben.

## Überblick

| Projekt | Rolle | Analog | Status |
|---------|-------|--------|--------|
| [1. LLMOFramework Score](#1-llmoframework-score) | KI-Auffindbarkeit einer Website messen | Lighthouse Score | Indikatoren werden entworfen (Draft v0.1 in Phase 1) |
| [2. LLMOFramework Benchmark](#2-llmoframework-benchmark) | Website-Strukturen experimentell vergleichen | Branchenstandard-Benchmark | In Planung (Phase 1-2) |
| [3. LLMOFramework Compatible](#3-llmoframework-compatible) | Zertifizierungs-Badge für konforme Websites | "Certified"-Marke | Nur Roadmap (Phase 3) |

---

## 1. LLMOFramework Score

### Was er misst

Score pro Website, wie erkennbar, zitierbar und parseable der Inhalt für KI ist. Das Gegenstück zur SEO-Domain-Authority oder zum Lighthouse Score im KI-Zeitalter.

### Kandidatenindikatoren (v0.1 Draft)

| Indikator | Beschreibung |
|-----------|--------------|
| Citation Visibility | Ob der Inhalt von KI zitiert wird |
| Chunk Readability | Wie gut der Inhalt sich in Chunks teilt |
| Semantic Structure | Wie explizit die semantische Struktur ist |
| AI Crawlability | KI-Crawler-Kompatibilität |
| llms.txt | llms.txt-Konformität |
| Markdown Quality | Strukturelle Qualität |
| Entity Clarity | Leichtigkeit der Entity-Erkennung |
| Retrieval Stability | Retrieval-Konsistenz |

Jeder Indikator wird mit **Berechnungsformel und OSS-Checker-Code** ausgeliefert. Lighthouse hat Vertrauen gewonnen, weil es messbar und reproduzierbar war, und dieses Projekt folgt demselben Prinzip.

### Verwandtes OSS

`llmo-checker` ist für Phase 1 geplant.

```
npx llmo-checker https://example.com

LLMOFramework Score: 74

Citation Visibility: 81
Semantic Chunkability: 68
AI Readability: 77
Grounding Stability: 70
```

### Status

Indikator-Definitionen werden entworfen. Veröffentlichung von Draft v0.1 ist für Phase 1 angepeilt (Zeitpunkt offen).

---

## 2. LLMOFramework Benchmark

### Was er vergleicht

Experimenteller Vergleich, welche Website-Strukturen für KI am besten abschneiden. Da noch kein Standard-Benchmark für KI-Retrieval und Citation existiert, schlägt dieses Projekt zunächst eine Mess-Methodik vor.

### Kandidaten-Vergleichsachsen

- Markdown vs HTML
- FAQ-Schema-Präsenz
- Tabellenstruktur
- Chunk-Größe
- Citation-Format
- Internes Linking
- GitHub-Integration
- llms.txt-Konformität
- MCP-Exposure

### Veröffentlichungs-Politik

Jedes Experiment wird als **Reproducible Benchmark Report** auf GitHub und auf dieser Website ausgeliefert, einschließlich Datensatz, Mess-Skripten, Rohergebnissen und Evaluations-Prompts.

### Status

Planungsphase. Das erste Vergleichsexperiment (Markdown vs HTML, Retrieval-Effizienz) ist für Phase 1 geplant.

---

## 3. LLMOFramework Compatible

### Zweck des Badges

Zertifizierungsmarke für Websites, die der KI-optimierten Struktur entsprechen. Gedacht zur Anzeige durch SaaS, Dokumentationswebsites, OSS-Projekte und KI-Produkte.

### Visuelles Konzept

```
[ LLMOFramework Compatible ]
[ AI Retrieval Ready ]
[ Grounding Optimized ]
```

### Konformitätsanforderungen (Draft-Konzept)

| Anforderung | Inhalt |
|-------------|--------|
| llms.txt-Platzierung | Eine gültige llms.txt existiert im Site-Root |
| Semantic Structure | Hauptseiten erfüllen Heading-Hierarchie und semantisches HTML |
| Chunk Optimization | Hauptabschnitte passen in den empfohlenen Chunk-Größenbereich |
| Grounding-friendly Docs | Zitationen, Datenquellen und Aktualisierungsdaten sind explizit |

### Status

**Nur Roadmap**. Positioniert in Phase 3 (zuletzt). Die Gründe:

- Zertifizierung hängt von Ökosystem-Adoption ab, daher müssen Score und Benchmark zuerst reifen
- Eine Zertifizierung im Solo-Betrieb auszustellen liest sich als Autoritäts-Kostümierung und erodiert Vertrauen
- Das Compatible-Badge wird erst entworfen, nachdem die Open-Source-Community Third-Party-Adoption hervorgebracht hat

---

## Mapping zu Phasen

| Phase | Projektfortschritt |
|-------|---------------------|
| Phase 0 (aktuell) | Indikator-Entwurf, Veröffentlichung des Projekt-Konzepts |
| Phase 1 | Score Draft v0.1, OSS `llmo-checker`, erster Benchmark Report |
| Phase 2 | Score-Revision, kontinuierliche Benchmark-Updates, Community-Feedback-Integration |
| Phase 3 | Compatible-Zertifizierungsdesign, formale Spezifikationen, Working-Group-Formation |

Quellcode und Diskussion zu jedem Projekt sind öffentlich im [GitHub-Repository](https://github.com/kenimo49/llmo-guide) und in den [Issues](https://github.com/kenimo49/llmo-guide/issues).
