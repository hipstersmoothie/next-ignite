import Link from "next/link";

import { formatPath } from "../utils/format-path";
import { frontMatter as introData } from "../pages/docs/intro.mdx";
import { frontMatter as otherData } from "../pages/docs/other.mdx";
import { Anchor } from "./anchor";

export const docsPages = [introData, otherData];

export const Sidebar = () => (
  <div className="w-1/5">
    <ul>
      {docsPages.map(page => (
        <li key={page.__resourcePath}>
          <Link href={formatPath(page.__resourcePath)}>
            <Anchor>{page.title}</Anchor>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
