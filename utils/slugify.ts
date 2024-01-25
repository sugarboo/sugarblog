import type { ReactElement, ReactNode } from 'react'

/**
 *
 * Reference:
 * 
 *  https://github.com/leerob/leerob.io/blob/main/app/components/mdx.tsx
 * 
 *  https://github.com/tszhong0411/honghong.me/blob/main/src/utils/slugify.ts
 * 
 * @param target string or react element array with props.children
 * @returns formatted slug string
 */
const slugify = (target: string | ReactNode): string => {
  if (typeof target === 'string') {
    return target
      .toString()
      .toLowerCase()
      .trim() // Remove whitespace from both ends of a string
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\p{L}\d-]/gu, '') // Remove all non-unicode letters except for -
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
  } else {
    if (!!target) {
      const eLementList = target as ReactElement<{ children: string }>[]
      return eLementList.map((element) =>
        typeof element === 'string' ? slugify(element) : slugify(element.props.children)
      ).join('')
    }
  }
  return ''
}

export default slugify
