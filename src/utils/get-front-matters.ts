import { BlogPost, MarkdownPage } from "./types";

let frontMatters: (MarkdownPage | BlogPost)[] = [];

try {
  const context = require.context(process.env.MDX_DATA_DIR, true, /\.json$/);
  frontMatters = context.keys().map(context) as (MarkdownPage | BlogPost)[];
} catch (error) {
  if (!process.env.browser) {
    // When ran from server use node to get frontMatters
    try {
      const path = require("path");
      const fs = require("fs");
      const glob = require("fast-glob");
  
      const files = glob.sync(path.join(process.env.MDX_DATA_DIR, "*.json"));
  
      frontMatters = files.map((file) =>
        JSON.parse(fs.readFileSync(file, "utf-8"))
      ) as (MarkdownPage | BlogPost)[];
    } catch (error) {}
  }
}

/** Get all the blog posts in the project */
const getFrontMatters = () => {
  try {
    return frontMatters;
  } catch (error) {
    return [];
  }
};

export default getFrontMatters;
