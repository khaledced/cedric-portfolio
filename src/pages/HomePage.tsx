import { Seo } from '@/components/shared/Seo'
import { AboutTeaser } from '@/sections/About/AboutTeaser'
import { ExpertiseStrip } from '@/sections/Hero/ExpertiseStrip'
import { Hero } from '@/sections/Hero/Hero'
import { ProjectsPreview } from '@/sections/Projects/ProjectsPreview'
import { ServicesPreview } from '@/sections/Services/ServicesPreview'

/** Accueil : ordre défini en Phase 1 (l'aperçu Insights s'ajoutera avec le blog). */
export default function HomePage() {
  return (
    <>
      <Seo />
      <Hero />
      <ExpertiseStrip />
      <ProjectsPreview />
      <AboutTeaser />
      <ServicesPreview />
    </>
  )
}
