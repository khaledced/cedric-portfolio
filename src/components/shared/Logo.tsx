import { cn } from '@/lib/cn'

/*
  Le logo est affiché depuis les fichiers vectoriels d'origine (public/logo/*.svg),
  sans être redessiné : seule la zone de cadrage (viewBox) a été resserrée autour du dessin.
  On fixe uniquement la hauteur ; la largeur suit, donc les proportions sont toujours préservées.
  Format SVG : net sur tous les écrans, quelle que soit la taille.
*/

interface LogoProps {
  className?: string
}

/**
 * Logo complet (symbole + « Cédric Sawadogo »), en deux versions selon le thème :
 * - logo-full-light.svg : lettres bleu nuit, pour fond clair (thème par défaut) ;
 * - logo-full.svg       : lettres blanches (fichier d'origine), pour fond sombre.
 * Seule la couleur des lettres change ; le symbole reste blanc dans son carré bleu.
 * Les deux images sont présentes, le CSS affiche celle qui correspond au thème actif
 * (pas de clignotement au chargement, même si le thème sombre est mémorisé).
 */
export function LogoFull({ className }: LogoProps) {
  const common = { alt: 'Cédric Sawadogo', width: 438, height: 150, decoding: 'async' as const }
  return (
    <>
      <img src="/logo/logo-full-light.svg" {...common} className={cn('w-auto dark:hidden', className ?? 'h-9')} />
      <img src="/logo/logo-full.svg" {...common} className={cn('hidden w-auto dark:block', className ?? 'h-9')} />
    </>
  )
}

/** Symbole seul (carré bleu arrondi) */
export function LogoMark({ className, decorative = false }: LogoProps & { decorative?: boolean }) {
  return (
    <img
      src="/logo/logo-mark.svg"
      alt={decorative ? '' : 'Cédric Sawadogo'}
      width={150}
      height={150}
      className={cn('size-10', className)}
      decoding="async"
    />
  )
}
