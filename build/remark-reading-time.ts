/**
 * Plugin remark (exécuté au build) : calcule le temps de lecture d'un article
 * et l'ajoute à son en-tête (frontmatter) sous la clé `readingTime`.
 * Doit être placé APRÈS remark-frontmatter et AVANT remark-mdx-frontmatter.
 */

interface Node {
  type: string
  value?: string
  children?: Node[]
}

const WORDS_PER_MINUTE = 220

function collectText(node: Node): string {
  if (node.type === 'yaml') return ''
  if (typeof node.value === 'string' && (node.type === 'text' || node.type === 'inlineCode')) {
    return node.value + ' '
  }
  return (node.children ?? []).map(collectText).join('')
}

export default function remarkReadingTime() {
  return (tree: Node) => {
    const words = collectText(tree).trim().split(/\s+/).filter(Boolean).length
    const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE))
    const yaml = tree.children?.find((n) => n.type === 'yaml')
    if (yaml) yaml.value = `${yaml.value ?? ''}\nreadingTime: ${minutes}`
  }
}
