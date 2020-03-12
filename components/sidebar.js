import Link from "next/link";
import makeClass from "clsx";
import { frontMatter as introData } from "../pages/docs/intro.mdx";
import { frontMatter as otherData } from "../pages/docs/other.mdx";

const Anchor = React.forwardRef(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={makeClass(
      className,
      "text-blue-600 visited:text-purple-600 underline cursor-pointer"
    )}
    {...props}
  />
));

export const Sidebar = () => {
  const docsPages = [introData, otherData];

  return (
    <div className="w-1/5">
      <h1>Docs Index</h1>
      <ul>
        {docsPages.map(page => (
          <li key={page.__resourcePath}>
            <Link href={`/${formatPath(page.__resourcePath)}`}>
              <Anchor>{page.title}</Anchor>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

function formatPath(p) {
  return p.replace(/\.mdx$/, "");
}
