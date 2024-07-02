import type { APIRoute } from "astro"
import { getImage } from "astro:assets"

import { getMediaItems } from "../../content/get-media-items"

export type SearchItem = {
  title: string
  id: string
  type: string
  authors?: string[]
  categories?: string[]
  description?: string
  language: string
  image: { src: string; width: number; height: number }
}

export type SearchResponse = {
  items: SearchItem[]
}

export const GET: APIRoute = async () => {
  const items = await searchResults()
  return new Response(JSON.stringify({ items }))
}

export async function searchResults() {
  const items: SearchItem[] = []
  for await (const mediaItem of await getMediaItems()) {
    const {
      id,
      data: { image, title, authors, categories, language, description, type },
    } = mediaItem
    const {
      src,
      attributes: { width, height },
    } = await getImage({
      src: image,
      format: "webp",
      width: 144,
    })
    items.push({
      title,
      id,
      type: type.id,
      authors,
      categories,
      description: description?.replaceAll(/[*#_]/g, "").slice(0, 350),
      language,
      image: { src, width, height },
    })
  }
  return items
}
