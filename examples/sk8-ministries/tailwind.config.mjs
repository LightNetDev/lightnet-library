import { lightnetStyles } from "@lightnet/library/tailwind.config.ts"

/**
 * Configure Tailwind CSS.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  presets: [
    lightnetStyles({
      /**
       * Set your primary color. It should provide good contrast against a white background.
       */
      primaryColor: "#14004B",
    }),
  ],
}
