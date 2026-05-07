---
title: "Le framework LLMO : un standard pour la découvrabilité par l'IA"
description: "Le framework LLMO définit 5 composants fondamentaux pour la découvrabilité par l'IA : Clarté des connaissances, Formatage structuré, Signaux de recherche, Signaux d'autorité et Signaux de citation. Score maximum : 15 points."
---

Le framework LLMO definit cinq composants fondamentaux qui determinent si les systemes d'IA peuvent decouvrir, comprendre et citer correctement votre contenu.

## Les cinq composants

### 1. Clarté des connaissances
Votre contenu est-il suffisamment clair pour que l'IA le comprenne et le résume fidèlement ?

- Utilisez un langage simple et sans ambiguïté
- Définissez explicitement les termes clés
- Fournissez des faits structurés (qui, quoi, quand, où)
- Évitez le jargon non expliqué

### 2. Formatage structuré
Votre contenu est-il structuré pour être exploité par les machines ?

- Utilisez du HTML sémantique et du Markdown
- Implémentez les données structurées JSON-LD
- Fournissez un fichier llms.txt pour le contenu destiné à l'IA
- Organisez le contenu de manière hiérarchique

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

## Notation

Chaque composant est évalué sur une échelle de 0 à 3 :

| Score | Niveau | Description |
|-------|--------|-------------|
| 0 | Aucun | Composant non traité |
| 1 | Basique | Implémentation minimale |
| 2 | Bon | Implémentation solide avec des axes d'amélioration |
| 3 | Excellent | Implémentation conforme aux bonnes pratiques |

**Score maximum : 15 points** (5 composants x 3 points chacun)

## Liste de contrôle d'auto-évaluation

Évaluez votre propre site sur chaque composant. Tout élément que vous pouvez cocher avec confiance vaut 1 point ; visez 3 cases par composant pour atteindre le score maximum.

### 1. Clarté des connaissances (max 3)
- [ ] Chaque page commence par une réponse en une phrase à sa question principale (Answer-first)
- [ ] Les termes spécifiques au domaine sont définis lors de leur première utilisation (pas de jargon inexpliqué)
- [ ] Chaque paragraphe contient une seule idée (pas de paragraphes à affirmations multiples)

### 2. Formatage structuré (max 3)
- [ ] Les pages utilisent une hiérarchie sémantique H1 → H2 → H3 sans saut de niveau
- [ ] Chaque page significative émet du JSON-LD (Article / TechArticle / FAQPage / Product / Organization, selon le cas)
- [ ] Le contenu comparatif utilise des tableaux, pas des listes en prose

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
- [ ] Chaque page expose à la fois `datePublished` et `dateModified` (dans le JSON-LD ou en méta visible)
- [ ] Le contenu comparatif référence les standards de l'industrie (W3C, RFC, ISO, schema.org) par nom et lien

### Guide de notation

| Total | Tranche |
|-------|---------|
| 13–15 | Niveau production — activement cité par les systèmes d'IA |
| 9–12  | Bon — visible par l'IA mais incohérent |
| 5–8   | Partiel — lacunes importantes en recherche ou autorité |
| 0–4   | Invisible — commencez par `/llms.txt`, robots.txt et JSON-LD |

> Vous voulez un score plus élevé ? Chaque page de composant (Clarté des connaissances, Formatage structuré, Signaux de recherche, Signaux d'autorité, Signaux de citation) liste les implémentations spécifiques qui font passer le score de 1 → 2 → 3.
