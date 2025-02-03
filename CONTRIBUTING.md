# Contributing

This repository contains the LightNet source code. If you'd like to contribute, these commands will be helpful.

```sh
# Install/Update the dependencies by running
pnpm install

# Run the development server for sk8 ministries example
pnpm dev

# Build the application within examples/sk8-ministries/dist
pnpm build

# Run a local server to preview the current build from examples/sk8-ministries/dist
pnpm preview

# Reformat code
pnpm format

# Check the code style
pnpm lint
```

This VS-Code extensions are recommended for development on this repository:

- [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) adds support for working with Astro projects.
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) adds TailwindCSS (this is how we write css in this project) support.
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) checks the code style of your files while editing them.
- [Prettier - Code formatting](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) reformats your code according to our code formatting config.
