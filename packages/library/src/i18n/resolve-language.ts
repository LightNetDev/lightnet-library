import { z } from "astro/zod";
import config from "virtual:lightnet/config";

import { verifySchema } from "../utils/verify-schema";
import bundledLanguages from "./bundled-languages.json";

export const resolveLanguageLabel = (bcp47: string) => {
  const languages = config.languages ?? bundledLanguages;
  const label = (languages as Record<string, { label: string }>)[bcp47]?.label;

  verifySchema(
    z.string().min(1),
    label,
    `There is no language definition for: ${bcp47}`,
  );
  return label as string;
};
