declare module "virtual:lightnet/config" {
  const config: import("./config").LightnetConfig
  export default config
}

declare module "virtual:lightnet/logo" {
  const logo: ImageMetadata = import("astro").ImageMetadata
  export default logo
}
