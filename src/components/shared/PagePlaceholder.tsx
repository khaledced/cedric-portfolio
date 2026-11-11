import { Seo } from './Seo'

interface PagePlaceholderProps {
  index: string
  title: string
  phase: string
}

/** Page provisoire de la Phase 2 : sera remplacée par le vrai contenu dans les phases suivantes. */
export function PagePlaceholder({ index, title, phase }: PagePlaceholderProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Seo title={title} />
      <p className="font-mono text-sm text-brand-400">{index}</p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-6xl">{title}</h1>
      <p className="mt-6 max-w-prose text-muted">
        Page en construction — contenu prévu en {phase}.
      </p>
    </section>
  )
}
