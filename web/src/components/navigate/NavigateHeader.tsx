import { LucideIcon } from "lucide-react";
import React from "react";

export type NavigateHeaderProps = {
  icon: LucideIcon;
  title: string;
};

export const NavigateHeader: React.FC<NavigateHeaderProps> = ({
  icon: Icon,
  title,
}) => {
  const handleNavigateNearest = () => {
    // TODO implement
  };

  return (
    <div className="w-full flex flex-col items-center relative z-10 shadow-xl">
      <span className="text-2xl font-bold">{title}</span>
      <button
        type="button"
        className="flex flex-col items-center cursor-pointer pb-4"
        onClick={handleNavigateNearest}
      >
        <Icon />
        <span className="font-bold text-sm">
          Click here to navigate to your nearest food box now!
        </span>
      </button>
    </div>
  );
};
