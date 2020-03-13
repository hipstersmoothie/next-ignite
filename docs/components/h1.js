import makeClass from "clsx";

export const H1 = ({ className, ...props }) => (
  <h1 className={makeClass(className, "text-3xl")} {...props} />
);
