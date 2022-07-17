import { injectable } from "inversify";
import {
  Tags,
  Post,
  Route,
  Response,
  Body,
  Delete,
  Patch,
} from "@tsoa/runtime";
import { lazyInject } from "@n-configs/container";
import { SERVICES } from "@n-types/injections/services";
import { IWishListServices } from "@n-services/interface";

@injectable()
@Tags("wishList")
@Route("/api/v1/wishList")
export class WishListController {
  @lazyInject(SERVICES.WishListServices)
  private WishListServices: IWishListServices;

  @Response<{ status: number; message: string }>(500) // error response
  @Post("/")
  async getListWishList(
    @Body() body: { userKey: string, time: string },
  ): Promise<any> {
    const result = await this.WishListServices.list(body);
    return {
      status: 200,
      message: "success",
      data: result,
    }
  }

  @Response<{ status: number; message: string }>(500) // error response
  @Post("/create")
  async createWishList(
    @Body() body: { 
      userKey: string,
      amount?: number,
      name?: string,
      time?: string,
    },
  ): Promise<any> {
    const result = await this.WishListServices.create(body);
    return {
      status: 200,
      message: "success",
      data: result,
    }
  }

  @Response<{ status: number; message: string }>(500) // error response
  @Patch("/update")
  async updateWishList(
    @Body() body: {
      id: number,
      userKey: string,
      amount?: number,
      name?: string,
      time?: string,
    },
  ): Promise<any> {
    const result = await this.WishListServices.update(body.id, body);
    return {
      status: 200,
      message: "success",
      data: result,
    }
  }

  @Response<{ status: number; message: string }>(500) // error response
  @Delete("/delete")
  async deleteWishList(
    @Body() body: {
      id: number,
      userKey: string,
    },
  ): Promise<any> {
    const result = await this.WishListServices.delete(body.id, body.userKey);
    return {
      status: 200,
      message: "success",
      data: result,
    }
  }
}
