// Déclare le type de l'export `frontmatter` ajouté par remark-mdx-frontmatter
declare module '*.mdx' {
  import type { ArticleFrontmatter } from '@/types/content'
  export const frontmatter: ArticleFrontmatter & { readingTime: number }
}
