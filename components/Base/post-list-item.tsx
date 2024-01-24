import type { Post } from '@/types/post'

import Link from 'next/link'

const PostListItem = ({
  post
}: {
  post: Post
}) => {
  return (
    <Link
      href={`blog/${post.post}`}
      key={post.id}
      className='
        group flex items-center gap-2 md:gap-4
        mx-2 my-4
        animate-slowly-in transition-all duration-300 ease-in-out
        select-none
      '
    >
      <span
        className='
          h-4 w-12 rounded-sm scale-[0.8] md:scale-100
          text-center text-xs text-foreground/30 bg-foreground/10 group-hover:text-foreground/40 group-hover:bg-foreground/20
          group-hover:transition-all group-hover:duration-300 group-hover:ease-in-out
        '
      >
        {post.tag}
      </span>
      <span
        className='
          box-border max-w-[15rem] md:max-w-[32rem]
          border-b border-transparent group-hover:border-foreground
          truncate text-foreground/90 group-hover:text-foreground
          group-hover:transition-all group-hover:duration-300 group-hover:ease-in-out
        '
      >
        {post.title}
      </span>
      <span
        className='
          hidden md:inline-block
          text-xs text-foreground/30 group-hover:text-foreground/40
          group-hover:transition-all group-hover:duration-300 group-hover:ease-in-out
        '
      >
        - {post.createdTimeTxt}
      </span>
      <span
        className='
          inline-block md:hidden
          text-xs text-foreground/30 group-hover:text-foreground/40
          group-hover:transition-all group-hover:duration-300 group-hover:ease-in-out
        '
      >
        - {post.createdTimeTxt.split(',')[0]}
      </span>
    </Link>
  )
}
 
export default PostListItem