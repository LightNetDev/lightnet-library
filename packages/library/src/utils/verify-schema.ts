import { AstroError } from "astro/errors"
import { z } from "astro/zod"
import { fromZodError } from "zod-validation-error"

export function verifySchema<T extends z.Schema>(
  schema: T,
  toVerify: unknown,
  errorMessage: string | ((id: string | undefined) => string),
): z.output<T> {
  const parsed = schema.safeParse(toVerify, {})
  if (!parsed.success) {
    const id = z.object({ id: z.string() }).safeParse(toVerify).data?.id
    const message =
      typeof errorMessage === "string" ? errorMessage : errorMessage(id)
    throw new AstroError(message, fromZodError(parsed.error).toString())
  }
  return parsed.data
}
