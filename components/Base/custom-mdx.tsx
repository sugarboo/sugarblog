import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import { type MDXComponents } from 'mdx/types'

const CustomMDX = async (props: MDXRemoteProps) => {
  const components: MDXComponents = {
    h2: (props) => (
      <h2 className='font-bold'>
        {props.children}
      </h2>
    ),
  }

  return (
    <MDXRemote
      {...props}
      components={{
        ...components,
        ...(props.components || {})
      }}
    />
  )
}
 
export default CustomMDX
