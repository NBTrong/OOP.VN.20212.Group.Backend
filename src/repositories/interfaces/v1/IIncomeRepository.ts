import IRepository from "../IRepository";
import Income from "../../../models/Income";
import { IncomeFilter } from "@n-types/filters";

export interface IIncomeRepository extends IRepository<typeof Income> {
  list: (filter: IncomeFilter) => Promise<typeof Income["prototype"]>;
}