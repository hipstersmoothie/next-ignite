import React from "react";
import path from "path";
import makeNavBarLayout from "./nav-bar";
import Link from "next/link";

const NavBarLayout = makeNavBarLayout();

export default frontMatter => ({ children: content }) => (
  <NavBarLayout>
    <div className="bg-blue-500 pt-20 pb-24">
      <div className="max-w-screen-sm lg:max-w-screen-md mx-auto text-center text-white">
        <h1 className="text-6xl">{frontMatter.title}</h1>
        <h2 className="text-2xl font-light text-blue-100">
          {frontMatter.tagline}
        </h2>
      </div>
    </div>
    <div className="flex-1 pt-8 pb-32 px-6 max-w-screen-sm lg:max-w-screen-md mx-auto">
      {content}
    </div>
    <div className="w-full flex items-center justify-center bg-gray-200 p-10 border-t-2 border-gray-300">
      <Link href="/docs">
        <button className="border-2 border-blue-600 text-xl px-6 py-4 rounded text-blue-700 focus:outline-none hover:text-white hover:bg-blue-500 focus:text-white focus:bg-blue-500">
          Get Started
        </button>
      </Link>
    </div>
  </NavBarLayout>
);
