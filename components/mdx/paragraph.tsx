import type { ComponentPropsWithoutRef } from 'react'

type ParagraphProps = ComponentPropsWithoutRef<'p'>

const MDXParagraph = (props: ParagraphProps) => {
  const { children, ...rest } = props

  return (
    <p className='my-4 leading-loose' {...rest}>
      {children}
    </p>
  )
}
 
export default MDXParagraph
