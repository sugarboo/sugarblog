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
      <article className="group p-4 -mx-4 rounded-xl hover:bg-accent/50 transition-all duration-300">
        <h3 className="font-medium mb-2 group-hover:text-foreground transition-colors">
          {post.title || post.post}
        </h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
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