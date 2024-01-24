import { getPostPageData } from '@/api'

import CustomMDX from '@/components/base/custom-mdx'

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
    <div className='animate-slowly-in'>
      <CustomMDX source={page.content} />
    </div>
  )
}
