import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { Reveal } from '@/components/shared/Reveal'
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge'
import type { Service } from '@/data/services'

interface ServiceDetailProps {
  service: Service
  index: number
}

/** Un service présenté de façon concise : icône, titre, courte description et contact. */
export function ServiceDetail({ service, index }: ServiceDetailProps) {
  const Icon = service.icon
  const headingId = `service-${service.slug}-title`

  return (
    <article
      id={service.slug}
      aria-labelledby={headingId}
      className="scroll-mt-24 border-t border-line py-8 md:scroll-mt-28 md:py-10"
    >
      <Reveal className="grid gap-5 md:grid-cols-12 md:items-start md:gap-8">
        {/* Numéro + icône */}
        <div className="flex items-center gap-3 md:col-span-2">
          <span className="label-mono text-xs text-subtle">{String(index + 1).padStart(2, '0')}</span>
          <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-card text-accent">
            <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
          </span>
        </div>

        {/* Titre */}
        <div className="md:col-span-4">
          <h2 id={headingId} className="font-display text-xl leading-tight font-extrabold tracking-tight text-balance sm:text-2xl">
            {service.title}
          </h2>
          <PlaceholderBadge show={Boolean(service.placeholder)} className="mt-3" />
        </div>

        {/* Description + contact */}
        <div className="md:col-span-6">
          <p className="max-w-xl leading-relaxed text-muted">{service.summary}</p>
          <Link
            to={`/contact?sujet=${service.slug}`}
            className="group mt-4 inline-flex items-center gap-2 label-mono text-xs text-accent-strong transition-colors hover:text-fg"
          >
            Discuter de ce besoin
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>
    </article>
  )
}
