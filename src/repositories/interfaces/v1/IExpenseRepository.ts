import IRepository from "../IRepository";
import Expense from "../../../models/Expense";
import { ExpenseFilter } from "@n-types/filters";

export interface IExpenseRepository extends IRepository<typeof Expense> {
  list: (filter: ExpenseFilter) => Promise<typeof Expense["prototype"][]>;
}
