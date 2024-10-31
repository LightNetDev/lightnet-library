import { getMediaItem } from "../../../content/get-media-items"
import { isExternalUrl } from "../../../utils/urls"

export async function getContent(slug: string) {
  const item = await getMediaItem(slug)
  return item.data.content.map((c) => createContentInfo(c))
}

const BROWSER_SUPPORTED_TYPES = new Set([
  "pdf",
  "png",
  "jpg",
  "mp3",
  "mp4",
  "html",
])

function createContentInfo({
  url,
  name: customName,
}: {
  url: string
  name?: string
}) {
  const lastUrlSegment = url.split("/").slice(-1)[0]
  const hasExtension = lastUrlSegment.includes(".")
  const extension = hasExtension
    ? lastUrlSegment.split(".").slice(-1)[0]
    : "link"

  const isExternal = isExternalUrl(url)

  const linkName = isExternal ? new URL(url).hostname : lastUrlSegment
  const fileName = hasExtension
    ? lastUrlSegment.slice(0, -(extension.length + 1))
    : undefined
  const name = customName ?? fileName ?? linkName

  const canBeOpened = !hasExtension || BROWSER_SUPPORTED_TYPES.has(extension)
  const canBeDownloaded =
    (!isExternal && hasExtension) ||
    (isExternal && !BROWSER_SUPPORTED_TYPES.has(extension))

  return {
    url,
    extension,
    isExternal,
    name,
    canBeOpened,
    canBeDownloaded,
    downloadLabel: "ln.details.download",
    openLabel: "ln.details.open",
    target: isExternal ? "_blank" : "_self",
  }
}
