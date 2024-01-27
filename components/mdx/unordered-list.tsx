import { HtmlHTMLAttributes } from 'react'

type UnorderedListProps = HtmlHTMLAttributes<HTMLUListElement>

const MDXUnorderedList = (props: UnorderedListProps) => {
  const { children, ...rest } = props

  return (
    <ul
      className='list-disc leading-6'
      style={{
        paddingInlineStart: '2rem',
      }}
      {...rest}
    >
      {children}
    </ul>
  )
}
 
export default MDXUnorderedList
