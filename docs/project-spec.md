# Objectif de projet — Recréation du site Meritis avec 11ty, Tailwind CSS et JavaScript vanilla

## 1. Résumé

Créer une nouvelle version responsive, bilingue FR/EN, du site Meritis en s’inspirant de l’existant, avec une stack volontairement simple :

- **11ty / Eleventy** pour la génération statique.
- **Tailwind CSS** pour le design system, les composants et le responsive.
- **CSS custom** pour les détails graphiques, animations légères et tokens de marque.
- **JavaScript vanilla** pour les interactions côté client.
- **HTML sémantique** pour l’accessibilité, le SEO et la performance.

Le site ne doit pas être une copie pixel-perfect. Il doit reprendre les repères de marque existants — logo, palette, tonalité premium et sobre — tout en retravaillant le style final pour produire une interface plus claire, plus moderne, plus rapide et plus maintenable.

---

## 2. Objectifs principaux

### Objectifs business

- Présenter le groupe Meritis, ses expertises et sa proposition de valeur.
- Mettre en avant les contenus éditoriaux : blog, actualités, ressources.
- Valoriser l’espace carrière et les offres d’emploi.
- Proposer une expérience cohérente en français et en anglais.
- Améliorer la performance, l’accessibilité et la lisibilité du site.

### Objectifs techniques

- Générer les pages statiquement avec 11ty.
- Gérer les pages de blog et les offres d’emploi à partir de fichiers sources versionnables.
- Éviter tout framework JavaScript lourd.
- Permettre une maintenance simple par des profils techniques ou semi-techniques.
- Prévoir une structure extensible pour ajouter d’autres types de contenus plus tard.

---

## 3. Périmètre fonctionnel

### Pages statiques prioritaires

- Accueil
- Société / À propos
- Expertises
- Ressources
- Contact / Parlons de votre projet
- Rejoindre le groupe
- Mentions légales
- Politique de confidentialité

### Pages générées dynamiquement par 11ty

#### Blog

- Page liste du blog.
- Page détail d’un article.
- Pagination.
- Filtres par catégorie.
- Recherche côté client.
- Articles liés.
- Métadonnées SEO par article.
- Version française et anglaise.

#### Offres d’emploi

- Page liste des offres.
- Page détail d’une offre.
- Filtres par ville, type de contrat, métier, type de poste.
- Recherche côté client.
- CTA de candidature.
- Version française et anglaise.

---

## 4. Inspiration éditoriale et structure du site existant

Le site actuel met en avant :

- Un positionnement de conseil IT, finance et transformation.
- Une navigation structurée autour des rubriques : Société, Expertises, Ressources, Actus / Presse, Rejoindre le groupe.
- Un espace blog avec recherche, catégories et pagination.
- Une page offres d’emploi avec filtres par type de poste, contrat, métier et ville.
- Une identité graphique 2025 avec logo Meritis, bleu profond, tons clairs et touches dorées.

La nouvelle version doit conserver ces repères, mais simplifier les parcours et moderniser l’interface.

---

## 5. Stack technique

```txt
11ty / Eleventy
Tailwind CSS
CSS custom
JavaScript vanilla
HTML
Markdown
YAML ou JSON
```

### Choix recommandés

- **11ty** : moteur de génération statique.
- **Nunjucks** : moteur de templates principal.
- **Markdown + front matter YAML** : format source des articles de blog et des offres d’emploi.
- **JSON** : données globales, navigation, traductions, configuration du site.
- **Tailwind CSS** : layout, responsive, composants.
- **PostCSS / Autoprefixer** : build CSS.
- **Vanilla JS** : menu mobile, filtres, recherche, accordéons, animations légères.

---

## 6. Architecture proposée

```txt
src/
  _data/
    site.json
    navigation.json
    i18n.json
    taxonomies.json

  _includes/
    layouts/
      base.njk
      page.njk
      blog-post.njk
      job-post.njk
    partials/
      head.njk
      header.njk
      footer.njk
      nav.njk
      language-switcher.njk
      breadcrumbs.njk
      cta-block.njk
      card-blog.njk
      card-job.njk
      filters-blog.njk
      filters-jobs.njk

  assets/
    css/
      input.css
      brand.css
    js/
      main.js
      filters.js
      search.js
    images/
      brand/
      blog/
      jobs/

  content/
    fr/
      pages/
        index.md
        a-propos.md
        expertises.md
        rejoindre.md
        contact.md
      blog/
        article-exemple.md
      jobs/
        data-engineer.md

    en/
      pages/
        index.md
        about.md
        expertise.md
        join-us.md
        contact.md
      blog/
        sample-article.md
      jobs/
        data-engineer.md

  admin/
    README.md

.eleventy.js
tailwind.config.js
package.json
README.md
```

---

## 7. Routes attendues

### Français

```txt
/fr/
/fr/a-propos/
/fr/expertises/
/fr/ressources/
/fr/blog/
/fr/blog/[slug]/
/fr/offres/
/fr/offres/[slug]/
/fr/rejoindre-le-groupe/
/fr/contact/
/fr/mentions-legales/
/fr/politique-confidentialite/
```

### Anglais

```txt
/en/
/en/about/
/en/expertise/
/en/resources/
/en/blog/
/en/blog/[slug]/
/en/jobs/
/en/jobs/[slug]/
/en/join-us/
/en/contact/
/en/legal-notice/
/en/privacy-policy/
```

### Redirection

```txt
/ -> /fr/
```

Le choix de langue peut être stocké en `localStorage`, mais les pages doivent rester accessibles directement via leurs URL.

---

## 8. Format des contenus

### 8.1 Blog — format source recommandé

Chaque article est un fichier Markdown avec front matter YAML.

```md
---
title: "Performance CI/CD pour améliorer la productivité"
slug: "performance-ci-cd-productivite"
locale: "fr"
translationKey: "ci-cd-performance"
date: "2026-02-02"
author: "Corentin Prigent"
category: "Développement applicatif"
tags:
  - DevOps
  - CI/CD
  - Qualité
excerpt: "La performance CI/CD est un enjeu clé pour accélérer les cycles de livraison tout en maintenant un haut niveau de qualité."
image: "/assets/images/blog/performance-ci-cd.jpg"
imageAlt: "Illustration abstraite sur les pipelines CI/CD"
featured: true
seo:
  title: "Performance CI/CD : améliorer la productivité"
  description: "Comprendre comment optimiser les pipelines CI/CD pour améliorer la productivité des équipes."
---

Contenu de l’article en Markdown.
```

### 8.2 Offres d’emploi — format source recommandé

Chaque offre est un fichier Markdown avec front matter YAML.

```md
---
title: "Data Engineer (H/F)"
slug: "data-engineer"
locale: "fr"
translationKey: "data-engineer"
published: true
date: "2026-01-15"
contract: "CDI"
jobType: "Consultant"
businessLine: "Data & IA"
location: "Paris"
remote: "Hybride"
experience: "3 ans minimum"
applyUrl: "/fr/contact/?subject=candidature-data-engineer"
summary: "Rejoignez Meritis pour accompagner des clients grands comptes sur des projets data à forte valeur ajoutée."
skills:
  - Python
  - SQL
  - Cloud
  - Data pipelines
seo:
  title: "Offre Data Engineer — Meritis Paris"
  description: "Poste Data Engineer en CDI à Paris chez Meritis."
---

## Mission

Décrire la mission.

## Profil recherché

Décrire le profil.

## Pourquoi nous rejoindre ?

Décrire les avantages et la culture.
```

### Pourquoi Markdown + front matter ?

- Lisible dans un éditeur de texte.
- Versionnable dans Git.
- Facile à relire et à traduire.
- Compatible nativement avec 11ty.
- Adapté aux pages détail longues, comme les articles et les offres.

---

## 9. Collections 11ty

### Collections attendues

- `blog_fr`
- `blog_en`
- `jobs_fr`
- `jobs_en`
- `featured_blog_fr`
- `featured_blog_en`
- `published_jobs_fr`
- `published_jobs_en`

### Exemple de logique dans `.eleventy.js`

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("blog_fr", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/fr/blog/*.md")
      .filter((item) => item.data.published !== false)
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("jobs_fr", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/fr/jobs/*.md")
      .filter((item) => item.data.published !== false)
      .sort((a, b) => b.date - a.date);
  });
};
```

---

## 10. Gestion du multilingue

### Principe

- Une arborescence par langue : `/fr/` et `/en/`.
- Un champ `locale` dans chaque fichier source.
- Un champ `translationKey` pour relier les versions FR et EN d’un même contenu.
- Un fichier global de traductions pour les labels UI.

### Exemple `src/_data/i18n.json`

```json
{
  "fr": {
    "blog": "Blog",
    "jobs": "Offres d’emploi",
    "readMore": "Lire la suite",
    "apply": "Postuler",
    "search": "Rechercher",
    "all": "Tout"
  },
  "en": {
    "blog": "Blog",
    "jobs": "Jobs",
    "readMore": "Read more",
    "apply": "Apply",
    "search": "Search",
    "all": "All"
  }
}
```

---

## 11. Design system

### Direction artistique

Le style final doit être inspiré de Meritis, mais retravaillé :

- Plus éditorial.
- Plus aéré.
- Plus premium.
- Moins institutionnel.
- Plus lisible sur mobile.
- Forte hiérarchie typographique.
- Blocs visuels sobres.
- Utilisation mesurée des arcs du logo comme motif graphique secondaire.

### Palette de couleurs inspirée de la charte Meritis 2025

Palette extraite visuellement de la palette publiée sur le site Meritis. Les valeurs ci-dessous sont à considérer comme une base de travail à confirmer avec les assets officiels.

#### Palette principale

```txt
Bleu profond      #005A6A
Doré              #E1B55E
Anthracite        #3A3A3A
Gris très clair   #F3F3F3
Ivoire            #FCF9F3
```

#### Palette secondaire

```txt
Bleu nuit         #0A3840
Or brun           #B7934C
Bleu clair        #9DCDF1
Gris clair        #D9D9D9
Bleu grisé        #6CA3AB
```

### Tokens CSS recommandés

```css
:root {
  --color-brand-blue: #005a6a;
  --color-brand-gold: #e1b55e;
  --color-brand-charcoal: #3a3a3a;
  --color-brand-light: #f3f3f3;
  --color-brand-ivory: #fcf9f3;

  --color-brand-blue-dark: #0a3840;
  --color-brand-gold-dark: #b7934c;
  --color-brand-blue-light: #9dcdf1;
  --color-brand-gray: #d9d9d9;
  --color-brand-blue-muted: #6ca3ab;

  --radius-card: 1.25rem;
  --radius-button: 999px;

  --shadow-soft: 0 18px 60px rgb(0 0 0 / 0.08);
  --container: 72rem;
}
```

### Configuration Tailwind recommandée

```js
module.exports = {
  content: ["./src/**/*.{njk,md,html,js}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#005A6A",
          gold: "#E1B55E",
          charcoal: "#3A3A3A",
          light: "#F3F3F3",
          ivory: "#FCF9F3",
          midnight: "#0A3840",
          muted: "#6CA3AB"
        }
      },
      borderRadius: {
        card: "1.25rem",
        button: "999px"
      }
    }
  },
  plugins: []
};
```

---

## 12. Logo et assets de marque

### À reprendre

- Logo Meritis 2025.
- Variantes : couleur, blanc sur fond bleu, blanc sur fond doré.
- Motif d’arcs graphiques, à utiliser avec retenue.

### Recommandations

- Stocker les fichiers dans `src/assets/images/brand/`.
- Utiliser prioritairement du SVG si disponible.
- Prévoir des alternatives accessibles :
  - `alt="Meritis"`
  - largeur / hauteur définies
  - version claire et sombre selon le fond

### Attention

Les assets du site existant doivent être utilisés uniquement si les droits d’usage sont validés. À défaut, prévoir une phase de récupération officielle des fichiers auprès du client ou de l’équipe marque.

---

## 13. Composants UI

### Composants globaux

- Header responsive.
- Navigation desktop avec sous-menus.
- Menu mobile accessible.
- Sélecteur de langue.
- Footer structuré.
- Breadcrumbs.
- Bloc CTA.
- Boutons primaires / secondaires.
- Cards.
- Tags.
- Filtres.
- Pagination.
- Formulaire de contact.
- Bloc newsletter si requis.

### Composants blog

- Carte article.
- Filtres catégories.
- Barre de recherche.
- Liste paginée.
- Hero article.
- Sommaire automatique si nécessaire.
- Articles liés.
- Bloc auteur.

### Composants offres

- Carte offre.
- Filtres métier / ville / contrat / type de poste.
- Barre de recherche.
- Page détail offre.
- Bloc de candidature.
- CTA candidature spontanée.

---

## 14. Interactions JavaScript vanilla

### Interactions nécessaires

- Ouverture / fermeture du menu mobile.
- Sous-menus accessibles au clavier.
- Recherche côté client sur le blog.
- Recherche côté client sur les offres.
- Filtres combinés sur blog et offres.
- Accordéons.
- Bouton retour en haut si nécessaire.
- Sauvegarde optionnelle de la langue préférée.

### Contraintes

- Pas de dépendance lourde.
- Pas de framework SPA.
- Dégradation acceptable si JavaScript désactivé :
  - les pages restent consultables ;
  - les listes restent visibles ;
  - les filtres peuvent être considérés comme amélioration progressive.

---

## 15. Responsive design

### Breakpoints recommandés

```txt
sm  640px
md  768px
lg  1024px
xl  1280px
2xl 1536px
```

### Exigences

- Toutes les pages doivent être utilisables sur mobile, tablette et desktop.
- Navigation mobile simple, lisible et accessible.
- Cards en une colonne sur mobile, grille sur desktop.
- Filtres repliables sur mobile.
- Images optimisées et recadrées proprement.
- Aucun scroll horizontal non voulu.

---

## 16. Accessibilité

### Niveau cible

Viser WCAG 2.2 AA.

### Exigences minimales

- HTML sémantique.
- Un seul `h1` par page.
- Ordre logique des titres.
- Contrastes suffisants.
- Focus visible sur tous les éléments interactifs.
- Navigation clavier complète.
- Labels explicites sur les formulaires.
- Attributs `aria-expanded` / `aria-controls` sur les menus et accordéons.
- Textes alternatifs pertinents.
- Respect de `prefers-reduced-motion`.

---

## 17. SEO et métadonnées

### À générer pour chaque page

- `title`
- `description`
- URL canonique
- Open Graph
- Twitter Card
- `hreflang` FR / EN
- données structurées si pertinent

### Blog

- Données structurées `Article`.
- Auteur.
- Date de publication.
- Date de modification si disponible.
- Image sociale.

### Offres d’emploi

- Données structurées `JobPosting` si les données sont suffisantes.
- Lieu.
- Type de contrat.
- Date de publication.
- Description.

---

## 18. Performance

### Objectifs

- Score Lighthouse Performance cible : 90+.
- Score Accessibilité cible : 90+.
- Score SEO cible : 90+.
- JavaScript minimal.
- CSS purgé en production.
- Images optimisées.
- Fonts chargées localement ou avec stratégie de fallback performante.

### Recommandations

- Générer plusieurs tailles d’images.
- Utiliser `loading="lazy"` hors hero.
- Précharger uniquement les ressources critiques.
- Limiter les animations à des transitions CSS légères.
- Éviter les carrousels lourds.

---

## 19. Contenu et migration

### Étapes de migration

1. Auditer les pages actuelles.
2. Identifier les contenus à conserver, réécrire ou supprimer.
3. Créer les fichiers Markdown FR.
4. Créer les versions EN.
5. Valider les slugs.
6. Associer les traductions avec `translationKey`.
7. Optimiser les images.
8. Relire SEO et accessibilité.
9. Valider la cohérence de navigation.

### Règles de nommage

- Slugs en minuscules.
- Mots séparés par des tirets.
- Pas d’accents dans les URLs.
- Un `translationKey` stable pour relier les langues.
- Dates au format ISO `YYYY-MM-DD`.

---

## 20. Scripts npm recommandés

```json
{
  "scripts": {
    "dev": "eleventy --serve",
    "build": "NODE_ENV=production eleventy",
    "css": "tailwindcss -i ./src/assets/css/input.css -o ./dist/assets/css/main.css --watch",
    "build:css": "tailwindcss -i ./src/assets/css/input.css -o ./dist/assets/css/main.css --minify",
    "start": "npm-run-all --parallel dev css",
    "build:all": "npm run build:css && npm run build"
  }
}
```

---

## 21. Dépendances recommandées

```txt
@11ty/eleventy
tailwindcss
postcss
autoprefixer
npm-run-all
```

Optionnel :

```txt
@11ty/eleventy-img
@11ty/eleventy-plugin-rss
markdown-it-anchor
markdown-it-table-of-contents
```

---

## 22. Critères d’acceptation

### Général

- Le site est généré par 11ty.
- La stack ne contient pas de framework JS lourd.
- Le site est responsive sur toutes les pages.
- Les versions FR et EN sont disponibles.
- Le logo et les couleurs Meritis sont intégrés.
- Le style final est retravaillé et non copié à l’identique.

### Blog

- Les articles sont générés depuis des fichiers Markdown.
- La liste du blog affiche les articles publiés.
- Les articles sont triés par date décroissante.
- Les catégories sont affichées.
- La recherche fonctionne côté client.
- Les pages détail sont générées automatiquement.
- Les URLs FR et EN sont distinctes.

### Offres d’emploi

- Les offres sont générées depuis des fichiers Markdown.
- La liste affiche les offres publiées.
- Les filtres par contrat, ville, métier et type de poste fonctionnent.
- La recherche fonctionne côté client.
- Les pages détail sont générées automatiquement.
- Un CTA de candidature est présent sur chaque offre.

### Qualité

- Aucune erreur HTML bloquante.
- Score Lighthouse cible : 90+ sur Performance, Accessibilité, SEO.
- Navigation clavier fonctionnelle.
- Contrastes validés.
- Assets optimisés.
- Build reproductible via `npm run build:all`.

---

## 23. Livrables attendus

- Repository Git.
- Documentation d’installation.
- Documentation de contribution éditoriale.
- Structure 11ty complète.
- Templates Nunjucks.
- Composants réutilisables.
- Pages statiques FR/EN.
- Collections blog FR/EN.
- Collections offres FR/EN.
- Design system Tailwind.
- Fichiers CSS de marque.
- Scripts JavaScript vanilla.
- Assets optimisés.
- Rapport Lighthouse final.

---

## 24. Planning indicatif

### Phase 1 — Cadrage

- Audit du site existant.
- Validation de l’arborescence.
- Validation de la direction artistique.
- Définition des contenus à migrer.

### Phase 2 — Socle technique

- Initialisation 11ty.
- Configuration Tailwind.
- Création des layouts.
- Mise en place du multilingue.
- Mise en place des collections.

### Phase 3 — Design system

- Tokens de marque.
- Header / footer.
- Composants cards, CTA, tags, boutons.
- Responsive global.

### Phase 4 — Pages et contenus

- Pages statiques.
- Blog.
- Offres d’emploi.
- Formulaires / CTA.
- Traductions.

### Phase 5 — Qualité et livraison

- Tests responsive.
- Tests accessibilité.
- Optimisation performance.
- Relecture SEO.
- Documentation.
- Livraison.

---

## 25. Points à valider

- Les droits d’utilisation du logo et des assets Meritis.
- Les fichiers sources officiels de la charte graphique.
- Le périmètre exact des pages à recréer.
- Le niveau de fidélité attendu par rapport au site actuel.
- Le mode de candidature : lien externe, formulaire interne ou email.
- Le mode de gestion des traductions.
- Le volume initial d’articles et d’offres à migrer.
- Le besoin ou non d’un CMS headless à terme.

---

## 26. Définition du succès

Le projet est réussi si la nouvelle version du site :

- restitue clairement l’identité Meritis ;
- propose une expérience plus moderne et plus fluide que le site actuel ;
- reste simple à maintenir ;
- permet de publier des articles et des offres sans toucher aux templates ;
- fonctionne parfaitement en FR et EN ;
- obtient de bons scores de performance, SEO et accessibilité ;
- respecte une stack simple : 11ty, Tailwind CSS, CSS, JavaScript vanilla et HTML.
