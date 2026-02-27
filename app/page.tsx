import Link from 'next/link'
import {
  Github,
  // Twitter,
  Mail,
  ArrowDown,
  ArrowRight,
} from 'lucide-react'

import { getPostListData } from '@/api'
import HeroBackground from '@/components/home/hero-background'
import PostListItem from '@/components/base/post-list-item'

export default async function Home() {
  const posts = await getPostListData()
  const latestPosts = posts.slice(0, 3)

  return (
    <>
      <HeroBackground />

      {/* ── Hero Section ── */}
      <section className="min-h-[calc(100dvh-3.5rem)] flex flex-col justify-center items-center px-4 relative">
        {/* Avatar */}
        <div className="relative mb-8 animate-slowly-in">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-linear-to-br from-pink-500 via-purple-500 to-cyan-500 p-0.75 shadow-lg shadow-purple-500/25">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <span className="text-3xl md:text-4xl font-bold bg-linear-to-br from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent select-none">
                🍬
              </span>
            </div>
          </div>
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-pink-500 via-purple-500 to-cyan-500 blur-2xl -z-10 animate-pulse-glow" />
        </div>

        {/* Name */}
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-3 animate-slowly-in"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            sugarboo
          </span>
        </h1>

        {/* Tagline */}
        <p
          className="text-base md:text-lg text-muted-foreground mb-8 text-center animate-slowly-in"
          style={{ animationDelay: '0.2s' }}
        >
          Frontend Developer &amp; Creative Coder
        </p>

        {/* Social Links */}
        <div
          className="flex gap-3 mb-16 animate-slowly-in"
          style={{ animationDelay: '0.3s' }}
        >
          {[
            { href: 'https://github.com/sugarboo', icon: <Github size={18} />, label: 'GitHub' },
            // { href: 'https://twitter.com/', icon: <Twitter size={18} />, label: 'Twitter' },
            { href: 'mailto:kennethbaak@gmail.com', icon: <Mail size={18} />, label: 'Email' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={link.label}
              className="p-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm hover:bg-accent hover:scale-110 transition-all duration-300"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 flex flex-col items-center gap-2 animate-slowly-in"
          style={{ animationDelay: '0.5s' }}
        >
          <span className="text-xs text-muted-foreground/60 tracking-widest uppercase select-none">
            Scroll
          </span>
          <ArrowDown size={16} className="text-muted-foreground/60 animate-bounce" />
        </div>
      </section>

      {/* ── About Section ── */}
      <section className="py-20 px-4">
        <div className="mb-12">
          <h2 className="text-sm font-medium text-muted-foreground/60 tracking-widest uppercase mb-4">
            About
          </h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            Hi there 👋 I&apos;m a passionate frontend developer who loves
            crafting beautiful and interactive web experiences. I write about web
            development, design patterns, and the tools I use daily.
          </p>
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground/60 tracking-widest uppercase mb-4">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Vue.js',
              'Nuxt.js',
              'TypeScript',
              'Tailwind CSS',
              'React',
              'Next.js',
              'Node.js',
              'ArkTS',
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm rounded-full border border-border/50 bg-background/50 backdrop-blur-sm text-foreground/70 hover:text-foreground hover:border-foreground/20 transition-colors cursor-default select-none"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-4 border-t border-border/30" />

      {/* ── Latest Posts Section ── */}
      <section className="py-20 px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-medium text-muted-foreground/60 tracking-widest uppercase">
            Latest Posts
          </h2>
          <Link
            href="/blog"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            View All
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          {latestPosts.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </div>

        {latestPosts.length === 0 && (
          <p className="text-center text-muted-foreground/50 py-8 select-none">
            — No Posts Yet —
          </p>
        )}
      </section>
    </>
  )
}
