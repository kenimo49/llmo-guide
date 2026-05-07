---
title: "LLMO FAQ"
description: "Häufig gestellte Fragen zur Implementierung von LLMO — wie es sich zu SEO verhält, wie lange es dauert, womit man anfängt und wie man die KI-Sichtbarkeit misst."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "inLanguage": "de",
        "mainEntity": [
          {"@type": "Question", "name": "Ersetzt LLMO SEO?", "acceptedAnswer": {"@type": "Answer", "text": "Nein. LLMO und SEO lösen unterschiedliche Probleme und laufen parallel. SEO zielt auf gerankte Suchergebnisse; LLMO zielt darauf ab, von KI-Systemen (ChatGPT, Claude, Gemini, Perplexity) zitiert, zusammengefasst oder direkt beantwortet zu werden. Die meisten LLMO-Arbeiten — semantisches HTML, JSON-LD, Sitemaps, robots.txt — stärken auch SEO, daher musst du dich nicht entscheiden."}},
          {"@type": "Question", "name": "Wie lange dauert die LLMO-Implementierung?", "acceptedAnswer": {"@type": "Answer", "text": "Eine minimale LLMO-Baseline (llms.txt, /ai/ Markdown, robots.txt mit Erlaubnis für GPTBot/ClaudeBot/PerplexityBot, JSON-LD auf wichtigen Seiten) dauert auf einer kleinen Site etwa 30 Minuten. 13/15 im LLMO-Framework zu erreichen, dauert typischerweise einige Wochen schrittweiser Arbeit."}},
          {"@type": "Question", "name": "Was sollte ich zuerst implementieren?", "acceptedAnswer": {"@type": "Answer", "text": "Beginne mit Abrufsignalen (Komponente 3): /llms.txt, /ai/ Markdown-Zusammenfassungen, robots.txt mit ausdrücklicher Erlaubnis für KI-Crawler, erreichbare sitemap.xml. Ohne diese können Wissensklarheit und Autoritätsarbeit nicht gefunden werden."}},
          {"@type": "Question", "name": "Brauche ich wirklich /llms.txt und ein /ai/-Verzeichnis?", "acceptedAnswer": {"@type": "Answer", "text": "Beide sind empfohlen, aber optional. /llms.txt (gemäß llmstxt.org) gibt einer KI eine schnelle, strukturierte Karte der Site — besonders wertvoll, wenn KI-Agenten Seiten direkt abrufen statt über Suche. /ai/ Markdown gibt Crawlern und Copy-Paste-Nutzern sauberen Text ohne HTML-Chrome."}},
          {"@type": "Question", "name": "Wie blockiere ich unerwünschte KI-Crawler?", "acceptedAnswer": {"@type": "Answer", "text": "Verwende robots.txt mit expliziten User-agent-Direktiven. Beispiel: 'User-agent: GPTBot' gefolgt von 'Disallow: /' wählt deine Site aus den OpenAI-Trainingscrawls aus. Jeder große Crawler — GPTBot (OpenAI), ClaudeBot (Anthropic), PerplexityBot (Perplexity), Google-Extended (Google), Bytespider (ByteDance) — veröffentlicht User-Agent und Opt-out-Semantik."}},
          {"@type": "Question", "name": "Wie messe ich, ob LLMO funktioniert?", "acceptedAnswer": {"@type": "Answer", "text": "Drei Schichten: (1) Serverlogs — suche nach GPTBot, ClaudeBot, PerplexityBot User-Agents und welche Seiten sie abrufen; (2) KI-Prompt-Audits — frage ChatGPT, Claude, Perplexity nach branchenrelevanten Themen und prüfe, ob deine Site zitiert wird; (3) Referrer-Analyse — Besuche von chat.openai.com, claude.ai, perplexity.ai usw. Verfolge alle drei monatlich."}},
          {"@type": "Question", "name": "Ist JSON-LD erforderlich oder reicht reines HTML?", "acceptedAnswer": {"@type": "Answer", "text": "Reines semantisches HTML allein funktioniert, schneidet aber schlechter ab. JSON-LD lässt dich explizite Fakten ausdrücken — author, publisher, datePublished, sameAs-Identitäten —, die KI-Systeme ohne Prosa-Parsing konsumieren. Für LLMO ist JSON-LD die günstigste Einzelmaßnahme, die Strukturierte Formatierung und Autoritätssignale gleichzeitig hebt."}},
          {"@type": "Question", "name": "Ist LLMO für B2B-Sites mit wenig Traffic relevant?", "acceptedAnswer": {"@type": "Answer", "text": "Ja — wohl mehr noch. B2B-Traffic aus KI-Suche konvertiert deutlich besser als aus generischer Suche (Go Fish Digital beobachtete 25× höhere Conversion). Wenn Käufer KI-Assistenten nach Anbietern fragen, ist die zitierte Quelle zu sein wertvoller als auf Seite 2 von Google."}},
          {"@type": "Question", "name": "Wie verhält sich LLMO zu AEO und GEO?", "acceptedAnswer": {"@type": "Answer", "text": "LLMO ist der Oberbegriff. AEO (Jason Barnard, 2018) zielt auf Featured Snippets und Voice Answers — kein formales akademisches Framework. GEO (Princeton/IIT Delhi/Adobe, KDD 2024) ist die akademische Arbeit, fokussiert auf generative Suche. LLMO synthetisiert beides plus Abruf- und Autoritätssignale zu einem implementierbaren Framework."}},
          {"@type": "Question", "name": "Kann ich LLMO auf einer statischen Site (ohne Backend) implementieren?", "acceptedAnswer": {"@type": "Answer", "text": "Ja. Statische Sites sind das ideale LLMO-Ziel — jede Komponente (llms.txt, /ai/ Markdown, JSON-LD, robots.txt, sitemap.xml) ist eine statische Datei. Die Site, die du gerade liest, ist eine statische Astro-Site auf GitHub Pages und erreicht 15/15 im LLMO-Framework."}},
          {"@type": "Question", "name": "Wie oft sollte ich Inhalte für Zitiersignale aktualisieren?", "acceptedAnswer": {"@type": "Answer", "text": "KI-Systeme gewichten Aktualität. Aktualisiere primäre Referenzseiten (Frameworks, Leitfäden, Papers/Forschung) mindestens vierteljährlich, schnelllebige Themen (Modell-Releases, KI-Politik, Tooling) monatlich. Aktualisiere immer sowohl datePublished (Erstellung) als auch dateModified (Überarbeitung). Microsofts Richtlinien vom Oktober 2025 listen Aktualität als eines von drei Kernprinzipien."}}
        ]
      }
---

Häufig gestellte Fragen zur Implementierung des LLMO-Frameworks. Wenn deine fehlt, [öffne ein Issue](https://github.com/kenimo49/llmo-guide/issues) — Antworten aus dem Issue-Tracker fließen zurück auf diese Seite.

## Ersetzt LLMO SEO?

Nein. LLMO und SEO lösen unterschiedliche Probleme und laufen parallel.

- **SEO** zielt auf gerankte Suchergebnisse.
- **LLMO** zielt darauf ab, von KI-Systemen (ChatGPT, Claude, Gemini, Perplexity) zitiert, zusammengefasst oder direkt beantwortet zu werden.

Die meisten LLMO-Arbeiten stärken auch SEO, daher musst du dich nicht entscheiden.

## Wie lange dauert die LLMO-Implementierung?

- **30 Minuten**: minimale Baseline. Siehe [Schnellstart](/de/guide/quickstart/).
- **Einige Wochen**: 13/15 im [LLMO-Framework](/de/framework/overview/) erreichen.

## Was sollte ich zuerst implementieren?

Beginne mit **Abrufsignalen** (Komponente 3): `/llms.txt`, `/ai/` Markdown, AI-erlaubende `robots.txt`, erreichbare `sitemap.xml`.

## Brauche ich wirklich /llms.txt und ein /ai/-Verzeichnis?

Beide sind empfohlen, aber optional. `/llms.txt` ([llmstxt.org](https://llmstxt.org/)) liefert eine strukturierte Site-Karte. `/ai/` Markdown liefert sauberen Text ohne HTML.

## Wie blockiere ich unerwünschte KI-Crawler?

```
User-agent: GPTBot
Disallow: /
```

Spezifikationen aller großen Crawler unter [Forschung → Publikationen](/de/research/papers/).

## Wie messe ich, ob LLMO funktioniert?

Drei Schichten monatlich: (1) Serverlogs auf KI-Crawler; (2) Prompt-Audits in ChatGPT/Claude/Perplexity; (3) Referrer-Analyse von `chat.openai.com`, `claude.ai`, `perplexity.ai`.

## Ist JSON-LD erforderlich?

Nicht erforderlich, aber **die günstigste Einzelmaßnahme**, die Strukturierte Formatierung und Autoritätssignale gleichzeitig hebt.

## Ist LLMO für B2B-Sites mit wenig Traffic relevant?

Ja — wohl mehr noch. B2B-AI-Suche konvertiert 25× besser als generische Suche (Go Fish Digital).

## Wie verhält sich LLMO zu AEO und GEO?

| Standard | Ursprung | Umfang |
|----------|----------|--------|
| AEO | Jason Barnard, 2018 | Featured Snippets, Voice |
| GEO | Princeton/IIT Delhi/Adobe, KDD 2024 | Generative Suche |
| **LLMO** | Diese Site, 2026 | Alle LLM-Interaktionen |

Volle Aufschlüsselung unter [LLMO vs SEO vs AEO vs GEO](/de/guide/llmo-vs-seo-aeo-geo/).

## Kann ich LLMO auf einer statischen Site implementieren?

Ja. Jede Komponente ist eine statische Datei. Diese Site ist eine statische Astro-Site auf GitHub Pages, 15/15.

## Wie oft sollte ich Inhalte aktualisieren?

Vierteljährlich primäre Referenzseiten, monatlich schnelllebige Themen. Immer `datePublished` und `dateModified` aktualisieren. Microsofts Richtlinien vom Oktober 2025 listen Aktualität als Kernprinzip.
