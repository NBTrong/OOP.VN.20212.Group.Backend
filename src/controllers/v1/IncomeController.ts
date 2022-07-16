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
import { IIncomeServices } from "@n-services/interface";

@injectable()
@Tags("Income")
@Route("/api/v1/income")
export class IncomeController {
  @lazyInject(SERVICES.IncomeServices)
  private IncomeServices: IIncomeServices;

  @Response<{ status: number; message: string }>(500) // error response
  @Post("/")
  async getListIncome(
    @Body() body: { userKey: string, time: string },
  ): Promise<any> {
    const result = await this.IncomeServices.list(body);
    return {
      status: 200,
      message: "success",
      data: result,
    }
  }

  @Response<{ status: number; message: string }>(500) // error response
  @Post("/create")
  async createIncome(
    @Body() body: { 
      userKey: string,
      amount: number,
      time: string,
      categoryId: number,
      note: string,
    },
  ): Promise<any> {
    const result = await this.IncomeServices.create(body);
    return {
      status: 200,
      message: "success",
      data: result,
    }
  }

  @Response<{ status: number; message: string }>(500) // error response
  @Post("/update")
  async update(
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
    const result = await this.IncomeServices.update(body.id, body);
    return {
      status: 200,
      message: "success",
      data: result,
    }
  }

  @Response<{ status: number; message: string }>(500) // error response
  @Delete("/delete")
  async deleteIncome(
    @Body() body: {
      id: number,
    },
  ): Promise<any> {
    const result = await this.IncomeServices.delete(body.id);
    return {
      status: 200,
      message: "success",
      data: result,
    }
  }
}
