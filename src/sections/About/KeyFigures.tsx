import { Reveal } from '@/components/shared/Reveal'
import { keyFigures } from '@/data/about'

/** Chiffres clés : la section n'apparaît que si des chiffres vérifiés ont été renseignés. */
export function KeyFigures() {
  if (keyFigures.length === 0) return null

  return (
    <section aria-label="Chiffres clés" className="border-y border-line">
      <dl className="container-page grid grid-cols-2 lg:grid-cols-4">
        {keyFigures.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.06} className="border-line py-8 not-first:border-l max-lg:nth-3:border-l-0 max-lg:nth-[n+3]:border-t sm:px-6">
            <dt className="text-sm text-subtle">{f.label}</dt>
            <dd className="mt-2 font-display text-4xl font-semibold tracking-tight">{f.value}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}
