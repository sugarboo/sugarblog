import { getBlocks, getDatabase, getPage } from "@/lib/notion"

/**
 * fetch post list via Notion API.
 * 
 * @returns formatted post list data
 */
const getPostListData = async () => {
  const list = []

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
      isPublished,
      isDeleted,
    } = properties
    if (isPublished?.checkbox && !isDeleted?.checkbox) {
      list.push({
        id,
        cover: cover?.file?.url || cover?.external?.url,
        title: title?.rich_text[0]?.text?.content,
        post: post?.title[0]?.text?.content,
        createdTimeTxt: createdTime?.created_time
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
  let page

  const list = await getPostListData()

  const pageId = list.length ? list[0].id : undefined
  if (pageId) {
    const rawBlocks = await getBlocks(pageId)
    const rawPage = rawBlocks.length ? rawBlocks[0] : undefined
    const { cover } = await getPage(pageId)
    const pageCover = cover?.file?.url || cover?.external?.url
    const {
      code,
      created_time: createdTime,
      last_edited_time: lastEditedTime,
    } = rawPage
    page = {
      content: code?.rich_text[0]?.text?.content,
      cover: pageCover,
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
