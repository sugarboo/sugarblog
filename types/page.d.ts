import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { PropertyValueRichText } from './post'

// To make sure page from Notion API with the `cover` object
type PageResult = PageObjectResponse & {
  cover: Record<string, { url?: string }>
  properties: {
    title: PropertyValueRichText,
    category: Record<string, { name?: string }>
  }
}

// The type of page to be rendering
interface Page {
  title: string
  content: string
  cover?: string
  tag?: string
  createdTimeTxt: string
  lastEditedTimeTxt: string
}

export {
  PageResult,
  Page,
}
