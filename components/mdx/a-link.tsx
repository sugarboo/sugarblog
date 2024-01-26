import { HtmlHTMLAttributes } from 'react'

type LinkProps = HtmlHTMLAttributes<HTMLAnchorElement>

const MDXLink = (props: LinkProps) => {
  const { children, ...rest } = props

  return (
    <a
      target='_blank'
      className='text-sky-500 hover:underline'
      {...rest}
    >
      {children}
    </a>
  )
}
 
export default MDXLink
