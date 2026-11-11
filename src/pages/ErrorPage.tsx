import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import { Seo } from '@/components/shared/Seo'
import NotFoundPage from './NotFoundPage'

/**
 * Affichée quand une page plante.
 * Une vraie 404 renvoie vers NotFoundPage ; toute autre erreur affiche un message honnête
 * au lieu de faire croire que la page n'existe pas.
 */
export default function ErrorPage() {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />

  if (import.meta.env.DEV) console.error(error)

  return (
    <main className="container-page pt-36 pb-32 md:pt-44">
      <Seo title="Erreur" />
      <p className="font-mono text-sm text-accent">Erreur inattendue</p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-6xl">
        Quelque chose s'est mal passé.
      </h1>
      <p className="mt-6 max-w-prose text-muted">Recharge la page ou reviens à l'accueil.</p>
      <Link
        to="/"
        className="mt-10 inline-flex rounded-lg bg-primary px-5 py-3 text-sm text-on-primary transition-colors hover:bg-primary-hover"
      >
        Retour à l'accueil
      </Link>
    </main>
  )
}
