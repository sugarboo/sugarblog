import { HtmlHTMLAttributes } from 'react'
import { bundledLanguages, getHighlighter } from 'shikiji'

type CodeProps = HtmlHTMLAttributes<HTMLElement>

const MDXCode = async (props: CodeProps) => {
  const highlight = await getHighlighter({
    themes: ['one-dark-pro'],
    langs: Object.keys(bundledLanguages)
  })

  const { children, ...rest } = props
  
  const regex = /language-(\w+)/
  const isLangMatch = rest.className?.match(regex)
  const lang = isLangMatch ? isLangMatch[1] : ''

  const html = lang 
    // code block
    ? highlight.codeToHtml(children as string, {
        theme: 'one-dark-pro',
        lang,
    })
    // emphasized text in plain element
    : `<span class="px-2 mx-1 rounded-sm text-sky-900 dark:text-sky-500 bg-accent">${children}</span>`

  return (
    <code dangerouslySetInnerHTML={{ __html: html }} {...rest} />
  )
}
 
export default MDXCode
