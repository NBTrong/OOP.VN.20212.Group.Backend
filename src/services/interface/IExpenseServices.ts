import { ExpenseFilter } from "@n-types/filters";
import Expense from "../../models/Expense";

export interface IExpenseServices {
  list: (filter: ExpenseFilter) => Promise<typeof Expense["prototype"]>;
  create: (data: any) => Promise<typeof Expense["prototype"]>;
  update: (id: number, data: any) => Promise<typeof Expense["prototype"]>;
  delete: (id: number, userKey: string) => Promise<boolean>;
  findById: (id: number) => Promise<typeof Expense["prototype"]>;
}
