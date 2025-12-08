import { Permission } from "../sdk/gql/graphql";

export const isAuthorized = (
  permissions: Permission[],
  permission: Permission,
) => permissions.includes(Permission.All) || permissions.includes(permission);
