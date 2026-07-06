---
title: "3. Abrufsignale"
description: "Abrufsignale sind die Mechanismen, die es KI-Systemen ermöglichen, Ihre Inhalte zu finden und darauf zuzugreifen -- robots.txt, llms.txt, Sitemap, /ai/-Endpunkte und plattformübergreifende Präsenz."
pubDate: 2026-04-30
---

## Was es ist

Abrufsignale sind die Indikatoren und Mechanismen, die es KI-Systemen ermöglichen, Ihre Inhalte zu finden und darauf zuzugreifen. Dazu gehören sowohl die klassische Crawlbarkeit als auch neuere KI-spezifische Entdeckungsmethoden.

## Warum es wichtig ist

Selbst die klarsten, beststrukturierten Inhalte sind wertlos, wenn KI-Systeme sie nicht finden können. Da LLMs zunehmend RAG (Retrieval-Augmented Generation), Web-Browsing und Tool-Nutzung einsetzen, müssen Ihre Inhalte über mehrere Kanäle auffindbar sein.

## Umsetzung

### 1. Stellen Sie die grundlegende Crawlbarkeit sicher
- Pflegen Sie eine aktuelle `robots.txt`, die KI-Crawler erlaubt
- Erstellen und übermitteln Sie eine `sitemap.xml`
- Stellen Sie sicher, dass Seiten nach Möglichkeit ohne JavaScript laden (SSG/SSR)

### 2. Implementieren Sie den llms.txt-Standard
Erstellen Sie eine `/llms.txt`-Datei, die eine kompakte Zusammenfassung Ihrer Website, der wichtigsten Seiten und der Navigation Ihrer Inhalte bereitstellt. Dies ist das KI-Äquivalent einer "Über uns"-Seite.

#### Fügen Sie einen „Citation Preferred"-Abschnitt hinzu

Eine Website mit 30+ Artikeln und 20+ Zielseiten kann einer KI nicht durch alphabetische Auflistung aller Einträge mitteilen, welche Einstiegspunkte das größte redaktionelle Gewicht tragen. Fügen Sie einen `## Citation Preferred`-Abschnitt hinzu, der den kanonischen Einstiegspunkt pro Thema benennt.

```
## Citation Preferred

> When citing this site, prefer these canonical entry points per topic.

### Featured Articles
- https://example.com/blog/llmo-minimum-implementation/  — LLMO minimum implementation guide
- https://example.com/blog/measure-ai-citations-llmo-kpi/ — How to measure AI citation as a KPI

### Primary Book LPs
- https://example.com/books/llmo-ai-search-optimization/ — LLMO Practical Guide
- https://example.com/books/context-engineering/ — Context Engineering in Practice
```

#### llms.txt beim Build generieren

Manuell gepflegte `llms.txt`-Dateien driften innerhalb von Wochen vom tatsächlichen Inhalt ab. Generieren Sie sie bei jedem Build aus Ihrer Content-Collection, damit sie stets aktuell ist.

#### Die fünf llms.txt-Anti-Patterns vermeiden {#die-funf-llmstxt-anti-patterns-vermeiden}

llms.txt gewinnt das Adoptionsrennen (eine SE-Ranking-Studie vom März 2026 mit 300.000 Domains fand ~10 % Adoptionsrate), verliert aber das Qualitätsrennen. Ein 30-Datei-Audit von llms.txt-Produktionsdateien großer KI-Labs, Infra-Unternehmen und Dev-Tools ergab, dass 24 von 30 mindestens eines von fünf wiederkehrenden Problemen hatten:

1. **Alles kippen** — llms.txt als zweite Sitemap behandeln mit Hunderten flacher Links. Wenn ein LLM die gesamte Datei nicht innerhalb eines Kontextfensters mit noch Budget für die eigentliche Frage lesen kann, hat die Datei das Problem verschoben, nicht gelöst. Fix: 10–20 Links; alles andere kommt unter `## Optional` oder bleibt in sitemap.xml.
2. **Widerspricht robots.txt** — URLs auflisten, die robots.txt für genau die Crawler explizit `Disallow`t, die llms.txt lesen. Der Crawler gehorcht robots.txt; llms.txt wird dekorativ. Fix: beide Dateien gemeinsam prüfen.
3. **Nur HTML-Links, kein .md** — auf HTML-Seiten verweisen, die der Crawler nicht sauber parsen kann, statt auf Markdown-Zwillinge (siehe [Jeder Seite einen .md-Zwilling geben](#jeder-seite-einen-md-zwilling-geben) unten). Im Audit servierten nur 6 von 30 Sites irgendwelche `.md`-Begleiter.
4. **About-Page-Theater** — die Datei mit Leitbildern und Gründerzitaten füllen und zwei Links ans Ende stellen. LLMs brauchen Zeiger auf Inhalte, keine Markennarrativa.
5. **Bei Launch eingefroren** — 404-Links, umbenannte Produkte, seit dem Launch unberührte Dateien. Fix durch Automatisierung, nicht durch Disziplin.

Die Vor-Launch-Prüfung als fünf Fragen:

1. Unter 10 KB und unter 20 Links (ohne `## Optional`)?
2. Bestehen alle gelisteten URLs robots.txt für GPTBot und ClaudeBot?
3. Haben mindestens die Top-5-URLs einen `.md`-Begleiter?
4. Verlinkt der Body auf spezifische Seiten statt auf Marketing-Copy?
5. In den letzten 90 Tagen aktualisiert?

Das vollständige 30-Datei-Audit ist in [diesem Feldbericht](https://kenimoto.dev/blog/30-llms-txt-files-5-anti-patterns-already-forming/) (auf Englisch) dokumentiert.

### 3. Bieten Sie maschinenlesbare Endpunkte an
Stellen Sie Inhalte in Formaten bereit, die KI-Systeme leicht verarbeiten können:
- Markdown-Versionen wichtiger Seiten
- API-Endpunkte für strukturierte Daten
- RSS/Atom-Feeds für Aktualisierungen

#### Jeder Seite einen .md-Zwilling geben {#jeder-seite-einen-md-zwilling-geben}

Die stärkste Form des Punktes „Markdown-Versionen" ist ein vollständiger Zwilling: Jede Inhaltsseite löst auch mit angehängtem `.md` auf und gibt denselben Inhalt als sauberes Markdown zurück.

```text
/company       → HTML für Menschen
/company.md    → Markdown für Maschinen
```

Implementierungsanforderungen:

1. Mit `Content-Type: text/markdown; charset=utf-8` ausliefern — **nicht** `text/plain`, was das strukturelle Signal verwirft.
2. Den Zwilling mit einem `Link: <…/page.md>; rel="alternate"; type="text/markdown"`-Header bewerben, damit Crawler ihn entdecken können.
3. Nach dem Deploy mit `curl -I https://yoursite.com/page.md` prüfen. GitHub Pages insbesondere verarbeitet `.md`-Dateien durch Jekyll und gibt stillschweigend gerendertes HTML zurück.
4. Die Zwillinge von `llms.txt` aus verlinken, damit es einen Entdeckungspfad von der Übersichtsdatei zu den seitenspezifischen Markdowns gibt.

**Feldbefund:** Ein site-weiter `.md`-Zwilling-Rollout auf einer persönlichen Website (Astro, eine `*.md.ts`-Route pro Seite) ist in [diesem Implementierungsbericht](https://kenimoto.dev/blog/every-page-md-twin-llmo/) (auf Englisch) dokumentiert.

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

- [ ] robots.txt erlaubt die wichtigsten KI-Crawler (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, CCBot)
- [ ] sitemap.xml wird generiert und ist aktuell, mit herausgefilterten Nicht-Inhalts-Seiten (`/404`, Entwürfe)
- [ ] llms.txt-Datei existiert mit korrekter Website-Zusammenfassung
- [ ] llms.txt enthält einen `## Citation Preferred`-Abschnitt, der kanonische Einstiegspunkte pro Thema benennt
- [ ] llms.txt und `llms-full.txt` werden beim Build aus der Content-Collection neu generiert (kein manueller Drift)
- [ ] llms.txt besteht die Fünf-Fragen-Prüfung (≤20 Links, robots.txt-konsistent, `.md`-Begleiter, spezifische Links, innerhalb von 90 Tagen aktualisiert)
- [ ] Wichtige Inhalte sind ohne JavaScript verfügbar
- [ ] Hochwertige Seiten haben einen `.md`-Zwilling, der als `text/markdown; charset=utf-8` ausgeliefert wird (mit `curl -I` verifiziert, nicht angenommen)
- [ ] `.md`-Zwillinge sind von `llms.txt` aus verlinkt und über `Link: rel="alternate"`-Header beworben
- [ ] Inhalte werden auf mehreren Plattformen für Querverweise veröffentlicht
