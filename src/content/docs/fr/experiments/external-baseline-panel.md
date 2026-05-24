---
title: "Public Experiment Log #2 : panel de référence externe"
description: "Nous avons noté 39 sites techniques à fort trafic avec llmo-checker@0.1.0 pour calibrer à quoi « normal » ressemble. La médiane est de 61. Trois des plus gros portails de documentation tombent sous 40."
---

Le premier Public Experiment Log notait six sites que nous possédons. Tous les six ont atterri à 90+. Nous étions honnêtes : c'était trop propre pour servir de preuve de quoi que ce soit. Voici la calibration que le premier log ne pouvait pas fournir : un panel de 39 sites techniques à fort trafic que nous ne possédons pas, notés avec le même outil, le même jour.

Le résultat principal est à la fois banal et inconfortable. La partie banale : la médiane est de 61, avec un écart-type de 19,5 — une distribution d'allure normale, centrée nettement en dessous de « bien ». La partie inconfortable : trois des portails de documentation parmi les plus visités du web moderne — `rust-lang.org`, `tailwindcss.com`, `djangoproject.com` — tombent sous 40.

## Méthodologie

Un panel de 40 URLs a été sélectionné pour couvrir trois catégories : documentation à destination des développeurs (20), sites marketing de produit (12) et blogs d'ingénierie (6). Deux autres (`docs.anthropic.com`, `platform.openai.com/docs/`) ont été ajoutés à part comme paire de contrôle « docs de fournisseur IA ». La sélection a été faite avant le run de mesure ; aucune URL n'a été ajoutée ou retirée en fonction du score.

Les 40 URLs ont été mesurées avec `llmo-checker@0.1.0` en un seul batch, avec un délai d'une seconde entre les requêtes. Une URL (`platform.openai.com/docs/`) a renvoyé une erreur de parsing et a été écartée, ce qui laisse **n = 39**.

Le même User-Agent (`llmo-checker/0.1.0`) a été utilisé pour chaque requête, identique à ce qu'un crawler IA lisant nos recommandations enverrait. Aucun site n'a été remesuré ; la première mesure fait foi.

## Résultats

| Statistique | Valeur |
|---|---|
| n | 39 |
| Moyenne | 58,8 |
| Médiane | 61 |
| Écart-type | 19,5 |
| Q1 / Q3 | 45 / 69 |
| Min / Max | 23 / 94 |

### Distribution des scores (paliers de 10 points)

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

La distribution est grossièrement bimodale : un cluster autour de 40–49 (sites de début à milieu de gamme avec une lisibilité machine faible) et un plus gros autour de 60–69 (sites de milieu de gamme avec la plupart des choses faites, mais `jsonld` et/ou `llms.txt` manquants).

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

### Par catégorie

| Catégorie | n | Médiane | Moyenne | Plage |
|---|---|---|---|---|
| Marketing produit | 12 | 68,5 | 74,8 | 58–94 |
| Blog de dev | 6 | 65,0 | 65,3 | 44–80 |
| Documentation | 20 | 45,5 | 48,0 | 23–93 |

### Médianes par check

| Check | Médiane | Moyenne | Plage |
|---|---|---|---|
| `llms-txt` | 90 | 54,9 | 0–100 |
| `robots-ai` | 80 | 78,7 | 60–100 |
| `canonical` | 90 | 67,9 | 0–100 |
| `jsonld` | **0** | 26,1 | 0–94 |
| `meta` | 80 | 78,5 | 0–100 |

## Ce qui nous a surpris

**Les sites de documentation sont la catégorie la plus faible.** C'est la prédiction que nous aurions ratée si on nous avait demandé à l'avance. Notre hypothèse par défaut — comme celle de tout le monde, avant que les données arrivent — était que les portails de docs seraient la *meilleure* catégorie, parce qu'ils sont depuis toujours une source d'autorité curée pour les humains comme pour les moteurs de recherche. Les données disent l'inverse : le score médian des documentations (45,5) est plus de 20 points en dessous de la médiane du marketing produit (68,5). Les portails de documentation sont largement aimés, matures et bien construits pour les humains, mais les mêmes équipes n'ont pas, en moyenne, investi sur la surface lisible par machine.

**Le plancher schema.org est très bas.** Le score `jsonld` médian du panel est de **0**. Plus de la moitié de ces sites techniques bien connus n'émettent aucun `@type` JSON-LD reconnaissable. La moyenne est tirée à 26 par un petit nombre de sites bien instrumentés (surtout du marketing produit). Un score `jsonld` à 0 ne signifie pas que le site est cassé — cela signifie qu'il n'y a pas de surface d'entity-graph sur laquelle un crawler IA puisse ancrer une citation.

**`llms.txt` est bimodal, pas progressif.** La médiane est de 90, mais la moyenne de 54,9. Soit un site a investi sur un `/llms.txt` conforme au spec (90 et 100 propres), soit il n'a pas du tout le fichier (0). Très peu de sites sont au milieu. Cela veut dire que le coût pour passer de 0 → 90+ sur `llms-txt` est un seul commit de fichier, pas une migration en plusieurs étapes.

**Les trois scores les plus bas sont des noms connus de tous.** `rust-lang.org` (23), `tailwindcss.com` (25) et `djangoproject.com` (26) sont les URLs aux scores les plus bas de tout le panel. Ce sont aussi, selon toute estimation de trafic raisonnable, parmi les URLs développeurs les plus visitées du web. Le score ne mesure pas le trafic, la notoriété ou la qualité du contenu. Il mesure si un crawler IA peut ancrer une citation sur les métadonnées de la page — et sur cet axe unique, ces trois-là sont au fond.

**La famille `Cloudflare` obtient 93 / 64 / 44 sur trois URLs.** `www.cloudflare.com` (93) est la page produit principale ; `www.cloudflare.com/blog/` (64) est l'index du blog ; `blog.cloudflare.com` (44) est le frontend du blog en sous-domaine. Même org d'ingénierie, trois surfaces différentes, 50 points d'écart. Les organisations multi-sites sont souvent aussi inégales, et notre propre portefeuille le confirme (l'Experiment Log v1.5.1 documentait déjà notre propre écart 90–99 vs 96 vs 94).

## Où se situent les sites que nous possédons

Le premier Experiment Log notait six sites que nous possédons entre 93 et 99. Isolé, le résultat paraissait inconfortablement élevé. Maintenant il a un contexte :

| Site | Score | Percentile dans le panel (approx.) |
|---|---|---|
| `llmoframework.com` | 99 | > 99e |
| `kenimoto.dev` | 99 | > 99e |
| `kaoriq.com` | 96 | > 95e |
| `propel-lab.co.jp` | 96 | > 95e |
| `mypcrig.com` | 93 | > 90e (à égalité avec `supabase.com` et `redis.io`) |
| `legacydram.com` | — | (non remesuré dans ce run) |

Cela place les sites que nous possédons tout en haut d'un panel de 39 sites techniques à fort trafic. Nous ne pensons pas pour autant que notre contenu soit meilleur que celui de `rust-lang.org` ou de `stripe.com`. Cela veut dire que nous avons mesuré et corrigé les cinq mêmes checks mécaniques que le score cible, ce qui est exactement ce qu'un outil construit en interne est censé rendre facile.

C'est la calibration qui manquait au premier log. Le cluster 90+ dans lequel nous nous trouvons n'est pas normal. C'est le cluster des sites qui ont décidé d'optimiser spécifiquement la surface lisible par machine, et sur ce panel, cette décision sépare un petit groupe en haut d'une longue queue dans la bande 40–69.

## Ce que cela ne prouve toujours pas

Le score est cohérent en interne (la mise à jour de l'Experiment Log #1 a confirmé que les fixes produisent les deltas que le spec prédit). Le score dispose désormais aussi d'un panel externe de comparaison. Mais aucun de ces deux faits n'équivaut à prouver qu'un score plus élevé entraîne un taux de citation IA plus élevé.

C'est encore le travail de l'Experiment Log #3 (pilote de corrélation citation). Pour 50 URLs couvrant toute la plage de score — dont une partie du bottom 5 et du top 5 de ce panel — nous comparerons le LLMO Score au taux de citation IA réel (API Perplexity + ChatGPT search + outil web de Claude). Si le score est réel, le bottom 5 de ce panel devrait être nettement moins cité que le top 5, pour des requêtes où n'importe lequel d'entre eux ferait une source crédible.

La version honnête de cette mise à jour : le score a maintenant passé deux des trois tests qu'un outil de mesure doit passer. Il est cohérent en interne (mise à jour v1.5.2) et il produit une distribution non plate face à un panel externe crédible (ce log). Le troisième test — prédit-il le résultat qu'il prétend prédire ? — est celui qui décide si le projet mérite d'être poursuivi.

## Limites

Le panel est petit (n = 39) et anglophone. Aucun site japonais, chinois, allemand ou français n'est dans le run — un choix délibéré pour garder le premier panel concentré, mais une vraie limite pour la calibration multilingue.

Le partage par catégorie est inégal : 20 docs, 12 marketing produit, 6 blogs de dev. Les médianes par catégorie sont donc directionnelles, pas statistiquement serrées (en particulier les blogs de dev à n = 6).

La sélection a été faite par nous, avant le run de mesure. Nous avons essayé de privilégier des URLs techniques connues et à fort trafic pour minimiser l'objection « ils ont cherry-pické des sites faibles », mais on ne peut pas exclure un biais de sélection. La liste brute des URLs est committée à côté de ce post (`experiments/external-baseline-2026-05/urls.txt`) pour que le panel puisse être reproduit ou étendu.

`platform.openai.com/docs/` a été écarté parce que le checker n'a renvoyé aucun JSON parsable. C'est un point de biais de survie ; la comparaison docs de fournisseur IA aurait été plus intéressante avec les deux points qu'avec un seul (`docs.anthropic.com` a obtenu 64).

## Reproduire l'expérience

```bash
git clone https://github.com/open-llmo/llmo-checker
cd llmo-checker
npm install && npm run build

# Récupérer la liste d'URLs et le script de run
cd experiments/external-baseline-2026-05
cat urls.txt          # 40 URLs
bash run-measurements.sh   # produit results/*.json
python3 analyze.py    # affiche le résumé ci-dessus
```

Les fichiers `results/*.json` bruts sont committés ; relancer contre les mêmes URLs avec `llmo-checker@0.1.0` devrait produire des scores à ±1 près de ceux de ce post (les sites changent entre les runs ; un seul nouveau tag `<meta>` peut faire bouger `meta` de 10).

## La suite

La feuille de route est inchangée par rapport à la clôture de l'Experiment Log #1 :

- **Experiment Log #3 — Pilote de corrélation citation.** Pour ~50 URLs réparties sur toute la plage de score, sonder Perplexity / ChatGPT / Claude avec le même jeu de requêtes et calculer la corrélation entre LLMO Score et taux de citation. C'est la vraie validation : le score prédit-il bien ce qu'il prétend prédire ?
- **Pondérations du score v0.2.** Si les données de corrélation citation atterrissent comme attendu, les poids par check seront réajustés pour maximiser la corrélation observée. Sinon, le spec gagne un post de suivi beaucoup plus intéressant.

La feuille de route complète se trouve dans [Experimental Projects](/fr/experimental-projects/), et les poids du score v0.1 sont définis dans la [Spécification Draft du Score v0.1](/fr/specifications/score-v01/).
