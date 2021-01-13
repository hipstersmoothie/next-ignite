import React from "react";
import gravatar from "gravatar";
import makeClass from "clsx";

interface AvatarProps {
  email?: string;
  className?: string;
  width?: string;
}

const Avatar = ({ email, className, width }: AvatarProps) => {
  if (!email) {
    return null;
  }

  return (
    <img
      src={gravatar.url(email)}
      className={makeClass(
        "rounded-full border-2 border-gray-200",
        "dark:border-gray-900",
        width || "w-12",
        className
      )}
    />
  );
};

export default Avatar;
