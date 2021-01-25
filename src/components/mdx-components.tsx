import React from "react";
import makeClass from "clsx";
import Link from "next/link";
import mergeRefs from "react-merge-refs";
import { useRouter } from "next/router";
import useClickOutside from "use-click-outside";
import join from "url-join";
import { useDebouncedCallback } from "use-debounce";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import { MDXProviderComponents } from "@mdx-js/react";
import { prefixURL } from "next-prefixed";
import useLayoutEffect from "@react-hook/passive-layout-effect";
import { postFixHTML, formatPath } from "../utils/format-path";

export type Element<
  T extends keyof JSX.IntrinsicElements
> = React.PropsWithoutRef<JSX.IntrinsicElements[T]>;

const sidebarScrollPositionKey = "IGNITE_PAGE_POSITION";
const pageScrollPositionKey = "IGNITE_FULL_PAGE_POSITION";

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
        "px-6 h-full focus:outline-none focus-visible:ring ring-inset rounded flex items-center font-normal cursor-pointer text-xl",
        "md:pr-10 lg:w-60 xl:w-72",
        className
      )}
      {...props}
    >
      <picture className="md:mr-3">
        <source
          srcSet={prefixURL(process.env.PROJECT_LOGO_DARK)}
          media="(prefers-color-scheme: dark)"
          className="w-8 h-8"
        />
        <img
          src={prefixURL(process.env.PROJECT_LOGO)}
          alt={`${process.env.PROJECT_NAME} Logo`}
          className="w-8 h-8"
        />
      </picture>
      <span className="hidden uppercase font-semibold tracking-widest text-sm md:block dark:text-gray-200">
        {process.env.PROJECT_NAME}
      </span>
    </a>
  )
);

interface MatchHighlightProps {
  children: string;
  term: string;
}

const MatchHighlight = ({ children, term }: MatchHighlightProps) => {
  const highlighted = React.useMemo(() => {
    let remaining = children;
    let content = [];
    const termRegex = new RegExp(term, "i");

    if (!term) {
      return remaining;
    }

    while (remaining.match(termRegex)) {
      const start = remaining.toLowerCase().indexOf(term.toLowerCase());
      const end = start + term.length;

      content.push(remaining.slice(0, start));
      content.push(
        <span className="text-primary-500 bg-gray-200 dark:text-primary-300 dark:bg-gray-700">
          {remaining.slice(start, end)}
        </span>
      );

      remaining = remaining.slice(end);
    }

    content.push(remaining);

    return content;
  }, [children, term]);

  return <>{highlighted}</>;
};

/** The component used to search the mdx. */
const SearchInput = React.forwardRef(
  (
    { className, ...props }: Element<"input">,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const router = useRouter();

    let lastLvl0: string | undefined;
    const data = React.useRef([]);
    const resultsRef = React.useRef<HTMLDivElement>();
    const innerRef = React.useRef<HTMLDivElement>();
    const [current, currentSet] = React.useState(0);
    const [hasInteracted, hasInteractedSet] = React.useState(false);
    const [term, termSet] = React.useState("");
    const [search, searchSet] = React.useState("");
    const [showResults, showResultsSet] = React.useState(false);
    const debouncedSearchSet = useDebouncedCallback(() => {
      showResultsSet(Boolean(term));
      searchSet(term);

      if (resultsRef.current) {
        disableBodyScroll(resultsRef.current);
      }
    }, 200);

    const normalizedSearch = search.toLowerCase();
    const matchingResults = React.useMemo(() => {
      return data.current
        .filter((result) => {
          const matchedPath = result.path[result.path.length - 1]
            .toLowerCase()
            .includes(normalizedSearch);
          const matchedContent = result.content
            .toLowerCase()
            .includes(normalizedSearch);

          return matchedPath || matchedContent;
        })
        .sort((a, b) => {
          const getWeight = (n) => {
            const contentMatch = n.content
              .toLowerCase()
              .includes(normalizedSearch)
              ? 1
              : 0;
            const pathMatch = n.path.filter((p) =>
              p.toLowerCase().includes(normalizedSearch)
            ).length;

            return contentMatch + pathMatch;
          };

          return getWeight(b) - getWeight(a);
        });
    }, [search]);

    useClickOutside(innerRef, () => showResultsSet(false));

    React.useEffect(() => {
      fetch(join(process.env.BASE_PATH, "search-index.json"))
        .then((res) => res.text())
        .then((text) => (data.current = JSON.parse(text)));
    }, []);

    React.useEffect(() => {
      const el = document.querySelector<HTMLDivElement>("[aria-selected=true");

      if (el) {
        el.scrollIntoView({ block: "nearest" });
      }
    }, [current]);

    React.useEffect(() => {
      if (!showResults || !search) {
        console.log("enable");
        clearAllBodyScrollLocks();
      }
    }, [showResults, search]);

    return (
      <div
        ref={mergeRefs([ref, innerRef])}
        className="w-full lg:relative"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            showResultsSet(false);
          }

          if (e.key === "Tab" || e.key === "Enter") {
            if (search && showResults) {
              router.push(
                formatPath(postFixHTML(matchingResults[current].url))
              );
              e.preventDefault();
            }

            showResultsSet(false);
          }

          if (e.key === "ArrowDown") {
            currentSet(Math.min(matchingResults.length - 1, current + 1));
            hasInteractedSet(true);
            e.preventDefault();
          }

          if (e.key === "ArrowUp") {
            currentSet(Math.max(0, current - 1));
            hasInteractedSet(true);
            e.preventDefault();
          }
        }}
      >
        <div className="w-full relative">
          <input
            id="search"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder='Search (Press "/" to focus)'
            className={makeClass(
              className,
              DEFAULT_TEXT_COLOR,
              "placeholder-gray-500 rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 w-full",
              "focus:bg-white focus:outline-none",
              "dark:focus:bg-gray-1000 dark:focus:border-gray-800 dark:focus:text-white",
              "dark-placeholder:placeholder-gray-600 dark:bg-gray-900 dark:border-gray-900"
            )}
            value={term}
            onChange={(e) => {
              termSet(e.target.value);
              debouncedSearchSet.callback();
            }}
            {...props}
          />

          {search && (
            <button
              className={makeClass(
                "w-6 h-6 absolute right-2 inset-y-1/2 transform -translate-y-1/2 rounded-full bg-gray-400 p-2 flex items-center justify-center text-white",
                "dark:bg-gray-700 dark:text-gray-100"
              )}
              title="clear search"
              onClick={() => {
                searchSet("");
                termSet("");
                showResultsSet(false);
                clearAllBodyScrollLocks();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="8px"
                viewBox="0 0 329.26933 329"
                width="8px"
                className="fill-current"
              >
                <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
              </svg>
            </button>
          )}
        </div>

        {showResults && search && (
          <div
            ref={resultsRef}
            role="list-box"
            className={makeClass(
              "search-results bg-white rounded pt-6 px-4 lg:mt-1 border border-gray-200 shadow-lg overflow-auto top-full left-0 right-0 absolute z-10",
              "dark:bg-gray-1000 dark:border-gray-800"
            )}
            onMouseOver={() => hasInteractedSet(true)}
          >
            {matchingResults.length ? (
              matchingResults.map((item, index) => {
                const contentIndex = item.content
                  .toLowerCase()
                  .indexOf(normalizedSearch);
                const contentStart = Math.max(0, contentIndex - 40);
                const contentEnd = Math.min(
                  item.content.length,
                  contentIndex + search.length + 40
                );
                const isSelected =
                  (index === 0 && !hasInteracted) || index === current;
                const isGrouped = lastLvl0 === item.path[0];

                lastLvl0 = item.path[0];

                return (
                  <div
                    role="option"
                    className="search-result pb-4 cursor-pointer"
                    aria-selected={isSelected}
                  >
                    <Link passHref href={postFixHTML(`/${item.url}`)}>
                      <a
                        onClick={() => {
                          showResultsSet(false);
                          searchSet("");
                        }}
                      >
                        <div
                          className={makeClass(
                            "border-b border-gray-400 pb-2 text-gray-800 dark:text-gray-300 dark:border-gray-600",
                            isGrouped && "hidden"
                          )}
                        >
                          {item.path[0]}
                        </div>

                        <div className="flex py-2 text-sm">
                          <div className="w-1/3 font-medium	border-r border-gray-400 px-3 py-2 text-gray-600 dark:text-gray-400">
                            <MatchHighlight term={search}>
                              {item.path[1]}
                            </MatchHighlight>
                          </div>

                          <div
                            className={makeClass(
                              "search-content w-2/3 px-3 py-2 text-gray-900 dark:text-gray-400",
                              isSelected && "bg-gray-100 dark:bg-gray-800"
                            )}
                          >
                            <div className="font-bold">
                              <MatchHighlight term={search}>
                                {item.path.slice(2).join(" > ") || item.path[1]}
                              </MatchHighlight>
                            </div>

                            {contentIndex !== -1 && (
                              <div className="mt-2 text-gray-700 dark:text-gray-400">
                                {contentStart !== 0 && "…"}
                                <MatchHighlight term={search}>
                                  {item.content.slice(contentStart, contentEnd)}
                                </MatchHighlight>
                                {contentEnd !== item.content.length && "…"}
                              </div>
                            )}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="pb-6 text-center">
                No match results for search{" "}
                <span className="font-semibold">"{search}"</span>!
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

/** The component used to render the wrapper around the navbar */
const NavBarWrapper = ({ className, ...props }: Element<"div">) => (
  <div
    className={makeClass(
      "sticky top-0 z-40 border-b border-gray-200 lg:mx-0 bg-white dark:bg-gray-1000",
      "dark:border-gray-800",
      className
    )}
    {...props}
  />
);

/** The component used to render the navbar */
const NavBar = ({ className, ...props }: Element<"div">) => (
  <div
    className={makeClass(
      "h-16 max-w-6xl mx-auto w-full flex justify-between items-center",
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
        "hover:bg-gray-200 hover:text-primary-600 focus:bg-gray-200 focus:text-primary-600 focus:outline-none focus-visible:ring ring-inset",
        "dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white dark:focus:bg-gray-1000 dark:focus:text-white",
        className
      )}
      {...props}
    >
      <div className="flex items-center">{children}</div>
    </a>
  )
);

/** The component used to render the sidebar */
const Sidebar = ({ className, children, ...props }: Element<"div">) => {
  const ref = React.useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const page = document.querySelector("html");
    const pagePosition = Number(localStorage.getItem(pageScrollPositionKey));
    const sideBarPosition = Number(
      localStorage.getItem(sidebarScrollPositionKey)
    );

    requestAnimationFrame(() => {
      if (sideBarPosition) {
        ref.current.scrollTop = sideBarPosition;
      }

      if (pagePosition) {
        page.scrollTop = pagePosition;
      }
    });

    localStorage.setItem(sidebarScrollPositionKey, "0");
    localStorage.setItem(pageScrollPositionKey, "0");
  }, []);

  return (
    <div
      className={makeClass(
        "sidebar-root",
        className,
        "w-full h-auto lg:w-auto",
        "lg:static"
      )}
      {...props}
    >
      <div className="px-6 lg:pr-4 lg:sticky lg:top-16 w-full lg:w-60 xl:w-72">
        <div className="hidden lg:block h-12 pointer-events-none absolute inset-x-0 z-10 bg-gradient-to-b from-white mr-2.5 dark:from-gray-1000" />
        <div
          ref={ref}
          className="sidebar-items lg:max-h-screen lg:overflow-y-auto border-box"
        >
          <div className="pb-12 pt-8 lg:pb-16">{children}</div>
        </div>
      </div>
    </div>
  );
};

/** The component used to render a divider in the sidebar */
const SidebarDivider = ({ className, ...props }: Element<"hr">) => (
  <hr
    className={makeClass(
      "h-1 border-gray-400 my-8",
      "dark:border-gray-800",
      className
    )}
    {...props}
  />
);

/** The component used to render a title in the sidebar */
const SidebarTitle = ({ className, ...props }: Element<"p">) => (
  <p
    className={makeClass(
      "lvl0 text-xs uppercase tracking-wider font-semibold text-gray-900",
      "dark:text-gray-300",
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
        "text-gray-500 text-base font-light hover:font-normal pr-6 flex cursor-pointer focus:outline-none focus-visible:ring ring-inset rounded",
        isActive
          ? "sidebar-active text-gray-700 font-normal border-r-4 border-primary-600 dark:border-primary-400 dark:font-semibold dark:text-gray-100 rounded-r-none"
          : "dark:text-gray-400 dark:hover:text-gray-100 dark:hover:font-normal"
      )}
      {...props}
      onClick={(e) => {
        localStorage.setItem(
          sidebarScrollPositionKey,
          String(document.querySelector(".sidebar-items").scrollTop)
        );
        localStorage.setItem(
          pageScrollPositionKey,
          String(Math.min(document.querySelector("html").scrollTop, 65))
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
        "break-words relative text-3xl font-semibold mb-4 md:mb-8",
        "lg:text-4xl",
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
      "break-words relative text-2xl font-normal border-b border-gray-300 pb-2 mb-4 mt-6",
      "md:mb-6",
      "lg:text-3xl lg:mt-8 mb:pb-4",
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
      "break-words text-xl relative font-bold mt-6",
      "lg:text-2xl lg:font-semibold",
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
      "break-words relative text-xl font-semibold mt-8",
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
      "break-words relative text-lg font-semibold mt-8",
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
      "break-words lvl6",
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
      "dark:bg-gray-800",
      className
    )}
    {...props}
  />
);

/** The component used to render a `code` in a line of text */
const inlineCode = ({ className, ...props }: Element<"code">) => (
  <code
    className={makeClass(
      "text-gray-700 bg-gray-200 rounded",
      "dark:bg-gray-800 dark:text-gray-200",
      className
    )}
    style={{ padding: "2px 6px" }}
    {...props}
  />
);

/** The component used to render an anchor */
const a = React.forwardRef(
  (
    { className = "", href, ...props }: Element<"a">,
    ref: React.Ref<HTMLAnchorElement>
  ) => {
    if (href.startsWith("http")) {
      return (
        <a
          ref={ref}
          className={makeClass(
            `underline cursor-pointer ${DEFAULT_TEXT_COLOR}`,
            "focus:outline-none focus-visible:ring",
            className
          )}
          href={href}
          {...props}
        />
      );
    }

    return (
      <Link passHref href={postFixHTML(href)}>
        <a
          ref={ref}
          className={makeClass(
            "focus-visible:ring ring-offset-2 focus:outline-none rounded",
            !className.includes("header-link") &&
              `underline cursor-pointer ${DEFAULT_TEXT_COLOR}`,
            className
          )}
          {...props}
        />
      </Link>
    );
  }
);

/** The component used to render an ul */
const ul = ({ className, ...props }: Element<"ul">) => (
  <ul className={makeClass(className, "my-6 ul")} {...props} />
);

const hr = ({ className, ...props }: Element<"hr">) => (
  <hr
    className={makeClass(className, "m-12 border-b-2", "dark:border-gray-700")}
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
    className={makeClass(
      className,
      "text-gray-600 rounded block py-4 px-2",
      "dark:bg-gray-800"
    )}
    {...props}
  />
);

/** The component used to render a pre */
const pre = ({ className, ...props }: Element<"pre">) => (
  <pre
    className={makeClass(
      className,
      "bg-gray-200 rounded border my-6",
      "dark:bg-gray-800 dark:border-gray-800"
    )}
    style={{
      // Prisms styles override margin!
      marginTop: "1.5rem",
      marginBottom: "1.5rem",
    }}
    {...props}
  />
);

const table = ({ className, ...props }: Element<"table">) => (
  <div className="overflow-auto">
    <table
      className={makeClass(className, DEFAULT_TEXT_COLOR, "w-full my-6")}
      {...props}
    />
  </div>
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
      "py-2 px-3 border-b border-t",
      "dark:border-gray-800"
    )}
    {...props}
  />
);

const tr = ({ className, ...props }: Element<"tr">) => (
  <tr className={makeClass(className, "tr")} {...props} />
);

const img = ({ className, src, ...props }: Element<"img">) => (
  <img title={props.alt} srcSet={prefixURL(src)} {...props} />
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
