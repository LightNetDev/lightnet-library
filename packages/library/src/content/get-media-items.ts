import { verifySchema } from "../utils/verify-schema"
import { mediaItemEntrySchema } from "./content-schema"
import { getMediaType } from "./get-media-types"

export const getMediaItem = async (id: string) => {
  const { getEntry } = await import("astro:content")

  const item = await getEntry("media", id)
  return prepareItem(item)
}

export type MediaItemQuery = { type: string }

export const getMediaItems = async (query?: MediaItemQuery) => {
  const { getCollection } = await import("astro:content")
  const items = await getCollection("media", resolveQuery(query))
  return items.map((entry) =>
    verifySchema(
      mediaItemEntrySchema,
      entry,
      `Invalid media item: ${entry.id} ${JSON.stringify(entry.data.type)}`,
    ),
  )
}

const resolveQuery = (query?: MediaItemQuery) => {
  if (!query) return
  return (item: { data: { type: { id: unknown } } }) => {
    return item.data.type.id === query.type
  }
}

const prepareItem = async (item: any) => {
  const verified = verifySchema(
    mediaItemEntrySchema,
    item,
    `Invalid media item: ${item.id}`,
  )
  const type = await getMediaType(verified.data.type.id)

  return {
    id: verified.id,
    data: {
      ...verified.data,
      type,
    },
  }
}
