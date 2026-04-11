'use client'

import dynamic from 'next/dynamic'
import {
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation'

import { useDebouncedCallback } from 'use-debounce'
import { Search } from 'lucide-react'

const SearchBarCore = ({
  pageable = false
}: {
  pageable?: boolean
}) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  
  const handleSearch = useDebouncedCallback((keyword: string) => {
    const params = new URLSearchParams(searchParams)
    pageable && params.set('page', '1')
    if (keyword) {
      params.set('keyword', keyword)
    } else {
      params.delete('keyword')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 200)

  return (
    <div 
      className="
        relative
        mb-8 px-2
        animate-slowly-in
      "
    >
      <Search
        size={20}
        className='
          absolute top-0 left-6
          h-8 leading-8
          text-foreground/30
        '
      />
      <input
        defaultValue={searchParams.get('keyword')?.toString() || ''}
        type="text"
        className='
          w-full h-8 px-12 rounded-full
          text-sm text-foreground/80 bg-[rgba(255,255,255,0.12)] dark:bg-[rgba(255,255,255,0.05)] backdrop-blur border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,.08),inset_0_1px_2px_rgba(255,255,255,.6),inset_0_-1px_2px_rgba(0,0,0,.08)]
          focus:outline-hidden
        '
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  )
}

const SearchBarFallback = () => (
  <div className="h-8 mb-8 px-2 relative w-full opacity-0 flex items-center pl-12 text-sm text-foreground/30 bg-[rgba(255,255,255,0.12)] dark:bg-[rgba(255,255,255,0.05)] backdrop-blur border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,.08),inset_0_1px_2px_rgba(255,255,255,.6),inset_0_-1px_2px_rgba(0,0,0,.08)] rounded-full">
    Loading...
  </div>
)

const SearchBar = dynamic(() => Promise.resolve(SearchBarCore), {
  ssr: false,
  loading: SearchBarFallback
})
 
export default SearchBar