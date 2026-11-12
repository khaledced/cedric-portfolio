import { fileURLToPath, URL } from 'node:url'
import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import remarkReadingTime from './build/remark-reading-time.ts'
import { articleMeta } from './build/vite-plugin-article-meta.ts'
import { stripDrafts } from './build/vite-plugin-drafts.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Production uniquement : retire le contenu des articles en brouillon (doit passer avant MDX)
    stripDrafts(),
    // En-tête des articles sans leur texte (listes légères), via « article.mdx?meta »
    articleMeta(),
    // MDX doit passer avant le plugin React : il transforme les articles .mdx en composants.
    // remark-frontmatter lit l'en-tête YAML (titre, date…), remarkReadingTime y ajoute
    // le temps de lecture, et remark-mdx-frontmatter l'expose en export nommé `frontmatter`.
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkReadingTime, remarkMdxFrontmatter],
      }),
    },
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    tailwindcss(),
  ],
  resolve: {
    // Permet d'écrire `@/components/...` au lieu de `../../components/...`
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
