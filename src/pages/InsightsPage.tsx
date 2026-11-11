import { useIsClient } from '@/hooks/useIsClient'
import { Search, X } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { Reveal } from '@/components/shared/Reveal'
import { Seo } from '@/components/shared/Seo'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getArticles } from '@/lib/articles'
import { cn } from '@/lib/cn'
import { normalize } from '@/lib/format'
import { articleCategories } from '@/types/content'
import { ArticleCard } from '@/sections/Insights/ArticleCard'

const articles = getArticles()

/** Seules les catégories qui contiennent au moins un article apparaissent dans le filtre. */
const usedCategories = articleCategories.filter((c) => articles.some((a) => a.category === c.label))

export default function InsightsPage() {
  // Recherche et filtre stockés dans l'URL : partageables et conservés au retour arrière
  const [urlParams, setParams] = useSearchParams()
  // Pendant la réhydratation, on affiche la version sans filtre (identique au HTML pré-rendu)
  const params = useIsClient() ? urlParams : new URLSearchParams()
  const query = params.get('q') ?? ''
  const activeSlug = params.get('categorie')
  const activeCategory = usedCategories.find((c) => c.slug === activeSlug)

  const update = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(params)
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value)
      else next.delete(key)
    }
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const terms = normalize(query.trim()).split(/\s+/).filter(Boolean)
  const filtered = articles.filter((a) => {
    if (activeCategory && a.category !== activeCategory.label) return false
    const haystack = normalize(`${a.title} ${a.description} ${a.category}`)
    return terms.every((t) => haystack.includes(t))
  })
  const isFiltering = terms.length > 0 || Boolean(activeCategory)
  const [first, ...rest] = filtered

  return (
    <>
      <Seo
        title="Insights"
        description="Réflexions et analyses de Cédric Sawadogo sur la technologie, l'intelligence artificielle, le business, le marketing digital et la transformation numérique."
      />

      <section aria-labelledby="insights-title" className="container-page pt-32 pb-24 md:pt-44">
        <Reveal>
          <SectionHeading as="h1" id="insights-title" label="Insights" title="Réflexions sur la tech, le digital et l’innovation.">
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Analyses, retours d’expérience et points de vue sur la technologie, l’intelligence artificielle, le
              business, la communication digitale et la transformation numérique.
            </p>
          </SectionHeading>
        </Reveal>

        {articles.length === 0 ? (
          <p className="mt-16 rounded-2xl border border-dashed border-line p-8 text-muted">
            Les premiers articles arrivent bientôt.
          </p>
        ) : (
          <>
            <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {usedCategories.length > 1 && (
                <div role="group" aria-label="Filtrer par catégorie" className="flex flex-wrap gap-2">
                  {[{ slug: null, label: 'Tous' }, ...usedCategories].map((c) => {
                    const isActive = (c.slug ?? null) === (activeCategory?.slug ?? null)
                    return (
                      <button
                        key={c.label}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => update({ categorie: c.slug })}
                        className={cn(
                          'rounded-full border px-4 py-2 text-sm transition-colors',
                          isActive
                            ? 'border-primary bg-primary text-on-primary'
                            : 'border-line text-muted hover:border-accent/50 hover:text-fg',
                        )}
                      >
                        {c.label}
                      </button>
                    )
                  })}
                </div>
              )}

              <div className="relative w-full lg:max-w-xs">
                <label htmlFor="insights-search" className="sr-only">
                  Rechercher un article
                </label>
                <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-subtle" />
                <input
                  id="insights-search"
                  type="search"
                  value={query}
                  onChange={(e) => update({ q: e.target.value })}
                  placeholder="Rechercher un article…"
                  className="h-11 w-full rounded-full border border-line bg-card/60 pr-10 pl-11 text-sm text-fg placeholder:text-subtle focus:border-accent/60 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => update({ q: null })}
                    aria-label="Effacer la recherche"
                    className="absolute top-1/2 right-2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-subtle hover:text-fg"
                  >
                    <X aria-hidden="true" className="size-4" />
                  </button>
                )}
              </div>
            </div>

            <p className="sr-only" aria-live="polite">
              {filtered.length} article{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
            </p>

            {filtered.length === 0 ? (
              <div className="mt-16 rounded-2xl border border-dashed border-line p-8">
                <p className="text-muted">Aucun article ne correspond à votre recherche.</p>
                <button
                  type="button"
                  onClick={() => update({ q: null, categorie: null })}
                  className="mt-4 text-sm text-accent-strong underline-offset-4 hover:underline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <>
                {/* Article le plus récent mis en avant (hors recherche) */}
                {!isFiltering && first && (
                  <div className="mt-14 border-b border-line pb-14">
                    <ArticleCard article={first} featured />
                  </div>
                )}
                <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                  {(isFiltering ? filtered : rest).map((article) => (
                    <li key={article.slug}>
                      <ArticleCard article={article} />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </section>
    </>
  )
}
