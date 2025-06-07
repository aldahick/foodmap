import { Injectable } from "@nestjs/common";
import { type WhereArg } from "orchid-orm";
import { IPermission, type IUser } from "../graphql.js";
import { DatabaseService } from "../service/database/database.service.js";
import type { UserPermissionModel } from "../service/database/tables/user-permission.table.js";
import { type UserModel } from "../service/database/tables/user.table.js";

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async get(filter: WhereArg<DatabaseService["users"]>) {
    const [user] = await this.getMany(filter);
    return user;
  }

  async getMany(filter?: WhereArg<DatabaseService["users"]>) {
    return await this.db.users.where(filter ?? {}).select("*", {
      permissions: (t) => t.permissions.selectAll(),
    });
  }

  async upsert({
    permissions,
    ...fields
  }: Omit<UserModel, "id" | "passwordHash"> & {
    id?: string;
    passwordHash?: string | null;
    permissions?: IPermission[];
  }) {
    await this.db.transaction(async () => {
      const { id } = await this.db.users
        .create(fields)
        .onConflict(["email"])
        .merge()
        .onConflict("id")
        .merge()
        .select("id");
      if (permissions) {
        await this.db.userPermissions.where({ userId: id }).delete();
        await this.db.userPermissions
          .createMany(
            permissions.map((permission) => ({
              userId: id,
              permission,
            })),
          )
          .onConflictDoNothing();
      }
    });
  }

  async update(fields: Pick<UserModel, "id" | "passwordHash">) {
    await this.db.users
      .find(fields.id)
      .update({ passwordHash: fields.passwordHash });
  }

  async delete(id: string) {
    await this.db.users.find(id).delete();
  }

  toGql(user: UserModel & { permissions: UserPermissionModel[] }): IUser {
    return {
      ...user,
      permissions: user.permissions.map(
        ({ permission }) => permission as IPermission,
      ),
    };
  }
}
