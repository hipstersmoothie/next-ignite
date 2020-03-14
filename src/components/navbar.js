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
  const components = useMDXComponents();

  return (
    <div className="border-b border-grey-200 mx-10">
      <div className="h-16 px-6 max-w-screen-xl mx-auto w-full flex justify-between items-center ">
        {hasHomePage ? (
          <Link href="/">
            <components.a>Home</components.a>
          </Link>
        ) : (
          <div />
        )}

        <div className="flex">
          <Search />
          <Link href="/docs">
            <components.a className="pr-4">Docs</components.a>
          </Link>
          {sections.map((section, index) => (
            <Link key={section} href={`/${section}`}>
              <components.a
                className={makeClass(
                  "capitalize",
                  index !== sections.length - 1 && "pr-4"
                )}
              >
                {titleCase(section)}
              </components.a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};