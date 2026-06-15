# Meribis

Recréation du site **Meritis** : site statique, responsive, bilingue FR/EN, sur une stack légère —
**Eleventy v3** + **Tailwind CSS v4** + **JavaScript vanilla** + HTML sémantique.

> `Meribis` est le nom de code interne ; la marque reste `Meritis`.

Documentation : [spec produit](docs/project-spec.md) · [architecture technique](docs/architecture.md) ·
[guidance Claude Code](CLAUDE.md).

## Prérequis

- Node.js **≥ 20** (testé sous Node 24).

## Installation

```bash
npm install
```

## Développement

```bash
npm start
```

Lance en parallèle Eleventy (`--serve`) et Tailwind (`--watch`). Le site est servi sous le préfixe
de production : **http://localhost:8080/Meribis/** (`/` redirige vers `/fr/`).

## Build de production

```bash
npm run build:all
```

Pipeline en trois étapes **dans cet ordre** (Pagefind indexe le HTML déjà généré) :

1. `build:css` — Tailwind CLI v4, minifié → `dist/assets/css/main.css`
2. `build` — Eleventy génère `dist/` (préfixe `/Meribis/`)
3. `build:search` — Pagefind indexe `dist/` → `dist/pagefind/`

Pour un build servi à la racine en local : `npm run build:local` (force `PATH_PREFIX=/`).

## Déploiement

Push sur `main` → GitHub Actions (`.github/workflows/deploy.yml`) exécute `build:all` et publie sur
**GitHub Pages** : https://damienlionet.github.io/Meribis/

> Prérequis côté dépôt (une seule fois) : **Settings → Pages → Build and deployment → Source =
> GitHub Actions**.

## Structure

```
src/
├─ _data/site.json              config globale (nom, URL, formEndpoint…)
├─ _includes/layouts/base.njk   squelette HTML (head SEO, CSS, JS)
├─ assets/css/input.css         Tailwind v4 @theme — tokens de marque
├─ assets/js/main.js            point d'entrée JS vanilla
├─ content/fr/index.njk         page de démonstration (/fr/)
└─ index.njk                    redirection racine / → /fr/
```

## Convention clé — `pathPrefix`

Le site est servi sous `/Meribis/`. **Tout lien interne et tout asset doit passer par le filtre
`url` d'Eleventy** (`{{ '/...' | url }}`) — jamais d'URL absolue en dur, sinon les liens cassent
une fois déployés sous le sous-chemin.
