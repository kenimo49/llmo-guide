---
title: "KI-Zitations-Halbwertszeit: Zitate sind ein Fluss, kein Bestand"
description: "KI-Zitate verfallen. Eine 90-tägige Messung mit festem Protokoll über ChatGPT, Claude und Perplexity ergab Halbwertszeiten von 3,2 bis 9,1 Wochen, abhängig von Inhaltstyp und Engine — wobei Evergreen-Seiten Zitate etwa doppelt so lange halten wie Erfahrungsberichte."
pubDate: 2026-07-07
---

**Ein KI-Zitat ist kein Pokal, den man gewinnt und behält. Es ist ein verderbliches Gut.** Eine Seite, die heute fünf Engines zitieren, kann innerhalb eines Monats die Hälfte ihrer Zitierrate verlieren, während ihr Google-Suchtraffic konstant bleibt. Diese Seite fasst die veröffentlichten Verfalls-Schätzungen, ein reproduzierbares Messprotokoll und die Halbwertszeit-Zahlen aus einer 90-tägigen Feldmessung zusammen.

## Die veröffentlichten Schätzungen

Branchenmessungen im Jahr 2026 konvergieren auf dieselbe Form:

| Befund | Quelle |
|---|---|
| Mediane KI-Zitations-Halbwertszeit ≈ 4,5 Wochen; ChatGPT dreht am schnellsten, Perplexity hält am längsten | Authority Tech Plattformanalyse |
| KI-zitierte Domains drehen monatlich 40–60 % um | Machine Relations |
| Etwa die Hälfte aller KI-zitierten Inhalte ist unter 13 Wochen alt; Seiten, die innerhalb von 30 Tagen aktualisiert wurden, erhalten mehrfach mehr Zitate | Authority Tech Frische-Analyse |

Der Mechanismus ist strukturell, kein Qualitätsurteil. Googles organisches Ranking für eine etablierte Seite ist klebrig — Signale bewegen sich langsam, und eine ruhige Woche verdrängt sie nicht. KI-Zitate werden aus einem Live-Index zum Antwort-Zeitpunkt gezogen, und dieser Index ist gegenüber frischem Material voreingenommen. Eine Seite wird nicht schlechter; der Pool, in dem sie konkurriert, verjüngt sich.

Aktuelle Retrieval-Forschung (TempRetriever, arXiv 2502.21024; Knowledge-Drift-Arbeit zu RAG-Grenzen, arXiv 2604.05096) modelliert die vorgelagerte Ursache: Retrieval ist gegenüber frischen Inhalten voreingenommen, und die Voreingenommenheit verstärkt sich, wenn die Frage zeitkritisch ist.

## Warum ein festes Protokoll wichtig ist

„Halbwertszeit" bedeutet nur etwas gegenüber einem eingefrorenen Protokoll. Ändern Sie das Prompt-Set, den Rhythmus oder das Erfolgskriterium, und die Zahl driftet um Wochen — zwei Personen, die „4,5 Wochen" zitieren, könnten nicht zusammenhängende Phänomene messen. Das reproduzierbare Protokoll in fünf Regeln:

1. **Festes Prompt-Set** — zehn echte Nutzer-Fragen pro Seite, vor Tag 0 geschrieben und eingefroren. Ein Prompt mid-Experiment umschreiben zerstört den Benchmark.
2. **Drei Wiederholungen pro Prompt** — separate Sitzungen, keine Chronik. Ein „Zitat" bedeutet, dass die URL als anklickbare Quelle in mindestens einem der drei Durchläufe erscheint, auf Prompt-Ebene gezählt (Zählung auf Quelllisten-Ebene übergewichtet Engines, die mehr Quellen zurückgeben — eine Korrektur, die die Zahlen einer Messung um ~15 % senkte).
3. **Fester wöchentlicher Rhythmus** — gleicher Wochentag, gleiches Zeitfenster. Eine übersprungene Woche ist ein Loch in der Kurve und ein schlechterer Fit.
4. **Zwei Uhren** — die KI-Zitierrate *und* die Search-Console-Klicks derselben Woche für dieselbe URL aufzeichnen. Wenn sich beide Kurven gemeinsam bewegen, ist etwas anderes passiert (Ausfall, Algorithmusänderung, viraler Link). Das Signal ist die KI-Kurve, die sich bewegt, während die Suchkurve stabil bleibt.
5. **Verfall wird vom Höhepunkt aus gefittet, nicht von Woche 1.** Zitieraten steigen zwei bis vier Wochen, während Engines die Seite indexieren, dann verfallen sie. Aufstieg und Verfall in einen Fit zu mischen — der häufigste Fehler in öffentlichen Berichten — ergibt flachere Halbwertszeiten als die Wahrheit.

Der Verfall-Anteil passt zu einer Exponentialfunktion: `cites(t) = peak × 0.5^(t / T_half)`, mit `t` in Wochen vom Höhepunkt.

## Die gemessenen Halbwertszeiten

Ein 90-tägiger (13-wöchiger) Durchlauf dieses Protokolls auf drei Seiten einer technischen Website, über ChatGPT (Web-Suche an), Claude (Standard-Web-Modus) und Perplexity (Sonar Pro):

| Seitentyp | ChatGPT | Claude | Perplexity |
|---|---|---|---|
| Evergreen How-to | 6,8 Wo. | 7,4 Wo. | 9,1 Wo. |
| Erfahrungsbericht | 3,2 Wo. | 3,6 Wo. | 4,4 Wo. |
| Methodik-Beitrag | 5,1 Wo. | 5,9 Wo. | 6,7 Wo. |

Drei Befunde, nach Überraschungsgrad geordnet:

1. **Inhaltstyp dominiert.** Die Evergreen-Seite hielt Zitate auf jeder Engine etwa 2× länger als der Erfahrungsbericht. Engines gewichten Frische, aber sie gewichten auch, ob die Seite die Frage noch beantwortet — ein How-to antwortet monatelang; ein Erfahrungsbericht hört schnell auf. Der Durchschnitt über Seitentypen reproduziert die veröffentlichte Headline „≈4,5 Wochen", verbirgt aber die 2×-Spanne, die tatsächlich wichtig ist.
2. **Perplexity verfällt am langsamsten auf allen drei Seiten** (seine veröffentlichte Ranking-Orientierung setzt Frische auf ~15 % Gewichtung), **ChatGPT am schnellsten in jeder Zeile** — konsistent mit den plattformspezifischen Umwälzungsberichten.
3. **Auffrischungen stellen Zitate nur teilweise und ungleichmäßig wieder her.** Eine *substanzielle* Aktualisierung (neuer Abschnitt, neue Datentabelle) des Erfahrungsberichts erholte ChatGPT innerhalb von zwei Wochen auf ~70 % des Höhepunkts, Claude auf ~60 %, Perplexity bis Woche 12 auf ~75 % — nie zurück zum Höhepunkt. Eine kosmetische Datums-Aktualisierung in einem früheren neun-wöchigen Durchlauf produzierte nichts Messbares. Der erste Launch ist wichtiger als jede Auffrischung.

Vollständige Daten und Protokoll: [der 90-Tage-Methodik-Bericht](https://kenimoto.dev/blog/measuring-ai-citation-half-life-90-day-methodology/) (auf Englisch) und [das erste neun-wöchige Verfall-Log](https://kenimoto.dev/blog/ai-citations-half-life-decay/) (auf Englisch).

## Operative Konsequenzen

- **Klassifizieren Sie jede Seite vor der Veröffentlichung als Evergreen oder Ablaufend.** Evergreen-Seiten erhalten substanzielle Auffrischungen im Rhythmus, den die Halbwertszeit impliziert (ungefähr alle 6–8 Wochen). Ablaufende Seiten werden nicht aufgefrischt — keine Bearbeitung macht einen veralteten Erfahrungsbericht wieder relevant — sie werden archiviert und ersetzt.
- **Zitations-Metriken als Raten über Zeit melden, nie als Snapshots.** „Von fünf Engines zitiert" ist an einem Montag wahr und im nächsten Monat falsch. Die Trendlinie über ein festes Prompt-Set ist die ehrliche Metrik — siehe [LLMO messen](/de/guide/measuring-llmo/) für den wöchentlichen Loop, in den dies passt.
- **Zitiert zu werden ist ein Launch-Problem; zitiert zu bleiben ist ein Retention-Problem.** [Zitiersignale](/de/framework/citation-signals/) bestimmen, ob Sie in den Zitations-Pool eintreten. [Autoritätssignale](/de/framework/authority-signals/) und [Kohärenz-Signale](/de/framework/coherence-signals/) — plus der Auffrischungsrhythmus — bestimmen, ob Sie darin bleiben.

## Grenzen der Messung

Einzelner Website, drei Seiten, ein Auffrischungsereignis — die engine-asymmetrische Auffrischungsreaktion könnte ein Frische-Gewicht-Unterschied oder Rauschen sein. Methodik-Beiträge selbst-kannibalisieren sich (Engines können neue Prompts mit dem älteren Mess-Beitrag beantworten). Und ein 13-wöchiges Fenster kann nicht zeigen, ob sich Halbwertszeiten weiter verkürzen, wenn Engine-Indizes wachsen. Behandeln Sie die Halbwertszeitwerte als Output eines vertretbaren Protokolls, nicht als Konstanten.
