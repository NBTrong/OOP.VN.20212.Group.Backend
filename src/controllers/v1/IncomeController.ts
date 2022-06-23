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
    @Body() body: { userKey: string },
  ): Promise<any> {
    const result = await this.IncomeServices.list(body);
    return {
      status: 200,
      message: "success",
      data: result,
    }
  }
}
