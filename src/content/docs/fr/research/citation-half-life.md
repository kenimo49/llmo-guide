---
title: "Demi-vie des citations IA : les citations sont un flux, pas un stock"
description: "Les citations IA décroissent. Une mesure de 90 jours sur protocole fixe sur ChatGPT, Claude et Perplexity a trouvé des demi-vies de 3,2 à 9,1 semaines selon le type de contenu et le moteur — les pages evergreen maintenant les citations environ deux fois plus longtemps que les rapports d'expérience."
pubDate: 2026-07-07
---

**Une citation IA n'est pas un trophée qu'on gagne et qu'on garde. C'est un bien périssable.** Une page que cinq moteurs citent aujourd'hui peut perdre la moitié de ce taux de citation en un mois pendant que son trafic de recherche Google reste stable. Cette page résume les estimations de décroissance publiées, un protocole de mesure reproductible, et les chiffres de demi-vie issus d'une mesure de terrain sur 90 jours.

## Les estimations publiées

Les mesures du secteur en 2026 convergent vers la même forme :

| Constat | Source |
|---|---|
| Demi-vie médiane des citations IA ≈ 4,5 semaines ; ChatGPT renouvelle le plus vite, Perplexity conserve le plus longtemps | Analyse de plateforme Authority Tech |
| Les domaines cités par l'IA se renouvellent de 40 à 60 % chaque mois | Machine Relations |
| Environ la moitié de tout le contenu cité par l'IA a moins de 13 semaines ; les pages mises à jour dans les 30 jours obtiennent plusieurs fois plus de citations | Analyse fraîcheur Authority Tech |

Le mécanisme est structurel, pas un jugement de qualité. Le classement organique de Google pour une page établie est visqueux — les signaux bougent lentement et une semaine tranquille ne la déplace pas. Les citations IA sont tirées d'un index en direct au moment de la réponse, et cet index est biaisé vers les contenus récents. La page ne se dégrade pas ; le pool dans lequel elle concourt rajeunit.

Des recherches récentes sur le retrieval (TempRetriever, arXiv 2502.21024 ; travaux sur la dérive des connaissances dans les limites du RAG, arXiv 2604.05096) modélisent la cause en amont : le retrieval est biaisé vers les contenus récents, et ce biais se renforce quand la question est sensible au temps.

## Pourquoi un protocole fixe est important

"Demi-vie" n'a de sens qu'en rapport avec un protocole figé. Changez l'ensemble de prompts, la cadence ou le critère de succès et le chiffre dérive de semaines — deux personnes citant "4,5 semaines" mesurent peut-être des phénomènes sans rapport. Le protocole reproductible, en cinq règles :

1. **Ensemble de prompts fixe** — dix vraies questions d'utilisateur par page, rédigées avant le jour 0 et figées. Réécrire un prompt en cours d'expérience casse le benchmark.
2. **Trois essais par prompt** — sessions séparées, sans historique. Une "citation" signifie que l'URL apparaît comme source cliquable dans au moins un des trois essais, comptée au niveau du prompt (compter au niveau de la liste de sources sur-pondère les moteurs qui retournent plus de sources — une correction qui a abaissé les chiffres d'une mesure d'environ 15 %).
3. **Cadence hebdomadaire fixe** — même jour de la semaine, même créneau. Une semaine sautée est un trou dans la courbe et un ajustement de pire qualité.
4. **Deux horloges** — enregistrez le taux de citation IA *et* les clics Search Console de la même semaine pour la même URL. Quand les deux courbes bougent ensemble, autre chose s'est passé (panne, changement d'algorithme, lien viral). Le signal est la courbe IA qui bouge pendant que la courbe de recherche tient.
5. **La décroissance est ajustée depuis le pic, pas depuis la semaine 1.** Les taux de citation montent pendant deux à quatre semaines pendant que les moteurs indexent la page, puis décroissent. Mélanger montée et décroissance dans un seul ajustement — l'erreur la plus commune dans les publications publiques — produit des demi-vies plus plates que la réalité.

La partie décroissance s'ajuste à une exponentielle : `cites(t) = peak × 0.5^(t / T_half)`, avec `t` en semaines depuis le pic.

## Les demi-vies mesurées

Un run de 90 jours (13 semaines) de ce protocole sur trois pages d'un site technique, sur ChatGPT (recherche web activée), Claude (mode web par défaut) et Perplexity (Sonar Pro) :

| Type de page | ChatGPT | Claude | Perplexity |
|---|---|---|---|
| Tutoriel evergreen | 6,8 sem. | 7,4 sem. | 9,1 sem. |
| Rapport d'expérience | 3,2 sem. | 3,6 sem. | 4,4 sem. |
| Article méthodologique | 5,1 sem. | 5,9 sem. | 6,7 sem. |

Trois constats, par ordre de surprise :

1. **Le type de contenu domine.** La page evergreen a conservé les citations environ 2× plus longtemps que le rapport d'expérience sur chaque moteur. Les moteurs pondèrent la fraîcheur, mais aussi si la page répond encore à la question — un tutoriel continue à répondre pendant des mois ; un rapport d'expérience s'arrête rapidement. Moyenner tous types de pages reproduit le "≈4,5 semaines" publié tout en cachant l'écart 2× qui importe réellement.
2. **Perplexity décroît le plus lentement sur les trois pages** (ses directives de classement publiées accordent ~15 % de poids à la fraîcheur), **ChatGPT le plus rapidement dans chaque ligne** — cohérent avec les rapports de renouvellement plateforme par plateforme.
3. **Les rafraîchissements restaurent les citations partiellement et inégalement.** Une mise à jour *substantielle* (nouvelle section, nouveau tableau de données) du rapport d'expérience a récupéré ChatGPT à ~70 % du pic en deux semaines, Claude à ~60 %, Perplexity à ~75 % à la semaine 12 — jamais de retour au pic. Un simple changement de date dans un run précédent de neuf semaines n'a rien produit de mesurable. Le lancement initial importe plus que tout rafraîchissement.

Données complètes et protocole : [le compte-rendu méthodologique sur 90 jours](https://kenimoto.dev/blog/measuring-ai-citation-half-life-90-day-methodology/) (en anglais) et [le journal de décroissance initial sur neuf semaines](https://kenimoto.dev/blog/ai-citations-half-life-decay/) (en anglais).

## Conséquences opérationnelles

- **Classifiez chaque page comme evergreen ou à durée limitée avant de publier.** Les pages evergreen reçoivent des rafraîchissements substantiels à la cadence qu'implique la demi-vie (environ toutes les 6 à 8 semaines). Les pages à durée limitée ne sont pas rafraîchies — aucune modification ne rend un rapport d'expérience périmé à nouveau pertinent — elles sont archivées et remplacées.
- **Rapportez les métriques de citation comme des taux dans le temps, jamais comme des instantanés.** "Cité par cinq moteurs" est vrai un lundi et faux le mois suivant. La courbe de tendance sur un ensemble de prompts fixe est la métrique honnête — voir [Mesurer le LLMO](/fr/guide/measuring-llmo/) pour la boucle hebdomadaire dans laquelle cela s'insère.
- **Être cité est un problème de lancement ; rester cité est un problème de rétention.** Les [Signaux de citation](/fr/framework/citation-signals/) gouvernent si vous entrez dans le pool de citations. L'[Autorité](/fr/framework/authority-signals/) et la [Cohérence](/fr/framework/coherence-signals/) — ainsi que la cadence de rafraîchissement — gouvernent si vous y restez.

## Limites de la mesure

Site unique, trois pages, un événement de rafraîchissement — la réponse au rafraîchissement asymétrique selon le moteur pourrait être une différence de pondération de la fraîcheur ou du bruit. Les articles méthodologiques s'autocannibalisent (les moteurs peuvent répondre à de nouveaux prompts avec l'ancien article de mesure). Et une fenêtre de 13 semaines ne peut pas montrer si les demi-vies se raccourcissent davantage à mesure que les index des moteurs grandissent. Traitez les valeurs de demi-vie comme la sortie d'un protocole défendable, pas comme des constantes.
