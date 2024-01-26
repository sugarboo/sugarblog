import { type HtmlHTMLAttributes, createElement } from 'react'

import slugify from '@/utils/slugify'

type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6

type HeadingProps = {
  props: HtmlHTMLAttributes<HTMLHeadingElement>
  level: HeadingLevels
}

const MDXHeading = ({ props, level }: HeadingProps) => {
  const headingLevelCls: Record<`${HeadingLevels}`, string> = {
    '1': 'text-2xl font-bold my-8',
    '2': 'text-xl font-semibold my-6',
    '3': 'text-lg font-semibold my-4',
    '4': 'text-lg my-2',
    '5': '',
    '6': '',
  }

  const { children, ...rest } = props

  const slug = slugify(children)

  return createElement(
    `h${level}`,
    {
      id: slug,
      className: `relative ${headingLevelCls[`${level}`]}`,
      ...rest,
    },
    createElement('a',
      {
        href: `#${slug}`,
        key: `link-${slug}`,
        className: 'absolute left-0 top-0 bottom-0 w-full group',
      },
      createElement(
        'span',
        {
          className: 'absolute top-1/2 right-full invisible -translate-y-1/2 text-sm text-muted-foreground/80 md:group-hover:visible mr-1',
        },
        '#'
      ),
    ),
    children,
  )
}
 
export default MDXHeading
