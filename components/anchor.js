import makeClass from "clsx";

export const Anchor = React.forwardRef(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={makeClass(
      className,
      "text-blue-600 visited:text-purple-600 underline cursor-pointer"
    )}
    {...props}
  />
));