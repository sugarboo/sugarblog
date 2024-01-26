import { HtmlHTMLAttributes } from 'react'

type OrderListProps = HtmlHTMLAttributes<HTMLOListElement>

const MDXOrderList = (props: OrderListProps) => {
  const { children, ...rest } = props

  return (
    <ol
      className='list-decimal leading-6'
      style={{
        paddingInlineStart: '2rem',
      }}
      {...rest}
    >
      {children}
    </ol>
  )
}
 
export default MDXOrderList
