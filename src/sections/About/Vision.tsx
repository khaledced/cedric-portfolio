import { Reveal } from '@/components/shared/Reveal'
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge'
import { vision } from '@/data/about'

/** Vision et philosophie : une phrase forte + trois principes. */
export function Vision() {
  return (
    <section aria-labelledby="vision-title" className="border-t border-line bg-card/40">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <p className="flex items-center gap-2 font-mono text-xs text-accent">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            Vision
            <PlaceholderBadge show={vision.placeholder} className="ml-2" />
          </p>
          <h2
            id="vision-title"
            className="mt-6 max-w-4xl font-display text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl lg:text-[3.25rem]"
          >
            <span aria-hidden="true" className="text-accent">« </span>
            {vision.statement}
            <span aria-hidden="true" className="text-accent"> »</span>
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {vision.principles.map((p, i) => (
            <li key={p.title} className="bg-page">
              <Reveal delay={i * 0.08} className="h-full p-6 sm:p-8">
                <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 text-lg font-medium">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
