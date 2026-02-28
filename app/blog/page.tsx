import type { Metadata } from 'next'
import { Suspense } from 'react'

import { getPostListData } from '@/api'
import SearchBar from '@/components/base/search-bar'
import PostListClient from '@/components/base/post-list-client'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles about frontend development, Vue.js, React, TypeScript, and web technologies.',
}

export default async function BlogPage() {
  const list = await getPostListData()
  
  return (
    <div className='p-4'>
      <SearchBar />
      
      <Suspense fallback={<div className="text-center py-8 opacity-50">加载文章列表中...</div>}>
        <PostListClient list={list} />
      </Suspense>
    </div>
  )
}