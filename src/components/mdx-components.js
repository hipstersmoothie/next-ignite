import React from "react";
import path from "path";
import makeClass from "clsx";

import { SidebarActiveItem } from "./sidebar";

const Logo = ({ className, ...props }) => (
  <a
    tabIndex={0}
    className={makeClass(
      "pl-4 pr-6 h-full focus:outline-none flex items-center h-full text-gray-800 font-normal cursor-pointer text-xl",
      "md:pr-10 lg:w-1/5",
      "hover:font-semibold focus:font-semibold",
      className
    )}
    {...props}
  >
    <img
      alt={`${PROJECT_NAME} Logo`}
      src="/logo.svg"
      className="w-8 h-8 md:mr-3"
    />
    <span className="hidden md:block">{PROJECT_NAME}</span>
  </a>
);

const SearchInput = ({ className, ...props }) => (
  <input
    id="search"
    placeholder="Search the docs (Press '/')"
    className={makeClass(
      className,
      "rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 text-gray-800 w-full",
      "focus:bg-white focus:outline-none"
    )}
    {...props}
  />
);

const NavBarWrapper = ({ className, ...props }) => (
  <div
    className={makeClass("border-b border-grey-200 mx-3 lg:mx-0", className)}
    {...props}
  />
);

const NavBar = ({ className, ...props }) => (
  <div
    className={makeClass(
      "h-16 max-w-screen-xl mx-auto w-full flex justify-between items-center",
      className
    )}
    {...props}
  />
);

const NavBarItem = ({ className, children, ...props }) => (
  <a
    tabIndex={0}
    className={makeClass(
      "justify-center h-full flex items-center px-6 py-4",
      "hover:bg-gray-200 hover:text-blue-600 focus:bg-gray-200 focus:text-blue-600 focus:outline-none",
      className
    )}
    {...props}
  >
    <div>{children}</div>
  </a>
);

const Sidebar = ({ className, ...props }) => (
  <div
    className={makeClass(
      className,
      "py-6 w-full",
      "lg:w-1/5 lg:max-w-xs lg:max-h-screen lg:overflow-scroll lg:sticky lg:top-0"
    )}
    {...props}
  />
);
const SidebarDivider = props => (
  <hr className="h-1 border-gray-400 my-8" {...props} />
);
const SidebarTitle = props => (
  <p className="text-xl font-semibold px-4 my-4" {...props} />
);
const SidebarItemWrapper = props => <li className="my-2" {...props} />;
const SidebarList = props => <ul {...props} />;
const SidebarLink = ({ isActive, ...props }) => (
  <a
    className={makeClass(
      "text-base font-light hover:font-normal px-6 flex cursor-pointer",
      isActive && "font-normal border-r-4 border-blue-600"
    )}
    {...props}
  />
);

const DEFAULT_SPACING = "my-4";

const h1 = props => (
  <h1
    className="text-gray-900 text-5xl font-semibold leading-relaced"
    {...props}
  />
);
const h2 = props => (
  <h2
    className="text-gray-900 text-3xl font-normal border-b border-gray-300 pb-4 mb-8 mt-12"
    {...props}
  />
);
const h3 = props => (
  <h3 className="text-gray-900 text-2xl font-normal mt-8" {...props} />
);
const p = props => (
  <p className={makeClass(DEFAULT_SPACING, "text-gray-800")} {...props} />
);
const li = props => (
  <li className={makeClass(DEFAULT_SPACING, "text-gray-800")} {...props} />
);
const blockquote = props => (
  <blockquote
    className="blockquote bg-gray-200 px-6 py-6 my-8 border-l-4 border-blue-500"
    {...props}
  />
);
const inlineCode = props => (
  <code
    className="text-gray-600 bg-gray-200 rounded"
    style={{ padding: "2px 6px" }}
    {...props}
  />
);

const a = React.forwardRef(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={makeClass(className, "underline cursor-pointer text-gray-700")}
    {...props}
  />
));
const ul = ({ className, ...props }) => (
  <ul className={makeClass(className, DEFAULT_SPACING, "ul")} {...props} />
);
const ol = ({ className, ...props }) => (
  <ol className={makeClass(className, DEFAULT_SPACING, "ol")} {...props} />
);

const code = ({ className, ...props }) => (
  <code
    className={makeClass(className, "text-gray-600 rounded block py-4 px-2")}
    {...props}
  />
);

const pre = ({ className, ...props }) => (
  <pre
    className={makeClass(className, DEFAULT_SPACING, "bg-gray-200 rounded")}
    {...props}
  />
);

export default {
  Logo,
  NavBarWrapper,
  NavBar,
  NavBarItem,
  SearchInput,

  Sidebar,
  SidebarItemWrapper,
  SidebarLink,
  SidebarTitle,
  SidebarDivider,
  SidebarList,

  h1,
  h2,
  h3,
  p,
  inlineCode,
  code,
  pre,
  a,
  ul,
  ol,
  li,
  blockquote
};
