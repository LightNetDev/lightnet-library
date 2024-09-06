import { getImage } from "astro:assets"
import type { APIRoute } from "astro"

import { getMediaItems } from "../../content/get-media-items"
import type { SearchItem } from "./search-response"

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
      type,
      authors,
      categories,
      description: description?.replaceAll(/[*#_]/g, "").slice(0, 350),
      language,
      image: { src, width, height },
    })
  }
  return items.sort((a, b) => {
    return 10 * a.type.localeCompare(b.type) + a.title.localeCompare(b.title)
  })
}
