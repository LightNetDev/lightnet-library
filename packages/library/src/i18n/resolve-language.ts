import { z } from "astro/zod"

import { verifySchema } from "../utils/verify-schema"
import { ALL_LANGUAGES } from "./languages"

export const resolveLanguageLabel = (bcp47: string) => {
  const label = ALL_LANGUAGES[bcp47]?.label

  verifySchema(
    z.string().min(1),
    label,
    `There is no language definition for: ${bcp47}`,
  )
  return label as string
}
