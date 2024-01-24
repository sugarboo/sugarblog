import type { BlockResult } from '@/types/block'
import type { PageResult } from '@/types/page'
import type { DatabasePost } from '@/types/post'

import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

const getDatabase = async() => {
  const databaseId = process.env.NOTION_DATABASE_ID as string
  const response = await notion.databases.query({
    database_id: databaseId
  })
  return response.results as DatabasePost[]
}

const getPage = async(pageId: string) => {
  const response = await notion.pages.retrieve({
    page_id: pageId
  })
  return response as PageResult
}

const getBlocks = async(blockId: string) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50
  })
  return response.results as BlockResult[]
}

export {
  getDatabase,
  getPage,
  getBlocks,
}
