export interface Resource {
  /** Path to file */
  __resourcePath: string;
  date: string;
}

export interface Page extends Resource {
  /** Title from front-matter */
  title: string;
}