'use client'

import {
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation'

import { useDebouncedCallback } from 'use-debounce'

import { Search } from 'lucide-react'

const SearchBar = ({
  pageable = false
}: {
  pageable?: false
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
        defaultValue={searchParams.get('keyword')?.toString()}
        type="text"
        className='
          w-full h-8 px-12 rounded-full
          text-sm text-foreground/80 bg-accent
          focus:outline-none
        '
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  )
}
 
export default SearchBar
