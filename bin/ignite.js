#!/usr/bin/env node
const { app } = require("command-line-application");
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const ignite = require("ignite/next");

const args = app({
  name: "ignite",
  description: "Flexible MDX documentation generator.",
  commands: [
    {
      name: "dev",
      description: "Develop you documentation."
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
