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

  async findById (id: number): Promise<any> {
    const income = await this.IncomeRepository.findById(id);
    const category = await this.CategoryRepository.findById(income.category_id);
    return {
      ...income,
      category,
    }
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
    income = await this.IncomeRepository.updateById(id, {
      amount: data?.amount || income.amount,
      note: data?.note || income.note,
      category_id: data?.categoryId || income.category_id,
      time: data?.time || income.time,
    });
    const category = await this.CategoryRepository.findById(income.category_id);
    return {
      ...income,
      category,
    }
  }

  async delete (id: number, userKey: string): Promise<boolean> {
    return await this.IncomeRepository.delete(id, userKey);
  }  
}
