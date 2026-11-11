/**
 * Point d'entrée du PRÉ-RENDU (exécuté au build par scripts/prerender.mjs, jamais dans le navigateur).
 * Il génère le HTML complet de chaque page, pour que les moteurs de recherche et les aperçus
 * de liens (LinkedIn, WhatsApp, Facebook…) voient le vrai contenu sans exécuter de JavaScript.
 */
import { prerender } from 'react-dom/static'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'
import { siteConfig } from '@/config/site'
import { AppProviders } from '@/components/layout/AppProviders'
import { projects } from '@/data/projects'
import { getArticles } from '@/lib/articles'
import { routes } from '@/routes'

/**
 * Toutes les adresses à pré-rendre en HTML statique.
 * Défini ici (code de build uniquement) pour ne pas alourdir le JavaScript envoyé aux visiteurs.
 */
export function getStaticPaths(): string[] {
  return [
    '/',
    '/a-propos',
    '/services',
    '/projets',
    ...projects.map((p) => `/projets/${p.slug}`),
    '/insights',
    ...getArticles().map((a) => `/insights/${a.slug}`),
    '/contact',
  ]
}

export const siteUrl = siteConfig.url

export async function render(url: string): Promise<string> {
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(new URL(url, 'http://localhost')))
  if (context instanceof Response) {
    throw new Error(`Redirection inattendue pendant le pré-rendu de ${url}`)
  }
  const router = createStaticRouter(handler.dataRoutes, context)

  // prerender attend que tout soit prêt, y compris les pages chargées à la demande (React.lazy)
  const { prelude } = await prerender(
    <AppProviders>
      <StaticRouterProvider router={router} context={context} />
    </AppProviders>,
    // Pas de découpage progressif : utile en streaming, mais il obligerait à insérer
    // le contenu par script — invisible pour les robots qui n'exécutent pas JavaScript.
    { progressiveChunkSize: Number.POSITIVE_INFINITY },
  )
  return new Response(prelude).text()
}
