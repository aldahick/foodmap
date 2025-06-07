import { Controller, Get, InternalServerErrorException } from "@nestjs/common";
import { DatabaseService } from "../service/database/database.service.js";

@Controller("health")
export class HealthController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async health() {
    const result = await this.db.orm.$query<{
      healthy: number;
    }>`SELECT 1 AS healthy`;
    if (result.rows[0]?.healthy === 1) {
      return { ok: true };
    }
    throw new InternalServerErrorException({ ok: false });
  }
}
