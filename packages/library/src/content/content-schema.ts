import type { SchemaContext } from "astro:content";
import { z } from "astro/zod";

export const CATEGORIES = [
  "biography",
  "christian-living",
  "comics",
  "family",
  "kids",
  "life-support",
  "novels",
  "studies",
  "teens",
  "theology",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const DETAILS_PAGES = ["book", "document", "video"] as const;

export type MediaItem = z.infer<typeof mediaItemSchema>;
export type MediaItemEntry = {
  id: string;
  data: MediaItem;
};

export type MediaType = z.infer<typeof mediaTypeSchema>;

export const mediaItemSchema = z.object({
  commonId: z.string(),
  title: z.string(),
  type: z.string(),
  description: z.string().optional(),
  authors: z.string().array().optional(),
  dateCreated: z.string().date(),
  categories: z.enum(CATEGORIES).array().optional(),
  language: z.string(),
  content: z.object({ url: z.string() }).array().min(1),
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
});

export const mediaTypeSchema = z.object({
  label: z.string(),
  detailsPage: z.enum(DETAILS_PAGES),
  icon: z.string(),
});

export const mediaTypeEntrySchema = z.object({
  id: z.string(),
  data: mediaTypeSchema,
});

export const mediaItemEntrySchema = z.object({
  id: z.string(),
  data: mediaItemSchema,
});

export const mediaSchema = ({ image }: SchemaContext) =>
  mediaItemSchema.extend({
    image: z
      .string()
      .transform((path) => (path.startsWith("./") ? path : `./${path}`))
      .pipe(image()),
  });
