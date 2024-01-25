import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import { type MDXComponents } from 'mdx/types'
// import { highlight } from 'sugar-high'
import { getHighlighter, bundledLanguages } from 'shikiji'

import { createHeading } from '@/utils/mdx/create-heading'

const CustomMDX = async (props: MDXRemoteProps) => {
  const highlight = await getHighlighter({
    themes: ['one-dark-pro'],
    langs: Object.keys(bundledLanguages)
  })

  const components: MDXComponents = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    code: ({ children, ...props }) => {
      const regex = /language-(\w+)/
      // const codeHTML = highlight(children as string)
      const html = highlight.codeToHtml(children as string, {
        theme: 'one-dark-pro',
        lang: props.className?.match(regex)[1],
      })
      return <code dangerouslySetInnerHTML={{ __html: html }} {...props} />
    },
  }

  return (
    <>
      <MDXRemote
        {...props}
        components={{
          ...components,
          ...(props.components || {})
        }}
      />
    </>
  )
}
 
export default CustomMDX
