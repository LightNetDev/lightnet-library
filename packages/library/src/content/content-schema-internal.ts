/**
 * We use this internal content schema to make content schema easier to
 * comprehend for external users.
 */
import { z } from "astro/zod"

import {
  CATEGORIES,
  mediaItemSchema as externalMediaItemSchema,
  mediaTypeSchema,
} from "./content-schema"

export type Category = (typeof CATEGORIES)[number]

export type MediaItem = z.infer<typeof mediaItemSchema>
export type MediaItemEntry = {
  id: string
  data: MediaItem
}

/**
 * Media Item
 */
const mediaItemSchema = externalMediaItemSchema.extend({
  image: z.object({
    src: z.string(),
    width: z.number(),
    height: z.number(),
    format: z.enum([
      "png",
      "jpg",
      "jpeg",
      "tiff",
      "webp",
      "gif",
      "svg",
      "avif",
    ]),
  }),
})

export const mediaItemEntrySchema = z.object({
  id: z.string(),
  data: mediaItemSchema,
})

/**
 * Media Type
 */
export const mediaTypeEntrySchema = z.object({
  id: z.string(),
  data: mediaTypeSchema,
})

export type MediaType = z.infer<typeof mediaTypeSchema>
