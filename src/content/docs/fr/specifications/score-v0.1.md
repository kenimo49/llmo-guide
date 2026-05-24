---
title: "LLMOFramework Score v0.1 — Draft Specification"
description: "Définition formelle du LLMOFramework Score v0.1 Draft: 5 vérifications de substrate, poids, règles de notation et schéma JSON. Implémentation de référence: llmo-checker."
pubDate: 2026-05-24
---

> **Status: Draft.** C'est la v0.1, la première version publiée. Poids, liste de vérifications et forme du JSON peuvent changer en v0.2 sans rétro-compatibilité. Épinglez la version du checker si vous dépendez de la forme du JSON.

Le LLMOFramework Score est un nombre unique (0–100) qui résume à quel point une URL est récupérable par une IA. Le score v0.1 ne mesure que des **signaux de substrate** — les signaux statiques qu'un crawler IA peut extraire d'un seul fetch HTTP, sans exécuter de JavaScript, sans appeler de LLM et sans simuler le retrieval.

L'implémentation de référence est le CLI OSS [`llmo-checker`](https://github.com/open-llmo/llmo-checker), maintenu par l'Open LLMO Research Initiative.

## Principes de conception

1. **Substrate avant comportement.** v0.1 mesure les signaux qu'un crawler IA peut extraire d'un seul fetch HTTP. Les signaux comportementaux (citation, stabilité du retrieval, lecture par LLM) sont reportés à v0.2+.
2. **Reproductible.** Chaque vérification est une fonction pure du HTML, robots.txt et llms.txt obtenus par fetch. Aucun autre appel réseau, aucun appel IA, aucun comportement dépendant de l'horloge.
3. **Notation falsifiable.** Chaque vérification publie sa règle de notation. Si vous n'êtes pas d'accord avec une règle, vous pouvez faire tourner le checker et la spec côte à côte et montrer où ils divergent.
4. **Poids honnêtes.** Les poids de v0.1 sont des valeurs par défaut fixées par les auteurs, pas dérivées de données d'outcome. La v0.2 recalibre à l'aide du [pilote de corrélation citation](/fr/experiments/dogfooding-our-own-sites/).

## Composition du score

Le score est une moyenne pondérée de 5 vérifications:

| ID | Poids | Mesure |
|---|---|---|
| `llms-txt` | 20 | Présence et structure de `/llms.txt` |
| `robots-ai` | 15 | Posture explicite vis-à-vis des crawlers IA connus dans `/robots.txt` |
| `canonical` | 15 | Justesse de `<link rel="canonical">` et alternatives `hreflang` |
| `jsonld` | 20 | Présence, parsabilité et types schema.org reconnus du JSON-LD |
| `meta` | 15 | `<title>`, `<meta name="description">`, OpenGraph, `<h1>`, `<html lang>` |

Poids total en v0.1: **85**. Les scores sont normalisés à 0–100 via la moyenne pondérée.

### Bandes de score

| Bande | Score | Interprétation |
|---|---|---|
| Vert | 85–100 | Bien ancré pour le retrieval IA |
| Jaune | 65–84 | À retravailler — plusieurs signaux manquent ou sont faibles |
| Jaune | 40–64 | Faible — lacunes significatives dans le substrate |
| Rouge | 0–39 | Critique — la page est largement invisible pour les crawlers IA |

## Spécifications par vérification

### `llms-txt` (poids 20)

**Fetch:** `GET {origin}/llms.txt`

**Notation:**

| Condition | Impact sur le score |
|---|---|
| HTTP 404 ou 5xx | 0 |
| Body vide | 10 |
| Body non vide (base) | 60 |
| Ligne de titre `# Title` au sommet présente | +15 |
| Au moins un en-tête `## Section` | +10 |
| ≥ 3 entrées de lien au format `^- \[` | +15 |
| 1–2 entrées de lien | +8 |
| 0 entrée de lien | +5 |

**Status:** `pass` ≥ 85, `warn` ≥ 60, sinon `fail`.

Spec de référence: [llmstxt.org](https://llmstxt.org/).

### `robots-ai` (poids 15)

**Fetch:** `GET {origin}/robots.txt`

**User-agents IA reconnus (v0.1):** `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`, `ClaudeBot`, `Claude-Web`, `anthropic-ai`, `CCBot`, `Google-Extended`, `PerplexityBot`, `Applebot-Extended`, `cohere-ai`.

**Notation:**

| Condition | Impact sur le score |
|---|---|
| HTTP 404 | 60 (warn — posture explicite recommandée) |
| HTTP 5xx | 0 |
| Body parsable (base) | 70 |
| ≥ 3 bots IA reconnus mentionnés explicitement | +20 |
| 1–2 bots IA mentionnés | +10 |
| Groupe avec `User-agent: *` wildcard présent | +10 |

**Status:** `pass` ≥ 85, `warn` ≥ 60, sinon `fail`. Le score est plafonné à 100.

La mention elle-même compte, quelle que soit la règle (`Allow` ou `Disallow`). v0.1 consigne `disallowedBots` dans la sortie JSON mais ne pénalise pas Disallow — opter pour l'exclusion des crawlers IA est une posture valable.

### `canonical` (poids 15)

**Source:** le HTML obtenu par fetch.

**Notation:**

| Condition | Impact sur le score |
|---|---|
| Pas de `<link rel="canonical">` | 0 (fail) |
| `href` n'est pas une URL valide | 20 (fail) |
| Canonical pointe vers un autre origin | 60 (warn) |
| Canonical pointe vers le même origin (base) | 90 (pass) |
| `<link rel="alternate" hreflang>` présent | +10 |

**Status:** `pass` si canonical présent et même origin, `warn` pour cross-origin, sinon `fail`. Le score est plafonné à 100.

Le canonical cross-origin est voulu pour les miroirs republiés, mais il est déprécié par défaut parce qu'il s'agit plus souvent d'une mauvaise configuration.

### `jsonld` (poids 20)

**Source:** tous les blocs `<script type="application/ld+json">` dans le HTML obtenu par fetch.

**Types d'entité schema.org reconnus (v0.1):** `Organization`, `Person`, `Article`, `BlogPosting`, `TechArticle`, `Book`, `WebSite`, `WebPage`, `BreadcrumbList`, `FAQPage`, `HowTo`, `Product`, `SoftwareApplication`.

**Notation:**

| Condition | Impact sur le score |
|---|---|
| Aucun bloc JSON-LD | 0 (fail) |
| Au moins un bloc parsable (base) | 50 |
| Par `@type` reconnu (plafonné à 3) | +12 chacun |
| `Organization` ou `Person` présent | +8 |
| Un bloc échoue au parsing | −20 |

Le checker parcourt les tableaux `@graph` récursivement pour collecter les types.

**Status:** `pass` ≥ 85, `warn` ≥ 50, sinon `fail`. Le score est borné à 0–100.

### `meta` (poids 15)

**Source:** `<head>` et premier `<body>` du HTML obtenu par fetch.

**Notation:**

| Signal | Impact sur le score |
|---|---|
| `<title>` de 20–70 caractères | +20 |
| `<title>` présent mais hors 20–70 | +10 |
| `<meta name="description">` de 80–200 caractères | +20 |
| Description présente mais hors 80–200 | +10 |
| OpenGraph `title` + `description` présents | +20 |
| OpenGraph `type` présent | +10 |
| Exactement un `<h1>` | +20 |
| Attribut `<html lang>` présent | +10 |

**Status:** `pass` ≥ 85, `warn` ≥ 60, sinon `fail`. Le score est plafonné à 100.

## Schéma JSON

La sortie `--json` du CLI et l'API programmable renvoient:

```typescript
interface CheckerReport {
  url: string;              // URL d'entrée résolue
  origin: string;           // URL.origin de la page
  timestamp: string;        // ISO 8601
  checkerVersion: string;   // semver du CLI
  scoreVersion: "0.1";      // version de cette spécification
  score: number;            // moyenne pondérée, 0-100
  checks: CheckResult[];
}

interface CheckResult {
  id: string;               // identifiant stable de la vérification (ex: "llms-txt")
  name: string;             // nom d'affichage lisible
  status: "pass" | "warn" | "fail" | "skip";
  score: number;            // 0-100
  weight: number;           // contribution au score global
  details: Record<string, unknown>;  // données spécifiques à la vérification
  notes: string[];          // notes lisibles, orientées action
}
```

**Garanties de stabilité pour v0.1:**

- Les noms des champs de premier niveau (`url`, `origin`, `timestamp`, `checkerVersion`, `scoreVersion`, `score`, `checks`) sont stables sur toutes les releases 0.1.x
- L'`id`, le `weight` et la forme générale de `status`/`score` de chaque vérification sont stables
- La forme de `details` **n'est pas stable** à l'intérieur de 0.1.x — de nouveaux champs peuvent être ajoutés en patch
- L'ensemble des `id` dans `checks` est stable dans 0.1.x (pas de nouvelle vérification sans release v0.2)

## Codes de sortie (CLI)

| Code | Signification |
|---|---|
| 0 | Score ≥ 50 (passe le minimum) |
| 1 | Score < 50 (en dessous du minimum) |
| 2 | Erreur de fetch (réseau, DNS, réponse non-2xx) |

Cela rend le CLI utilisable comme smoke check en CI: un site qui échoue fait échouer le pipeline.

## Implémentation de référence

Source: [`open-llmo/llmo-checker`](https://github.com/open-llmo/llmo-checker)

```bash
npx llmo-checker https://example.com
npx llmo-checker https://example.com --json
```

Nécessite Node.js 20+.

Si l'implémentation de référence et cette spec divergent, la spec est correcte sur l'intention et c'est l'implémentation qu'il faut corriger — merci d'[ouvrir une issue](https://github.com/open-llmo/llmo-checker/issues).

## Ce que la v0.1 ne mesure délibérément pas

Voici des préoccupations LLMO valides que nous n'avons pas incluses en v0.1, avec les raisons:

| Indicateur | Raison du report |
|---|---|
| Citation Visibility | Demande de sonder des assistants IA. Hors champ d'une vérification purement statique. Prévu en v0.2 comme vérification opt-in optionnelle. |
| Chunk Readability | Demande un choix de stratégie de chunking. La v0.2 utilisera un chunker par défaut documenté pour que la vérification reste reproductible. |
| Markdown Quality | Ne s'applique que si une source Markdown est publiée. La v0.2 détectera les endpoints de type `/index.md`. |
| Qualité / exactitude du contenu | Hors champ. Le score mesure le substrate, pas la qualité éditoriale. |
| Stabilité du retrieval dans le temps | Demande un sondage longitudinal. Réservé au projet Benchmark, pas au Score par URL. |

## Politique de versionnage

La version du score est indépendante de la version de l'implémentation de référence. La v0.1 du score peut être implémentée par `llmo-checker@0.1.x` (n'importe quel patch). La v0.2 du score nécessitera `llmo-checker@0.2.x`.

Des changements incompatibles entre versions mineures du score (0.1 → 0.2) sont attendus pendant la phase Draft. Nous ne publierons une spécification 1.0 qu'une fois la Phase 2 (Community) close — c'est-à-dire une fois que nous aurons des données d'outcome du pilote de corrélation citation, que des implémentations externes existeront et que les poids auront été recalibrés.

## Contribuer

Les changements de spec passent par des issues sur le [repo llmo-guide](https://github.com/kenimo49/llmo-guide/issues) (source de ce site).

Lors de la proposition d'une nouvelle vérification ou d'un changement de poids:

1. Nommer le signal et dire en une phrase ce qu'il mesure
2. Donner la règle de notation (doit être déterministe à partir d'un fetch HTTP sauf en v0.2+)
3. Citer un papier, une expérience publique ou un argument à la Lighthouse pour le poids
4. Fournir un reproducteur (une URL qui score haut et une URL qui score bas sous la règle proposée)

Les changements d'implémentation passent par [`open-llmo/llmo-checker`](https://github.com/open-llmo/llmo-checker).

## Remerciements

La structure du score est fortement inspirée de [Lighthouse](https://developer.chrome.com/docs/lighthouse/) (Google) et de la [proposition llms.txt](https://llmstxt.org/) (Jeremy Howard). Les deux sont bien conçus, opinionnés et falsifiables — propriétés que nous essayons de préserver.
