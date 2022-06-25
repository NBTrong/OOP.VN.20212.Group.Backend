import { inject, injectable } from "inversify";
import { REPOSITORIES } from "@n-types/injections/repositories";
import { ICategoryRepository, IExpenseRepository } from "@n-repositories/interfaces/v1";
import { ExpenseFilter } from "@n-types/filters";
import { IExpenseServices } from "@n-services/interface";

@injectable()
export class ExpenseServices implements IExpenseServices {
  @inject(REPOSITORIES.ExpenseRepository)
  private ExpenseRepository: IExpenseRepository;

  @inject(REPOSITORIES.CategoryRepository)
  private CategoryRepository: ICategoryRepository;

  async list (filter: ExpenseFilter): Promise<any> {
    const expenses =  await this.ExpenseRepository.list(filter);
    let expensesWithCategory = [];
    for (let expense of expenses) {
      const category = await this.CategoryRepository.findById(expense.category_id);
      expensesWithCategory.push({
        ...expense,
        category: {
          id: category.id,
          name: category.name,
          color: category.color,
        }
      });
    }
    return expensesWithCategory;
  }

  async create (data: any): Promise<any> {
    const category = await this.CategoryRepository.create({
      name: data?.name,
      color: data?.color,
    });
    const expense = await this.ExpenseRepository.create({
      amount: data.amount,
      note: data.note,
      user_key: data.userKey,
      category_id: category.id,
    });
    return {
      ...expense,
      category,
    }
  }

  async update (id: number, data: any): Promise<any> {
    let expense = await this.ExpenseRepository.findById(id);
    if (expense.user_key !== data.userKey) {
      return {
        status: 500,
        message: "user key not match",
      }
    }
    if (expense.category_id !== data?.category?.id) {
      return {
        status: 500,
        message: "category id not match",
      }
    }
    const category = await this.CategoryRepository.update(data?.category?.id, {
      name: data?.category?.name,
      color: data?.category?.color,
    });
    expense = await this.ExpenseRepository.updateById(id, {
      amount: data.amount,
      note: data.note,
      user_key: data.userKey,
      category_id: category.id,
    });
    return {
      ...expense,
      category,
    }
  }

  async delete (id: number): Promise<boolean> {
    return await this.ExpenseRepository.deleteById(id);
  }  
}
