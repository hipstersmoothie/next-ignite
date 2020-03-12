import Link from "next/link";
import { titleCase } from "title-case";
import makeClass from "clsx";

import { Anchor } from "../../components/anchor";
import { formatPath } from "../format-path";
import searchIndex from "../../search.json";

const Search = () => {
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
            <Anchor href={formatPath(result.__resourcePath)}>
              {result.title}
            </Anchor>
          ))}
        </div>
      )}
    </div>
  );
};

export const NavBar = ({ sections }) => (
  <div className="flex justify-between items-center h-12 px-6">
    <Link href="/">
      <Anchor>Home</Anchor>
    </Link>

    <div className="flex">
      <Search />
      <Link href="/docs">
        <Anchor className="pr-4">Docs</Anchor>
      </Link>
      {sections.map((section, index) => (
        <Link key={section} href={`/${section}`}>
          <Anchor
            className={makeClass(
              "capitalize",
              index !== sections.length - 1 && "pr-4"
            )}
          >
            {titleCase(section)}
          </Anchor>
        </Link>
      ))}
    </div>
  </div>
);
