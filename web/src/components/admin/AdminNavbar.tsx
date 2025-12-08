import { Permission } from "../../sdk/gql/graphql";

export const ADMIN_NAVBAR_LINKS = [
  {
    label: "Users",
    url: "/admin/users",
    permission: Permission.Users,
  },
  {
    label: "Foodboxes",
    url: "/admin/foodboxes",
    permission: Permission.Foodboxes,
  },
];
