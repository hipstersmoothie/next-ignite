import * as pwaAssetGenerator from "pwa-asset-generator";
import path from "path";
import cheerio from "cheerio";
import glob from "fast-glob";
import fs from "fs";

import { DOCS_DIR } from "./docs-data";
import { getEnv } from "./get-env";
import { IgniteConfig } from "./types";

export const generatePwaAssets = async (config: IgniteConfig) => {
  const env = getEnv(config);
  const outDir = path.join(DOCS_DIR, "out");
  const manifestPath = path.join(outDir, "manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

  const light = await pwaAssetGenerator.generateImages(
    path.join(DOCS_DIR, "public", env.PROJECT_LOGO),
    outDir,
    {
      pathOverride: env.BASE_PATH,
      log: false,
      background: manifest.background_color,
    }
  );

  // Add items to manifest
  manifest.icons = [...light.manifestJsonContent];
  manifest.start_url = path.join(env.BASE_PATH, "/");

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  // Add to html HEADs
  const html = await glob(path.join(outDir, "**/*.html"));

  html.map((file) => {
    const $ = cheerio.load(fs.readFileSync(file, "utf-8"));
    $("head").append(
      Object.values(light.htmlMeta)
        .map((image) => {
          if (image.includes("apple-icon-180.jpg")) {
            return image.replace("apple-icon-180.jpg", "apple-icon-180.png");
          }

          return image;
        })
        .join("\n")
    );
    fs.writeFileSync(file, $.html());
  });
};
