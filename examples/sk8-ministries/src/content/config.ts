import {
  categorySchema,
  compilationSchema,
  mediaSchema,
  mediaTypeSchema,
} from "@lightnet/library/content"
import { defineCollection } from "astro:content"

export const collections = {
  categories: defineCollection({ type: "data", schema: categorySchema }),
  compilations: defineCollection({ type: "data", schema: compilationSchema }),
  media: defineCollection({ type: "data", schema: mediaSchema }),
  "media-types": defineCollection({ type: "data", schema: mediaTypeSchema }),
}
