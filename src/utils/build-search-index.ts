import fs from "fs";
import { relative, join } from "path";
import * as cheerio from "cheerio";
import { Element, NodeWithChildren } from "domhandler";

import glob from "fast-glob";
import { DOCS_DIR } from "./docs-data";

const getContentBeforeNextHeading = (
  $: ReturnType<typeof cheerio.load>,
  node: NodeWithChildren,
  lvl: number
) => {
  const next = $(node).nextAll().toArray();
  let content = "";

  for (let index = 0; index < next.length; index++) {
    const element = next[index];

    if (
      $(element).hasClass(`lvl${lvl}`) ||
      $(element).hasClass(`lvl${lvl + 1}`) ||
      $(element).hasClass(`lvl${lvl - 1}`)
    ) {
      break;
    }

    content += `\n${$(element).text()}`;
  }

  return content;
};

const getHeadingsBeforeNextHeading = (
  $: ReturnType<typeof cheerio.load>,
  node: NodeWithChildren,
  lvl: number
) => {
  const next = $(node).nextAll().toArray();
  const titles = [];

  for (let index = 0; index < next.length; index++) {
    const element = next[index];

    if ($(element).hasClass(`lvl${lvl}`)) {
      break;
    }

    if ($(element).hasClass(`lvl${lvl + 1}`)) {
      titles.push(element);
    }
  }

  return titles;
};

const getPage = (page: string) => {
  const content = fs.readFileSync(page, "utf-8");
  const $ = cheerio.load(content);

  const lvl0Node = $(".lvl0")
    .toArray()
    .find((title) => $(".sidebar-active", $(title.next)).length);
  const isBlog = page.includes("/blog/");
  const lvl0 = isBlog ? "Blog" : $(lvl0Node).text();

  const buildTree = (parents: string[], node: Element, lvl = 1) => {
    const searchNode = isBlog && lvl === 1 ? node.parent : node;
    const nextHeadings = getHeadingsBeforeNextHeading($, searchNode, lvl);
    const path = [...parents, $(node).text()];

    const currentNode = {
      path,
      url: `${relative(DOCS_DIR, page)
        .replace("out/", "")
        .replace(".html", "")}${node.attribs.id ? `#${node.attribs.id}` : ""}`,
      content: getContentBeforeNextHeading($, searchNode, lvl),
    };

    return [
      currentNode,
      ...nextHeadings.reduce(
        (acc, heading) => [...acc, ...buildTree(path, heading, lvl + 1)],
        []
      ),
    ];
  };

  return buildTree([lvl0], $(".lvl1")[0]);
};

export const buildSearchIndex = (dest = "out") => {
  return glob(join(DOCS_DIR, "out/**/*.html")).then((pages) => {
    const pagesToIndex = pages.filter(
      (page) =>
        !page.includes("/_sidebar") &&
        !page.includes("out/blog.html") &&
        !page.includes("out/404.html") &&
        !page.includes("out/index.html")
    );

    fs.writeFileSync(
      join(DOCS_DIR, dest, "search-index.json"),
      JSON.stringify(pagesToIndex.map(getPage).flat(), null, 2)
    );
  });
};
