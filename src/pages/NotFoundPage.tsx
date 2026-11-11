import { Link } from 'react-router'
import { Seo } from '@/components/shared/Seo'

export default function NotFoundPage() {
  return (
    <section className="container-page pt-36 pb-32 md:pt-44">
      <Seo title="Page introuvable" />
      <meta name="robots" content="noindex" />
      <p className="font-mono text-sm text-brand-400">Erreur 404</p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-6xl">
        Cette page n'existe pas… ou plus.
      </h1>
      <Link
        to="/"
        className="mt-10 inline-flex rounded-lg bg-brand-500 px-5 py-3 text-sm text-white transition-colors hover:bg-brand-700"
      >
        Retour à l'accueil
      </Link>
    </section>
  )
}
