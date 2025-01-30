import { type ImageFunction, z } from "astro:content"

/**
 * We use this function to make sure decap's relative paths will resolve correctly
 * with astro content.
 *
 * @param image astro content image function
 * @returns image property
 */
export const astroImage = (image: ImageFunction) =>
  z
    .string()
    .transform((path) => (path.startsWith("./") ? path : `./${path}`))
    .pipe(image())
