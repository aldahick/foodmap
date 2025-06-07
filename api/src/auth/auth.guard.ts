import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import type { IPermission } from "../graphql.js";
import { AuthContext } from "./auth.context.js";

export class AuthGuard implements CanActivate {
  constructor(private readonly permissions: IPermission[] | IPermission) {}

  canActivate(executionContext: ExecutionContext): Promise<boolean> {
    const context = GqlExecutionContext.create(executionContext).getContext<
      AuthContext | undefined
    >();
    if (!(context instanceof AuthContext)) {
      return Promise.resolve(false);
    }
    return context.isAuthorized(
      Array.isArray(this.permissions) ? this.permissions : [this.permissions],
    );
  }
}
