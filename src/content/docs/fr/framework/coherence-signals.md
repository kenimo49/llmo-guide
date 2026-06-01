---
title: "6. Signaux de cohérence"
description: "Les Signaux de cohérence garantissent qu'un même fait raconte la même histoire sur toutes les surfaces lues par l'IA — HTML, JSON-LD, Markdown, llms.txt. Les incohérences dégradent l'exactitude des citations et érodent la confiance."
pubDate: 2026-05-08
---

## De quoi s'agit-il

> **Frontière avec le Formatage structurel** : le *Formatage structurel* pose la question « chaque surface est-elle individuellement bien formée ? » — JSON-LD valide, HTML sémantique, schéma cadré. Les *Signaux de cohérence* posent la question « les surfaces s'accordent-elles entre elles ? » — même adresse en HTML et en Markdown, mêmes chiffres dans `llms.txt` et dans le profil de la page d'accueil, pas deux entités `Organization` aux champs contradictoires. Une page peut réussir le Formatage structurel et échouer sur la cohérence : chaque bloc est valide, mais ensemble ils racontent deux histoires.

Les Signaux de cohérence mesurent si votre contenu raconte **la même histoire sur toutes les surfaces qu'un agent IA peut lire**. Un site moderne optimisé pour le LLMO expose des faits à travers de nombreux canaux :

- Le corps de la page HTML (visible par les humains et les robots d'IA)
- Les données structurées JSON-LD
- llms.txt et llms-full.txt
- Les endpoints /ai/*.md et URL.md (par exemple `/company.md`)
- Les balises meta OG/Twitter
- Le sitemap, robots.txt, les déclarations hreflang

Quand le même fait (un chiffre, une adresse, un catalogue de services, une date de publication) apparaît différemment sur deux de ces surfaces, un système d'IA qui s'appuie sur les deux se retrouve désorienté. Le modèle peut retenir la valeur à laquelle il accorde le plus de poids, mettre en avant un chiffre périmé, ou refuser de citer parce que le conflit signale une faible qualité.

La cohérence est la discipline LLMO qui consiste à garantir une **source unique de vérité** sur toutes les surfaces.

## Pourquoi c'est important

L'exactitude des citations dépend de la **convergence des preuves**. Quand un modèle récupère votre contenu par plusieurs chemins et que les valeurs concordent, sa confiance augmente et la citation est livrée à l'utilisateur. Quand les valeurs divergent, plusieurs modes d'échec apparaissent :

- **Taux de citation plus faible** — le modèle se replie sur une source dont les preuves internes sont cohérentes.
- **Mauvais fait cité** — si l'IA retient l'ancienne variante de `/ai/founder.md`, le chiffre mis à jour de votre page d'accueil n'atteint jamais l'utilisateur.
- **Amplification des hallucinations** — quand les surfaces se contredisent, le modèle est plus enclin à interpoler une réponse « de compromis » qui ne correspond à aucune des deux.
- **Érosion de l'autorité** — les ré-ordonnanceurs d'IA avisés (Perplexity, AI Overviews) comparent les références croisées ; des auto-références contradictoires se lisent comme un signe de faible qualité.

Un auto-audit mené en 2024 chez [Propel-Lab](https://propel-lab.co.jp/) a révélé que le même profil d'auteur revendiquait à la fois **4 livres / 39 000+ PV sur Qiita** (dans `/ai/founder.md`, `llms-full.txt`) et **14 livres / 80 000+ PV sur Qiita** (dans le composant de profil de la page d'accueil) — une contradiction active servie aux robots d'IA pendant des mois.

## Comment l'implémenter

### 1. Désignez une source unique pour chaque fait

Pour chaque affirmation chiffrée ou factuelle, nommez **un seul** fichier comme source canonique. Toutes les autres surfaces l'importent ou la citent.

| Fait | Source canonique | Consommateurs |
|------|-----------------|---------------|
| Nombre de livres, statistiques de PV | `src/data/profile.ts` | Composant de profil, `/ai/founder.md`, `llms-full.txt`, JSON-LD |
| Catalogue de services | `src/data/services.ts` | `/products/`, JSON-LD `Service[]`, `/ai/services.md`, `llms.txt` |
| Adresse, date de création | `src/data/company.ts` | Pied de page, `/company.md`, JSON-LD `Organization`, `llms-full.txt` |
| Éléments de FAQ | `src/lib/faq-schema.ts` | Composant FAQ, JSON-LD `FAQPage`, `/faq.md` |

Le schéma : une collection de contenu ou un module de données typé → les templates et les endpoints statiques s'y alimentent tous les deux.

### 2. Générez les surfaces destinées à l'IA depuis la même source que le HTML

N'écrivez pas `llms.txt` ou `/ai/*.md` à la main si leur contenu existe déjà dans des données typées :

```typescript
// src/pages/products.md.ts
import { services } from '../data/services';

export const GET: APIRoute = async () => {
  const markdown = services
    .map((s) => `## ${s.name}\n\n${s.summary}\n\n— Cible : ${s.target}`)
    .join('\n\n---\n\n');
  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
```

La vue HTML, le JSON-LD `Service[]` et `/products.md` proviennent tous de `services`. La dérive devient structurellement impossible.

### 3. Traitez la canonicalisation des URL comme une question de cohérence

`https://www.example.com/` et `https://example.com/` sont deux chaînes différentes pour un robot qui compare des chaînes de caractères. Choisissez un hôte canonique, puis imposez-le :

- `<link rel="canonical">` sur chaque page
- `og:url`, JSON-LD `url`, entrées du sitemap — même hôte
- Références dans `/ai/*.md`, `llms.txt` — même hôte
- Liens internes — relatifs ou absolus canoniques, jamais l'hôte alternatif

Un bug courant est d'oublier les fichiers `/ai/*.md` lors d'une migration de `www.` vers l'apex (ou l'inverse). Le reste du site est canonique, et les surfaces Markdown laissent silencieusement fuir le mauvais hôte vers l'IA.

### 4. Traitez la politique de barre oblique finale comme une question de cohérence

Si votre hôte normalise `/blog/post` → `/blog/post/` par une 301, chaque lien interne devrait déjà inclure la barre oblique. Les formes mélangées produisent :

- Du budget de crawl gaspillé en redirections
- Des signaux canoniques contradictoires pendant la fenêtre de redirection
- Du hreflang cassé (certains déclarés avec barre oblique, d'autres sans)

Choisissez une politique au niveau du framework (Astro `trailingSlash: 'always'` ou `'never'`) et passez votre dépôt au grep pour vous assurer qu'aucun écart ne subsiste.

### 5. Détectez la dérive par des vérifications inter-fichiers

Ajoutez une étape de CI qui passe au grep la même affirmation chiffrée ou textuelle sur les différentes surfaces et vérifie leur égalité :

```bash
# Échoue si une source conserve l'ancien nombre de livres
! grep -rn "4 books\|4冊\|Kindle著者: 4" public/ src/data/ src/content/
```

Plus simple encore : un validateur JSON-LD qui parse à la fois les `<script>` en ligne et les fichiers `.jsonld` autonomes, et vérifie qu'ils s'accordent sur les valeurs des `@id` partagés.

### 6. Le processus de release est une surface de cohérence

Un numéro de version est un fait au sens LLMO — une affirmation sur votre site qu'une IA peut citer. Si `package.json` indique `1.2.0`, que `src/data/version.ts` indique `1.1.0`, que la page de changelog affiche `v1.2.0` en anglais mais `v1.1.0` en japonais, et que le dernier tag git est `v1.1.0`, le site se contredit lui-même sur cinq surfaces à propos du même fait.

Ce n'est pas théorique. Le framework que vous lisez a livré exactement cette dérive en v1.2.0 ; l'[étude de cas de l'auto-audit](/fr/case-studies/llmo-framework-self-audit/) consigne ce qui s'est passé.

Le schéma qui l'empêche :

1. **Générez le plus de surfaces de version possible depuis une seule source**. Un script de bump qui met à jour ensemble `package.json` + un module de données typé + le Markdown du changelog est une infrastructure obligatoire pour tout framework qui revendique la cohérence comme valeur.
2. **Rendez la version visible à l'exécution, pas seulement dans les métadonnées**. Un pied de page qui affiche `v{VERSION}` en lisant le module de données typé transforme la dérive de build en retour immédiat côté utilisateur. Un mainteneur qui lance `npm run build` verra l'écart sur chaque page.
3. **Conditionnez la release à des vérifications croisées**. Une étape de CI qui lit la version de `package.json` et la passe au grep dans `CHANGELOG.md`, `src/data/version.ts` et la page de changelog doit sortir avec un code non nul si l'une d'elles diverge.
4. **Lancez une relecture IA en lecture seule en second passage avant de poser le tag**. Le coût se chiffre en quelques centimes de tokens d'API ; le bénéfice est de repérer l'ironie avant les utilisateurs.

Le processus de release, c'est la surface de contenu du framework qui parle à l'IA en temps réel. Traitez-le comme telle.

### 7. Évitez les entités JSON-LD dupliquées pour le même `@id`

L'échec silencieux le plus courant : le layout émet un `Organization` avec une adresse, et un fragment propre à une page émet un autre `Organization` avec une adresse différente. Les deux arrivent dans le HTML. Le robot parse les deux. Le score de confiance de la page chute.

Correctif : attribuez à chaque entité un `@id` au niveau du framework (`https://example.com/#org`, `#founder`, `#website`) et référencez-la par `@id` partout ailleurs. Tout doublon devient évident en revue de code.

## Exemples

**❌ Dérive entre surfaces :**

```markdown
# /ai/founder.md
- Publishing: Kindle author of 4 books
- Technical Writing: 39,000+ PV on Qiita
```

```astro
<!-- src/components/Profile.astro (rendu sur la page d'accueil) -->
<p>Kindle 14冊・Qiita 80,000+ PV。</p>
```

```jsonld
// JSON-LD sur /
{ "@type": "Person", "name": "Ken Imoto" /* aucun chiffre actuel */ }
```

Trois surfaces, trois histoires différentes. Une IA qui cite `/ai/founder.md` rapporte des chiffres périmés ; une IA qui cite le HTML rapporte les chiffres actuels ; le JSON-LD n'aide en rien à résoudre le conflit.

**✅ Source unique :**

```typescript
// src/data/profile.ts — canonique
export const profile = {
  highlights: [
    'Kindle author: 14 books',
    'Qiita: 80,000+ PV',
  ],
};
```

```astro
<!-- Composant de profil -->
{profile.highlights.map(h => <li>{h}</li>)}
```

```typescript
// src/pages/founder.md.ts
return new Response(
  `# Founder\n\n${profile.highlights.map(h => `- ${h}`).join('\n')}`,
  { headers: { 'Content-Type': 'text/markdown' } }
);
```

Une valeur vit à un seul endroit. La vue HTML, l'endpoint Markdown destiné à l'IA et le JSON-LD évoluent tous ensemble.

## Checklist

- [ ] Chaque affirmation factuelle (chiffres, adresses, dates, catalogues) a exactement un fichier source canonique
- [ ] Les surfaces réservées à l'IA (`llms.txt`, `/ai/*.md`, endpoints URL.md) sont générées à partir des mêmes données que le HTML, pas maintenues à la main en parallèle
- [ ] L'hôte canonique est cohérent à travers `<link rel="canonical">`, `og:url`, JSON-LD, le sitemap et les surfaces Markdown
- [ ] La politique de barre oblique finale est définie au niveau du framework et reflétée dans chaque lien interne
- [ ] Deux blocs JSON-LD ne décrivent pas la même entité avec des valeurs différentes ; les entités utilisent un `@id` stable pour les références inter-pages
- [ ] La CI vérifie la dérive inter-fichiers sur les métriques clés (nombre de livres, statistiques de PV, listes de services)
- [ ] Un audit périodique en deux passages (auto-relecture → relecture IA en second avis) capture la dérive entre les releases — voir [Audit LLMO : relecture en deux passages](/fr/guide/llmo-audit-two-pass-review/)
