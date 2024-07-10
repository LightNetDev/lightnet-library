# LightNet library

## CLI

When you have downloaded the repository for the first time, run `pnpm install` inside the folder to install its dependencies. After that this commands will be available on your command line:

```sh
# run the development server for sk8 ministries example
pnpm dev

# build the application within examples/sk8-ministries/dist
pnpm build

# run a local server to preview the current build from examples/sk8-ministries/dist
pnpm preview

# reformat code
pnpm format

# check code style
pnpm lint
```

## Extensions

This VS-Code extensions are used for development:

- [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) adds support for working with Astro projects.
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) adds TailwindCSS (this is how we write css in this project) support.
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) checks the code style of your files while editing them.
- [Prettier - Code formatting](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) reformats your code according to our code formatting config.
