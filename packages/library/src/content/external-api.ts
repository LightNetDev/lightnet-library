import { type CollectionEntry, getCollection } from "astro:content"

import { type MediaItemQuery, queryMediaItems } from "./query-media-items"

export const lightnet = {
  getMediaItems: (query?: MediaItemQuery<CollectionEntry<"media">>) =>
    queryMediaItems(getCollection("media"), query ?? {}),
}
