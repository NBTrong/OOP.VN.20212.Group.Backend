import { IncomeFilter } from "@n-types/filters";
import Income from "../../models/Income";

export interface IIncomeServices {
  list: (filter: IncomeFilter) => Promise<typeof Income["prototype"]>;
}
