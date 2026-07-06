---
title: "LLMO messen: Zitierrate, Erwähnungsdichte und KI-Referral-Conversion"
description: "LLMO-Messung ist die Praxis, zu verfolgen, ob KI-Systeme Ihre Inhalte zitieren und was diese Zitate wert sind. Drei Kernmetriken — Citation Rate, Brand Mention Density und AI Referral Conversion — ersetzen die Ranking-KPIs, die KI-Suche überflüssig gemacht hat."
pubDate: 2026-07-07
---

LLMO-Messung ist die Praxis, zu verfolgen, ob KI-Systeme Ihre Inhalte zitieren, wie tief sie sie zitieren und was diese Zitate für Ihr Unternehmen wert sind. Sie ersetzt die Ranking-KPIs des klassischen SEO, die in der KI-Suche kein Äquivalent haben: Es gibt keine Positionen 1 bis 100, nur zitiert oder nicht zitiert.

## Die Messlücke

SEO-Messung ist ein gelöstes Problem: Google Search Console meldet Rankings, Impressionen, Klicks und CTR kostenlos, täglich. LLMO hat kein Äquivalent. Stand 2026 bietet keine KI-Plattform — weder OpenAI, Anthropic, Google noch Perplexity — eine offizielle API, die meldet, wie oft Ihre Website zitiert wurde.

Zwei Konsequenzen:

1. **GA4-Referral-Traffic ist die Spitze des Eisbergs.** Wenn eine KI Sie zitiert und der Nutzer auf den Link klickt, zeichnet GA4 einen Referral auf. Wenn eine KI Sie zitiert und niemand klickt — was meistens der Fall ist — wird nichts an einem für Sie sichtbaren Ort aufgezeichnet. Ein Zitat, das nie angeklickt wird, positioniert Sie dennoch als Quelle innerhalb der Antwort, und das akkumuliert sich.
2. **Drittanbieter-Tracker weichen stark voneinander ab.** Ein kontrollierter Vergleich, bei dem dieselbe Website in sieben KI-Zitations-Tracker über dieselben 15 Tage eingespeist wurde, ergab sieben verschiedene Zahlen, von 38 bis 312 — eine 8,2-fache Spanne ([vollständiger Bericht](https://kenimoto.dev/blog/seven-ai-citation-trackers-seven-different-numbers) (auf Englisch)). Die Divergenz ist ein Definitionsproblem, kein Anbieterfehler: Tools unterscheiden sich darin, was als Zitat zählt (verlinkte Quelle vs. jede Markenerwähnung), welche LLMs sie samplen, wie oft und in welchen Sprachen.

Die praktische Regel daraus: **Schreiben Sie Ihre Definition von „Zitat" in einem Satz auf, bevor Sie einen Tracker kaufen oder bauen.** Wenn Sie Attributions-Traffic wollen, zählen Sie nur verlinkte Zitate. Wenn Sie Markenpräsenz wollen, zählen Sie Erwähnungen. Die Zahlen sind über Definitionen hinweg nicht vergleichbar.

## Die drei Kernmetriken

Makro-Indikatoren wie SOV (Share of Voice) und SOM (Share of Model) sagen Ihnen, ob sich Ihre gesamte KI-Präsenz bewegt hat, aber nicht, was Sie als nächstes tun sollen. Für einen Verbesserungszyklus zerlegen Sie in drei Metriken:

| Metrik | Was sie misst | Einheit | Rhythmus |
|---|---|---|---|
| Citation Rate | Wie oft KI Sie bei einem festen Prompt-Set erwähnt | % | Wöchentlich |
| Brand Mention Density | Wie tief KI über Sie spricht, wenn sie es tut | Erwähnungen pro 1.000 Wörter | Monatlich |
| AI Referral Conversion | Was ein KI-vermittelter Besuch wert ist | % | Monatlich |

Zusammen decken sie Häufigkeit, Tiefe und Wert ab — eine bloße Zitations-Anzahl vermischt alle drei.

### 1. Citation Rate

Führen Sie einen festen Satz von 10–20 Prompts über die KI-Plattformen aus, die Sie interessieren, und messen Sie den Anteil der Durchläufe, bei denen Ihre Marke oder Domain erscheint:

```
Citation Rate = erwähnt (Prompt × Plattform) / Gesamtdurchläufe × 100
```

10 Prompts × 5 Plattformen = 50 Durchläufe; 12 Erwähnungen = 24 %.

Das Prompt-Set muss eingefroren bleiben. LLM-Antworten sind nicht-deterministisch — derselbe Prompt erzeugt an verschiedenen Tagen verschiedene Antworten — daher ist eine einzelne Prüfung Rauschen. Verfolgen Sie den Trend auf einem unveränderten Prompt-Set für mindestens 4 Wochen, bevor Sie etwas daraus lesen.

### 2. Brand Mention Density

Citation Rate ist pro Durchlauf binär: erwähnt oder nicht. Aber Zitate variieren in der Tiefe — ein beiläufiges „andere Optionen sind X" ist weniger wert als ein Absatz, der Ihren Ansatz erklärt. Mention Density misst Marken-Term-Vorkommen pro 1.000 Wörter Antworttext:

```python
def mention_density(answer_text: str, brand_terms: list[str]) -> float:
    total_words = len(answer_text.split())
    mentions = sum(answer_text.lower().count(t.lower()) for t in brand_terms)
    return mentions / total_words * 1000
```

Ein tiefes Zitat überwiegt oft einen Stapel flacher. Density zeigt Ihnen den Unterschied.

### 3. AI Referral Conversion

Erstellen Sie in GA4 eine Channel-Gruppe (Verwaltung → Channel-Gruppen) mit einer Session-Source-Regex:

```regex
chatgpt\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com
```

Vergleichen Sie dann die Conversion-Rate dieses Segments mit Organic Search. Feldmessungen zeigen konsistent, dass KI-vermittelte Besucher zu einem Vielfachen des organischen Werts konvertieren — 2026er Branchendaten berichten 8–12 % vs. 2–3 % für organisch, und unser eigenes Referenz-Website-Tracking lag im Bereich von 2–4× organisch ([Messungs-Setup](https://kenimoto.dev/blog/measure-ai-citations-llmo-kpi/) (auf Englisch)). Der Mechanismus: Ein Nutzer, der eine KI fragt „Was soll ich für X verwenden?", befindet sich später im Entscheidungsprozess als ein Nutzer, der Keywords in Google eingibt. Die KI hat die Recherche erledigt; der Klick ist näher an der Entscheidung.

Bekannter blinder Fleck: Kostenlose ChatGPT-Nutzer senden oft keinen Referrer, sodass ihre Klicks in Direct landen. Ihre GA4-KI-Zahlen sind eine Untergrenze, keine Obergrenze.

## Drei Implementierungsebenen

Beginnen Sie auf der Ebene, die Ihren Ressourcen entspricht; jede Ebene erhöht die Auflösung.

### Ebene 1: GA4-Channel-Gruppe (kostenlos, 5 Minuten)
Die obige Regex. Misst nur Klicks — die Spitze des Eisbergs — aber sie ist verifizierbar und dauert fünf Minuten.

### Ebene 2: Das manuelle Fünf-Plattform-Protokoll (kostenlos, 30 Minuten/Monat)
An einem festen Tag pro Monat führen Sie Ihre 10–15 eingefrorenen Prompts auf ChatGPT, Perplexity, Gemini, Claude und Copilot aus. Zeichnen Sie pro Durchlauf auf: erwähnt (ja/nein), Kontext (Empfehlung / Vergleich / neutral / negativ), Genauigkeit und ob eine URL angegeben wurde. Berechnen Sie die Citation Rate. Manuell und mühsam — und dennoch die zuverlässigste verfügbare Methode, da kein automatisiertes Tool beurteilt, ob eine Erwähnung eine Empfehlung oder eine Ablehnung war.

### Ebene 3: Mit APIs automatisieren (ein Nachmittag, ~1–8 $/Monat)
Das manuelle Protokoll, geskriptet:

```python
BRAND_TERMS = ["your-site.com", "Your Brand"]
CHECK_QUERIES = ["Best tools for <your category>", ...]  # eingefrorener Satz

def check(query: str, ask) -> dict:
    answer = ask(query)  # OpenAI / Anthropic / Perplexity API-Aufruf
    return {
        "query": query,
        "mentioned": any(t.lower() in answer.lower() for t in BRAND_TERMS),
        "density": mention_density(answer, BRAND_TERMS),
        "snippet": answer[:300],
    }
```

Wöchentlich per Cron ausführen, an eine JSON- oder CSV-Zeitreihe anhängen. Nach 8–12 Wochen können Sie Bewegungen auf spezifische Maßnahmen zurückführen: „Die Zitierrate stieg nach dem Hinzufügen strukturierter Daten von 12 % auf 28 %" ist ein Satz, den Ebene 3 Ihnen ermöglicht zu sagen.

## Das Crawler-Signal, das die meisten Websites ignorieren

Server-Zugriffslogs zeichnen bereits auf, welche KI-Systeme Ihre Inhalte besuchen — GPTBot, ClaudeBot, PerplexityBot und Google-Extended identifizieren sich alle im User-Agent:

```bash
grep -E "GPTBot|ClaudeBot|PerplexityBot|Google-Extended" access.log \
  | awk '{print $7}' | sort | uniq -c | sort -rn
```

Seiten, die nie gecrawlt werden, können nicht aus dem Live-Index zitiert werden. Crawl-Häufigkeit ist ein indirekter, aber führender Indikator: Sie zeigt Ihnen, welche Inhalte KI-Systeme überspringen, bevor die Zitations-Daten es können.

## Der Verbesserungszyklus

Messung ohne Aktion ist Daten-Hortung. Ein nachhaltiger Rhythmus:

- **Wöchentlich (10 Min.):** GA4-KI-Kanal und das Citation-Rate-Delta prüfen; Prompts markieren, die ungewöhnlich tiefe Zitate erzeugt haben.
- **Monatlich (30 Min.):** Mention-Density-Trend und AI Referral Conversion vs. organisch überprüfen; Prompts mit null Zitaten auflisten.
- **Quartalsweise (1 Std.):** Vollständiges Review — das Query-Set aktualisieren und prüfen, ob Content-Änderungen messbare Bewegungen erzeugt haben.

Priorisieren Sie die Prompts mit null Zitaten. Einen Prompt von 0 % auf 10 % zu bringen ist fast immer günstiger als einen 30-%-Prompt auf 40 % zu bringen, weil das Null meist eine strukturelle Ursache hat — keine Seite zielt auf diese Frage ab, oder die Seite, die es tut, verletzt [Wissensklarheit](/de/framework/knowledge-clarity/) oder [Abrufsignale](/de/framework/retrieval-signals/).

## Beziehung zu LLMO Score

Die Metriken auf dieser Seite messen *Outcomes*: ob KI Sie tatsächlich zitiert. Der [LLMOFramework Score](/de/specifications/score-v01/) misst das *Substrat*: ob die maschinenlesbaren Oberflächen Ihrer Website überhaupt vorhanden sind. Substrat-Prüfungen sind sofortig und deterministisch; Outcome-Metriken sind langsam und verrauscht. Führen Sie beide durch — Substrat, um zu finden, was zu reparieren ist, Outcomes, um zu bestätigen, dass die Korrekturen gewirkt haben.

## Checkliste

- [ ] „Zitat" ist in einem Satz definiert, bevor ein Tool eingesetzt wird
- [ ] Ein Prompt-Set von 10–20 Anfragen ist aufgeschrieben und eingefroren
- [ ] GA4 hat eine KI-Such-Channel-Gruppe mit der Referral-Regex
- [ ] Citation Rate wird in einem festen Rhythmus verfolgt (wöchentlich oder monatlich)
- [ ] Mention Density unterscheidet tiefe Zitate von beiläufigen Erwähnungen
- [ ] AI Referral Conversion wird im Vergleich zu organisch betrachtet, nicht isoliert
- [ ] Crawler-Logs werden auf Seiten geprüft, die KI-Systeme nie besuchen
- [ ] Prompts mit null Zitaten treiben den Content-Rückstand
