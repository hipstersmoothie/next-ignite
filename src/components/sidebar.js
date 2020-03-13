import Link from "next/link";
import { useMDXComponents } from "@mdx-js/react";

import { formatPath } from "../format-path";

export const Sidebar = ({ links, folder }) => {
  let CustomSideBar;

  try {
    CustomSideBar = require(PAGES_DIR + `/${folder}` + "/_sidebar.mdx").default;
  } catch (error) {}

  const components = useMDXComponents();

  return (
    <div className="w-1/5">
      {CustomSideBar ? (
        <CustomSideBar />
      ) : (
        <ul>
          {links.map(page => (
            <li key={page.__resourcePath}>
              <Link href={formatPath(page.__resourcePath)}>
                <components.a>{page.title}</components.a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
