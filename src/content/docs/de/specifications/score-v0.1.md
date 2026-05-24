---
title: "LLMOFramework Score v0.1 — Draft Specification"
description: "Formale Definition des LLMOFramework Score v0.1 Draft: 5 substrate-Checks, Gewichtungen, Scoring-Regeln und JSON-Ausgabeschema. Referenzimplementierung: llmo-checker."
pubDate: 2026-05-24
---

> **Status: Draft.** Dies ist v0.1, die erste veröffentlichte Version. Gewichtungen, Checkliste und JSON-Form können in v0.2 ohne Rückwärtskompatibilität geändert werden. Eine bestimmte Checker-Version anpinnen, wenn die JSON-Form für deinen Use Case wichtig ist.

Der LLMOFramework Score ist eine einzelne Zahl (0–100), die zusammenfasst, wie KI-abrufbar eine URL ist. Der v0.1-Score misst **nur substrate-Signale** — die statischen Signale, die ein KI-Crawler bei einem einzigen HTTP-Fetch extrahieren kann, ohne JavaScript auszuführen, ohne ein LLM aufzurufen und ohne Retrieval zu simulieren.

Die Referenzimplementierung ist das OSS-CLI [`llmo-checker`](https://github.com/open-llmo/llmo-checker), gepflegt von der Open LLMO Research Initiative.

## Designprinzipien

1. **Substrate vor Behavior.** v0.1 misst Signale, die ein KI-Crawler aus einem einzigen HTTP-Fetch extrahieren kann. Verhaltensbezogene Signale (Zitation, Retrieval-Stabilität, LLM-Lesen) sind für v0.2+ vorgesehen.
2. **Reproduzierbar.** Jeder Check ist eine reine Funktion des per Fetch geholten HTML, der robots.txt und der llms.txt. Kein Netzwerk darüber hinaus, keine KI-Aufrufe, kein zeitabhängiges Verhalten.
3. **Falsifizierbares Scoring.** Jeder Check veröffentlicht seine Scoring-Regel. Wer mit einer Regel nicht einverstanden ist, kann Checker und Spec nebeneinander laufen lassen und zeigen, wo sie auseinandergehen.
4. **Ehrliche Gewichtungen.** Die v0.1-Gewichtungen sind von den Autoren gesetzte Defaults, nicht aus Outcome-Daten abgeleitet. v0.2 wird sie mithilfe des [Citation-Correlation-Pilots](/de/experiments/dogfooding-our-own-sites/) neu kalibrieren.

## Score-Zusammensetzung

Der Score ist ein gewichteter Mittelwert von 5 Checks:

| ID | Gewicht | Misst |
|---|---|---|
| `llms-txt` | 20 | Existenz und Struktur der `/llms.txt` |
| `robots-ai` | 15 | Explizite Haltung gegenüber bekannten KI-Crawlern in der `/robots.txt` |
| `canonical` | 15 | Korrektheit von `<link rel="canonical">` und `hreflang`-Alternativen |
| `jsonld` | 20 | Existenz, Parsebarkeit und erkannte schema.org-`@type`s von JSON-LD |
| `meta` | 15 | `<title>`, `<meta name="description">`, OpenGraph, `<h1>`, `<html lang>` |

Gesamtgewicht in v0.1: **85**. Scores werden über gewichteten Mittelwert auf 0–100 normalisiert.

### Score-Bänder

| Band | Score | Interpretation |
|---|---|---|
| Grün | 85–100 | Gut grounded für KI-Retrieval |
| Gelb | 65–84 | Verbesserungsbedarf — mehrere Signale fehlen oder sind schwach |
| Gelb | 40–64 | Schlecht — substantielle Substrate-Lücken |
| Rot | 0–39 | Kritisch — die Seite ist für KI-Crawler weitgehend unsichtbar |

## Spezifikationen je Check

### `llms-txt` (Gewicht 20)

**Fetch:** `GET {origin}/llms.txt`

**Scoring:**

| Bedingung | Score-Auswirkung |
|---|---|
| HTTP 404 oder 5xx | 0 |
| Body leer | 10 |
| Body nicht leer (Basis) | 60 |
| Top-Level-Zeile `# Title` vorhanden | +15 |
| Mindestens eine `## Section`-Überschrift | +10 |
| ≥ 3 Link-Einträge im Muster `^- \[` | +15 |
| 1–2 Link-Einträge | +8 |
| 0 Link-Einträge | +5 |

**Status:** `pass` ≥ 85, `warn` ≥ 60, sonst `fail`.

Referenz-Spec: [llmstxt.org](https://llmstxt.org/).

### `robots-ai` (Gewicht 15)

**Fetch:** `GET {origin}/robots.txt`

**Erkannte KI-User-Agents (v0.1):** `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`, `ClaudeBot`, `Claude-Web`, `anthropic-ai`, `CCBot`, `Google-Extended`, `PerplexityBot`, `Applebot-Extended`, `cohere-ai`.

**Scoring:**

| Bedingung | Score-Auswirkung |
|---|---|
| HTTP 404 | 60 (warn — explizite Haltung empfohlen) |
| HTTP 5xx | 0 |
| Body parsebar (Basis) | 70 |
| ≥ 3 erkannte KI-Bots explizit genannt | +20 |
| 1–2 erkannte KI-Bots genannt | +10 |
| Wildcard-Gruppe `User-agent: *` vorhanden | +10 |

**Status:** `pass` ≥ 85, `warn` ≥ 60, sonst `fail`. Score wird bei 100 gedeckelt.

Erwähnung an sich zählt, egal ob die Regel `Allow` oder `Disallow` lautet. v0.1 erfasst `disallowedBots` in der JSON-Ausgabe, bestraft Disallow aber nicht — KI-Crawler bewusst auszuschließen ist eine gültige Haltung.

### `canonical` (Gewicht 15)

**Quelle:** das per Fetch geholte HTML.

**Scoring:**

| Bedingung | Score-Auswirkung |
|---|---|
| Kein `<link rel="canonical">` | 0 (fail) |
| `href` ist keine gültige URL | 20 (fail) |
| Canonical zeigt auf einen anderen Origin | 60 (warn) |
| Canonical zeigt auf denselben Origin (Basis) | 90 (pass) |
| `<link rel="alternate" hreflang>` vorhanden | +10 |

**Status:** `pass`, wenn canonical vorhanden und same-origin, `warn` für cross-origin, sonst `fail`. Score wird bei 100 gedeckelt.

Cross-Origin-Canonical ist bei republizierten Mirrors gewollt, wird per Default aber abgewertet, weil es häufiger eine Fehlkonfiguration ist.

### `jsonld` (Gewicht 20)

**Quelle:** alle `<script type="application/ld+json">`-Blöcke im per Fetch geholten HTML.

**Erkannte schema.org-Entitätstypen (v0.1):** `Organization`, `Person`, `Article`, `BlogPosting`, `TechArticle`, `Book`, `WebSite`, `WebPage`, `BreadcrumbList`, `FAQPage`, `HowTo`, `Product`, `SoftwareApplication`.

**Scoring:**

| Bedingung | Score-Auswirkung |
|---|---|
| Keine JSON-LD-Blöcke | 0 (fail) |
| Mindestens ein parsebarer Block (Basis) | 50 |
| Pro erkanntem `@type` (Deckel bei 3) | +12 je |
| `Organization` oder `Person` vorhanden | +8 |
| Irgendein Block lässt sich nicht parsen | −20 |

Der Checker durchläuft `@graph`-Arrays rekursiv, um Typen einzusammeln.

**Status:** `pass` ≥ 85, `warn` ≥ 50, sonst `fail`. Score wird auf 0–100 begrenzt.

### `meta` (Gewicht 15)

**Quelle:** `<head>` und erster `<body>` des per Fetch geholten HTML.

**Scoring:**

| Signal | Score-Auswirkung |
|---|---|
| `<title>` mit 20–70 Zeichen | +20 |
| `<title>` vorhanden, aber außerhalb 20–70 | +10 |
| `<meta name="description">` mit 80–200 Zeichen | +20 |
| Description vorhanden, aber außerhalb 80–200 | +10 |
| OpenGraph `title` + `description` vorhanden | +20 |
| OpenGraph `type` vorhanden | +10 |
| Genau ein `<h1>` | +20 |
| Attribut `<html lang>` vorhanden | +10 |

**Status:** `pass` ≥ 85, `warn` ≥ 60, sonst `fail`. Score wird bei 100 gedeckelt.

## JSON-Ausgabeschema

Die `--json`-Ausgabe des CLI und die programmatische API liefern:

```typescript
interface CheckerReport {
  url: string;              // aufgelöste Eingabe-URL
  origin: string;           // URL.origin der Seite
  timestamp: string;        // ISO 8601
  checkerVersion: string;   // semver des CLI
  scoreVersion: "0.1";      // Version dieser Spezifikation
  score: number;            // gewichteter Mittelwert, 0-100
  checks: CheckResult[];
}

interface CheckResult {
  id: string;               // stabiler Check-Identifier (z. B. "llms-txt")
  name: string;             // menschenlesbarer Anzeigename
  status: "pass" | "warn" | "fail" | "skip";
  score: number;            // 0-100
  weight: number;           // Beitrag zum Gesamtscore
  details: Record<string, unknown>;  // checkspezifische Daten
  notes: string[];          // menschenlesbare, handlungsorientierte Notizen
}
```

**Stabilitätsgarantien für v0.1:**

- Die Top-Level-Feldnamen (`url`, `origin`, `timestamp`, `checkerVersion`, `scoreVersion`, `score`, `checks`) sind über alle 0.1.x-Releases stabil
- `id`, `weight` und die allgemeine Form von `status`/`score` pro Check sind stabil
- Die Form von `details` ist **innerhalb von 0.1.x nicht stabil** — in Patch-Releases können neue Felder hinzukommen
- Die Menge der `id`s in `checks` ist innerhalb von 0.1.x stabil (keine neuen Checks ohne v0.2-Release)

## Exit-Codes (CLI)

| Code | Bedeutung |
|---|---|
| 0 | Score ≥ 50 (Mindestlatte erfüllt) |
| 1 | Score < 50 (unter der Mindestlatte) |
| 2 | Fetch-Fehler (Netzwerk, DNS, nicht-2xx-Antwort) |

Damit lässt sich das CLI als Smoke-Check in CI verwenden: eine durchgefallene Site lässt die Pipeline durchfallen.

## Referenzimplementierung

Quelle: [`open-llmo/llmo-checker`](https://github.com/open-llmo/llmo-checker)

```bash
npx llmo-checker https://example.com
npx llmo-checker https://example.com --json
```

Erfordert Node.js 20+.

Wenn Referenzimplementierung und diese Spec divergieren, hat die Spec in der Intention recht und die Implementierung wird angepasst — bitte [ein Issue aufmachen](https://github.com/open-llmo/llmo-checker/issues).

## Was v0.1 bewusst nicht misst

Folgende LLMO-Anliegen sind legitim, aber bewusst nicht in v0.1 enthalten:

| Indikator | Grund für Verschiebung |
|---|---|
| Citation Visibility | Erfordert Abfragen an KI-Assistenten. Außerhalb des Bereichs eines rein statischen Checks. Für v0.2 als optionaler Opt-in-Check geplant. |
| Chunk Readability | Erfordert eine Chunking-Strategie. v0.2 wird einen dokumentierten Default-Chunker verwenden, damit der Check reproduzierbar bleibt. |
| Markdown Quality | Greift nur, wenn eine Markdown-Quelle veröffentlicht ist. v0.2 erkennt Endpoints im Stil `/index.md`. |
| Inhaltsqualität / Korrektheit | Außerhalb des Bereichs. Der Score misst substrate, nicht editorische Qualität. |
| Retrieval-Stabilität über die Zeit | Erfordert longitudinales Abfragen. Liegt beim Benchmark-Projekt, nicht beim Per-URL-Score. |

## Versionierungspolitik

Die Score-Version ist unabhängig von der Version der Referenzimplementierung. v0.1 des Scores kann durch `llmo-checker@0.1.x` (beliebiger Patch) implementiert werden. v0.2 des Scores wird `llmo-checker@0.2.x` erfordern.

Inkompatible Änderungen zwischen Minor-Versionen des Scores (0.1 → 0.2) sind während der Draft-Phase eingeplant. Eine 1.0-Spezifikation wird erst veröffentlicht, wenn Phase 2 (Community) abgeschlossen ist — also wenn Outcome-Daten aus dem Citation-Correlation-Pilot vorliegen, externe Implementierungen existieren und die Gewichtungen neu kalibriert wurden.

## Mitarbeit

Spec-Änderungen kommen über Issues im [llmo-guide-Repo](https://github.com/kenimo49/llmo-guide/issues) (Quelle dieser Site).

Beim Vorschlag eines neuen Checks oder einer Gewichtungsänderung:

1. Signal benennen und in einem Satz beschreiben, was es misst
2. Scoring-Regel angeben (muss sich deterministisch aus einem HTTP-Fetch berechnen lassen, außer in v0.2+)
3. Eine Begründung für die Gewichtung zitieren (Paper, öffentliches Experiment oder Lighthouse-artige Argumentation)
4. Einen Reproducer mitliefern (eine URL, die unter der vorgeschlagenen Regel hoch punktet, und eine, die niedrig punktet)

Implementierungsänderungen kommen in [`open-llmo/llmo-checker`](https://github.com/open-llmo/llmo-checker).

## Dank

Die Score-Struktur ist stark beeinflusst von [Lighthouse](https://developer.chrome.com/docs/lighthouse/) (Google) und dem [llms.txt-Vorschlag](https://llmstxt.org/) (Jeremy Howard). Beide sind gut durchdacht, meinungsstark und falsifizierbar — Eigenschaften, die wir zu erhalten versuchen.
