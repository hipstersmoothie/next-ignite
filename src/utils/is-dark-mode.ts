import React from "react";
import usePassiveLayoutEffect from "@react-hook/passive-layout-effect";

export function isDarkMode() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return true;
  }

  return false;
}

export function useDarkMode() {
  const [isDark, isDarkSet] = React.useState(false);

  usePassiveLayoutEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    const updateDark = () => {
      isDarkSet(window.matchMedia("(prefers-color-scheme: dark)").matches);
    };

    updateDark();
    darkModeMediaQuery.addListener(updateDark);

    return () => {
      darkModeMediaQuery.removeListener(updateDark);
    };
  }, []);

  return isDark;
}
