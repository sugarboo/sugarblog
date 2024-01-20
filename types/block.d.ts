import type { CodeBlockObjectResponse, TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

// To make sure block from Notion API with the `code` entries
type BlockResult = CodeBlockObjectResponse & {
  code: {
    rich_text: TextRichTextItemResponse[]
  }
}

export {
  BlockResult
}
