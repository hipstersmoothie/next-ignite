import React from "react";

export const MobileMenuContext = React.createContext<
  [boolean, (newOpenValue: boolean) => void]
>([false, () => {}]);
