import Link from "next/link";
import { useMDXComponents } from "@mdx-js/react";
import { MDXProvider } from "@mdx-js/react";

import { formatPath } from "../format-path";


export const Sidebar = ({ links, folder }) => {
  let CustomSideBar;

  try {
    CustomSideBar = require(PAGES_DIR + `/${folder}` + "/_sidebar.mdx").default;
  } catch (error) {
    try {
      CustomSideBar = require(PAGES_DIR + `/${folder}` + "/_sidebar.js")
        .default;
    } catch (error) {
      // TODO handle more file types
    }
  }

  const {SidebarItem, SidebarLink, ...components} = useMDXComponents();

  return (
    <MDXProvider
      components={{
        ...components,
        li: SidebarItem,
        a: SidebarLink
      }}
    >
      <div className="w-1/5">
        {CustomSideBar ? (
          <CustomSideBar />
        ) : (
          <components.ul>
            {links.map(page => (
              <SidebarItem key={page.__resourcePath}>
                <Link href={formatPath(page.__resourcePath)}>
                  <SidebarLink>{page.title}</SidebarLink>
                </Link>
              </SidebarItem>
            ))}
          </components.ul>
        )}
      </div>
    </MDXProvider>
  );
};
