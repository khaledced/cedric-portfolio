/**
 * PDF DES ARTICLES — `npm run pdf`
 * --------------------------------
 * Génère la version PDF (A4) des articles marqués `generatePdf: true` dans leur en-tête,
 * à partir de leur texte et du gabarit d'impression (logo et coordonnées en tête, numéros de page en pied).
 * Les PDF déposés à la main (articles sans `generatePdf: true`) ne sont jamais touchés.
 *
 * Étapes (enchaînées par `npm run pdf`) :
 *   1. construction du site (npm run build) ;
 *   2. ce script : sert dist/ en local, ouvre chaque article dans Microsoft Edge (ou Chrome)
 *      et enregistre src/content/articles/pdf/<article>.pdf ;
 *   3. nouvelle construction, pour que le bouton « Télécharger le PDF » apparaisse.
 *
 * Les PDF sont ensuite commités avec le reste : le site en ligne n'a pas besoin de navigateur.
 * Navigateur utilisé : variable d'environnement PDF_BROWSER, sinon Edge ou Chrome installés.
 */
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, stat } from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import puppeteer from 'puppeteer-core'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const outDir = path.join(root, 'src/content/articles/pdf')

const AUTHOR = 'Cédric Sawadogo'

/* ---------- Navigateur ---------- */
const candidates = [
  process.env.PDF_BROWSER,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)
const executablePath = candidates.find((p) => existsSync(p))
if (!executablePath) {
  console.error('Aucun navigateur trouvé. Indique son chemin : PDF_BROWSER="…/chrome.exe" npm run pdf')
  process.exit(1)
}

/* ---------- Serveur local de dist/ ---------- */
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.pdf': 'application/pdf',
}

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0])
  const base = path.join(dist, clean)
  for (const file of [base, `${base}.html`, path.join(base, 'index.html')]) {
    if (!file.startsWith(dist)) continue
    try {
      if ((await stat(file)).isFile()) return file
    } catch {
      /* fichier suivant */
    }
  }
  return null
}

const server = http.createServer(async (req, res) => {
  const file = await resolveFile(req.url ?? '/')
  if (!file) {
    res.writeHead(404).end()
    return
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream' })
  res.end(await readFile(file))
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const origin = `http://127.0.0.1:${server.address().port}`

/* ---------- Articles à générer : publiés ET marqués generatePdf: true ---------- */
const articlesDir = path.join(root, 'src/content/articles')
const insightsDir = path.join(dist, 'insights')
const published = existsSync(insightsDir)
  ? (await readdir(insightsDir)).filter((f) => f.endsWith('.html')).map((f) => f.replace(/\.html$/, ''))
  : []
const slugs = []
for (const slug of published) {
  const source = await readFile(path.join(articlesDir, `${slug}.mdx`), 'utf8').catch(() => '')
  const frontmatter = source.startsWith('---') ? (source.split('---')[1] ?? '') : ''
  if (/^generatePdf:\s*true\s*$/m.test(frontmatter)) slugs.push(slug)
}
if (slugs.length === 0) console.log('Aucun article marqué « generatePdf: true » : rien à générer.')

await mkdir(outDir, { recursive: true })

const browser = await puppeteer.launch({ executablePath, headless: true })
try {
  for (const slug of slugs) {
    const page = await browser.newPage()
    // ?source : version texte de l'article (et non l'aperçu du PDF déjà existant)
    await page.goto(`${origin}/insights/${slug}?source`, { waitUntil: 'networkidle0' })
    await page.waitForSelector('.prose-paper')
    await page.emulateMediaType('print')
    await page.evaluate(() => document.fonts.ready)
    const title = await page.$eval('h1', (h) => h.textContent?.trim() ?? '')

    const escape = (t) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
    const footer = `
      <div style="width:100%;padding:0 18mm;font-family:Helvetica,Arial,sans-serif;font-size:7.5pt;color:#6b7280;display:flex;justify-content:space-between;gap:12mm">
        <span style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis">${escape(AUTHOR)} — ${escape(title)}</span>
        <span style="white-space:nowrap"><span class="pageNumber"></span> / <span class="totalPages"></span></span>
      </div>`

    const file = path.join(outDir, `${slug}.pdf`)
    await page.pdf({
      path: file,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: footer,
    })
    await page.close()
    const size = Math.round((await stat(file)).size / 1024)
    console.log(`  ✓ ${path.relative(root, file)} — ${size} Ko`)
  }
} finally {
  await browser.close()
  server.close()
}
