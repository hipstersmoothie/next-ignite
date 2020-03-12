import Link from "next/link";

import { Anchor } from "./anchor";

export const NavBar = () => (
  <div className="flex justify-between h-12">
    <Link href="/">
      <Anchor>Home</Anchor>
    </Link>

    <div className="flex">
      <Link href="/docs">
        <Anchor className="pr-4">Docs</Anchor>
      </Link>
      <Link href="/blog">
        <Anchor>Blog</Anchor>
      </Link>
    </div>
  </div>
);
