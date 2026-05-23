---
title: "Projets expérimentaux"
description: "Trois projets expérimentaux de l'Open LLMO Research Initiative : LLMOFramework Score, LLMOFramework Benchmark et LLMOFramework Compatible."
pubDate: 2026-05-24
---

Projets expérimentaux publiés par l'Open LLMO Research Initiative. Tous sont livrés en état **Draft / Experimental**. Le statut de spécification formelle est reporté à la Phase 3.

## Vue d'ensemble

| Projet | Rôle | Analogue | État |
|--------|------|----------|------|
| [1. LLMOFramework Score](#1-llmoframework-score) | Mesurer la découvrabilité par IA d'un site | Lighthouse Score | Indicateurs en cours de rédaction (Draft v0.1 en Phase 1) |
| [2. LLMOFramework Benchmark](#2-llmoframework-benchmark) | Comparer expérimentalement des structures de site | Benchmark de référence du secteur | En planification (Phase 1-2) |
| [3. LLMOFramework Compatible](#3-llmoframework-compatible) | Badge de certification pour sites conformes | Marque « Certified » | Feuille de route uniquement (Phase 3) |

---

## 1. LLMOFramework Score

### Ce qu'il mesure

Score par site indiquant à quel point le contenu est reconnaissable, citable et parseable par l'IA. L'équivalent à l'ère IA du Domain Authority en SEO ou du Lighthouse Score.

### Indicateurs candidats (v0.1 Draft)

| Indicateur | Description |
|------------|-------------|
| Citation Visibility | Si le contenu est cité par l'IA |
| Chunk Readability | À quel point le contenu se découpe bien en chunks |
| Semantic Structure | À quel point la structure sémantique est explicite |
| AI Crawlability | Compatibilité avec les crawlers IA |
| llms.txt | Conformité llms.txt |
| Markdown Quality | Qualité structurelle |
| Entity Clarity | Facilité de reconnaissance d'entités |
| Retrieval Stability | Consistance du retrieval |

Chaque indicateur est livré avec **formule de calcul et code de checker OSS**. Lighthouse a gagné la confiance parce qu'il était mesurable et reproductible, et ce projet adopte le même principe.

### OSS associé

`llmo-checker` est planifié pour la Phase 1.

```
npx llmo-checker https://example.com

LLMOFramework Score: 74

Citation Visibility: 81
Semantic Chunkability: 68
AI Readability: 77
Grounding Stability: 70
```

### État

Les définitions d'indicateurs sont en cours de rédaction. La publication de Draft v0.1 est visée pour la Phase 1 (calendrier à confirmer).

---

## 2. LLMOFramework Benchmark

### Ce qu'il compare

Comparaison expérimentale des structures de site qui performent le mieux pour l'IA. Comme aucun benchmark standard n'existe encore pour le retrieval et la citation par IA, ce projet propose d'abord une méthodologie de mesure.

### Axes de comparaison candidats

- Markdown vs HTML
- Présence de FAQ schema
- Structure de tableau
- Taille de chunk
- Format de citation
- Maillage interne
- Intégration GitHub
- Conformité llms.txt
- Exposition de MCP

### Politique de publication

Chaque expérience est livrée comme **Reproducible Benchmark Report** sur GitHub et sur ce site, incluant le dataset, les scripts de mesure, les résultats bruts et les prompts d'évaluation.

### État

En planification. La première expérience comparative (Markdown vs HTML, efficacité de retrieval) est planifiée pour la Phase 1.

---

## 3. LLMOFramework Compatible

### But du badge

Marque de certification pour sites conformes à la structure optimisée pour l'IA. Pensée pour être affichée par des SaaS, sites de documentation, projets OSS et produits d'IA.

### Concept visuel

```
[ LLMOFramework Compatible ]
[ AI Retrieval Ready ]
[ Grounding Optimized ]
```

### Exigences de conformité (concept Draft)

| Exigence | Contenu |
|----------|---------|
| Placement de llms.txt | Un llms.txt valide existe à la racine du site |
| Semantic Structure | Les pages principales satisfont la hiérarchie de headings et le HTML sémantique |
| Chunk Optimization | Les sections principales tiennent dans la plage de chunk size recommandée |
| Grounding-friendly Docs | Citations, sources de données et dates de mise à jour sont explicites |

### État

**Feuille de route uniquement**. Positionné en Phase 3 (dernière). Les raisons :

- La certification dépend de l'adoption par l'écosystème, donc Score et Benchmark doivent mûrir d'abord
- Émettre une certification en fonctionnement solo se lit comme un costume d'autorité et érode la confiance
- Le badge Compatible ne sera conçu qu'après que la communauté Open Source aura produit une adoption tierce

---

## Mapping vers les Phases

| Phase | Avancement des projets |
|-------|------------------------|
| Phase 0 (actuelle) | Rédaction des indicateurs, publication du concept des projets |
| Phase 1 | Score Draft v0.1, OSS `llmo-checker`, premier Benchmark Report |
| Phase 2 | Révision du Score, mises à jour continues du Benchmark, intégration du feedback communautaire |
| Phase 3 | Design de la certification Compatible, spécifications formelles, formation d'un Working Group |

Le code source et les discussions de chaque projet sont publics sur le [dépôt GitHub](https://github.com/kenimo49/llmo-guide) et les [Issues](https://github.com/kenimo49/llmo-guide/issues).
