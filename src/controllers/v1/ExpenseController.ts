import { injectable } from "inversify";
import {
  Tags,
  Post,
  Route,
  Response,
  Body,
  Delete,
} from "@tsoa/runtime";
import { lazyInject } from "@n-configs/container";
import { SERVICES } from "@n-types/injections/services";
import { IExpenseServices } from "@n-services/interface";

@injectable()
@Tags("Expense")
@Route("/api/v1/expense")
export class ExpenseController {
  @lazyInject(SERVICES.ExpenseServices)
  private ExpenseServices: IExpenseServices;

  @Response<{ status: number; message: string }>(500) // error response
  @Post("/")
  async getListExpense(
    @Body() body: { userKey: string },
  ): Promise<any> {
    const result = await this.ExpenseServices.list(body);
    return {
      status: 200,
      message: "success",
      data: result,
    }
  }

  @Response<{ status: number; message: string }>(500) // error response
  @Post("/create")
  async createExpense(
    @Body() body: { 
      userKey: string,
      amount?: number,
      note?: string,
      name?: string,
      color?: string,
    },
  ): Promise<any> {
    const result = await this.ExpenseServices.create(body);
    return {
      status: 200,
      message: "success",
      data: result,
    }
  }

  @Response<{ status: number; message: string }>(500) // error response
  @Post("/update")
  async updateExpense(
    @Body() body: {
      id: number,
      userKey: string,
      amount?: number,
      note?: string,
      category?: {
        id: number,
        name?: string,
        color?: string,
      }
    },
  ): Promise<any> {
    const result = await this.ExpenseServices.update(body.id, body);
    return {
      status: 200,
      message: "success",
      data: result,
    }
  }

  @Response<{ status: number; message: string }>(500) // error response
  @Delete("/delete")
  async deleteExpense(
    @Body() body: {
      id: number,
    },
  ): Promise<any> {
    const result = await this.ExpenseServices.delete(body.id);
    return {
      status: 200,
      message: "success",
      data: result,
    }
  }
}
