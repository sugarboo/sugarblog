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
      h-10 mx-2 my-2 md:mx-8 md:my-4
    '>
      <div className='flex justify-center items-center gap-4 md:gap-8'>
        {navigationList.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant='ghost'
              className={cn(
                'w-10 md:w-[4.5rem] rounded-full outline-none',
                isNavigationActive(item.href) ? 'bg-accent' : ''
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
