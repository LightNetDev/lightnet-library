import { useState } from "react"

import Icon from "../../../components/Icon"
import SearchResultList from "../../../components/SearchResultList"
import type { SearchItem } from "../../api/search-response"
import type { MediaType } from "../utils/media-type"
import type { Translations } from "../utils/search-translations"
import { useProvidedTranslations } from "../utils/use-provided-translations"

const PAGE_SIZE = 30

interface Props {
  items: SearchItem[]
  locale: string | undefined
  translations: Translations
  categories: Record<string, string>
  contentLanguages: Record<string, string>
  mediaTypes: MediaType[]
}

export default function ResultList({
  items,
  locale,
  categories,
  translations,
  contentLanguages,
  mediaTypes,
}: Props) {
  const [maxItems, setMaxItems] = useState(15)
  const t = useProvidedTranslations(translations)

  return (
    <>
      <SearchResultList
        items={items.slice(0, maxItems)}
        locale={locale}
        categories={categories}
        contentLanguages={contentLanguages}
        mediaTypes={mediaTypes}
        className="px-4 md:px-8"
      />
      {items.length > maxItems && (
        <div className="mt-8 flex flex-col px-4 md:px-8">
          <div className="dy-divider">
            <button
              type="button"
              className="dy-btn"
              onClick={() => setMaxItems(maxItems + PAGE_SIZE)}
            >
              {t("ln.search.more-results")}
              <Icon className="mdi--chevron-down" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
