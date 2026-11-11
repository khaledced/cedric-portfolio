import { useIsClient } from '@/hooks/useIsClient'
import { useSearchParams } from 'react-router'
import { Reveal } from '@/components/shared/Reveal'
import { Seo } from '@/components/shared/Seo'
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { services } from '@/data/services'
import { ContactChannels } from '@/sections/Contact/ContactChannels'
import { ContactForm } from '@/sections/Contact/ContactForm'

export default function ContactPage() {
  // Lien depuis un service (/contact?sujet=branding) : l'objet est prérempli
  const [urlParams] = useSearchParams()
  // Pendant la réhydratation : version sans objet prérempli (identique au HTML pré-rendu)
  const params = useIsClient() ? urlParams : new URLSearchParams()
  const service = services.find((s) => s.slug === params.get('sujet'))
  const initialSubject = service ? `Demande : ${service.title}` : ''

  return (
    <>
      <Seo
        title="Contact"
        description="Contacter Cédric Sawadogo pour un projet, une mission, une formation ou une collaboration."
      />

      <section aria-labelledby="contact-title" className="container-page pt-32 pb-24 md:pt-44">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading as="h1" id="contact-title" label="Contact" title="Parlons de votre projet.">
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Un projet, une mission, une formation ou simplement une question : écrivez-moi via le formulaire ou
                par le canal qui vous convient le mieux.
              </p>
            </SectionHeading>
            <AvailabilityBadge className="mt-8" />
            <div className="mt-12">
              <ContactChannels />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            {/* key : remonte le formulaire si l'objet prérempli change */}
            <ContactForm key={initialSubject} initialSubject={initialSubject} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
