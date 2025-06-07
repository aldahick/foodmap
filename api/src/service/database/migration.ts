import "dotenv/config.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Logger } from "@nestjs/common";
import { rakeDb } from "orchid-orm/migrations";
import { BaseTable } from "./base.table.js";

const logger = new Logger("DatabaseService");

const dbScript = fileURLToPath(import.meta.url);
const basePath = path.dirname(dbScript);
export const migration = rakeDb.lazy(
  {
    databaseURL: process.env.POSTGRES_URL,
  },
  {
    basePath,
    baseTable: BaseTable,
    dbScript,
    import: (path) => import(path),
    // migrations: import.meta.glob("./migrations/*.ts"),
    migrationsPath: "./migrations",
    migrationsTable: "migrations",
    noPrimaryKey: "error",
  },
);

export const runMigration = () =>
  migration
    .run(["migrate"])
    .then(() => {
      logger.log("Migrated database successfully");
    })
    .catch((err) => {
      const message = err instanceof Error ? err.stack : err;
      logger.error(`Failed to migrate: ${message}`);
    });
