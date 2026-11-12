import { useEffect, useRef, useState, type RefObject } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { NavLink } from 'react-router'
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'
import { contactItem, navItems } from './nav-items'

interface MobileMenuProps {
  id: string
  open: boolean
  onClose: () => void
  /** Élément qui reprend le focus à la fermeture (le bouton du menu) */
  returnFocusRef: RefObject<HTMLButtonElement | null>
}

const allItems = [{ to: '/', label: 'Accueil' }, ...navItems, contactItem]

/**
 * Menu plein écran pour mobile et tablette.
 * Accessibilité : fermeture avec Échap, focus placé sur le premier lien à l'ouverture,
 * reste de la page rendu inerte (voir RootLayout) et défilement bloqué.
 * Animations en CSS pur (voir .menu-* dans global.css) : aucune bibliothèque à charger.
 */

/** Durée du fondu de fermeture (doit correspondre à .menu-closing dans global.css) */
const CLOSE_DURATION = 180
export function MobileMenu({ id, open, onClose, returnFocusRef }: MobileMenuProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  // Le menu reste affiché le temps du fondu de fermeture
  const [shown, setShown] = useState(open)
  if (open && !shown) setShown(true)
  const closing = !open && shown

  useEffect(() => {
    if (!closing) return
    const timer = window.setTimeout(() => setShown(false), CLOSE_DURATION)
    return () => window.clearTimeout(timer)
  }, [closing])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    firstLinkRef.current?.focus()
    const returnTarget = returnFocusRef.current
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      returnTarget?.focus()
    }
  }, [open, onClose, returnFocusRef])

  return (
    shown && (
        <div
          id={id}
          className={cn(
            'menu-panel fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto bg-page md:hidden',
            closing && 'menu-closing',
          )}
        >
          <nav aria-label="Navigation mobile" className="container-page flex-1 pt-6">
            <ul className="divide-y divide-line border-y border-line">
              {allItems.map((item, i) => (
                <li key={item.to} className="menu-item" style={{ animationDelay: `${0.04 * i}s` }}>
                  <NavLink
                    ref={i === 0 ? firstLinkRef : undefined}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-baseline gap-4 py-3 font-display text-[2.6rem] leading-none font-black tracking-[-0.05em] transition-colors',
                        isActive ? 'text-fg' : 'text-muted active:text-fg',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={cn('label-mono text-xs', isActive ? 'text-accent' : 'text-subtle')}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {item.label}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="container-page space-y-4 py-8">
            <AvailabilityBadge />
            {siteConfig.contact.email && (
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-1 text-sm text-muted hover:text-fg"
              >
                {siteConfig.contact.email}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            )}
          </div>
        </div>
      )
  )
}
