import React from "react";
import Link from "next/link";
import path from "path";
import makeClass from "clsx";
import { MDXProvider, useMDXComponents } from "@mdx-js/react";

import { MobileMenuContext } from "../utils/mobile-menu-context";
import { formatPath } from "../utils/format-path";
import { Page } from "../utils/types";
import { Components } from "./mdx-components";

export const SidebarActiveItem = React.createContext({
  pathname: "",
  href: "",
  sidebarFileLocation: "",
});

declare var BASE_PATH: string;
declare var PAGES_DIR: string;

/** Get the custom sidebar for a folder */
const getCustomSidebar = (sidebarFileLocation: string) => {
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

interface SidebarItemProps {
  /** Where the item links to */
  href: string;
  /** The text of the item */
  children: React.ReactNode;
}

/** An link to a page in the sidebar */
const SidebarItem = ({ href, children }: SidebarItemProps) => {
  const active = React.useContext(SidebarActiveItem);
  const { SidebarLink } = useMDXComponents() as Components;

  let url = href;

  if (active.sidebarFileLocation && active.href) {
    const { origin } = new URL(active.href);
    const urlPath = path.join(BASE_PATH, active.sidebarFileLocation, href);
    const final = new URL(urlPath, origin);

    url = final.pathname;

    if (url.endsWith("/index")) {
      url = url.replace("/index", "");
    }

    if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }
  }

  return (
    <Link href={url}>
      <SidebarLink isActive={active.pathname.replace("/index", "") === url}>
        {children}
      </SidebarLink>
    </Link>
  );
};

interface SidebarProps {
  /** Pages the sidebar links to */
  links: Page[];
  /** The folder/top-level section to render */
  folder: string;
}

/** The sidebar with link to all the pages */
export const Sidebar = ({ links, folder }: SidebarProps) => {
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
  } = useMDXComponents() as Components;

  React.useLayoutEffect(() => {
    const urlPath = path.relative(
      BASE_PATH,
      window.location.pathname,
    );

    let newActive = links.find((link) => {
      const route = link.__resourcePath.replace(".mdx", "");
      return route === urlPath;
    });

    if (!newActive) {
      newActive = links.find((link) => {
        const route = link.__resourcePath.replace(".mdx", "");

        return (
          route.endsWith("index") &&
          window.location.pathname.includes(route.replace("/index", ""))
        );
      });
    }

    if (newActive) {
      setActive({
        href: window.location.href,
        pathname: formatPath(newActive.__resourcePath),
      });
    }
  }, []);

  return (
    <SidebarActiveItem.Provider
      value={{
        ...active,
        sidebarFileLocation: CustomSideBar ? sidebarFileLocation : "",
      }}
    >
      <MDXProvider
        components={{
          ...components,
          li: SidebarItemWrapper,
          ul: SidebarList,
          a: SidebarItem,
          p: SidebarTitle,
          hr: SidebarDivider,
        }}
      >
        <Sidebar className={makeClass(!menuOpen && "hidden", "lg:block")}>
          {CustomSideBar ? (
            <CustomSideBar />
          ) : (
            <SidebarList>
              {links.map((page) => (
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
