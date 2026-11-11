import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react'
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge'
import { siteConfig, type SocialKey } from '@/config/site'
import { prettyUrl } from '@/lib/url'

const socialLabels: Record<Exclude<SocialKey, 'whatsapp'>, string> = {
  linkedin: 'LinkedIn',
  github: 'GitHub',
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
}

/**
 * Coordonnées directes et réseaux sociaux, lus dans src/config/site.ts.
 * Seuls les champs renseignés sont affichés : aucun lien fictif.
 */
export function ContactChannels() {
  const { email } = siteConfig.contact
  const { whatsapp } = siteConfig.socials
  const socials = (Object.keys(socialLabels) as Array<keyof typeof socialLabels>)
    .filter((key) => siteConfig.socials[key])
    .map((key) => ({ label: socialLabels[key], href: siteConfig.socials[key] }))

  const nothingConfigured = !email && !whatsapp && socials.length === 0

  if (nothingConfigured) {
    return (
      <div className="rounded-2xl border border-dashed border-line p-6">
        <PlaceholderBadge />
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Coordonnées et réseaux sociaux à compléter dans <code className="font-mono text-xs">src/config/site.ts</code>.
        </p>
      </div>
    )
  }

  const rowClass =
    'group flex items-center justify-between gap-4 py-4 text-muted transition-colors hover:text-fg'

  return (
    <div className="space-y-10">
      {(email || whatsapp) && (
        <ul className="divide-y divide-line border-y border-line">
          {email && (
            <li>
              <a href={`mailto:${email}`} className={rowClass}>
                <span className="flex items-center gap-3">
                  <Mail aria-hidden="true" className="size-5 text-accent" strokeWidth={1.75} />
                  <span>
                    <span className="block font-mono text-xs text-subtle">Email</span>
                    <span className="break-all text-fg">{email}</span>
                  </span>
                </span>
                <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
          )}
          {whatsapp && (
            <li>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={rowClass}>
                <span className="flex items-center gap-3">
                  <MessageCircle aria-hidden="true" className="size-5 text-accent" strokeWidth={1.75} />
                  <span>
                    <span className="block font-mono text-xs text-subtle">WhatsApp</span>
                    <span className="text-fg">Écrire sur WhatsApp</span>
                  </span>
                </span>
                <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="sr-only">(nouvel onglet)</span>
              </a>
            </li>
          )}
        </ul>
      )}

      {socials.length > 0 && (
        <div>
          <h2 className="font-mono text-xs tracking-wider text-subtle uppercase">Réseaux</h2>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span className="text-fg">{s.label}</span>
                    <span className="text-xs text-subtle">{prettyUrl(s.href)}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="sr-only">(nouvel onglet)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
