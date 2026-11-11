import { Link } from 'react-router'
import { Seo } from '@/components/shared/Seo'
import { getArticles } from '@/lib/articles'

/** Liste provisoire des articles — le design complet arrive en Phase 4. */
export default function InsightsPage() {
  const articles = getArticles()
  return (
    <section className="container-page pt-32 pb-24 md:pt-40">
      <Seo title="Insights" description="Réflexions sur la technologie, l'IA, le business et le digital." />
      <p className="font-mono text-sm text-brand-400">05</p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-6xl">Insights</h1>
      {articles.length === 0 ? (
        <p className="mt-6 text-muted">Les premiers articles arrivent bientôt.</p>
      ) : (
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {articles.map((a) => (
            <li key={a.slug} className="py-5">
              <Link to={`/insights/${a.slug}`} className="group block">
                <p className="font-mono text-xs text-subtle">
                  {a.category} · {a.readingTime} min{a.draft && ' · brouillon'}
                </p>
                <h2 className="mt-1 text-xl group-hover:text-brand-200">{a.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
