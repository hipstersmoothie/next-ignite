import React from "react";
import Link from "next/link";
import { titleCase } from "title-case";
import makeClass from "clsx";
import { useMDXComponents } from "@mdx-js/react";

import { formatPath } from "../format-path";
// import searchIndex from "../../search.json";
const searchIndex = [];

const Search = () => {
  const components = useMDXComponents();
  const [search, setSearch] = React.useState("");
  const normalizedSearch = search.toLowerCase();
  const results = searchIndex.filter(
    page =>
      page.content?.toLowerCase().includes(search) ||
      page.title?.toLowerCase().includes(search) ||
      page.author?.toLowerCase().includes(search)
  );

  return (
    <div className="relative">
      <input
        placeholder="Search"
        value={search}
        onChange={e => {
          setSearch(e.currentTarget.value);
        }}
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
  const {
    Logo,
    NavBarWrapper,
    NavBar,
    NavBarItem,
    ...components
  } = useMDXComponents();

  return (
    <NavBarWrapper>
      <NavBar>
        {hasHomePage ? (
          <Link href="/">
            <Logo />
          </Link>
        ) : (
          <div />
        )}

        <div className="flex h-full">
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
  );
};
