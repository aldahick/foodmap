import { Module } from "@nestjs/common";
import { DatabaseModule } from "../service/database/database.module.js";
import { UserResolver } from "./user.resolver.js";
import { UserService } from "./user.service.js";

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
