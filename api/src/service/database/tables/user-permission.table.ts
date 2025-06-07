import { type Selectable } from "orchid-orm";
import { BaseTable } from "../base.table.js";
import { UserTable } from "./user.table.js";

export type UserPermissionModel = Selectable<UserPermissionTable>;
export class UserPermissionTable extends BaseTable {
  table = "user_permissions";

  columns = this.setColumns(
    (t) => ({
      userId: t
        .uuid()
        .foreignKey(() => UserTable, "id", { onDelete: "CASCADE" }),
      permission: t.text(),
    }),
    (t) => [t.primaryKey(["userId", "permission"])],
  );

  relations = {
    user: this.hasOne(() => UserTable, {
      columns: ["userId"],
      references: ["id"],
      required: true,
    }),
  };
}
