import React from "react";
import gravatar from "gravatar";
import makeClass from "clsx";

interface AvatarProps {
  email?: string;
  className?: string;
  size?: number;
}

const Avatar = ({ email, className, size = 12 }: AvatarProps) => {
  if (!email) {
    return null;
  }

  return (
    <img
      src={gravatar.url(email)}
      className={makeClass(
        "rounded-full border-2 border-gray-200",
        "dark:border-gray-900",
        `w-${size} h-${size}`,
        className
      )}
    />
  );
};

export default Avatar;
