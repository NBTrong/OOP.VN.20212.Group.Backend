import Repository from "../Repository";
import { injectable } from "inversify";
import { AnyQueryBuilder, raw } from "objection";
import Expense from "../../models/Expense";
import { IExpenseRepository } from '@n-repositories/interfaces/v1';
import { ExpenseFilter } from "@n-types/filters";

@injectable()
export class ExpenseRepository
  extends Repository<typeof Expense>
  implements IExpenseRepository
{
  initializeModel(): typeof Expense {
    return Expense;
  }

  static queryFilter(
    query: AnyQueryBuilder,
    filter: ExpenseFilter,
  ): AnyQueryBuilder {
    if (filter?.time) {
      query
      .whereRaw(`EXTRACT(MONTH FROM time) = ${new Date(filter.time).getMonth() + 1}`)
      .whereRaw(`EXTRACT(YEAR FROM time) = ${new Date(filter.time).getFullYear()}`);
    }
    
    return query.where("user_key", filter.userKey);
  }

  async list(filter: ExpenseFilter): Promise<typeof Expense["prototype"][]> {
    return await ExpenseRepository.queryFilter(this.model.query(), filter)
  }

  async create(data: typeof Expense["prototype"]): Promise<typeof Expense["prototype"]> {
    return await this.model.query().insert(data);
  }

  async updateById(id: number, data: any): Promise<typeof Expense["prototype"]> {
    return await this.model.query().updateAndFetchById(id, data);
  }

  async delete(id: string | number, userKey: string): Promise<boolean> {
    const result = await this.model.query().deleteById(id).where("user_key", userKey);
    return result === 1 ? true : false;
  }
}
