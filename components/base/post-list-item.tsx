import type { Post } from '@/types/post'
import { Clock, Tag } from 'lucide-react'

import Link from 'next/link'

const PostListItem = ({
  post
}: {
  post: Post
}) => {
  return (
    <Link key={post.id} href={`/blog/${post.id}`}>
      <article className="group p-4 -mx-4 rounded-xl border border-transparent hover:border-white/40 dark:hover:border-white/10 hover:bg-[rgba(255,255,255,0.12)] dark:hover:bg-[rgba(255,255,255,0.05)] hover:backdrop-blur-sm hover:shadow-[0_8px_32px_rgba(0,0,0,.06),inset_0_1px_2px_rgba(255,255,255,.4)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,.2),inset_0_1px_2px_rgba(255,255,255,.06)] transition-all duration-300">
        <h3 className="font-medium mb-2 text-accent-foreground/90 group-hover:bg-linear-to-r group-hover:bg-clip-text transition-all duration-300">
          {post.title || post.post}
        </h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors">
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {post.createdTimeTxt}
          </span>
          {post.tag && (
            <span className="flex items-center gap-1">
              <Tag size={13} />
              {post.tag}
            </span>
          )}
        </div>
      </article>
    </Link>
  )
}
 
export default PostListItem