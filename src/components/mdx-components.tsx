import React from "react";
import makeClass from "clsx";
import { MDXProviderComponents } from "@mdx-js/react";
import { prefixURL } from "next-prefixed";

declare var PROJECT_NAME: string;
declare var PROJECT_LOGO: string;
declare var PROJECT_LOGO_DARK: string;

export type Element<
  T extends keyof JSX.IntrinsicElements
> = React.PropsWithoutRef<JSX.IntrinsicElements[T]>;

const storageKey = "IGNITE_PAGE_POSITION";

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
      "text-gray-700 px-6 hover:text-primary-600 focus:text-primary-600 focus:outline-none",
      "dark:text-gray-400",
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
const Logo = React.forwardRef(
  (
    { className, ...props }: Element<"a">,
    ref: React.Ref<HTMLAnchorElement>
  ) => (
    <a
      ref={ref}
      tabIndex={0}
      className={makeClass(
        DEFAULT_TEXT_COLOR,
        "pl-4 pr-6 h-full focus:outline-none flex items-center h-full font-normal cursor-pointer text-xl",
        "md:pr-10 lg:w-1/5",
        "hover:font-semibold focus:font-semibold",
        "dark-hover:font-semibold dark-focus:font-semibold dark-hover:bg-gray-800 dark-focus:bg-gray-800",
        className
      )}
      {...props}
    >
      <picture className="md:mr-3">
        <source
          srcSet={prefixURL(PROJECT_LOGO_DARK)}
          media="(prefers-color-scheme: dark)"
          className="w-8 h-8"
        />
        <img
          src={prefixURL(PROJECT_LOGO)}
          alt={`${PROJECT_NAME} Logo`}
          className="w-8 h-8"
        />
      </picture>
      <span className="hidden md:block dark:text-gray-200">{PROJECT_NAME}</span>
    </a>
  )
);

/** The component use to search the mdx. */
const SearchInput = ({ className, ...props }: Element<"input">) => (
  <input
    id="search"
    autoComplete="off"
    placeholder="Search (Press '/' to focus)"
    className={makeClass(
      className,
      DEFAULT_TEXT_COLOR,
      "placeholder-gray-500 rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 w-full",
      "focus:bg-white focus:outline-none",
      "dark-placeholder:placeholder-gray-600 dark:bg-gray-900 dark:border-gray-900 dark-focus:bg-gray-700 dark-focus:text-white"
    )}
    {...props}
  />
);

/** The component used to render the wrapper around the navbar */
const NavBarWrapper = ({ className, ...props }: Element<"div">) => (
  <div
    className={makeClass(
      "border-b border-grey-200 mx-3 lg:mx-0",
      "dark:border-gray-900",
      className
    )}
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
const NavBarItem = React.forwardRef(
  (
    { className, children, ...props }: Element<"a">,
    ref: React.Ref<HTMLAnchorElement>
  ) => (
    <a
      ref={ref}
      tabIndex={0}
      className={makeClass(
        "justify-center h-full flex items-center px-6 py-4 cursor-pointer text-gray-700",
        "hover:bg-gray-200 hover:text-primary-600 focus:bg-gray-200 focus:text-primary-600 focus:outline-none",
        "dark:text-gray-400 dark-hover:bg-gray-800 dark-hover:text-primary-400 dark-focus:bg-gray-800 dark-focus:text-primary-400",
        className
      )}
      {...props}
    >
      <div className="flex items-center">{children}</div>
    </a>
  )
);

/** The component used to render the sidebar */
const Sidebar = ({ className, ...props }: Element<"div">) => {
  const ref = React.useRef<HTMLDivElement>();

  React.useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const position = Number(localStorage.getItem(storageKey));

    if (position) {
      ref.current.scrollTop = position;
    }

    localStorage.setItem(storageKey, "0");
  }, []);

  return (
    <div
      ref={ref}
      className={makeClass(
        "sidebar-root",
        className,
        "pt-6 pb-12 lg:pb-24 w-full",
        "lg:w-1/5 lg:max-w-xs lg:max-h-screen lg:overflow-scroll lg:sticky lg:top-0"
      )}
      {...props}
    />
  );
};

/** The component used to render a divider in the sidebar */
const SidebarDivider = ({ className, ...props }: Element<"hr">) => (
  <hr
    className={makeClass(
      "h-1 border-gray-400 my-8",
      "dark:border-gray-700",
      className
    )}
    {...props}
  />
);

/** The component used to render a title in the sidebar */
const SidebarTitle = ({ className, ...props }: Element<"p">) => (
  <p
    className={makeClass(
      "text-xl font-semibold px-4",
      "dark:text-gray-200",
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
const SidebarLink = React.forwardRef(
  (
    { isActive, className, onClick, ...props }: Element<"a"> & SidebarLinkProps,
    ref: React.Ref<HTMLAnchorElement>
  ) => (
    <a
      ref={ref}
      className={makeClass(
        className,
        "text-base font-light hover:font-normal px-6 flex cursor-pointer",
        isActive
          ? "sidebar-active font-normal border-r-4 border-primary-600 dark:border-primary-400 dark:font-semibold dark:text-gray-100"
          : "dark:text-gray-400 dark-hover:text-gray-100 dark-hover:font-normal"
      )}
      {...props}
      onClick={(e) => {
        localStorage.setItem(
          storageKey,
          String(document.querySelector(".sidebar-root").scrollTop)
        );
        onClick(e);
      }}
    />
  )
);

const DEFAULT_SPACING = "my-4";
const DEFAULT_TEXT_COLOR = "text-gray-800 dark:text-gray-300";
const HEADER_TEXT_COLOR = "text-gray-900 dark:text-gray-200";

/** The component used to render a h1 */
const h1 = ({ className, ...props }: Element<"h1">) => {
  return (
    <h1
      className={makeClass(
        className,
        "lvl1",
        "relative text-5xl font-semibold leading-relaced",
        (!className || !className.includes("text-")) && HEADER_TEXT_COLOR
      )}
      {...props}
    />
  );
};

/** The component used to render a h2 */
const h2 = ({ className, ...props }: Element<"h2">) => (
  <h2
    className={makeClass(
      "lvl2",
      "relative text-3xl font-normal border-b border-gray-300 pb-4 mb-8 mt-12",
      "dark:border-gray-700",
      HEADER_TEXT_COLOR,
      className
    )}
    {...props}
  />
);

/** The component used to render a h3 */
const h3 = ({ className, ...props }: Element<"h3">) => (
  <h3
    className={makeClass(
      "lvl3",
      "relative text-2xl font-semibold mt-8",
      HEADER_TEXT_COLOR,
      className
    )}
    {...props}
  />
);

/** The component used to render a h4 */
const h4 = ({ className, ...props }: Element<"h4">) => (
  <h4
    className={makeClass(
      "lvl4",
      "relative text-xl font-semibold mt-8",
      HEADER_TEXT_COLOR,
      className
    )}
    {...props}
  />
);

/** The component used to render a h5 */
const h5 = ({ className, ...props }: Element<"h5">) => (
  <h5
    className={makeClass(
      "lvl5",
      "relative text-lg font-semibold mt-8",
      HEADER_TEXT_COLOR,
      className
    )}
    {...props}
  />
);

/** The component used to render a h6 */
const h6 = ({ className, ...props }: Element<"h6">) => (
  <h6
    className={makeClass(
      "lvl6",
      "relative text-md font-semibold mt-8",
      HEADER_TEXT_COLOR,
      className
    )}
    {...props}
  />
);

/** The component used to render a p */
const p = ({ className, ...props }: Element<"p">) => (
  <p
    className={makeClass(DEFAULT_SPACING, className, DEFAULT_TEXT_COLOR)}
    {...props}
  />
);

/** The component used to render a li */
const li = ({ className, ...props }: Element<"li">) => (
  <li
    className={makeClass(DEFAULT_SPACING, className, DEFAULT_TEXT_COLOR)}
    {...props}
  />
);

/** The component used to render a blockquote */
const blockquote = ({ className, ...props }: Element<"blockquote">) => (
  <blockquote
    className={makeClass(
      "blockquote bg-gray-200 px-6 py-6 my-8 border-l-4 border-primary-500",
      "dark:bg-gray-700",
      className
    )}
    {...props}
  />
);

/** The component used to render a `code` in a line of text */
const inlineCode = ({ className, ...props }: Element<"code">) => (
  <code
    className={makeClass(
      "text-gray-600 bg-gray-200 rounded whitespace-no-wrap",
      "dark:bg-gray-700 dark:text-gray-300",
      className
    )}
    style={{ padding: "2px 6px" }}
    {...props}
  />
);

/** The component used to render an anchor */
const a = React.forwardRef(
  (
    { className = "", ...props }: Element<"a">,
    ref: React.Ref<HTMLAnchorElement>
  ) => (
    <a
      ref={ref}
      className={makeClass(
        !className.includes("header-link") &&
          `underline cursor-pointer ${DEFAULT_TEXT_COLOR}`,
        className
      )}
      {...props}
    />
  )
);

/** The component used to render an ul */
const ul = ({ className, ...props }: Element<"ul">) => (
  <ul className={makeClass(className, "my-6 ul")} {...props} />
);

const hr = ({ className, ...props }: Element<"hr">) => (
  <hr
    className={makeClass(className, "m-12 border-b-2", "dark:border-gray-500")}
    {...props}
  />
);

/** The component used to render an ol */
const ol = ({ className, ...props }: Element<"ol">) => (
  <ol className={makeClass(className, "my-6 ol")} {...props} />
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

const table = ({ className, ...props }: Element<"table">) => (
  <table
    className={makeClass(className, DEFAULT_TEXT_COLOR, "w-full my-10")}
    {...props}
  />
);

const th = ({ className, ...props }: Element<"th">) => (
  <th
    className={makeClass(className, "pb-4 px-3 text-left font-semibold")}
    {...props}
  />
);

const td = ({ className, ...props }: Element<"td">) => (
  <td
    className={makeClass(
      className,
      "py-4 px-3 border-b border-t",
      "dark:border-gray-800"
    )}
    {...props}
  />
);

const tr = ({ className, ...props }: Element<"tr">) => (
  <tr className={makeClass(className, "tr")} {...props} />
);

const img = ({ className, ...props }: Element<"img">) => (
  <img title={props.alt} {...props} />
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
  h4,
  h5,
  h6,
  hr,
  p,
  inlineCode,
  code,
  pre,
  a,
  ul,
  ol,
  li,
  blockquote,
  img,

  table,
  th,
  tr,
  td,
} as const;

export type Components = MDXProviderComponents & typeof components;

export default components;
