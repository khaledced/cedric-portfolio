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

/** Logo complet (symbole + « Cédric Sawadogo ») — conçu pour fond sombre */
export function LogoFull({ className }: LogoProps) {
  return (
    <img
      src="/logo/logo-full.svg"
      alt="Cédric Sawadogo"
      width={438}
      height={150}
      className={cn('h-9 w-auto', className)}
      decoding="async"
    />
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
