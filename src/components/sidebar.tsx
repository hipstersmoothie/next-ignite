import React from "react";
import Link from "next/link";
import Head from "next/head";
import path from "path";
import makeClass from "clsx";
import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import { useRouter } from "next/router";

import { MobileMenuContext } from "../utils/mobile-menu-context";
import { formatPath } from "../utils/format-path";
import { Page } from "../utils/types";
import { Components } from "./mdx-components";

export const SidebarActiveItem = React.createContext({
  pathname: "",
  sidebarFileLocation: "",
});

declare var PROJECT_NAME: string;
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

const useActive = (links: Page[]) => {
  const router = useRouter();
  const urlPath = path.relative(BASE_PATH || '/', router.pathname);

  let newActive = links.find((link) => {
    const route = link.__resourcePath.replace(".mdx", "");
    return route === urlPath;
  });

  if (!newActive) {
    newActive = links.find((link) => {
      const route = link.__resourcePath.replace(".mdx", "");

      return (
        route.endsWith("index") &&
        router.pathname.includes(route.replace("/index", ""))
      );
    });
  }

  return {
    title: newActive.title || PROJECT_NAME,
    pathname: formatPath(newActive.__resourcePath),
  };
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
  const urlPath = path.join(BASE_PATH, active.sidebarFileLocation, href);

  let url = href;

  if (active.sidebarFileLocation) {
    url = urlPath;

    if (url.endsWith("/index")) {
      url = url.replace("/index", "");
    }

    if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }
  }

  return (
    <Link passHref href={url}>
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
  const active = useActive(links);

  const {
    SidebarItemWrapper,
    SidebarLink,
    SidebarTitle,
    SidebarDivider,
    SidebarList,
    Sidebar,
    ...components
  } = useMDXComponents() as Components;

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
        <Head>
          <title>{active.title.replace(/\\`/g, "`")}</title>
        </Head>
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
