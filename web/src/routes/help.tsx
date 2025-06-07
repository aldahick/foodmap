import {
  LanguagesIcon,
  LinkIcon,
  MailIcon,
  ShieldUserIcon,
} from "lucide-react";
import React from "react";
import { Link, Link as RouterLink } from "react-router";
import { chunk } from "remeda";
import { Link as DaisyLink } from "rsc-daisyui";
import { NavigateLayout } from "../components/navigate/NavigateLayout";
import donateHelpIconUrl from "../images/icons/donate-help.png";
import listHelpIconUrl from "../images/icons/list-help.png";
import mapHelpIconUrl from "../images/icons/map-help.png";

const ALL_LINKS = [
  {
    Icon: () => <img src={mapHelpIconUrl} alt="Map Help Icon" />,
    title: "Map Help",
    to: "/help/map",
  },
  {
    Icon: () => <img src={donateHelpIconUrl} alt="Donate Icon" />,
    title: "Donate",
    to: "https://www.cultivateindy.org/donate",
  },
  {
    Icon: () => <img src={listHelpIconUrl} alt="List Help Icon" />,
    title: "List Help",
    to: "/help/list",
  },
  {
    Icon: () => <MailIcon size="100%" />,
    title: "Contact CFBP",
    to: "https://www.cultivateindy.org/contact-us/",
  },
  {
    Icon: () => <LanguagesIcon size="100%" />,
    title: "Select Language",
    to: "/help/language",
  },
  {
    Icon: () => <LinkIcon size="100%" />,
    title: "Website",
    to: "https://www.cultivateindy.org/",
  },
];

export const HelpRoute: React.FC = () => {
  return (
    <NavigateLayout title="Help">
      <Link
        to="/admin/users"
        className="text-gray-500 absolute z-20 bottom-16 right-4"
      >
        <ShieldUserIcon />
      </Link>
      <div className="p-2.5">
        {chunk(ALL_LINKS, 2).map((links) => (
          <div key={links[0].to} className="flex">
            {links.map((link) => {
              const Link = link.to.startsWith("/") ? RouterLink : DaisyLink;
              return (
                <div key={link.to} className="px-4 py-3 w-[50%]">
                  <Link to={link.to} className="no-underline">
                    <div className="px-4 mb-2">
                      <link.Icon />
                    </div>
                    <div className="text-center w-full">{link.title}</div>
                  </Link>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </NavigateLayout>
  );
};
