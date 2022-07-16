import Repository from "../Repository";
import { injectable } from "inversify";
import { AnyQueryBuilder, raw } from "objection";
import Category from "../../models/Category";
import { ICategoryRepository } from '@n-repositories/interfaces/v1';
import { CategoryFilter, ExpenseFilter, ReportFilter } from "@n-types/filters";

@injectable()
export class CategoryRepository
  extends Repository<typeof Category>
  implements ICategoryRepository
{
  initializeModel(): typeof Category {
    return Category;
  }

  static queryFilter(
    query: AnyQueryBuilder,
    filter: ExpenseFilter,
  ): AnyQueryBuilder {
    return query.where("user_key", filter.userKey);
  }

  async findById(id: string | number): Promise<typeof Category["prototype"]> {
    return await Category.query().findById(id).first();
  }

  async create(data: any): Promise<typeof Category["prototype"]> {
    return await this.model.query().insert(data);
  }

  async update(id: string | number, data: any): Promise<typeof Category["prototype"]> {
    return await this.model.query().updateAndFetchById(id, data);
  }

  async list(filter: CategoryFilter): Promise<typeof Category["prototype"][]> {
    return await this.model.query().where("status", filter.status);
  }

  async report(filter: ReportFilter): Promise<typeof Category["prototype"][]> {
    return await Category.query()
    .select("categories.*")
    .select(raw('sum(amount)').as('totalAmount'))
    .joinRelated(`${filter.status === 'expense' ? 'expenses' : 'incomes'}`)
    .whereRaw(`EXTRACT(MONTH FROM time) = ${new Date(filter.time).getMonth() + 1}`)
    .whereRaw(`EXTRACT(YEAR FROM time) = ${new Date(filter.time).getFullYear()}`)
    .where("user_key", filter.userKey)
    .groupBy("categories.id")
  }
}
