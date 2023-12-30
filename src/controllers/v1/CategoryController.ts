import { injectable } from "inversify";
import {
  Tags,
  Post,
  Route,
  Response,
  Body,
} from "@tsoa/runtime";
import { lazyInject } from "@n-configs/container";
import { SERVICES } from "@n-types/injections/services";
import { ICategoryServices } from "@n-services/interface";

@injectable()
@Tags("Category")
@Route("/api/v1/category")
export class CategoryController {
  @lazyInject(SERVICES.CategoryServices)
  private CategoryServices: ICategoryServices;

  @Response<{ status: number; message: string }>(500) // error response
  @Post("/")
  async getListCategory(
    @Body() body: { status: string, isPlan?: boolean, user_key: string },
  ): Promise<any> {
    const result = await this.CategoryServices.list(body);
    return {
      status: 200,
      message: "success",
      data: result,
    }
  }

  @Response<{ status: number; message: string }>(500) // error response
  @Post("/update")
  async createCategory(
    @Body() body: { id: number, amount: number, user_key: string },
  ): Promise<any> {
    const result = await this.CategoryServices.update({
      id: body.id,
      user_key: body.user_key,
      data: {
        amount: Number(body.amount)
      }
    });
    return {
      status: 200,
      message: "success",
      data: result,
    }
  }

  @Response<{ status: number; message: string }>(500) // error response
  @Post("/report")
  async getReportCategory(
    @Body() body: { time: string, userKey: string, status: string },
  ): Promise<any> {
    const result = await this.CategoryServices.report(body);
    return {
      status: 200,
      message: "success",
      data: result,
    }
  }
}
