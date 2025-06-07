import { IPermission } from "../../sdk/graphql.types";

export const ADMIN_NAVBAR_LINKS = [
  {
    label: "Users",
    url: "/admin/users",
    permission: IPermission.Users,
  },
];
