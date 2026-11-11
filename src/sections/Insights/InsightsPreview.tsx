import { Reveal } from '@/components/shared/Reveal'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getArticles } from '@/lib/articles'
import { ArticleCard } from './ArticleCard'

/** Derniers articles sur la page d'accueil. Masqué tant qu'aucun article n'est publié. */
export function InsightsPreview() {
  const latest = getArticles().slice(0, 3)
  if (latest.length === 0) return null

  return (
    <section aria-labelledby="insights-preview-title" className="border-t border-line">
      <div className="container-page py-20 md:py-28">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading id="insights-preview-title" label="Insights" title="Derniers articles" />
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink to="/insights" variant="secondary" arrow>
              Tous les articles
            </ButtonLink>
          </Reveal>
        </div>
        <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((article, i) => (
            <li key={article.slug}>
              <Reveal delay={i * 0.08} className="h-full">
                <ArticleCard article={article} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
