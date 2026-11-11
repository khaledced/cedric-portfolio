import { cn } from '@/lib/cn'

/*
  Le logo est toujours affiché depuis les fichiers d'origine, sans le redessiner :
  seule la hauteur est fixée, la largeur suit automatiquement (proportions préservées).
  Fichiers sources : public/logo/ (à remplacer par des SVG dès que disponibles).
*/

interface LogoProps {
  className?: string
}

/** Logo complet (symbole + « Cédric Sawadogo ») — conçu pour fond sombre */
export function LogoFull({ className }: LogoProps) {
  return (
    <img
      src="/logo/logoprincipal.png"
      alt="Cédric Sawadogo"
      width={439}
      height={151}
      className={cn('h-9 w-auto', className)}
      decoding="async"
    />
  )
}

/** Symbole seul (carré bleu arrondi) */
export function LogoMark({ className, decorative = false }: LogoProps & { decorative?: boolean }) {
  return (
    <img
      src="/logo/iconelogo.png"
      alt={decorative ? '' : 'Cédric Sawadogo'}
      width={150}
      height={151}
      className={cn('size-10', className)}
      decoding="async"
    />
  )
}
