import type { ReactElement, ReactNode } from 'react'
import slugify from '@/utils/slugify'

export type TocItem = {
  level: number
  text: string
  slug: string
}

/**
 * Extract headings (h2, h3) from raw MDX/Markdown content string.
 * Only h2 and h3 are included to keep the TOC concise.
 */
export function extractTocFromContent(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const items: TocItem[] = []

  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length // 2 or 3
    const rawText = match[2].trim()
    // Strip inline markdown formatting: **bold**, *italic*, `code`, [link](url)
    const text = rawText
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/`(.+?)`/g, '$1')
      .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    const slug = slugify(text)
    items.push({ level, text, slug })
  }

  return items
}
