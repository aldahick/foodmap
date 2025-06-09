import path from "node:path";
import { fileURLToPath } from "node:url";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloDriver, type ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import type { FastifyRequest } from "fastify";
import { AuthContextService } from "./auth/auth-context.service.js";
import { AuthModule } from "./auth/auth.module.js";
import { FoodboxModule } from "./foodbox/foodbox.module.js";
import { HealthModule } from "./health/health.module.js";
import { ScalarModule } from "./scalar/scalar.module.js";
import { UserModule } from "./user/user.module.js";

type ApolloServerPlugin = Exclude<
  ApolloDriverConfig["plugins"],
  undefined
>[number];

const schemaDir = path.join(fileURLToPath(import.meta.url), "../../gql/**");

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [AuthModule],
      inject: [AuthContextService],
      useFactory: (contextService: AuthContextService) => ({
        context: (req: FastifyRequest) => contextService.get(req),
        playground: false,
        plugins: [
          ApolloServerPluginLandingPageLocalDefault() as ApolloServerPlugin,
        ],
        resolverValidationOptions: {
          requireResolversForArgs: "error" as const,
        },
        typePaths: [schemaDir],
      }),
    }),
    AuthModule,
    FoodboxModule,
    HealthModule,
    ScalarModule,
    UserModule,
  ],
})
export class AppModule {}
