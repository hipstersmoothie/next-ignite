import React from "react";
import gravatar from "gravatar";
import makeClass from "clsx";

interface AvatarProps {
  email?: string;
  className?: string;
}

const Avatar = ({ email, className }: AvatarProps) => {
  if (!email) {
    return null;
  }

  return (
    <img
      src={gravatar.url(email)}
      className={makeClass(
        "rounded-full w-12 border-2 border-gray-200",
        className
      )}
    />
  );
};

export default Avatar;
