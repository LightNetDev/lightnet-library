# LightNet

Share the message of Jesus and strengthen believers worldwide. LightNet empowers you to create digital media libraries, making your Christian content accessible on the web — including videos, audio, images, and books.

LightNet is built as an integration for the Astro framework, enabling the creation of statically generated sites that can be hosted on any file server. These sites are fast, easily extendable, and fully support internationalization. Explore more in our [developer documentation](https://lightnet-docs.pages.dev).

Check out our [example page](https://sk8-ministries.pages.dev) showcasing LightNet in action for a fictional skateboard ministry.

## Contributing

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
