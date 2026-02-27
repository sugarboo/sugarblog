import { Metadata } from 'next'
import {
  Github,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Code2,
  Palette,
  Database,
  Wrench,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about sugarboo — a frontend developer focused on Vue.js, React, and modern web technologies.',
}

/* ── Data ── */

const experiences = [
  // {
  //   icon: <Briefcase size={16} />,
  //   title: 'Senior Frontend Developer',
  //   company: 'Tech Company',
  //   period: '2022 — Present',
  //   description:
  //     'Leading frontend architecture for internal products. Building reusable component libraries, optimizing performance, and mentoring junior developers.',
  // },
  {
    icon: <Briefcase size={16} />,
    title: 'Frontend Developer',
    company: 'Internet Startup',
    period: '2021 — 2026',
    description:
      'Developed and maintained multiple H5 hybrid apps and mini-programs. Implemented complex interactions including lottery systems and payment flows.',
  },
  {
    icon: <GraduationCap size={16} />,
    title: 'Information and Computational Science',
    company: 'Guangdong Ocean University',
    period: '2016 — 2020',
    description:
      'Bachelor\'s degree in Information and Computational Science. Started web development journey with HTML, CSS and JavaScript.',
  },
]

const techCategories = [
  {
    icon: <Code2 size={16} />,
    label: 'Frontend',
    items: [
      'Vue.js',
      'Nuxt.js',
      'React',
      'Next.js',
      'TypeScript',
      'ArkTS'
      // 'JavaScript'
    ],
  },
  {
    icon: <Palette size={16} />,
    label: 'Styling',
    items: [
      'Tailwind CSS',
      'SCSS / Sass',
      'CSS Modules',
      'Ant Design',
      'Element UI'
    ],
  },
  {
    icon: <Database size={16} />,
    label: 'Backend & Data',
    items: [
      'Node.js',
      'Express',
      // 'MySQL',
      // 'MongoDB',
      // 'RESTful API'
    ],
  },
  {
    icon: <Wrench size={16} />,
    label: 'Tools & Others',
    items: [
      'Git',
      'Webpack',
      'Vite',
      'Docker',
      'Figma',
      // 'Linux'
    ],
  },
]

/* ── Page ── */

const AboutPage = () => {
  return (
    <div className="px-4 py-12 md:py-16">

      {/* ── Intro Section ── */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10 mb-8">
          {/* Avatar */}
          <div className="relative mb-8 animate-slowly-in">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-linear-to-br from-pink-500 via-purple-500 to-cyan-500 p-0.75 shadow-lg shadow-purple-500/25">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-bold bg-linear-to-br from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent select-none">
                  🍬
                </span>
              </div>
            </div>
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-pink-500 via-purple-500 to-cyan-500 blur-2xl -z-10 animate-pulse-glow" />
          </div>

          {/* Bio */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              <span className="bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                sugarboo
              </span>
            </h1>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
              <MapPin size={14} />
              China · Frontend Developer
            </p>
            <div className="space-y-3 text-foreground/80 leading-relaxed">
              <p>
                Hi there 👋 I&apos;m a frontend developer with a passion for crafting
                elegant, performant web experiences. I enjoy exploring new
                technologies and building tools that make developers&apos; lives easier.
              </p>
              <p>
                Currently focused on the Vue.js & React ecosystem, I have extensive
                experience building enterprise-level web applications,
                mobile H5 pages, and WeChat mini-programs. I believe in clean code,
                thoughtful design, and continuous learning.
              </p>
              <p>
                Outside of coding, I love sharing what I learn through my blog. Writing
                helps me deepen my understanding and hopefully helps others along the
                way.
              </p>
            </div>
          </div>
        </div>

        {/* Social/Contact Links */}
        <div className="flex gap-3">
          <a
            href="https://github.com/sugarboo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-border/50 bg-background/50 hover:bg-accent hover:scale-[1.02] transition-all duration-300"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href="mailto:kennethbaak@gmail.com"
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-border/50 bg-background/50 hover:bg-accent hover:scale-[1.02] transition-all duration-300"
          >
            <Mail size={16} />
            Email
          </a>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border/30 mb-16" />

      {/* ── Experience Timeline ── */}
      <section className="mb-16">
        <h2 className="text-sm font-medium text-muted-foreground/60 tracking-widest uppercase mb-8">
          Experience
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border/40" />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 group">
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-border/60 bg-background group-hover:border-purple-500/60 transition-colors duration-300" />

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1.5">
                    <h3 className="font-medium flex items-center gap-2">
                      <span className="text-muted-foreground/60">{exp.icon}</span>
                      {exp.title}
                    </h3>
                    <span className="text-xs text-muted-foreground/50 tracking-wide whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{exp.company}</p>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border/30 mb-16" />

      {/* ── Tech Stack (Detailed) ── */}
      <section>
        <h2 className="text-sm font-medium text-muted-foreground/60 tracking-widest uppercase mb-8">
          Tech Stack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techCategories.map((category) => (
            <div key={category.label}>
              <h3 className="flex items-center gap-2 text-sm font-medium text-foreground/70 mb-3">
                <span className="text-muted-foreground/50">{category.icon}</span>
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-xs rounded-full border border-border/50 bg-background/50 text-foreground/60 hover:text-foreground hover:border-foreground/20 transition-colors cursor-default select-none"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AboutPage
