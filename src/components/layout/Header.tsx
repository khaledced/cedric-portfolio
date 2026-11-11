import { useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router'
import { DesktopNav } from '@/components/navigation/DesktopNav'
import { MobileMenu } from '@/components/navigation/MobileMenu'
import { contactItem } from '@/components/navigation/nav-items'
import { LogoFull } from '@/components/shared/Logo'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/cn'

interface HeaderProps {
  menuOpen: boolean
  onToggleMenu: () => void
  onCloseMenu: () => void
}

const MENU_ID = 'menu-mobile'

/**
 * En-tête fixe. Transparent en haut de page, il prend un fond légèrement flouté
 * dès que l'on fait défiler, pour rester lisible sans masquer le contenu.
 */
export function Header({ menuOpen, onToggleMenu, onCloseMenu }: HeaderProps) {
  const scrolled = useScrolled(8)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const solid = scrolled || menuOpen

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'border-b transition-colors duration-300',
          solid ? 'border-line bg-ink-950/85 backdrop-blur-md' : 'border-transparent bg-transparent',
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
          <Link to="/" onClick={onCloseMenu} aria-label="Cédric Sawadogo — accueil" className="shrink-0">
            <LogoFull className="h-8 md:h-9" />
          </Link>

          <DesktopNav />

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ButtonLink to={contactItem.to} variant="secondary" className="h-10">
                Me contacter
              </ButtonLink>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={onToggleMenu}
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-xl text-fg transition-colors hover:bg-ink-900 md:hidden"
            >
              {menuOpen ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu id={MENU_ID} open={menuOpen} onClose={onCloseMenu} returnFocusRef={menuButtonRef} />
    </header>
  )
}
