import { getPostListData } from '@/api'

import { cn } from '@/lib/utils'

import SearchBar from '@/components/base/search-bar'
import PostListItem from '@/components/base/post-list-item'

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: {
    keyword?: string
  },
}) {
  const list = await getPostListData()

  const keyword = searchParams?.keyword?.toLocaleLowerCase() || ''
  const filteredList = list.filter(({ title, tag }) => {
    if (keyword) {
      return title.toLocaleLowerCase().includes(keyword) || tag.toLocaleLowerCase().includes(keyword)
    }
    return list
  })
  
  return (
    <div className='p-4'>
      <SearchBar />
      {
        filteredList.map((item) => (
          <PostListItem key={item.id} post={item} />
        ))
      }
      <div
        className={cn(
          'text-center text-foreground/40 select-none animate-slowly-in',
          filteredList.length ? 'hidden' : 'block'
        )}
      >
        - No Post Found -
      </div>
    </div>
  )
}
