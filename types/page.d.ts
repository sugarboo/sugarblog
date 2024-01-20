import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

// To make sure page from Notion API with the `cover` object
type PageResult = PageObjectResponse & {
  cover: Record<string, { url: string }>
}

// The type of page to be rendering
interface Page {
  content: string
  cover: string
  createdTimeTxt: string
  lastEditedTimeTxt: string
}

export {
  PageResult,
  Page,
}
