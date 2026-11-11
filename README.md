# Portfolio — Cédric Sawadogo

> Ingénieur informatique… mais pas que.

Portfolio personnel : ingénierie informatique, transformation digitale, communication, branding, développement web et formation.

## Stack

| Outil | Rôle |
| --- | --- |
| [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) | Interface et typage |
| [Vite](https://vite.dev) | Serveur de développement et build |
| [Tailwind CSS v4](https://tailwindcss.com) | Styles (thème défini dans `src/styles/global.css`) |
| [React Router](https://reactrouter.com) | Navigation multipage |
| [Motion](https://motion.dev) | Animations |
| [Lucide](https://lucide.dev) | Icônes |
| [MDX](https://mdxjs.com) | Articles du blog / Insights |
| [Fontsource](https://fontsource.org) | Polices auto-hébergées (Space Grotesk, Inter, JetBrains Mono) |
| [Oxlint](https://oxc.rs) | Analyse du code |

## Démarrer

Prérequis : Node.js 20.19+ (ou 22.12+).

```bash
npm install      # installe les dépendances
npm run dev      # lance le site sur http://localhost:5173
npm run build    # vérifie les types et génère la version de production dans dist/
npm run preview  # prévisualise la version de production
npm run lint     # analyse le code
```

## Où modifier quoi

| Je veux… | Fichier |
| --- | --- |
| Changer email, réseaux sociaux, disponibilité | `src/config/site.ts` |
| Publier un article | Ajouter un fichier `.mdx` dans `src/content/articles/` |
| Changer les couleurs ou polices | `src/styles/global.css` (bloc `@theme`) |
| Ajouter une page | `src/pages/` + route dans `src/App.tsx` |

### Publier un article

Créer `src/content/articles/mon-article.mdx` :

```mdx
---
title: "Titre de l'article"
description: "Résumé en une phrase."
date: "2026-11-11"
category: "Intelligence artificielle"
cover: "/images/articles/mon-article.jpg"
draft: false
---

Texte en **Markdown**…
```

Catégories disponibles : voir `src/types/content.ts`. Le temps de lecture est calculé automatiquement.
Un article avec `draft: true` n'est visible qu'en développement.

## Structure

```
build/                 Outils exécutés au build (plugin temps de lecture)
public/                Fichiers servis tels quels (logo, images, favicon)
src/
  components/
    layout/            Gabarit général (header, footer)
    navigation/        Menu, navigation mobile
    shared/            Composants réutilisables (SEO…)
    ui/                Boutons, cartes, badges…
  config/site.ts       Configuration centrale (contacts, réseaux)
  content/
    articles/          Articles MDX
    projects/          Visuels et contenus des projets
  data/                Données structurées (services, projets, compétences)
  hooks/               Hooks React personnalisés
  lib/                 Fonctions utilitaires (chargement des articles…)
  pages/               Une page = une route
  sections/            Grandes sections de l'accueil (Hero, Services…)
  styles/              CSS global et thème Tailwind
  types/               Types TypeScript partagés
```

## Branches Git

- `main` — version stable, déployée en production
- `develop` — intégration des fonctionnalités
- `feature/...` — une branche par fonctionnalité, fusionnée dans `develop`

Convention de commits : `feat:`, `fix:`, `style:`, `docs:`, `refactor:`, `chore:`.

## Déploiement

Hébergé sur [Vercel](https://vercel.com). `vercel.json` redirige toutes les routes vers `index.html` pour que les URLs comme `/projets` fonctionnent au rechargement.
