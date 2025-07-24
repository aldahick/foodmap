import { migration } from "../migration.js";

migration.change(async (db) => {
  await db.createTable(
    "users",
    (t) => ({
      id: t.uuid().primaryKey(),
      email: t.text(),
      name: t.text(),
    }),
    (t) => [t.unique(["email"])],
  );

  await db.createTable(
    "user_permissions",
    (t) => ({
      userId: t.uuid().foreignKey("users", "id", { onDelete: "CASCADE" }),
      permission: t.text(),
    }),
    (t) => [t.primaryKey(["userId", "permission"])],
  );

  await db.createEnum("foodbox_state", [
    "FULL",
    "REPORTED_EMPTY",
    "CONFIRMED_EMPTY",
  ]);
  await db.createTable(
    "foodboxes",
    (t) => ({
      id: t.uuid().primaryKey(),
      name: t.text(),
      lat: t.numeric(),
      lng: t.numeric(),
      state: t.enum("foodbox_state"),
    }),
    (t) => [t.unique(["lat", "lng"])],
  );
});
