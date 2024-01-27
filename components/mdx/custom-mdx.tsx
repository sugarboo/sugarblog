import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import { type MDXComponents } from 'mdx/types'

import MDXHeading from './heading'
import MDXLink from './a-link'
import MDXParagraph from './paragraph'
import MDXOrderList from './order-list'
import MDXUnorderedList from './unordered-list'
import MDXCode from './code'

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
    ul: MDXUnorderedList,
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
