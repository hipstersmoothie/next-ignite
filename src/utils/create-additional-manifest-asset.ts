import fs from "fs";
import path from "path";
import crypto from "crypto";
import glob from "fast-glob";

import { DOCS_DIR, OUT_DIR } from "./docs-data";

const getRevision = (file: string) =>
  crypto.createHash("md5").update(fs.readFileSync(file)).digest("hex");

export const createAdditionalManifestAssets = (
  pattern: string,
  basePath: string
) => {
  return glob.sync(pattern).map((f) => ({
    url: path.posix.join(
      basePath,
      f.includes("/public/")
        ? path.relative(path.join(DOCS_DIR, "public"), f)
        : path.relative(OUT_DIR, f)
    ),
    revision: getRevision(f),
  }));
};
