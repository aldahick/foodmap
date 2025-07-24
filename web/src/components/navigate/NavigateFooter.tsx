import clsx from "clsx";
import { HelpCircleIcon, ListIcon, MapIcon } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router";
import { Dock } from "rsc-daisyui";

const ALL_LINKS = [
  {
    Icon: MapIcon,
    label: "Map",
    to: "/",
  },
  {
    Icon: ListIcon,
    label: "List",
    to: "/list",
  },
  {
    Icon: HelpCircleIcon,
    label: "Help",
    to: "/help",
  },
];

export const NavigateFooter: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Dock className="px-0">
      {ALL_LINKS.map((link) => (
        <Dock.Item
          key={link.to}
          label={link.label}
          as={Link}
          to={link.to}
          className={clsx(link.to === pathname && "text-blue-500")}
        >
          <link.Icon />
        </Dock.Item>
      ))}
    </Dock>
  );
};
