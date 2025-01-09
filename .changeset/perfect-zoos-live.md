---
"@lightnet/decap-admin": patch
"@lightnet/library": patch
---

Renamed default images folder from `\_images` to `images`.

To update your project, rename the folder `src/\_images` to `src/images`.
Also update all image paths inside your media content files.

Alternatively, you can keep the old name `_images`. In this case, you need to set the `imagesFolder` config option in your `astro.config.mjs` file to `_images`.
