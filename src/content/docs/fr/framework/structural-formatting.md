---
title: "2. Formatage structuré"
description: "Le Formatage structuré consiste à organiser le contenu à l'aide de formats lisibles par les machines -- JSON-LD, HTML sémantique, Markdown, llms.txt -- pour que les systèmes d'IA puissent analyser et extraire efficacement l'information."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO Component 2: Structural Formatting",
        "description": "Structuring your content for machine consumption with JSON-LD, semantic HTML, and llms.txt.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

## De quoi s'agit-il

Le Formatage structuré (Structural Formatting) consiste à organiser votre contenu à l'aide de formats lisibles par les machines et de balisage sémantique, afin que les systèmes d'IA puissent analyser, catégoriser et extraire efficacement l'information.

## Pourquoi c'est important

Les systèmes d'IA ne "lisent" pas les pages comme les humains. Ils traitent les données structurées de manière bien plus fiable que le texte libre. Une structure adéquate augmente les chances que votre contenu soit correctement interprété et cité, plutôt que mal compris ou tout simplement ignoré.

## Comment l'implémenter

### 1. Utilisez du HTML sémantique et du Markdown
Structurez votre contenu avec des titres appropriés (h1-h6), des listes, des tableaux et des éléments sémantiques. Évitez d'utiliser la mise en forme visuelle (gras, taille de police) comme substitut à la hiérarchie structurelle.

### 2. Implémentez les données structurées JSON-LD
Ajoutez du balisage Schema.org à vos pages. Au minimum, incluez :
- `Organization` ou `Person` pour votre identité
- `Article` ou `WebPage` pour les pages de contenu
- `FAQPage` pour le contenu de type questions-réponses

### 3. Fournissez un fichier llms.txt
Créez un fichier `/llms.txt` à la racine de votre domaine en suivant le [standard llms.txt](https://llmstxt.org/). Cela fournit aux systèmes d'IA un résumé concis et lisible par les machines de votre site.

### 4. Organisez le contenu de manière hiérarchique
Utilisez une architecture de l'information claire : catégories générales, puis sujets spécifiques, puis contenu détaillé. Reflétez cette structure dans vos URL et votre hiérarchie de titres.

### 5. Utilisez des tableaux pour les données comparatives
Lorsque vous présentez des comparaisons, des fonctionnalités ou des spécifications, utilisez de vrais tableaux HTML/Markdown plutôt que des descriptions en prose.

## Exemples

**Non structuré :**
> Nous proposons trois formules. La formule basique coûte 10 $ et inclut 5 utilisateurs. La formule pro coûte 25 $ et inclut 20 utilisateurs. La formule entreprise est sur devis avec un nombre illimité d'utilisateurs.

**Structuré :**

| Formule | Prix | Utilisateurs |
|---------|------|-------------|
| Basique | 10 $/mois | 5 |
| Pro | 25 $/mois | 20 |
| Entreprise | Sur devis | Illimité |

## Checklist

- [ ] Les pages utilisent une hiérarchie de titres correcte (h1, h2, h3)
- [ ] Les données structurées JSON-LD sont présentes sur les pages clés
- [ ] Un fichier llms.txt existe à la racine du domaine
- [ ] Le contenu utilise des listes et des tableaux lorsque c'est approprié
- [ ] La structure des URL reflète la hiérarchie du contenu
