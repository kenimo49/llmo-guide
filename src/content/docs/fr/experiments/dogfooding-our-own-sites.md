---
title: "Dogfooding du LLMO Score v0.1: nous avons passé le checker sur nos 6 sites"
description: "Nous avons mesuré 6 sites que nous exploitons — y compris le site corporate du laboratoire derrière LLMOFramework — avec le nouveau CLI llmo-checker. Le site corporate a obtenu 29 / 100."
pubDate: 2026-05-24
---

Le premier **Public Experiment Log** de l'Open LLMO Research Initiative.

Nous venons de publier [`llmo-checker`](https://github.com/open-llmo/llmo-checker), un CLI de style Lighthouse qui mesure à quel point une URL est récupérable par une IA (v0.1 Draft). La première chose que nous avons faite avec, c'est le pointer sur chaque site que nous exploitons, y compris le site corporate du laboratoire qui maintient cette initiative.

Le titre du résultat: **notre propre site corporate a obtenu 29 / 100**, plus bas que n'importe lequel des sites grand public auxquels il est censé servir de référence.

## Méthodologie

- Outil: `npx llmo-checker <url>` v0.1.0 (commit `1db47ea`)
- Date: 2026-05-24
- Sites: 6 propriétés que nous possédons ou exploitons
- Score: moyenne pondérée de 5 vérifications statiques — `llms-txt` (poids 20), `robots-ai` (15), `canonical` (15), `jsonld` (20), `meta` (15)
- Bandes de score: 85+ well-grounded · 65–84 needs work · 40–64 poor · 0–39 critical

Toutes les vérifications sont des fetches HTTP purs et du parsing HTML. En v0.1, il n'y a pas de simulation de citation par IA: le score mesure le **substrate** qu'un crawler IA peut réellement voir.

## Résultats

| Site | Rôle | Score | Bande | Check le plus faible |
|---|---|---|---|---|
| `llmoframework.com` | Site de cette initiative | **96** | well-grounded | `llms-txt` sans liste de liens (cosmétique) |
| `kenimoto.dev` | Site personnel de l'auteur | **96** | well-grounded | idem |
| `legacydram.com` | Média whisky × ingénierie | **93** | well-grounded | JSON-LD partiel (pas de `Organization`/`Person`) |
| `mypcrig.com` | Curation de configs PC | **90** | well-grounded | Pas de `hreflang` (ok pour un site monolingue) + JSON-LD partiel |
| `kaoriq.com` | E-commerce de parfums | **90** | well-grounded | Pas de règles explicites pour les bots IA dans robots.txt |
| **`propel-lab.com`** | **Site corporate du laboratoire** | **29** | **critical** | Presque tout |

`propel-lab.com` est le site corporate du laboratoire qui maintient cette même initiative. Il a fait pire que chaque site produit grand public que nous livrons.

## Pourquoi le site corporate a échoué

Un `curl` sur la racine raconte toute l'histoire:

```bash
$ curl -s https://propel-lab.com/
<!DOCTYPE html><html><head><script>window.onload=function(){window.location.href="/lander"}</script></head></html>
```

La racine de `propel-lab.com`, c'est **une ligne de HTML**. Une redirection via `window.location.href` s'exécute dans le navigateur et envoie le visiteur vers `/lander`.

Pour un humain sous Chrome, ça marche. Pour tout crawler IA que nous connaissons, c'est invisible. Aucun de GPTBot, ClaudeBot, CCBot, Google-Extended, PerplexityBot ni Applebot-Extended n'exécute JavaScript au moment du fetch. Ils voient le HTML brut ci-dessus et s'arrêtent là.

Sur l'URL racine (la première que la plupart des systèmes d'IA vont sonder), le checker a donc trouvé:

- Pas de `<title>`
- Pas de `<meta name="description">`
- Pas d'OpenGraph
- Zéro élément `<h1>`
- Pas de `<html lang>`
- Pas de JSON-LD
- Pas de `<link rel="canonical">`

Ensuite, nous avons passé le checker sur la **destination de la redirection**, `https://propel-lab.com/lander`. Score **31 / 100**, également critical. La page de destination a du contenu, mais pas de canonical, pas de JSON-LD, et des métadonnées faibles.

Les deux couches échouent.

## Ce que ça veut dire

Il existe un motif courant: les équipes publient une structure "splash → landing" sur le site corporate, supposent que Google gère le JS sans souci, et ne vérifient jamais à quoi la page ressemble pour un crawler sans JS. Cette supposition était à peu près vraie pour la recherche Google. **Elle est largement fausse pour les crawlers IA en 2026.**

Dans notre cas, le site corporate d'un *laboratoire orienté LLMO* est tombé exactement dans ce piège. Nous l'avons attrapé parce que nous avons construit un outil qui nous a forcés à regarder le substrate. Sans l'outil, nous aurions continué à supposer que tout allait bien parce que l'UX côté humain semblait propre.

C'est précisément le sens de publier le checker en OSS. La faille dans le substrate est invisible tant qu'on ne mesure pas.

## Ce que nous allons changer

À la suite de cette expérience, voici ce que nous ajoutons à notre backlog public:

1. **Redirection serveur sur `propel-lab.com/`** — remplacer la redirection JS par un 301 ou rendre le contenu de la landing directement à la racine
2. **Ajouter canonical + JSON-LD `Organization` + métadonnées OG à `/lander`** — porter son score seul de 31 à ≥ 85
3. **Faire tourner le checker comme smoke step** — intégrer l'audit dans notre propre pipeline de déploiement, pour que les régressions futures remontent immédiatement
4. **Améliorer la couverture JSON-LD de `mypcrig.com` et `kaoriq.com`** — les deux sont à 82 / 100 sur `jsonld` parce qu'ils émettent certains, mais pas tous les types pertinents (`Product`, `Person`, `Article`)
5. **Ajouter une politique explicite pour les bots IA dans le robots.txt de `kaoriq.com`** — actuellement neutre; nous voulons un opt-in explicite pour GPTBot / ClaudeBot / Google-Extended

Quand ce sera fait, nous publierons un Experiment Log de suivi avec les scores remesurés. Honnêtes sur le delta, qu'il y en ait un ou pas.

## Pourquoi nous publions la mauvaise note

Quand on livre un outil de mesure, il y a une forte tentation de s'en servir surtout sur les concurrents. Nous faisons délibérément l'inverse: le premier dataset public pour `llmo-checker`, ce sont **nos propres propriétés**, y compris celle qui a eu la pire note.

Deux raisons:

1. **Le score doit être falsifiable.** Si nous ne publions jamais de note d'échec sur quelque chose à nous, personne n'a de raison de croire que la notation est honnête.
2. **La crédibilité de l'initiative vient des artefacts, pas du cadrage.** Un laboratoire qui publie son propre site corporate à 29 / 100 est plus crédible qu'un autre qui publie un manifeste et une auto-évaluation à 100 / 100.

## Limites de cette expérience

- v0.1 ne mesure que le substrate. Un site peut atteindre 95 sur le substrate et obtenir tout de même zéro citation par les IA, parce que le contenu lui-même est sans intérêt, contredit des faits connus, ou duplique des sources d'autorité plus haute. Citation Visibility est réservé à v0.2.
- Les poids du score (`llms-txt` 20, `robots-ai` 15, `canonical` 15, `jsonld` 20, `meta` 15) sont fixés par les auteurs et non validés. Ce sont des valeurs par défaut raisonnables, pas dérivées de données d'outcome. Nous comptons les recalibrer au fur et à mesure que nous collecterons des données d'outcome de citation en Phase 2.
- Nous n'avons testé que les pages d'accueil. Les pages d'article sur chaque site peuvent avoir des scores différents.

## Reproduire l'expérience

```bash
npx llmo-checker@0.1.0 https://llmoframework.com/
npx llmo-checker@0.1.0 https://kenimoto.dev/
npx llmo-checker@0.1.0 https://legacydram.com/
npx llmo-checker@0.1.0 https://mypcrig.com/
npx llmo-checker@0.1.0 https://kaoriq.com/
npx llmo-checker@0.1.0 https://propel-lab.com/
npx llmo-checker@0.1.0 https://propel-lab.com/lander
```

Ajoutez `--json` pour une sortie lisible par machine. Épinglez la version (`@0.1.0`); la forme du JSON peut changer en v0.2.

## La suite

C'est la première entrée d'une série de Public Experiment Logs. Les deux prochains que nous prévoyons de faire tourner:

- **Panel de référence externe** — noter quelques dizaines de sites techniques à fort trafic (portails de documentation, blogs de devs, sites marketing de produit) et publier la distribution. Ça calibre à quoi "normal" ressemble.
- **Pilote de corrélation citation** — pour ~50 URLs, comparer le LLMO Score à la vraie fréquence de citation par les IA (sondage de ChatGPT, Claude et Perplexity). C'est le premier vrai test pour savoir si le score prédit bien l'outcome qu'il prétend prédire.

La feuille de route complète se trouve dans [Experimental Projects](/fr/experimental-projects/), et les poids du v0.1 sont définis dans la [Score v0.1 Draft Specification](/fr/specifications/score-v01/).
