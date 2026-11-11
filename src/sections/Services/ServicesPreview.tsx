import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { Reveal } from '@/components/shared/Reveal'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { services } from '@/data/services'

/** Aperçu des six services sur la page d'accueil. */
export function ServicesPreview() {
  return (
    <section aria-labelledby="services-preview-title" className="border-t border-line">
      <div className="container-page py-20 md:py-28">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading id="services-preview-title" label="Services" title="Comment je peux vous aider" />
            <PlaceholderBadge show={services.some((s) => s.placeholder)} className="mt-4" />
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink to="/services" variant="secondary" arrow>
              Tous les services
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <li key={s.slug} className="bg-page">
                <Reveal delay={(i % 3) * 0.06} className="h-full">
                  <Link
                    to={`/services#${s.slug}`}
                    className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-card sm:p-8"
                  >
                    <div className="flex items-start justify-between">
                      <Icon aria-hidden="true" className="size-6 text-accent" strokeWidth={1.75} />
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 text-subtle transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      />
                    </div>
                    <h3 className="mt-8 font-display text-xl leading-tight font-extrabold tracking-[-0.03em]">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-subtle">{s.summary}</p>
                  </Link>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
