import type {
  DatabaseObjectResponse,
  GetPageResponse,
  PageObjectResponse,
  QueryDatabaseResponse,
  TextRichTextItemResponse
} from "@notionhq/client/build/src/api-endpoints"

type EmptyObject = Record<string, never>

type SelectPropertyResponse = {
  id: StringRequest;
  name: StringRequest;
  color: SelectColor;
}

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

// extract property values and narrow type
type PropertyValueTitle = {
  [K in keyof ExtractedPropertyValue<'title'>]
    : K extends 'title'
      ? TextRichTextItemResponse[]
      : PropertyValueRichText[K]
}
type PropertyValueRichText = {
  [K in keyof ExtractedPropertyValue<'rich_text'>]
    : K extends 'rich_text'
      ? TextRichTextItemResponse[]
      : PropertyValueRichText[K]
}
type PropertyValueSelect = {
  [K in keyof ExtractedPropertyValue<'select'>]
    : K extends 'select'
      ? SelectPropertyResponse
      : PropertyValueCheckbox[K]
}
type PropertyValueCheckbox = Exclude<ExtractedPropertyValue<'checkbox'>, {
  checkbox: EmptyObject
}>
type PropertyValueCreatedBy = Exclude<ExtractedPropertyValue<'created_by'>, {
  created_by: EmptyObject
}>
type PropertyValueCreatedTime = Exclude<ExtractedPropertyValue<'created_time'>, {
  created_time: EmptyObject
}>
type PropertyValueLastEditedBy = Exclude<ExtractedPropertyValue<'last_edited_by'>, {
  last_edited_by: EmptyObject
}>
type PropertyValueLastEditedTime = Exclude<ExtractedPropertyValue<'last_edited_time'>, {
  last_edited_time: EmptyObject
}>

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
