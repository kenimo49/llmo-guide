---
title: LLMO multilingue
description: "Traduire son contenu est nécessaire mais pas suffisant pour une visibilité IA multilingue. Les moteurs IA citent souvent la version anglaise aux lecteurs non anglophones. Ce que font réellement hreflang, les canonicals et llms.txt par langue — et l'asymétrie qui rend les langues non anglophones plus rentables."
pubDate: 2026-07-07
---

**Traduire votre contenu est nécessaire et ne suffit pas.** En 2026, il existe un écart réel et mesurable entre "j'ai publié une version en portugais" et "la recherche IA cite ma version en portugais". Ce guide couvre les deux problèmes multilingues que le LLMO doit résoudre : amener les moteurs IA à citer la bonne version linguistique, et décider quelles langues valent l'investissement.

## Le problème de la citation dans la mauvaise langue

Un moteur de recherche classique résout *quel document* servir, puis le sert. `hreflang` est un signal de classement sur lequel il a été affiné pendant deux décennies, et Google est véritablement bon pour choisir l'URL de langue correspondante.

Un moteur alimenté par un LLM fait quelque chose de différent : récupérer une poignée de documents, générer une réponse dans la langue de l'utilisateur, puis attacher les URLs que la couche de retrieval a fait remonter. L'étape de génération est couramment multilingue. L'étape de retrieval est là où vit la sélection de langue — et elle est souvent biaisée vers l'anglais.

Le résultat observable, d'un test multilingue de la même requête sur plusieurs moteurs (Glenn Gabe, GSQI) et du suivi de citations d'un site à quatre langues :

- **Les moteurs Google** (AI Overviews, AI Mode, Gemini, Copilot) héritent de décennies de gestion de `hreflang` et citent généralement la bonne URL localisée.
- **Perplexity**, configuré pour préférer le français, a renvoyé la page anglaise américaine quand même.
- **ChatGPT** a rédigé sa réponse en français, puis lié la version anglaise de la page. La réponse parle la langue du lecteur ; la citation ne le fait pas.

Pourquoi la couche de retrieval est par défaut sur l'anglais :

- La version anglaise a généralement plus de liens entrants et une plus longue histoire de crawl, donc elle se classe plus haut dans l'index de retrieval quelle que soit la langue du lecteur.
- De nombreux crawlers IA ne parsent pas complètement les clusters `hreflang` comme le fait Googlebot.
- La qualité de traduction est un signal de confiance. Si une page traduite se lit comme une sortie machine, la couche de retrieval la traite comme un doublon peu fiable et atteint la version anglaise originale.

L'échec n'est pas "l'IA ne peut pas parler portugais." C'est "la couche de retrieval de l'IA ne fait pas suffisamment confiance à votre page en portugais pour la citer."

## Ce qui fait réellement bouger les choses, par ordre d'efficacité

D'une expérience de terrain à variable unique sur un site à quatre langues ([rapport de terrain](https://kenimoto.dev/blog/ai-cites-wrong-language-version-multilingual-llmo/) (en anglais)) :

1. **`hreflang` + `x-default` — a fait le plus.** Chaque version linguistique doit déclarer le cluster complet avec un `x-default` cohérent. C'est le seul signal que les moteurs Google lisent de façon fiable, et ces moteurs représentent une grande part de la recherche IA. Si vous ne faites qu'une chose, faites-la correctement.
2. **canonical auto-référençant par langue — discrètement critique.** Chaque version linguistique doit se canonical vers *elle-même*, pas vers la version anglaise originale. Une page traduite dont le canonical pointe vers l'anglais dit à chaque crawler "la vraie page est celle en anglais" — une blessure auto-infligée.
3. **`llms.txt` par langue — petit, bon marché, probablement rentable.** Curez les liens par langue afin que chaque fichier pointe vers les URLs localisées correctes. Aucun moteur majeur n'est confirmé pour pondérer cela encore, mais cela coûte quinze minutes par langue, n'a aucun inconvénient, et documente quelle URL est canonique par langue.
4. **Essayer de configurer le moteur — n'a rien changé.** Il n'existe pas de paramètre qui fait citer à ChatGPT votre URL localisée. Vous ne pouvez pas sortir d'un biais de retrieval par la configuration ; vous pouvez seulement fournir à la couche de retrieval des signaux plus propres et attendre.

Même avec tous les signaux propres, attendez-vous à un écart résiduel : une partie de l'échec vit à l'intérieur de couches de retrieval que vous ne possédez pas. Vous pouvez réduire l'écart, pas le fermer.

## Asymétrie des langues : l'avantage stratégique

La même immaturité qui cause des citations dans la mauvaise langue crée une opportunité. La compétition en recherche IA est dramatiquement inégale entre les langues, et les bases du LLMO se cumulent le plus vite dans les langues où elles sont encore rares.

Une mesure GA4 sur 22 jours d'un blog publiant le même contenu dans quatre langues ([rapport de terrain](https://kenimoto.dev/blog/four-languages-thirty-days-portuguese-four-x-traffic/) (en anglais)) :

| Langue | Pages vues | Articles | Notes |
|---|---|---|---|
| Portugais | 748 | 17 | ~3,8× l'anglais avec moins d'articles |
| Anglais | 195 | 26 | Marché saturé, faible part de voix |
| Japonais | 27 | 25 | Les lecteurs vivent sur les plateformes (Qiita/Zenn), pas les blogs |
| Espagnol | 7 | 10 | Compétition mince mais pas de porte communautaire |

**L'asymétrie des langues peut absorber entièrement l'asymétrie du nombre d'articles.** Trois asymétries se sont cumulées pour produire le résultat en portugais :

1. **Porte communautaire** — une plateforme ouverte par langue où un auteur inconnu est lu le jour même (le Brésil a TabNews ; l'anglais n'a pas d'équivalent avec un plancher comparable).
2. **Champs de recherche IA plus minces** — en portugais, beaucoup moins de candidats se disputent les mêmes prompts. La première réponse raisonnable dans une langue sous-servie gagne ; la première réponse raisonnable en anglais est enterrée.
3. **Avantage des premières bases** — un `/pt/llms.txt` est légèrement différenciant là où la plupart des sites dans cette langue ne fournissent rien ; en anglais le même fichier est juste de l'hygiène.

Le modèle de distribution diffère aussi par langue : le résultat en japonais montre une langue où le blog devrait servir d'archive canonique que les crawlers IA indexent, tandis que les posts sur les plateformes (Zenn/Qiita) font le travail de trafic humain. Même contenu, rôles opposés.

## Ordre d'implémentation

1. **Identifiez la porte communautaire de chaque langue cible avant de traduire.** Pas la taille de l'audience — la porte. S'il n'existe pas de plateforme de publication ouverte, attendez-vous au résultat espagnol ci-dessus.
2. **Livrez `/{lang}/llms.txt` dès le premier jour.** Quinze minutes par langue ; la différenciation la moins coûteuse disponible dans les langues sous-servies.
3. **Configurez l'analytics avec des filtres par préfixe de langue avant de publier**, sinon vous rétrofitiez la mesure au deuxième mois au lieu d'écrire.
4. **Traduisez les 20 % d'articles les plus performants en premier** — ceux les plus susceptibles d'atterrir dans la porte communautaire. Validez la distribution avant de traduire l'archive.
5. **Suivez la part de voix de la recherche IA par langue comme des KPI séparés.** Exécutez les mêmes prompts pertinents à votre marque sur ChatGPT, Perplexity et Claude dans chaque langue, mensuellement ([Mesurer le LLMO](/fr/guide/measuring-llmo/) couvre les métriques). Les asymétries sont grandes et invisibles jusqu'à ce qu'on les mesure.
6. **Éditez manuellement les traductions automatiques pour le registre et la locale.** La qualité de traduction est un signal de confiance pour le retrieval, pas seulement une courtoisie envers le lecteur.

## Comment ce site l'implémente

llmoframework.com publie dans 8 locales avec l'anglais comme source canonique. Les pages sans traduction servent le contenu anglais en fallback avec `noindex` et exclusion du sitemap — une page non traduite ne devrait pas concurrencer son propre canonical dans aucun index de retrieval. Chaque locale déclare un cluster `hreflang` complet et des canonicals auto-référençants.

## Checklist

- [ ] Chaque version linguistique déclare le cluster `hreflang` complet incluant `x-default`
- [ ] Chaque version linguistique a un canonical auto-référençant (ne pointant jamais vers la version anglaise originale)
- [ ] Chaque répertoire de langue livre son propre `llms.txt` avec des URLs localisées
- [ ] Les pages de fallback non traduites sont `noindex`ées et exclues du sitemap
- [ ] Les traductions sont éditées manuellement pour le registre et la locale, pas du brut machine
- [ ] La porte communautaire de chaque langue cible est identifiée avant le début de la traduction
- [ ] La part de voix de la recherche IA est mesurée par langue, dans la langue, mensuellement
- [ ] L'effort de publication est pondéré vers les langues sous-servies, pas le nombre total de locuteurs
