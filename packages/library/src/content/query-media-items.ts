import type { MediaItemEntry } from "./content-schema-internal"

export type MediaItemQuery<TMediaItem extends MediaItemEntry> = {
  /**
   * A filter for multiple fields will be logically combined using AND (&&).
   */
  where?: {
    type?: TMediaItem["data"]["type"]["id"]
    category?: NonNullable<TMediaItem["data"]["categories"]>[number]["id"]
    compilation?: NonNullable<
      TMediaItem["data"]["compilations"]
    >[number]["compilation"]["id"]
  }
  orderBy?: "dateCreated" | "title"
  limit?: number
}

export const queryMediaItems = async <TMediaItem extends MediaItemEntry>(
  allItems: Promise<TMediaItem[]>,
  query: MediaItemQuery<TMediaItem>,
) => {
  const { where = {}, orderBy, limit } = query
  const filters: { (item: TMediaItem): boolean }[] = []

  if (where.category) {
    filters.push(
      (item) => !!item.data.categories?.find(({ id }) => id === where.category),
    )
  }
  if (where.type) {
    filters.push((item) => item.data.type.id === where.type)
  }
  if (where.compilation) {
    filters.push(
      (item) =>
        !!item.data.compilations?.find(
          ({ compilation }) => compilation.id === where.compilation,
        ),
    )
  }
  const combinedFilter = (item: TMediaItem) =>
    filters.every((filter) => filter(item))

  let items = await allItems

  items = items.filter(combinedFilter)

  if (orderBy === "dateCreated") {
    items = items.toSorted((item1, item2) =>
      item2.data.dateCreated.localeCompare(item1.data.dateCreated),
    )
  }
  if (orderBy === "title") {
    items = items.toSorted((item1, item2) =>
      item1.data.title.localeCompare(item2.data.title),
    )
  }

  if (limit) {
    items = items.slice(0, limit)
  }
  return items
}
