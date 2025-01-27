declare module "virtual:lightnet/config" {
  const config: import("./config").PreparedLightnetConfig
  export default config
}

declare module "virtual:lightnet/logo" {
  const logo: ImageMetadata | undefined = import("astro").ImageMetadata
  export default logo
}

declare module "virtual:lightnet/project-context" {
  const context: import("./project-context").ProjectContext
  export default context
}
