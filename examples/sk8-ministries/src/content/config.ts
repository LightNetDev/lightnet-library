import { defineCollection } from "astro:content"
import { mediaSchema, mediaTypeSchema } from "@lightnet/library/content"

export const collections = {
  media: defineCollection({ type: "data", schema: mediaSchema }),
  "media-types": defineCollection({ type: "data", schema: mediaTypeSchema }),
}
