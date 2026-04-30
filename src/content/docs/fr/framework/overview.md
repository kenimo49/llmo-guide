---
title: "Le framework LLMO : un standard pour la découvrabilité par l'IA"
description: "Le framework LLMO définit 5 composants fondamentaux pour la découvrabilité par l'IA : Clarté des connaissances, Formatage structuré, Signaux de recherche, Signaux d'autorité et Signaux de citation. Score maximum : 15 points."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "The LLMO Framework: A Standard for AI Discoverability",
        "description": "Five core components for making your content discoverable by AI.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
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
