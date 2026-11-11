import { CtaBand } from '@/components/shared/CtaBand'
import { Seo } from '@/components/shared/Seo'
import { AboutIntro } from '@/sections/About/AboutIntro'
import { Certifications } from '@/sections/About/Certifications'
import { Journey } from '@/sections/About/Journey'
import { KeyFigures } from '@/sections/About/KeyFigures'
import { Skills } from '@/sections/About/Skills'
import { Vision } from '@/sections/About/Vision'

export default function AboutPage() {
  return (
    <>
      <Seo
        title="À propos"
        description="Parcours, vision et compétences de Cédric Sawadogo : ingénierie informatique, digital, communication et créativité."
      />
      <AboutIntro />
      <KeyFigures />
      <Vision />
      <Journey />
      <Skills />
      <Certifications />
      <CtaBand
        title="Un projet, une question, une collaboration ?"
        text="Échangeons sur vos besoins et voyons comment je peux vous accompagner."
      />
    </>
  )
}
