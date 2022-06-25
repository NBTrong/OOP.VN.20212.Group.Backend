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
    @Body() body: { userKey: string },
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
      note?: string,
      name?: string,
      color?: string,
      listIndex?: number,
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
  @Post("/update")
  async updateWishList(
    @Body() body: {
      id: number,
      userKey: string,
      amount?: number,
      note?: string,
      listIndex?: number,
      category?: {
        id: number,
        name?: string,
        color?: string,
      }
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
    },
  ): Promise<any> {
    const result = await this.WishListServices.delete(body.id);
    return {
      status: 200,
      message: "success",
      data: result,
    }
  }
}
