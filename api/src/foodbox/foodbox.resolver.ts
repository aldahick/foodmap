import { UseGuards } from "@nestjs/common";
import { Args, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "../auth/auth.guard.js";
import {
  type IMutationDeleteFoodboxArgs,
  type IMutationReportFoodboxEmptyArgs,
  type IMutationUpsertFoodboxArgs,
  IPermission,
} from "../graphql.js";
import { TypedMutation, TypedQuery } from "../util/graphql.util.js";
import { FoodboxService } from "./foodbox.service.js";

@Resolver()
export class FoodboxResolver {
  constructor(private readonly foodboxService: FoodboxService) {}

  @TypedQuery("foodboxes")
  async getMany() {
    const foodboxes = await this.foodboxService.getMany();
    return foodboxes.map((foodbox) => this.foodboxService.toGql(foodbox));
  }

  @UseGuards(new AuthGuard([IPermission.Foodboxes]))
  @TypedMutation("deleteFoodbox")
  async delete(@Args() { id }: IMutationDeleteFoodboxArgs) {
    await this.foodboxService.delete(id);
    return true;
  }

  @UseGuards(new AuthGuard([IPermission.Foodboxes]))
  @TypedMutation("upsertFoodbox")
  async upsert(
    @Args() { id, input: { position, ...fields } }: IMutationUpsertFoodboxArgs,
  ) {
    const foodbox = await this.foodboxService.upsert({
      ...fields,
      lat: position.lat.toString(),
      lng: position.lng.toString(),
      id,
    });
    return this.foodboxService.toGql(foodbox);
  }

  @TypedMutation("reportFoodboxEmpty")
  async reportEmpty(@Args() { id }: IMutationReportFoodboxEmptyArgs) {
    await this.foodboxService.reportEmpty(id);
    return true;
  }
}
