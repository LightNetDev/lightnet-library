import { AstroError } from "astro/errors"
import { getCollection, getEntry } from "astro:content"

import { verifySchema } from "../utils/verify-schema"
import { mediaItemEntrySchema } from "./content-schema-internal"
import { getMediaTypes } from "./get-media-types"
import { type MediaQuery, mediaQuery } from "./media-query"

const mediaTypes: string[] = (await getMediaTypes()).map(({ id }) => id)

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
  const verified = await verifySchema(
    mediaItemEntrySchema,
    item,
    (id) => `Invalid media item: ${id}`,
  )
  // We cannot use astro's reference validator for type. This would break type generation.
  // So we validate the type manually.
  if (!mediaTypes.includes(verified.data.type.id)) {
    throw new AstroError(
      `Media item '${verified.id}' references a unknown media type '${verified.data.type}'`,
    )
  }
  return verified
}
