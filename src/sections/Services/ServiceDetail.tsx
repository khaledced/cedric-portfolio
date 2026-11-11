import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router'
import { Reveal } from '@/components/shared/Reveal'
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge'
import type { Service } from '@/data/services'

interface ServiceDetailProps {
  service: Service
  index: number
}

/** Un service présenté en détail : description, besoins, prestations et contact. */
export function ServiceDetail({ service, index }: ServiceDetailProps) {
  const Icon = service.icon
  const headingId = `service-${service.slug}-title`

  return (
    <article
      id={service.slug}
      aria-labelledby={headingId}
      className="scroll-mt-24 border-t border-line py-14 md:scroll-mt-28 md:py-20"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-2xl border border-line bg-card text-accent">
              <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
            </span>
            <span className="font-mono text-xs text-subtle">{String(index + 1).padStart(2, '0')} / 06</span>
          </div>
          <h2 id={headingId} className="mt-6 font-display text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl">
            {service.title}
          </h2>
          <PlaceholderBadge show={service.placeholder} className="mt-4" />
          <p className="mt-4 max-w-md leading-relaxed text-muted">{service.summary}</p>
          <Link
            to={`/contact?sujet=${service.slug}`}
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent-strong transition-colors hover:text-fg"
          >
            Discuter de ce besoin
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
          <div>
            <h3 className="font-mono text-xs tracking-wider text-subtle uppercase">Pour quels besoins</h3>
            <ul className="mt-5 space-y-4">
              {service.needs.map((need) => (
                <li key={need} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {need}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs tracking-wider text-subtle uppercase">Prestations</h3>
            <ul className="mt-5 space-y-4">
              {service.deliverables.map((item, i) => (
                <li key={`${item}-${i}`} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </article>
  )
}
