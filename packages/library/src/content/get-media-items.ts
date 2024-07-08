import { AstroError } from "astro/errors"
import { getCollection, getEntry } from "astro:content"

import { verifySchema } from "../utils/verify-schema"
import { mediaItemEntrySchema, mediaTypeEntrySchema } from "./content-schema"
import { type MediaQuery, mediaQuery } from "./media-query"

export const getMediaItem = async (id: string) => {
  const item = await getEntry("media", id)
  return prepareItem(item)
}

export const getMediaItems = async (query?: MediaQuery) => {
  const items = await getCollection("media", query && mediaQuery(query))
  return Promise.all(items.map(prepareItem))
}

const prepareItem = async (item: any) => {
  const verified = verifySchema(
    mediaItemEntrySchema,
    item,
    `Invalid media item: ${item.id}`,
  )
  const type = await getEntry("media-types", verified.data.type)
  if (!type) {
    throw new AstroError(
      `Media item '${item.id}' references a unknown media type '${verified.data.type}'`,
    )
  }

  return {
    id: verified.id,
    data: {
      ...verified.data,
      type: verifySchema(
        mediaTypeEntrySchema,
        type,
        "Invalid media type format",
      ),
    },
  }
}
