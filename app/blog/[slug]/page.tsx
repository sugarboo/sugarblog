import { getPostPageData } from '@/api'

import CustomMDX from '@/components/mdx/custom-mdx'
import { Clock, Tag } from 'lucide-react'

export default async function BlogPage({
  params
}: {
  params: {
    slug: string
  }
}) {
  const { slug: id } = params

  const page = await getPostPageData(id)

  return (
    <div className='p-4'>
      <div className='flex flex-col mb-8'>
        <h1 className='text-2xl font-bold my-8'>{page.title}</h1>
        <div className='flex items-center gap-6 text-sm text-muted-foreground select-none'>
          <span className='flex items-center gap-1'>
            <Clock size={14} />
            {page.createdTimeTxt}
          </span>
          <span className='flex items-center gap-1'>
            <Tag size={14} />
            {page.tag}
          </span>
        </div>
      </div>

      <div className='mdx-content animate-slowly-in'>
        {/* @ts-ignore: Promise<JSX.Element> error, but it still can render as expected. */}
        <CustomMDX source={page.content} />
      </div>
    </div>
  )
}
