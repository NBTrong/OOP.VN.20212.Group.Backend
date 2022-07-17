import { IncomeFilter } from "@n-types/filters";
import Income from "../../models/Income";

export interface IIncomeServices {
  list: (filter: IncomeFilter) => Promise<typeof Income["prototype"]>;
  create: (data: any) => Promise<typeof Income["prototype"]>;
  update: (id: number, data: any) => Promise<typeof Income["prototype"]>;
  delete: (id: number, userKey: string) => Promise<boolean>;
  findById: (id: number) => Promise<typeof Income["prototype"]>;
}
