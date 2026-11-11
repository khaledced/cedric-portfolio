import { Fragment, type CSSProperties } from 'react'

interface RiseTextProps {
  text: string
  className?: string
}

/**
 * Texte qui « monte » lettre par lettre, chaque lettre surgissant d'un masque invisible.
 * Animation 100 % CSS (classe .rise-letter, voir global.css) : elle démarre dès l'affichage
 * du HTML pré-rendu, sans attendre le JavaScript. Désactivée si l'utilisateur réduit les animations.
 *
 * Les mots restent groupés (pas de coupure au milieu d'un mot) ; chaque mot a son propre masque,
 * agrandi verticalement pour ne couper ni les accents ni les jambages (g, virgule…).
 * Le texte est décoratif : le titre lisible par les lecteurs d'écran est fourni à part (sr-only).
 */
export function RiseText({ text, className }: RiseTextProps) {
  let index = 0
  const words = text.split(' ')

  return (
    <span className={className} aria-hidden="true">
      {words.map((word, w) => (
        <Fragment key={`${word}-${w}`}>
          <span className="-my-[0.12em] inline-block overflow-hidden py-[0.12em] align-bottom">
            {[...word].map((char) => {
              const style = { '--i': index++ } as CSSProperties
              return (
                <span key={index} className="rise-letter inline-block" style={style}>
                  {char}
                </span>
              )
            })}
          </span>
          {w < words.length - 1 && ' '}
        </Fragment>
      ))}
    </span>
  )
}
