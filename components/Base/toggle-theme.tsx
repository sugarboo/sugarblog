"use client"
import type { MouseEvent } from 'react'
 
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
 
import { Button } from '@/components/ui/button'

export function ToggleTheme() {
  const { theme, systemTheme, setTheme } = useTheme()
  const isDark = theme === 'dark' || systemTheme === 'dark' && theme !== 'light'

  const toggleTheme = (event: MouseEvent) => {
    isDark ? setTheme('light') : setTheme('dark')

    // const x = event.clientX
    // const y = event.clientY
    // const endRadius = Math.hypot(
    //   Math.max(x, innerWidth - x),
    //   Math.max(y, innerHeight - y),
    // )
    // // @ts-expect-error: limited availability API
    // const transition = document.startViewTransition()
    // transition.ready.then(() => {
    //   const clipPath = [
    //     `circle(0px at ${x}px ${y}px)`,
    //     `circle(${endRadius}px at ${x}px ${y}px)`,
    //   ]
      
    //   document.documentElement.animate(
    //     {
    //       clipPath: !isDark
    //         ? [...clipPath].reverse()
    //         : clipPath,
    //     },
    //     {
    //       duration: 400,
    //       easing: 'ease-out',
    //       pseudoElement: !isDark
    //         ? '::view-transition-old(root)'
    //         : '::view-transition-new(root)',
    //     },
    //   )
    // })
  }
 
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="rounded-full outline-none" 
      onClick={(event) => toggleTheme(event)}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}