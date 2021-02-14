import * as shiki from "shiki";

export interface Resource {
  /** Path to file */
  __resourcePath: string;
  date: string;
}

export interface Page extends Resource {
  /** Title from front-matter */
  title: string;
  /** The description for the page, used in meta tags */
  description?: string;
  image?: string;
}

export interface BlogPost extends Page {
  author: string;
  email?: string;
}

export interface MarkdownPage extends Page {
  author: string;
  email?: string;
  content: string;
}

export interface IgniteConfig {
  /** The name to use for the docs */
  name?: string;
  /** The repo the docs are for */
  repo?: string;
  /** The url the docs will be deployed to */
  url?: string;
  /** Produce links with .html URLs */
  htmlUrls?: boolean;
  /** The order of the nav items */
  order?: string[];
  /** Whether to purge unused CSS from static build */
  purge?: boolean;
  /** The light theme to use for syntax highlighting */
  lightSyntaxTheme?: string | shiki.IShikiTheme;
  /** The dark theme to use for syntax highlighting */
  darkSyntaxTheme?: string | shiki.IShikiTheme;
  /** Plugins for remark. JS CONFIG ONLY */
  remarkPlugins?: any[];
  /** Plugins for rehype. JS CONFIG ONLY */
  rehypePlugins?: any[];
}
