import { Seo } from '@/components/shared/Seo'
import { ExpertiseStrip } from '@/sections/Hero/ExpertiseStrip'
import { Hero } from '@/sections/Hero/Hero'

/** Accueil. Les aperçus Projets, Services et Insights seront ajoutés en Phase 4. */
export default function HomePage() {
  return (
    <>
      <Seo />
      <Hero />
      <ExpertiseStrip />
    </>
  )
}
