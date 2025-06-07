import { IPermission } from "../graphql.js";
import type { UserModel } from "../service/database/tables/user.table.js";
import type { UserService } from "../user/user.service.js";
import type { AuthToken, AuthTokenService } from "./auth-token.service.js";

export class AuthContext {
  private readonly payload: AuthToken;
  private permissions?: IPermission[];
  private user?: UserModel;

  constructor(
    token: string,
    tokenService: AuthTokenService,
    private readonly userService: UserService,
  ) {
    this.payload = tokenService.verify(token);
  }

  get userId() {
    return this.payload.userId;
  }

  async getUser() {
    if (this.user) {
      return this.user;
    }
    const { userId } = this.payload;
    if (!userId) {
      return;
    }
    this.user = await this.userService.get({ id: userId });
    return this.user;
  }

  get isAuthenticated() {
    return !!this.payload.userId && 1000 * this.payload.exp > Date.now();
  }

  async isAuthorized(permissions: IPermission[]): Promise<boolean> {
    if (!this.isAuthenticated) {
      return false;
    }
    if (!this.permissions) {
      const user = await this.userService.get({ id: this.payload.userId });
      if (!user) {
        return false;
      }
      this.permissions = user.permissions.map(
        ({ permission }) => permission as IPermission,
      );
    }
    if (this.permissions.includes(IPermission.All)) {
      return true;
    }
    return permissions.every((p) => this.permissions?.includes(p));
  }
}
