/**
 * Source: https://github.com/leerob/leerob.io/blob/6ecab76e6dd84000a9bb0156dcd4a3b02f8c7d5d/app/components/mdx.tsx#L120-L129
 */
const slugify = (str: string) =>
  str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -

export default slugify
