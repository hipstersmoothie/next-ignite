import React from "react";
import Link from "next/link";
import { titleCase } from "title-case";
import { useMDXComponents } from "@mdx-js/react";

import { formatPath } from "../utils/format-path";
import { MobileMenuContext } from "../utils/mobile-menu-context";
import { Components } from "./mdx-components";
import { MarkdownPage } from "../utils/types";

// import searchIndex from "../../search.json";
const searchIndex: MarkdownPage[] = [];

/** Renders the search bar and results */
const Search = () => {
  const { SearchInput, ...components } = useMDXComponents() as Components;
  const [search, setSearch] = React.useState("");
  const normalizedSearch = search.toLowerCase();
  const results = searchIndex.filter(
    page =>
      page.content?.toLowerCase().includes(normalizedSearch) ||
      page.title?.toLowerCase().includes(normalizedSearch) ||
      page.author?.toLowerCase().includes(normalizedSearch)
  );

  return (
    <div className="relative h-full flex items-center w-full lg:w-auto lg:flex-1 pr-4">
      <SearchInput
        value={search}
        onChange={e => setSearch(e.currentTarget.value)}
      />

      {search && (
        <div className="absolute">
          {results.map(result => (
            <components.a href={formatPath(result.__resourcePath)}>
              {result.title}
            </components.a>
          ))}
        </div>
      )}
    </div>
  );
};

interface NavBarProps {
  /** The names of the top level sections */
  sections: string[];
  /** Whether the docs site has a home page */
  hasHomePage?: boolean;
}

/** Renders the top level sections of the docs */
export const NavBar = ({ sections, hasHomePage }: NavBarProps) => {
  const [openMenu, setOpenMenu] = React.useContext(MobileMenuContext);
  const {
    Logo,
    NavBarWrapper,
    NavBar,
    NavBarItem,
    MobileMenuButton
  } = useMDXComponents() as Components;

  return (
    <>
      <NavBarWrapper>
        <NavBar>
          {hasHomePage ? (
            <Link href="/">
              <Logo />
            </Link>
          ) : (
            <Logo />
          )}

          <div className="lg:hidden w-full flex items-center">
            <Search />
            <MobileMenuButton open={openMenu} setOpen={setOpenMenu} />
          </div>

          <div className="h-full hidden lg:flex flex-1 lg:max-w-screen-md mx-auto">
            <Search />
            <Link href={formatPath("/docs")}>
              <NavBarItem>Docs</NavBarItem>
            </Link>
            {sections.map(section => (
              <Link key={section} href={formatPath(`/${section}`)}>
                <NavBarItem>{titleCase(section)}</NavBarItem>
              </Link>
            ))}
          </div>
        </NavBar>
      </NavBarWrapper>

      {openMenu && (
        <div className="lg:hidden">
          <Link href={formatPath("/docs")}>
            <NavBarItem>Docs</NavBarItem>
          </Link>
          {sections.map(section => (
            <Link key={section} href={formatPath(`/${section}`)}>
              <NavBarItem>{titleCase(section)}</NavBarItem>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
