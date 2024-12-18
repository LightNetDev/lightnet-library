import config from "virtual:lightnet/config"
import projectContext from "virtual:lightnet/project-context"

/**
 * Test if a given url is outside this site.
 * Will return false if the url is relative or if it
 * starts with the site config from astro config.
 *
 * @param url to test
 * @returns is the url external?
 */
export function isExternalUrl(url: string) {
  let parsedUrl
  try {
    // test if url is absolute
    parsedUrl = new URL(url)
  } catch {
    // url is relative
    return false
  }
  if (config.internalDomains.includes(parsedUrl.hostname)) {
    return false
  }
  const { site } = projectContext
  if (!site) {
    return true
  }
  return !url.startsWith(site)
}
