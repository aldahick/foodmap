import { MapPinnedIcon } from "lucide-react";
import React from "react";
import { NavigateFooter } from "./NavigateFooter";
import { NavigateHeader, NavigateHeaderProps } from "./NavigateHeader";

type NavigateLayoutProps = Omit<NavigateHeaderProps, "icon"> & {
  children: React.ReactNode;
};

export const NavigateLayout: React.FC<NavigateLayoutProps> = ({
  children,
  ...props
}) => {
  return (
    <div className="w-screen">
      <NavigateHeader icon={MapPinnedIcon} {...props} />
      <div className="h-[calc(100vh-156px)]">{children}</div>
      <NavigateFooter />
    </div>
  );
};
