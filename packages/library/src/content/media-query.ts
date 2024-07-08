export type MediaQuery = { type: string }

export const mediaQuery =
  (query: MediaQuery) => (item: { data: { type: string } }) =>
    item.data.type === query.type
