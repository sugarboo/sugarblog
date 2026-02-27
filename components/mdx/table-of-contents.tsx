'use client'

import { useEffect, useState, useCallback } from 'react'
import { List, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TocItem } from '@/utils/toc'

type TableOfContentsProps = {
  items: TocItem[]
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  const [activeSlug, setActiveSlug] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  // Observe headings to highlight the active one on scroll
  useEffect(() => {
    if (items.length === 0) return

    const headingElements = items
      .map((item) => document.getElementById(item.slug))
      .filter(Boolean) as HTMLElement[]

    if (headingElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is intersecting (visible in viewport)
        const visibleEntries = entries.filter((e) => e.isIntersecting)
        if (visibleEntries.length > 0) {
          setActiveSlug(visibleEntries[0].target.id)
        }
      },
      {
        // Observe when heading enters top 20% of viewport
        rootMargin: '0px 0px -80% 0px',
        threshold: 0,
      }
    )

    headingElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [items])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
      e.preventDefault()
      const target = document.getElementById(slug)
      if (target) {
        // Offset for sticky nav (3.5rem ≈ 56px) + some padding
        const offset = 72
        const top = target.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
        setActiveSlug(slug)
        // Auto-close on mobile after click
        setIsOpen(false)
      }
    },
    []
  )

  if (items.length === 0) return null

  return (
    <div className="mb-8 select-none animate-slowly-in">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors cursor-pointer w-full"
      >
        <List size={14} />
        <span className="tracking-widest uppercase text-xs font-medium">
          Table of Contents
        </span>
        <ChevronDown
          size={14}
          className={cn(
            'transition-transform duration-200',
            isOpen ? 'rotate-180' : ''
          )}
        />
        <span className="flex-1 border-t border-border/30 ml-2" />
      </button>

      {/* TOC list */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-125 opacity-100 mt-4' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="flex flex-col gap-0.5 border-l-2 border-border/20 pl-0.5">
          {items.map((item) => (
            <a
              key={item.slug}
              href={`#${item.slug}`}
              onClick={(e) => handleClick(e, item.slug)}
              className={cn(
                'block text-sm py-1.5 border-l-2 -ml-0.5 transition-all duration-200',
                item.level === 2 ? 'pl-4' : 'pl-8',
                activeSlug === item.slug
                  ? 'border-purple-500 text-foreground font-medium'
                  : 'border-transparent text-muted-foreground/60 hover:text-muted-foreground hover:border-border/60'
              )}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default TableOfContents
