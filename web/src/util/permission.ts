import { IPermission } from "../sdk/graphql.types";

export const isAuthorized = (
  permissions: IPermission[],
  permission: IPermission,
) => permissions.includes(IPermission.All) || permissions.includes(permission);
