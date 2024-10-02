export type MediaQuery = { type: string }

export const mediaQuery =
  (query: MediaQuery) => (item: { data: { type: { id: string } } }) =>
    item.data.type.id === query.type
