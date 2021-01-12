import PurgeCSS from "purgecss";
import glob from "fast-glob";
import path from "path";
import fs from "fs";
import prettyBytes from "pretty-bytes";

import { IgniteConfig } from "./types";
import { DOCS_DIR } from "./docs-data";

function tailwindExtractor(content: string) {
  // Capture as liberally as possible, including things like `h-(screen-1.5)`
  const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
  const broadMatchesWithoutTrailingSlash = broadMatches.map((match) =>
    match.replace(/\\$/, "")
  );

  // Capture classes within other delimiters like .block(class="w-1/2") in Pug
  const innerMatches =
    content.match(/[^<>"'`\s.(){}[\]#=%]*[^<>"'`\s.(){}[\]#=%:]/g) || [];

  return broadMatches
    .concat(broadMatchesWithoutTrailingSlash)
    .concat(innerMatches);
}

const logBytes = (str: string) => prettyBytes(Buffer.byteLength(str, "utf8"));

export const purgeUnusedCss = async (config: IgniteConfig) => {
  if (config.purge !== false) {
    const results = await new PurgeCSS().purge({
      // Scan the out dir for any className usage
      content: glob.sync(path.join(DOCS_DIR, "out/**/*"), {
        // Exclude all css from usage gathering
        ignore: ["**/*.css"],
      }),
      // Purge the output css
      css: glob.sync(path.join(DOCS_DIR, "out/_next/static/css/**/*.css")),
      defaultExtractor: (content) => [...tailwindExtractor(content)],
    });

    if (!results.length) {
      return;
    }

    console.log("PurgeCSS Results:");

    results.map((result) => {
      if (result.file) {
        const before = fs.readFileSync(result.file, "utf-8");

        console.log(
          `${result.file}: ${logBytes(before)} => ${logBytes(result.css)}`
        );
        fs.writeFileSync(result.file, result.css);
      }
    });
  }
};
