import "dotenv/config.js";
import { Inject, type Provider } from "@nestjs/common";
import { z } from "zod";

const schema = z.object({
  AUTH_SECRET: z.string(),
  BASE_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  LOG_DATABASE_QUERIES: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  PORT: z.coerce.number(),
  POSTGRES_URL: z.string(),
  TIMEZONE: z.string().default("America/Indiana/Indianapolis"),
  WEB_URL: z.string(),
});

export const configToken = Symbol("Config");

export type Config = z.infer<typeof schema>;

export const InjectConfig = Inject(configToken);

export const configProvider: Provider = {
  provide: configToken,
  useValue: schema.parse(process.env),
};
