import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { certifications } from '@/data/about'

/** Certifications et formations complémentaires, en liste éditoriale. */
export function Certifications() {
  if (certifications.length === 0) return null

  return (
    <section aria-labelledby="certifications-title" className="border-t border-line">
      <div className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <SectionHeading id="certifications-title" label="Certifications" title="Apprendre en continu" />
        </Reveal>

        <ul className="divide-y divide-line border-y border-line lg:col-span-8">
          {certifications.map((c, i) => (
            <li key={`${c.name}-${i}`}>
              <Reveal delay={i * 0.05} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:gap-6">
                <span className="w-16 shrink-0 font-mono text-xs text-accent">{c.year}</span>
                <div className="flex-1">
                  <p className="flex flex-wrap items-center gap-2 font-medium">
                    {c.name}
                    <PlaceholderBadge show={c.placeholder} />
                  </p>
                  <p className="mt-1 text-sm text-subtle">{c.issuer}</p>
                </div>
                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
                  >
                    Vérifier
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                    <span className="sr-only">la certification {c.name} (nouvel onglet)</span>
                  </a>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
