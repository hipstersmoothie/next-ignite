export interface Resource {
  /** Path to file */
  __resourcePath: string;
}

export interface Page extends Resource {
  /** Title from front-matter */
  title: string;
}