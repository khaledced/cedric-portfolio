# Publier un article (Insights)

Un article = **un PDF** + **un petit fichier d'informations**. Le site s'occupe du reste :
carte dans la liste des articles, page avec aperçu du PDF lisible, lecture en plein écran
et bouton « Télécharger ».

## 1. Déposer le PDF

Place ton PDF dans `src/content/articles/pdf/`, avec un nom court, en minuscules,
sans accents ni espaces (des tirets à la place) :

```
src/content/articles/pdf/mon-article.pdf
```

Ce nom devient l'adresse de l'article : `/insights/mon-article`.

## 2. Créer le fichier d'informations

Crée `src/content/articles/mon-article.mdx` (même nom que le PDF) avec seulement ces lignes :

```
---
title: "Titre de l'article"
description: "Une ou deux phrases qui résument l'article (affichées sur la carte et sous le titre)."
date: "2026-11-12"
category: "Intelligence artificielle"
---
```

Catégories possibles : `Technologie & innovation`, `Intelligence artificielle`,
`Business & entrepreneuriat`, `Marketing & communication digitale`, `Transformation numérique`.

Facultatif : une image pour la carte, avec `cover: "/images/articles/mon-article.webp"`
et `coverAlt: "Description de l'image"`.

## 3. Publier

Commite les deux fichiers et pousse sur GitHub : l'article est en ligne.

- **Modifier un article** : remplace simplement le PDF par la nouvelle version (même nom).
- **Retirer un article** : supprime les deux fichiers.
- **Le préparer sans le publier** : ajoute la ligne `draft: true` dans l'en-tête (visible en local uniquement).

---

### Option : générer le PDF à partir d'un texte

Pour un article écrit directement dans le fichier `.mdx`, avec le gabarit du site (logo, coordonnées,
texte justifié, sections numérotées, numéros de page) :

1. Sous l'en-tête, écris le texte en Markdown : chaque titre `## …` devient une section numérotée.
2. Dans l'en-tête, ajoute `generatePdf: true` et, si tu veux, un résumé, des mots-clés et des références :

   ```
   generatePdf: true
   abstract: "Résumé en cinq à huit lignes."
   keywords: ["Mot-clé 1", "Mot-clé 2"]
   references:
     - author: "Auteur ou organisation"
       title: "Titre de la source"
       publisher: "Site ou revue"
       date: "1er janvier 2026"
       url: "https://exemple.com/source"
   ```

   Dans le texte, cite une source avec son numéro entre crochets : [1].
3. Lance `npm run pdf` : le PDF est créé dans `src/content/articles/pdf/`. Commite-le avec l'article.

Exemple complet : `claude-opus-5-motion-design.mdx`.
Sans `generatePdf: true`, ton PDF n'est jamais modifié par cette commande.

#### Ajouter une image dans un article écrit en texte

Place l'image dans `public/images/articles/mon-article/` (de préférence en WebP, avec `npm run image`),
puis insère-la dans le texte ; elle est numérotée automatiquement (Figure 1, Figure 2…) :

```mdx
<Figure
  src="/images/articles/mon-article/schema.webp"
  alt="Description de l'image"
  caption="Légende courte et factuelle"
  source="Réalisation de l'auteur"
  size="medium"
/>
```

`size` est facultatif : `full` (par défaut), `medium` (75 %) ou `small` (50 %).
