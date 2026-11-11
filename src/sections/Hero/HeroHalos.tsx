/**
 * HALOS BLEUS — arrière-plan du Hero.
 *
 * Trois grandes taches de couleur, très floues, aux bleus du logo, qui dérivent lentement.
 * 100 % CSS (classes .hero-halo, voir global.css) :
 * - le flou est dessiné par un dégradé radial (pas de filtre blur, coûteux) ;
 * - seule la position (transform) est animée, ce que la carte graphique gère seule ;
 * - couleurs adaptées au thème clair / sombre (variables --halo-*) ;
 * - immobiles si le visiteur a choisi de réduire les animations.
 */
export function HeroHalos() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="hero-halo hero-halo-1" />
      <div className="hero-halo hero-halo-2" />
      <div className="hero-halo hero-halo-3" />
    </div>
  )
}
