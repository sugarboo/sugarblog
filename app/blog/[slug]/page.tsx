import type { Metadata, ResolvingMetadata } from 'next'

import { getPostListData, getPostPageData } from '@/api'

import CustomMDX from '@/components/mdx/custom-mdx'
import TableOfContents from '@/components/mdx/table-of-contents'
import { extractTocFromContent } from '@/utils/toc'
import { Clock, Tag } from 'lucide-react'

type GenerateMetaDataProps = {
  params: Promise<{ slug: string }>
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: GenerateMetaDataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
 const { slug: id } = await params
  
  // fetch data
  const page = await getPostPageData(id)
 
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: page.title,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  }
}

export async function generateStaticParams() {
  const list = await getPostListData()  
  return list.map((item) => ({
    slug: item.id
  }))
}

export default async function BlogPage({
  params
}: {
  params: Promise<{
    slug: string
  }>
}) {
  const { slug: id } = await params

  const page = await getPostPageData(id)

  // Extract TOC from raw markdown content
  const tocItems = extractTocFromContent(page.content || '')

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

      {/* Table of Contents */}
      <TableOfContents items={tocItems} />

      <div className='mdx-content animate-slowly-in'>
        {/* @ts-ignore: Promise<JSX.Element> error, but it still can render as expected. */}
        <CustomMDX source={page.content} />
        <div className="w-full h-6 bg-transparent" />
      </div>
    </div>
  )
}
