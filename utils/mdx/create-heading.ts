import {
  type FC,
  type HtmlHTMLAttributes,
  createElement
} from 'react'

import slugify from '../slugify'

type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6

const headingLevelCls: Record<`${HeadingLevels}`, string> = {
  '1': 'text-2xl font-bold my-8',
  '2': 'text-xl font-semibold my-6',
  '3': 'text-lg font-semibold my-4',
  '4': 'text-lg my-2',
  '5': '',
  '6': '',
}

/**
  * Reference: https://github.com/tszhong0411/honghong.me/blob/main/src/utils/create-heading.ts
  * 
  * @param level Heading's level
  * @returns formatted heading element react node
  */
const createHeading = (level: HeadingLevels) => {
  const Heading: FC<HtmlHTMLAttributes<HTMLHeadingElement>> = (props) => {
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
          'svg',
          {
            xmlns: 'http://www.w3.org/2000/svg',
            width: 16,
            height: 16,
            fill: 'currentColor',
            className:
              'invisible absolute top-1/2 right-full size-4 -translate-y-1/2 text-muted-foreground group-hover:visible mr-2',
            viewBox: '0 0 24 24'
          },
          createElement('path', {
            d: 'M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985 3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005 3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201 13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995 2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0 0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836 19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997 0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632 1.563 1 1 0 0 0 1.602-1.198z'
          }),
        ),
      ),
      children
    )
  }

  return Heading
}

export {
  createHeading,
}
