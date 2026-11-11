import { Seo } from './Seo'

interface PagePlaceholderProps {
  index: string
  title: string
  phase: string
}

/** Page provisoire de la Phase 2 : sera remplacée par le vrai contenu dans les phases suivantes. */
export function PagePlaceholder({ index, title, phase }: PagePlaceholderProps) {
  return (
    <section className="container-page pt-32 pb-24 md:pt-40">
      <Seo title={title} />
      <p className="font-mono text-sm text-accent">{index}</p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-6xl">{title}</h1>
      <p className="mt-6 max-w-prose text-muted">
        Page en construction — contenu prévu en {phase}.
      </p>
    </section>
  )
}
