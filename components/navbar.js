import Link from "next/link";
import searchIndex from "../search.json";

import { Anchor } from "./anchor";
import { formatPath } from "../utils/format-path";

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

export const NavBar = () => {
  return (
    <div className="flex justify-between items-center h-12 px-6">
      <Link href="/">
        <Anchor>Home</Anchor>
      </Link>

      <div className="flex">
        <Search />
        <Link href="/docs">
          <Anchor className="pr-4">Docs</Anchor>
        </Link>
        <Link href="/blog">
          <Anchor>Blog</Anchor>
        </Link>
      </div>
    </div>
  );
};
