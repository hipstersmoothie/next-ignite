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
}

export interface MarkdownPage extends Page {
  title: string;
  author: string;
  content: string;
}
