import React from "react";
import Link from "next/link";
import { titleCase } from "title-case";
import { useMDXComponents } from "@mdx-js/react";
import makeClass from "clsx";

import { MobileMenuContext } from "../utils/mobile-menu-context";
import { Components, Element } from "./mdx-components";
import { postFixHTML } from "../utils/format-path";

const GitHubIcon = ({ className, ...props }: Element<"svg">) => (
  <svg
    className={makeClass("fill-current w-5 h-5", className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    {...props}
  >
    <path d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0" />
  </svg>
);

/** Renders the search bar and results */
const Search = () => {
  const { SearchInput } = useMDXComponents() as Components;

  return (
    <div className="relative h-full flex items-center w-full lg:w-auto lg:flex-1 lg:mr-4 lg:pr-4">
      <SearchInput />
    </div>
  );
};

interface NavBarProps {
  /** The names of the top level sections */
  sections: string[];
  /** Whether the site has a home page */
  hasHomePage?: boolean;
}

/** Renders the top level sections of the website */
export const NavBar = ({ sections, hasHomePage }: NavBarProps) => {
  const [openMenu, setOpenMenu] = React.useContext(MobileMenuContext);
  const {
    Logo,
    NavBarWrapper,
    NavBar,
    NavBarItem,
    MobileMenuButton,
  } = useMDXComponents() as Components;

  return (
    <>
      <NavBarWrapper>
        <NavBar>
          {hasHomePage ? (
            <Link passHref href="/">
              <Logo />
            </Link>
          ) : (
            <Logo />
          )}

          <div className="w-full h-full flex items-center lg:flex flex-1 lg:px-12 lg:mx-auto">
            <Search />

            <MobileMenuButton
              open={openMenu}
              setOpen={setOpenMenu}
              className="lg:hidden"
            />

            <div className="hidden lg:flex h-full">
              {sections.map((section) => (
                <Link passHref key={section} href={postFixHTML(`/${section}`)}>
                  <NavBarItem>{titleCase(section)}</NavBarItem>
                </Link>
              ))}

              {process.env.REPO_URL && (
                <NavBarItem
                  href={process.env.REPO_URL}
                  target="_blank"
                  aria-label="Open on GitHub"
                >
                  <GitHubIcon />
                </NavBarItem>
              )}
            </div>
          </div>
        </NavBar>
      </NavBarWrapper>

      {openMenu && (
        <div className="lg:hidden">
          {sections.map((section) => (
            <Link passHref key={section} href={postFixHTML(`/${section}`)}>
              <NavBarItem>{titleCase(section)}</NavBarItem>
            </Link>
          ))}
          {process.env.REPO_URL && (
            <NavBarItem href={process.env.REPO_URL} target="_blank">
              <GitHubIcon className="mr-2" />
              Open on GitHub
            </NavBarItem>
          )}
        </div>
      )}
    </>
  );
};
