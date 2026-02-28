'use client'

import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Post } from '@/types/post'
import PostListItem from '@/components/base/post-list-item'

export default function PostListClient({ list }: { list: Post[] }) {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword')?.toLocaleLowerCase() || ''

  const filteredList = list.filter(({ title, tag }) => {
    if (keyword) {
      return title.toLocaleLowerCase().includes(keyword) || tag.toLocaleLowerCase().includes(keyword)
    }
    return true
  })

  return (
    <>
      {filteredList.map((item) => (
        <PostListItem key={item.id} post={item} />
      ))}
      <div
        className={cn(
          'text-center text-foreground/40 select-none animate-slowly-in',
          filteredList.length ? 'hidden' : 'block'
        )}
      >
        - No Post Found -
      </div>
    </>
  )
}