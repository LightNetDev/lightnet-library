import { addIconSelectors } from "@iconify/tailwind"
import typography from "@tailwindcss/typography"
import daisyui from "daisyui"
import type { Config } from "tailwindcss"

const COLOR_PRIMARY = "#d2252f"

export function lightnetStyles({
  primaryColor,
  secondaryColor,
  accentColor,
}: {
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
}): Partial<Config> {
  primaryColor = primaryColor ?? COLOR_PRIMARY
  return {
    content: [
      "./node_modules/@lightnet/library/src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
      "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
      "./src/content/media-types/*.json",
    ],
    theme: {
      extend: {
        colors: {
          primary: primaryColor,
          secondary: secondaryColor ?? primaryColor,
          accent: accentColor ?? primaryColor,
        },
        backgroundImage: {
          "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        },
      },
    },
    daisyui: {
      themes: [
        {
          lightnet: {
            primary: primaryColor,
            secondary: secondaryColor ?? primaryColor,
            accent: accentColor ?? primaryColor,
            neutral: "#20353B",
            "base-100": "#f9fafb",

            "--rounded-box": "0.375rem", // border radius rounded-box utility class, used in card and other large boxes
            "--rounded-btn": "0.375rem", // border radius rounded-btn utility class, used in buttons and similar element
            "--rounded-badge": "0.375rem", // border radius rounded-badge utility class, used in badges and similar
            "--tab-radius": "0.375rem", // border radius of tabs
          },
        },
      ],
      base: false, // applies background color and foreground color for root element by default
      utils: true, // adds responsive and modifier utility classes
      logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
      prefix: "dy-",
    },
    plugins: [typography, daisyui, addIconSelectors(["mdi"])],
  }
}

export default lightnetStyles({})
