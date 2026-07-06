---
title: Mehrsprachiges LLMO
description: "Inhalte zu übersetzen ist notwendig, aber nicht ausreichend für mehrsprachige KI-Sichtbarkeit. KI-Engines zitieren oft die englische Version für nicht-englischsprachige Leser. Was hreflang, Canonicals und sprachspezifische llms.txt tatsächlich bewirken — und die Asymmetrie, die nicht-englische Sprachen zur höheren ROI-Investition macht."
pubDate: 2026-07-07
---

**Ihre Inhalte zu übersetzen ist notwendig und nicht ausreichend.** Im Jahr 2026 gibt es eine reale, messbare Lücke zwischen „Ich habe eine portugiesische Version veröffentlicht" und „KI-Suche zitiert meine portugiesische Version". Dieser Leitfaden behandelt die zwei mehrsprachigen Probleme, die LLMO lösen muss: KI-Engines dazu bringen, die *richtige* Sprachversion zu zitieren, und entscheiden, *welche* Sprachen die Investition lohnen.

## Das Problem der falschen Sprache bei Zitaten

Eine klassische Suchmaschine löst auf, *welches Dokument* es liefern soll, und liefert es dann. `hreflang` ist ein Ranking-Signal, auf das sie seit zwei Jahrzehnten trainiert wurde, und Google ist wirklich gut darin, die passende Sprach-URL auszuwählen.

Eine LLM-basierte Engine tut etwas anderes: eine Handvoll Dokumente abrufen, eine Antwort in der Sprache des Nutzers generieren und dann die URLs anhängen, die die Retrieval-Ebene geliefert hat. Der Generierungsschritt ist flüssig mehrsprachig. Der Retrieval-Schritt ist der Ort, an dem die Sprachauswahl stattfindet — und er ist häufig englisch-voreingenommen.

Das beobachtbare Ergebnis, aus einem plattformübergreifenden Test derselben mehrsprachigen Anfrage (Glenn Gabe, GSQI) und dem eigenen Zitations-Tracking einer viersprachigen Website:

- **Google-basierte Engines** (AI Overviews, AI Mode, Gemini, Copilot) erben jahrzehntelange `hreflang`-Behandlung und zitieren meist die richtige lokalisierte URL.
- **Perplexity**, auf Französisch eingestellt, gab trotzdem die US-englische Seite zurück.
- **ChatGPT** schrieb seine Antwort auf Französisch und verlinkte dann die englische Version der Seite. Die Antwort spricht die Sprache des Lesers; das Zitat nicht.

Warum die Retrieval-Ebene standardmäßig auf Englisch zurückgreift:

- Die englische Version hat typischerweise mehr eingehende Links und eine längere Crawl-Geschichte, sodass sie unabhängig von der Sprache des Lesers höher im Retrieval-Index rankt.
- Viele KI-Crawler parsen `hreflang`-Cluster nicht so vollständig wie Googlebot.
- Übersetzungsqualität ist ein Vertrauenssignal. Wenn eine übersetzte Seite wie maschineller Output klingt, behandelt die Retrieval-Ebene sie als Duplikat mit geringem Vertrauen und greift auf das englische Original zurück.

Das Problem ist nicht „Die KI spricht kein Portugiesisch." Es ist „Die Retrieval-Ebene der KI vertraut Ihrer portugiesischen Seite nicht genug, um sie zu zitieren."

## Was tatsächlich den Ausschlag gibt, nach Rang

Aus einem Einzel-Variablen-Feldexperiment auf einer viersprachigen Website ([Feldbericht](https://kenimoto.dev/blog/ai-cites-wrong-language-version-multilingual-llmo/) (auf Englisch)):

1. **`hreflang` + `x-default` — hat am meisten bewirkt.** Jede Sprachversion muss das vollständige Cluster mit einem sinnvollen `x-default` deklarieren. Das ist das einzige Signal, das die Google-basierten Engines zuverlässig lesen, und diese Engines sind ein großes Stück der KI-Suche. Wenn Sie nur eine Sache tun, tun Sie diese richtig.
2. **Self-referencing canonical pro Sprache — still kritisch.** Jede Sprachversion muss auf *sich selbst* canonical setzen, nicht auf das englische Original. Eine übersetzte Seite, deren canonical auf Englisch zurückzeigt, sagt jedem Crawler „die echte Seite ist die englische" — eine selbst zugefügte Wunde.
3. **Sprachspezifische `llms.txt` — klein, günstig, vermutlich lohnenswert.** Kuratieren Sie Links pro Sprache, sodass jede Datei auf die korrekten lokalisierten URLs zeigt. Noch keine große Engine bestätigt dies zu gewichten, aber es kostet fünfzehn Minuten pro Sprache, hat keinen Nachteil und dokumentiert, welche URL pro Sprache kanonisch ist.
4. **Versuche, die Engine zu konfigurieren — hat nichts gebracht.** Es gibt keine Einstellung, die ChatGPT dazu bringt, Ihre lokalisierte URL zu zitieren. Sie können sich nicht durch Konfiguration aus einer Retrieval-Voreingenommenheit herausarbeiten; Sie können der Retrieval-Ebene nur sauberere Signale geben und warten.

Selbst mit allen sauberen Signalen sollten Sie eine Restlücke erwarten: Ein Teil des Problems liegt in Retrieval-Ebenen, die Sie nicht besitzen. Sie können die Lücke verkleinern, aber nicht schließen.

## Sprachasymmetrie: der strategische Vorteil

Dieselbe Unreife, die falsche Sprachzitate verursacht, schafft eine Chance. Der KI-Such-Wettbewerb ist über Sprachen hinweg dramatisch ungleich, und die LLMO-Grundlagen akkumulieren sich am schnellsten in Sprachen, in denen sie noch selten sind.

Eine 22-tägige GA4-Messung an einem Blog, der dieselben Inhalte in vier Sprachen veröffentlichte ([Feldbericht](https://kenimoto.dev/blog/four-languages-thirty-days-portuguese-four-x-traffic/) (auf Englisch)):

| Sprache | Seitenaufrufe | Artikel | Anmerkungen |
|---|---|---|---|
| Portugiesisch | 748 | 17 | ~3,8× Englisch mit weniger Artikeln |
| Englisch | 195 | 26 | Gesättigter Markt, kleiner Share of Voice |
| Japanisch | 27 | 25 | Leser leben auf Plattformen (Qiita/Zenn), nicht in Blogs |
| Spanisch | 7 | 10 | Dünner Wettbewerb, aber keine Community-Pforte |

**Sprachasymmetrie kann Artikelzahl-Asymmetrie vollständig aufwiegen.** Drei Asymmetrien stapelten sich, um das portugiesische Ergebnis zu produzieren:

1. **Community-Pforte** — eine sprachspezifische offene Plattform, auf der ein unbekannter Autor noch am selben Tag gelesen wird (Brasilien hat TabNews; Englisch hat kein Äquivalent mit vergleichbarer Mindest-Reichweite).
2. **Dünnere KI-Such-Felder** — auf Portugiesisch konkurrieren weit weniger Kandidaten um dieselben Prompts. Die erste vernünftige Antwort in einer unterversorgten Sprache gewinnt; die erste vernünftige Antwort auf Englisch wird begraben.
3. **Early-Mover-Basics** — eine `/pt/llms.txt` ist leicht differenzierend, wo die meisten Websites in dieser Sprache nichts liefern; auf Englisch ist dieselbe Datei bloße Hygiene.

Das Vertriebsmodell unterscheidet sich auch pro Sprache: Das japanische Ergebnis zeigt eine Sprache, in der der Blog als kanonisches Archiv dienen sollte, das KI-Crawler indexieren, während Plattform-Posts (Zenn/Qiita) die Arbeit des menschlichen Traffics übernehmen. Gleicher Inhalt, entgegengesetzte Rollen.

## Implementierungsreihenfolge

1. **Identifizieren Sie die Community-Pforte jeder Zielsprache, bevor Sie übersetzen.** Nicht die Zielgruppengröße — die Pforte. Wenn es keine offene Posting-Plattform gibt, rechnen Sie mit dem spanischen Ergebnis oben.
2. **Liefern Sie `/{lang}/llms.txt` von Tag eins.** Fünfzehn Minuten pro Sprache; die günstigste verfügbare Differenzierung in unterversorgten Sprachen.
3. **Richten Sie Analytics mit Sprachpräfix-Filtern ein, bevor Sie veröffentlichen**, oder Sie werden die Messung im zweiten Monat nachrüsten statt zu schreiben.
4. **Übersetzen Sie zuerst die Top-20-%-Artikel** — die mit der größten Wahrscheinlichkeit, durch die Community-Pforte zu kommen. Validieren Sie die Distribution, bevor Sie das Archiv übersetzen.
5. **Verfolgen Sie den KI-Such-Share-of-Voice pro Sprache als separate KPIs.** Führen Sie dieselben markenrelevanten Prompts auf ChatGPT, Perplexity und Claude in jeder Sprache monatlich aus ([LLMO messen](/de/guide/measuring-llmo/) deckt die Metriken ab). Die Asymmetrien sind groß und unsichtbar, bis sie gemessen werden.
6. **Maschinelle Übersetzungen per Hand für Register und Locale nachbearbeiten.** Übersetzungsqualität ist ein Retrieval-Vertrauenssignal, nicht nur eine Leserfreundlichkeit.

## Wie diese Website es implementiert

llmoframework.com veröffentlicht in 8 Locales mit Englisch als kanonischer Quelle. Seiten ohne Übersetzung liefern den englischen Inhalt als Fallback mit `noindex` und Sitemap-Ausschluss — eine nicht übersetzte Seite sollte in keinem Retrieval-Index mit ihrem eigenen Canonical konkurrieren. Jedes Locale deklariert ein vollständiges `hreflang`-Cluster und self-referencing Canonicals.

## Checkliste

- [ ] Jede Sprachversion deklariert das vollständige `hreflang`-Cluster einschließlich `x-default`
- [ ] Jede Sprachversion hat einen self-referencing canonical (zeigt nie auf das englische Original)
- [ ] Jedes Sprachverzeichnis liefert seine eigene `llms.txt` mit lokalisierten URLs
- [ ] Nicht übersetzte Fallback-Seiten sind `noindex`ed und aus der Sitemap ausgeschlossen
- [ ] Übersetzungen sind per Hand für Register und Locale nachbearbeitet, keine rohe maschinelle Ausgabe
- [ ] Die Community-Pforte jeder Zielsprache ist identifiziert, bevor die Übersetzung beginnt
- [ ] Der KI-Such-Share-of-Voice wird pro Sprache, in-language, monatlich gemessen
- [ ] Der Veröffentlichungsaufwand ist auf unterversorgte Sprachen gewichtet, nicht auf die Gesamtzahl der Sprecher
