import { getCollection, getEntry } from "astro:content"

import { verifySchema } from "../utils/verify-schema"
import { mediaItemEntrySchema } from "./content-schema"
import { getMediaType } from "./get-media-types"

export const getMediaItem = async (id: string) => {
  const item = await getEntry("media", id)
  return prepareItem(item)
}

export type MediaItemQuery = { type: string }

export const getMediaItems = async (query?: MediaItemQuery) => {
  const items = await getCollection("media", resolveQuery(query))
  return Promise.all(items.map(prepareItem))
}

const resolveQuery = (query?: MediaItemQuery) => {
  if (!query) return
  return (item: { data: { type: string } }) => {
    return item.data.type === query.type
  }
}

const prepareItem = async (item: any) => {
  const verified = verifySchema(
    mediaItemEntrySchema,
    item,
    `Invalid media item: ${item.id}`,
  )
  const type = await getMediaType(verified.data.type)

  return {
    id: verified.id,
    data: {
      ...verified.data,
      type,
    },
  }
}
