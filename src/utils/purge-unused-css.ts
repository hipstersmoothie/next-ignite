import PurgeCSS from "purgecss";
import glob from "fast-glob";
import path from "path";

import { IgniteConfig } from "./types";
import { DOCS_DIR } from "./docs-data";

function tailwindExtractor(content: string) {
  // Capture as liberally as possible, including things like `h-(screen-1.5)`
  const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
  const broadMatchesWithoutTrailingSlash = broadMatches.map((match) =>
    // match.trimEnd("\\")
    match.trimEnd()
  );

  // Capture classes within other delimiters like .block(class="w-1/2") in Pug
  const innerMatches =
    content.match(/[^<>"'`\s.(){}[\]#=%]*[^<>"'`\s.(){}[\]#=%:]/g) || [];

  return broadMatches
    .concat(broadMatchesWithoutTrailingSlash)
    .concat(innerMatches);
}

export const purgeUnusedCss = async (config: IgniteConfig) => {
  if (config.purge !== false) {
    await new PurgeCSS().purge({
      // Scan the out dir for any className usage
      content: glob.sync(path.join(DOCS_DIR, "out/**/*"), {
        // Exclude all css from usage gathering
        ignore: ["**/*.css"],
      }),
      // Purge the output css
      css: glob.sync(path.join(DOCS_DIR, "out/_next/static/css/**/*.css")),
      safelist: {
        standard: [/^bg-/, /.text-/],
        greedy: [/dark:bg-/, /dark:text-/],
      },
      defaultExtractor: (content) => [...tailwindExtractor(content)],
    });
  }
};
