import { Feed } from "feed";
import { IgniteConfig } from "./types";
import join from "url-join";
import fs from "fs";
import cheerio from "cheerio";
import path from "path";
import glob from "fast-glob";

import { Resource, BlogPost } from "./types";
import { getEnv } from "./get-env";
import { getAuthor } from "./get-author";
import { DOCS_DIR, MDX_DATA_DIR } from "./docs-data";

export const buildRssFeed = (config: IgniteConfig) => {
  const env = getEnv(config);
  const posts = glob
    .sync(path.join(MDX_DATA_DIR, '**/*'))
    .map((p) => JSON.parse(fs.readFileSync(p, "utf-8")) as Resource)
    .filter((page) => page.__resourcePath.startsWith("blog")) as BlogPost[];

  if (!posts.length) {
    return;
  }

  const author = getAuthor();
  const feed = new Feed({
    title: config.name,
    description: `The ${config.name} blog feed.`,
    id: config.url,
    link: config.url,
    language: "en",
    favicon: join(config.url, "favicon.ico"),
    image: env.PROJECT_LOGO.startsWith("http")
      ? env.PROJECT_LOGO
      : join(config.url, env.PROJECT_LOGO),
    feedLinks: {
      json: join(config.url, "blog", "json"),
      atom: join(config.url, "blog", "atom"),
    },
    copyright: `All rights reserved ${new Date().getFullYear()}, ${author[0]}`,
    author: {
      name: author[0],
      email: author[1],
    },
  });

  posts.map((post) => {
    const author = [];

    if (post.author && post.email) {
      author.push({ name: post.author, email: post.email });
    } else {
      const fileAuthor = getAuthor(post.__resourcePath);
      author.push({ name: fileAuthor[0], email: fileAuthor[1] });
    }

    const html = fs.readFileSync(
      path.join(DOCS_DIR, "out", post.__resourcePath.replace(".mdx", ".html")),
      "utf-8"
    );
    const $ = cheerio.load(html);
    const content = $("article").html();

    feed.addItem({
      title: post.title,
      date: new Date(post.date),
      id: join(config.url, post.__resourcePath.replace(".mdx", "")),
      link: join(config.url, post.__resourcePath.replace(".mdx", "")),
      author: author,
      contributor: author,
      image: post.image,
      content,
    });
  });

  fs.writeFileSync(path.join(DOCS_DIR, 'out/blog', 'feed.xml'), feed.rss2())
};
