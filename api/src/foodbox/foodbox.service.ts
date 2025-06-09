import { Injectable } from "@nestjs/common";
import { type IFoodbox, IFoodboxState } from "../graphql.js";
import { DatabaseService } from "../service/database/database.service.js";
import type { FoodboxModel } from "../service/database/tables/foodbox.table.js";

@Injectable()
export class FoodboxService {
  constructor(private readonly db: DatabaseService) {}

  async getMany() {
    return await this.db.foodboxes.selectAll();
  }

  async delete(id: string) {
    await this.db.foodboxes.find(id).delete();
  }

  async upsert({
    id,
    ...fields
  }: Omit<FoodboxModel, "id"> & {
    id?: string;
  }) {
    if (id) {
      return await this.db.foodboxes.selectAll().find(id).update(fields);
    }
    return await this.db.foodboxes.selectAll().create(fields);
  }

  async reportEmpty(id: string) {
    await this.db.foodboxes
      .where({ id, state: { not: "CONFIRMED_EMPTY" } })
      .update({ state: "REPORTED_EMPTY" });
  }

  toGql(foodbox: FoodboxModel): IFoodbox {
    return {
      ...foodbox,
      state: foodbox.state as IFoodboxState,
      position: {
        lat: Number.parseFloat(foodbox.lat),
        lng: Number.parseFloat(foodbox.lng),
      },
    };
  }
}
