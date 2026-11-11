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
    <main className="mx-auto max-w-6xl px-4 py-32 sm:px-6">
      <Seo title="Erreur" />
      <p className="font-mono text-sm text-brand-400">Erreur inattendue</p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-6xl">
        Quelque chose s'est mal passé.
      </h1>
      <p className="mt-6 max-w-prose text-muted">Recharge la page ou reviens à l'accueil.</p>
      <Link
        to="/"
        className="mt-10 inline-flex rounded-lg bg-brand-500 px-5 py-3 text-sm text-white transition-colors hover:bg-brand-700"
      >
        Retour à l'accueil
      </Link>
    </main>
  )
}
