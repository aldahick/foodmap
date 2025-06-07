import { createBaseTable } from "orchid-orm";

export const BaseTable = createBaseTable({
  columnTypes: (t) => ({
    ...t,
    nativeEnum: <T extends string>(name: string, obj: Record<string, T>) =>
      t.enum(name, Object.values(obj) as [T, ...T[]]),
  }),
});
export const sql = BaseTable.sql.bind(BaseTable);
