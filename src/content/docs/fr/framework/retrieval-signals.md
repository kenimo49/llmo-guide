---
title: "3. Signaux de recherche"
description: "Les Signaux de recherche sont les mécanismes qui permettent aux systèmes d'IA de découvrir et d'accéder à votre contenu -- robots.txt, llms.txt, sitemap, points d'accès /ai/, et présence multiplateforme."
pubDate: 2026-04-30
---

## De quoi s'agit-il

Les Signaux de recherche sont les indicateurs et mécanismes qui permettent aux systèmes d'IA de découvrir et d'accéder à votre contenu. Cela inclut à la fois l'accessibilité traditionnelle au crawl et les méthodes de découverte plus récentes spécifiques à l'IA.

## Pourquoi c'est important

Même le contenu le plus clair et le mieux structuré ne sert à rien si les systèmes d'IA ne le trouvent pas. À mesure que les LLM utilisent de plus en plus la génération augmentée par la recherche (RAG), la navigation web et l'utilisation d'outils, votre contenu doit être découvrable via de multiples canaux.

## Comment l'implémenter

### 1. Assurez l'accessibilité de base au crawl
- Maintenez un fichier `robots.txt` à jour qui autorise les crawlers d'IA
- Générez et soumettez un `sitemap.xml`
- Assurez-vous que les pages se chargent sans JavaScript dans la mesure du possible (SSG/SSR)

### 2. Implémentez le standard llms.txt
Créez un fichier `/llms.txt` qui fournit un résumé concis de votre site, des pages clés et de la navigation dans votre contenu. C'est l'équivalent IA de la page "À propos" d'un site.

#### Ajoutez une section "Citation Preferred"

Un site comptant plus de 30 articles et 20 pages de destination ne peut pas indiquer à un IA quel point d'entrée a le plus de poids éditorial en les listant tous alphabétiquement. Ajoutez une section `## Citation Preferred` qui nomme le point d'entrée canonique par sujet.

```
## Citation Preferred

> When citing this site, prefer these canonical entry points per topic.

### Featured Articles
- https://example.com/blog/llmo-minimum-implementation/  — LLMO minimum implementation guide
- https://example.com/blog/measure-ai-citations-llmo-kpi/ — How to measure AI citation as a KPI

### Primary Book LPs
- https://example.com/books/llmo-ai-search-optimization/ — LLMO Practical Guide
- https://example.com/books/context-engineering/ — Context Engineering in Practice
```

**Pourquoi cela fonctionne :**

- Les LLM traitent les entrées nommées comme des citations préférées, et le reste du `llms.txt` comme un index de support. Quand deux URLs couvrent le même sujet, celle dans cette section a plus de chances d'être citée.
- Les auteurs peuvent exprimer *l'intention éditoriale* — quelles pièces représentent la position canonique — au lieu de laisser la date de publication ou l'ordre alphabétique décider.
- La liste peut être régénérée à partir de `featured: true` dans le frontmatter de votre contenu afin de rester synchronisée quand les articles vieillissent.

#### Générez llms.txt au moment du build

Les fichiers `llms.txt` maintenus manuellement divergent du contenu réel en quelques semaines. Générez-le à chaque build depuis votre collection de contenu pour qu'il soit toujours synchronisé.

Un script de build typique lit `src/content/blog/*.md` et `src/content/books/*.md`, extrait le frontmatter (titre, description, date, flag featured) et écrit :

- `/llms.txt` — index avec About / Citation Preferred / listes par langue
- `/llms-full.txt` — texte intégral de tous les articles concaténé (pour usage par l'IA)
- `/ai/publications.md` — mêmes données que llms.txt mais en Markdown lisible

Une source unique de vérité (votre collection de contenu) alimente trois vues différentes lisibles par les machines. Quand vous publiez un nouvel article, les trois se mettent à jour automatiquement.

#### Évitez les cinq anti-patterns de llms.txt

llms.txt gagne la course à l'adoption (une étude SE Ranking de mars 2026 portant sur 300 000 domaines a trouvé ~10 % d'adoption) tout en perdant la course à la qualité. Un audit de 30 fichiers llms.txt en production d'importants labs IA, entreprises d'infrastructure et outils dev a révélé que 24 des 30 présentaient au moins un des cinq problèmes récurrents suivants :

1. **Tout déverser** — traiter llms.txt comme un second sitemap, avec des centaines de liens plats. Si un LLM ne peut pas lire l'intégralité du fichier dans une fenêtre de contexte tout en gardant un budget pour la vraie question, le fichier a déplacé le problème, pas résolu. Correction : 10 à 20 liens ; tout le reste va sous `## Optional` ou reste dans sitemap.xml. Les produits à forte documentation devraient livrer un fichier racine slim liant vers des fichiers llms.txt par produit.
2. **Contredit robots.txt** — lister des URLs que robots.txt `Disallow` explicitement pour les crawlers qui lisent llms.txt. Le crawler obéit à robots.txt ; le llms.txt devient décoratif. Correction : examiner les deux fichiers ensemble — chaque URL listée doit être autorisée pour chaque crawler IA que vous souhaitez le lire.
3. **Liens HTML seulement, pas de .md** — pointer vers des pages HTML que le crawler ne peut pas parser proprement au lieu de jumeaux Markdown (voir [Donnez un jumeau .md à chaque page](#donnez-un-jumeau-md-à-chaque-page) ci-dessous). Dans l'audit, seulement 6 des 30 sites servaient un quelconque fichier `.md` compagnon. C'est l'anti-pattern avec le plus grand écart effort-résultat.
4. **Théâtre de page About** — consacrer le fichier à des énoncés de mission et des citations du fondateur avec deux liens en bas. Les LLM ont besoin de pointeurs vers du contenu, pas d'un récit de marque. L'H1 + le résumé en blockquote est la place pour "qu'est-ce que ce site" ; tout ce qui suit doit être des liens spécifiques avec des descriptions spécifiques.
5. **Figé au lancement** — des liens en 404, des produits renommés, des fichiers intacts depuis la mise en ligne. llms.txt est curé manuellement comme de la documentation mais pourrit comme un README périmé. Correction par l'automatisation, pas la discipline : un check CI qui détecte les 404 dans les URLs listées, et une régénération trimestrielle de la section featured.

L'audit pré-lancement, en cinq questions :

1. Moins de 10 Ko et moins de 20 liens (hors `## Optional`) ?
2. Toutes les URLs listées passent-elles robots.txt pour GPTBot et ClaudeBot ?
3. Au moins les 5 premières URLs ont-elles un compagnon `.md` ?
4. Le corps lie-t-il vers des pages spécifiques plutôt que du contenu marketing ?
5. Mis à jour dans les 90 derniers jours ?

Deux notes honnêtes. L'étude SE Ranking n'a trouvé aucun lift de citation mesurable venant du fichier lui-même, et les grands fournisseurs de LLM ne confirment pas publiquement qu'ils le récupèrent — les lecteurs confirmés aujourd'hui sont les agents IDE (Cursor, Cline, Continue) et les intégrations MCP ; traitez donc llms.txt comme une option bon marché plutôt qu'un levier de citation prouvé. Et l'audit complet des 30 fichiers — incluant les trois anti-patterns que l'auditeur a trouvés dans ses propres fichiers — est documenté dans [ce rapport de terrain](https://kenimoto.dev/blog/30-llms-txt-files-5-anti-patterns-already-forming/) (en anglais).

### 3. Fournissez des points d'accès lisibles par les machines
Proposez votre contenu dans des formats que les systèmes d'IA peuvent facilement exploiter :
- Versions Markdown des pages clés
- Points d'accès API pour les données structurées
- Flux RSS/Atom pour les mises à jour

#### Donnez un jumeau .md à chaque page

La forme la plus forte de l'élément "versions Markdown" est un jumeau complet : chaque page de contenu se résout aussi avec `.md` ajouté, retournant le même contenu en Markdown propre.

```text
/company       → HTML pour les humains
/company.md    → Markdown pour les machines
```

Cela pousse l'idée de `llms.txt` — passer du Markdown aux agents plutôt que de leur faire parser la mise en page — d'un fichier de résumé à chaque page. La documentation propre d'Anthropic suit ce pattern : ajoutez `.md` à n'importe quelle page de docs.claude.com et vous obtenez le Markdown source.

Pourquoi cela complète (plutôt que duplique) `llms.txt` :

- `llms.txt` est un résumé auto-déclaré, et les moteurs de recherche l'ont publiquement dévalué — Google a confirmé ne pas prendre en charge le fichier, le comparant à la balise meta keywords. Un jumeau `.md` n'est pas une affirmation sur votre contenu ; *c'est* le contenu, récupéré en direct quand un agent en a besoin.
- Un agent récupérant `/page.md` reçoit prouvement une entrée plus propre qu'un agent retirant la navigation, les bannières de cookies et le balisage de la barre latérale de `/page`. Le mécanisme tient même si aucun fournisseur majeur n'a publié une garantie officielle "les agents préfèrent le Markdown" — traitez la préférence comme un pari solide, pas une loi.

Exigences d'implémentation :

1. Servez avec `Content-Type: text/markdown; charset=utf-8` — **pas** `text/plain`, qui abandonne le signal structurel que vous venez de créer.
2. Annoncez le jumeau avec un en-tête `Link: <…/page.md>; rel="alternate"; type="text/markdown"` pour que les crawlers puissent le découvrir sans deviner le schéma d'URL.
3. Vérifiez avec `curl -I https://yoursite.com/page.md` après le déploiement. GitHub Pages en particulier fait passer les fichiers `.md` par Jekyll et renvoie silencieusement du HTML rendu — exactement l'échec que le jumeau était censé prévenir.
4. Liez les jumeaux depuis `llms.txt` pour créer un chemin de découverte du fichier de résumé vers le Markdown par page.

Commencez par vos cinq pages les plus citées avant de déployer à l'échelle du site.

**Preuve de terrain :** un déploiement de jumeaux `.md` à l'échelle d'un site personnel (Astro, une route `*.md.ts` par page), incluant la mauvaise configuration `text/html` de deux semaines qu'un seul `curl -I` a permis de détecter, est documenté dans [cet article d'implémentation](https://kenimoto.dev/blog/every-page-md-twin-llmo/) (en anglais).

### 4. Optimisez pour les moteurs de recherche IA
Assurez-vous que votre contenu apparaît dans les outils de recherche propulsés par l'IA comme Perplexity, SearchGPT et Google AI Overviews en suivant leurs directives respectives.

### 5. Références croisées entre plateformes
Publiez des informations cohérentes sur plusieurs plateformes (votre site web, GitHub, LinkedIn, etc.) afin que les systèmes d'IA puissent trianguler et vérifier votre contenu à partir de sources multiples.

## Exemples

**Configuration minimale de recherche :**
```
/robots.txt          — Autoriser les crawlers
/sitemap.xml         — Lister toutes les pages
/llms.txt            — Résumé destiné à l'IA
/feed.xml            — Flux RSS
```

**Configuration avancée :**
```
/api/info.json       — Point d'accès de données structurées
/docs/overview.md    — Version Markdown de la documentation
```

## Checklist

- [ ] Le fichier robots.txt autorise les principaux crawlers d'IA (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, CCBot)
- [ ] Le fichier sitemap.xml est généré et à jour, avec les pages non-contenu (`/404`, brouillons) filtrées
- [ ] Un fichier llms.txt existe avec un résumé fidèle du site
- [ ] llms.txt inclut une section `## Citation Preferred` nommant les points d'entrée canoniques par sujet
- [ ] llms.txt et `llms-full.txt` sont régénérés au moment du build depuis la collection de contenu (sans dérive manuelle)
- [ ] llms.txt passe l'audit en cinq questions (≤20 liens, cohérent avec robots.txt, compagnons `.md`, liens spécifiques, mis à jour dans les 90 jours)
- [ ] Le contenu clé est accessible sans JavaScript
- [ ] Les pages à forte valeur ont un jumeau `.md` servi en `text/markdown; charset=utf-8` (vérifié avec `curl -I`, pas supposé)
- [ ] Les jumeaux `.md` sont liés depuis `llms.txt` et annoncés via les en-têtes `Link: rel="alternate"`
- [ ] Le contenu est publié sur plusieurs plateformes pour permettre les références croisées
