import { inject, injectable } from "inversify";
import { REPOSITORIES } from "@n-types/injections/repositories";
import { IWishListRepository } from "@n-repositories/interfaces/v1";
import { WishListFilter } from "@n-types/filters";
import { IWishListServices } from "@n-services/interface";

@injectable()
export class WishListServices implements IWishListServices {
  @inject(REPOSITORIES.WishListRepository)
  private WishListRepository: IWishListRepository;

  async list (filter: WishListFilter): Promise<any> {
    return await this.WishListRepository.list(filter);
  }

  async create (data: any): Promise<any> {
    const wishList = await this.WishListRepository.create({
      amount: data.amount,
      name: data.name,
      user_key: data.userKey,
      time: data.time,
    });
    return wishList;
  }

  async update (id: number, data: any): Promise<any> {
    let wishList = await this.WishListRepository.findById(id);
    if (wishList.user_key !== data.userKey) {
      return {
        status: 500,
        message: "user key not match",
      }
    }
    wishList = await this.WishListRepository.updateById(id, {
      amount: data.amount,
      name: data.name,
    });
    return wishList;
  }

  async delete (id: number, userKey: string): Promise<boolean> {
    return await this.WishListRepository.delete(id, userKey);
  }
}
