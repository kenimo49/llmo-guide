---
title: "Domaines de recherche — 5 axes"
description: "Cinq domaines de recherche de l'Open LLMO Research Initiative : AI Citation Analysis, Grounding Visibility, LLM Retrieval Optimization, AI-native Documentation et Agent-oriented Information Architecture."
pubDate: 2026-05-24
---

L'Open LLMO Research Initiative organise son travail en cinq domaines de recherche. Chaque domaine progresse de façon indépendante mais alimente in fine l'ensemble de métriques défini par le [LLMOFramework Score](/fr/experimental-projects/).

## Vue d'ensemble

| Domaine | Question centrale |
|---------|-------------------|
| [1. AI Citation Analysis](#1-ai-citation-analysis) | Quel contenu les LLM citent-ils, et dans quelles conditions ? |
| [2. Grounding Visibility](#2-grounding-visibility) | Comment rendre visibles les sources de grounding de l'IA ? |
| [3. LLM Retrieval Optimization](#3-llm-retrieval-optimization) | Comment optimiser les documents pour la couche de retrieval des LLM ? |
| [4. AI-native Documentation](#4-ai-native-documentation) | Quels formats de document les LLM traitent-ils le mieux ? |
| [5. Agent-oriented Information Architecture](#5-agent-oriented-information-architecture) | Quelles structures d'information sont les plus faciles à naviguer pour les agents d'IA ? |

---

## 1. AI Citation Analysis

### Portée

Analyse du contenu cité par les LLM (ChatGPT, Claude, Gemini, Perplexity) pour un sujet donné. Les observations couvrent la fréquence de citation, les caractéristiques structurelles des documents cités et le chemin de retrieval qui a mené à la citation.

### Questions clés

- À quel point les domaines cités se recoupent-ils entre LLM pour un même sujet ?
- Peut-on identifier les caractéristiques structurelles (hiérarchie des headings, tableaux, densité statistique, nombre de liens externes) des documents cités ?
- Peut-on construire a posteriori une checklist pour rendre le contenu plus susceptible d'être cité ?

### Direction actuelle

La collecte de données pour l'observation des citations IA est en cours. Plan pour la Phase 1 : livrer Citation Visibility comme métrique dans l'OSS `llmo-checker`.

---

## 2. Grounding Visibility

### Portée

Visualisation du grounding pour les réponses de l'IA. Couvre ce sur quoi un LLM s'est appuyé pour produire une réponse et si cette source peut être tracée jusqu'à une référence primaire vérifiable.

### Questions clés

- Peut-on définir une méthode standard de reverse lookup depuis la réponse IA jusqu'au document source ?
- Rendre le grounding « visible » sur un site (sources explicites, références aux données, formatage des citations) corrèle-t-il avec un taux de citation IA plus élevé ?
- L'hallucination est-elle corrélée à un grounding faible ?

### Direction actuelle

Déjà partiellement traité comme Citation Signals (le cinquième composant du LLMO Framework). Plan pour la Phase 1 : quantifier comme métrique Grounding Stability.

---

## 3. LLM Retrieval Optimization

### Portée

Optimisation côté document pour la couche de retrieval des LLM (RAG, embedding retrieval, plugins de recherche web, etc.). Couvre la stratégie de chunking, la structure sémantique, la longueur de document et le design des headings.

### Questions clés

- Comment varie la relation entre taille de chunk et précision de retrieval selon les sujets ?
- Quel est l'écart d'efficacité de retrieval entre Markdown, HTML et JSON-LD ?
- Comment la densité de liens internes contribue-t-elle à l'expansion de contexte dans la recherche IA ?

### Direction actuelle

llmoframework.com sert lui-même de référence d'implémentation. Plan pour la Phase 1 : publier une expérience comparative de chunking.

---

## 4. AI-native Documentation

### Portée

Recherche sur les formats de document que les LLM lisent et écrivent bien. Couvre llms.txt, les conventions Markdown et la forme optimale des métadonnées ciblant l'IA.

### Questions clés

- Quels LLM et crawlers consultent réellement llms.txt ?
- Où se situe l'équilibre optimal entre efficacité de retrieval et puissance expressive entre Markdown et HTML ?
- Les métadonnées structurées orientées IA (JSON-LD, etc.) affectent-elles les taux de citation ?

### Direction actuelle

L'implémentation et la mesure d'effet de llms.txt sont en cours. Plan pour la Phase 1 : publier l'outil OSS llms.txt-validator.

---

## 5. Agent-oriented Information Architecture

### Portée

Recherche sur l'architecture de l'information pour les agents d'IA (Claude Code, Cursor, agents autonomes, etc.). Couvre l'exposition de MCP (Model Context Protocol), le design de la documentation d'API et la découvrabilité.

### Questions clés

- Les sites qui exposent des serveurs MCP ont-ils un avantage sur la visibilité en recherche IA ?
- Les docs d'API agent-readable (OpenAPI + langage naturel) sont-elles plus découvrables que des références d'API simples ?
- Peut-on établir des méthodes pour observer le comportement d'exploration des agents autonomes ?

### Direction actuelle

Des expériences sur l'impact de l'exposition MCP sur la visibilité en recherche sont en cours. Plan pour la Phase 1 : proposer une métrique préliminaire d'Agent Visibility.

---

## Mapping vers les Phases

| Domaine | Livrable planifié pour la Phase 1 |
|---------|-----------------------------------|
| AI Citation Analysis | Métrique Citation Visibility dans `llmo-checker` |
| Grounding Visibility | Métrique Grounding Stability + dataset d'évaluation |
| LLM Retrieval Optimization | Rapport d'expérience comparative de chunking |
| AI-native Documentation | OSS llms.txt-validator |
| Agent-oriented IA | Métrique préliminaire d'Agent Visibility |

L'avancement de chaque domaine est publié dans le [Changelog](/fr/changelog/) et les [GitHub Issues](https://github.com/kenimo49/llmo-guide/issues).
