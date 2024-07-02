import { z } from "astro/zod"

import { verifySchema } from "../utils/verify-schema"
import languages from "./languages.json"

export const resolveLanguageLabel = (bcp47: string) => {
  const label = (languages as Record<string, { label: string }>)[bcp47]?.label

  verifySchema(
    z.string().min(1),
    label,
    `There is no language definition for: ${bcp47}`,
  )
  return label as string
}
