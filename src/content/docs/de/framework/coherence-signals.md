---
title: "6. Kohärenzsignale"
description: "Kohärenzsignale stellen sicher, dass dieselbe Tatsache auf jeder von KI gelesenen Oberfläche dieselbe Geschichte erzählt — HTML, JSON-LD, Markdown, llms.txt. Widersprüche verschlechtern die Zitiergenauigkeit und untergraben das Vertrauen."
pubDate: 2026-05-08
---

## Was es ist

> **Abgrenzung zur Strukturierten Formatierung**: *Strukturierte Formatierung* fragt: "Ist jede Oberfläche für sich genommen wohlgeformt?" — gültiges JSON-LD, semantisches HTML, gescopte Schemata. *Kohärenzsignale* fragen: "Stimmen die Oberflächen untereinander überein?" — dieselbe Adresse in HTML und Markdown, dieselben Zahlen in `llms.txt` und im Profil der Startseite, keine zwei `Organization`-Entitäten mit widersprüchlichen Feldern. Eine Seite kann die Strukturierte Formatierung bestehen und an der Kohärenz scheitern: Jeder Block ist gültig, aber zusammen erzählen sie zwei Geschichten.

Kohärenzsignale messen, ob Ihre Inhalte **auf jeder Oberfläche, die ein KI-Agent lesen kann, dieselbe Geschichte erzählen**. Eine moderne, LLMO-optimierte Site stellt Fakten über viele Kanäle bereit:

- HTML-Seitenkörper (sichtbar für Menschen + KI-Crawler)
- JSON-LD Structured Data
- llms.txt und llms-full.txt
- /ai/*.md und URL.md-Endpunkte (z. B. `/company.md`)
- OG-/Twitter-Meta-Tags
- Sitemap, robots.txt, hreflang-Deklarationen

Wenn dieselbe Tatsache (eine Zahl, eine Adresse, ein Servicekatalog, ein Veröffentlichungsdatum) auf zwei dieser Oberflächen unterschiedlich erscheint, gerät ein KI-System, das aus beiden schöpft, in Verwirrung. Das Modell wählt womöglich den Wert, den es stärker gewichtet, gibt eine veraltete Zahl aus oder verzichtet ganz auf das Zitieren, weil der Widerspruch geringe Qualität signalisiert.

Kohärenz ist die LLMO-Disziplin, eine **Single Source of Truth** über jede Oberfläche hinweg zu garantieren.

## Warum es wichtig ist

Die Zitiergenauigkeit hängt von **konvergierender Evidenz** ab. Wenn ein Modell Ihre Inhalte über mehrere Pfade abruft und die Werte übereinstimmen, steigt das Vertrauen und das Zitat erreicht den Nutzer. Stimmen die Werte nicht überein, treten mehrere Fehlermodi auf:

- **Niedrigere Zitierrate** — das Modell weicht auf eine Quelle aus, deren interne Evidenz konsistent ist.
- **Falsche Tatsache zitiert** — wenn die KI die ältere Variante aus `/ai/founder.md` wählt, erreicht die aktualisierte Zahl Ihrer Startseite den Nutzer nie.
- **Verstärkung von Halluzinationen** — bei widersprüchlichen Oberflächen interpoliert das Modell eher eine "Kompromiss"-Antwort, die zu keiner passt.
- **Erosion der Autorität** — versierte KI-Re-Ranker (Perplexity, AI Overviews) vergleichen Querverweise; widersprüchliche Selbstreferenzen lesen sich als geringe Qualität.

Ein Selbstaudit von [Propel-Lab](https://propel-lab.co.jp/) aus dem Jahr 2024 ergab, dass dasselbe Autorenprofil sowohl **4 Bücher / 39.000+ Qiita-PV** (in `/ai/founder.md`, `llms-full.txt`) als auch **14 Bücher / 80.000+ Qiita-PV** (in der Profilkomponente der Startseite) angab — ein aktiver Widerspruch, der KI-Crawlern über Monate ausgeliefert worden war.

## Umsetzung

### 1. Bestimmen Sie für jede Tatsache eine einzige Quelle

Benennen Sie für jede numerische oder faktische Aussage **eine** Datei als kanonische Quelle. Jede andere Oberfläche importiert oder zitiert sie.

| Tatsache | Kanonische Quelle | Verbraucher |
|----------|-------------------|-------------|
| Anzahl Bücher, PV-Statistiken | `src/data/profile.ts` | Profilkomponente, `/ai/founder.md`, `llms-full.txt`, JSON-LD |
| Servicekatalog | `src/data/services.ts` | `/products/`, JSON-LD `Service[]`, `/ai/services.md`, `llms.txt` |
| Adresse, Gründungsdatum | `src/data/company.ts` | Footer, `/company.md`, JSON-LD `Organization`, `llms-full.txt` |
| FAQ-Einträge | `src/lib/faq-schema.ts` | FAQ-Komponente, JSON-LD `FAQPage`, `/faq.md` |

Das Muster lautet: Content-Collection oder typisiertes Datenmodul → Templates und statische Endpunkte beziehen beide daraus.

### 2. Erzeugen Sie KI-Oberflächen aus derselben Quelle wie HTML

Schreiben Sie `llms.txt` oder `/ai/*.md` nicht von Hand, wenn deren Inhalt bereits in typisierten Daten existiert:

```typescript
// src/pages/products.md.ts
import { services } from '../data/services';

export const GET: APIRoute = async () => {
  const markdown = services
    .map((s) => `## ${s.name}\n\n${s.summary}\n\n— Zielgruppe: ${s.target}`)
    .join('\n\n---\n\n');
  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
```

Die HTML-Ansicht, das JSON-LD `Service[]` und `/products.md` stammen alle aus `services`. Drift wird strukturell unmöglich.

### 3. Behandeln Sie die URL-Kanonisierung als Kohärenzfrage

`https://www.example.com/` und `https://example.com/` sind für einen string-vergleichenden Crawler zwei verschiedene Zeichenketten. Wählen Sie einen kanonischen Host und erzwingen Sie ihn:

- `<link rel="canonical">` auf jeder Seite
- `og:url`, JSON-LD `url`, Sitemap-Einträge — derselbe Host
- Verweise in `/ai/*.md`, `llms.txt` — derselbe Host
- Interne Links — relativ oder kanonisch-absolut, nie der alternative Host

Ein häufiger Bug: Beim Wechsel von `www.` zu Apex (oder umgekehrt) vergisst man die `/ai/*.md`-Dateien. Der Rest der Site ist kanonisch, und die Markdown-Oberflächen leiten still den falschen Host an die KI weiter.

### 4. Behandeln Sie die Trailing-Slash-Policy als Kohärenzfrage

Wenn Ihr Host `/blog/post` → `/blog/post/` per 301 normalisiert, sollte jeder interne Link den Slash bereits enthalten. Gemischte Formen erzeugen:

- Verschwendetes Crawl-Budget durch Redirects
- Widersprüchliche kanonische Signale während des Redirect-Fensters
- Kaputtes hreflang (manche mit Slash deklariert, manche ohne)

Legen Sie eine Policy auf Framework-Ebene fest (Astro `trailingSlash: 'always'` oder `'never'`) und greppen Sie Ihr Repository, um sicherzustellen, dass keine Abweichler übrig bleiben.

### 5. Erkennen Sie Drift mit dateiübergreifenden Prüfungen

Fügen Sie einen CI-Schritt hinzu, der dieselbe numerische oder Zeichenketten-Aussage über mehrere Oberflächen hinweg greppt und auf Gleichheit prüft:

```bash
# Schlägt fehl, wenn irgendeine Quelle die alte Buchzahl enthält
! grep -rn "4 books\|4冊\|Kindle著者: 4" public/ src/data/ src/content/
```

Noch einfacher: ein JSON-LD-Validator, der sowohl inline `<script>` als auch jede eigenständige `.jsonld`-Datei parst und prüft, dass sie bei gemeinsamen `@id`-Werten übereinstimmen.

### 6. Der Release-Prozess ist eine Kohärenzoberfläche

Eine Versionsnummer ist im LLMO-Sinne eine Tatsache — eine Aussage über Ihre Site, die eine KI zitieren kann. Wenn `package.json` `1.2.0` angibt, `src/data/version.ts` `1.1.0`, die Changelog-Seite auf Englisch `v1.2.0`, aber auf Japanisch `v1.1.0`, und der neueste Git-Tag `v1.1.0` lautet, widerspricht sich die Site über fünf Oberflächen hinweg bei derselben Tatsache.

Das ist nicht theoretisch. Genau diese Drift hat das Framework, das Sie gerade lesen, in v1.2.0 ausgeliefert; die [Selbstaudit-Fallstudie](/case-studies/llmo-framework-self-audit/) (auf Englisch) hält fest, was geschah.

Das Muster, das es verhindert:

1. **Erzeugen Sie so viele Versionsoberflächen wie möglich aus einer Quelle**. Ein Bump-Skript, das `package.json` + ein typisiertes Datenmodul + das Changelog-Markdown gemeinsam aktualisiert, ist Pflichtinfrastruktur für jedes Framework, das Kohärenz als Wert beansprucht.
2. **Machen Sie die Version zur Laufzeit sichtbar, nicht nur in den Metadaten**. Ein Footer, der `v{VERSION}` aus dem typisierten Datenmodul anzeigt, verwandelt Build-Zeit-Drift in sofortiges, nutzerseitiges Feedback. Wer `npm run build` ausführt, sieht die Abweichung auf jeder Seite.
3. **Sperren Sie den Release mit dateiübergreifenden Prüfungen**. Ein CI-Schritt, der die Version aus `package.json` liest und sie in `CHANGELOG.md`, `src/data/version.ts` und der Changelog-Seite greppt, sollte mit Nicht-Null beenden, wenn etwas abweicht.
4. **Führen Sie vor dem Taggen eine schreibgeschützte KI-Zweitprüfung durch**. Die Kosten betragen ein paar Cent an API-Tokens; der Nutzen besteht darin, die Ironie zu fangen, bevor Nutzer es tun.

Der Release-Prozess ist die Inhaltsoberfläche des Frameworks, die in Echtzeit zur KI spricht. Behandeln Sie ihn als eine.

### 7. Vermeiden Sie doppelte JSON-LD-Entitäten für dieselbe `@id`

Der häufigste stille Fehler: Das Layout gibt `Organization` mit einer Adresse aus, und ein seitenspezifisches Snippet gibt eine weitere `Organization` mit einer anderen Adresse aus. Beide landen im HTML. Der Crawler parst beide. Der Trust-Score der Seite sinkt.

Lösung: Weisen Sie jeder Entität auf Framework-Ebene eine `@id` zu (`https://example.com/#org`, `#founder`, `#website`) und referenzieren Sie überall sonst per `@id`. Jedes Duplikat wird im Code-Review offensichtlich.

## Beispiele

**❌ Drift zwischen Oberflächen:**

```markdown
# /ai/founder.md
- Publishing: Kindle author of 4 books
- Technical Writing: 39,000+ PV on Qiita
```

```astro
<!-- src/components/Profile.astro (auf der Startseite gerendert) -->
<p>Kindle 14冊・Qiita 80,000+ PV。</p>
```

```jsonld
// JSON-LD auf /
{ "@type": "Person", "name": "Ken Imoto" /* keine aktuellen Zahlen */ }
```

Drei Oberflächen, drei verschiedene Geschichten. Eine KI, die `/ai/founder.md` zitiert, meldet veraltete Zahlen; eine KI, die das HTML zitiert, meldet aktuelle Zahlen; das JSON-LD hilft nicht, den Widerspruch aufzulösen.

**✅ Single Source:**

```typescript
// src/data/profile.ts — kanonisch
export const profile = {
  highlights: [
    'Kindle author: 14 books',
    'Qiita: 80,000+ PV',
  ],
};
```

```astro
<!-- Profilkomponente -->
{profile.highlights.map(h => <li>{h}</li>)}
```

```typescript
// src/pages/founder.md.ts
return new Response(
  `# Founder\n\n${profile.highlights.map(h => `- ${h}`).join('\n')}`,
  { headers: { 'Content-Type': 'text/markdown' } }
);
```

Ein Wert lebt an einem Ort. Die HTML-Ansicht, der KI-Markdown-Endpunkt und das JSON-LD entwickeln sich gemeinsam.

## Checkliste

- [ ] Jede faktische Aussage (Zahlen, Adressen, Daten, Kataloge) hat genau eine kanonische Quelldatei
- [ ] KI-exklusive Oberflächen (`llms.txt`, `/ai/*.md`, URL.md-Endpunkte) werden aus denselben Daten wie das HTML erzeugt, nicht parallel von Hand gepflegt
- [ ] Der kanonische Host ist über `<link rel="canonical">`, `og:url`, JSON-LD, Sitemap und Markdown-Oberflächen hinweg konsistent
- [ ] Die Trailing-Slash-Policy ist auf Framework-Ebene festgelegt und in jedem internen Link widergespiegelt
- [ ] Keine zwei JSON-LD-Blöcke beschreiben dieselbe Entität mit unterschiedlichen Werten; Entitäten nutzen stabile `@id` für seitenübergreifende Referenzen
- [ ] CI prüft dateiübergreifende Drift bei wichtigen Kennzahlen (Buchzahlen, PV-Statistiken, Servicelisten)
- [ ] Ein regelmäßiges Zwei-Pass-Audit (Selbstprüfung → KI-Zweitmeinung) fängt Drift zwischen Releases ab — siehe [LLMO-Audit: Zwei-Pass-Review](/guide/llmo-audit-two-pass-review/) (auf Englisch)
