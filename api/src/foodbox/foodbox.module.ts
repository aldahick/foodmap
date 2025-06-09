import { Module } from "@nestjs/common";
import { DatabaseModule } from "../service/database/database.module.js";
import { FoodboxResolver } from "./foodbox.resolver.js";
import { FoodboxService } from "./foodbox.service.js";

@Module({
  imports: [DatabaseModule],
  providers: [FoodboxService, FoodboxResolver],
})
export class FoodboxModule {}
