import { type Selectable } from "orchid-orm";
import { BaseTable } from "../base.table.js";
import { UserPermissionTable } from "./user-permission.table.js";

export type UserModel = Selectable<UserTable>;
export class UserTable extends BaseTable {
  table = "users";

  columns = this.setColumns(
    (t) => ({
      id: t.uuid().primaryKey(),
      email: t.text(),
      name: t.text(),
      passwordHash: t.text().nullable(),
    }),
    (t) => [t.unique(["email"])],
  );

  relations = {
    permissions: this.hasMany(() => UserPermissionTable, {
      columns: ["id"],
      references: ["userId"],
      required: true,
    }),
  };
}
