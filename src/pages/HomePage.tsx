import { Seo } from '@/components/shared/Seo'
import { siteConfig } from '@/config/site'

/** Accueil provisoire — le vrai Hero sera conçu en Phase 3. */
export default function HomePage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <Seo />
      <p className="font-mono text-sm text-brand-400">01 — Accueil</p>
      <h1 className="mt-4 font-display text-5xl leading-[1.05] font-medium tracking-tight sm:text-7xl">
        {siteConfig.name},
        <br />
        ingénieur informatique<span className="text-brand-400">…</span>
        <br />
        <span className="text-subtle">mais pas que.</span>
      </h1>
      <p className="mt-8 max-w-xl text-lg text-muted">{siteConfig.description}</p>
    </section>
  )
}
