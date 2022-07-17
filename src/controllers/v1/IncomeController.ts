import { injectable } from "inversify";
import {
  Tags,
  Post,
  Route,
  Response,
  Path,
  Get,
  Body,
  Patch,
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
  @Get("/:id")
  async getExpense(
    @Path() id: number,
  ): Promise<any> {
    const result = await this.IncomeServices.findById(id);
    return {
      status: 200,
      message: "success",
      data: result,
    }
  }

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
  @Patch("/update")
  async update(
    @Body() body: {
      id: number,
      userKey: string,
      amount?: number,
      note?: string,
      categoryId?: number,
      time?: string,
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
      userKey: string,
    },
  ): Promise<any> {
    const result = await this.IncomeServices.delete(body.id, body.userKey);
    return {
      status: 200,
      message: "success",
      data: result,
    }
  }
}
