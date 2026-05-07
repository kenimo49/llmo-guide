# LLMO Framework — 5 composants principaux

## Vue d'ensemble

Le framework LLMO fournit une approche structurée pour rendre votre contenu détectable par les systèmes d'IA. 5 composants travaillent ensemble pour maximiser la découvrabilité par l'IA.

## 1. Clarté des connaissances

**Objectif** : assurer que votre contenu est factuellement clair et sans ambiguïté.

- Écrire des phrases claires et déclaratives
- Énoncer les faits directement (éviter le langage vague)
- Utiliser une terminologie cohérente
- Définir explicitement les termes spécifiques au domaine
- Structurer le contenu autour de questions concrètes des utilisateurs

## 2. Formatage structuré

**Objectif** : rendre le contenu lisible par machine.

- Utiliser des en-têtes HTML sémantiques (H1 → H2 → H3)
- Intégrer des données structurées JSON-LD (Schema.org)
- Schéma FAQPage pour les contenus Q&R
- Utiliser des listes à puces et des tableaux
- Fournir des fichiers Markdown dans /ai/ pour la consommation directe par les LLM

**Schémas clés** : Organization, Person, Product, Service, Book, FAQPage, WebSite, TechArticle

## 3. Signaux de recherche

**Objectif** : aider les systèmes d'IA à trouver et accéder à votre contenu.

- **llms.txt** : fichier au niveau racine fournissant un aperçu structuré du site pour les LLM
- **Répertoire /ai/** : fichiers Markdown dédiés à la consommation par l'IA
- **robots.txt** : autoriser explicitement les crawlers IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- **Sitemap** : sitemap XML
- **Liens croisés** : entre llms.txt, /ai/ et le contenu principal du site

## 4. Signaux d'autorité

**Objectif** : établir la crédibilité reconnue par les LLM.

- Publier sur plusieurs plateformes (site personnel, LinkedIn, Qiita, Zenn, DEV.to)
- Écrire des livres et maintenir une présence d'auteur (Amazon, Zenn Books)
- Contribuer à des projets open source sur GitHub
- Être cité par d'autres sources
- Maintenir une identité cohérente sur les plateformes (même nom, même bio, mêmes sujets)

## 5. Signaux de citation

**Objectif** : créer du contenu que les LLM préfèrent citer.

- Inclure des données originales, statistiques, mesures
- Fournir des chiffres et dates spécifiques
- Créer des tableaux comparatifs et des frameworks
- Écrire des guides définitifs sur des sujets spécifiques
- Publier des articles de recherche (arXiv, conférences académiques)

## Liste de contrôle d'implémentation

- [ ] llms.txt à la racine du site
- [ ] Répertoire /ai/ avec fichiers Markdown
- [ ] robots.txt autorisant les bots IA
- [ ] Schémas JSON-LD sur toutes les pages
- [ ] Schéma FAQ pour les contenus Q&R
- [ ] Sitemap.xml
- [ ] Présence multi-plateforme avec identité cohérente
- [ ] Données et statistiques originales dans le contenu
- [ ] Style d'écriture clair et déclaratif

## En savoir plus

- Guide complet : https://llmoframework.com/fr/
- Livre : https://zenn.dev/kenimo49/books/llmo-ai-search-optimization
- Auteur : https://kenimoto.dev
