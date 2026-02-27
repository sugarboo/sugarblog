import type { Metadata, ResolvingMetadata } from 'next'

import { getPostListData, getPostPageData } from '@/api'
import { siteConfig } from '@/lib/site-config'

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
  const { slug: id } = await params
  const page = await getPostPageData(id)

  // Generate description from content (first 160 chars, stripped of markdown)
  const description = (page.content || '')
    .replace(/[#*`\[\]()>_~-]/g, '')
    .replace(/\n+/g, ' ')
    .trim()
    .slice(0, 160)

  return {
    title: page.title,
    description,
    openGraph: {
      type: 'article',
      title: page.title,
      description,
      url: `${siteConfig.url}/blog/${id}`,
      siteName: siteConfig.name,
      locale: 'zh_CN',
      publishedTime: page.createdTimeTxt,
      tags: page.tag ? [page.tag] : [],
    },
    twitter: {
      card: 'summary',
      title: page.title,
      description,
    },
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
