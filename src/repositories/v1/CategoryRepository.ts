import Repository from "../Repository";
import { injectable } from "inversify";
import { AnyQueryBuilder } from "objection";
import Category from "../../models/Category";
import { ICategoryRepository } from '@n-repositories/interfaces/v1';
import { ExpenseFilter } from "@n-types/filters";

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
    return await Category.query().findById(id);
  }

  async create(data: any): Promise<typeof Category["prototype"]> {
    return await this.model.query().insert(data);
  }

  async update(id: string | number, data: any): Promise<typeof Category["prototype"]> {
    return await this.model.query().updateAndFetchById(id, data);
  }
}
