import Link from "next/link";

import { formatPath } from "../utils/format-path";
import { Anchor } from "./anchor";

export const Sidebar = ({ links }) => (
  <div className="w-1/5">
    <ul>
      {links.map(page => (
        <li key={page.__resourcePath}>
          <Link href={formatPath(page.__resourcePath)}>
            <Anchor>{page.title}</Anchor>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
