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
          icon: category.icon,
          status: category.status,
        }
      });
    }
    return expensesWithCategory;
  }

  async findById (id: number): Promise<any> {
    const expense = await this.ExpenseRepository.findById(id);
    const category = await this.CategoryRepository.findById(expense.category_id);
    return {
      ...expense,
      category,
    }
  }

  async create (data: any): Promise<any> {
    const category = await this.CategoryRepository.findById(data?.categoryId);
    const expense = await this.ExpenseRepository.create({
      amount: data.amount,
      note: data.note,
      user_key: data.userKey,
      time: data.time,
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
    expense = await this.ExpenseRepository.updateById(id, {
      amount: data?.amount || expense.amount,
      note: data?.note || expense.note,
      category_id: data?.categoryId || expense.category_id,
      time: data?.time || expense.time,
    });
    const category = await this.CategoryRepository.findById(expense.category_id);
    return {
      ...expense,
      category,
    }
  }

  async delete (id: number, userKey: string): Promise<boolean> {
    return await this.ExpenseRepository.delete(id, userKey);
  }  
}
