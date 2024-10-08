import { getCollection, getEntry } from "astro:content"

import { verifySchemaAsync } from "../utils/verify-schema"
import { mediaItemEntrySchema } from "./content-schema-internal"

export const getMediaItem = async (id: string) => {
  const item = await getEntry("media", id)
  return prepareItem(item)
}

export const getMediaItems = async () => {
  const items: unknown[] = await getCollection("media")
  return Promise.all(items.map(prepareItem))
}

const prepareItem = async (item: unknown) => {
  return await verifySchemaAsync(
    mediaItemEntrySchema,
    item,
    (id) => `Invalid media item: ${id}`,
  )
}
