---
title: "Public Experiment Log #2: Externes Baseline-Panel"
description: "Wir haben 39 stark frequentierte Technikseiten mit llmo-checker@0.1.0 bewertet, um zu kalibrieren, wie 'normal' aussieht. Der Median liegt bei 61. Drei der größten Dokumentationsportale schneiden mit unter 40 ab."
---

Das erste Public Experiment Log hat sechs Sites bewertet, die wir betreiben. Alle sechs landeten bei 90+. Das war ehrlich darin, zu sauber zu sein, um als Beweis für irgendetwas zu taugen. Hier kommt die Kalibrierung, die das erste Log nicht liefern konnte: ein Panel aus 39 stark frequentierten Technikseiten, die uns nicht gehören, gemessen mit demselben Tool, am selben Tag.

Der zentrale Befund ist banal, und der zentrale Befund ist unangenehm. Der banale Teil: der Median liegt bei 61, mit einer Standardabweichung von 19,5 — eine normal anmutende Verteilung, deutlich unterhalb von "gut" zentriert. Der unangenehme Teil: drei der meistbesuchten Dokumentationsportale im modernen Web — `rust-lang.org`, `tailwindcss.com`, `djangoproject.com` — kommen mit weniger als 40 Punkten weg.

## Methodik

Ein Panel aus 40 URLs wurde so gewählt, dass es drei Kategorien abdeckt: Entwickler-Dokumentation (20), Produkt-Marketing-Sites (12) und Engineering-Blogs (6). Zwei weitere (`docs.anthropic.com`, `platform.openai.com/docs/`) sind als separates "AI-Provider-Docs"-Sanity-Check-Paar dazugekommen. Die Auswahl wurde vor dem Mess-Run festgelegt; URLs wurden nicht je nach Score hinzugefügt oder entfernt.

Die 40 URLs wurden mit `llmo-checker@0.1.0` in einem einzigen Batch-Run gemessen, mit einer Sekunde Pause zwischen den Requests. Eine URL (`platform.openai.com/docs/`) hat einen Parse-Fehler zurückgegeben und ist herausgefallen, übrig bleiben **n = 39**.

Für jeden Request wurde derselbe User-Agent (`llmo-checker/0.1.0`) verwendet, passend zu dem, was ein KI-Crawler senden würde, der unsere Empfehlungen liest. Keine Site wurde wiederholt aufgerufen; die erste Messung zählt.

## Ergebnisse

| Kennzahl | Wert |
|---|---|
| n | 39 |
| Mittelwert | 58,8 |
| Median | 61 |
| Stdev | 19,5 |
| Q1 / Q3 | 45 / 69 |
| Min / Max | 23 / 94 |

### Score-Verteilung (10-Punkte-Buckets)

```
 20-29  ███         3
 30-39  ████        4
 40-49  █████████   9
 50-59  ██          2
 60-69  ████████████ 12
 70-79  █           1
 80-89  █████       5
 90-99  ███         3
```

Die Verteilung ist grob bimodal: ein Cluster um 40–49 (Sites im unteren bis mittleren Segment mit schwacher Maschinenlesbarkeit) und ein größerer um 60–69 (Sites im mittleren Segment, bei denen das meiste sitzt, aber `jsonld` und/oder `llms.txt` fehlen).

### Top 5

| # | Site | Score |
|---|---|---|
| 1 | `supabase.com` | 94 |
| 2 | `redis.io` | 93 |
| 2 | `www.cloudflare.com` | 93 |
| 4 | `stripe.com` | 89 |
| 5 | `docs.docker.com` | 84 |

### Bottom 5

| # | Site | Score |
|---|---|---|
| 39 | `www.rust-lang.org` | 23 |
| 38 | `tailwindcss.com` | 25 |
| 37 | `www.djangoproject.com` | 26 |
| 36 | `www.postgresql.org` | 32 |
| 35 | `golang.org` | 37 |

### Nach Kategorie

| Kategorie | n | Median | Mittelwert | Spanne |
|---|---|---|---|---|
| Produkt-Marketing | 12 | 68,5 | 74,8 | 58–94 |
| Dev-Blog | 6 | 65,0 | 65,3 | 44–80 |
| Dokumentation | 20 | 45,5 | 48,0 | 23–93 |

### Mediane pro Check

| Check | Median | Mittelwert | Spanne |
|---|---|---|---|
| `llms-txt` | 90 | 54,9 | 0–100 |
| `robots-ai` | 80 | 78,7 | 60–100 |
| `canonical` | 90 | 67,9 | 0–100 |
| `jsonld` | **0** | 26,1 | 0–94 |
| `meta` | 80 | 78,5 | 0–100 |

## Was uns überrascht hat

**Dokumentationsseiten sind die schwächste Kategorie.** Hätte man uns vorher gefragt, wäre das die Prognose gewesen, die wir am sichersten falsch abgegeben hätten. Die Default-Annahme — auch unsere, bevor die Daten vorlagen — war, dass Docs-Portale die *beste* Kategorie sein müssten, weil sie seit jeher eine kuratierte, autoritative Quelle für Menschen und Suchmaschinen sind. Die Daten sagen das Gegenteil: der Median-Score von Dokumentationen (45,5) liegt mehr als 20 Punkte unter dem von Produkt-Marketing-Sites (68,5). Dokumentationsportale sind beliebt, ausgereift und für Menschen gut gebaut, aber dieselben Teams haben im Schnitt nicht in die maschinenlesbare Oberfläche investiert.

**Das schema.org-Niveau ist sehr niedrig.** Der Median-Score für `jsonld` im Panel ist **0**. Mehr als die Hälfte dieser bekannten Technikseiten gibt überhaupt keinen erkennbaren JSON-LD-`@type` aus. Der Mittelwert wird durch eine Handvoll gut instrumentierter Sites (überwiegend Produkt-Marketing) auf 26 hochgezogen. Ein `jsonld`-Score von 0 heißt nicht, dass die Site kaputt ist — er heißt, dass es keine Entity-Graph-Oberfläche gibt, an der ein KI-Crawler eine Zitation verankern könnte.

**`llms.txt` ist bimodal, nicht graduell.** Der Median liegt bei 90, der Mittelwert aber bei 54,9. Entweder hat eine Site in eine spec-konforme `/llms.txt` investiert (saubere 90er und 100er) oder die Datei fehlt komplett (0). Sehr wenige Sites liegen in der Mitte. Das heißt: der Aufwand, bei `llms-txt` von 0 auf 90+ zu kommen, ist ein einziger Datei-Commit, keine mehrstufige Migration.

**Die drei niedrigsten Scores sind Marken, die jeder kennt.** `rust-lang.org` (23), `tailwindcss.com` (25) und `djangoproject.com` (26) sind die niedrigsten URLs im gesamten Panel. Sie gehören gleichzeitig nach jeder vernünftigen Traffic-Schätzung zu den meistbesuchten Entwickler-URLs des Webs. Der Score misst weder Traffic, noch Markenbekanntheit, noch Content-Qualität. Er misst, ob ein KI-Crawler eine Zitation an den Metadaten der Seite verankern kann — und auf dieser einen Achse liegen diese drei ganz unten.

**Die `Cloudflare`-Familie kommt über drei URLs auf 93 / 64 / 44.** `www.cloudflare.com` (93) ist die Produktseite ganz oben; `www.cloudflare.com/blog/` (64) ist der Blog-Index; `blog.cloudflare.com` (44) ist das Subdomain-Frontend des Blogs. Dieselbe Engineering-Organisation, drei verschiedene Oberflächen, 50 Punkte Spannweite. Multi-Site-Organisationen sind oft so uneinheitlich, und unser eigenes Portfolio bestätigt das (das v1.5.1 Experiment Log hat unsere eigene Spanne von 90–99 vs. 96 vs. 94 bereits dokumentiert).

## Wo unsere eigenen Sites stehen

Das erste Experiment Log hat sechs eigene Sites mit 93–99 bewertet. Isoliert betrachtet sah das unangenehm hoch aus. Jetzt steht es in einem Kontext:

| Site | Score | Panel-Perzentil (ca.) |
|---|---|---|
| `llmoframework.com` | 99 | > 99. |
| `kenimoto.dev` | 99 | > 99. |
| `kaoriq.com` | 96 | > 95. |
| `propel-lab.co.jp` | 96 | > 95. |
| `mypcrig.com` | 93 | > 90. (gleichauf mit `supabase.com` und `redis.io`) |
| `legacydram.com` | — | (in diesem Run nicht erneut gemessen) |

Damit liegen unsere eigenen Sites ganz oben in einem 39-Sites-Panel hochfrequentierter Technikseiten. Wir glauben nicht, dass das heißt, unsere Inhalte seien besser als die von `rust-lang.org` oder `stripe.com`. Es heißt, dass wir genau die fünf mechanischen Checks, auf die der Score zielt, messen und beheben — und genau das soll ein selbstgebautes Tool leichter machen.

Das ist die Kalibrierung, die dem ersten Log gefehlt hat. Der 90+-Cluster, in dem wir sitzen, ist nicht normal. Es ist der Cluster der Sites, die sich entschieden haben, gezielt auf die maschinenlesbare Oberfläche zu optimieren, und in diesem Panel trennt diese Entscheidung eine kleine Spitzengruppe von einem langen Rumpf im Band 40–69.

## Was das immer noch nicht beweist

Der Score ist intern konsistent (das Update zu Experiment Log #1 hat bestätigt, dass Fixes die Deltas produzieren, die das Spec vorhersagt). Der Score hat jetzt auch ein externes Panel zum Vergleich. Aber keine dieser beiden Tatsachen ist gleichbedeutend mit dem Beweis, dass ein höherer Score eine höhere KI-Zitationsrate verursacht.

Das ist weiterhin die Aufgabe von Experiment Log #3 (Citation-Correlation-Pilot). Für 50 URLs, die die gesamte Score-Spanne abdecken — darunter einige aus den Bottom 5 des Panels und einige aus den Top 5 — werden wir den LLMO Score mit der tatsächlichen KI-Zitationsrate (Perplexity API + ChatGPT Search + Claude Web Tool) vergleichen. Wenn der Score etwas wert ist, sollten die Bottom 5 dieses Panels für Queries, bei denen jede davon eine glaubwürdige Quelle wäre, deutlich seltener zitiert werden als die Top 5.

Die ehrliche Version dieses Updates lautet: der Score hat jetzt zwei der drei Tests bestanden, die ein Messwerkzeug bestehen muss. Er ist intern konsistent (v1.5.2 Update), und er produziert gegen ein glaubwürdiges externes Panel eine nicht-flache Verteilung (dieses Log). Der dritte Test — sagt er das Ergebnis vorher, das er vorherzusagen beansprucht — ist der, der entscheidet, ob es sich lohnt, das Projekt weiterzuführen.

## Grenzen

Das Panel ist klein (n = 39) und englischsprachig. Es ist keine japanische, chinesische, deutsche oder französische Site im Run dabei — eine bewusste Entscheidung, um das erste Panel fokussiert zu halten, aber eine echte Einschränkung für sprachübergreifende Kalibrierung.

Die Kategorie-Aufteilung ist unausgewogen: 20 Docs, 12 Produkt-Marketing, 6 Dev-Blogs. Das macht die per-Kategorie-Mediane richtungsweisend, aber statistisch nicht eng (besonders Dev-Blogs bei n = 6).

Die Auswahl haben wir selbst vor dem Mess-Run getroffen. Wir haben versucht, bekannte URLs mit hohem Traffic zu bevorzugen, um den Einwand "ihr habt euch schwache Sites herausgepickt" zu entkräften, aber Selection Bias ist nicht auszuschließen. Die rohe URL-Liste liegt zusammen mit diesem Post im Repo (`experiments/external-baseline-2026-05/urls.txt`), sodass das Panel reproduziert oder erweitert werden kann.

`platform.openai.com/docs/` ist herausgefallen, weil der Checker kein parsbares JSON zurückgegeben hat. Das ist ein Datenpunkt Survivorship Bias; der Vergleich der AI-Provider-Docs wäre mit beiden Punkten interessanter gewesen als mit einem (`docs.anthropic.com` kam auf 64).

## Reproduktion des Experiments

```bash
git clone https://github.com/open-llmo/llmo-checker
cd llmo-checker
npm install && npm run build

# URL-Liste und Run-Skript holen
cd experiments/external-baseline-2026-05
cat urls.txt          # 40 URLs
bash run-measurements.sh   # erzeugt results/*.json
python3 analyze.py    # gibt die obige Zusammenfassung aus
```

Die rohen `results/*.json`-Dateien sind eingecheckt; ein Run gegen dieselben URLs mit `llmo-checker@0.1.0` sollte Scores innerhalb von ±1 zu denen in diesem Post liefern (Sites ändern sich zwischen Runs; ein einziger neuer `<meta>`-Tag kann `meta` um 10 verschieben).

## Was als Nächstes kommt

Die Roadmap ist unverändert gegenüber dem Schluss von Experiment Log #1:

- **Experiment Log #3 — Citation-Correlation-Pilot.** Für ~50 URLs über die Score-Spanne hinweg Perplexity / ChatGPT / Claude mit demselben Set an Queries abfragen und die Korrelation zwischen LLMO Score und Zitationsrate berechnen. Das ist die eigentliche Validierung: sagt der Score voraus, was er zu sagen beansprucht?
- **v0.2 Score-Gewichte.** Wenn die Citation-Correlation-Daten wie erwartet ausfallen, werden die per-Check-Gewichte neu justiert, um die beobachtete Korrelation zu maximieren. Wenn nicht, bekommt das Spec einen deutlich interessanteren Follow-up-Post.

Die komplette Roadmap steht unter [Experimental Projects](/de/experimental-projects/), und die v0.1-Score-Gewichte sind in der [Score v0.1 Draft Specification](/de/specifications/score-v01/) definiert.
