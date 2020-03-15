#!/usr/bin/env node
const path = require("path");
const { app } = require("command-line-application");
const { createServer } = require("http");
const { parse } = require("url");
const { execSync } = require("child_process");
const next = require("next");
const ignite = require("ignite/next");

const buildNext = require("next/dist/build").default;
const exportNext = require("next/dist/export").default;

const args = app({
  name: "ignite",
  description: "Flexible MDX documentation generator.",
  commands: [
    {
      name: "dev",
      description: "Develop your documentation."
    },
    {
      name: "build",
      description: "Build your documentation."
    },
    {
      name: "export",
      description: "Export your documentation to html."
    }
  ]
});

if (!args) {
  return;
}

if (args._command === "dev") {
  const docs = next({ dev: true, dir: "docs", conf: ignite() });
  const handle = docs.getRequestHandler();

  docs.prepare().then(() => {
    createServer((req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(3000, err => {
      if (err) {
        throw err;
      }

      console.log("> Ready on http://localhost:3000");
    });
  });
}

if (args._command === "build") {
  // TODO add options
  process.env.NODE_ENV = 'production';

  buildNext(path.resolve(path.join(process.cwd(), "docs")), ignite())
    .then(() => process.exit(0))
    .catch(err => {
      console.error("");
      console.error("> Build error occurred");
      console.log(err);
    });
}

if (args._command === "export") {
  // TODO add options
  exportNext(path.resolve(path.join(process.cwd(), "docs")), {
    outdir: path.resolve(path.join(process.cwd(), "docs/out"))
  })
    .then(() => {
      console.log("Export successful", 0);
      execSync(
        `touch ${path.resolve(path.join(process.cwd(), "docs/out/.nojekyll"))}`
      );
    })
    .catch(err => {
      console.log(err);
    });
}
