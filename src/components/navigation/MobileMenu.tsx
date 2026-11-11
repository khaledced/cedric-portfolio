import { useEffect, useRef, type RefObject } from 'react'
import { AnimatePresence, m } from 'motion/react'
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
 */
export function MobileMenu({ id, open, onClose, returnFocusRef }: MobileMenuProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

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
    <AnimatePresence>
      {open && (
        <m.div
          id={id}
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto bg-page md:hidden"
        >
          <nav aria-label="Navigation mobile" className="container-page flex-1 pt-6">
            <ul className="divide-y divide-line border-y border-line">
              {allItems.map((item, i) => (
                <m.li
                  key={item.to}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
                >
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
                </m.li>
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
        </m.div>
      )}
    </AnimatePresence>
  )
}
