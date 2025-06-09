import { NotFoundException, NotImplementedException } from "@nestjs/common";
import { Args, Resolver } from "@nestjs/graphql";
import type { IAuthToken, IQueryAuthTokenArgs } from "../graphql.js";
import { UserService } from "../user/user.service.js";
import { BatchResolveField, TypedQuery } from "../util/graphql.util.js";
import { AuthGoogleService } from "./auth-google.service.js";
import { AuthTokenService } from "./auth-token.service.js";

@Resolver("AuthToken")
export class AuthResolver {
  constructor(
    private readonly googleService: AuthGoogleService,
    private readonly tokenService: AuthTokenService,
    private readonly userService: UserService,
  ) {}

  @TypedQuery("authSsoRedirect")
  ssoRedirect() {
    return Promise.resolve(this.googleService.getRedirect());
  }

  @TypedQuery("authToken")
  token(@Args() { token }: IQueryAuthTokenArgs) {
    if (token) {
      const verified = this.tokenService.verify(token);
      return Promise.resolve(this.tokenService.toGql(verified));
    }
    throw new NotImplementedException();
  }

  @BatchResolveField("user")
  async user(tokens: IAuthToken[]): Promise<IAuthToken["user"][]> {
    const users = await this.userService.getMany({
      id: { in: tokens.map(({ userId }) => userId) },
    });
    return tokens.map(({ userId }) => {
      const user = users.find(({ id }) => id === userId);
      if (!user) {
        throw new NotFoundException(`User not found: ${userId}`);
      }
      return this.userService.toGql(user);
    });
  }
}
