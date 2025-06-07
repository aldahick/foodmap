import { Module } from "@nestjs/common";
import { ConfigModule } from "../service/config/config.module.js";
import { UserModule } from "../user/user.module.js";
import { AuthContextService } from "./auth-context.service.js";
import { AuthGoogleService } from "./auth-google.service.js";
import { AuthTokenService } from "./auth-token.service.js";
import { AuthController } from "./auth.controller.js";
import { AuthResolver } from "./auth.resolver.js";

@Module({
  imports: [ConfigModule, UserModule],
  providers: [
    AuthContextService,
    AuthGoogleService,
    AuthTokenService,
    AuthResolver,
  ],
  controllers: [AuthController],
  exports: [AuthContextService],
})
export class AuthModule {}
