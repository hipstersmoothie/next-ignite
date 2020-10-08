#!/usr/bin/env node
require("dotenv").config();

const path = require("path");
const { app } = require("command-line-application");
const { createServer } = require("http");
const { parse } = require("url");
const { execSync } = require("child_process");
const next = require("next");
const copy = require("copy-template-dir");
const ignite = require("../next");
const { getConfig } = require("../dist/cjs/utils/get-config");
const { buildSitemap } = require("../dist/cjs/utils/sitemap");

const buildNext = require("next/dist/build").default;
const exportNext = require("next/dist/export").default;

function getNextConfig() {
  try {
    const nextConfig = path.join(process.cwd(), "docs/next.config.js");
    return require(nextConfig);
  } catch (error) {}
}

const igniteConfig = getConfig();
const nextConfig = getNextConfig();
const config =
  igniteConfig && !nextConfig ? ignite(igniteConfig)() : nextConfig;
const args = app({
  name: "ignite",
  description: "Flexible MDX documentation generator.",
  commands: [
    {
      name: "init",
      description: "Initialize an ignite-cli based docs site.",
    },
    {
      name: "dev",
      description: "Develop your documentation.",
    },
    {
      name: "build",
      description: "Build your documentation.",
    },
    {
      name: "deploy",
      description: "Deploy your documentation to GitHub Pages.",
    },
  ],
});

if (!args) {
  return;
}

if (args._command === "init") {
  const inDir = path.join(__dirname, "../template");
  const outDir = path.join(process.cwd(), "docs");

  copy(inDir, outDir, {}, (err, createdFiles) => {
    if (err) {
      throw err;
    }

    console.log("Initialized ignite documentation website!");
  });
}

if (args._command === "dev") {
  const docs = next({ dev: true, dir: "docs", conf: config });
  const handle = docs.getRequestHandler();

  docs.prepare().then(() => {
    createServer((req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(3000, (err) => {
      if (err) {
        throw err;
      }

      console.log("> Ready on http://localhost:3000/docs");
    });
  });
}

if (args._command === "build") {
  // TODO add options
  process.env.NODE_ENV = "production";
  const docsDir = path.resolve(path.join(process.cwd(), "docs"));
  const outdir = path.join(docsDir, "out");

  buildNext(docsDir, config)
    .then(() => exportNext(docsDir, { outdir }))
    .then(() => {
      console.log("Export successful", 0);
      execSync(
        `touch ${path.resolve(path.join(process.cwd(), "docs/out/.nojekyll"))}`
      );
      buildSitemap();
    })
    .catch((err) => {
      console.error("");
      console.error("> Build error occurred");
      console.log(err);
    });
}

if (args._command === "deploy") {
  try {
    execSync(
      'npx push-dir --cleanup --dir=docs/out --branch=gh-pages --message="Update docs [skip ci]" --verbose'
    );

    console.log("Export successful");
  } catch (error) {
    console.log(error.stdout.toString());
    console.log(error.stderr.toString());
  }
}
