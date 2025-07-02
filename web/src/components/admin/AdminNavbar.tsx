import { IPermission } from "../../sdk/graphql.types";

export const ADMIN_NAVBAR_LINKS = [
  {
    label: "Users",
    url: "/admin/users",
    permission: IPermission.Users,
  },
  {
    label: "Foodboxes",
    url: "/admin/foodboxes",
    permission: IPermission.Foodboxes,
  },
];
