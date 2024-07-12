import { AstroError } from "astro/errors"
import type { z } from "astro/zod"
import { fromZodError } from "zod-validation-error"

export function verifySchema<T extends z.Schema>(
  schema: T,
  toVerify: unknown,
  errorMessage: string,
): z.output<T> {
  const parsed = schema.safeParse(toVerify, {})
  if (!parsed.success) {
    throw new AstroError(errorMessage, fromZodError(parsed.error).toString())
  }
  return parsed.data
}
