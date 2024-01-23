import type {
  DatabaseObjectResponse,
  GetPageResponse,
  PageObjectResponse,
  QueryDatabaseResponse
} from "@notionhq/client/build/src/api-endpoints"

type EmptyObject = Record<string, never>

// To make sure post from Notion API with the `properties` entries
type PostResult = Extract<
  QueryDatabaseResponse['results'][number],
  {
    properties: Record<string, unknown>
  }
>

type PropertyValueMap = PostResult['properties']
type PropertyValue = PropertyValueMap[string]

type PropertyValueType = PropertyValue['type']

// Get the `type` union from `properties` objects
type ExtractedPropertyValue<Type extends PropertyValueType> = Extract<
  PropertyValue,
  { type: Type }
>

// extract property values and exclude EmptyObject types
type PropertyValueTitle = Exclude<ExtractedPropertyValue<'title'>, EmptyObject>
type PropertyValueRichText = Exclude<ExtractedPropertyValue<'rich_text'>, EmptyObject>
type PropertyValueSelect = Exclude<ExtractedPropertyValue<'select'>, EmptyObject>
type PropertyValueCheckbox = Exclude<ExtractedPropertyValue<'checkbox'>, EmptyObject>
type PropertyValueCreatedBy = Exclude<ExtractedPropertyValue<'created_by'>, EmptyObject>
type PropertyValueCreatedTime = Exclude<ExtractedPropertyValue<'created_time'>, EmptyObject>
type PropertyValueLastEditedBy = Exclude<ExtractedPropertyValue<'last_edited_by'>, EmptyObject>
type PropertyValueLastEditedTime = Exclude<ExtractedPropertyValue<'last_edited_time'>, EmptyObject>

// The type of post from Notion API
type DatabasePost = PostResult & {
  cover: Record<string, { url: string }>
  properties: {
    post: PropertyValueTitle
    title: PropertyValueRichText
    category: PropertyValueSelect
    isPublished: PropertyValueCheckbox
    isDeleted: PropertyValueCheckbox
    createdBy: PropertyValueCreatedBy
    createdTime: PropertyValueCreatedTime
    lastEditedBy: PropertyValueLastEditedBy
    lastEditedTime: PropertyValueLastEditedTime
  }
}

// The type of post to be rendering
interface Post {
  id: string
  cover?: string
  title: string
  post: string
  tag: string
  createdTimeTxt: string
  lastEditedTimeTxt: string
}

export {
  PostResult,
  DatabasePost,
  Post
}
