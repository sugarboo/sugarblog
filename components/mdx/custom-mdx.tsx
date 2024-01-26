import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import { type MDXComponents } from 'mdx/types'

import MDXParagraph from './paragraph'
import MDXHeading from './heading'
import MDXOrderList from './order-list'
import MDXCode from './code'
import MDXLink from './a-link'

const CustomMDX = async (props: MDXRemoteProps) => {

  const components: MDXComponents = {
    h1: (props) => <MDXHeading props={props} level={1} />,
    h2: (props) => <MDXHeading props={props} level={2} />,
    h3: (props) => <MDXHeading props={props} level={3} />,
    h4: (props) => <MDXHeading props={props} level={4} />,
    h5: (props) => <MDXHeading props={props} level={5} />,
    h6: (props) => <MDXHeading props={props} level={6} />,
    a: MDXLink,
    p: MDXParagraph,
    ol: MDXOrderList,
    // @ts-ignore: Promise<JSX.Element> error, but it still can render as expected.
    code: MDXCode,
  }

  return (
    <>
    {/* @ts-ignore: Promise<JSX.Element> error, but it still can render as expected. */}
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
