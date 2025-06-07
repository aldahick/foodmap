import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

type HelpLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const HelpLayout: React.FC<HelpLayoutProps> = ({ children, title }) => {
  return (
    <div>
      <div className="w-full h-14 z-10 shadow-xl flex items-center justify-between">
        <Link
          to="/help"
          className="flex h-full items-center pl-4 gap-2 w-20 text-sm font-semibold"
        >
          <ArrowLeftIcon />
          BACK
        </Link>
        <div className="font-bold text-xl text-center">{title}</div>
        <div className="w-20" />
      </div>
      {children}
    </div>
  );
};
