import { lazy, Suspense } from 'react'
import { CtaBand } from '@/components/shared/CtaBand'
import { Seo } from '@/components/shared/Seo'
import { AboutTeaser } from '@/sections/About/AboutTeaser'
import { ExpertiseStrip } from '@/sections/Hero/ExpertiseStrip'
import { Hero } from '@/sections/Hero/Hero'
import { ProjectsPreview } from '@/sections/Projects/ProjectsPreview'
import { ServicesPreview } from '@/sections/Services/ServicesPreview'

/*
  Les articles (contenu MDX) sont chargés à part : l'accueil reste léger
  quel que soit le nombre d'articles publiés.
*/
const InsightsPreview = lazy(() =>
  import('@/sections/Insights/InsightsPreview').then((m) => ({ default: m.InsightsPreview })),
)

/** Accueil, dans l'ordre défini en Phase 1. */
export default function HomePage() {
  return (
    <>
      <Seo />
      <Hero />
      <ExpertiseStrip />
      <ProjectsPreview />
      <AboutTeaser />
      <ServicesPreview />
      <Suspense fallback={null}>
        <InsightsPreview />
      </Suspense>
      <CtaBand
        title="Un projet, une idée, une question ?"
        text="Échangeons sur vos besoins et voyons comment je peux vous accompagner."
      />
    </>
  )
}
