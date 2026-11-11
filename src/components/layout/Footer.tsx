import { Link } from 'react-router'
import { contactItem, navItems } from '@/components/navigation/nav-items'
import { LogoFull } from '@/components/shared/Logo'
import { siteConfig, type SocialKey } from '@/config/site'

const CURRENT_YEAR = new Date().getFullYear()

const socialLabels: Record<SocialKey, string> = {
  linkedin: 'LinkedIn',
  github: 'GitHub',
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  whatsapp: 'WhatsApp',
}

/** Seuls les réseaux renseignés dans site.ts sont affichés. */
const socials = (Object.keys(socialLabels) as SocialKey[])
  .filter((key) => siteConfig.socials[key])
  .map((key) => ({ label: socialLabels[key], href: siteConfig.socials[key] }))

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-12 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <LogoFull />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-subtle">{siteConfig.tagline}</p>
        </div>

        <nav aria-label="Pied de page" className="md:col-span-3">
          <p className="label-mono text-xs text-subtle">Navigation</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[...navItems, contactItem].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="label-mono text-xs text-subtle">Me retrouver</p>
          {socials.length > 0 || siteConfig.contact.email ? (
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.contact.email && (
                <li>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-muted transition-colors hover:text-fg">
                    {siteConfig.contact.email}
                  </a>
                </li>
              )}
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors hover:text-fg"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-subtle">Coordonnées à venir.</p>
          )}
        </div>
      </div>

      <div className="border-t border-line">
        <p className="container-page py-6 label-mono text-xs text-subtle">
          © {CURRENT_YEAR} {siteConfig.name}
        </p>
      </div>
    </footer>
  )
}
