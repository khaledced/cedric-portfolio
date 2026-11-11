import { siteConfig } from '@/config/site'

interface SeoProps {
  title?: string
  description?: string
}

/**
 * Titre et description propres à chaque page.
 * React 19 place automatiquement <title> et <meta> dans le <head>.
 */
export function Seo({ title, description = siteConfig.description }: SeoProps) {
  const fullTitle = title ? `${title} — ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.tagline}`
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </>
  )
}
