'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import {
  AtSign,
  Home,
  NotebookText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToggleTheme } from '@/components/base/toggle-theme'

const NavigationBar = () => {
  const pathname = usePathname()

  const navigationList = [
    {
      icon: <Home size={18} />,
      label: 'Home',
      href: '/'
    },
    {
      icon: <NotebookText size={18} />,
      label: 'Blog',
      href: '/blog'
    },
    {
      icon: <AtSign size={18} />,
      label: 'About',
      href: '/about'
    },
  ]

  const isNavigationActive = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname.toLocaleLowerCase().includes(href.toLocaleLowerCase())
  }

  return (
    <div className='
      relative
      h-10 mx-2 md:mx-8
    '>
      <div className='flex justify-center items-center gap-4 md:gap-8'>
        {navigationList.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              className={cn(
                'w-10 md:w-18 rounded-full text-muted-foreground bg-linear-to-br backdrop-blur-3xl saturate-150 outline-hidden cursor-pointer hover:bg-transparent hover:from-pink-50 hover:via-purple-50 hover:to-cyan-50 dark:hover:from-pink-950 dark:hover:via-purple-950 dark:hover:to-cyan-950',
                isNavigationActive(item.href) ? 'cursor-auto text-shadow-foreground from-pink-50 via-purple-50 to-cyan-50 dark:from-pink-950 dark:via-purple-950 dark:to-cyan-950' : ''
              )}
            >
              <span className='md:hidden block'>
                {item.icon}
              </span>
              <span className="hidden md:block tracking-wider select-none">
                {item.label}
              </span>
            </Button>
          </Link>
        ))}
      </div>
      <div className='absolute top-0 right-0'>
        <ToggleTheme />
      </div>
    </div>
  )
}
 
export default NavigationBar
