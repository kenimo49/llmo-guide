---
title: "Dogfooding des LLMO Score v0.1: Wir haben den Checker auf 6 eigenen Sites laufen lassen"
description: "Wir haben 6 Sites gemessen, die wir betreiben, mit dem neuen llmo-checker CLI. Alle haben 90 oder mehr erreicht. Das interessantere Ergebnis ist das, das wir fast veröffentlicht hätten — und kurz vor Livegang zurückziehen mussten."
pubDate: 2026-05-24
---

Das erste **Public Experiment Log** der Open LLMO Research Initiative.

Wir haben gerade [`llmo-checker`](https://github.com/open-llmo/llmo-checker) veröffentlicht, ein CLI im Lighthouse-Stil, das misst, wie gut eine URL für KI auffindbar ist (v0.1 Draft). Das Erste, was wir damit gemacht haben: jede Site, die wir betreiben, durchgejagt.

Die Schlagzeile des Ergebnisses, nach einer Korrektur: **alle sechs Properties in unserem Besitz haben 90 oder mehr erreicht**. Das nützlichere Artefakt aus diesem Experiment ist das, was während dieser *Korrektur* passiert ist — ausführlich weiter unten.

## Methodik

- Tool: `npx llmo-checker <url>` v0.1.0
- Datum: 2026-05-24
- Sites: 6 Properties, die wir besitzen oder betreiben
- Score: gewichteter Durchschnitt aus 5 statischen Checks — `llms-txt` (Gewicht 20), `robots-ai` (15), `canonical` (15), `jsonld` (20), `meta` (15)
- Score-Bänder: 85+ gut grounded · 65–84 Verbesserungsbedarf · 40–64 schlecht · 0–39 kritisch

Alle Checks sind reine HTTP-Fetches und HTML-Parsing. In v0.1 gibt es keine KI-Zitation-Simulation: der Score misst das **Substrate**, das ein KI-Crawler tatsächlich sehen kann.

## Ergebnisse

| Site | Rolle | Score | Band | Schwächster Check |
|---|---|---|---|---|
| `llmoframework.com` | Site dieser Initiative | **96** | gut grounded | `llms-txt` ohne Linkliste (kosmetisch) |
| `kenimoto.dev` | Persönliche Site des Autors | **96** | gut grounded | wie oben |
| `propel-lab.co.jp` | Firmen-Site des Labors | **94** | gut grounded | `<meta name="description">` mit 47 Zeichen (Sweet Spot 80–200) |
| `legacydram.com` | Whisky × Engineering-Medium | **93** | gut grounded | JSON-LD lückenhaft (kein `Organization`/`Person`) |
| `mypcrig.com` | PC-Build-Kuration | **90** | gut grounded | Kein `hreflang` (für einsprachige Site ok) + JSON-LD lückenhaft |
| `kaoriq.com` | Parfüm-E-Commerce | **90** | gut grounded | Keine expliziten KI-Bot-Regeln in robots.txt |

Median 93, Minimum 90. Keine Site unterhalb des Bands "gut grounded".

Das ist eine deutlich weniger dramatische Tabelle als die, die wir fast veröffentlicht hätten.

## Worum es bei diesem Experiment fast gegangen wäre

Der erste Entwurf dieses Eintrags hatte eine andere Schlagzeile: **"Unsere eigene Firmen-Site bekam 29 / 100, das schlechteste Ergebnis im Test."** Genau die Art selbstkritisches Reporting, die einem neuen Mess-Projekt Glaubwürdigkeit verschafft.

So lief die Geschichte. Wir hatten `propel-lab.com` gemessen und 29 / 100 bekommen — Band kritisch. Wir hatten ein `curl` auf die Root abgesetzt und eine Zeile HTML gefunden:

```bash
$ curl -s https://propel-lab.com/
<!DOCTYPE html><html><head><script>window.onload=function(){window.location.href="/lander"}</script></head></html>
```

Ein Redirect via `window.location.href` nach `/lander`, unsichtbar für jeden KI-Crawler, den wir kennen. Anschließend haben wir den Checker auf `/lander` selbst losgelassen und **31 / 100** bekommen, ebenfalls kritisch. Zwei Schichten, beide gescheitert. Wir hatten ein sauberes moralisches Lehrstück: ein LLMO-fokussiertes Labor, dessen eigene `.com` an dem Substrate-Test scheitert, den es predigt.

Wir waren kurz davor, das zu veröffentlichen.

## Was uns gestoppt hat

Vor dem Livegang haben wir ein weiteres `curl` auf dieses Ziel-HTML abgesetzt. Drei Signaturen sind ins Auge gesprungen:

```html
<script>window.LANDER_SYSTEM="PW"</script>
<script src="https://www.google.com/adsense/domains/caf.js"></script>
<script src="https://img1.wsimg.com/parking-lander/static/js/main.be9a3b28.js"></script>
```

Das ist der Fingerabdruck einer **Domain-Parking-Seite** — `wsimg.com/parking-lander` ist ein extern gehostetes Parking-Template, ausgespielt zusammen mit Google AdSense for Domains. Die Seite läuft wie ein Parkplatz, nicht wie eine Firmen-Site.

`propel-lab.com` gehört uns nicht. Hat uns nie gehört. Die Firmen-Site ist `propel-lab.co.jp`, mit Score **94 / 100** — gut grounded, die dritte in der Tabelle.

Unser moralisches Lehrstück handelte von einer fremden geparkten Domain.

## Warum wir das im Log stehen lassen

Die Versuchung, nachdem man so einen Beinahe-Unfall vor Livegang gefangen hat, ist: Entwurf still korrigieren, die langweilig-ehrliche Version ohne Protokoll des Beinahe-Falls rausschicken. Das machen wir nicht. Drei Gründe:

1. **Eine LLMO-Initiative, die ihre Beinahe-Unfälle versteckt, ist dasselbe wie eine, die schlechte Scores versteckt.** Wenn Falsifizierbarkeit ein erklärtes Prinzip sein soll, müssen Spuren von Falsifizierungen sichtbar bleiben.
2. **Das Parking-Domain-Muster ist ein realer Substrate-Failure-Case.** Wer eine `.com` fürs Branding registriert, dort aber nie eine echte Site ausliefert, liefert KI-Crawlern Substrate in derselben Form wie `propel-lab.com`. Dieser Insight ist derselbe, egal wem die Domain gehörte.
3. **Dogfooding hat uns einen 90+-Only-Datensatz geliefert.** Das ist zu sauber, um der Beweis zu sein, den wir uns erhofft hatten. Wenn du deine eigene Arbeit misst und das Schlechteste eine 90 ist, hast du gelernt, dass du Sites konsistent nach deinem eigenen Standard schreibst — nicht, dass der Standard etwas Nützliches vorhersagt.

Die substanzielle Frage — "Prognostiziert der LLMO Score tatsächliches KI-Zitationsverhalten?" — wird durch ein Self-Audit über sechs Sites, in dem alles besteht, nicht beantwortet. Es braucht ein externes Baseline-Panel und einen Citation-Correlation-Pilot. Genau das sind die nächsten beiden Experiment Logs.

## Was wir auf unseren eigenen Sites trotzdem ändern

Auch ohne die Parking-Domain-Geschichte zeigt die Tabelle Kleinigkeiten, die sich lohnen:

1. **Description von `propel-lab.co.jp`** — aktuell 47 Zeichen, Sweet Spot 80–200. Auf dieselbe Länge wie die anderen Firmen-Site-Descriptions im Portfolio ausweiten
2. **JSON-LD-Abdeckung in `mypcrig.com` und `kaoriq.com` verbessern** — beide stehen bei `jsonld` auf 82 / 100, weil sie einige, aber nicht alle relevanten Typen (`Product`, `Person`, `Article`) ausgeben
3. **Explizite KI-Bot-Policy in der robots.txt von `kaoriq.com` ergänzen** — heute neutral; wir wollen explizites Opt-in für GPTBot / ClaudeBot / Google-Extended
4. **Linkliste zu `/llms.txt` auf `llmoframework.com` und `kenimoto.dev` hinzufügen** — die aktuellen Dateien enthalten Prosa, aber keinen Link-Abschnitt; beide verlieren dadurch einen kleinen Anteil des `llms-txt`-Gewichts

Wenn das erledigt ist, veröffentlichen wir ein Follow-up-Experiment-Log mit den neu gemessenen Scores. Ehrlich über das Delta, egal ob eines da ist.

## Was wir nicht erwartet, aber gelernt haben

Die klarste Lektion handelt nicht von Substrate, sondern von erzählerischer Disziplin.

Als der Score von `propel-lab.com` als 29 zurückkam, war die erste Bewegung, eine Erzählung um die Zahl zu bauen. Die Erzählung saß, war konträr, hätte sich gut geteilt. Die Zahl ist das, was sie ermöglicht hat.

Dass uns `propel-lab.com` gehört, wurde ungeprüft vorausgesetzt. Genau die Art Annahme, die eine gute Erzählung verstärkt, weil das Eingeständnis der Lücke den ganzen Post zusammenfallen lässt. Wir haben es zufällig gefangen — bei einem weiteren `curl` auf einen anderen HTML-Abschnitt, um zusätzliche Funde zu sammeln, nicht um die Prämisse zu prüfen.

Für ein Projekt, dessen Wertversprechen lautet *miss dein KI-Substrate, bevor du annimmst, wie es aussieht*, ist beinahe ein Stück zu veröffentlichen, das darauf basiert, **die Domain-Eigentumsfrage nicht zu prüfen, bevor man annimmt, was sie ist**, die richtige Art von Peinlichkeit.

## Grenzen des Experiments

- v0.1 misst nur das Substrate. Eine Site kann beim Substrate 95 holen und trotzdem null KI-Zitate bekommen, weil der Inhalt uninteressant ist, bekannten Fakten widerspricht oder Quellen mit höherer Autorität dupliziert. Citation Visibility ist für v0.2 reserviert.
- Die Score-Gewichte (`llms-txt` 20, `robots-ai` 15, `canonical` 15, `jsonld` 20, `meta` 15) sind von den Autoren gesetzt und unvalidiert. Es sind vernünftige Defaults, nicht aus Outcome-Daten abgeleitet. Wir werden sie rekalibrieren, sobald wir in Phase 2 Citation-Outcome-Daten sammeln.
- Getestet wurden nur die Startseiten. Artikelseiten auf jeder Site können andere Scores haben.
- Der Datensatz besteht aus sechs Sites, die wir nach unserem eigenen Standard verfasst haben. Er sagt nichts darüber aus, ob der Standard verallgemeinerbar ist.

## Reproduktion des Experiments

```bash
npx llmo-checker@0.1.0 https://llmoframework.com/
npx llmo-checker@0.1.0 https://kenimoto.dev/
npx llmo-checker@0.1.0 https://propel-lab.co.jp/
npx llmo-checker@0.1.0 https://legacydram.com/
npx llmo-checker@0.1.0 https://mypcrig.com/
npx llmo-checker@0.1.0 https://kaoriq.com/
```

Mit `--json` für maschinenlesbare Ausgabe. Version anpinnen (`@0.1.0`); die JSON-Form kann sich in v0.2 ändern.

Um die Parking-Domain-Erkennung zu reproduzieren, zusätzlich:

```bash
npx llmo-checker@0.1.0 https://propel-lab.com/
npx llmo-checker@0.1.0 https://propel-lab.com/lander
curl -s https://propel-lab.com/lander | head -1
```

Die ersten beiden geben kritische Scores zurück. Der dritte bringt `LANDER_SYSTEM` / `parking-lander` / `adsense/domains` als Marker im HTML zum Vorschein.

## Was als Nächstes kommt

Das ist der erste Eintrag in einer Public-Experiment-Log-Serie. Die nächsten beiden, die wir laufen lassen wollen:

- **Externes Baseline-Panel** — einige Dutzend stark frequentierte Technikseiten (Dokumentationsportale, Dev-Blogs, Produkt-Marketing-Sites) bewerten und die Verteilung veröffentlichen. Das kalibriert, wie "normal" aussieht — der Vergleich, den dieses Self-Audit allein nicht leisten kann.
- **Pilot zur Korrelation von Zitierungen** — für ~50 URLs den LLMO Score mit der tatsächlichen KI-Zitationsrate vergleichen (Abfragen von ChatGPT, Claude und Perplexity). Das ist der erste echte Test, ob der Score das Outcome vorhersagt, das er vorherzusagen behauptet.

Die komplette Roadmap steht unter [Experimental Projects](/de/experimental-projects/), und die v0.1-Score-Gewichte sind in der [Score v0.1 Draft Specification](/de/specifications/score-v01/) definiert.

## Update (24.05.2026, am selben Tag): nach Auslieferung der vier Fixes neu vermessen

Alle vier in "Was wir auf unseren eigenen Sites noch ändern" gelisteten Fixes wurden am selben Tag wie der ursprüngliche Post in zwei Wellen ausgeliefert. Neu vermessen mit `llmo-checker@0.1.0`:

| Site | Vorher | Nachher | Was geholfen hat |
|---|---|---|---|
| `llmoframework.com` | 96 | **99** | `## Links`-Abschnitt in `/llms.txt` zu spec-konformen `- [title](url)`-Einträgen umgeschrieben (llms-txt 90 → 100) |
| `kenimoto.dev` | 96 | **99** | Gleicher Fix: `## Links`, `## Books`, `## Blog Articles` und `## Research Papers` als `[title](url)`-Einträge neu geschrieben (llms-txt 90 → 100) |
| `kaoriq.com` | 93 | **96** | `Person`-Schema als eigenständiger `@type` auf der Startseite ergänzt (vorher nur in `Organization.founder` verschachtelt, der Score zählt das nur einmal) — jsonld 82 → 94 |
| `mypcrig.com` | 90 | **93** | Gleicher Fix: `Person` auf einen eigenen `@type`-Block angehoben — jsonld 82 → 94 |
| `propel-lab.co.jp` | 96 | 96 | `<meta name="description">` war bereits in der v1.5.1-Welle von 47 auf 129 Zeichen erweitert worden |

Die Deltas sind genau das, was die veröffentlichte Scoring-Regel vorhersagt: `llms-txt` hat Gewicht 20 × den 10-Punkte-Sprung (90 → 100) = +2 auf die Gesamtsumme (gerundet auf +3 durch das per-check Rounding), und der `@type`-Count-Bump in `jsonld` (+12 pro erkanntem `@type`, Gewicht 20%) landet als ~+2,4 auf der Gesamtsumme. Diese Art expliziter Vorhersagbarkeit ist genau das, was ein transparenter Score im Lighthouse-Stil als Nebenprodukt erhält — und genau die Eigenschaft, nach der wir in umgekehrter Richtung suchen werden, wenn die Daten des externen Baseline-Panels eintreffen.

Die Fixes waren klein in Zeilen (jeder unter einer Stunde, inklusive Build und Deploy-Verifikation), was das ehrlichere Takeaway ist: Der Score hat nichts Mysteriöses oder Schwerlösbares benannt. Er hat vier mechanische Dinge benannt, die wir bisher nicht aufgeräumt hatten, und einmal gemessen waren sie klein genug, um alles in einer einzigen Follow-up-Welle auszuliefern.

Was das **nicht** bewiesen hat: dass irgendeines dieser Deltas mit nachgelagertem KI-Zitationsverhalten korreliert. Das bleibt die Aufgabe von Experiment Log #3. Dieses Update bestätigt nur, dass der Score intern konsistent ist — Fixes produzieren die Deltas, die das Spec vorhersagt. Das externe Panel und der Citation-Correlation-Pilot bleiben der echte Validierungspfad.
