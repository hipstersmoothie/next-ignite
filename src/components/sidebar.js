import React from "react";
import Link from "next/link";
import path from "path";
import makeClass from "clsx";
import { useMDXComponents } from "@mdx-js/react";
import { MDXProvider } from "@mdx-js/react";

import { MobileMenuContext } from "../mobile-menu-context";
import { formatPath } from "../format-path";

export const SidebarActiveItem = React.createContext({
  pathname: "",
  href: "",
  sidebarFileLocation: ""
});

const getCustomSidebar = (sidebarFileLocation) => {
  try {
    return require(PAGES_DIR + sidebarFileLocation + "/_sidebar.mdx").default;
  } catch (error) {
    try {
      return require(PAGES_DIR + sidebarFileLocation + "/_sidebar.js").default;
    } catch (error) {
      // TODO handle more file types
    }
  }
};

const SidebarItem = ({ href, children }) => {
  const active = React.useContext(SidebarActiveItem);
  const { SidebarLink } = useMDXComponents();

  let url = href;

  if (active.sidebarFileLocation && active.href) {
    const { origin } = new URL(active.href);
    const urlPath = path.join(active.sidebarFileLocation, href);
    const final = new URL(urlPath, origin);

    url = final.pathname;
  }

  return (
    <Link href={url}>
      <SidebarLink isActive={active.pathname === url}>{children}</SidebarLink>
    </Link>
  );
};

export const Sidebar = ({ links, folder }) => {
  const [menuOpen] = React.useContext(MobileMenuContext);
  const sidebarFileLocation = `/${folder}`;
  const CustomSideBar = getCustomSidebar(sidebarFileLocation);
  const [active, setActive] = React.useState({ pathname: "", href: "" });

  const {
    SidebarItemWrapper,
    SidebarLink,
    SidebarTitle,
    SidebarDivider,
    SidebarList,
    Sidebar,
    ...components
  } = useMDXComponents();

  React.useLayoutEffect(() => {
    const newActive = links.find(link =>
      window.location.pathname.includes(link.__resourcePath.replace(".mdx", ""))
    );

    setActive({
      href: window.location.href,
      pathname: formatPath(newActive.__resourcePath)
    });
  }, []);

  return (
    <SidebarActiveItem.Provider
      value={{
        ...active,
        sidebarFileLocation: CustomSideBar ? sidebarFileLocation : ""
      }}
    >
      <MDXProvider
        components={{
          ...components,
          li: SidebarItemWrapper,
          ul: SidebarList,
          a: SidebarItem,
          p: SidebarTitle,
          hr: SidebarDivider
        }}
      >
        <Sidebar className={makeClass(!menuOpen && 'hidden', 'lg:block')}>
          {CustomSideBar ? (
            <CustomSideBar />
          ) : (
            <SidebarList>
              {links.map(page => (
                <SidebarItemWrapper key={page.__resourcePath}>
                  <SidebarItem href={formatPath(page.__resourcePath)}>
                    {page.title}
                  </SidebarItem>
                </SidebarItemWrapper>
              ))}
            </SidebarList>
          )}
        </Sidebar>
      </MDXProvider>
    </SidebarActiveItem.Provider>
  );
};
