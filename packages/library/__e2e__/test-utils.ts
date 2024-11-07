import { fileURLToPath } from "node:url"

import { type Page, test as baseTest } from "@playwright/test"
import { build, preview } from "astro"

export { expect, type Locator } from "@playwright/test"

process.env.ASTRO_TELEMETRY_DISABLED = "true"
process.env.ASTRO_DISABLE_UPDATE_CHECK = "true"

export function lightnetTest(fixturePath: string) {
  const root = fileURLToPath(new URL(fixturePath, import.meta.url))

  let server: Server | null = null
  const test = baseTest.extend<{
    lightnet: () => Promise<LightNetPage>
  }>({
    lightnet: ({ page }, use) =>
      use(async () => {
        if (!server) {
          await build({ logLevel: "error", root })
          server = await preview({ logLevel: "error", root })
        }
        return new LightNetPage(server, page)
      }),
  })

  test.afterAll(async () => {
    await server?.stop()
  })

  return test
}

// A Playwright test fixture accessible from within all tests.
class LightNetPage {
  constructor(
    private readonly server: Server,
    private readonly page: Page,
  ) {}

  // Navigate to a URL relative to the server used during a test run and return the resource response.
  goto(url: string) {
    return this.page.goto(this.resolveUrl(url))
  }

  // Resolve a URL relative to the server used during a test run.
  resolveUrl(url: string) {
    return `http://localhost:${this.server.port}${url.replace(/^\/?/, "/")}`
  }
}

type Server = Awaited<ReturnType<typeof preview>>
