import { useParams } from 'react-router'
import { Seo } from '@/components/shared/Seo'
import { getArticle } from '@/lib/articles'
import NotFoundPage from './NotFoundPage'

/** Page d'un article — mise en forme typographique complète en Phase 4. */
export default function ArticlePage() {
  const { slug = '' } = useParams()
  const article = getArticle(slug)

  if (!article) return <NotFoundPage />

  const { Content } = article

  return (
    <article className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 md:pt-40">
      <Seo title={article.title} description={article.description} />
      <p className="font-mono text-xs text-subtle">
        {article.category} · {article.date} · {article.readingTime} min de lecture
      </p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight">{article.title}</h1>
      <div className="mt-10 space-y-4 text-muted [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:text-fg [&_ol]:list-decimal [&_ol]:pl-6">
        <Content />
      </div>
    </article>
  )
}
