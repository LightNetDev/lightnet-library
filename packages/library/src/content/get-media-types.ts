import { getCollection, getEntry } from "astro:content"

import { verifySchema } from "../utils/verify-schema"
import { mediaTypeEntrySchema } from "./content-schema"

export const getMediaType = async (id: string) => {
  return verifySchema(
    mediaTypeEntrySchema,
    await getEntry("media-types", id),
    `Was not able to verify media type ${id}.`,
  )
}

export const getMediaTypes = async () => {
  return (await getCollection("media-types")).map((type) =>
    verifySchema(
      mediaTypeEntrySchema,
      type,
      `Was not able to verify media type '${type.id}'.`,
    ),
  )
}
