import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Reveal } from '@/components/shared/Reveal'
import { Seo } from '@/components/shared/Seo'
import { Visual } from '@/components/shared/Visual'
import { categorySlug, getArticle, getRelatedArticles } from '@/lib/articles'
import { formatDate } from '@/lib/format'
import { ArticleCard } from '@/sections/Insights/ArticleCard'
import { ShareLinks } from '@/sections/Insights/ShareLinks'
import NotFoundPage from './NotFoundPage'

/** Page d'un article : en-tête, couverture, contenu MDX mis en forme, partage et suggestions. */
export default function ArticlePage() {
  const { slug = '' } = useParams()
  const article = getArticle(slug)

  if (!article) return <NotFoundPage />

  const { Content } = article
  const related = getRelatedArticles(article)
  const catSlug = categorySlug(article.category)

  return (
    <>
      <Seo title={article.title} description={article.description} type="article" />

      <article>
        <header className="container-page pt-32 md:pt-40">
          <div className="mx-auto max-w-3xl">
            <Link
              to="/insights"
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
            >
              <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-0.5" />
              Tous les articles
            </Link>

            {article.draft && (
              <p className="mt-8 rounded-xl border border-dashed border-warn/40 px-4 py-3 text-sm text-warn">
                Brouillon : cet article n’est visible qu’en développement. Il ne sera pas publié tant que
                <code className="mx-1 font-mono text-xs">draft: true</code>
                figure dans son en-tête.
              </p>
            )}

            <Reveal className="mt-10">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-subtle">
                <Link
                  to={catSlug ? `/insights?categorie=${catSlug}` : '/insights'}
                  className="text-accent transition-colors hover:text-accent-strong"
                >
                  {article.category}
                </Link>
                <span aria-hidden="true">·</span>
                <time dateTime={article.date}>{formatDate(article.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{article.readingTime} min de lecture</span>
              </p>
              <h1 className="mt-5 font-display text-4xl leading-[1.08] font-medium tracking-tight text-balance sm:text-5xl">
                {article.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">{article.description}</p>
            </Reveal>
          </div>
        </header>

        {article.cover && (
          <Reveal delay={0.1} className="container-page mt-12">
            <Visual
              image={{ src: article.cover, alt: article.coverAlt ?? '' }}
              priority
              className="mx-auto aspect-[16/9] max-w-5xl"
            />
          </Reveal>
        )}

        <div className="container-page py-14 md:py-20">
          <div className="prose-article mx-auto max-w-3xl">
            <Content />
          </div>

          <footer className="mx-auto mt-16 max-w-3xl border-t border-line pt-8">
            <ShareLinks title={article.title} />
          </footer>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line">
          <div className="container-page py-20">
            <h2 id="related-title" className="font-display text-2xl font-medium tracking-tight">
              À lire aussi
            </h2>
            <ul className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
              {related.map((a) => (
                <li key={a.slug}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
