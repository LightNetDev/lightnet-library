import { access, mkdir, readdir } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

import type { DecapAdminUserConfig } from "./integration";

export async function vitePluginExportAdminImages(
  {
    srcDir,
    outDir,
  }: {
    srcDir: URL;
    outDir: URL;
  },
  config: DecapAdminUserConfig,
) {
  return {
    name: "vite-plugin-lightnet-decap-admin-images",
    writeBundle: async () =>
      exportAdminImages(srcDir.pathname, outDir.pathname, config.path),
  };
}

async function exportAdminImages(
  srcDir: string,
  outDir: string,
  adminPath: string,
) {
  const imageDir = join(srcDir, "content", "media", "_images");
  const outImageDir = join(outDir, adminPath, "_images");

  try {
    await access(outImageDir);
  } catch {
    await mkdir(outImageDir, { recursive: true });
  }

  const files = await readdir(imageDir);
  if (!files) {
    return console.error(`Unable to scan directory`);
  }
  await Promise.allSettled(
    files.map((file) => {
      if (
        ![".jpg", ".jpeg", ".png", ".webp"].find((suffix) =>
          file.endsWith(suffix),
        )
      ) {
        return;
      }
      const imagePath = join(imageDir, file);
      return sharp(imagePath)
        .resize(335, 135, { fit: "contain", background: "#fff" })
        .extend({ bottom: 15, background: "#fff" })
        .toFile(join(outImageDir, file));
    }),
  );
}
