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
