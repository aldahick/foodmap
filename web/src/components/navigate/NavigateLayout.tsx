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
    <div className="max-w-screen max-h-screen h-screen">
      <NavigateHeader icon={MapPinnedIcon} {...props} />
      <div className="h-[calc(100vh-92px)] max-h-[calc(100vh-92px)]">
        {children}
        <div className="pt-[64px]" />
      </div>
      <NavigateFooter />
    </div>
  );
};
