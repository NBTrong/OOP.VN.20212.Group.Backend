import { inject, injectable } from "inversify";
import { REPOSITORIES } from "@n-types/injections/repositories";
import { ICategoryRepository } from "@n-repositories/interfaces/v1";
import { CategoryFilter, ReportFilter } from "@n-types/filters";
import { ICategoryServices } from "@n-services/interface";

@injectable()
export class CategoryServices implements ICategoryServices {
  @inject(REPOSITORIES.CategoryRepository)
  private CategoryRepository: ICategoryRepository;

  async list (filter: CategoryFilter): Promise<any> {
    return this.CategoryRepository.list(filter); 
  }

  async report (filter: ReportFilter): Promise<any> {
    return this.CategoryRepository.report(filter);
  }
}
