import { ArrowLeft, ArrowUpRight, Download, FileText } from 'lucide-react'
import { Link, useParams, useSearchParams } from 'react-router'
import { Figure } from '@/components/article/Figure'
import { Reveal } from '@/components/shared/Reveal'
import { Seo } from '@/components/shared/Seo'
import { Visual } from '@/components/shared/Visual'
import { siteConfig } from '@/config/site'
import { useIsClient } from '@/hooks/useIsClient'
import { categorySlug, getArticle, getRelatedArticles } from '@/lib/articles'
import { prettyUrl } from '@/lib/url'
import { ArticleCard } from '@/sections/Insights/ArticleCard'
import { ShareLinks } from '@/sections/Insights/ShareLinks'
import NotFoundPage from './NotFoundPage'

/** Composants utilisables directement dans les articles .mdx, sans import */
const mdxComponents = { Figure }

/** Fonction affichée sous le nom de l'auteur */
const AUTHOR_ROLE = 'Ingénieur informatique'

/**
 * Page d'un article.
 * - Article avec PDF (src/content/articles/pdf/<slug>.pdf) : aperçu du PDF lisible sur la page,
 *   avec lecture en plein écran et téléchargement. C'est le cas normal.
 * - Article sans PDF, ou adresse suivie de « ?source » (utilisée par `npm run pdf`) :
 *   mise en page façon publication de recherche :
 * titre, auteur, résumé et mots-clés, texte justifié à sections numérotées, figures, références.
 * La même page sert de gabarit au PDF (règles @media print) : logo et coordonnées en tête,
 * sans navigation ni éléments d'écran.
 */
export default function ArticlePage() {
  const { slug = '' } = useParams()
  const [params] = useSearchParams()
  // ?source n'est lu qu'après la réhydratation (le HTML pré-rendu est généré sans paramètre)
  const sourceMode = useIsClient() && params.has('source')
  const article = getArticle(slug)

  if (!article) return <NotFoundPage />
  if (article.pdfUrl && !sourceMode) return <PdfArticle article={article} pdfUrl={article.pdfUrl} />

  const { Content } = article
  const related = getRelatedArticles(article)
  const catSlug = categorySlug(article.category)
  const { contact, socials } = siteConfig

  return (
    <>
      <Seo title={article.title} description={article.description} type="article" />

      <article className="print:text-[10.5pt]">
        <header className="container-page pt-32 md:pt-40 print:px-0 print:pt-0">
          <div className="mx-auto max-w-3xl">
            {/* En-tête du PDF : logo et coordonnées (impression uniquement) */}
            <div className="hidden items-start justify-between gap-8 border-b-2 border-accent pb-4 print:flex">
              <img src="/logo/logo-full-light.svg" alt={siteConfig.name} className="h-11 w-auto" />
              <p className="text-right text-[8.5pt] leading-snug text-muted">
                <span className="block font-semibold text-fg">{siteConfig.name}</span>
                {AUTHOR_ROLE}
                {contact.location && <span className="block">{contact.location}</span>}
                {contact.email && <span className="block">{contact.email}</span>}
                {socials.linkedin && <span className="block">{prettyUrl(socials.linkedin)}</span>}
              </p>
            </div>

            <Link
              to="/insights"
              className="group inline-flex items-center gap-2 label-mono text-xs text-muted transition-colors hover:text-fg print:hidden"
            >
              <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-0.5" />
              Tous les articles
            </Link>

            {article.draft && (
              <p className="mt-8 rounded-xl border border-dashed border-warn/40 px-4 py-3 text-sm text-warn print:hidden">
                Brouillon : cet article n’est visible qu’en développement. Il ne sera pas publié tant que
                <code className="mx-1 font-mono text-xs">draft: true</code>
                figure dans son en-tête.
              </p>
            )}

            <Reveal className="mt-10 print:mt-8">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 label-mono text-xs text-subtle">
                <Link
                  to={catSlug ? `/insights?categorie=${catSlug}` : '/insights'}
                  className="text-accent transition-colors hover:text-accent-strong"
                >
                  {article.category}
                </Link>
              </p>
              <h1 className="mt-5 font-display text-3xl leading-[1.12] font-extrabold tracking-tight text-balance sm:text-4xl print:text-[20pt]">
                {article.title}
              </h1>

              {/* Auteur */}
              <p className="mt-6 text-sm text-muted">
                <span className="font-semibold text-fg">{siteConfig.name}</span>
                <span aria-hidden="true"> — </span>
                {AUTHOR_ROLE}
                {contact.location && <>, {contact.location}</>}
              </p>

              {article.pdfUrl && (
                <a
                  href={article.pdfUrl}
                  download={`${article.slug}.pdf`}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 label-mono text-xs text-fg transition-colors hover:border-accent/50 hover:text-accent-strong print:hidden"
                >
                  <Download aria-hidden="true" className="size-4" />
                  Télécharger le PDF
                </a>
              )}
            </Reveal>

            {/* Résumé et mots-clés */}
            {article.abstract && (
              <Reveal delay={0.05} className="mt-10 border-y border-line py-6 print:mt-6 print:py-4">
                <h2 className="label-mono text-xs text-accent">Résumé</h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted [hyphens:auto] [text-align:justify]">
                  {article.abstract}
                </p>
                {article.keywords && article.keywords.length > 0 && (
                  <p className="mt-4 text-sm text-muted">
                    <span className="font-semibold text-fg">Mots-clés : </span>
                    {article.keywords.join(' · ')}
                  </p>
                )}
              </Reveal>
            )}
          </div>
        </header>

        {article.cover && (
          <Reveal delay={0.1} className="container-page mt-12 print:hidden">
            <Visual
              image={{ src: article.cover, alt: article.coverAlt ?? '' }}
              priority
              className="mx-auto aspect-[16/9] max-w-3xl"
            />
          </Reveal>
        )}

        <div className="container-page py-12 md:py-16 print:px-0 print:py-6">
          <div className="prose-article prose-paper mx-auto max-w-3xl">
            <Content components={mdxComponents} />
          </div>

          {/* Références */}
          {article.references && article.references.length > 0 && (
            <section aria-labelledby="references-title" className="mx-auto mt-14 max-w-3xl border-t border-line pt-8 print:mt-8 print:pt-5">
              <h2 id="references-title" className="font-display text-lg font-extrabold tracking-tight">
                Références
              </h2>
              <ol className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                {article.references.map((ref, i) => (
                  <li key={`${ref.title}-${i}`} className="flex gap-3">
                    <span className="shrink-0 font-mono text-xs leading-6 text-subtle">[{i + 1}]</span>
                    <span>
                      {ref.author && <>{ref.author}, </>}« {ref.title} »
                      {ref.publisher && <>, {ref.publisher}</>}
                      {ref.date && <>, {ref.date}</>}.
                      {ref.url && (
                        <>
                          {' '}
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="break-all text-accent-strong underline decoration-accent/40 underline-offset-2 hover:decoration-accent-strong"
                          >
                            {ref.url}
                          </a>
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Mention de fin du PDF (impression uniquement) */}
          <p className="mx-auto mt-10 hidden max-w-3xl border-t border-line pt-3 text-[8pt] text-subtle print:block">
            © {article.date.slice(0, 4)} {siteConfig.name} — {AUTHOR_ROLE}
            {contact.email && <> · {contact.email}</>}
            {siteConfig.url && <> · {prettyUrl(siteConfig.url)}</>}
          </p>

          <footer className="mx-auto mt-16 max-w-3xl border-t border-line pt-8 print:hidden">
            <ShareLinks title={article.title} />
          </footer>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line print:hidden">
          <div className="container-page py-20">
            <h2 id="related-title" className="font-display text-2xl font-extrabold tracking-tight">
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

/* ------------------------------------------------------------------ */
/* Article présenté par son PDF                                       */
/* ------------------------------------------------------------------ */

const buttonPrimary =
  'inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 label-mono text-xs text-on-primary transition-colors hover:bg-primary-hover'
const buttonSecondary =
  'inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 label-mono text-xs text-fg transition-colors hover:border-accent/50 hover:text-accent-strong'

type ArticleWithPdf = NonNullable<ReturnType<typeof getArticle>>

function PdfArticle({ article, pdfUrl }: { article: ArticleWithPdf; pdfUrl: string }) {
  const related = getRelatedArticles(article)
  const catSlug = categorySlug(article.category)
  const fileName = `${article.slug}.pdf`

  return (
    <>
      <Seo title={article.title} description={article.description} type="article" />

      <article>
        <header className="container-page pt-32 md:pt-40">
          <div className="mx-auto max-w-5xl">
            <Link
              to="/insights"
              className="group inline-flex items-center gap-2 label-mono text-xs text-muted transition-colors hover:text-fg"
            >
              <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-0.5" />
              Tous les articles
            </Link>

            <Reveal className="mt-10">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 label-mono text-xs text-subtle">
                <Link
                  to={catSlug ? `/insights?categorie=${catSlug}` : '/insights'}
                  className="text-accent transition-colors hover:text-accent-strong"
                >
                  {article.category}
                </Link>
                <span aria-hidden="true">·</span>
                <span>Article PDF</span>
              </p>
              <h1 className="mt-5 max-w-4xl font-display text-3xl leading-[1.12] font-extrabold tracking-tight text-balance sm:text-4xl">
                {article.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">{article.description}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
                  Lire en plein écran
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                  <span className="sr-only">(nouvel onglet)</span>
                </a>
                <a href={pdfUrl} download={fileName} className={buttonSecondary}>
                  <Download aria-hidden="true" className="size-4" />
                  Télécharger
                </a>
              </div>
            </Reveal>
          </div>
        </header>

        <div className="container-page py-10 md:py-14">
          <div className="mx-auto max-w-5xl">
            {/* Ordinateur et tablette : le PDF se lit directement dans la page */}
            <object
              data={`${pdfUrl}#view=FitH&navpanes=0&pagemode=none`}
              type="application/pdf"
              aria-label={`Article : ${article.title}`}
              className="hidden h-[85vh] min-h-[640px] w-full rounded-xl border border-line bg-card md:block"
            >
              <PdfFallback pdfUrl={pdfUrl} fileName={fileName} />
            </object>

            {/* Téléphone : les navigateurs mobiles ouvrent le PDF dans leur propre lecteur */}
            <div className="md:hidden">
              <PdfFallback pdfUrl={pdfUrl} fileName={fileName} />
            </div>

            <footer className="mt-12 border-t border-line pt-8">
              <ShareLinks title={article.title} />
            </footer>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line">
          <div className="container-page py-20">
            <h2 id="related-title" className="font-display text-2xl font-extrabold tracking-tight">
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

/** Encart affiché quand le PDF ne peut pas être lu dans la page (téléphone, lecteur désactivé) */
function PdfFallback({ pdfUrl, fileName }: { pdfUrl: string; fileName: string }) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-xl border border-line bg-card/60 px-6 py-10 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl border border-line bg-page text-accent">
        <FileText aria-hidden="true" className="size-5" strokeWidth={1.75} />
      </span>
      <p className="max-w-sm text-sm leading-relaxed text-muted">
        L’article s’ouvre dans le lecteur PDF de votre appareil.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
          Lire l’article
          <ArrowUpRight aria-hidden="true" className="size-4" />
          <span className="sr-only">(nouvel onglet)</span>
        </a>
        <a href={pdfUrl} download={fileName} className={buttonSecondary}>
          <Download aria-hidden="true" className="size-4" />
          Télécharger
        </a>
      </div>
    </div>
  )
}
