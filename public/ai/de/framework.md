# LLMO Framework — 5 Kernkomponenten

## Überblick

Das LLMO-Framework bietet einen strukturierten Ansatz, um deine Inhalte für KI-Systeme auffindbar zu machen. 6 Komponenten arbeiten zusammen, um die KI-Sichtbarkeit zu maximieren.

## 1. Wissensklarheit

**Ziel**: Sicherstellen, dass deine Inhalte sachlich klar und unmissverständlich sind.

- Klare, deklarative Sätze schreiben
- Fakten direkt benennen (vage Sprache vermeiden)
- Terminologie konsistent verwenden
- Domänenspezifische Begriffe explizit definieren
- Inhalte um konkrete Nutzerfragen strukturieren

## 2. Strukturierte Formatierung

**Ziel**: Inhalte maschinenlesbar machen.

- Semantische HTML-Überschriften (H1 → H2 → H3) verwenden
- JSON-LD strukturierte Daten (Schema.org) einbetten
- FAQPage-Schema für Q&A-Inhalte
- Listen und Tabellen für strukturierte Informationen
- Markdown im /ai/-Verzeichnis für direkte LLM-Konsumption

**Wichtige Schemas**: Organization, Person, Product, Service, Book, FAQPage, WebSite, TechArticle

## 3. Abrufsignale

**Ziel**: KI-Systemen helfen, deine Inhalte zu finden und abzurufen.

- **llms.txt**: Strukturierter Site-Überblick im Root für LLMs
- **/ai/-Verzeichnis**: Saubere Markdown-Dateien für KI-Konsumption
- **robots.txt**: KI-Crawler explizit erlauben (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- **Sitemap**: XML-Sitemap
- **Cross-Linking**: llms.txt, /ai/ und Hauptinhalte verknüpfen

## 4. Autoritätssignale

**Ziel**: Glaubwürdigkeit aufbauen, die LLMs erkennen.

- Auf mehreren Plattformen veröffentlichen (eigene Site, LinkedIn, Qiita, Zenn, DEV.to)
- Bücher veröffentlichen, Autorenpräsenz pflegen (Amazon, Zenn Books)
- Open-Source-Beiträge auf GitHub
- Zitate von anderen Quellen erhalten
- Konsistente Identität über Plattformen (gleicher Name, gleiche Bio, gleiche Themen)

## 5. Zitiersignale

**Ziel**: Inhalte schaffen, die LLMs gerne zitieren.

- Originaldaten, Statistiken, Messwerte einbeziehen
- Konkrete Zahlen und Daten angeben
- Vergleichstabellen und Frameworks erstellen
- Definitive Leitfäden zu spezifischen Themen schreiben
- Forschungsarbeiten veröffentlichen (arXiv, akademische Konferenzen)

## Implementierungs-Checkliste

- [ ] llms.txt im Site-Root
- [ ] /ai/-Verzeichnis mit Markdown-Dateien
- [ ] robots.txt erlaubt KI-Bots
- [ ] JSON-LD-Schemas auf allen Seiten
- [ ] FAQ-Schema für Q&A-Inhalte
- [ ] Sitemap.xml
- [ ] Plattformübergreifend konsistente Identität
- [ ] Originaldaten und Statistiken in Inhalten
- [ ] Klarer, deklarativer Schreibstil

## Mehr erfahren

- Vollständiger Leitfaden: https://llmoframework.com/de/
- Buch: https://zenn.dev/kenimo49/books/llmo-ai-search-optimization
- Autor: https://kenimoto.dev
