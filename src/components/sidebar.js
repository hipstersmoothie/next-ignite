import React from "react";
import { useMDXComponents } from "@mdx-js/react";
import { MDXProvider } from "@mdx-js/react";

import { formatPath } from "../format-path";

export const SidebarActiveItem = React.createContext({
  pathname: "",
  href: ""
});

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

  const [active, setActive] = React.useState({ pathname: "", href: "" });

  React.useLayoutEffect(() => {
    const newActive = links.find(link =>
      window.location.pathname.includes(link.__resourcePath.replace(".mdx", ""))
    );

    setActive({
      href: window.location.href,
      pathname: formatPath(newActive.__resourcePath)
    });
  }, []);

  const {
    SidebarItem,
    SidebarLink,
    SidebarTitle,
    SidebarDivider,
    SidebarList,
    ...components
  } = useMDXComponents();

  return (
    <SidebarActiveItem.Provider value={active}>
      <MDXProvider
        components={{
          ...components,
          li: SidebarItem,
          ul: SidebarList,
          a: SidebarLink,
          p: SidebarTitle,
          hr: SidebarDivider
        }}
      >
        <div className="w-1/5 py-6 bg-gray-200 sticky top-0 max-h-screen overflow-scroll">
          {CustomSideBar ? (
            <CustomSideBar />
          ) : (
            <SidebarList>
              {links.map(page => (
                <SidebarItem key={page.__resourcePath}>
                  <SidebarLink href={formatPath(page.__resourcePath)}>
                    {page.title}
                  </SidebarLink>
                </SidebarItem>
              ))}
            </SidebarList>
          )}
        </div>
      </MDXProvider>
    </SidebarActiveItem.Provider>
  );
};
