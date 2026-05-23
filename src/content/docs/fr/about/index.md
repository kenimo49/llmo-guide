---
title: "À propos de l'Open LLMO Research Initiative"
description: "Mission, principes de recherche, Founder et feuille de route des Phases de l'Open LLMO Research Initiative."
pubDate: 2026-05-24
---

L'**Open LLMO Research Initiative** est une initiative de recherche indépendante sur le retrieval, la citation et le grounding pour le web ouvert dans le contexte de l'IA. Elle publie des spécifications, des benchmarks et des outils open-source comme livrables principaux.

## Mission

Rechercher le retrieval AI-native, la grounding visibility et l'architecture de l'information orientée LLM, et publier des métriques et spécifications reproductibles.

### Domaines de recherche

| Domaine | Portée |
|---------|--------|
| AI Citation Analysis | Conditions dans lesquelles les LLM citent du contenu, et fréquence de citation |
| Grounding Visibility | Méthodes pour rendre visible ce sur quoi l'IA fonde ses réponses |
| LLM Retrieval Optimization | Optimisation des documents pour la couche de retrieval des LLM |
| AI-native Documentation | Recherche sur les formats de document que les LLM traitent bien |
| Agent-oriented Information Architecture | Structures d'information que les agents d'IA peuvent manipuler |

## Pourquoi cette Initiative

L'espace LLMO / AEO / GEO se développe rapidement, mais trois pièces fondamentales manquent :

- **Aucune mesure reproductible** — il n'existe aucun outil public qui joue le rôle de Lighthouse ou PageSpeed Insights pour la découvrabilité par IA
- **Aucun vocabulaire ni périmètre partagé** — chaque fournisseur publie ses propres définitions et le champ s'est fragmenté
- **Peu de données expérimentales ouvertes** — les outils SEO commerciaux dominent et la couche de recherche est mince

Cette Initiative est conçue pour combler ces trois lacunes. L'objectif est de jouer pour LLMO le rôle que Lighthouse joue pour SEO : publier la méthodologie, livrer les outils et laisser la communauté construire par-dessus.

## Principes de recherche

| Principe | Sens |
|----------|------|
| Reproducibility first | Chaque métrique est livrée avec sa formule de calcul et un checker OSS |
| Draft over Standard | Les spécifications sont publiées en "Draft / Experimental / Proposal v0.1" pour rester révisables |
| Open Source first | Outils sous licences OSS, données sous CC BY, spécifications sous MIT |
| Solo-honest | Le fonctionnement solo est déclaré explicitement, plutôt que travesti en consortium |

## Founder

[Ken Imoto](https://kenimoto.dev). Auteur de plusieurs livres sur LLMO et harness engineering, publiés sur Zenn et Amazon Kindle. Fondateur et CEO de Propel-Lab Inc. Responsable de l'implémentation et du fonctionnement de plusieurs frameworks internes et de llmoframework.com.

Publications principales :

- Livres : [Liste complète (kenimoto.dev/books)](https://kenimoto.dev/books/)
  - Série LLMO (Kindle / Zenn Book, en japonais, anglais, portugais et espagnol)
  - Série harness engineering (Kindle / Zenn Book)
- Web : [kenimoto.dev](https://kenimoto.dev) / [propel-lab.co.jp](https://propel-lab.co.jp)
- Page auteur Amazon : [Ken Imoto on Amazon](https://www.amazon.co.jp/stores/author/B0GQNPRCGF)
- Zenn : [zenn.dev/kenimo49](https://zenn.dev/kenimo49)
- OSS : [github.com/kenimo49](https://github.com/kenimo49)

## Feuille de route des Phases

L'Initiative mûrit par phases. Chaque phase est un prérequis pour la suivante.

| Phase | Portée | État |
|-------|--------|------|
| Phase 0 | Cadrage de recherche, publication de la Mission, premier Experiment Log | En cours |
| Phase 1 | Reproductibilité — CLI OSS (llmo-checker), Score v0.1 Draft, publication de datasets | Planifiée |
| Phase 2 | Communauté — contributors, références externes, canaux de feedback | Planifiée |
| Phase 3 | Standardisation — spécifications formelles, badge Compatible, formation d'un Working Group | Planifiée |

La standardisation vient en dernier. Sans OSS, benchmarks et implémentations matures pour s'y appuyer, ni la certification ni les spécifications ne peuvent gagner la confiance.

## Contribuer

| Méthode | Lien |
|---------|------|
| Issues / rapports de bug | [github.com/kenimo49/llmo-guide/issues](https://github.com/kenimo49/llmo-guide/issues) |
| Pull Requests | [github.com/kenimo49/llmo-guide](https://github.com/kenimo49/llmo-guide) |

## Licence

Ce site et toutes les draft specs sont publiés sous la [Licence MIT](https://opensource.org/licenses/MIT).
