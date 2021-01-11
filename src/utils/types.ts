export interface Resource {
  /** Path to file */
  __resourcePath: string;
  date: string;
}

export interface Page extends Resource {
  /** Title from front-matter */
  title: string;
}

export interface BlogPost extends Page {
  title: string;
  author: string;
  email?: string;
  image?: string;
}

export interface MarkdownPage extends Page {
  title: string;
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
}