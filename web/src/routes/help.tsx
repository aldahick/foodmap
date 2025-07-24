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
        className="text-gray-500 fixed z-20 bottom-16 right-4"
      >
        <ShieldUserIcon size={24} />
      </Link>
      {chunk(ALL_LINKS, 2).map((links) => (
        <div key={links[0].to} className="flex justify-between">
          {links.map((link) => {
            const Link = link.to.startsWith("/") ? RouterLink : DaisyLink;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="no-underline px-4 py-2 w-[48%]"
              >
                <div className="px-4 mb-2">
                  <link.Icon />
                </div>
                <p className="text-center w-full">{link.title}</p>
              </Link>
            );
          })}
        </div>
      ))}
    </NavigateLayout>
  );
};
