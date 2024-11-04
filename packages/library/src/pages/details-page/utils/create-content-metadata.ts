import { isExternalUrl } from "../../../utils/urls"

const BROWSER_SUPPORTED_TYPES = new Set([
  "pdf",
  "png",
  "jpg",
  "mp3",
  "mp4",
  "html",
])

export function createContentMetadata({
  url,
  name: customName,
}: {
  url: string
  name?: string
}) {
  const lastUrlSegment = url.split("/").slice(-1)[0]
  const hasExtension = lastUrlSegment.includes(".")
  const extension = hasExtension
    ? lastUrlSegment.split(".").slice(-1)[0].toLowerCase()
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
    (isExternal && hasExtension && !BROWSER_SUPPORTED_TYPES.has(extension))

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
