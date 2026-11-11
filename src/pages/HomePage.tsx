import { Seo } from '@/components/shared/Seo'
import { AboutTeaser } from '@/sections/About/AboutTeaser'
import { ExpertiseStrip } from '@/sections/Hero/ExpertiseStrip'
import { Hero } from '@/sections/Hero/Hero'

/** Accueil. Les aperçus Projets, Services et Insights s'ajouteront au fil de la Phase 4. */
export default function HomePage() {
  return (
    <>
      <Seo />
      <Hero />
      <ExpertiseStrip />
      <AboutTeaser />
    </>
  )
}
