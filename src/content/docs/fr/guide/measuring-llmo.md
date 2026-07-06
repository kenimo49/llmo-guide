---
title: "Mesurer le LLMO : taux de citation, densité de mentions et conversion du trafic IA"
description: "La mesure LLMO consiste à suivre si les systèmes IA citent votre contenu et ce que cette citation rapporte. Trois métriques clés — Citation Rate, Brand Mention Density et AI Referral Conversion — remplacent les KPI de position de classement rendus obsolètes par la recherche IA."
pubDate: 2026-07-07
---

La mesure LLMO consiste à suivre si les systèmes IA citent votre contenu, à quelle profondeur ils le citent, et ce que ces citations rapportent à votre activité. Elle remplace les KPI de position de classement du SEO classique, qui n'ont pas d'équivalent dans la recherche IA : il n'y a pas de position 1 à 100, seulement cité ou non cité.

## Le vide de mesure

La mesure SEO est un problème résolu : Google Search Console rapporte les classements, impressions, clics et CTR gratuitement, chaque jour. Le LLMO n'a pas d'équivalent. En 2026, aucune plateforme IA — OpenAI, Anthropic, Google ou Perplexity — n'offre une API officielle qui rapporte la fréquence à laquelle votre site a été cité.

Deux conséquences :

1. **Le trafic de référence GA4 n'est que la partie émergée de l'iceberg.** Quand une IA vous cite et que l'utilisateur clique sur le lien, GA4 enregistre un référent. Quand une IA vous cite sans que personne ne clique — ce qui est la majorité des cas — rien n'est enregistré nulle part où vous pouvez le voir. Une citation qui n'est jamais cliquée vous positionne quand même comme la source à l'intérieur de la réponse, et cela se cumule.
2. **Les trackers tiers sont très divergents.** Une comparaison contrôlée a branché le même site sur sept trackers de citations IA sur les mêmes 15 jours et a obtenu sept chiffres différents, de 38 à 312 — un écart de 8,2× ([compte-rendu complet](https://kenimoto.dev/blog/seven-ai-citation-trackers-seven-different-numbers) (en anglais)). La divergence est un problème de définition, pas un défaut des fournisseurs : les outils diffèrent sur ce qui compte comme citation (source liée vs. toute mention de marque), quels LLM ils échantillonnent, à quelle fréquence, et dans quelles langues.

La règle pratique qui s'ensuit : **rédigez votre définition de "citation" en une phrase avant d'acheter ou de construire un tracker.** Si vous vous souciez du trafic d'attribution, comptez uniquement les citations avec lien. Si vous vous souciez de la présence de marque, comptez les mentions. Les chiffres ne sont pas comparables d'une définition à l'autre.

## Les trois métriques clés

Les indicateurs macros comme SOV (Share of Voice) et SOM (Share of Model) vous indiquent si votre présence IA globale a bougé, mais ne vous disent pas quoi faire ensuite. Pour un cycle d'amélioration, décomposez en trois métriques :

| Métrique | Ce qu'elle mesure | Unité | Cadence |
|---|---|---|---|
| Citation Rate | Fréquence à laquelle l'IA vous mentionne sur un ensemble de prompts fixe | % | Hebdomadaire |
| Brand Mention Density | Profondeur à laquelle l'IA parle de vous quand elle le fait | mentions par 1 000 mots | Mensuel |
| AI Referral Conversion | Ce que vaut une visite référée par IA | % | Mensuel |

Ensemble, elles couvrent la fréquence, la profondeur et la valeur — un simple comptage de citations mélange les trois.

### 1. Citation Rate

Exécutez un ensemble fixe de 10 à 20 prompts sur les plateformes IA qui vous intéressent, et mesurez la part des runs où votre marque ou domaine apparaît :

```
Citation Rate = mentionné (prompt × plateforme) / total des runs × 100
```

10 prompts × 5 plateformes = 50 runs ; 12 mentions = 24 %.

L'ensemble de prompts doit rester figé. Les réponses des LLM sont non déterministes — le même prompt produit des réponses différentes selon les jours — un seul check est du bruit. Suivez la tendance sur un ensemble de prompts inchangé pendant au moins 4 semaines avant d'en tirer des conclusions.

### 2. Brand Mention Density

Le Citation Rate est binaire par run : mentionné ou non. Mais les citations varient en profondeur — un "parmi d'autres options, X" vaut moins qu'un paragraphe expliquant votre approche. La Mention Density mesure les occurrences de termes de marque pour 1 000 mots de texte de réponse :

```python
def mention_density(answer_text: str, brand_terms: list[str]) -> float:
    total_words = len(answer_text.split())
    mentions = sum(answer_text.lower().count(t.lower()) for t in brand_terms)
    return mentions / total_words * 1000
```

Une citation profonde surpasse souvent un tas de citations superficielles. La densité permet de voir la différence.

### 3. AI Referral Conversion

Dans GA4, créez un groupe de canaux (Admin → Groupes de canaux) avec une regex de source de session :

```regex
chatgpt\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com
```

Puis comparez le taux de conversion de ce segment à celui de la Recherche organique. Les mesures de terrain trouvent constamment que les visiteurs référés par IA convertissent à un multiple de l'organique — les données 2026 du secteur rapportent 8 à 12 % vs. 2 à 3 % pour l'organique, et notre propre suivi sur des sites de référence a varié de 2 à 4× l'organique ([configuration de mesure](https://kenimoto.dev/blog/measure-ai-citations-llmo-kpi/) (en anglais)). Le mécanisme : un utilisateur qui demande à une IA "que devrais-je utiliser pour X" est plus avancé dans le processus de décision qu'un utilisateur tapant des mots-clés dans Google. L'IA a fait la recherche ; le clic est plus proche de la décision.

Angle mort connu : les utilisateurs ChatGPT en version gratuite n'envoient souvent pas de référent, donc leurs clics atterrissent dans Direct. Vos chiffres IA dans GA4 sont un plancher, pas un plafond.

## Trois niveaux d'implémentation

Commencez au niveau qui correspond à vos ressources ; chaque niveau ajoute de la résolution.

### Niveau 1 : groupe de canaux GA4 (gratuit, 5 minutes)
La regex ci-dessus. Mesure uniquement les clics — la partie émergée de l'iceberg — mais c'est vérifiable et prend cinq minutes.

### Niveau 2 : le protocole manuel à cinq plateformes (gratuit, 30 minutes/mois)
Un jour fixe par mois, exécutez vos 10 à 15 prompts figés sur ChatGPT, Perplexity, Gemini, Claude et Copilot. Enregistrez par run : mentionné (oui/non), contexte (recommandation / comparaison / neutre / négatif), exactitude, et si une URL a été fournie. Calculez le Citation Rate. Manuel et fastidieux — et toujours la méthode la plus fiable disponible, car aucun outil automatisé ne juge si une mention était une recommandation ou un rejet.

### Niveau 3 : automatiser avec des APIs (une après-midi, ~1 à 8 $/mois)
Le protocole manuel, scripté :

```python
BRAND_TERMS = ["your-site.com", "Your Brand"]
CHECK_QUERIES = ["Best tools for <your category>", ...]  # ensemble figé

def check(query: str, ask) -> dict:
    answer = ask(query)  # appel API OpenAI / Anthropic / Perplexity
    return {
        "query": query,
        "mentioned": any(t.lower() in answer.lower() for t in BRAND_TERMS),
        "density": mention_density(answer, BRAND_TERMS),
        "snippet": answer[:300],
    }
```

Exécutez hebdomadairement via cron, ajoutez à une série temporelle JSON ou CSV. Après 8 à 12 semaines, vous pouvez attribuer les mouvements à des interventions spécifiques : "le taux de citation est passé de 12 % à 28 % après l'ajout de données structurées" est une phrase que le Niveau 3 vous permet de dire.

## Le signal crawler que la plupart des sites ignorent

Les logs d'accès serveur enregistrent déjà quels systèmes IA visitent votre contenu — GPTBot, ClaudeBot, PerplexityBot et Google-Extended s'identifient tous dans le User-Agent :

```bash
grep -E "GPTBot|ClaudeBot|PerplexityBot|Google-Extended" access.log \
  | awk '{print $7}' | sort | uniq -c | sort -rn
```

Les pages qui ne sont jamais crawlées ne peuvent pas être citées depuis l'index en direct. La fréquence de crawl est un indicateur indirect mais avancé : il vous indique quel contenu les systèmes IA ignorent avant que les données de citation puissent le révéler.

## Le cycle d'amélioration

La mesure sans action est de la thésaurisation de données. Un rythme durable :

- **Hebdomadaire (10 min) :** vérifiez le canal IA GA4 et le delta du Citation Rate ; signalez les prompts qui ont produit des citations inhabituellement profondes.
- **Mensuel (30 min) :** examinez la tendance de Mention Density et l'AI Referral Conversion vs. organique ; listez les prompts toujours à zéro citation.
- **Trimestriel (1 heure) :** revue complète — mettez à jour l'ensemble de requêtes, et vérifiez si les modifications de contenu ont produit un mouvement mesurable.

Priorisez les prompts à zéro citation. Faire passer un prompt de 0 % à 10 % est presque toujours moins coûteux que de faire passer un prompt à 30 % à 40 %, parce que le zéro a généralement une cause structurelle — aucune page ne cible cette question, ou la page qui le fait viole la [Clarté des connaissances](/fr/framework/knowledge-clarity/) ou les [Signaux de recherche](/fr/framework/retrieval-signals/).

## Relation avec le LLMO Score

Les métriques de cette page mesurent les *résultats* : si l'IA vous cite réellement. Le [LLMOFramework Score](/fr/specifications/score-v01/) mesure le *substrat* : si les surfaces lisibles par les machines de votre site sont en place. Les vérifications de substrat sont instantanées et déterministes ; les métriques de résultat sont lentes et bruitées. Exécutez les deux — le substrat pour trouver quoi corriger, les résultats pour confirmer que les corrections ont eu un effet.

## Checklist

- [ ] "Citation" est défini en une phrase avant l'adoption de tout outil
- [ ] Un ensemble de 10 à 20 prompts est rédigé et figé
- [ ] GA4 dispose d'un groupe de canaux AI Search avec la regex de référent
- [ ] Le Citation Rate est suivi sur une cadence fixe (hebdomadaire ou mensuelle)
- [ ] La Mention Density distingue les citations profondes des mentions passagères
- [ ] L'AI Referral Conversion est comparée à l'organique, pas vue seule
- [ ] Les logs de crawler sont vérifiés pour les pages que les systèmes IA ne visitent jamais
- [ ] Les prompts à zéro citation pilotent le backlog de contenu
