import type { Selectable } from "orchid-orm";
import { BaseTable } from "../base.table.js";

export type FoodboxModel = Selectable<FoodboxTable>;
export class FoodboxTable extends BaseTable {
  table = "foodboxes";

  columns = this.setColumns(
    (t) => ({
      id: t.uuid().primaryKey(),
      name: t.text(),
      lat: t.numeric(),
      lng: t.numeric(),
      state: t.enum("foodbox_state", [
        "FULL",
        "REPORTED_EMPTY",
        "CONFIRMED_EMPTY",
      ] as const),
    }),
    (t) => [t.unique(["lat", "lng"])],
  );
}
