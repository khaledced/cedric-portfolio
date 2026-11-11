import { useLocation } from 'react-router'
import { siteConfig } from '@/config/site'

interface SeoProps {
  title?: string
  description?: string
  /** « article » pour les pages d'article (Open Graph) */
  type?: 'website' | 'article'
  /** Image de partage spécifique (chemin dans /public), sinon l'image par défaut du site */
  image?: string
}

const DEFAULT_IMAGE = '/og-image.png'

/**
 * Titre, description et balises de partage propres à chaque page.
 * React 19 place automatiquement <title>, <meta> et <link> dans le <head>.
 * Ces balises sont aussi écrites dans le HTML pré-rendu (lu par LinkedIn, Google…).
 *
 * Les adresses absolues (canonical, og:url, og:image) nécessitent siteConfig.url :
 * à renseigner après le premier déploiement.
 */
export function Seo({ title, description = siteConfig.description, type = 'website', image = DEFAULT_IMAGE }: SeoProps) {
  const { pathname } = useLocation()
  const fullTitle = title ? `${title} — ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.tagline}`
  const base = siteConfig.url.replace(/\/$/, '')
  const pageUrl = base ? `${base}${pathname === '/' ? '/' : pathname}` : ''
  const imageUrl = `${base}${image}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {pageUrl && <link rel="canonical" href={pageUrl} />}

      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {pageUrl && <meta property="og:url" content={pageUrl} />}
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteConfig.name} — ${siteConfig.tagline}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  )
}
