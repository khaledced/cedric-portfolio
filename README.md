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
| [Fontsource](https://fontsource.org) | Polices auto-hébergées : Archivo (titres), Geist (texte), JetBrains Mono (étiquettes) |
| [Oxlint](https://oxc.rs) | Analyse du code |
| [Vitest](https://vitest.dev) | Tests automatisés |

## Démarrer

Prérequis : Node.js 20.19+ (ou 22.12+).

```bash
npm install      # installe les dépendances
npm run dev      # lance le site sur http://localhost:5173
npm run build    # vérifie les types, génère la version de production et pré-rend chaque page
npm run preview  # prévisualise la version de production (http://localhost:4173)
npm run lint     # analyse le code
npm test         # lance les tests automatisés
```

## Pré-rendu et référencement

Au build, chaque page est générée en HTML complet (`scripts/prerender.mjs`, à partir de `src/entry-server.tsx`) :
Google et les aperçus de liens (LinkedIn, WhatsApp, Facebook) voient le vrai titre, la description,
l'image de partage et le contenu, sans exécuter de JavaScript. Le navigateur reprend ensuite la main
(« réhydratation »). Les nouvelles pages de projets et d'articles sont pré-rendues automatiquement.

- `public/og-image.png` : image de partage (1200×630), source dans `scripts/og-image.html`.
- `siteConfig.url` (dans `src/config/site.ts`) : **à renseigner après le premier déploiement** ;
  active les adresses canoniques, l'image de partage en adresse absolue et le `sitemap.xml`.
- Contenu dépendant de l'adresse (`?categorie=`, `?q=`) : utiliser `useIsClient()` pour que le
  premier rendu corresponde au HTML pré-rendu.

## Où modifier quoi

| Je veux… | Fichier |
| --- | --- |
| Changer email, réseaux sociaux, disponibilité | `src/config/site.ts` |
| Publier un article | Ajouter un fichier `.mdx` dans `src/content/articles/` |
| Changer les couleurs ou polices | `src/styles/global.css` (bloc `@theme`) |
| Ajouter une page | `src/pages/` + route dans `src/routes.tsx` + adresse dans `getStaticPaths` (`src/entry-server.tsx`) |

### Publier un article

Créer `src/content/articles/mon-article.mdx` :

```mdx
---
title: "Titre de l'article"
description: "Résumé en une phrase."
date: "2026-11-11"
category: "Intelligence artificielle"
cover: "/images/articles/mon-article.webp"
coverAlt: "Description de l'image de couverture"
---

Texte en **Markdown**…
```

Catégories disponibles : voir `src/types/content.ts`. Le temps de lecture est calculé automatiquement.
Un modèle montrant toutes les mises en forme se trouve dans `src/content/articles/exemple-article.mdx`.

Un article avec `draft: true` n'est visible qu'en développement : son contenu est entièrement
retiré de la version de production (plugin `build/vite-plugin-drafts.ts`).

## Formulaire de contact

Les messages sont envoyés via [Web3Forms](https://web3forms.com) (gratuit, sans serveur).

1. Sur web3forms.com, saisir l'adresse email qui doit recevoir les messages : la clé d'accès arrive par email.
2. En local : copier `.env.example` en `.env` et y coller la clé (`VITE_WEB3FORMS_ACCESS_KEY=...`), puis relancer `npm run dev`.
3. Sur Vercel : Project → Settings → Environment Variables → ajouter `VITE_WEB3FORMS_ACCESS_KEY`, puis redéployer.

Sans clé, le formulaire l'indique clairement et renvoie vers les autres coordonnées : aucun envoi n'est simulé.
Le fichier `.env` est exclu de Git.

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

Hébergé sur [Vercel](https://vercel.com). `vercel.json` active les adresses propres (`/projets` sert `projets.html`), la vraie page 404, le cache longue durée des fichiers `assets/` et quelques en-têtes de sécurité.
