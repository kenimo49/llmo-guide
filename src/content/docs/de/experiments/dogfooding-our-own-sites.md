---
title: "Dogfooding des LLMO Score v0.1: Wir haben den Checker auf 6 eigenen Sites laufen lassen"
description: "Wir haben 6 Sites gemessen, die wir betreiben — einschließlich der Firmen-Site des Labors hinter LLMOFramework — mit dem neuen llmo-checker CLI. Die Firmen-Site bekam 29 / 100."
pubDate: 2026-05-24
---

Das erste **Public Experiment Log** der Open LLMO Research Initiative.

Wir haben gerade [`llmo-checker`](https://github.com/open-llmo/llmo-checker) veröffentlicht, ein CLI im Lighthouse-Stil, das misst, wie gut eine URL für KI auffindbar ist (v0.1 Draft). Das Erste, was wir damit gemacht haben: jeden Site, den wir betreiben, durchgejagt — einschließlich der Firmen-Site des Labors, das diese Initiative betreut.

Die Schlagzeile des Ergebnisses: **unsere eigene Firmen-Site bekam 29 / 100**, schlechter als jeder Consumer-Site, für den sie eigentlich als Referenz dient.

## Methodik

- Tool: `npx llmo-checker <url>` v0.1.0 (commit `1db47ea`)
- Datum: 2026-05-24
- Sites: 6 Properties, die wir besitzen oder betreiben
- Score: gewichteter Durchschnitt aus 5 statischen Checks — `llms-txt` (Gewicht 20), `robots-ai` (15), `canonical` (15), `jsonld` (20), `meta` (15)
- Score-Bänder: 85+ well-grounded · 65–84 needs work · 40–64 poor · 0–39 critical

Alle Checks sind reine HTTP-Fetches und HTML-Parsing. In v0.1 gibt es keine KI-Zitation-Simulation: der Score misst das **substrate**, das ein KI-Crawler tatsächlich sehen kann.

## Ergebnisse

| Site | Rolle | Score | Band | Schwächster Check |
|---|---|---|---|---|
| `llmoframework.com` | Site dieser Initiative | **96** | well-grounded | `llms-txt` ohne Linkliste (kosmetisch) |
| `kenimoto.dev` | Persönliche Site des Autors | **96** | well-grounded | wie oben |
| `legacydram.com` | Whisky × Engineering-Medium | **93** | well-grounded | JSON-LD lückenhaft (kein `Organization`/`Person`) |
| `mypcrig.com` | PC-Build-Kuration | **90** | well-grounded | Kein `hreflang` (für einsprachige Site ok) + JSON-LD lückenhaft |
| `kaoriq.com` | Parfüm-E-Commerce | **90** | well-grounded | Keine expliziten KI-Bot-Regeln in robots.txt |
| **`propel-lab.com`** | **Firmen-Site des Labors** | **29** | **critical** | Fast alles |

`propel-lab.com` ist die Firmen-Site des Labors, das genau diese Initiative betreut. Sie schnitt schlechter ab als jede einzelne Consumer-Produktsite, die wir ausliefern.

## Warum die Firmen-Site durchgefallen ist

Ein `curl` auf die Root erzählt die ganze Geschichte:

```bash
$ curl -s https://propel-lab.com/
<!DOCTYPE html><html><head><script>window.onload=function(){window.location.href="/lander"}</script></head></html>
```

Die Root von `propel-lab.com` ist **eine Zeile HTML**. Ein `window.location.href`-Redirect läuft im Browser und schickt den Besucher zu `/lander`.

Für einen Menschen in Chrome funktioniert das. Für jeden KI-Crawler, den wir kennen, ist es unsichtbar. Keiner von GPTBot, ClaudeBot, CCBot, Google-Extended, PerplexityBot oder Applebot-Extended führt beim Fetch JavaScript aus. Sie sehen das obige rohe HTML und halten dort an.

An der Root-URL (der ersten, die die meisten KI-Systeme abfragen) hat der Checker also gefunden:

- Kein `<title>`
- Kein `<meta name="description">`
- Kein OpenGraph
- Null `<h1>`-Elemente
- Kein `<html lang>`
- Kein JSON-LD
- Kein `<link rel="canonical">`

Danach haben wir den Checker auf das **Redirect-Ziel** `https://propel-lab.com/lander` losgelassen. Score **31 / 100**, ebenfalls critical. Die Zielseite hat Inhalt, aber kein canonical, kein JSON-LD und schwache Metadaten.

Beide Schichten fallen durch.

## Was das bedeutet

Es gibt ein verbreitetes Muster: Teams veröffentlichen eine "splash → landing"-Struktur auf der Firmen-Site, nehmen an, dass Google JS schon richtig handhabt, und prüfen nie, wie die Seite für einen Crawler ohne JS aussieht. Diese Annahme war für die Google-Suche weitgehend richtig. **Für KI-Crawler im Jahr 2026 ist sie weitgehend falsch.**

In unserem Fall ist die Firmen-Site eines *auf LLMO fokussierten Labors* genau in diese Falle gefallen. Wir haben das aufgedeckt, weil wir ein Tool gebaut haben, das uns zwang, auf das substrate zu schauen. Ohne das Tool hätten wir weiter angenommen, dass alles in Ordnung ist, weil das menschliche UX sauber aussah.

Genau das ist der Sinn, den Checker als OSS zu veröffentlichen. Die substrate-Lücke ist unsichtbar, bis man misst.

## Was wir ändern werden

Aus diesem Experiment heraus kommt Folgendes in unser öffentliches Backlog:

1. **Serverseitiger Redirect auf `propel-lab.com/`** — den JS-Redirect durch einen 301 ersetzen oder den Landing-Inhalt direkt an der Root rendern
2. **canonical + JSON-LD `Organization` + OG-Metadaten zu `/lander` hinzufügen** — den Einzelscore von 31 auf ≥ 85 heben
3. **Den Checker als Smoke-Step ausführen** — das Audit in unsere eigene Deploy-Pipeline einbauen, damit künftige Regressionen sofort auffliegen
4. **JSON-LD-Abdeckung in `mypcrig.com` und `kaoriq.com` verbessern** — beide stehen bei `jsonld` auf 82 / 100, weil sie einige, aber nicht alle relevanten Typen (`Product`, `Person`, `Article`) ausgeben
5. **Explizite KI-Bot-Policy in der robots.txt von `kaoriq.com` ergänzen** — heute neutral; wir wollen explizites Opt-in für GPTBot / ClaudeBot / Google-Extended

Wenn das erledigt ist, veröffentlichen wir ein Follow-up-Experiment-Log mit den neu gemessenen Scores. Ehrlich über das Delta, egal ob eines da ist.

## Warum wir die schlechte Note veröffentlichen

Es gibt eine starke Versuchung, ein Mess-Tool, sobald es veröffentlicht ist, vor allem auf Konkurrenten anzusetzen. Wir machen bewusst das Gegenteil: das erste öffentliche Dataset für `llmo-checker` sind **unsere eigenen Properties**, einschließlich der mit der schlechtesten Note.

Zwei Gründe:

1. **Der Score muss falsifizierbar sein.** Wenn wir nie eine Durchfallnote auf etwas Eigenem veröffentlichen, hat niemand Grund, der Bewertung Ehrlichkeit zuzutrauen.
2. **Die Glaubwürdigkeit der Initiative kommt aus Artefakten, nicht aus dem Framing.** Ein Labor, das die eigene Firmen-Site mit 29 / 100 veröffentlicht, ist glaubwürdiger als eines, das ein Manifest plus eine Selbstbewertung mit 100 / 100 hinlegt.

## Grenzen des Experiments

- v0.1 misst nur das substrate. Eine Site kann beim substrate 95 holen und trotzdem null KI-Zitate bekommen, weil der Inhalt uninteressant ist, bekannten Fakten widerspricht oder Quellen mit höherer Autorität dupliziert. Citation Visibility ist für v0.2 reserviert.
- Die Score-Gewichte (`llms-txt` 20, `robots-ai` 15, `canonical` 15, `jsonld` 20, `meta` 15) sind von den Autoren gesetzt und unvalidiert. Es sind vernünftige Defaults, nicht aus Outcome-Daten abgeleitet. Wir werden sie rekalibrieren, sobald wir in Phase 2 Citation-Outcome-Daten sammeln.
- Getestet wurden nur die Startseiten. Artikelseiten auf jeder Site können andere Scores haben.

## Reproduktion des Experiments

```bash
npx llmo-checker@0.1.0 https://llmoframework.com/
npx llmo-checker@0.1.0 https://kenimoto.dev/
npx llmo-checker@0.1.0 https://legacydram.com/
npx llmo-checker@0.1.0 https://mypcrig.com/
npx llmo-checker@0.1.0 https://kaoriq.com/
npx llmo-checker@0.1.0 https://propel-lab.com/
npx llmo-checker@0.1.0 https://propel-lab.com/lander
```

Mit `--json` für maschinenlesbare Ausgabe. Version anpinnen (`@0.1.0`); die JSON-Form kann sich in v0.2 ändern.

## Was als Nächstes kommt

Das ist der erste Eintrag in einer Public-Experiment-Log-Serie. Die nächsten beiden, die wir laufen lassen wollen:

- **Externes Baseline-Panel** — einige Dutzend traffic-starke Technikseiten (Dokumentationsportale, Dev-Blogs, Produkt-Marketing-Sites) bewerten und die Verteilung veröffentlichen. Das kalibriert, wie "normal" aussieht.
- **Citation-Correlation-Pilot** — für ~50 URLs den LLMO Score mit der tatsächlichen KI-Zitationsrate vergleichen (Probing von ChatGPT, Claude und Perplexity). Das ist der erste echte Test, ob der Score das Outcome vorhersagt, das er vorherzusagen behauptet.

Die komplette Roadmap steht unter [Experimental Projects](/de/experimental-projects/), und die v0.1-Score-Gewichte sind in der [Score v0.1 Draft Specification](/de/specifications/score-v01/) definiert.
