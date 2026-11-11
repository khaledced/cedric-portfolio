import { LogoMark } from '@/components/shared/Logo'
import { siteConfig } from '@/config/site'

/**
 * Cadre photo du Hero. Ses angles reprennent le carré arrondi du logo.
 * Tant que siteConfig.photo.src est vide, un cadre provisoire clairement identifié est affiché.
 */
export function HeroPortrait() {
  const { photo } = siteConfig
  return (
    <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
      {/* Unique halo bleu, très diffus, derrière la photo */}
      <div
        aria-hidden="true"
        className="absolute inset-8 -z-10 rounded-full bg-brand-500/30 blur-3xl"
      />

      <div className="relative aspect-[4/5] overflow-hidden rounded-logo border border-line bg-card">
        {photo.src ? (
          <img
            src={photo.src}
            srcSet={photo.srcSet}
            // Largeur affichée : ~384 px sur mobile, ~460 px au-delà → le navigateur choisit le bon fichier
            sizes="(min-width: 640px) 460px, 384px"
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            className="size-full object-cover object-top"
            fetchPriority="high"
            decoding="async"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-3 p-8 text-center">
            <span className="label-mono text-xs text-subtle">Contenu provisoire</span>
            <span className="text-sm text-muted">Photo professionnelle à venir</span>
          </div>
        )}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-logo ring-1 ring-fg/5 ring-inset" />
      </div>

      {/* Symbole du logo en surimpression */}
      <div className="absolute -right-3 -bottom-4 rounded-[1.1rem] bg-page p-1.5 sm:-right-5">
        <LogoMark decorative className="size-14 sm:size-16" />
      </div>

      {/* Étiquette éditoriale */}
      <p className="absolute top-6 -left-3 rounded-lg border border-line bg-page/90 px-3 py-2 label-mono text-[11px] text-muted backdrop-blur sm:-left-6">
        Tech <span className="text-accent">·</span> Digital <span className="text-accent">·</span> Création
      </p>
    </div>
  )
}
