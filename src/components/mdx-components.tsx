import React from "react";
import makeClass from "clsx";
import { MDXProviderComponents } from "@mdx-js/react";
import { prefixURL } from 'next-prefixed';

declare var PROJECT_NAME: string;

type Element<T extends keyof JSX.IntrinsicElements> = React.PropsWithoutRef<
  JSX.IntrinsicElements[T]
>;

interface MobileMenuButtonProps {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
}

/** The button that opens the menu for mobile screen sizes */
const MobileMenuButton = ({
  open,
  setOpen,
  className,
  ...props
}: MobileMenuButtonProps & Element<"button">) => (
  <button
    className={makeClass(
      "text-gray-700 px-6 hover:text-blue-600 focus:text-blue-600 focus:outline-none",
      className
    )}
    onClick={() => setOpen(!open)}
    {...props}
  >
    {open ? (
      <svg
        className="fill-current w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
      </svg>
    ) : (
      <svg
        className="fill-current w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
      </svg>
    )}
  </button>
);

/** The logo in the navbar */
const Logo = ({ className, ...props }: Element<"a">) => (
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
      src={prefixURL("/logo.svg")}
      className="w-8 h-8 md:mr-3"
    />
    <span className="hidden md:block">{PROJECT_NAME}</span>
  </a>
);

/** The component use to search the docs. */
const SearchInput = ({ className, ...props }: Element<"input">) => (
  <input
    id="search"
    autoComplete="off"
    placeholder="Search the docs (Press '/')"
    className={makeClass(
      className,
      "rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 text-gray-800 w-full",
      "focus:bg-white focus:outline-none"
    )}
    {...props}
  />
);

/** The component used to render the wrapper around the navbar */
const NavBarWrapper = ({ className, ...props }: Element<"div">) => (
  <div
    className={makeClass("border-b border-grey-200 mx-3 lg:mx-0", className)}
    {...props}
  />
);

/** The component used to render the navbar */
const NavBar = ({ className, ...props }: Element<"div">) => (
  <div
    className={makeClass(
      "h-16 max-w-screen-xl mx-auto w-full flex justify-between items-center",
      className
    )}
    {...props}
  />
);

/** The component used to render a top-level navigation item */
const NavBarItem = ({ className, children, ...props }: Element<"a">) => (
  <a
    tabIndex={0}
    className={makeClass(
      "justify-center h-full flex items-center px-6 py-4 cursor-pointer",
      "hover:bg-gray-200 hover:text-blue-600 focus:bg-gray-200 focus:text-blue-600 focus:outline-none",
      className
    )}
    {...props}
  >
    <div>{children}</div>
  </a>
);

/** The component used to render the sidebar */
const Sidebar = ({ className, ...props }: Element<"div">) => (
  <div
    className={makeClass(
      className,
      "py-6 w-full",
      "lg:w-1/5 lg:max-w-xs lg:max-h-screen lg:overflow-scroll lg:sticky lg:top-0"
    )}
    {...props}
  />
);

/** The component used to render a divider in the sidebar */
const SidebarDivider = ({ className, ...props }: Element<"hr">) => (
  <hr className={makeClass("h-1 border-gray-400 my-8", className)} {...props} />
);

/** The component used to render a title in the sidebar */
const SidebarTitle = ({ className, ...props }: Element<"p">) => (
  <p
    className={makeClass(
      "text-xl font-semibold px-4",
      DEFAULT_SPACING,
      className
    )}
    {...props}
  />
);

/** The component used to render around a link in the sidebar */
const SidebarItemWrapper = ({ className, ...props }: Element<"li">) => (
  <li className={makeClass("my-2", className)} {...props} />
);

/** The component used to render around a list of sidebar items */
const SidebarList = (props: Element<"ul">) => <ul {...props} />;

interface SidebarLinkProps {
  /** Whether the link is the current active page */
  isActive?: boolean;
}

/** The component used to render around a link in a sidebar item */
const SidebarLink = ({
  isActive,
  className,
  ...props
}: Element<"a"> & SidebarLinkProps) => (
  <a
    className={makeClass(
      className,
      "text-base font-light hover:font-normal px-6 flex cursor-pointer",
      isActive && "font-normal border-r-4 border-blue-600"
    )}
    {...props}
  />
);

const DEFAULT_SPACING = "my-4";

/** The component used to render a h1 */
const h1 = ({ className, ...props }: Element<"h1">) => (
  <h1
    className={makeClass(
      className,
      "text-5xl font-semibold leading-relaced",
      !className || !className.includes('text-') && 'text-gray-900'
    )}
    {...props}
  />
);

/** The component used to render a h2 */
const h2 = ({ className, ...props }: Element<"h2">) => (
  <h2
    className={makeClass(
      "text-gray-900 text-3xl font-normal border-b border-gray-300 pb-4 mb-8 mt-12",
      className
    )}
    {...props}
  />
);

/** The component used to render a h3 */
const h3 = ({ className, ...props }: Element<"h3">) => (
  <h3
    className={makeClass("text-gray-900 text-2xl font-normal mt-8", className)}
    {...props}
  />
);

/** The component used to render a p */
const p = ({ className, ...props }: Element<"p">) => (
  <p
    className={makeClass(DEFAULT_SPACING, className, "text-gray-800")}
    {...props}
  />
);

/** The component used to render a li */
const li = ({ className, ...props }: Element<"li">) => (
  <li
    className={makeClass(DEFAULT_SPACING, className, "text-gray-800")}
    {...props}
  />
);

/** The component used to render a blockquote */
const blockquote = ({ className, ...props }: Element<"blockquote">) => (
  <blockquote
    className={makeClass(
      "blockquote bg-gray-200 px-6 py-6 my-8 border-l-4 border-blue-500",
      className
    )}
    {...props}
  />
);

/** The component used to render a `code` in a line of text */
const inlineCode = ({ className, ...props }: Element<"code">) => (
  <code
    className={makeClass("text-gray-600 bg-gray-200 rounded", className)}
    style={{ padding: "2px 6px" }}
    {...props}
  />
);

/** The component used to render an anchor */
const a = React.forwardRef(
  (
    { className, ...props }: Element<"a">,
    ref: React.Ref<HTMLAnchorElement>
  ) => (
    <a
      ref={ref}
      className={makeClass(className, "underline cursor-pointer text-gray-700")}
      {...props}
    />
  )
);

/** The component used to render an ul */
const ul = ({ className, ...props }: Element<"ul">) => (
  <ul className={makeClass(className, DEFAULT_SPACING, "ul")} {...props} />
);

/** The component used to render an ol */
const ol = ({ className, ...props }: Element<"ol">) => (
  <ol className={makeClass(className, DEFAULT_SPACING, "ol")} {...props} />
);

/** The component used to render an block of code */
const code = ({ className, ...props }: Element<"code">) => (
  <code
    className={makeClass(className, "text-gray-600 rounded block py-4 px-2")}
    {...props}
  />
);

/** The component used to render a pre */
const pre = ({ className, ...props }: Element<"pre">) => (
  <pre
    className={makeClass(className, DEFAULT_SPACING, "bg-gray-200 rounded")}
    {...props}
  />
);

const components = {
  Logo,
  NavBarWrapper,
  NavBar,
  NavBarItem,
  SearchInput,
  MobileMenuButton,

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
} as const;

export type Components = MDXProviderComponents & typeof components;

export default components;
