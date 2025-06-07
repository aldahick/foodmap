import { Module } from "@nestjs/common";
import { configProvider, configToken } from "./config.service.js";

@Module({
  providers: [configProvider],
  exports: [configToken],
})
export class ConfigModule {}
