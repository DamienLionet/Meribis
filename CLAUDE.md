# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet Meribis

Recréation du site **Meritis** : site statique, responsive, bilingue FR/EN, sur une stack
volontairement légère — **11ty (Eleventy)** + **Tailwind CSS** + **JavaScript vanilla** + HTML
sémantique. Pas de framework SPA, pas de dépendance lourde.

L'objectif n'est pas une copie pixel-perfect : on reprend les repères de marque Meritis (logo,
palette bleu/doré, ton premium et sobre) mais on retravaille l'interface pour la rendre plus
claire, moderne et maintenable.

> **Note de nommage** : `Meribis` est le nom de code interne du projet (le client/la marque
> reste `Meritis`). L'ancien titre « Meribus » était une coquille.

## État actuel : dépôt vierge

**Il n'y a encore aucun code** — seulement la spec dans [docs/project-spec.md](docs/project-spec.md).
Tout ce qui suit (commandes, arborescence) décrit la cible à construire, pas l'existant.

Le **socle build a été scaffoldé** (`package.json`, `eleventy.config.js`, `input.css`, `base.njk`,
page de fumée, `.gitignore`) mais **les dépendances ne sont pas encore installées** ni le serveur
lancé. Étapes suivantes et avancement détaillé : [docs/architecture.md §11](docs/architecture.md).

Deux documents de référence :
- [docs/project-spec.md](docs/project-spec.md) — **spec produit/fonctionnelle**, source de vérité.
- [docs/architecture.md](docs/architecture.md) — **architecture technique cible**, pipeline de
  build, déploiement et état d'avancement.

La spec décrivait Tailwind v3 / `.eleventy.js` CommonJS : c'est **obsolète**, les décisions
ci-dessous priment. Lire ces docs avant de proposer une structure, et signaler tout écart.

## Décisions techniques (verrouillées le 2026-06-15)

Ces choix tranchent les options laissées ouvertes dans la spec. **Ils priment sur la spec** en cas de
divergence (la spec décrivait Tailwind v3 / `.eleventy.js` CommonJS — c'est obsolète ici).

- **Eleventy v3 en ESM** : config `eleventy.config.js` avec `export default`, pas de `.eleventy.js`
  CommonJS.
- **Tailwind CSS v4** : config *CSS-first* via `@theme` dans `src/assets/css/input.css`. **Pas de
  `tailwind.config.js`, pas de PostCSS ni Autoprefixer** (v4 gère préfixes + nesting nativement). Les
  tokens de marque de la spec (§11) deviennent des variables `@theme`.
- **Recherche : Pagefind** — indexation du HTML généré, après le build Eleventy. Pas d'index JSON
  maintenu à la main.
- **Formulaires : service externe** — l'URL d'`action` n'est pas en dur. Elle vit dans
  `src/_data/site.json` (ex. `formEndpoint`) et reste à fournir par le client. Les formulaires
  (contact + candidature) pointent dessus.
- **Hébergement : GitHub Pages, page projet** sur `https://damienlionet.github.io/Meribis/`.
  Repo : `DamienLionet/Meribis`, déploiement sur push `main`.
  - **`pathPrefix = "/Meribis/"`** (pilotable par `process.env.PATH_PREFIX`, défaut `/Meribis/`).
    **Tout lien/asset doit passer par le filtre `url` d'Eleventy** — jamais d'URL absolue en dur,
    sinon ça casse sous le sous-chemin. Base de recherche Pagefind à aligner sur ce préfixe.
  - **Pas de backend** : la redirection `/ → /fr/` est une page `index.html` racine (meta-refresh
    + JS + `<link rel="canonical">`), pas une redirection serveur. Formulaires → service externe.
  - **CI GitHub Actions** : `npm ci` → `build:all` → upload de `dist/` → déploiement Pages.
    Ajouter `.nojekyll` dans la sortie.

## Commandes (cibles, une fois le projet initialisé)

```
npm start            # dev : eleventy --serve + tailwind --watch en parallèle
npm run build:all    # pipeline complet : CSS → site → index de recherche
  # 1. build:css     -> tailwindcss CLI v4, minifié, vers dist/assets/css/
  # 2. build         -> eleventy (génère dist/ avec pathPrefix /Meribis/)
  # 3. build:search  -> pagefind --site dist (indexe le HTML généré)
```

> **Windows** : machine de dev sous Windows / PowerShell. Les scripts npm qui préfixent une variable
> d'env en syntaxe POSIX (`NODE_ENV=production …`) **échouent** tel quel. Utiliser `cross-env` dans
> tous les scripts concernés — ça les rend identiques en PowerShell **et** dans la CI Linux.
>
> **Ordre de build non négociable** : Pagefind indexe le HTML **déjà généré**, donc il tourne
> **après** Eleventy (étape `postbuild` / dernier maillon de `build:all`), jamais avant.

## Architecture cible

Le détail complet (routes, front matter, design tokens, composants) est dans
[docs/project-spec.md](docs/project-spec.md). Les points structurants à garder en tête :

- **Une arborescence par langue** sous `src/content/{fr,en}/` (pages, blog, jobs). Les URLs FR et EN
  sont distinctes et accessibles en direct ; `/` redirige vers `/fr/`.
- **Liaison des traductions** : chaque fichier source porte un champ `locale` + un `translationKey`
  stable. C'est `translationKey` (et non le slug) qui relie la version FR et EN d'un même contenu —
  indispensable pour le sélecteur de langue et les `hreflang`.
- **Contenu = Markdown + front matter YAML** (jamais en dur dans les templates) : articles de blog
  et offres d'emploi. Objectif clé : **publier sans toucher aux templates**.
- **Collections 11ty par langue et par type** (`blog_fr`, `blog_en`, `jobs_fr`, `jobs_en`, +
  variantes `featured_*` / `published_*`), définies dans `.eleventy.js`. Filtrer sur
  `published !== false`, trier par date décroissante.
- **Templates Nunjucks** : layouts (`base`, `page`, `blog-post`, `job-post`) + partials réutilisables
  dans `src/_includes/`.
- **Données globales** dans `src/_data/` : `site.json`, `navigation.json`, `i18n.json` (labels UI
  par langue), `taxonomies.json`.
- **JS vanilla en amélioration progressive** : menu mobile, filtres combinés et recherche
  côté client (blog + offres), accordéons. Le site doit rester consultable sans JS.

## Conventions

- **Slugs** : minuscules, tirets, **sans accent**, pas dans l'URL.
- **Dates** : ISO `YYYY-MM-DD`.
- **`translationKey`** : stable et identique entre FR et EN.
- **Cible qualité** : Lighthouse 90+ (Performance, Accessibilité, SEO), WCAG 2.2 AA, un seul `h1`
  par page, CSS purgé en prod, JS minimal.

## Principes de travail

**1. Réfléchir avant de coder.** Ne rien présumer. Énoncer les hypothèses ; en cas de doute, poser
la question. S'il existe plusieurs interprétations, les présenter au lieu de trancher en silence.
S'il existe une approche plus simple, le dire.

**2. La simplicité avant tout.** Le minimum de code qui résout le problème, rien de spéculatif :
pas de fonctionnalité, d'abstraction, de « flexibilité » ou de gestion d'erreur non demandées. Si
200 lignes en valent 50, réécrire. Test : un ingénieur senior trouverait-il ça trop compliqué ?

**3. Modifications chirurgicales.** Ne toucher qu'au nécessaire. Ne pas « améliorer » le code
adjacent, ne pas refactorer ce qui marche, respecter le style existant. Supprimer les imports /
variables que *vos* modifications rendent inutiles ; signaler le code mort préexistant sans le
supprimer (sauf demande).

**4. Exécution axée objectifs.** Transformer les tâches en critères vérifiables (« ajouter une
validation » → « écrire les tests des entrées invalides puis les faire passer » ; « corriger le
bug » → « écrire un test qui le reproduit puis le faire passer »). Pour le multi-étapes, donner un
plan succinct `étape → vérification` et boucler jusqu'à validation.
