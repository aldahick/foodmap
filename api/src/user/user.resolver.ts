import { ForbiddenException, UseGuards } from "@nestjs/common";
import { Args, Context, Resolver } from "@nestjs/graphql";
import type { AuthContext } from "../auth/auth.context.js";
import { AuthGuard } from "../auth/auth.guard.js";
import {
  type IMutation,
  type IMutationDeleteUserArgs,
  type IMutationUpsertUserArgs,
  IPermission,
  type IQuery,
} from "../graphql.js";
import { TypedMutation, TypedQuery } from "../util/graphql.util.js";
import { UserService } from "./user.service.js";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(new AuthGuard([]))
  @TypedQuery("user")
  async get(@Context() context: AuthContext): Promise<IQuery["user"]> {
    const user = await this.userService.get({ id: context.userId });
    if (!user) {
      throw new ForbiddenException("User not found");
    }
    return this.userService.toGql(user);
  }

  @UseGuards(new AuthGuard(IPermission.Users))
  @TypedQuery("users")
  async getAll(): Promise<IQuery["users"]> {
    const users = await this.userService.getMany();
    return users.map((user) => this.userService.toGql(user));
  }

  @UseGuards(new AuthGuard(IPermission.Users))
  @TypedMutation("upsertUser")
  async upsert(
    @Args() { params }: IMutationUpsertUserArgs,
    @Context() context: AuthContext,
  ): Promise<IMutation["upsertUser"]> {
    if (!(await context.isAuthorized([IPermission.Users]))) {
      params.id = context.userId;
      params.permissions = undefined;
    }
    await this.userService.upsert(params);
    return true;
  }

  @UseGuards(new AuthGuard(IPermission.Users))
  @TypedMutation("deleteUser")
  async delete(
    @Args() { id }: IMutationDeleteUserArgs,
  ): Promise<IMutation["deleteUser"]> {
    await this.userService.delete(id);
    return true;
  }
}
