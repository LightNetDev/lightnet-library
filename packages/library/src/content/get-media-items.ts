import { getCollection, getEntry } from "astro:content"

import { verifySchemaAsync } from "../utils/verify-schema"
import { mediaItemEntrySchema } from "./content-schema-internal"
import { type MediaQuery, mediaQuery } from "./media-query"

export const getMediaItem = async (id: string) => {
  const item = await getEntry("media", id)
  return prepareItem(item)
}

export const getMediaItems = async (query?: MediaQuery) => {
  const items: unknown[] = await getCollection(
    "media",
    query && mediaQuery(query),
  )
  return Promise.all(items.map(prepareItem))
}

const prepareItem = async (item: unknown) => {
  return await verifySchemaAsync(
    mediaItemEntrySchema,
    item,
    (id) => `Invalid media item: ${id}`,
  )
}
