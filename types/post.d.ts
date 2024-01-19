import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints"

type PostResult = Extract<
  QueryDatabaseResponse['results'][number],
  {
    properties: Record<string, unknown>
  }
>

type PropertyValueMap = PostResult['properties']
type PropertyValue = PropertyValueMap[string]

type PropertyValueType = PropertyValue['type']


type ExtractedPropertyValue<Type extends PropertyValueType> = Extract<
PropertyValue,
{
  type: Type
}
>

type PropertyValueTitle = ExtractedPropertyValue<'title'>
type PropertyValueRichText = ExtractedPropertyValue<'rich_text'>
type PropertyValueFiles = ExtractedPropertyValue<'files'>
type PropertyValueDate = ExtractedPropertyValue<'date'>
type PropertyValueCheckbox = ExtractedPropertyValue<'checkbox'>
type PropertyValueCreatedTime = ExtractedPropertyValue<'created_time'>
type PropertyValueLastEditedTime = ExtractedPropertyValue<'last_edited_time'>

interface IDatabasePost {
  // id: 
}

export {
  PostResult
}
