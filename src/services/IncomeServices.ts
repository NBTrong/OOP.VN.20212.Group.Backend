import { inject, injectable } from "inversify";
import { REPOSITORIES } from "@n-types/injections/repositories";
import { ICategoryRepository, IIncomeRepository } from "@n-repositories/interfaces/v1";
import { IncomeFilter } from "@n-types/filters";
import { IIncomeServices } from "@n-services/interface";

@injectable()
export class IncomeServices implements IIncomeServices {
  @inject(REPOSITORIES.IncomeRepository)
  private IncomeRepository: IIncomeRepository;

  @inject(REPOSITORIES.CategoryRepository)
  private CategoryRepository: ICategoryRepository;

  async list (filter: IncomeFilter): Promise<any> {
    const incomes =  await this.IncomeRepository.list(filter);
    let incomesWithCategory = [];
    for (let income of incomes) {
      const category = await this.CategoryRepository.findById(income.category_id);
      incomesWithCategory.push({
        ...income,
        category: {
          id: category.id,
          name: category.name,
          color: category.color,
          icon: category.icon,
          status: category.status,
        }
      });
    }
    return incomesWithCategory;
  }

  async create (data: any): Promise<any> {
    const category = await this.CategoryRepository.findById(data?.categoryId);
    const income = await this.IncomeRepository.create({
      amount: data.amount,
      note: data.note,
      user_key: data.userKey,
      time: data.time,
      category_id: category.id,
    });
    return {
      ...income,
      category,
    }
  }

  async update (id: number, data: any): Promise<any> {
    let income = await this.IncomeRepository.findById(id);
    if (income.user_key !== data.userKey) {
      return {
        status: 500,
        message: "user key not match",
      }
    }
    if (income.category_id !== data?.category?.id) {
      return {
        status: 500,
        message: "category id not match",
      }
    }
    const category = await this.CategoryRepository.update(data?.category?.id, {
      name: data?.category?.name,
      color: data?.category?.color,
    });
    income = await this.IncomeRepository.updateById(id, {
      amount: data.amount,
      note: data.note,
      user_key: data.userKey,
      category_id: category.id,
    });
    return {
      ...income,
      category,
    }
  }

  async delete (id: number): Promise<boolean> {
    return await this.IncomeRepository.deleteById(id);
  }  
}
