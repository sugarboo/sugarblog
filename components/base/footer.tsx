import { Github, Mail, Heart, Coffee } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="py-8 px-4 text-center text-sm text-muted-foreground/40 border-t border-border/20">
      <div className="max-w-3xl m-auto flex flex-col items-center gap-3">
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/sugarboo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-muted-foreground/60 transition-colors"
          >
            <Github size={15} />
          </a>
          <a
            href="mailto:kennethbaak@gmail.com"
            aria-label="Email"
            className="hover:text-muted-foreground/60 transition-colors"
          >
            <Mail size={15} />
          </a>
        </div>
        <p className="flex items-center gap-1">
          © {new Date().getFullYear()} sugarboo · Built with
          <Coffee size={12} className="text-amber-800/80 dark:text-amber-400/40" />
          & Next.js
        </p>
      </div>
    </footer>
  )
}

export default Footer
