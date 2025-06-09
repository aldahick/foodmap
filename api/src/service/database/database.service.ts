import { Injectable, type OnApplicationBootstrap } from "@nestjs/common";
import { type OrchidORM, orchidORM } from "orchid-orm";
import { type Config, InjectConfig } from "../config/config.service.js";
import { runMigration } from "./migration.js";
import { FoodboxTable } from "./tables/foodbox.table.js";
import { UserPermissionTable } from "./tables/user-permission.table.js";
import { UserTable } from "./tables/user.table.js";

const tables = {
  foodboxes: FoodboxTable,
  userPermissions: UserPermissionTable,
  users: UserTable,
};

type Client = OrchidORM<typeof tables>;
type Tables = { [Key in keyof typeof tables]: Client[Key] };

@Injectable()
export class DatabaseService implements Tables, OnApplicationBootstrap {
  readonly orm: Client;

  foodboxes!: Tables["foodboxes"];
  userPermissions!: Tables["userPermissions"];
  users!: Tables["users"];

  constructor(@InjectConfig config: Config) {
    this.orm = orchidORM(
      {
        databaseURL: config.POSTGRES_URL,
        log: config.LOG_DATABASE_QUERIES,
      },
      tables,
    );

    for (const key of Object.keys(tables)) {
      this[key as "users"] = this.orm[key as "users"];
    }
  }

  transaction<T>(transact: () => Promise<T>): Promise<T> {
    return this.orm.$transaction(transact);
  }

  async onApplicationBootstrap() {
    await runMigration();
  }
}
