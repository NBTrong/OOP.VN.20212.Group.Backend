import PlanModel from '@n-models/Plan';
import { inject, injectable } from "inversify";
import { REPOSITORIES } from "@n-types/injections/repositories";
import { ICategoryRepository } from "@n-repositories/interfaces/v1";
import { CategoryFilter, ReportFilter, UpdateCategoryFilter } from "@n-types/filters";
import { ICategoryServices } from "@n-services/interface";

@injectable()
export class CategoryServices implements ICategoryServices {
  @inject(REPOSITORIES.CategoryRepository)
  private CategoryRepository: ICategoryRepository;

  async list(filter: CategoryFilter): Promise<any> {
    return this.CategoryRepository.list(filter);
  }

  async update(filter: UpdateCategoryFilter): Promise<any> {
    // return this.CategoryRepository.update(filter.id, filter.data);
    return PlanModel.query()
      .insert({
        user_key: filter.user_key,
        category_id: filter.id,
        amount: filter.data.amount
      })
      .onConflict(['user_key', 'category_id'])
      .merge(['amount'])
  }


  async report(filter: ReportFilter): Promise<any> {
    return this.CategoryRepository.report(filter);
  }
}
