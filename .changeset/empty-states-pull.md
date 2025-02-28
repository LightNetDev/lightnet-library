---
"lightnet": minor
---

Update Tailwind CSS to v4

- updates `tailwindcss` dependency to version ^4.
- `@astro/tailwindcss` dependency has been replaced with `@tailwindcss/vite`
- removes the use of `tailwind.config.js` inside site projects
- astro config now supports setting `primaryColor` inside the lightnet integration
- changes default `primaryColor` from `#E6B15C` (yellow-orange) to `#1E2939` (dark gray)
