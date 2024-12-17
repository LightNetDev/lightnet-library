import type { ImageMetadata } from "astro"

export type OpenGraphProps = {
  title: string
  description?: string
  image: ImageMetadata
  id: string
}
