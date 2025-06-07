import { NotFoundException, NotImplementedException } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import type {
  IAuthRedirect,
  IAuthToken,
  IQueryAuthTokenArgs,
} from "../graphql.js";
import { UserService } from "../user/user.service.js";
import { BatchResolveField } from "../util/graphql.util.js";
import { AuthGoogleService } from "./auth-google.service.js";
import { AuthTokenService } from "./auth-token.service.js";

@Resolver("AuthToken")
export class AuthResolver {
  constructor(
    private readonly googleService: AuthGoogleService,
    private readonly tokenService: AuthTokenService,
    private readonly userService: UserService,
  ) {}

  @Query("authSsoRedirect")
  ssoRedirect(): IAuthRedirect {
    return this.googleService.getRedirect();
  }

  @Query("authToken")
  token(@Args() { token }: IQueryAuthTokenArgs): IAuthToken {
    if (token) {
      const verified = this.tokenService.verify(token);
      return this.tokenService.toGql(verified);
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
