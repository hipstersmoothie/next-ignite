import * as pwaAssetGenerator from "pwa-asset-generator";
import path from "path";
import cheerio from "cheerio";
import glob from "fast-glob";
import fs from "fs";
import join from "url-join";

import { DOCS_DIR, OUT_DIR } from "./docs-data";
import { getEnv } from "./get-env";
import { IgniteConfig } from "./types";
import { formatPath } from "./format-path";
import { createAdditionalManifestAssets } from "./create-additional-manifest-asset";

export const generatePwaAssets = async (config: IgniteConfig) => {
  const env = getEnv(config);
  const manifestPath = path.join(OUT_DIR, "manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

  const light = await pwaAssetGenerator.generateImages(
    path.join(DOCS_DIR, "public", env.PROJECT_LOGO),
    OUT_DIR,
    {
      pathOverride: env.BASE_PATH,
      log: false,
      background: manifest.background_color,
    }
  );

  const dark = await pwaAssetGenerator.generateImages(
    path.join(DOCS_DIR, "public", env.PROJECT_LOGO_DARK),
    OUT_DIR,
    {
      darkMode: true,
      pathOverride: env.BASE_PATH,
      log: false,
      background: manifest.dark_background_color,
    }
  );

  // Add items to manifest
  manifest.icons = [...light.manifestJsonContent, ...dark.manifestJsonContent];
  manifest.start_url = path.join(env.BASE_PATH, "/");

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  // Add to html HEADs
  const html = await glob(path.join(OUT_DIR, "**/*.html"));

  html.map((file) => {
    const $ = cheerio.load(fs.readFileSync(file, "utf-8"));
    const titleNode = $("h1");
    const title = (titleNode && titleNode.text()) || manifest.PROJECT_NAME;
    const descriptionText = titleNode
      ? file.includes("/blog/")
        ? titleNode.parent().next("p").text()
        : titleNode.next("p").text()
      : "";

    const description = descriptionText
      ? `
        <meta name="description" content="${descriptionText}" />
        <meta name="twitter:description" content="${descriptionText}" />
        <meta property="og:description" content="${descriptionText}" />
      `
      : "";

    $("head").append(
      [...Object.values(light.htmlMeta), ...Object.values(dark.htmlMeta)]
        .map((image) => {
          if (image.includes("apple-icon-180.jpg")) {
            return image.replace("apple-icon-180.jpg", "apple-icon-180.png");
          }

          return image;
        })
        .join("\n")
    );
    $("head").append(`
      <meta name="application-name" content="${env.PROJECT_NAME}" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="default"
      />
      <meta name="apple-mobile-web-app-title" content="${env.PROJECT_NAME}" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />

      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="${title}" />
      
      <meta property="og:type" content="website" />
      <meta property="og:title" content="${title}" />
      <meta property="og:site_name" content="${env.PROJECT_NAME}" />
      <meta name="theme-color" content="${manifest.theme_color}" />
      <meta name="msapplication-TileColor" content="${manifest.theme_color}" />

      <meta name="twitter:url" content="${join(
        env.DOCS_URL,
        path.relative(OUT_DIR, file)
      )}" />
      <meta property="og:url" content="${join(
        env.DOCS_URL,
        path.relative(OUT_DIR, file)
      )}" />

      ${description}
      <link rel="manifest" href="${formatPath("/manifest.json")}" />
    `);
    fs.writeFileSync(file, $.html());
  });

  const additionalAssets = createAdditionalManifestAssets(
    path.join(OUT_DIR, "**/*.html"),
    env.BASE_PATH
  );

  if (additionalAssets.length) {
    const swFilename = path.join(OUT_DIR, "sw.js");
    const sw = fs.readFileSync(swFilename, "utf-8");
    fs.writeFileSync(
      swFilename,
      sw.replace(
        '{url:"replace-me",revision:"replace-me"}',
        additionalAssets.map((a) => JSON.stringify(a)).join(",")
      )
    );
  }
};
