import { mediaSchema, mediaTypeSchema } from "@lightnet/library/content"
import { defineCollection } from "astro:content"

export const collections = {
  media: defineCollection({ type: "data", schema: mediaSchema }),
  "media-types": defineCollection({ type: "data", schema: mediaTypeSchema }),
}
