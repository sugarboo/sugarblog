import { getBlocks, getDatabase, getPage } from "@/lib/notion"
import { Page } from "@/types/page"
import { Post } from "@/types/post"

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
        createdTimeTxt: createdTime?.created_time,
        lastEditedTimeTxt: lastEditedTime?.last_edited_time,
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
    const { cover } = await getPage(pageId)
    const {
      code,
      created_time: createdTime,
      last_edited_time: lastEditedTime,
    } = rawPage
    page = {
      content: code?.rich_text[0]?.text?.content,
      cover: cover?.file?.url || cover?.external?.url,
      createdTimeTxt: createdTime,
      lastEditedTimeTxt: lastEditedTime,
    }
  }
  
  return page
}

export {
  getPostListData,
  getPostPageData,
}
