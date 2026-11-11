import { Link } from 'react-router'
import { CtaBand } from '@/components/shared/CtaBand'
import { Reveal } from '@/components/shared/Reveal'
import { Seo } from '@/components/shared/Seo'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { services } from '@/data/services'
import { ServiceDetail } from '@/sections/Services/ServiceDetail'

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Services"
        description="Digitalisation, communication digitale, branding, développement web, réseaux et systèmes, formation : les domaines d'intervention de Cédric Sawadogo."
      />

      <section aria-labelledby="services-title" className="container-page pt-32 pb-10 md:pt-44 md:pb-14">
        <Reveal>
          <SectionHeading
            as="h1"
            id="services-title"
            label="Services"
            title="Six domaines d’intervention, une même logique : des solutions utiles et durables."
          >
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Chaque besoin est différent. Ces domaines peuvent être sollicités séparément ou combinés au sein
              d’un même projet.
            </p>
          </SectionHeading>
        </Reveal>

        {/* Sommaire : accès direct à chaque service */}
        <nav aria-label="Sommaire des services" className="mt-12">
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`#${s.slug}`}
                  className="inline-flex rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-brand-400/50 hover:text-fg"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <div className="container-page">
        {services.map((service, i) => (
          <ServiceDetail key={service.slug} service={service} index={i} />
        ))}
      </div>

      <CtaBand
        title="Un besoin qui ne rentre dans aucune case ?"
        text="Décrivez-moi votre situation : nous verrons ensemble la meilleure approche."
      />
    </>
  )
}
