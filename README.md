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

Un article = un PDF + un petit fichier d'informations. Tout est expliqué dans
[`src/content/articles/LISEZMOI.md`](src/content/articles/LISEZMOI.md) :

1. déposer `mon-article.pdf` dans `src/content/articles/pdf/` ;
2. créer `src/content/articles/mon-article.mdx` avec son en-tête (titre, description, date, catégorie).

Le site affiche l'article dans un lecteur PDF, avec lecture en plein écran et téléchargement.
Option : écrire l'article en texte avec `generatePdf: true` et lancer `npm run pdf` pour produire
le PDF avec le gabarit du site (logo, coordonnées, texte justifié). Modèle :
`src/content/articles/claude-opus-5-motion-design.mdx`.

Un article avec `draft: true` n'est visible qu'en développement : son contenu est entièrement
retiré de la version de production (plugin `build/vite-plugin-drafts.ts`).

## Formulaire de contact

Les messages sont envoyés à l'adresse de `src/config/site.ts` (`contact.email`) via
[FormSubmit](https://formsubmit.co), sans compte ni clé.

- **Activation, une seule fois** : au premier message, FormSubmit envoie un email d'activation
  à cette adresse ; cliquer sur le lien. Voir l'étape 5 de [`DEPLOIEMENT.md`](DEPLOIEMENT.md).
- **Facultatif** : `VITE_FORMSUBMIT_ID` (identifiant fourni par FormSubmit) masque l'adresse dans le code ;
  `VITE_WEB3FORMS_ACCESS_KEY` permet d'utiliser Web3Forms à la place. Voir `.env.example`.

Le fichier `.env` est exclu de Git.

## Performance

- Pages pré-rendues en HTML : le contenu s'affiche avant même le chargement du JavaScript.
- Apparitions au défilement en CSS (`Reveal`) : rien n'est masqué dans le HTML ; seuls les blocs
  sous l'écran apparaissent en fondu.
- Code découpé par page, préchargé en arrière-plan une fois l'accueil affiché : navigation instantanée.
- La bibliothèque d'animation (motion) n'est chargée que sur la page Projets.
- Les listes d'articles ne chargent que les en-têtes (`build/vite-plugin-article-meta.ts`).

## Structure

```
build/                 Outils exécutés au build (en-têtes des articles, brouillons, temps de lecture)
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

Hébergé sur [Vercel](https://vercel.com) : **procédure complète dans [`DEPLOIEMENT.md`](DEPLOIEMENT.md)**.
`vercel.json` active les adresses propres (`/projets` sert `projets.html`), la vraie page 404,
le cache longue durée des fichiers `assets/` et quelques en-têtes de sécurité.
