import React from "react";
import Link from "next/link";
import { titleCase } from "title-case";
import makeClass from "clsx";
import { useMDXComponents } from "@mdx-js/react";

import { formatPath } from "../format-path";
import { MobileMenuContext } from "../mobile-menu-context";
// import searchIndex from "../../search.json";
const searchIndex = [];

const Search = () => {
  const { SearchInput, ...components } = useMDXComponents();
  const [search, setSearch] = React.useState("");
  const normalizedSearch = search.toLowerCase();
  const results = searchIndex.filter(
    page =>
      page.content?.toLowerCase().includes(search) ||
      page.title?.toLowerCase().includes(search) ||
      page.author?.toLowerCase().includes(search)
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

export const NavBar = ({ sections, hasHomePage }) => {
  const [openMenu, setOpenMenu] = React.useContext(MobileMenuContext);
  const {
    Logo,
    NavBarWrapper,
    NavBar,
    NavBarItem,
    ...components
  } = useMDXComponents();

  return (
    <>
      <NavBarWrapper>
        <NavBar>
          {hasHomePage ? (
            <Link href="/">
              <Logo />
            </Link>
          ) : (
            <div />
          )}

          <div className="lg:hidden w-full flex items-center">
            <Search />
            <button
              className="text-gray-700 px-6 hover:text-blue-600 focus:text-blue-600 focus:outline-none"
              onClick={() => setOpenMenu(!openMenu)}
            >
              {openMenu ? (
                <svg
                  class="fill-current w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
                </svg>
              ) : (
                <svg
                  class="fill-current w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
              )}
            </button>
          </div>

          <div className="h-full hidden lg:flex flex-1 lg:max-w-screen-md mx-auto">
            <Search />
            <Link href="/docs">
              <NavBarItem>Docs</NavBarItem>
            </Link>
            {sections.map(section => (
              <Link key={section} href={`/${section}`}>
                <NavBarItem>{titleCase(section)}</NavBarItem>
              </Link>
            ))}
          </div>
        </NavBar>
      </NavBarWrapper>

      {openMenu && (
        <div className="lg:hidden">
          <Link href="/docs">
            <NavBarItem>Docs</NavBarItem>
          </Link>
          {sections.map(section => (
            <Link key={section} href={`/${section}`}>
              <NavBarItem>{titleCase(section)}</NavBarItem>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
