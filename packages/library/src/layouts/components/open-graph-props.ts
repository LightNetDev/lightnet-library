import type { ImageMetadata } from "astro"

export type OpenGraphProps = {
  title: string
  description?: string
  image: ImageMetadata
  id: string
  type:
    | "website"
    | "book"
    | "article"
    | "video.movie"
    | "video.episode"
    | "video.other"
    | "music.song"
}
