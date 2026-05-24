---
title: "Dogfooding du LLMO Score v0.1: nous avons passé le checker sur nos 6 sites"
description: "Nous avons mesuré 6 sites que nous exploitons avec le nouveau CLI llmo-checker. Tous ont obtenu 90 ou plus. Le résultat le plus intéressant est celui que nous avons failli publier — et qu'il a fallu retirer juste avant la mise en ligne."
pubDate: 2026-05-24
---

Le premier **Public Experiment Log** de l'Open LLMO Research Initiative.

Nous venons de publier [`llmo-checker`](https://github.com/open-llmo/llmo-checker), un CLI de style Lighthouse qui mesure à quel point une URL est récupérable par une IA (v0.1 Draft). La première chose que nous avons faite avec, c'est le pointer sur chaque site que nous exploitons.

Le titre du résultat, après correction: **les six propriétés que nous possédons ont toutes obtenu 90 ou plus**. L'artefact le plus utile de cette expérience est ce qui s'est passé pendant cette *correction* — raconté en détail plus bas.

## Méthodologie

- Outil: `npx llmo-checker <url>` v0.1.0
- Date: 2026-05-24
- Sites: 6 propriétés que nous possédons ou exploitons
- Score: moyenne pondérée de 5 vérifications statiques — `llms-txt` (poids 20), `robots-ai` (15), `canonical` (15), `jsonld` (20), `meta` (15)
- Bandes de score: 85+ bien ancré · 65–84 à retravailler · 40–64 faible · 0–39 critique

Toutes les vérifications sont des requêtes HTTP pures et du parsing HTML. En v0.1, il n'y a pas de simulation de citation par IA: le score mesure le **substrate** qu'un crawler IA peut réellement voir.

## Résultats

| Site | Rôle | Score | Bande | Check le plus faible |
|---|---|---|---|---|
| `llmoframework.com` | Site de cette initiative | **96** | bien ancré | `llms-txt` sans liste de liens (cosmétique) |
| `kenimoto.dev` | Site personnel de l'auteur | **96** | bien ancré | idem |
| `propel-lab.co.jp` | Site institutionnel du laboratoire | **94** | bien ancré | `<meta name="description">` de 47 caractères (zone idéale 80–200) |
| `legacydram.com` | Média whisky × ingénierie | **93** | bien ancré | JSON-LD partiel (pas de `Organization`/`Person`) |
| `mypcrig.com` | Curation de configs PC | **90** | bien ancré | Pas de `hreflang` (ok pour un site monolingue) + JSON-LD partiel |
| `kaoriq.com` | E-commerce de parfums | **90** | bien ancré | Pas de règles explicites pour les bots IA dans robots.txt |

Médiane 93, minimum 90. Aucun site sous la bande « bien ancré ».

C'est un tableau nettement moins dramatique que celui que nous avons failli publier.

## Ce dont cette expérience a failli parler

La première version de cette entrée avait un autre titre: **« Notre propre site institutionnel a obtenu 29 / 100, le pire résultat du test. »** Exactement le genre de rapport auto-critique qui donne de la crédibilité à un nouveau projet de mesure.

Voici l'histoire qu'elle racontait. Nous avions mesuré `propel-lab.com` et obtenu 29 / 100 — bande critique. Nous avions fait un `curl` sur la racine et trouvé une ligne de HTML:

```bash
$ curl -s https://propel-lab.com/
<!DOCTYPE html><html><head><script>window.onload=function(){window.location.href="/lander"}</script></head></html>
```

Une redirection via `window.location.href` vers `/lander`, invisible pour tout crawler IA que nous connaissons. Ensuite nous avons passé le checker sur `/lander` lui-même, et obtenu **31 / 100**, également critique. Deux couches, les deux qui échouent. Nous avions une fable morale impeccable: un laboratoire orienté LLMO dont le `.com` institutionnel échoue au test de substrate qu'il prêche.

Nous avons failli publier.

## Ce qui a arrêté la machine

Avant la mise en ligne, nous avons relancé un `curl` sur ce HTML de destination. Trois signatures ont sauté:

```html
<script>window.LANDER_SYSTEM="PW"</script>
<script src="https://www.google.com/adsense/domains/caf.js"></script>
<script src="https://img1.wsimg.com/parking-lander/static/js/main.be9a3b28.js"></script>
```

C'est l'empreinte d'une **page de domaine parqué** — `wsimg.com/parking-lander` est un template de parking hébergé par un tiers, servi avec Google AdSense for Domains. La page tourne en mode parking, pas en site institutionnel.

Nous ne sommes pas propriétaires de `propel-lab.com`. Nous ne l'avons jamais été. Le site institutionnel, c'est `propel-lab.co.jp`, qui a obtenu **94 / 100** — bien ancré, troisième du tableau.

Notre fable morale parlait d'un domaine parqué par quelqu'un d'autre.

## Pourquoi nous laissons cet épisode dans le log

La tentation, après avoir attrapé un quasi-accident comme celui-ci juste avant la publication, c'est de corriger discrètement le brouillon et d'envoyer la version honnête et sans relief, sans aucune trace de l'incident. Nous ne le faisons pas. Trois raisons:

1. **Une initiative LLMO qui cache ses quasi-accidents revient au même qu'une qui cache ses mauvais scores.** Si la falsifiabilité est érigée en principe, il faut laisser des traces des falsifications.
2. **Le motif du domaine parqué est un cas réel d'échec de substrate.** Quiconque enregistre un `.com` pour le branding mais n'y sert jamais de vrai site fournit aux crawlers IA un substrate de la même forme que `propel-lab.com`. Cet enseignement reste le même, quel que soit le propriétaire du domaine.
3. **Le dogfooding nous a livré un dataset rempli uniquement de 90+.** C'est trop propre pour être la preuve que nous espérions. Si on mesure son propre travail et que le pire score est 90, on a appris qu'on écrit ses sites en cohérence avec son propre standard — pas que le standard prédit quoi que ce soit d'utile.

La question de fond — « le LLMO Score prédit-il vraiment le comportement de citation par les IA ? » — n'est pas tranchée par un self-audit de six sites où tout passe. Il faut un panel externe de référence et un pilote de corrélation avec citation. Ce sont les deux prochains Experiment Logs.

## Ce que nous changeons malgré tout sur nos propres sites

Même sans l'histoire du domaine parqué, le tableau pointe de petits ajustements à faire:

1. **Description de `propel-lab.co.jp`** — actuellement 47 caractères, idéal 80–200. À étendre à la même longueur que les autres descriptions institutionnelles du portefeuille
2. **Améliorer la couverture JSON-LD de `mypcrig.com` et `kaoriq.com`** — les deux sont à 82 / 100 sur `jsonld` parce qu'ils émettent certains, mais pas tous les types pertinents (`Product`, `Person`, `Article`)
3. **Ajouter une politique explicite pour les bots IA dans le robots.txt de `kaoriq.com`** — actuellement neutre; nous voulons un opt-in explicite pour GPTBot / ClaudeBot / Google-Extended
4. **Ajouter une liste de liens au `/llms.txt` de `llmoframework.com` et `kenimoto.dev`** — les fichiers actuels contiennent de la prose mais pas de section de liens; tous deux perdent une petite portion du poids `llms-txt`

Quand ce sera fait, nous publierons un Experiment Log de suivi avec les scores remesurés. Honnêtes sur le delta, qu'il y en ait un ou pas.

## Ce que nous n'avions pas prévu d'apprendre

La leçon la plus nette ne porte pas sur le substrate. Elle porte sur la discipline narrative.

Au moment où le score 29 de `propel-lab.com` est revenu, le premier mouvement a été de bâtir un récit autour du chiffre. Le récit tenait, allait à contre-courant, aurait fait un post bien partagé. C'est le chiffre qui rendait le récit possible.

Le fait que nous possédions `propel-lab.com` a été présumé sans vérification. C'est le genre de présupposé qu'un bon récit renforce, parce qu'admettre la faille fait s'effondrer tout le post. Nous l'avons attrapé par accident — en lançant un `curl` supplémentaire sur une autre partie du HTML pour chercher d'autres trouvailles, pas pour remettre la prémisse en cause.

Pour un projet dont la proposition de valeur est *mesurez votre substrate IA avant de présumer ce qu'il est*, avoir failli publier un texte fondé sur **ne pas mesurer la propriété d'un domaine avant de présumer de quoi il s'agissait**, c'est le bon type d'embarras.

## Limites de cette expérience

- v0.1 ne mesure que le substrate. Un site peut atteindre 95 sur le substrate et obtenir tout de même zéro citation par les IA, parce que le contenu lui-même est sans intérêt, contredit des faits connus, ou duplique des sources d'autorité plus haute. Citation Visibility est réservé à v0.2.
- Les poids du score (`llms-txt` 20, `robots-ai` 15, `canonical` 15, `jsonld` 20, `meta` 15) sont fixés par les auteurs et non validés. Ce sont des valeurs par défaut raisonnables, pas dérivées de données de résultat. Nous comptons les recalibrer au fur et à mesure que nous collecterons des données de résultat de citation en Phase 2.
- Nous n'avons testé que les pages d'accueil. Les pages d'article sur chaque site peuvent avoir des scores différents.
- Le dataset, ce sont six sites que nous avons rédigés nous-mêmes selon notre propre standard. Il ne dit rien sur le caractère généralisable du standard.

## Reproduire l'expérience

```bash
npx llmo-checker@0.1.0 https://llmoframework.com/
npx llmo-checker@0.1.0 https://kenimoto.dev/
npx llmo-checker@0.1.0 https://propel-lab.co.jp/
npx llmo-checker@0.1.0 https://legacydram.com/
npx llmo-checker@0.1.0 https://mypcrig.com/
npx llmo-checker@0.1.0 https://kaoriq.com/
```

Ajoutez `--json` pour une sortie lisible par machine. Épinglez la version (`@0.1.0`); la forme du JSON peut changer en v0.2.

Pour reproduire la détection du domaine parqué, lancez aussi:

```bash
npx llmo-checker@0.1.0 https://propel-lab.com/
npx llmo-checker@0.1.0 https://propel-lab.com/lander
curl -s https://propel-lab.com/lander | head -1
```

Les deux premiers renverront des scores critiques. Le troisième fera ressortir les marqueurs `LANDER_SYSTEM` / `parking-lander` / `adsense/domains` dans le HTML.

## La suite

C'est la première entrée d'une série de Public Experiment Logs. Les deux prochains que nous prévoyons de faire tourner:

- **Panel de référence externe** — noter quelques dizaines de sites techniques à fort trafic (portails de documentation, blogs de devs, sites marketing de produit) et publier la distribution. Ça calibre à quoi « normal » ressemble — la comparaison que ce self-audit seul ne peut pas faire.
- **Pilote de corrélation citation** — pour ~50 URLs, comparer le LLMO Score à la vraie fréquence de citation par les IA (sondage de ChatGPT, Claude et Perplexity). C'est le premier vrai test pour savoir si le score prédit bien le résultat qu'il prétend prédire.

La feuille de route complète se trouve dans [Experimental Projects](/fr/experimental-projects/), et les poids du v0.1 sont définis dans la [Spécification Draft du Score v0.1](/fr/specifications/score-v01/).

## Mise à jour (24/05/2026, le même jour) : re-mesuré après livraison des quatre fixes

Les quatre fixes listés dans « Ce que nous changeons encore sur nos propres sites » ont été déployés le même jour que le post original, en deux vagues. Re-mesuré avec `llmo-checker@0.1.0` :

| Site | Avant | Après | Ce qui a aidé |
|---|---|---|---|
| `llmoframework.com` | 96 | **99** | Section `## Links` dans `/llms.txt` convertie en entrées `- [title](url)` conformes au spec (llms-txt 90 → 100) |
| `kenimoto.dev` | 96 | **99** | Même fix : `## Links`, `## Books`, `## Blog Articles` et `## Research Papers` réécrites comme entrées `[title](url)` (llms-txt 90 → 100) |
| `kaoriq.com` | 93 | **96** | Ajout d'un schema `Person` comme `@type` indépendant sur la home (auparavant imbriqué dans `Organization.founder`, le score ne le compte qu'une fois) — jsonld 82 → 94 |
| `mypcrig.com` | 90 | **93** | Même fix : `Person` promu dans son propre bloc `@type` — jsonld 82 → 94 |
| `propel-lab.co.jp` | 96 | 96 | `<meta name="description">` avait déjà été étendu de 47 à 129 caractères dans la vague v1.5.1 |

Les deltas sont exactement ce que la règle de scoring publiée prédit : `llms-txt` a un poids de 20 × le saut de 10 points (90 → 100) = +2 au total (arrondi à +3 par l'arrondi par check), et le bump de comptage `@type` dans `jsonld` (+12 par `@type` reconnu, poids 20 %) atterrit comme ~+2,4 sur le total. Ce type de prévisibilité explicite est exactement ce qu'un score transparent style Lighthouse gagne en sous-produit — et c'est la propriété que nous chercherons, en direction inverse, quand les données du panel de baseline externe arriveront.

Les fixes étaient petits en lignes (chacun a pris moins d'une heure, build et vérification de deploy inclus), ce qui est le takeaway plus honnête : le score n'a rien désigné de mystérieux ou de difficile à réparer. Il a désigné quatre choses mécaniques que nous n'avions pas encore nettoyées, et une fois mesurées, elles étaient suffisamment petites pour être livrées toutes ensemble en une seule vague de follow-up.

Ce que cela n'a **pas** prouvé : qu'aucun de ces deltas corrèle avec le comportement de citation par IA en aval. C'est toujours le travail de l'Experiment Log #3. Cette mise à jour confirme seulement que le score est cohérent en interne — les fixes produisent les deltas que le spec prédit. Le panel externe et le pilote de corrélation citation restent le vrai chemin de validation.
