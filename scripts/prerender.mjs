/**
 * PRÉ-RENDU — exécuté automatiquement à la fin de `npm run build`.
 *
 * Pour chaque page du site, génère un vrai fichier HTML (dist/a-propos.html, dist/projets/x.html…)
 * contenant le titre, la description, les balises de partage et tout le contenu.
 * Le navigateur « réhydrate » ensuite ce HTML avec React (voir src/main.tsx).
 *
 * Génère aussi dist/404.html, robots.txt et sitemap.xml (si l'URL du site est renseignée).
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, getStaticPaths, siteUrl } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const template = await readFile(path.join(dist, 'index.html'), 'utf8')

// Balises que React place en tête du rendu (<title>, <meta>, <link>) : à déplacer dans <head>
const LEADING_HEAD_TAGS = /^(?:<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>)+/

/**
 * @param html rendu React de la page
 * @param urlPath adresse pour laquelle la page a été générée (« * » pour la page 404, valable partout)
 */
function buildPage(html, urlPath) {
  const head = html.match(LEADING_HEAD_TAGS)?.[0] ?? ''
  const body = html.slice(head.length)
  // Marquées pour être retirées juste avant que React reprenne la main (évite les doublons)
  const markedHead = head.replace(/<(title|meta|link)\b/g, '<$1 data-prerender=""')
  if (!template.includes('<div id="root"></div>')) throw new Error('index.html : <div id="root"></div> introuvable')
  return template
    .replace('</head>', `${markedHead}</head>`)
    .replace('<div id="root"></div>', `<div id="root" data-path="${urlPath}">${body}</div>`)
}

function outputFile(urlPath) {
  if (urlPath === '/') return 'index.html'
  return `${urlPath.slice(1)}.html` // /projets/x → projets/x.html (servi en /projets/x grâce à cleanUrls)
}

async function write(file, content) {
  const target = path.join(dist, file)
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, content)
}

const paths = getStaticPaths()
for (const urlPath of paths) {
  await write(outputFile(urlPath), buildPage(await render(urlPath), urlPath))
  console.log(`  ✓ ${urlPath}`)
}

// Page 404 : rendue via une adresse inexistante
await write('404.html', buildPage(await render('/__page-introuvable__'), '*'))
console.log('  ✓ 404.html')

// robots.txt et sitemap.xml
const base = siteUrl ? siteUrl.replace(/\/$/, '') : ''
if (base) {
  const urls = paths.map((p) => `  <url><loc>${base}${p === '/' ? '/' : p}</loc></url>`).join('\n')
  await write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
  await write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`)
  console.log('  ✓ sitemap.xml, robots.txt')
} else {
  await write('robots.txt', 'User-agent: *\nAllow: /\n')
  console.log('  ✓ robots.txt')
  console.warn('  ⚠ siteConfig.url est vide : sitemap.xml non généré (à renseigner après le premier déploiement).')
}

await rm(ssrDir, { recursive: true, force: true })
console.log(`Pré-rendu terminé : ${paths.length} pages + 404.`)
