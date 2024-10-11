import {
  categorySchema,
  mediaCollectionSchema,
  mediaSchema,
  mediaTypeSchema,
} from "@lightnet/library/content"
import { defineCollection } from "astro:content"

export const collections = {
  categories: defineCollection({ type: "data", schema: categorySchema }),
  "media-collections": defineCollection({
    type: "data",
    schema: mediaCollectionSchema,
  }),
  media: defineCollection({ type: "data", schema: mediaSchema }),
  "media-types": defineCollection({ type: "data", schema: mediaTypeSchema }),
}
