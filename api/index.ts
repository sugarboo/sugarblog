import dayjs from 'dayjs'

import { getBlocks, getDatabase, getPage } from '@/lib/notion'
import { Page } from '@/types/page'
import { Post } from '@/types/post'

/**
 * fetch post list via Notion API.
 * 
 * @returns formatted post list data
 */
const getPostListData = async () => {
  const list: Post[] = []

  const rawList = await getDatabase()
  
  rawList.forEach((item) => {
    const {
      id,
      cover,
      properties,
    } = item
    const {
      title,
      post,
      category,
      createdTime,
      lastEditedTime,
      isPublished,
      isDeleted,
    } = properties
    if (isPublished?.checkbox && !isDeleted?.checkbox) {
      list.push({
        id,
        cover: cover?.file?.url || cover?.external?.url,
        title: title?.rich_text[0]?.text?.content,
        post: post?.title[0]?.text?.content,
        tag: category?.select?.name,
        createdTimeTxt: dayjs(createdTime?.created_time).format('MMM D, YYYY'),
        lastEditedTimeTxt: dayjs(lastEditedTime?.last_edited_time).format('MMM D, YYYY'),
      })
    }
  })
  
  return list
}

/**
 * fetch post page content via Notion API.
 * 
 * @returns formatted post page data
 */
const getPostPageData = async () => {
  let page: Partial<Page> = {}

  const list = await getPostListData()

  const pageId = list.length ? list[0].id : undefined
  if (pageId) {
    const rawBlocks = await getBlocks(pageId)
    const rawPage = rawBlocks[0]
    const { category, cover } = await getPage(pageId)
    const {
      code,
      created_time: createdTime,
      last_edited_time: lastEditedTime,
    } = rawPage
    page = {
      content: code?.rich_text[0]?.text?.content,
      cover: cover?.file?.url || cover?.external?.url,
      tag: category?.select?.name,
      createdTimeTxt: dayjs(createdTime).format('MMM D, YYYY'),
      lastEditedTimeTxt: dayjs(lastEditedTime).format('MMM D, YYYY'),
    }
  }
  
  return page
}

export {
  getPostListData,
  getPostPageData,
}
