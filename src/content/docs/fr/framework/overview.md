---
title: "Le framework LLMO : un standard pour la découvrabilité par l'IA"
description: "Le framework LLMO définit 6 composants fondamentaux pour la découvrabilité par l'IA : Clarté des connaissances, Formatage structuré, Signaux de recherche, Signaux d'autorité, Signaux de citation et Signaux de cohérence. Score maximum : 18 points."
pubDate: 2026-05-08
---

Le framework LLMO définit six composants fondamentaux qui déterminent si les systèmes d'IA peuvent découvrir, comprendre et citer correctement votre contenu.

Vous partez du concept ? Lisez [Qu'est-ce que LLMO ?](/fr/guide/what-is-llmo/). Vous voulez implémenter tout de suite ? Passez au [Démarrage rapide en 30 min](/fr/guide/quickstart/).

## Les six composants

### 1. Clarté des connaissances
Votre contenu est-il suffisamment clair pour que l'IA le comprenne et le résume fidèlement ?

- Utilisez un langage simple et sans ambiguïté
- Définissez explicitement les termes clés
- Fournissez des faits structurés (qui, quoi, quand, où)
- Évitez le jargon non expliqué

### 2. Formatage structuré
Votre contenu est-il structuré pour être exploité par les machines ?

- Utilisez du HTML sémantique et du Markdown
- Implémentez les données structurées JSON-LD, cadrées par page
- Fournissez un fichier llms.txt pour le contenu destiné à l'IA
- Vérifiez que le JSON-LD est réellement émis dans le HTML servi

### 3. Signaux de recherche
Les systèmes d'IA peuvent-ils trouver votre contenu lorsqu'ils en ont besoin ?

- Assurez l'accessibilité au crawl (robots.txt, sitemap.xml)
- Fournissez des points d'accès lisibles par les machines (/ai/, fichiers .md)
- Implémentez le standard llms.txt
- Rendez le contenu disponible via des API lorsque c'est possible

### 4. Signaux d'autorité
Votre contenu démontre-t-il une expertise et une fiabilité ?

- Attribution d'auteur avec des qualifications vérifiables
- Présence multiplateforme (GitHub, LinkedIn, publications)
- Informations cohérentes sur toutes les plateformes
- Affirmations fondées sur des preuves avec citations

### 5. Signaux de citation
Votre contenu fournit-il des références que l'IA peut vérifier ?

- Liens vers les sources primaires
- Dates de publication incluses
- Informations de version fournies
- Références à des articles académiques et à la documentation officielle

### 6. Signaux de cohérence
Le même fait raconte-t-il la même histoire sur toutes les surfaces lues par l'IA ?

- Source unique de vérité pour chaque affirmation chiffrée ou factuelle
- Surfaces réservées à l'IA (`llms.txt`, `/ai/*.md`) générées à partir des mêmes données que le HTML
- Hôte canonique et politique de barre oblique finale imposés partout
- Aucune entité JSON-LD dupliquée pour le même `@id`

## Notation

Chaque composant est évalué sur une échelle de 0 à 3 :

| Score | Niveau | Description |
|-------|--------|-------------|
| 0 | Aucun | Composant non traité |
| 1 | Basique | Implémentation minimale |
| 2 | Bon | Implémentation solide avec des axes d'amélioration |
| 3 | Excellent | Implémentation conforme aux bonnes pratiques |

**Score maximum : 18 points** (6 composants × 3 points chacun)

## Liste de contrôle d'auto-évaluation

Évaluez votre propre site sur chaque composant. Tout élément que vous pouvez cocher avec confiance vaut 1 point ; visez 3 cases par composant pour atteindre le score maximum.

### 1. Clarté des connaissances (max 3)
- [ ] Chaque page commence par une réponse en une phrase à sa question principale (Answer-first)
- [ ] Les termes spécifiques au domaine sont définis lors de leur première utilisation (pas de jargon inexpliqué)
- [ ] Chaque paragraphe contient une seule idée (pas de paragraphes à affirmations multiples)

### 2. Formatage structuré (max 3)
- [ ] Les pages utilisent une hiérarchie sémantique H1 → H2 → H3 sans saut de niveau
- [ ] Chaque page significative émet du JSON-LD pertinent pour la page ; le layout commun au site n'émet que `Organization` / `WebSite` / `Person`
- [ ] Le pipeline de build vérifie que le JSON-LD se parse réellement dans le HTML de `dist/`

### 3. Signaux de recherche (max 3)
- [ ] `/llms.txt` existe à la racine du site et liste les pages clés
- [ ] Le répertoire `/ai/` fournit du Markdown propre pour chaque thème majeur (et par langue si le site est multilingue)
- [ ] `robots.txt` autorise explicitement GPTBot, ClaudeBot, PerplexityBot, Google-Extended ; `sitemap.xml` est accessible

### 4. Signaux d'autorité (max 3)
- [ ] L'auteur dispose d'une bio vérifiable avec des liens `sameAs` vers LinkedIn / GitHub / X / profils de publication
- [ ] La même identité (nom, rôle, focus thématique) apparaît de manière cohérente sur au moins 3 plateformes
- [ ] Le site renvoie vers de la recherche originale, des livres ou des articles que l'auteur a réellement publiés

### 5. Signaux de citation (max 3)
- [ ] Chaque affirmation utilisant un chiffre cite une source par nom et année
- [ ] Chaque **page de contenu** (article, guide, étude de cas) expose à la fois `datePublished` et `dateModified` (dans le JSON-LD ou en méta visible). La racine du site et les pages d'erreur sont exemptées
- [ ] Le contenu comparatif référence les standards de l'industrie (W3C, RFC, ISO, schema.org) par nom et lien

### 6. Signaux de cohérence (max 3)
- [ ] Chaque affirmation chiffrée / factuelle a un seul fichier source canonique référencé partout ailleurs
- [ ] Les surfaces IA (`llms.txt`, `/ai/*.md`, endpoints URL.md) sont générées à partir des mêmes données que le HTML
- [ ] La CI vérifie la dérive inter-fichiers sur les métriques clés ; aucune entité JSON-LD dupliquée pour le même `@id`

### Guide de notation

| Total | Tranche |
|-------|---------|
| 16–18 | Niveau production — activement cité par les systèmes d'IA |
| 11–15 | Bon — visible par l'IA mais incohérent |
| 6–10  | Partiel — lacunes importantes en recherche, autorité ou cohérence |
| 0–5   | Invisible — commencez par `/llms.txt`, robots.txt et JSON-LD |

> Vous voulez un score plus élevé ? Chaque page de composant (Clarté des connaissances, Formatage structuré, Signaux de recherche, Signaux d'autorité, Signaux de citation, Signaux de cohérence) liste les implémentations spécifiques qui font passer le score de 1 → 2 → 3.
