import { Module } from "@nestjs/common";
import { DatabaseModule } from "../service/database/database.module.js";
import { HealthController } from "./health.controller.js";

@Module({
  imports: [DatabaseModule],
  controllers: [HealthController],
})
export class HealthModule {}
