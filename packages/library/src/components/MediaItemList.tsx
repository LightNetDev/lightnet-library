import type { SearchItem } from "../pages/api/search-response"
import { detailsPagePath } from "../utils/paths"
import Icon from "./Icon"

export type MediaType = {
  id: string
  icon: string
}

/**
 * This component is also used for the search
 * page. This is why we use the search result media item shape that
 * is a subset of the MediaItem shape.
 */
interface Props {
  items: SearchItem[]
  locale: string | undefined
  categories: Record<string, string>
  contentLanguages: Record<string, string>
  mediaTypes: MediaType[]
  className?: string
}

export default function MediaItemList({
  items,
  locale,
  categories,
  contentLanguages,
  mediaTypes,
  className,
}: Props) {
  const iconsByType = Object.fromEntries(
    mediaTypes.map(({ id, icon }) => [id, icon]),
  )

  return (
    <ol className={`divide-y divide-gray-200 ${className}`}>
      {items.map((item) => (
        <li key={item.id} lang={item.language}>
          <a
            href={detailsPagePath(locale, {
              id: item.id,
            })}
            className="group flex overflow-hidden py-6 transition-colors ease-in-out md:rounded-sm md:py-10 md:hover:bg-gray-100"
          >
            <div className="h-36 w-36 shrink-0">
              <img
                className="max-h-36 w-auto max-w-36 rounded-sm object-contain shadow-md"
                src={item.image.src}
                width={item.image.width}
                height={item.image.height}
                alt=""
                decoding="async"
                loading="eager"
              />
            </div>

            <div className="ml-5 grow text-xs sm:ml-8">
              <h2 className="mb-1 line-clamp-3 text-sm font-bold text-gray-700 md:mb-3 md:text-base">
                <Icon
                  className={`${iconsByType[item.type]} mr-2 align-bottom text-2xl text-gray-700`}
                />
                <span>{item.title}</span>
              </h2>
              <div className="mb-3 flex flex-col flex-wrap items-start gap-2 md:flex-row md:items-center md:gap-3">
                {!!item.authors?.length && (
                  <p className="mb-1 md:mb-0 md:text-base">
                    {item.authors.join(", ")}
                  </p>
                )}
                <span className="rounded-lg border border-gray-300 px-2 py-1 text-gray-500">
                  {contentLanguages[item.language]}
                </span>
                <ul lang={locale} className="flex flex-wrap gap-1">
                  {item.categories?.map((category) => (
                    <li
                      key={category}
                      className="rounded-lg bg-gray-200 px-2 py-1 text-gray-600"
                    >
                      {categories[category]}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden sm:block">
                <p
                  className="line-clamp-3 max-w-screen-sm text-xs text-gray-500"
                  lang={item.language}
                >
                  {item.description}
                </p>
              </div>
            </div>
            <Icon className="mdi--chevron-right md:group-hover:text-primary my-auto ml-2 mr-4 hidden shrink-0 text-2xl text-gray-300 sm:block" />
          </a>
        </li>
      ))}
    </ol>
  )
}
