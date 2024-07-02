declare module "virtual:lightnet/config" {
  const config: import("./vite-plugin-lightnet-config").LightNetConfig
  export default config
}

declare module "virtual:lightnet/logo" {
  const logo: ImageMetadata = import("astro").ImageMetadata
  export default logo
}
